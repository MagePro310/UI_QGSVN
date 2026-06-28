import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";

const milestones = [
  {
    phase: "MVP 1",
    status: "Completed UI",
    title: "QPF Demo Workspace",
    window: "Current build",
    body:
      "Deliver the Next.js UI, 3-bus DC power flow case, Classical/HHL/VQLS mock comparison, warning output, and JSON report export.",
    outputs: ["Next.js/Vercel app", "Typed mock solver data", "QPF report export"],
    image: "/images/solution-solver-workspace.png"
  },
  {
    phase: "MVP 2",
    status: "Next",
    title: "FastAPI Solver Integration",
    window: "Backend connection",
    body:
      "Replace mock run results with FastAPI responses while preserving the current request preview and report payload structure.",
    outputs: ["/api/solver-runs route", "/solve/qpf FastAPI bridge", "Loading and error states"],
    image: "/images/roadmap-platform-architecture.png"
  },
  {
    phase: "Phase 3",
    status: "Planned",
    title: "QSE State Estimation Module",
    window: "Research extension",
    body:
      "Add measurement input, weighted least squares linear systems, bad data indicators, and HHL/VQLS comparison for state estimation.",
    outputs: ["Measurement schema", "WLS matrix view", "QSE result dashboard"],
    image: "/images/solution-quantum-map.png"
  },
  {
    phase: "Phase 4",
    status: "Planned",
    title: "QOPF Optimization Module",
    window: "Optimization extension",
    body:
      "Introduce dispatch constraints, line limits, generator cost curves, and linearized OPF/KKT systems for solver experiments.",
    outputs: ["Constraint editor", "Dispatch result table", "Cost and violation charts"],
    image: "/images/solution-operation-pipeline.png"
  },
  {
    phase: "Phase 5",
    status: "Planned",
    title: "QEMTP / Transient Analysis",
    window: "Dynamic simulation extension",
    body:
      "Prepare transient event scenarios, per-time-step linear systems, waveform views, and stability indicators.",
    outputs: ["Event scenario setup", "Waveform dashboard", "Stability summary"],
    image: "/images/intro-physical-grid.png"
  },
  {
    phase: "Release",
    status: "Planned",
    title: "Deployment and Documentation Hardening",
    window: "Production readiness",
    body:
      "Finalize Vercel deployment settings, backend environment variables, documentation, regression checks, and demo acceptance tests.",
    outputs: ["Vercel deployment", "README updates", "Smoke-test checklist"],
    image: "/images/solution-results-dashboard.png"
  }
];

export default function RoadmapPage() {
  return (
    <SiteChrome>
      <main>
        <section className="subpage-hero">
          <div>
            <p className="eyebrow">Roadmap &amp; Milestones</p>
            <h1>From QPF MVP to Full Quantum Grid Operation Suite</h1>
            <p>
              The platform starts with a focused QPF demo and expands toward backend-connected
              quantum-assisted workflows for state estimation, optimization, and transient
              analysis.
            </p>
          </div>
          <div className="subpage-actions">
            <Link className="button button-primary" href="/solution#solver">
              Open Current Demo
            </Link>
            <Link className="button button-secondary" href="/solution">
              Review Technology
            </Link>
          </div>
          <figure className="subpage-hero-media">
            <Image
              src="/images/roadmap-platform-architecture.png"
              alt="Future platform architecture for quantum-assisted grid operation"
              fill
              sizes="(max-width: 900px) 100vw, 38vw"
            />
          </figure>
        </section>

        <section className="page-section band roadmap-path-section">
          <div className="roadmap-path-heading">
            <div className="section-heading">
              <p className="eyebrow">Milestone plan</p>
              <h2>Delivery Path</h2>
              <p>
                Each milestone keeps the public UI contract stable while replacing mock data with
                solver-backed results and adding new power system problem modules.
              </p>
            </div>
            <div className="roadmap-path-legend" aria-label="Roadmap status legend">
              <span className="is-complete">Completed</span>
              <span className="is-current">Current priority</span>
              <span className="is-planned">Planned</span>
            </div>
          </div>

          <div className="roadmap-path" aria-label="QuanWatt delivery roadmap">
            {milestones.map((milestone, index) => {
              const statusClass =
                milestone.status === "Completed UI"
                  ? "is-complete"
                  : milestone.status === "Next"
                    ? "is-current"
                    : "is-planned";

              return (
                <article
                  className={`roadmap-path-step ${statusClass}`}
                  aria-current={statusClass === "is-current" ? "step" : undefined}
                  key={milestone.phase}
                >
                  <div className="roadmap-path-marker" aria-hidden="true">
                    {statusClass === "is-complete" ? (
                      <Check size={18} strokeWidth={2.4} />
                    ) : (
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </div>

                  <div className="roadmap-path-card">
                    <div className="milestone-meta">
                      <span>{milestone.phase}</span>
                      <strong>{milestone.status}</strong>
                    </div>
                    <p className="milestone-window">{milestone.window}</p>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.body}</p>
                    <div className="roadmap-path-outputs">
                      <span>Planned outputs</span>
                      <ul>
                        {milestone.outputs.map((output) => (
                          <li key={output}>{output}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <figure className="roadmap-path-visual">
                    <Image
                      src={milestone.image}
                      alt={`${milestone.title} visual`}
                      fill
                      sizes="(max-width: 760px) 100vw, 38vw"
                    />
                    <figcaption>
                      {String(index + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                    </figcaption>
                  </figure>
                </article>
              );
            })}
          </div>
        </section>

        <section className="page-section">
          <div className="split-cta">
            <div>
              <p className="eyebrow">Current priority</p>
              <h2>Use the Solution page as the demo surface</h2>
              <p>
                The interactive QPF workspace now lives on the Solution &amp; Features page so
                visitors can move from the product explanation directly into the solver demo.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="button button-primary" href="/solution#solver">
                Run QPF Demo
              </Link>
              <Link className="button button-secondary" href="/">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
