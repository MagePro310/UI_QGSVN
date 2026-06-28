import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Play,
  Zap
} from "lucide-react";
import { HomeOverviewMap } from "@/components/home-overview-map";
import { HomeProblemStory } from "@/components/home-problem-story";
import { HomeStoryNavigator } from "@/components/home-story-navigator";
import { ScrollMotion } from "@/components/scroll-motion";
import { SiteChrome } from "@/components/site-chrome";

export default function IntroductionPage() {
  return (
    <SiteChrome>
      <ScrollMotion />
      <HomeStoryNavigator />
      <main className="home-page">
        <section id="home" className="home-hero">
          <Image
            className="home-hero-image"
            src="/images/quantum-grid-orbit-hero.png"
            alt="Panorama of the grid and connected renewable energy infrastructure at night"
            fill
            priority
            sizes="100vw"
          />
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <p className="hero-kicker">
              <span aria-hidden="true" />
              Next-generation grid operations solution
            </p>
            <h1>QuanWatt — Quantum-enabled Grid Operations Platform</h1>
            <p className="home-hero-lead">
              QuanWatt connects operational data, power system models and quantum solvers in
              a unified workflow.
            </p>
            <p className="home-hero-vn">
              Identify the right problems, measure HHL/VQLS and benchmark against classical
              methods before deployment.
            </p>
            <div className="home-hero-actions">
              <Link className="action-link action-link-solid" href="/solution">
                Explore the solution
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
              </Link>
              <Link className="action-link action-link-outline" href="/solution#solver">
                <Play aria-hidden="true" fill="currentColor" size={15} strokeWidth={1.8} />
                Run QPF demo
              </Link>
            </div>
          </div>

          <div className="hero-metrics" aria-label="Solution highlights">
            <div>
              <strong>04</strong>
              <span>Quantum problem groups</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Approaches compared</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Operational steps mapped</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Integrated solver workspace</span>
            </div>
          </div>

          <a className="hero-scroll" href="#overview" aria-label="View homepage index">
            <ArrowDown aria-hidden="true" size={18} />
          </a>
        </section>

        <HomeOverviewMap />

        <section id="platform" className="home-statement">
          <div className="section-index" data-reveal="up">
            01 / Solution overview
          </div>
          <div className="home-statement-copy motion-delay-1" data-reveal="up">
            <p className="home-eyebrow">One workflow, one technical context</p>
            <h2>
              From grid data to <span className="no-break">quantum-ready</span> experiments.
            </h2>
          </div>
          <div className="home-statement-detail">
            <p className="home-statement-body motion-delay-2" data-reveal="up">
              QuanWatt brings grid topology, operational signals and solver results into one view,
              helping engineering teams identify fit, compare runtime and error, and benchmark each
              approach against classical baselines.
            </p>

            <div className="home-statement-visual motion-delay-3" data-reveal="up">
              <div className="home-statement-visual-header">
                <span>Workflow snapshot</span>
                <strong>Operational data → model → solver → decision</strong>
              </div>

              <div className="home-statement-flow" aria-label="Platform workflow visualization">
                <div className="home-statement-flow-node">
                  <span>01</span>
                  <strong>Grid data</strong>
                  <small>Topology, measurements, operating limits</small>
                </div>
                <div className="home-statement-flow-arrow" aria-hidden="true">→</div>
                <div className="home-statement-flow-node">
                  <span>02</span>
                  <strong>System model</strong>
                  <small>Physical constraints, scenarios, assumptions</small>
                </div>
                <div className="home-statement-flow-arrow" aria-hidden="true">→</div>
                <div className="home-statement-flow-node">
                  <span>03</span>
                  <strong>Solver run</strong>
                  <small>Classical, HHL and VQLS comparison</small>
                </div>
                <div className="home-statement-flow-arrow" aria-hidden="true">→</div>
                <div className="home-statement-flow-node">
                  <span>04</span>
                  <strong>Decision view</strong>
                  <small>Runtime, error and voltage profile outputs</small>
                </div>
              </div>

              <div className="home-statement-metrics">
                <div>
                  <strong>04</strong>
                  <span>Core problem groups</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Solver paths tracked</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>Unified experiment flow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeProblemStory />

        <section id="capabilities" className="home-capabilities">
          <div className="home-section-heading" data-reveal="up">
            <div>
              <p className="home-eyebrow">03 / Three value layers</p>
              <h2>Understand the system. Define the problem. Evaluate solvers.</h2>
            </div>
            <Link className="text-link" href="/solution">
              View all features
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="capability-layout">
            <article
              className="capability-feature capability-feature-large"
              data-reveal="up"
            >
              <Image
                src="/images/intro-grid-control-room.png"
                alt="Operations center displaying grid analytics data"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 66vw"
              />
              <div className="capability-shade" />
              <div className="capability-copy">
                <span>Operational picture</span>
                <h3>Monitor the full grid operations chain</h3>
                <p>
                  Connect measurements, forecasts, state estimation, power distribution and dispatch
                  into a single visual workflow.
                </p>
                <Link href="/solution#pipeline" aria-label="Explore the operations pipeline">
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              </div>
            </article>

            <div className="capability-side">
              <article className="capability-feature motion-delay-1" data-reveal="up">
                <Image
                  src="/images/solution-quantum-map.png"
                  alt="Quantum solver map connected to grid problems"
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <div className="capability-shade" />
                <div className="capability-copy">
                  <span>Quantum application map</span>
                  <h3>Identify where quantum creates value</h3>
                  <Link href="/solution#quantum-map" aria-label="Explore the quantum problem map">
                    <ArrowRight aria-hidden="true" size={20} />
                  </Link>
                </div>
              </article>
              <article className="capability-feature motion-delay-2" data-reveal="up">
                <Image
                  src="/images/solution-solver-workspace.png"
                  alt="Quantum power flow solver test workspace"
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <div className="capability-shade" />
                <div className="capability-copy">
                  <span>Solver testbed</span>
                  <h3>Compare Classical, HHL and VQLS</h3>
                  <Link href="/solution#solver" aria-label="Open the solver workspace">
                    <ArrowRight aria-hidden="true" size={20} />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="demo" className="home-final-cta">
          <div data-reveal="up">
            <p className="home-eyebrow">04 / MVP QPF ready to try</p>
            <h2>From solution overview to a verifiable solver run.</h2>
          </div>
          <div className="home-final-actions motion-delay-1" data-reveal="up">
            <Link className="action-link action-link-solid" href="/solution#solver">
              <Zap aria-hidden="true" size={17} />
              Run QPF demo
            </Link>
            <Link className="text-link text-link-light" href="/roadmap">
              View development roadmap
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
