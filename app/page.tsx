import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Play,
  Zap
} from "lucide-react";
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
            alt="Toàn cảnh lưới điện và hạ tầng năng lượng tái tạo được kết nối vào ban đêm"
            fill
            priority
            sizes="100vw"
          />
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <p className="hero-kicker">
              <span aria-hidden="true" />
              Giải pháp vận hành lưới điện thế hệ mới
            </p>
            <h1>QuanWatt — Nền tảng vận hành lưới điện hỗ trợ lượng tử</h1>
            <p className="home-hero-lead">
              QuanWatt kết nối dữ liệu vận hành, mô hình hệ thống điện và các bộ giải lượng tử trong
              một quy trình thống nhất.
            </p>
            <p className="home-hero-vn">
              Xác định đúng bài toán, đo lường HHL/VQLS và đối sánh với phương pháp cổ điển trước
              khi triển khai.
            </p>
            <div className="home-hero-actions">
              <Link className="action-link action-link-solid" href="/solution">
                Khám phá giải pháp
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
              </Link>
              <Link className="action-link action-link-outline" href="/solution#solver">
                <Play aria-hidden="true" fill="currentColor" size={15} strokeWidth={1.8} />
                Chạy demo QPF
              </Link>
            </div>
          </div>

          <div className="hero-metrics" aria-label="Điểm nổi bật của giải pháp">
            <div>
              <strong>04</strong>
              <span>Nhóm bài toán lượng tử</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Phương pháp được đối sánh</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Bước vận hành được ánh xạ</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Không gian thử nghiệm tích hợp</span>
            </div>
          </div>

          <a className="hero-scroll" href="#platform" aria-label="Xem tổng quan giải pháp">
            <ArrowDown aria-hidden="true" size={18} />
          </a>
        </section>

        <section id="platform" className="home-statement">
          <div className="section-index" data-reveal="up">
            01 / Tổng quan giải pháp
          </div>
          <div className="home-statement-copy motion-delay-1" data-reveal="up">
            <p className="home-eyebrow">Một quy trình, một ngữ cảnh kỹ thuật</p>
            <h2>Từ dữ liệu lưới điện đến thử nghiệm lượng tử trong cùng một nền tảng.</h2>
          </div>
          <p className="home-statement-body motion-delay-2" data-reveal="up">
            QuanWatt cung cấp góc nhìn đầu-cuối về hạ tầng vật lý, quy trình vận hành và hiệu năng bộ
            giải. Nhờ đó, đội ngũ kỹ thuật có thể xác định nơi điện toán lượng tử phù hợp, đo lường
            sai số và thời gian chạy, rồi so sánh trực tiếp với phương pháp cổ điển.
          </p>
        </section>

        <HomeProblemStory />

        <section id="capabilities" className="home-capabilities">
          <div className="home-section-heading" data-reveal="up">
            <div>
              <p className="home-eyebrow">Ba lớp giá trị</p>
              <h2>Hiểu hệ thống. Xác định bài toán. Đánh giá bộ giải.</h2>
            </div>
            <Link className="text-link" href="/solution">
              Xem toàn bộ tính năng
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
                alt="Trung tâm vận hành hiển thị dữ liệu phân tích lưới điện"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 66vw"
              />
              <div className="capability-shade" />
              <div className="capability-copy">
                <span>Bức tranh vận hành</span>
                <h3>Theo dõi toàn bộ chuỗi vận hành lưới điện</h3>
                <p>
                  Liên kết đo lường, dự báo, ước lượng trạng thái, phân bố công suất và điều độ trong
                  một luồng xử lý trực quan.
                </p>
                <Link href="/solution#pipeline" aria-label="Khám phá quy trình vận hành">
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              </div>
            </article>

            <div className="capability-side">
              <article className="capability-feature motion-delay-1" data-reveal="up">
                <Image
                  src="/images/solution-quantum-map.png"
                  alt="Bản đồ bộ giải lượng tử kết nối với các bài toán lưới điện"
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <div className="capability-shade" />
                <div className="capability-copy">
                  <span>Bản đồ ứng dụng lượng tử</span>
                  <h3>Xác định nơi lượng tử tạo ra giá trị</h3>
                  <Link href="/solution#quantum-map" aria-label="Khám phá bản đồ bài toán lượng tử">
                    <ArrowRight aria-hidden="true" size={20} />
                  </Link>
                </div>
              </article>
              <article className="capability-feature motion-delay-2" data-reveal="up">
                <Image
                  src="/images/solution-solver-workspace.png"
                  alt="Không gian thử nghiệm bộ giải phân bố công suất lượng tử"
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <div className="capability-shade" />
                <div className="capability-copy">
                  <span>Không gian thử nghiệm bộ giải</span>
                  <h3>Đối sánh Classical, HHL và VQLS</h3>
                  <Link href="/solution#solver" aria-label="Mở không gian thử nghiệm bộ giải">
                    <ArrowRight aria-hidden="true" size={20} />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="demo" className="home-final-cta">
          <div data-reveal="up">
            <p className="home-eyebrow">MVP QPF sẵn sàng trải nghiệm</p>
            <h2>Từ tổng quan giải pháp đến một lượt chạy bộ giải có thể kiểm chứng.</h2>
          </div>
          <div className="home-final-actions motion-delay-1" data-reveal="up">
            <Link className="action-link action-link-solid" href="/solution#solver">
              <Zap aria-hidden="true" size={17} />
              Chạy demo QPF
            </Link>
            <Link className="text-link text-link-light" href="/roadmap">
              Xem lộ trình phát triển
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
