-- =====================================================================
-- Digital Saathi: database schema
-- Run this whole file once in: Supabase Dashboard -> SQL Editor -> New query
-- It is safe to run again (idempotent).
--
-- Design:
--   * The app has no login screen. Each visitor gets a private
--     "anonymous" Supabase user (auth.signInAnonymously()), so their
--     progress is saved per browser. Anonymous users use the
--     `authenticated` Postgres role.
--   * Lesson and quiz CONTENT stays in the code (src/data/*). The database
--     stores only each user's data.
--   * Row Level Security: a user can only ever see or change their own rows.
--   * Explicit GRANTs are required: since Oct 30 2026 new tables in `public`
--     are no longer exposed to the Data API automatically.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. user_preferences: language + text size (one row per user)
-- ---------------------------------------------------------------------
create table if not exists public.user_preferences (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  language   text not null default 'en' check (language in ('en', 'hi')),
  -- NULL = never changed; the stylesheet's default size is used.
  -- Keep this range in sync with MIN/MAX_FONT_SIZE in src/data/settings.ts
  font_size  smallint check (font_size between 14 and 28),
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

grant select, insert, update on public.user_preferences to authenticated;

drop policy if exists "prefs_select_own" on public.user_preferences;
drop policy if exists "prefs_insert_own" on public.user_preferences;
drop policy if exists "prefs_update_own" on public.user_preferences;

create policy "prefs_select_own" on public.user_preferences
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "prefs_insert_own" on public.user_preferences
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "prefs_update_own" on public.user_preferences
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));


-- ---------------------------------------------------------------------
-- 2. lesson_progress: which lessons a user has completed
--    (a row exists = completed; deleting the row = "undo")
--    lesson_key matches the `key` values in src/data/lessons.ts
--    (phone, internet, email, payments, scams). The API validates the key,
--    so adding a lesson later needs no database change.
-- ---------------------------------------------------------------------
create table if not exists public.lesson_progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  lesson_key   text not null check (char_length(lesson_key) between 1 and 40),
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

alter table public.lesson_progress enable row level security;

grant select, insert, delete on public.lesson_progress to authenticated;

drop policy if exists "progress_select_own" on public.lesson_progress;
drop policy if exists "progress_insert_own" on public.lesson_progress;
drop policy if exists "progress_delete_own" on public.lesson_progress;

create policy "progress_select_own" on public.lesson_progress
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "progress_insert_own" on public.lesson_progress
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "progress_delete_own" on public.lesson_progress
  for delete to authenticated
  using (user_id = (select auth.uid()));


-- ---------------------------------------------------------------------
-- 3. quiz_attempts: one row each time a user finishes the safety quiz
-- ---------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid()
             references auth.users (id) on delete cascade,
  score      smallint not null check (score >= 0),
  total      smallint not null check (total > 0),
  language   text not null check (language in ('en', 'hi')),
  created_at timestamptz not null default now(),
  check (score <= total)
);

create index if not exists quiz_attempts_user_recent_idx
  on public.quiz_attempts (user_id, created_at desc);
create index if not exists quiz_attempts_user_best_idx
  on public.quiz_attempts (user_id, score desc);

alter table public.quiz_attempts enable row level security;

-- Attempts are a history: users can add and read them, never edit or delete.
grant select, insert on public.quiz_attempts to authenticated;

drop policy if exists "quiz_select_own" on public.quiz_attempts;
drop policy if exists "quiz_insert_own" on public.quiz_attempts;

create policy "quiz_select_own" on public.quiz_attempts
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "quiz_insert_own" on public.quiz_attempts
  for insert to authenticated
  with check (user_id = (select auth.uid()));


-- ---------------------------------------------------------------------
-- 4. feedback: messages from the Feedback form
--    Users can send feedback and read their own; only you (Dashboard /
--    service role) can read everyone's.
--    user_id is set to NULL (not deleted) if the anonymous user is removed,
--    so cleaning up old anonymous users never loses feedback.
-- ---------------------------------------------------------------------
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid default auth.uid() references auth.users (id) on delete set null,
  rating     smallint check (rating between 1 and 5),
  message    text not null check (char_length(message) between 1 and 1000),
  language   text not null check (language in ('en', 'hi')),
  created_at timestamptz not null default now()
);

create index if not exists feedback_created_idx on public.feedback (created_at desc);

alter table public.feedback enable row level security;

grant select, insert on public.feedback to authenticated;

drop policy if exists "feedback_select_own" on public.feedback;
drop policy if exists "feedback_insert_own" on public.feedback;

create policy "feedback_select_own" on public.feedback
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "feedback_insert_own" on public.feedback
  for insert to authenticated
  with check (user_id = (select auth.uid()));


-- ---------------------------------------------------------------------
-- OPTIONAL housekeeping (leave commented out until you want it):
-- Anonymous users are never deleted automatically. This removes ones
-- created more than 60 days ago, together with their progress/quiz rows
-- (feedback is kept, with user_id set to NULL).
--
-- delete from auth.users
--  where is_anonymous is true
--    and created_at < now() - interval '60 days';
-- ---------------------------------------------------------------------
