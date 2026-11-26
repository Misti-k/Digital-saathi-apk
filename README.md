# Digital Saathi (Next.js + TypeScript)

Digital-literacy site for senior citizens, migrated from plain HTML/CSS/JS to
**Next.js (App Router) + React + TypeScript**.

## Run it

Requires **Node.js 18.18+** (Node 20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Project structure

```
public/images/            lesson photos (unchanged)
src/
  app/
    layout.tsx            <html>, metadata, PreferencesProvider
    page.tsx              composes the page sections (server component)
    globals.css           original stylesheet (dead "Get Help" rules removed)
  components/             Header, Hero, LessonsSection, LessonCard, LessonDetail,
                          LessonStepImage, SafetySection, QuizSection, Footer
  context/PreferencesContext.tsx   language + text-size state
  hooks/useSpeech.ts      read-aloud (Web Speech API)
  data/
    content.ts            all UI text, English + Hindi
    lessons.ts            lesson steps/images
    quiz.ts               quiz questions
  types/index.ts
```

To add a quiz question or a lesson, edit `src/data/quiz.ts` / `src/data/lessons.ts`.
TypeScript will flag any entry missing an English or Hindi version.

## Bugs fixed vs. the original

1. **Quiz could be gamed**: switching language after answering re-enabled the
   buttons, so the same question could be answered (and scored) again.
2. **Language switch on the results screen** dumped you back into question 5.
3. **Score label** stayed in the old language after a switch.
4. **"Question 1 of 3"** was hard-coded in the HTML while the quiz has 5 questions.
5. **Untranslated text**: lesson-card descriptions, the four safety tips, the
   footer and some aria-labels now switch to Hindi too.
6. **Dead "Get Help" code**: leftover nav translation, eyebrow text and CSS for a
   section that no longer exists were removed.
7. Read-aloud **keeps talking** after you close a lesson or leave the page; it now stops.
8. Lesson image `alt` text mixed an English title with Hindi step text; now consistent.
9. Opening a lesson scrolls to it, but switching language no longer re-scrolls;
   smooth scroll respects "reduce motion".
10. A+ / A− buttons disable at their limits instead of silently doing nothing.

## Notes

- Visuals are pixel-matched to the original (same CSS). Lesson photos use
  `next/image` (lazy loaded, resized automatically).
- Text size is applied to `<body>` exactly as before, and only after you press
  A+/A−, so the stylesheet's responsive default still applies until then.
- Hindi uses your device's Devanagari font (the original had the same behaviour).
  For a consistent look you can add `Noto Sans Devanagari` with `next/font/google`.
- Read-aloud depends on the voices installed in the browser/OS (Hindi voice
  availability varies).
