"use client";

import Image from "next/image";
import { Building2, Factory, Network, RadioTower, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const gridStages = [
  {
    name: "Nguồn phát",
    label: "Điểm khởi đầu",
    title: "Điện năng được tạo ra và cân bằng theo nhu cầu hệ thống.",
    body:
      "Nhiệt điện, thủy điện, điện gió và điện mặt trời cung cấp công suất trong giới hạn kỹ thuật, dự phòng và tốc độ thay đổi của từng tổ máy.",
    telemetry: "P/Q, điện áp đầu cực, công suất dự phòng",
    risk: "Mất cân bằng nguồn – tải",
    icon: Factory
  },
  {
    name: "Truyền tải",
    label: "Dòng công suất lớn",
    title: "Công suất được đưa đi xa trên lưới điện áp cao.",
    body:
      "Hệ thống truyền tải kết nối vùng nguồn với trung tâm phụ tải. Mỗi nhánh đều được giám sát theo dòng công suất, tổn thất và giới hạn nhiệt.",
    telemetry: "Line flow, losses, branch loading",
    risk: "Quá tải và vi phạm N-1",
    icon: RadioTower
  },
  {
    name: "Trạm biến áp",
    label: "Điểm chuyển đổi",
    title: "Điện áp được biến đổi, đóng cắt và bảo vệ tại trạm.",
    body:
      "Trạm biến áp liên kết các cấp điện áp và tập trung dữ liệu từ máy biến áp, máy cắt, relay bảo vệ cùng hệ thống đo lường điều khiển.",
    telemetry: "Tap, breaker, relay, alarm",
    risk: "Sự cố thiết bị hoặc tác động bảo vệ sai",
    icon: Workflow
  },
  {
    name: "Phân phối",
    label: "Tiếp cận khu vực",
    title: "Lưới trung hạ áp đưa điện đến từng khu vực tiêu thụ.",
    body:
      "Topology phân phối, điện áp nút và mức tải máy biến áp được theo dõi để phát hiện sụt áp, quá tải cục bộ hoặc gián đoạn cung cấp.",
    telemetry: "Node voltage, transformer loading, outage",
    risk: "Sụt áp và quá tải cục bộ",
    icon: Network
  },
  {
    name: "Phụ tải",
    label: "Điểm sử dụng",
    title: "Nhu cầu cuối cùng khép lại vòng lặp vận hành.",
    body:
      "Công nghiệp, tòa nhà, hộ dân và trạm sạc tạo nên hồ sơ nhu cầu biến đổi theo thời gian, thời tiết và hành vi sử dụng điện.",
    telemetry: "Demand profile, AMI, flexibility",
    risk: "Sai số dự báo và thiếu công suất vận hành",
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
        <div className="section-index section-index-light">04 / Hành trình năng lượng</div>
        <div>
          <p className="home-eyebrow">Luôn gắn với hệ thống vật lý</p>
          <h2 id="grid-journey-title">Theo dòng điện từ nguồn phát đến điểm tiêu thụ.</h2>
        </div>
        <p>
          Mỗi kết quả tính toán trong QuanWatt đều có thể truy ngược về thiết bị, đại lượng đo và ràng
          buộc vận hành trên lưới điện thực.
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
                    <dt>Dữ liệu quan sát</dt>
                    <dd>{stage.telemetry}</dd>
                  </div>
                  <div>
                    <dt>Rủi ro cần kiểm soát</dt>
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
