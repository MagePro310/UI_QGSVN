import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="QuanWatt homepage">
        <Image
          className="brand-logo"
          src="/images/quanwatt-logo.png"
          alt="QuanWatt"
          width={800}
          height={690}
          priority
        />
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        <Link href="/#services">Services</Link>
        <Link href="/solution">Technology</Link>
        <Link href="/solution#solver">Demo</Link>
        <Link href="/roadmap">Roadmap</Link>
        <Link className="nav-cta" href="/#contact">
          Discuss a pilot
          <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Image
          className="footer-brand-logo"
          src="/images/quanwatt-logo.png"
          alt="QuanWatt"
          width={800}
          height={690}
        />
        <span>Quantum simulation and benchmarking for power-system R&amp;D</span>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <Link href="/#services">Services</Link>
        <Link href="/solution">Technology</Link>
        <Link href="/solution#solver">Demo</Link>
        <Link href="/roadmap">Roadmap</Link>
        {/* TODO: Replace placeholder contact details before production launch. */}
        <a href="mailto:contact@quanwatt.com">Contact</a>
      </div>
      <div className="footer-meta">
        <span>Available for pilot projects and research collaboration</span>
        <span>Vietnam · contact@quanwatt.com</span>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
