const physicalComponents = [
  {
    id: "generation",
    icon: "GEN",
    name: "Generation",
    status: "Normal",
    statusClass: "status-normal",
    summary: "Creates electricity from thermal, hydro, wind and solar sources.",
    role: "Generates electricity from thermal, hydro, wind and solar sources.",
    input: "Fuel, water, wind, solar irradiance, dispatch command and generation limits.",
    output: "P/Q generation, terminal voltage, generator state and ramping capability.",
    risk: "Generation-load imbalance and insufficient reserve."
  },
  {
    id: "transmission",
    icon: "TX",
    name: "Transmission",
    status: "Warning",
    statusClass: "status-warning",
    summary: "Moves bulk power over long distances at high voltage.",
    role: "Transmits bulk power over long distances at high voltage and connects generation regions to loads.",
    input: "Generator output, line status, thermal limits and grid topology.",
    output: "Line power flow, transmission losses and branch loading.",
    risk: "Overload, cascading outage and N-1 violation."
  },
  {
    id: "substation",
    icon: "SUB",
    name: "Substation",
    status: "Normal",
    statusClass: "status-normal",
    summary: "Transforms voltage levels and supports switching, protection and control.",
    role: "Transforms voltage levels and supports switching, protection, measurement and control.",
    input: "Incoming electrical energy, equipment status and control command.",
    output: "Transformer output voltage, breaker state, measurements and protection alarms.",
    risk: "Lost connection, wrong relay action or transformer constraint violation."
  },
  {
    id: "distribution",
    icon: "DIS",
    name: "Distribution",
    status: "Normal",
    statusClass: "status-normal",
    summary: "Delivers electricity to final customer areas.",
    role: "Delivers electricity to end-customer areas via medium and low-voltage networks.",
    input: "Substation power, distribution topology and customer load data.",
    output: "Customer voltage, transformer loading, meter data and local outage state.",
    risk: "Voltage drop, transformer overload and local interruption."
  },
  {
    id: "loads",
    icon: "LD",
    name: "Loads",
    status: "Selected",
    statusClass: "status-selected",
    summary: "Represents industrial, building, household and EV charging demand.",
    role: "Represents electricity demand from industry, buildings, households and EV charging stations.",
    input: "Demand, weather, production schedule and consumer behavior.",
    output: "Consumption profile, smart meter data and demand flexibility.",
    risk: "Forecast error and shortage or surplus of operating power."
  }
];

const pipelineModules = [
  {
    id: "measurement",
    icon: "MS",
    name: "Measurement",
    question: "What is the grid measuring?",
    input: "SCADA, PMU, AMI",
    output: "Voltage, current, P/Q and device status data.",
    quantum: "Not Supported",
    tags: ["Ready"]
  },
  {
    id: "forecasting",
    icon: "FC",
    name: "Forecasting",
    question: "How will loads and renewable generation change?",
    input: "Historical data, weather, calendar",
    output: "Load, wind and solar forecast.",
    quantum: "Not Supported",
    tags: ["Ready"]
  },
  {
    id: "state-estimation",
    icon: "SE",
    name: "State Estimation",
    question: "What is the true state of the grid right now?",
    input: "Measurements and grid model",
    output: "Estimated voltage and phase angle.",
    quantum: "QSE: HHL/VQLS for WLS linear systems.",
    tags: ["Ready", "Quantum Available"]
  },
  {
    id: "power-flow",
    icon: "PF",
    name: "Power Flow",
    question: "How is power flowing?",
    input: "State, generation, load and branch parameters",
    output: "Voltage profile, line flow, losses and violations.",
    quantum: "QPF: HHL/VQLS for DC PF or Newton linear solve.",
    tags: ["Completed", "Quantum Available"]
  },
  {
    id: "contingency",
    icon: "N1",
    name: "Contingency Analysis",
    question: "If a component is lost, is the system still secure?",
    input: "Grid state and contingency list",
    output: "N-1 violation list.",
    quantum: "QPF can support repeated linearized power flow cases.",
    tags: ["Warning", "Quantum Available"]
  },
  {
    id: "opf",
    icon: "OP",
    name: "OPF / Dispatch",
    question: "How to dispatch to optimize cost and safety?",
    input: "Forecast, cost curves and constraints",
    output: "Optimal dispatch, operating cost and active constraints.",
    quantum: "QOPF: HHL/VQLS for KKT or linearized OPF systems.",
    tags: ["Ready", "Quantum Available"]
  },
  {
    id: "emt",
    icon: "EM",
    name: "EMT / Stability",
    question: "After a disturbance, is the system stable?",
    input: "Dynamic model and disturbance scenario",
    output: "Waveform and stability index.",
    quantum: "QEMTP: HHL/VQLS for per-time-step linear systems.",
    tags: ["Ready", "Quantum Available"]
  },
  {
    id: "decision",
    icon: "DC",
    name: "Decision",
    question: "What decision needs to be made?",
    input: "Results from the full pipeline",
    output: "Safe and economic operating decision.",
    quantum: "Consumes results from supported quantum-assisted steps.",
    tags: ["Ready"]
  }
];

const quantumMappings = [
  {
    code: "QSE",
    title: "Quantum State Estimation",
    problem: "State Estimation",
    position: "After Measurement",
    role: "Solve linear systems in Weighted Least Squares."
  },
  {
    code: "QPF",
    title: "Quantum Power Flow",
    problem: "Power Flow",
    position: "After State Estimation",
    role: "Solve DC Power Flow or Newton linear solve."
  },
  {
    code: "QOPF",
    title: "Quantum Optimal Power Flow",
    problem: "Optimal Power Flow",
    position: "After Contingency / Dispatch",
    role: "Solve KKT systems or linearized OPF."
  },
  {
    code: "QEMTP",
    title: "Quantum EMT / Transient Analysis",
    problem: "EMT / Transient Analysis",
    position: "After Dispatch / Stability",
    role: "Solve per-time-step linear systems."
  }
];

const problems = {
  QPF: {
    title: "QPF - Quantum Power Flow",
    status: "MVP",
    summary: "Quantum Power Flow evaluates how electrical power flows through a grid and compares classical solvers with HHL/VQLS-based quantum solvers.",
    body: "Power Flow computes voltage, phase angle, line flow and losses when the grid topology, generation and load are known. In this MVP, QPF uses a linear DC Power Flow model so the problem can be converted into Ax = b and tested with Classical, HHL and VQLS solvers.",
    input: "Bus data, branch data, generator data, load data, baseMVA and solver configuration.",
    output: "Voltage angle, estimated voltage magnitude, line flow, loading percentage, violations and solver metrics.",
    solver: "Classical is the NumPy/SciPy-style baseline. HHL is a theoretical quantum linear solver benchmark. VQLS is better aligned with small NISQ simulations."
  },
  QSE: {
    title: "QSE - Quantum State Estimation",
    status: "Scaffold",
    summary: "Estimate the true state of the grid from noisy, missing or biased measurements.",
    body: "QSE targets linear systems generated inside state estimation workflows, especially Weighted Least Squares and linearized correction steps.",
    input: "Measurements, grid model, measurement weights and Jacobian or linearized system.",
    output: "Estimated bus voltage, phase angle and bad data indicators.",
    solver: "Prepared as a future extension with mock input, mock output and UI structure."
  },
  QOPF: {
    title: "QOPF - Quantum Optimal Power Flow",
    status: "Scaffold",
    summary: "Find a safe, economic operating plan under physical and market constraints.",
    body: "QOPF aims to use HHL/VQLS for linear systems that arise inside KKT systems, linearized OPF or iterative optimization steps.",
    input: "Load forecast, renewable forecast, cost curves, line limits, voltage limits and generator P/Q limits.",
    output: "Optimal generation, operating cost, voltage setpoints and active constraints.",
    solver: "Prepared as an extension after QPF stabilizes."
  },
  QEMTP: {
    title: "QEMTP - Quantum EMT / Transient Analysis",
    status: "Scaffold",
    summary: "Simulate transient and dynamic grid behavior after disturbances.",
    body: "QEMTP targets linear systems that can appear at each time step during electromagnetic transient or dynamic stability simulation.",
    input: "Dynamic system model, disturbance scenario, equipment parameters and time step.",
    output: "Voltage/current waveforms, stability index and event timeline.",
    solver: "Prepared as a future extension for small solver experiments."
  }
};

const qpfCase = {
  case_id: "qpf_demo_3_bus_dc",
  case_name: "QPF Demo 3-Bus DC Power Flow",
  baseMVA: 100,
  frequencyHz: 50,
  problem_type: "QPF",
  model_type: "DC_POWER_FLOW",
  buses: [
    { bus_id: 1, type: "SLACK", voltage_pu: 1.0, angle_deg: 0.0, p_generation_mw: 80.0, p_load_mw: 0.0 },
    { bus_id: 2, type: "PV", voltage_pu: 1.0, angle_deg: null, p_generation_mw: 60.0, p_load_mw: 20.0 },
    { bus_id: 3, type: "PQ", voltage_pu: null, angle_deg: null, p_generation_mw: 0.0, p_load_mw: 120.0 }
  ],
  branches: [
    { branch_id: "L1-2", from_bus: 1, to_bus: 2, x_pu: 0.1, rate_mva: 90.0 },
    { branch_id: "L1-3", from_bus: 1, to_bus: 3, x_pu: 0.2, rate_mva: 80.0 },
    { branch_id: "L2-3", from_bus: 2, to_bus: 3, x_pu: 0.25, rate_mva: 70.0 }
  ],
  linear_system: {
    description: "DC Power Flow reduced system after removing slack bus.",
    variables: ["theta_bus_2_rad", "theta_bus_3_rad"],
    A: [
      [14.0, -4.0],
      [-4.0, 9.0]
    ],
    b: [0.4, -1.2],
    unit: "per_unit"
  }
};

const mockResult = {
  run_id: "mock-run-qpf-001",
  case_id: "qpf_demo_3_bus_dc",
  problem_type: "QPF",
  model_type: "DC_POWER_FLOW",
  status: "completed",
  created_at: "2026-06-28T10:00:00+07:00",
  comparison_summary: {
    best_accuracy: "CLASSICAL",
    best_quantum_feasibility: "VQLS",
    recommended_solver_for_demo: "VQLS",
    note: "Classical solver is used as baseline. HHL and VQLS results are mock results for UI integration and will be replaced by FastAPI solver outputs."
  },
  solvers: [
    {
      solver_type: "CLASSICAL",
      status: "completed",
      runtime_ms: 5,
      relative_error: 0,
      residual_norm: 0,
      iterations: 1,
      qubit_count: null,
      circuit_depth: null,
      shots: null,
      electrical_result: {
        bus_results: [
          { bus_id: 1, voltage_pu: 1.0, angle_deg: 0.0, p_injection_mw: 80.0, status: "NORMAL" },
          { bus_id: 2, voltage_pu: 0.996, angle_deg: -0.625, p_injection_mw: 40.0, status: "NORMAL" },
          { bus_id: 3, voltage_pu: 0.982, angle_deg: -7.917, p_injection_mw: -120.0, status: "NORMAL" }
        ],
        branch_results: [
          { branch_id: "L1-2", from_bus: 1, to_bus: 2, p_flow_mw: 10.91, loading_percent: 12.12, status: "NORMAL" },
          { branch_id: "L1-3", from_bus: 1, to_bus: 3, p_flow_mw: 69.09, loading_percent: 86.36, status: "WARNING" },
          { branch_id: "L2-3", from_bus: 2, to_bus: 3, p_flow_mw: 50.91, loading_percent: 72.73, status: "NORMAL" }
        ],
        violations: [
          { type: "LINE_LOADING_WARNING", component_id: "L1-3", severity: "warning", message: "Line L1-3 loading is above 80% but below the limit.", recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise." }
        ]
      }
    },
    {
      solver_type: "HHL",
      status: "completed",
      runtime_ms: 830,
      relative_error: 0.014,
      residual_norm: 0.0081,
      iterations: null,
      qubit_count: 4,
      circuit_depth: 38,
      shots: 1024,
      electrical_result: {
        bus_results: [
          { bus_id: 1, voltage_pu: 1.0, angle_deg: 0.0, p_injection_mw: 80.0, status: "NORMAL" },
          { bus_id: 2, voltage_pu: 0.995, angle_deg: -0.64, p_injection_mw: 40.0, status: "NORMAL" },
          { bus_id: 3, voltage_pu: 0.983, angle_deg: -7.84, p_injection_mw: -120.0, status: "NORMAL" }
        ],
        branch_results: [
          { branch_id: "L1-2", from_bus: 1, to_bus: 2, p_flow_mw: 11.17, loading_percent: 12.41, status: "NORMAL" },
          { branch_id: "L1-3", from_bus: 1, to_bus: 3, p_flow_mw: 68.42, loading_percent: 85.53, status: "WARNING" },
          { branch_id: "L2-3", from_bus: 2, to_bus: 3, p_flow_mw: 50.38, loading_percent: 71.97, status: "NORMAL" }
        ],
        violations: [
          { type: "LINE_LOADING_WARNING", component_id: "L1-3", severity: "warning", message: "Line L1-3 loading is above 80% but below the limit.", recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise." }
        ]
      }
    },
    {
      solver_type: "VQLS",
      status: "completed",
      runtime_ms: 1450,
      relative_error: 0.018,
      residual_norm: 0.0105,
      iterations: 42,
      qubit_count: 2,
      circuit_depth: 24,
      shots: 2048,
      electrical_result: {
        bus_results: [
          { bus_id: 1, voltage_pu: 1.0, angle_deg: 0.0, p_injection_mw: 80.0, status: "NORMAL" },
          { bus_id: 2, voltage_pu: 0.997, angle_deg: -0.61, p_injection_mw: 40.0, status: "NORMAL" },
          { bus_id: 3, voltage_pu: 0.981, angle_deg: -8.03, p_injection_mw: -120.0, status: "NORMAL" }
        ],
        branch_results: [
          { branch_id: "L1-2", from_bus: 1, to_bus: 2, p_flow_mw: 10.65, loading_percent: 11.83, status: "NORMAL" },
          { branch_id: "L1-3", from_bus: 1, to_bus: 3, p_flow_mw: 70.1, loading_percent: 87.63, status: "WARNING" },
          { branch_id: "L2-3", from_bus: 2, to_bus: 3, p_flow_mw: 51.05, loading_percent: 72.93, status: "NORMAL" }
        ],
        violations: [
          { type: "LINE_LOADING_WARNING", component_id: "L1-3", severity: "warning", message: "Line L1-3 loading is above 80% but below the limit.", recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise." }
        ]
      }
    }
  ]
};

let selectedPhysical = physicalComponents[0];
let selectedPipeline = pipelineModules[3];
let selectedProblem = "QPF";
let selectedSolver = "VQLS";
let lastRun = { ...mockResult, selected_solver: selectedSolver };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value, fallback = "-") {
  return value === null || value === undefined ? fallback : value;
}

function renderPhysicalFlow() {
  const container = $("#physical-flow");
  container.innerHTML = physicalComponents.map((item) => `
    <button class="flow-node ${item.id === selectedPhysical.id ? "is-active" : ""}" type="button" data-physical="${item.id}">
      <span class="node-icon">${item.icon}</span>
      <strong>${item.name}</strong>
      <span class="status-pill ${item.statusClass}">${item.status}</span>
      <p>${item.summary}</p>
    </button>
  `).join("");

  $("#physical-detail").innerHTML = `
    <h3>${selectedPhysical.name}</h3>
    <div class="detail-grid">
      <div><strong>Role</strong><p>${selectedPhysical.role}</p></div>
      <div><strong>Input</strong><p>${selectedPhysical.input}</p></div>
      <div><strong>Output</strong><p>${selectedPhysical.output}</p></div>
      <div><strong>Risk</strong><p>${selectedPhysical.risk}</p></div>
    </div>
  `;
}

function renderPipeline() {
  const container = $("#pipeline-track");
  container.innerHTML = pipelineModules.map((item) => `
    <button class="pipeline-node ${item.id === selectedPipeline.id ? "is-active" : ""}" type="button" data-pipeline="${item.id}">
      <span class="node-icon">${item.icon}</span>
      <strong>${item.name}</strong>
      <p>${item.question}</p>
      <span class="tag-row">
        ${item.tags.map((tag) => `<span class="tag ${tagClass(tag)}">${tag}</span>`).join("")}
      </span>
    </button>
  `).join("");

  $("#pipeline-detail").innerHTML = `
    <h3>Selected Module: ${selectedPipeline.name}</h3>
    <div class="detail-grid">
      <div><strong>Purpose</strong><p>${selectedPipeline.question}</p></div>
      <div><strong>Input</strong><p>${selectedPipeline.input}</p></div>
      <div><strong>Output</strong><p>${selectedPipeline.output}</p></div>
      <div><strong>Quantum Support</strong><p>${selectedPipeline.quantum}</p></div>
    </div>
  `;
}

function tagClass(tag) {
  if (tag.includes("Quantum")) return "tag-quantum";
  if (tag === "Warning") return "tag-warning";
  if (tag === "Running" || tag === "Completed") return "tag-running";
  return "tag-ready";
}

function renderQuantumMap() {
  $("#quantum-module-list").innerHTML = quantumMappings.map((item) => `
    <div class="module-item">
      <strong>${item.code}</strong>
      <span>${item.problem}</span>
    </div>
  `).join("");

  $("#mapping-table").innerHTML = quantumMappings.map((item) => `
    <tr>
      <td><strong>${item.code}</strong><br>${item.title}</td>
      <td>${item.problem}</td>
      <td>${item.position}</td>
      <td>${item.role}</td>
    </tr>
  `).join("");
}

function renderProblems() {
  $("#problem-library").innerHTML = Object.entries(problems).map(([key, item]) => `
    <button class="library-card ${key === selectedProblem ? "is-active" : ""}" type="button" data-problem="${key}">
      <span class="tag ${key === "QPF" ? "tag-running" : "tag-ready"}">${item.status}</span>
      <strong>${key}</strong>
      <p>${item.summary}</p>
    </button>
  `).join("");
  renderProblemDetail();
}

function renderProblemDetail() {
  const problem = problems[selectedProblem];
  $("#problem-detail").innerHTML = `
    <h3>${problem.title}</h3>
    <p>${problem.body}</p>
    <div class="problem-detail-grid">
      <div><strong>Input</strong><p>${problem.input}</p></div>
      <div><strong>Output</strong><p>${problem.output}</p></div>
      <div><strong>Solver explanation</strong><p>${problem.solver}</p></div>
    </div>
  `;
}

function renderWorkspace() {
  $("#case-summary").innerHTML = `
    <div class="metric-box"><span>Base MVA</span><strong>${qpfCase.baseMVA}</strong></div>
    <div class="metric-box"><span>Frequency</span><strong>${qpfCase.frequencyHz} Hz</strong></div>
    <div class="metric-box"><span>Buses</span><strong>${qpfCase.buses.length}</strong></div>
    <div class="metric-box"><span>Branches</span><strong>${qpfCase.branches.length}</strong></div>
  `;

  const system = qpfCase.linear_system;
  $("#matrix-meta").innerHTML = `
    <div class="metric-box"><span>Model</span><strong>${qpfCase.model_type}</strong></div>
    <div class="metric-box"><span>Matrix size</span><strong>${system.A.length} x ${system.A[0].length}</strong></div>
    <div class="metric-box"><span>Variables</span><strong>${system.variables.length}</strong></div>
    <div class="metric-box"><span>Condition</span><strong>3.12</strong></div>
  `;

  $("#matrix-box").innerHTML = `
    <div class="matrix">
      A = [<br>
      ${system.A.map((row) => `&nbsp;&nbsp;[${row.map((n) => n.toFixed(1)).join(", ")}]`).join("<br>")}<br>
      ]
    </div>
    <div class="vector">
      b = [${system.b.join(", ")}]<br>
      x = [${system.variables.join(", ")}]<br>
      unit = ${system.unit}
    </div>
  `;

  updateRequestPreview();
  renderExecutionLog(false);
}

function getSolverConfig() {
  selectedSolver = $("input[name='solver']:checked").value;
  return {
    solver_type: selectedSolver,
    backend: $("#backend-select").value.toLowerCase().replaceAll(" ", "_"),
    shots: Number($("#shots-range").value),
    tolerance: Number($("#tolerance-range").value),
    max_iterations: 100,
    noise_model: $("#backend-select").value === "Noisy simulator" ? "basic" : "none"
  };
}

function updateRequestPreview() {
  const payload = {
    run_id: "run-qpf-001",
    problem_type: $("#problem-select").value,
    grid_case: {
      case_id: qpfCase.case_id,
      baseMVA: qpfCase.baseMVA,
      buses: qpfCase.buses,
      branches: qpfCase.branches
    },
    solver_config: getSolverConfig(),
    options: {
      return_matrix: true,
      return_raw_solver_output: true,
      compare_with_classical: true
    }
  };
  $("#request-preview").textContent = JSON.stringify(payload, null, 2);
  $("#shots-output").textContent = payload.solver_config.shots;
  $("#tolerance-output").textContent = payload.solver_config.tolerance.toFixed(3);
}

function renderExecutionLog(completed) {
  const steps = [
    "Loading grid case...",
    "Building matrix A and vector b...",
    "Normalizing input...",
    `Running ${selectedSolver} solver...`,
    "Post-processing electrical result...",
    "Comparing with classical baseline...",
    completed ? "Completed." : "Ready to run."
  ];
  $("#execution-log").innerHTML = steps.map((step, index) => `
    <li class="${completed || index < 2 ? "is-complete" : ""}">${step}</li>
  `).join("");
}

function runSolver() {
  const config = getSolverConfig();
  lastRun = {
    ...mockResult,
    selected_solver: config.solver_type,
    selected_config: config,
    created_at: new Date().toISOString()
  };
  renderExecutionLog(true);
  renderResults();
  renderReport();
  window.location.hash = "results";
}

function selectedSolverResult() {
  const preferred = lastRun.selected_solver || selectedSolver;
  return mockResult.solvers.find((solver) => solver.solver_type === preferred) || mockResult.solvers[0];
}

function renderResults() {
  const selected = selectedSolverResult();
  const violations = selected.electrical_result.violations.length;
  $("#summary-grid").innerHTML = `
    <article class="summary-card"><span>Runtime</span><strong>${selected.runtime_ms} ms</strong></article>
    <article class="summary-card"><span>Relative Error</span><strong>${selected.relative_error}</strong></article>
    <article class="summary-card"><span>Feasibility</span><strong>Completed</strong></article>
    <article class="summary-card"><span>Violation Count</span><strong>${violations}</strong></article>
  `;

  renderBarChart("#runtime-chart", mockResult.solvers.map((solver) => ({
    label: solver.solver_type,
    value: solver.runtime_ms,
    display: `${solver.runtime_ms} ms`,
    color: solver.solver_type === "CLASSICAL" ? "green" : solver.solver_type === "HHL" ? "violet" : "teal"
  })));

  renderBarChart("#error-chart", mockResult.solvers.map((solver) => ({
    label: solver.solver_type,
    value: solver.relative_error,
    display: solver.relative_error.toFixed(3),
    color: solver.solver_type === "CLASSICAL" ? "green" : solver.solver_type === "HHL" ? "violet" : "amber"
  })), 0.02);

  renderBarChart("#voltage-chart", selected.electrical_result.bus_results.map((bus) => ({
    label: `Bus ${bus.bus_id}`,
    value: bus.voltage_pu,
    display: bus.voltage_pu.toFixed(3),
    color: bus.voltage_pu < 0.985 ? "amber" : "green"
  })), 1.05);

  renderBarChart("#loading-chart", selected.electrical_result.branch_results.map((branch) => ({
    label: branch.branch_id,
    value: branch.loading_percent,
    display: `${branch.loading_percent.toFixed(1)}%`,
    color: branch.loading_percent > 80 ? "amber" : "teal"
  })), 100);

  renderTables(selected);
  $("#recommendation").innerHTML = `
    <h3>Decision Recommendation</h3>
    <p><strong>${mockResult.comparison_summary.recommended_solver_for_demo}</strong> is recommended for the demo because it uses fewer qubits than HHL while keeping error within the MVP comparison range.</p>
    <p>${selected.electrical_result.violations[0].message} Recommended action: ${selected.electrical_result.violations[0].recommended_action}</p>
  `;
}

function renderBarChart(selector, rows, fixedMax) {
  const max = fixedMax || Math.max(...rows.map((row) => row.value), 1);
  $(selector).innerHTML = rows.map((row) => {
    const width = Math.max(2, Math.min(100, (row.value / max) * 100));
    return `
      <div class="bar-row">
        <span class="bar-label">${row.label}</span>
        <span class="bar-track"><span class="bar-fill ${row.color || ""}" style="width: ${width}%"></span></span>
        <span>${row.display}</span>
      </div>
    `;
  }).join("");
}

function renderTables(selected) {
  $("#bus-table").innerHTML = selected.electrical_result.bus_results.map((bus) => {
    const busMeta = qpfCase.buses.find((item) => item.bus_id === bus.bus_id);
    return `
      <tr>
        <td>${bus.bus_id}</td>
        <td>${busMeta.type}</td>
        <td>${bus.voltage_pu.toFixed(3)}</td>
        <td>${bus.angle_deg.toFixed(3)}</td>
        <td>${bus.p_injection_mw.toFixed(1)}</td>
        <td><span class="status-pill ${bus.status === "NORMAL" ? "status-normal" : "status-warning"}">${bus.status}</span></td>
      </tr>
    `;
  }).join("");

  $("#branch-table").innerHTML = selected.electrical_result.branch_results.map((branch) => {
    const branchMeta = qpfCase.branches.find((item) => item.branch_id === branch.branch_id);
    return `
      <tr>
        <td>${branch.branch_id}</td>
        <td>${branch.from_bus}-${branch.to_bus}</td>
        <td>${branch.p_flow_mw.toFixed(2)}</td>
        <td>${branchMeta.rate_mva.toFixed(1)}</td>
        <td>${branch.loading_percent.toFixed(2)}%</td>
        <td><span class="status-pill ${branch.status === "NORMAL" ? "status-normal" : "status-warning"}">${branch.status}</span></td>
      </tr>
    `;
  }).join("");

  $("#solver-table").innerHTML = mockResult.solvers.map((solver) => `
    <tr>
      <td>${solver.solver_type}</td>
      <td>${solver.runtime_ms}</td>
      <td>${solver.relative_error}</td>
      <td>${solver.residual_norm}</td>
      <td>${formatValue(solver.qubit_count)}</td>
      <td>${formatValue(solver.circuit_depth)}</td>
      <td>${formatValue(solver.shots)}</td>
    </tr>
  `).join("");
}

function renderReport() {
  const selected = selectedSolverResult();
  const warning = selected.electrical_result.violations[0];
  $("#report-preview").innerHTML = `
    <h3>Report Summary</h3>
    <p>Technical report for ${qpfCase.case_name}. The run compares Classical, HHL and VQLS for the QPF MVP using a DC Power Flow linear system.</p>
    <dl>
      <dt>Run ID</dt><dd>${lastRun.run_id}</dd>
      <dt>Problem</dt><dd>${lastRun.problem_type} / ${lastRun.model_type}</dd>
      <dt>Selected solver</dt><dd>${selected.solver_type}</dd>
      <dt>Matrix model</dt><dd>A shape [2, 2], b shape [2], condition number 3.12, sparse true</dd>
      <dt>Runtime</dt><dd>${selected.runtime_ms} ms</dd>
      <dt>Relative error</dt><dd>${selected.relative_error}</dd>
      <dt>Warning</dt><dd>${warning.component_id}: ${warning.message}</dd>
      <dt>Recommendation</dt><dd>${warning.recommended_action}</dd>
    </dl>
  `;
}

function downloadReport() {
  const selected = selectedSolverResult();
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
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const physicalButton = event.target.closest("[data-physical]");
    if (physicalButton) {
      selectedPhysical = physicalComponents.find((item) => item.id === physicalButton.dataset.physical);
      renderPhysicalFlow();
      return;
    }

    const pipelineButton = event.target.closest("[data-pipeline]");
    if (pipelineButton) {
      selectedPipeline = pipelineModules.find((item) => item.id === pipelineButton.dataset.pipeline);
      renderPipeline();
      return;
    }

    const problemButton = event.target.closest("[data-problem]");
    if (problemButton) {
      selectedProblem = problemButton.dataset.problem;
      renderProblems();
      return;
    }

    const problemJump = event.target.closest("[data-problem-jump]");
    if (problemJump) {
      selectedProblem = problemJump.dataset.problemJump;
      renderProblems();
      window.location.hash = "problems";
    }
  });

  $$("input[name='solver']").forEach((input) => input.addEventListener("change", updateRequestPreview));
  $("#backend-select").addEventListener("change", updateRequestPreview);
  $("#shots-range").addEventListener("input", updateRequestPreview);
  $("#tolerance-range").addEventListener("input", updateRequestPreview);
  $("#problem-select").addEventListener("change", (event) => {
    selectedProblem = event.target.value;
    renderProblems();
    updateRequestPreview();
  });
  $("#run-solver").addEventListener("click", runSolver);
  $("#download-report").addEventListener("click", downloadReport);
  $("#print-report").addEventListener("click", () => window.print());
}

function init() {
  renderPhysicalFlow();
  renderPipeline();
  renderQuantumMap();
  renderProblems();
  renderWorkspace();
  renderResults();
  renderReport();
  bindEvents();
}

init();
