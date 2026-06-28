"use client";

import Image from "next/image";
import { Activity, Cpu, Network, Radio, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const storySteps = [
  {
    number: "01",
    eyebrow: "Field signals",
    title: "Collect operational state",
    body:
      "SCADA, PMU and AMI are brought into a common context so engineers can see voltages, power and equipment status on the same timeline.",
    details: ["SCADA / PMU / AMI", "Voltage & P/Q", "Equipment status"],
    image: "/images/intro-grid-control-room.png",
    icon: Radio
  },
  {
    number: "02",
    eyebrow: "System modeling",
    title: "Turn the grid into a problem",
    body:
      "Topology, operational limits and grid state are normalized into matrices, vectors and constraints suitable for QSE, QPF, QOPF or QEMTP.",
    details: ["Grid topology", "Linear system", "Technical constraints"],
    image: "/images/solution-quantum-map.png",
    icon: Network
  },
  {
    number: "03",
    eyebrow: "Compute space",
    title: "Compare Classical, HHL and VQLS",
    body:
      "The same input data is run through different solver approaches. Error, residuals, runtime and quantum resources are placed side-by-side for fair evaluation.",
    details: ["Relative error", "Residual norm", "Runtime & qubits"],
    image: "/images/solution-solver-workspace.png",
    icon: Cpu
  },
  {
    number: "04",
    eyebrow: "Technical results",
    title: "Turn results into decisions",
    body:
      "Bus voltages, line flows, loading levels and limit violations are returned in the system context to support an auditable operational decision.",
    details: ["Electrical result", "Violation alerts", "Operational recommendations"],
    image: "/images/solution-results-dashboard.png",
    icon: ShieldCheck
  }
];

export function HomeScrollytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveStep(Number((entry.target as HTMLElement).dataset.storyStep));
        });
      },
      { rootMargin: "-38% 0px -42%", threshold: 0 }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const activeStory = storySteps[activeStep];

  return (
    <section id="workflow" className="home-scrolly" aria-labelledby="scrolly-title">
      <div className="scrolly-heading" data-reveal="up">
        <div className="section-index section-index-light">03 / Solution workflow</div>
        <div>
          <p className="home-eyebrow">From signals to decisions</p>
          <h2 id="scrolly-title">An operational story across four steps.</h2>
        </div>
      </div>

      <div className="scrolly-layout">
        <div className="scrolly-visual" aria-hidden="true">
          <div className="scrolly-frame">
            {storySteps.map((step, index) => (
              <Image
                className={`scrolly-image ${index === activeStep ? "is-active" : ""}`}
                src={step.image}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 820px) 100vw, 58vw"
                key={step.number}
              />
            ))}
            <div className="scrolly-shade" />

            <div className="scrolly-frame-meta">
              <span>QUANWATT / LIVE FLOW</span>
              <span>{activeStory.number} — 04</span>
            </div>

            <div className="scrolly-stage" key={activeStory.number}>
              <span>{activeStory.eyebrow}</span>
              <strong>{activeStory.title}</strong>
            </div>

            <div className="scrolly-track">
              {storySteps.map((step, index) => (
                <span
                  className={`${index <= activeStep ? "is-active" : ""} ${index === activeStep ? "is-current" : ""}`.trim()}
                  key={step.number}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="scrolly-story">
          {storySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                className={`scrolly-step ${index === activeStep ? "is-active" : ""}`}
                data-story-step={index}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                key={step.number}
              >
                <div className="scrolly-step-topline">
                  <span>{step.number}</span>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                </div>
                <p>{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <div className="scrolly-step-body">{step.body}</div>
                <ul aria-label={`Key data for step ${step.number}`}>
                  {step.details.map((detail) => (
                    <li key={detail}>
                      <Activity aria-hidden="true" size={12} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
