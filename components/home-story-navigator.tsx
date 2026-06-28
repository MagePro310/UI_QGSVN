"use client";

import { useEffect, useRef, useState } from "react";

const homeChapters = [
  { id: "home", label: "Introduction" },
  { id: "overview", label: "Overall map" },
  { id: "platform", label: "Overview" },
  { id: "problem-map", label: "Problem map" },
  { id: "capabilities", label: "Capabilities" },
  { id: "demo", label: "QPF experience" }
];

export function HomeStoryNavigator() {
  const [activeChapter, setActiveChapter] = useState(0);
  const navigatorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const chapters = homeChapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((chapter): chapter is HTMLElement => chapter !== null);
    let frame = 0;

    const updateChapter = () => {
      const marker = window.innerHeight * 0.45;
      let nextChapter = chapters.findIndex((chapter) => {
        const rect = chapter.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });

      if (nextChapter < 0) {
        nextChapter = chapters.reduce((nearest, chapter, index) => {
          const currentDistance = Math.abs(chapter.getBoundingClientRect().top - marker);
          const nearestDistance = Math.abs(chapters[nearest].getBoundingClientRect().top - marker);
          return currentDistance < nearestDistance ? index : nearest;
        }, 0);
      }

      const activeRect = chapters[nextChapter]?.getBoundingClientRect();
      const chapterProgress = activeRect
        ? Math.min(1, Math.max(0, (marker - activeRect.top) / activeRect.height))
        : 0;

      navigatorRef.current?.style.setProperty("--chapter-progress", chapterProgress.toString());
      setActiveChapter((current) => (current === nextChapter ? current : nextChapter));
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateChapter);
    };

    updateChapter();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav ref={navigatorRef} className="home-story-nav" aria-label="Home chapters">
      <div className="home-story-current" aria-live="polite">
        <span>
          {String(activeChapter + 1).padStart(2, "0")} / {String(homeChapters.length).padStart(2, "0")}
        </span>
        <strong>{homeChapters[activeChapter].label}</strong>
      </div>

      <div className="home-story-progress" aria-hidden="true">
        <span />
      </div>

      <div className="home-story-chapters">
        {homeChapters.map((chapter, index) => (
          <a
            className={index === activeChapter ? "is-active" : ""}
            href={`#${chapter.id}`}
            aria-current={index === activeChapter ? "location" : undefined}
            aria-label={`Chapter ${index + 1}: ${chapter.label}`}
            key={chapter.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{chapter.label}</strong>
          </a>
        ))}
      </div>
    </nav>
  );
}
