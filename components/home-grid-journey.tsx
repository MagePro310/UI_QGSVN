"use client";

import Image from "next/image";
import { Building2, Factory, Network, RadioTower, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const gridStages = [
  {
    name: "Generation",
    label: "Starting point",
    title: "Electricity is generated and balanced to meet system demand.",
    body:
      "Thermal, hydro, wind and solar sources provide power within technical limits, reserve margins and ramping rates.",
    telemetry: "P/Q, terminal voltage, reserve capacity",
    risk: "Generation-load imbalance",
    icon: Factory
  },
  {
    name: "Transmission",
    label: "Bulk power flow",
    title: "Power is transferred over long distances on high-voltage grids.",
    body:
      "The transmission system connects generation regions to load centers. Each branch is monitored by flow, losses and thermal limits.",
    telemetry: "Line flow, losses, branch loading",
    risk: "Overload and N-1 violations",
    icon: RadioTower
  },
  {
    name: "Substation",
    label: "Conversion point",
    title: "Voltage is transformed, switched and protected at substations.",
    body:
      "Substations connect voltage levels and aggregate data from transformers, breakers, protection relays and control systems.",
    telemetry: "Tap, breaker, relay, alarm",
    risk: "Equipment failure or incorrect protection action",
    icon: Workflow
  },
  {
    name: "Distribution",
    label: "Area delivery",
    title: "Medium and low-voltage networks deliver power to demand areas.",
    body:
      "Distribution topology, node voltage and transformer loading are tracked to detect voltage drops, local overloads or service interruptions.",
    telemetry: "Node voltage, transformer loading, outage",
    risk: "Voltage drops and local overloads",
    icon: Network
  },
  {
    name: "Loads",
    label: "End use point",
    title: "End demand closes the operational loop.",
    body:
      "Industry, buildings, households and charging stations create demand profiles that vary by time, weather and usage behavior.",
    telemetry: "Demand profile, AMI, flexibility",
    risk: "Forecast error and operating power shortages",
    icon: Building2
  }
];

export function HomeGridJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveStage(Number((entry.target as HTMLElement).dataset.gridStage));
        });
      },
      { rootMargin: "-38% 0px -42%", threshold: 0 }
    );

    stageRefs.current.forEach((stage) => {
      if (stage) observer.observe(stage);
    });

    return () => observer.disconnect();
  }, []);

  const activeGridStage = gridStages[activeStage];

  return (
    <section id="grid-journey" className="home-grid-journey" aria-labelledby="grid-journey-title">
      <div className="grid-journey-heading" data-reveal="up">
        <div className="section-index section-index-light">04 / Energy journey</div>
        <div>
          <p className="home-eyebrow">Always grounded in the physical system</p>
          <h2 id="grid-journey-title">Follow electricity from generation to end consumption.</h2>
        </div>
        <p>
          Every computed result in QuanWatt can be traced back to equipment, measurements and
          operational constraints on the real power grid.
        </p>
      </div>

      <div className="grid-journey-layout">
        <div className={`grid-journey-canvas stage-${activeStage + 1}`} aria-hidden="true">
          <Image
            className="grid-journey-image"
            src="/images/intro-physical-grid.png"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
          />
          <div className="grid-journey-shade" />
          <div className="grid-journey-topline">
            <span>PHYSICAL GRID / ENERGY FLOW</span>
            <span>0{activeStage + 1} — 05</span>
          </div>
          <div className="grid-journey-stage" key={activeGridStage.name}>
            <span>{activeGridStage.label}</span>
            <strong>{activeGridStage.name}</strong>
          </div>
          <div className="grid-journey-route">
            {gridStages.map((stage, index) => (
              <div
                className={`${index <= activeStage ? "is-active" : ""} ${index === activeStage ? "is-current" : ""}`.trim()}
                key={stage.name}
              >
                <span />
                <small>{stage.name}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-journey-steps">
          {gridStages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                className={`grid-journey-step ${index === activeStage ? "is-active" : ""}`}
                data-grid-stage={index}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
                key={stage.name}
              >
                <div className="grid-journey-step-meta">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.45} />
                </div>
                <p>{stage.label}</p>
                <h3>{stage.title}</h3>
                <div className="grid-journey-step-body">{stage.body}</div>
                <dl>
                  <div>
                    <dt>Observed data</dt>
                    <dd>{stage.telemetry}</dd>
                  </div>
                  <div>
                    <dt>Risk to control</dt>
                    <dd>{stage.risk}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
