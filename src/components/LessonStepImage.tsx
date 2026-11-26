"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

/** Lesson photo. Hides itself if the file is missing, like the original page. */
export default function LessonStepImage({ src, alt }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      className="lesson-step-image"
      src={src}
      alt={alt}
      width={880}
      height={352}
      sizes="(max-width: 560px) 100vw, 380px"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
