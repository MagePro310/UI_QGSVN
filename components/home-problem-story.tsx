"use client";

import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowUpRight, Gauge, RadioTower, SlidersHorizontal, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const problemStories = [
  {
    code: "QSE",
    name: "State Estimation",
    question: "What is the true state of the grid right now?",
    body:
      "QSE combines measurement data and grid models to estimate voltages and phase angles under noisy or incomplete measurement conditions.",
    input: "SCADA, PMU, grid models",
    output: "Estimated voltages and phase angles",
    method: "WLS linear system",
    status: "Planned expansion",
    image: "/images/solution-operation-pipeline.png",
    icon: RadioTower
  },
  {
    code: "QPF",
    name: "Power Flow",
    question: "How is power flowing?",
    body:
      "QPF computes bus voltages, phase angles, line flows and loading levels, then compares Classical, HHL and VQLS solvers on the same input data.",
    input: "Topology, generation, loads",
    output: "Voltage, line flow, violations",
    method: "DC PF / Newton linear solve",
    status: "Current MVP",
    image: "/images/solution-solver-workspace.png",
    icon: Gauge
  },
  {
    code: "QOPF",
    name: "Operational Optimization",
    question: "How to dispatch to optimize cost and safety?",
    body:
      "QOPF incorporates generation costs, line limits and operational constraints into an optimization problem that can be explored with quantum-oriented solvers.",
    input: "Forecasts, costs, constraints",
    output: "Optimal dispatch and cost",
    method: "KKT / linearized OPF",
    status: "Planned expansion",
    image: "/images/solution-quantum-map.png",
    icon: SlidersHorizontal
  },
  {
    code: "QEMTP",
    name: "Transient Analysis",
    question: "How does the grid respond after a disturbance?",
    body:
      "QEMTP targets a time-stepped sequence of equation systems to simulate waveforms, dynamic response and post-fault stability indicators.",
    input: "Dynamic models and fault scenarios",
    output: "Waveforms and stability indicators",
    method: "Per-time-step linear systems",
    status: "Further research",
    image: "/images/intro-physical-grid.png",
    icon: Waves
  }
];

export function HomeProblemStory() {
  const [activeProblem, setActiveProblem] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveProblem(Number((entry.target as HTMLElement).dataset.problemStep));
        });
      },
      { rootMargin: "-38% 0px -42%", threshold: 0 }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const activeStory = problemStories[activeProblem];

  return (
    <section id="problem-map" className="problem-story" aria-labelledby="problem-story-title">
      <div className="problem-story-heading" data-reveal="up">
        <div className="section-index">02 / Problem map</div>
        <div>
          <p className="home-eyebrow">Four operational questions</p>
          <h2 id="problem-story-title">Each technical bottleneck requires a different quantum approach.</h2>
        </div>
        <p>
          QuanWatt puts power system problems before algorithms. Scroll through each chapter to see
          the input data, expected outputs and the corresponding linear system construction approach.
        </p>
      </div>

      <div className="problem-story-layout">
        <div className="problem-story-steps">
          {problemStories.map((story, index) => {
            const Icon = story.icon;

            return (
              <article
                className={`problem-story-step ${index === activeProblem ? "is-active" : ""}`}
                data-problem-step={index}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                key={story.code}
              >
                <div className="problem-story-step-meta">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={23} strokeWidth={1.5} />
                </div>
                <p>{story.code} / {story.name}</p>
                <h3>{story.question}</h3>
                <div className="problem-story-step-body">{story.body}</div>
                <dl>
                  <div>
                      <dt>Input</dt>
                    <dd>{story.input}</dd>
                  </div>
                  <div>
                    <dt>Output</dt>
                    <dd>{story.output}</dd>
                  </div>
                  <div>
                    <dt>Solution approach</dt>
                    <dd>{story.method}</dd>
                  </div>
                </dl>
                <Link href="/solution#problems">
                  View details {story.code}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="problem-story-visual" aria-hidden="true">
          <div className="problem-story-frame">
            {problemStories.map((story, index) => (
              <Image
                className={`problem-story-image ${index === activeProblem ? "is-active" : ""}`}
                src={story.image}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 820px) 100vw, 55vw"
                key={story.code}
              />
            ))}
            <div className="problem-story-shade" />
            <div className="problem-story-frame-topline">
              <span>QUANTUM PROBLEM MAP</span>
              <span>0{activeProblem + 1} — 04</span>
            </div>
            <div className="problem-story-frame-copy" key={activeStory.code}>
              <span>{activeStory.status}</span>
              <strong>{activeStory.code}</strong>
              <p>{activeStory.name}</p>
            </div>
            <div className="problem-story-frame-status">
              <Activity aria-hidden="true" size={14} />
              {activeStory.method}
            </div>
            <div className="problem-story-track">
              {problemStories.map((story, index) => (
                <span
                  className={`${index <= activeProblem ? "is-active" : ""} ${index === activeProblem ? "is-current" : ""}`.trim()}
                  key={story.code}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
