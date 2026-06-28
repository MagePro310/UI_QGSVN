"use client";

import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowUpRight, Gauge, RadioTower, SlidersHorizontal, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const problemStories = [
  {
    code: "QSE",
    name: "Ước lượng trạng thái",
    question: "Trạng thái thật của lưới hiện tại là gì?",
    body:
      "QSE kết hợp dữ liệu đo và mô hình lưới để ước lượng điện áp, góc pha trong điều kiện phép đo có nhiễu hoặc chưa đầy đủ.",
    input: "SCADA, PMU, mô hình lưới",
    output: "Điện áp và góc pha ước lượng",
    method: "WLS linear system",
    status: "Lộ trình mở rộng",
    image: "/images/solution-operation-pipeline.png",
    icon: RadioTower
  },
  {
    code: "QPF",
    name: "Phân bố công suất",
    question: "Công suất đang chảy như thế nào?",
    body:
      "QPF tính điện áp nút, góc pha, dòng công suất và mức mang tải, sau đó đối sánh bộ giải Classical, HHL và VQLS trên cùng dữ liệu đầu vào.",
    input: "Topology, nguồn phát, phụ tải",
    output: "Voltage, line flow, violations",
    method: "DC PF / Newton linear solve",
    status: "MVP hiện tại",
    image: "/images/solution-solver-workspace.png",
    icon: Gauge
  },
  {
    code: "QOPF",
    name: "Tối ưu vận hành",
    question: "Điều độ thế nào để tối ưu chi phí và an toàn?",
    body:
      "QOPF đưa chi phí nguồn phát, giới hạn đường dây và các ràng buộc vận hành vào một bài toán tối ưu có thể thử nghiệm với hướng giải lượng tử.",
    input: "Dự báo, chi phí, ràng buộc",
    output: "Điều độ tối ưu và chi phí",
    method: "KKT / linearized OPF",
    status: "Lộ trình mở rộng",
    image: "/images/solution-quantum-map.png",
    icon: SlidersHorizontal
  },
  {
    code: "QEMTP",
    name: "Phân tích quá độ",
    question: "Lưới phản ứng thế nào sau một nhiễu loạn?",
    body:
      "QEMTP hướng tới chuỗi hệ phương trình theo từng bước thời gian để mô phỏng dạng sóng, đáp ứng động và chỉ báo ổn định sau sự cố.",
    input: "Mô hình động và kịch bản sự cố",
    output: "Dạng sóng và chỉ báo ổn định",
    method: "Per-time-step linear systems",
    status: "Nghiên cứu tiếp theo",
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
        <div className="section-index">02 / Bản đồ bài toán</div>
        <div>
          <p className="home-eyebrow">Bốn câu hỏi vận hành</p>
          <h2 id="problem-story-title">Mỗi điểm nghẽn kỹ thuật cần một cách tiếp cận lượng tử khác nhau.</h2>
        </div>
        <p>
          QuanWatt đặt bài toán điện lực lên trước thuật toán. Cuộn qua từng chương để xem dữ liệu đầu
          vào, kết quả đầu ra và hướng xây dựng hệ tuyến tính tương ứng.
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
                    <dt>Đầu vào</dt>
                    <dd>{story.input}</dd>
                  </div>
                  <div>
                    <dt>Đầu ra</dt>
                    <dd>{story.output}</dd>
                  </div>
                  <div>
                    <dt>Hướng giải</dt>
                    <dd>{story.method}</dd>
                  </div>
                </dl>
                <Link href="/solution#problems">
                  Xem chi tiết {story.code}
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
