"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  mockResult,
  pipelineModules,
  problems,
  qpfCase,
  quantumMappings,
  type BackendLabel,
  type ProblemCode,
  type SolverConfig,
  type SolverRequestPreview,
  type SolverResult,
  type SolverRun,
  type SolverType
} from "@/lib/grid-data";

const solverTypes: SolverType[] = ["CLASSICAL", "HHL", "VQLS"];
const problemCodes = Object.keys(problems) as ProblemCode[];

interface ChartRow {
  label: string;
  value: number;
  display: string;
  color?: "green" | "amber" | "violet" | "red" | "teal";
}

function tagClass(tag: string) {
  if (tag.includes("Quantum")) return "tag-quantum";
  if (tag === "Warning") return "tag-warning";
  if (tag === "Running" || tag === "Completed") return "tag-running";
  return "tag-ready";
}

function formatValue(value: number | null | undefined) {
  return value === null || value === undefined ? "-" : value;
}

function createSolverConfig(
  solverType: SolverType,
  backend: BackendLabel,
  shots: number,
  tolerance: number
): SolverConfig {
  return {
    solver_type: solverType,
    backend: backend.toLowerCase().replaceAll(" ", "_"),
    shots,
    tolerance,
    max_iterations: 100,
    noise_model: backend === "Noisy simulator" ? "basic" : "none"
  };
}

function buildRequestPreview(
  selectedProblem: ProblemCode,
  solverConfig: SolverConfig
): SolverRequestPreview {
  return {
    run_id: "run-qpf-001",
    problem_type: selectedProblem,
    grid_case: {
      case_id: qpfCase.case_id,
      baseMVA: qpfCase.baseMVA,
      buses: qpfCase.buses,
      branches: qpfCase.branches
    },
    solver_config: solverConfig,
    options: {
      return_matrix: true,
      return_raw_solver_output: true,
      compare_with_classical: true
    }
  };
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BarChart({ rows, fixedMax }: { rows: ChartRow[]; fixedMax?: number }) {
  const max = fixedMax ?? Math.max(...rows.map((row) => row.value), 1);

  return (
    <div className="bar-chart">
      {rows.map((row) => {
        const width = Math.max(2, Math.min(100, (row.value / max) * 100));

        return (
          <div className="bar-row" key={row.label}>
            <span className="bar-label">{row.label}</span>
            <span className="bar-track">
              <span className={`bar-fill ${row.color ?? ""}`} style={{ width: `${width}%` }} />
            </span>
            <span>{row.display}</span>
          </div>
        );
      })}
    </div>
  );
}

function selectedSolverFromRun(run: SolverRun, fallback: SolverType): SolverResult {
  const preferred = run.selected_solver ?? fallback;
  return run.solvers.find((solver) => solver.solver_type === preferred) ?? run.solvers[0];
}

function executionSteps(completed: boolean, solverType: SolverType) {
  return [
    "Loading grid case...",
    "Building matrix A and vector b...",
    "Normalizing input...",
    `Running ${solverType} solver...`,
    "Post-processing electrical result...",
    "Comparing with classical baseline...",
    completed ? "Completed." : "Ready to run."
  ];
}

export function SolutionPageClient() {
  const [selectedPipelineId, setSelectedPipelineId] = useState(pipelineModules[3].id);
  const [selectedProblem, setSelectedProblem] = useState<ProblemCode>("QPF");
  const [solverType, setSolverType] = useState<SolverType>("VQLS");
  const [backend, setBackend] = useState<BackendLabel>("Simulator");
  const [shots, setShots] = useState(2048);
  const [tolerance, setTolerance] = useState(0.001);
  const [runCompleted, setRunCompleted] = useState(false);
  const [lastRun, setLastRun] = useState<SolverRun>(() => ({
    ...mockResult,
    selected_solver: "VQLS"
  }));

  const selectedPipeline =
    pipelineModules.find((item) => item.id === selectedPipelineId) ?? pipelineModules[3];
  const selectedProblemInfo = problems[selectedProblem];

  const solverConfig = useMemo(
    () => createSolverConfig(solverType, backend, shots, tolerance),
    [backend, shots, solverType, tolerance]
  );
  const requestPreview = useMemo(
    () => buildRequestPreview(selectedProblem, solverConfig),
    [selectedProblem, solverConfig]
  );
  const selectedSolver = selectedSolverFromRun(lastRun, solverType);
  const warning = selectedSolver.electrical_result.violations[0];
  const executionLog = executionSteps(runCompleted, solverType);

  const runSolver = () => {
    setLastRun({
      ...mockResult,
      selected_solver: solverType,
      selected_config: solverConfig,
      created_at: new Date().toISOString()
    });
    setRunCompleted(true);
    window.location.hash = "results";
  };

  const jumpToProblem = (problemCode: ProblemCode) => {
    setSelectedProblem(problemCode);
    scrollToSection("problems");
  };

  const downloadReport = () => {
    const selected = selectedSolverFromRun(lastRun, solverType);
    const report = {
      report_id: `report-${Date.now()}`,
      run: lastRun,
      selected_solver_result: selected,
      grid_case: qpfCase,
      api_contract: {
        next_route: "/api/solver-runs",
        fastapi_route: "/solve/qpf"
      }
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qpf-demo-technical-report.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
        <section id="home" className="hero-section">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Solution &amp; Features</p>
            <h1>Quantum-assisted Grid Operation Workspace</h1>
            <p className="hero-copy">
              Connect power grid operation workflows with quantum-assisted solver experiments for
              QPF, QSE, QOPF, and QEMTP.
            </p>
            <p className="hero-vn">
              Trang giải pháp tập trung vào pipeline vận hành, bản đồ bài toán lượng tử và demo QPF
              với Classical, HHL, VQLS.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#pipeline">
                <span aria-hidden="true">↳</span>
                View Solution Flow
              </a>
              <a className="button button-secondary" href="#solver">
                <span aria-hidden="true">▶</span>
                Run QPF Demo
              </a>
              <a className="button button-ghost" href="#quantum-map">
                <span aria-hidden="true">⌁</span>
                Map Quantum Problems
              </a>
            </div>
          </div>
        </section>

        <section className="problem-strip" aria-label="Quantum problem summary">
          <article className="problem-card">
            <span>QSE</span>
            <strong>Quantum State Estimation</strong>
            <p>Estimate the real-time state of the grid from noisy measurement data.</p>
          </article>
          <article className="problem-card featured">
            <span>QPF</span>
            <strong>Quantum Power Flow</strong>
            <p>Calculate voltage, phase angle and power flow across the network.</p>
          </article>
          <article className="problem-card">
            <span>QOPF</span>
            <strong>Quantum Optimal Power Flow</strong>
            <p>Optimize grid operation while satisfying physical and economic constraints.</p>
          </article>
          <article className="problem-card">
            <span>QEMTP</span>
            <strong>Quantum EMT / Transient Analysis</strong>
            <p>Simulate transient and dynamic behavior after disturbances.</p>
          </article>
        </section>

        <section className="page-section visual-band-section" aria-label="Solution visual overview">
          <div className="visual-card-grid">
            <article className="visual-card">
              <figure className="media-frame">
                <Image
                  src="/images/solution-operation-pipeline.png"
                  alt="Power grid operation pipeline dashboard"
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </figure>
              <h3>Operation Pipeline</h3>
              <p>SCADA/PMU/AMI data flows into forecasting, analysis, dispatch, and decisions.</p>
            </article>
            <article className="visual-card">
              <figure className="media-frame">
                <Image
                  src="/images/solution-quantum-map.png"
                  alt="Quantum solver mapping over a power grid network"
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </figure>
              <h3>Quantum Problem Map</h3>
              <p>QSE, QPF, QOPF, and QEMTP are positioned inside the operation workflow.</p>
            </article>
            <article className="visual-card">
              <figure className="media-frame">
                <Image
                  src="/images/solution-solver-workspace.png"
                  alt="Solver workspace dashboard for QPF"
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </figure>
              <h3>Solver Workspace</h3>
              <p>Configure Classical, HHL, and VQLS runs before comparing technical outputs.</p>
            </article>
          </div>
        </section>

        <section id="pipeline" className="page-section band">
          <div className="section-heading">
            <p className="eyebrow">Monitoring - Analysis - Operation</p>
            <h2>Operation Pipeline Dashboard</h2>
            <p>
              Pipeline vận hành mô tả dòng dữ liệu trong hệ thống điện, từ đo đạc SCADA/PMU/AMI
              đến dự báo, phân tích và ra quyết định.
            </p>
          </div>
          <figure className="section-image">
            <Image
              src="/images/solution-operation-pipeline.png"
              alt="SCADA, PMU, forecasting, analysis, dispatch, and decision support workflow"
              fill
              sizes="100vw"
            />
          </figure>
          <div className="pipeline-layout">
            <div className="pipeline-track" aria-label="Operation modules">
              {pipelineModules.map((item) => (
                <button
                  className={`pipeline-node ${item.id === selectedPipelineId ? "is-active" : ""}`}
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPipelineId(item.id)}
                >
                  <span className="node-icon">{item.icon}</span>
                  <strong>{item.name}</strong>
                  <p>{item.question}</p>
                  <span className="tag-row">
                    {item.tags.map((tag) => (
                      <span className={`tag ${tagClass(tag)}`} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
            <aside className="detail-panel" aria-live="polite">
              <h3>Selected Module: {selectedPipeline.name}</h3>
              <div className="detail-grid">
                <div>
                  <strong>Purpose</strong>
                  <p>{selectedPipeline.question}</p>
                </div>
                <div>
                  <strong>Input</strong>
                  <p>{selectedPipeline.input}</p>
                </div>
                <div>
                  <strong>Output</strong>
                  <p>{selectedPipeline.output}</p>
                </div>
                <div>
                  <strong>Quantum Support</strong>
                  <p>{selectedPipeline.quantum}</p>
                </div>
              </div>
            </aside>
          </div>
          <div className="quantum-locations" aria-label="Quantum problem locations">
            <span>Quantum problem locations</span>
            {problemCodes.map((problemCode) => (
              <button key={problemCode} type="button" onClick={() => jumpToProblem(problemCode)}>
                {problemCode}
              </button>
            ))}
          </div>
        </section>

        <section id="quantum-map" className="page-section">
          <div className="section-heading">
            <p className="eyebrow">Quantum solver placement</p>
            <h2>Quantum Problem Map in Power Grid Operation</h2>
            <p>
              HHL and VQLS are positioned as quantum linear solvers for computationally intensive
              subproblems in power grid operation.
            </p>
          </div>
          <figure className="section-image">
            <Image
              src="/images/solution-quantum-map.png"
              alt="Quantum linear solver map connected to grid analysis modules"
              fill
              sizes="100vw"
            />
          </figure>
          <div className="map-layout">
            <div className="map-column">
              <h3>Operation pipeline</h3>
              <ol className="compact-list">
                <li>Measurement</li>
                <li>Forecasting</li>
                <li>State Estimation</li>
                <li>Power Flow</li>
                <li>Contingency Analysis</li>
                <li>OPF / Dispatch</li>
                <li>EMT / Stability</li>
                <li>Decision</li>
              </ol>
            </div>
            <div className="map-column accent">
              <h3>Quantum modules</h3>
              <div className="module-list">
                {quantumMappings.map((item) => (
                  <div className="module-item" key={item.code}>
                    <strong>{item.code}</strong>
                    <span>{item.problem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Quantum module</th>
                  <th>Grid problem</th>
                  <th>Pipeline position</th>
                  <th>HHL/VQLS role</th>
                </tr>
              </thead>
              <tbody>
                {quantumMappings.map((item) => (
                  <tr key={item.code}>
                    <td>
                      <strong>{item.code}</strong>
                      <br />
                      {item.title}
                    </td>
                    <td>{item.problem}</td>
                    <td>{item.position}</td>
                    <td>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="solver-layer">
            HHL / VQLS Linear Solver Layer: support large linear systems and linearized steps. They
            accelerate selected computation blocks; they do not replace the full grid operation
            pipeline.
          </p>
        </section>

        <section id="problems" className="page-section band">
          <div className="section-heading">
            <p className="eyebrow">Problem library</p>
            <h2>Quantum Power Grid Problems</h2>
            <p>
              QPF is the first MVP module. QSE, QOPF and QEMTP are prepared as compatible future
              extensions.
            </p>
          </div>
          <figure className="section-image">
            <Image
              src="/images/solution-quantum-map.png"
              alt="QSE, QPF, QOPF, and QEMTP module clusters"
              fill
              sizes="100vw"
            />
          </figure>
          <div className="problem-library">
            {problemCodes.map((problemCode) => (
              <button
                className={`library-card ${problemCode === selectedProblem ? "is-active" : ""}`}
                key={problemCode}
                type="button"
                onClick={() => setSelectedProblem(problemCode)}
              >
                <span className={`tag ${problemCode === "QPF" ? "tag-running" : "tag-ready"}`}>
                  {problems[problemCode].status}
                </span>
                <strong>{problemCode}</strong>
                <p>{problems[problemCode].summary}</p>
              </button>
            ))}
          </div>
          <article className="problem-detail" aria-live="polite">
            <h3>{selectedProblemInfo.title}</h3>
            <p>{selectedProblemInfo.body}</p>
            <div className="problem-detail-grid">
              <div>
                <strong>Input</strong>
                <p>{selectedProblemInfo.input}</p>
              </div>
              <div>
                <strong>Output</strong>
                <p>{selectedProblemInfo.output}</p>
              </div>
              <div>
                <strong>Solver explanation</strong>
                <p>{selectedProblemInfo.solver}</p>
              </div>
            </div>
          </article>
        </section>

        <section id="solver" className="page-section solver-section">
          <div className="section-heading">
            <p className="eyebrow">Interactive MVP workspace</p>
            <h2>Solver Workspace</h2>
            <p>
              Select a grid case, choose a power system problem, configure the solver and run
              Classical/HHL/VQLS comparison.
            </p>
          </div>
          <figure className="section-image">
            <Image
              src="/images/solution-solver-workspace.png"
              alt="QPF solver workspace with matrix, controls, and execution preview"
              fill
              sizes="100vw"
            />
          </figure>

          <div className="workspace-grid">
            <section className="tool-panel">
              <h3>Input Grid Case</h3>
              <label htmlFor="case-select">Grid case</label>
              <select id="case-select" defaultValue="qpf_demo_3_bus_dc">
                <option value="qpf_demo_3_bus_dc">IEEE-style 3-bus QPF demo</option>
                <option value="ieee_5_bus" disabled>
                  IEEE 5-bus scaffold
                </option>
                <option value="ieee_14_bus" disabled>
                  IEEE 14-bus scaffold
                </option>
                <option value="custom" disabled>
                  Upload custom case
                </option>
              </select>

              <label htmlFor="problem-select">Problem type</label>
              <select
                id="problem-select"
                value={selectedProblem}
                onChange={(event) => setSelectedProblem(event.target.value as ProblemCode)}
              >
                <option value="QPF">QPF - Quantum Power Flow</option>
                <option value="QSE">QSE - Scaffold</option>
                <option value="QOPF">QOPF - Scaffold</option>
                <option value="QEMTP">QEMTP - Scaffold</option>
              </select>

              <div className="case-summary">
                <div className="metric-box">
                  <span>Base MVA</span>
                  <strong>{qpfCase.baseMVA}</strong>
                </div>
                <div className="metric-box">
                  <span>Frequency</span>
                  <strong>{qpfCase.frequencyHz} Hz</strong>
                </div>
                <div className="metric-box">
                  <span>Buses</span>
                  <strong>{qpfCase.buses.length}</strong>
                </div>
                <div className="metric-box">
                  <span>Branches</span>
                  <strong>{qpfCase.branches.length}</strong>
                </div>
              </div>
            </section>

            <section className="tool-panel">
              <h3>Mathematical Model</h3>
              <div className="matrix-meta">
                <div className="metric-box">
                  <span>Model</span>
                  <strong>{qpfCase.model_type}</strong>
                </div>
                <div className="metric-box">
                  <span>Matrix size</span>
                  <strong>
                    {qpfCase.linear_system.A.length} x {qpfCase.linear_system.A[0].length}
                  </strong>
                </div>
                <div className="metric-box">
                  <span>Variables</span>
                  <strong>{qpfCase.linear_system.variables.length}</strong>
                </div>
                <div className="metric-box">
                  <span>Condition</span>
                  <strong>3.12</strong>
                </div>
              </div>

              <div className="matrix-box" aria-label="Linear system matrix">
                <div className="matrix">
                  A = [
                  <br />
                  {qpfCase.linear_system.A.map((row, index) => (
                    <span key={index}>
                      &nbsp;&nbsp;[{row.map((n) => n.toFixed(1)).join(", ")}]
                      <br />
                    </span>
                  ))}
                  ]
                </div>
                <div className="vector">
                  b = [{qpfCase.linear_system.b.join(", ")}]
                  <br />x = [{qpfCase.linear_system.variables.join(", ")}]
                  <br />
                  unit = {qpfCase.linear_system.unit}
                </div>
              </div>
            </section>

            <section className="tool-panel">
              <h3>Solver Configuration</h3>
              <fieldset className="segmented">
                <legend>Solver type</legend>
                {solverTypes.map((type) => (
                  <label key={type}>
                    <input
                      checked={solverType === type}
                      name="solver"
                      type="radio"
                      value={type}
                      onChange={() => setSolverType(type)}
                    />
                    <span>{type === "CLASSICAL" ? "Classical" : type}</span>
                  </label>
                ))}
              </fieldset>

              <label htmlFor="backend-select">Quantum backend</label>
              <select
                id="backend-select"
                value={backend}
                onChange={(event) => setBackend(event.target.value as BackendLabel)}
              >
                <option>Simulator</option>
                <option>Noisy simulator</option>
                <option disabled>Real quantum backend</option>
              </select>

              <label htmlFor="shots-range">
                Shots <output>{shots}</output>
              </label>
              <input
                id="shots-range"
                max="4096"
                min="512"
                step="512"
                type="range"
                value={shots}
                onChange={(event) => setShots(Number(event.target.value))}
              />

              <label htmlFor="tolerance-range">
                Tolerance <output>{tolerance.toFixed(3)}</output>
              </label>
              <input
                id="tolerance-range"
                max="0.01"
                min="0.001"
                step="0.001"
                type="range"
                value={tolerance}
                onChange={(event) => setTolerance(Number(event.target.value))}
              />

              <button className="button button-primary run-button" type="button" onClick={runSolver}>
                <span aria-hidden="true">▶</span>
                Run Solver
              </button>
            </section>
          </div>

          <section className="execution-panel" aria-label="Execution log">
            <div>
              <h3>Execution Log</h3>
              <ol id="execution-log">
                {executionLog.map((step, index) => (
                  <li className={runCompleted || index < 2 ? "is-complete" : ""} key={step}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="api-preview">
              <h3>FastAPI Request Preview</h3>
              <pre>{JSON.stringify(requestPreview, null, 2)}</pre>
            </div>
          </section>
        </section>

        <section id="results" className="page-section band">
          <div className="section-heading">
            <p className="eyebrow">Comparison dashboard</p>
            <h2>Result Dashboard</h2>
            <p>Compare electrical results and solver performance between Classical, HHL and VQLS.</p>
          </div>
          <figure className="section-image">
            <Image
              src="/images/solution-results-dashboard.png"
              alt="Solver comparison result dashboard with charts, warnings, and report preview"
              fill
              sizes="100vw"
            />
          </figure>

          <div className="summary-grid">
            <article className="summary-card">
              <span>Runtime</span>
              <strong>{selectedSolver.runtime_ms} ms</strong>
            </article>
            <article className="summary-card">
              <span>Relative Error</span>
              <strong>{selectedSolver.relative_error}</strong>
            </article>
            <article className="summary-card">
              <span>Feasibility</span>
              <strong>Completed</strong>
            </article>
            <article className="summary-card">
              <span>Violation Count</span>
              <strong>{selectedSolver.electrical_result.violations.length}</strong>
            </article>
          </div>

          <div className="dashboard-grid">
            <section className="chart-panel">
              <h3>Runtime Comparison</h3>
              <BarChart
                rows={lastRun.solvers.map((solver) => ({
                  label: solver.solver_type,
                  value: solver.runtime_ms,
                  display: `${solver.runtime_ms} ms`,
                  color:
                    solver.solver_type === "CLASSICAL"
                      ? "green"
                      : solver.solver_type === "HHL"
                        ? "violet"
                        : "teal"
                }))}
              />
            </section>
            <section className="chart-panel">
              <h3>Relative Error</h3>
              <BarChart
                fixedMax={0.02}
                rows={lastRun.solvers.map((solver) => ({
                  label: solver.solver_type,
                  value: solver.relative_error,
                  display: solver.relative_error.toFixed(3),
                  color:
                    solver.solver_type === "CLASSICAL"
                      ? "green"
                      : solver.solver_type === "HHL"
                        ? "violet"
                        : "amber"
                }))}
              />
            </section>
            <section className="chart-panel">
              <h3>Voltage Profile</h3>
              <BarChart
                fixedMax={1.05}
                rows={selectedSolver.electrical_result.bus_results.map((bus) => ({
                  label: `Bus ${bus.bus_id}`,
                  value: bus.voltage_pu,
                  display: bus.voltage_pu.toFixed(3),
                  color: bus.voltage_pu < 0.985 ? "amber" : "green"
                }))}
              />
            </section>
            <section className="chart-panel">
              <h3>Line Loading</h3>
              <BarChart
                fixedMax={100}
                rows={selectedSolver.electrical_result.branch_results.map((branch) => ({
                  label: branch.branch_id,
                  value: branch.loading_percent,
                  display: `${branch.loading_percent.toFixed(1)}%`,
                  color: branch.loading_percent > 80 ? "amber" : "teal"
                }))}
              />
            </section>
          </div>

          <div className="result-tables">
            <section>
              <h3>Bus Result Table</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Bus</th>
                      <th>Type</th>
                      <th>Voltage pu</th>
                      <th>Angle deg</th>
                      <th>P injection MW</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSolver.electrical_result.bus_results.map((bus) => {
                      const busMeta = qpfCase.buses.find((item) => item.bus_id === bus.bus_id);

                      return (
                        <tr key={bus.bus_id}>
                          <td>{bus.bus_id}</td>
                          <td>{busMeta?.type ?? "-"}</td>
                          <td>{bus.voltage_pu.toFixed(3)}</td>
                          <td>{bus.angle_deg.toFixed(3)}</td>
                          <td>{bus.p_injection_mw.toFixed(1)}</td>
                          <td>
                            <span
                              className={`status-pill ${
                                bus.status === "NORMAL" ? "status-normal" : "status-warning"
                              }`}
                            >
                              {bus.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3>Branch Result Table</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>From-To</th>
                      <th>P flow MW</th>
                      <th>Rate MVA</th>
                      <th>Loading</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSolver.electrical_result.branch_results.map((branch) => {
                      const branchMeta = qpfCase.branches.find(
                        (item) => item.branch_id === branch.branch_id
                      );

                      return (
                        <tr key={branch.branch_id}>
                          <td>{branch.branch_id}</td>
                          <td>
                            {branch.from_bus}-{branch.to_bus}
                          </td>
                          <td>{branch.p_flow_mw.toFixed(2)}</td>
                          <td>{branchMeta ? branchMeta.rate_mva.toFixed(1) : "-"}</td>
                          <td>{branch.loading_percent.toFixed(2)}%</td>
                          <td>
                            <span
                              className={`status-pill ${
                                branch.status === "NORMAL" ? "status-normal" : "status-warning"
                              }`}
                            >
                              {branch.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3>Solver Comparison Table</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Solver</th>
                      <th>Runtime ms</th>
                      <th>Relative error</th>
                      <th>Residual norm</th>
                      <th>Qubits</th>
                      <th>Circuit depth</th>
                      <th>Shots</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastRun.solvers.map((solver) => (
                      <tr key={solver.solver_type}>
                        <td>{solver.solver_type}</td>
                        <td>{solver.runtime_ms}</td>
                        <td>{solver.relative_error}</td>
                        <td>{solver.residual_norm}</td>
                        <td>{formatValue(solver.qubit_count)}</td>
                        <td>{formatValue(solver.circuit_depth)}</td>
                        <td>{formatValue(solver.shots)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="recommendation">
            <h3>Decision Recommendation</h3>
            <p>
              <strong>{lastRun.comparison_summary.recommended_solver_for_demo}</strong> is
              recommended for the demo because it uses fewer qubits than HHL while keeping error
              within the MVP comparison range.
            </p>
            {warning ? (
              <p>
                {warning.message} Recommended action: {warning.recommended_action}
              </p>
            ) : null}
          </aside>
        </section>

        <section id="report" className="page-section">
          <div className="section-heading">
            <p className="eyebrow">Technical output</p>
            <h2>Technical Report Export</h2>
            <p>
              Export solver inputs, the Ax = b model, solver configuration, comparison metrics,
              warnings and operating recommendation.
            </p>
          </div>
          <div className="report-layout">
            <section className="report-preview">
              <h3>Report Summary</h3>
              <p>
                Technical report for {qpfCase.case_name}. The run compares Classical, HHL and VQLS
                for the QPF MVP using a DC Power Flow linear system.
              </p>
              <dl>
                <dt>Run ID</dt>
                <dd>{lastRun.run_id}</dd>
                <dt>Problem</dt>
                <dd>
                  {lastRun.problem_type} / {lastRun.model_type}
                </dd>
                <dt>Selected solver</dt>
                <dd>{selectedSolver.solver_type}</dd>
                <dt>Matrix model</dt>
                <dd>A shape [2, 2], b shape [2], condition number 3.12, sparse true</dd>
                <dt>Runtime</dt>
                <dd>{selectedSolver.runtime_ms} ms</dd>
                <dt>Relative error</dt>
                <dd>{selectedSolver.relative_error}</dd>
                <dt>Warning</dt>
                <dd>{warning ? `${warning.component_id}: ${warning.message}` : "None"}</dd>
                <dt>Recommendation</dt>
                <dd>{warning?.recommended_action ?? "No corrective action required."}</dd>
              </dl>
            </section>
            <section className="report-actions">
              <h3>Export</h3>
              <p>
                The MVP uses mock solver results prepared for UI integration. The same payload
                shape can be replaced by FastAPI responses later.
              </p>
              <button className="button button-primary" type="button" onClick={downloadReport}>
                <span aria-hidden="true">⇩</span>
                Download JSON Report
              </button>
              <button className="button button-secondary" type="button" onClick={() => window.print()}>
                <span aria-hidden="true">⎙</span>
                Print Technical Report
              </button>
            </section>
          </div>
        </section>
      </main>
  );
}
