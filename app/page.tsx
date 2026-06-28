import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Coins,
  Crosshair,
  FileJson,
  FlaskConical,
  Mail,
  MapPin,
  Network,
  Play,
  Search,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { ScrollMotion } from "@/components/scroll-motion";
import { SiteChrome } from "@/components/site-chrome";

type Service = {
  number: string;
  title: string;
  description: string;
  bestFor: string;
  deliverable: string;
  subject: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    number: "01",
    title: "Quantum Readiness Assessment",
    description:
      "Identify matrix-intensive grid workloads, evaluate their fit for HHL or VQLS, and define a practical pilot scope.",
    bestFor: "Utility innovation and power-system R&D teams selecting a credible first use case.",
    deliverable: "Use-case fit matrix, technical risks and a scoped pilot plan.",
    subject: "QuanWatt quantum readiness assessment",
    icon: Search
  },
  {
    number: "02",
    title: "HHL & VQLS Simulation Benchmarking",
    description:
      "Model the same grid case across classical, HHL and VQLS paths before committing to quantum hardware or production integration.",
    bestFor: "Teams that need an evidence-based solver comparison on a defined power-system case.",
    deliverable: "Precision, runtime, complexity and resource comparison report.",
    subject: "QuanWatt HHL and VQLS simulation benchmark",
    icon: FlaskConical
  },
  {
    number: "03",
    title: "Prototype & Integration Support",
    description:
      "Turn a validated experiment into a repeatable workflow with solver adapters, API-ready contracts and technical reporting.",
    bestFor: "Engineering teams moving from research notebooks toward an operational prototype.",
    deliverable: "Prototype workflow, integration contract and implementation roadmap.",
    subject: "QuanWatt prototype and integration support",
    icon: Braces
  }
];

const differentiators = [
  {
    title: "Grid-native formulation",
    body: "Start from topology, operating constraints and engineering outputs—not from an algorithm looking for a use case.",
    icon: Network
  },
  {
    title: "Verification-ready workflow",
    body: "Keep inputs, solver configuration and report outputs inspectable so every experiment can be reviewed and repeated.",
    icon: ShieldCheck
  },
  {
    title: "Precision-aware comparison",
    body: "Evaluate relative error and grid-level outputs alongside runtime instead of relying on theoretical speedup alone.",
    icon: Crosshair
  },
  {
    title: "Lower-cost experimentation",
    body: "Use simulation and classical baselines to narrow the opportunity before investing in hardware access or integration.",
    icon: Coins
  }
];

const proofPoints = [
  {
    value: "01",
    title: "Interactive QPF prototype",
    body: "A working interface for configuring and reviewing a three-bus power-flow experiment.",
    icon: CheckCircle2
  },
  {
    value: "03",
    title: "Solver paths modeled",
    body: "Classical, HHL and VQLS represented within one consistent comparison workflow.",
    icon: FlaskConical
  },
  {
    value: "04",
    title: "Grid workloads mapped",
    body: "QSE, QPF, QOPF and QEMTP positioned against their operational context.",
    icon: Network
  },
  {
    value: "01",
    title: "Exportable report flow",
    body: "Typed request data and technical results prepared for backend solver integration.",
    icon: FileJson
  }
];

export default function HomePage() {
  return (
    <SiteChrome>
      <ScrollMotion />
      <main className="home-page home-product-page">
        <section id="home" className="home-hero">
          <Image
            className="home-hero-image"
            src="/images/quantum-grid-orbit-hero.png"
            alt="Power grid and renewable energy infrastructure connected across a city at night"
            fill
            priority
            sizes="100vw"
          />
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <p className="hero-kicker">
              <span aria-hidden="true" />
              Quantum computing for power-system R&amp;D
            </p>
            <h1>Evaluate quantum-ready grid workloads before deployment.</h1>
            <p className="home-hero-lead">
              QuanWatt applies HHL and VQLS to matrix-intensive power-system problems and
              benchmarks each path against a classical baseline.
            </p>
            <p className="home-hero-vn">
              We help utility innovation and grid R&amp;D teams move from use-case selection to
              simulation, evidence and an integration-ready pilot.
            </p>
            <div className="home-hero-actions">
              <a className="action-link action-link-solid" href="#services">
                Explore services
                <ArrowDown aria-hidden="true" size={18} strokeWidth={1.8} />
              </a>
              <Link className="action-link action-link-outline" href="/solution#solver">
                <Play aria-hidden="true" fill="currentColor" size={15} strokeWidth={1.8} />
                View QPF prototype
              </Link>
            </div>
          </div>

          <div className="hero-metrics" aria-label="Current product proof">
            <div>
              <strong>01</strong>
              <span>Interactive QPF prototype</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Solver paths modeled</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Grid workloads mapped</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Exportable report flow</span>
            </div>
          </div>

          <a className="hero-scroll" href="#services" aria-label="Explore QuanWatt services">
            <ArrowDown aria-hidden="true" size={18} />
          </a>
        </section>

        <section id="services" className="product-services" aria-labelledby="services-title">
          <div className="product-section-heading" data-reveal="up">
            <div className="section-index">01 / Services</div>
            <div>
              <p className="home-eyebrow">Start with a focused engagement</p>
              <h2 id="services-title">A practical path from quantum interest to a measurable pilot.</h2>
            </div>
            <p>
              QuanWatt works project by project. Each engagement produces a concrete engineering
              output before the next investment decision.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              const mailto = `mailto:contact@quanwatt.com?subject=${encodeURIComponent(service.subject)}`;

              return (
                <article
                  className={`service-card motion-delay-${index + 1}`}
                  data-reveal="up"
                  key={service.number}
                >
                  <div className="service-card-topline">
                    <span>{service.number}</span>
                    <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  <dl>
                    <div>
                      <dt>Best for</dt>
                      <dd>{service.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Deliverable</dt>
                      <dd>{service.deliverable}</dd>
                    </div>
                  </dl>
                  <a href={mailto}>
                    Discuss this service
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="differentiators"
          className="product-differentiators"
          aria-labelledby="differentiators-title"
        >
          <div className="product-section-heading product-section-heading-dark" data-reveal="up">
            <div className="section-index section-index-light">02 / Why QuanWatt</div>
            <div>
              <p className="home-eyebrow">Engineering evidence before quantum claims</p>
              <h2 id="differentiators-title">Built to make quantum opportunities measurable.</h2>
            </div>
            <p>
              We connect solver experiments to the grid quantities engineers already use to judge
              feasibility, accuracy and operational relevance.
            </p>
          </div>

          <div className="differentiator-grid">
            {differentiators.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  className={`differentiator-card motion-delay-${index + 1}`}
                  data-reveal="up"
                  key={item.title}
                >
                  <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="proof" className="product-proof" aria-labelledby="proof-title">
          <div className="product-proof-copy">
            <div data-reveal="up">
              <p className="home-eyebrow">03 / Product proof</p>
              <h2 id="proof-title">A working QPF experience, not a black-box promise.</h2>
              <p>
                The current MVP makes the experiment structure visible: grid-case inputs, solver
                configuration, classical comparison, grid-level outputs and an exportable report.
              </p>
            </div>

            <div className="proof-point-grid">
              {proofPoints.map((point, index) => {
                const Icon = point.icon;

                return (
                  <article
                    className={`proof-point motion-delay-${(index % 3) + 1}`}
                    data-reveal="up"
                    key={point.title}
                  >
                    <div>
                      <Icon aria-hidden="true" size={17} />
                      <strong>{point.value}</strong>
                    </div>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </article>
                );
              })}
            </div>

            <div className="product-proof-actions" data-reveal="up">
              <Link className="action-link action-link-dark" href="/solution">
                Explore the technology
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="text-link" href="/solution#solver">
                Open the QPF prototype
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>

          <figure className="product-proof-visual motion-delay-2" data-reveal="up">
            <Image
              src="/images/solution-solver-workspace.png"
              alt="QuanWatt QPF solver comparison workspace"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <figcaption>
              <span>Current MVP</span>
              <strong>QPF solver comparison workspace</strong>
              <small>
                HHL and VQLS outputs currently represent the simulation and UI-integration stage.
              </small>
            </figcaption>
          </figure>
        </section>

        <section id="contact" className="product-contact" aria-labelledby="contact-title">
          <div className="product-about" data-reveal="up">
            <p className="home-eyebrow">04 / About QuanWatt</p>
            <h2 id="contact-title">Power-system context for quantum linear solvers.</h2>
            <p>
              QuanWatt is an applied R&amp;D initiative connecting power-system engineering with
              quantum linear-solver experimentation. We work with utility and research teams to
              frame credible use cases, test them transparently and prepare the next implementation
              step.
            </p>
            <div className="about-tags" aria-label="Areas of work">
              <span>Power systems</span>
              <span>HHL &amp; VQLS</span>
              <span>Simulation</span>
              <span>Technical pilots</span>
            </div>
          </div>

          <aside className="contact-panel motion-delay-1" data-reveal="up">
            <span>Pilot enquiries &amp; research collaboration</span>
            <h3>Bring us a grid problem worth testing.</h3>
            <p>
              Share the workload, available data and the decision your team needs to make. We will
              respond with a focused starting point.
            </p>
            {/* TODO: Replace placeholder contact details before production launch. */}
            <div className="contact-details">
              <a href="mailto:contact@quanwatt.com?subject=QuanWatt%20pilot%20enquiry">
                <Mail aria-hidden="true" size={18} />
                contact@quanwatt.com
              </a>
              <div>
                <MapPin aria-hidden="true" size={18} />
                Vietnam
              </div>
            </div>
            <a
              className="action-link action-link-solid"
              href="mailto:contact@quanwatt.com?subject=QuanWatt%20pilot%20enquiry"
            >
              Discuss a pilot
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </aside>
        </section>
      </main>
    </SiteChrome>
  );
}
