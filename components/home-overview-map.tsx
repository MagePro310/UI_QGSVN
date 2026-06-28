import {
  Activity,
  ArrowDown,
  Layers3,
  Map,
  PlayCircle,
  type LucideIcon
} from "lucide-react";

type OverviewChapter = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  metric: string;
  icon: LucideIcon;
};

const overviewChapters: OverviewChapter[] = [
  {
    id: "platform",
    number: "01",
    eyebrow: "Overview",
    title: "Platform overview",
    description: "From operational data to solver experiments in a unified workflow.",
    detail:
      "Unifies grid topology, measurement streams, operating context and experiment outputs so teams can move from situational awareness to solver evaluation without switching tools.",
    metric: "Data → models → experiments",
    icon: Activity
  },
  {
    id: "problem-map",
    number: "02",
    eyebrow: "Four core problems",
    title: "Problem map",
    description: "Locate QSE, QPF, QOPF and QEMTP in the context of grid operations.",
    detail:
      "Shows how each workload sits inside the operation pipeline, from state estimation and power flow to dispatch optimization and transient stability analysis.",
    metric: "QSE · QPF · QOPF · QEMTP",
    icon: Map
  },
  {
    id: "capabilities",
    number: "03",
    eyebrow: "Three value layers",
    title: "Core capabilities",
    description: "Understand the system, identify quantum application points and evaluate solvers.",
    detail:
      "Combines operational visibility, quantum opportunity mapping and solver benchmarking so the platform can explain both why a problem matters and how each solver performs.",
    metric: "Visibility · fit · benchmarking",
    icon: Layers3
  },
  {
    id: "demo",
    number: "04",
    eyebrow: "Verified results",
    title: "QPF experience",
    description: "Run and compare Classical, HHL and VQLS in the same workspace.",
    detail:
      "Uses a consistent 3-bus power flow case with runtime, relative error, voltage profile and line-loading outputs so the solver comparison stays transparent and repeatable.",
    metric: "3-bus case · 3 solvers",
    icon: PlayCircle
  }
];

export function HomeOverviewMap() {
  return (
    <section id="overview" className="home-overview-map" aria-labelledby="overview-map-title">
      <div className="home-overview-heading" data-reveal="up">
        <div className="section-index section-index-light">00 / Overall map</div>
        <div>
          <p className="home-eyebrow">Interactive index</p>
          <h2 id="overview-map-title">Understand QuanWatt across four main stages.</h2>
        </div>
        <p>
          Start from the platform overview, step through each technical problem, explore
          core capabilities and finish with a verifiable QPF experiment.
        </p>
      </div>

      <nav className="overview-map-track" aria-label="Homepage index">
        {overviewChapters.map((chapter, index) => {
          const Icon = chapter.icon;

          return (
            <a
              className={`overview-map-item motion-delay-${index + 1}`}
              href={`#${chapter.id}`}
              data-reveal="up"
              key={chapter.id}
            >
              <div className="overview-map-item-topline">
                <span>{chapter.number}</span>
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <small>{chapter.eyebrow}</small>
                <strong>{chapter.title}</strong>
                <p>{chapter.description}</p>
                <p>{chapter.detail}</p>
                <small>{chapter.metric}</small>
              </div>
              <ArrowDown className="overview-map-arrow" aria-hidden="true" size={18} />
            </a>
          );
        })}
      </nav>

      <div className="overview-scroll-hint" aria-hidden="true">
        <span />
        Scroll to follow each stage
      </div>
    </section>
  );
}
