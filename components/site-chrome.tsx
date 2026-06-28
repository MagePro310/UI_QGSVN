import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Trang chủ QuanWatt">
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
        <Link href="/">Tổng quan</Link>
        <Link href="/solution">Giải pháp</Link>
        <Link href="/solution#solver">Demo</Link>
        <Link href="/roadmap">Lộ trình</Link>
        <Link className="nav-cta" href="/solution#solver">
          Mở workspace
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
        <span>Nền tảng vận hành lưới điện hỗ trợ lượng tử</span>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <Link href="/">Tổng quan</Link>
        <Link href="/solution">Giải pháp</Link>
        <Link href="/solution#solver">Demo</Link>
        <Link href="/roadmap">Lộ trình</Link>
      </div>
      <div className="footer-meta">
        <span>MVP QPF với định hướng mở rộng QSE, QOPF và QEMTP</span>
        <span>Nghiên cứu hạ tầng hỗ trợ bởi điện toán lượng tử</span>
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
