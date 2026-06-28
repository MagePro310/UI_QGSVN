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

    const desktopPointer = window.matchMedia("(min-width: 821px) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wheelState = {
      amount: 0,
      direction: 0,
      lastEventAt: 0,
      lockedUntil: 0
    };

    const getHeaderOffset = () => (window.innerWidth <= 820 ? 64 : 74);

    const getActiveChapterIndex = () => {
      const marker = getHeaderOffset() + 2;
      const containingChapter = chapters.findIndex((chapter) => {
        const rect = chapter.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });

      if (containingChapter >= 0) return containingChapter;

      return chapters.reduce((nearest, chapter, index) => {
        const distance = Math.abs(chapter.getBoundingClientRect().top - marker);
        const nearestDistance = Math.abs(chapters[nearest].getBoundingClientRect().top - marker);
        return distance < nearestDistance ? index : nearest;
      }, 0);
    };

    const canNestedElementScroll = (target: EventTarget | null, direction: number) => {
      let element = target instanceof Element ? target : null;

      while (element && element !== document.documentElement && element !== document.body) {
        const style = window.getComputedStyle(element);
        const isScrollable = /(auto|scroll)/.test(style.overflowY);

        if (isScrollable && element.scrollHeight > element.clientHeight) {
          const canScrollDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1;
          const canScrollUp = element.scrollTop > 1;
          if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) return true;
        }

        element = element.parentElement;
      }

      return false;
    };

    const resetWheelState = () => {
      wheelState.amount = 0;
      wheelState.direction = 0;
    };

    const handleChapterWheel = (event: WheelEvent) => {
      if (!desktopPointer.matches || reduceMotion.matches || event.ctrlKey) return;

      const direction = Math.sign(event.deltaY);
      if (!direction || canNestedElementScroll(event.target, direction)) return;

      const now = performance.now();
      if (now < wheelState.lockedUntil) {
        event.preventDefault();
        return;
      }

      const currentIndex = getActiveChapterIndex();
      const targetIndex = currentIndex + direction;

      if (targetIndex < 0 || targetIndex >= chapters.length) {
        resetWheelState();
        return;
      }

      const currentRect = chapters[currentIndex].getBoundingClientRect();
      const boundaryTolerance = Math.min(160, window.innerHeight * 0.18);
      const atChapterBoundary =
        direction > 0
          ? currentRect.bottom <= window.innerHeight + boundaryTolerance
          : currentRect.top >= getHeaderOffset() - boundaryTolerance;

      if (!atChapterBoundary) {
        resetWheelState();
        return;
      }

      event.preventDefault();

      if (wheelState.direction !== direction || now - wheelState.lastEventAt > 240) {
        wheelState.amount = 0;
      }

      const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 :
        event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      wheelState.amount += Math.abs(event.deltaY) * deltaMultiplier;
      wheelState.direction = direction;
      wheelState.lastEventAt = now;

      const activationThreshold = Math.min(180, Math.max(90, window.innerHeight * 0.12));
      if (wheelState.amount < activationThreshold) return;

      chapters[targetIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      wheelState.lockedUntil = now + 900;
      resetWheelState();
    };

    updateChapter();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", handleChapterWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", handleChapterWheel);
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
