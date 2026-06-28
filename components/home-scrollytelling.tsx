"use client";

import Image from "next/image";
import { Activity, Cpu, Network, Radio, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const storySteps = [
  {
    number: "01",
    eyebrow: "Tín hiệu hiện trường",
    title: "Thu thập trạng thái vận hành",
    body:
      "SCADA, PMU và AMI được đưa về một ngữ cảnh chung để kỹ sư nhìn thấy điện áp, công suất và trạng thái thiết bị theo cùng một dòng thời gian.",
    details: ["SCADA / PMU / AMI", "Voltage & P/Q", "Trạng thái thiết bị"],
    image: "/images/intro-grid-control-room.png",
    icon: Radio
  },
  {
    number: "02",
    eyebrow: "Mô hình hệ thống",
    title: "Chuyển lưới điện thành bài toán",
    body:
      "Topology, giới hạn vận hành và trạng thái lưới được chuẩn hóa thành ma trận, vector và ràng buộc phù hợp với từng bài toán QSE, QPF, QOPF hoặc QEMTP.",
    details: ["Grid topology", "Linear system", "Ràng buộc kỹ thuật"],
    image: "/images/solution-quantum-map.png",
    icon: Network
  },
  {
    number: "03",
    eyebrow: "Không gian tính toán",
    title: "Đối sánh Classical, HHL và VQLS",
    body:
      "Cùng một dữ liệu đầu vào được chạy qua các hướng giải khác nhau. Sai số, residual, thời gian chạy và tài nguyên lượng tử được đặt cạnh nhau để đánh giá công bằng.",
    details: ["Relative error", "Residual norm", "Runtime & qubits"],
    image: "/images/solution-solver-workspace.png",
    icon: Cpu
  },
  {
    number: "04",
    eyebrow: "Kết quả kỹ thuật",
    title: "Chuyển kết quả thành quyết định",
    body:
      "Điện áp nút, dòng công suất, mức mang tải và vi phạm giới hạn được trả về trong ngữ cảnh hệ thống điện, hỗ trợ một quyết định có thể truy vết.",
    details: ["Electrical result", "Cảnh báo vi phạm", "Khuyến nghị vận hành"],
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
        <div className="section-index section-index-light">03 / Quy trình giải pháp</div>
        <div>
          <p className="home-eyebrow">Từ tín hiệu đến quyết định</p>
          <h2 id="scrolly-title">Một câu chuyện vận hành xuyên suốt bốn bước.</h2>
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
              <span>QGRID / LIVE FLOW</span>
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
                <ul aria-label={`Dữ liệu chính của bước ${step.number}`}>
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
