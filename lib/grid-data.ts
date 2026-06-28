export type ProblemCode = "QSE" | "QPF" | "QOPF" | "QEMTP";
export type SolverType = "CLASSICAL" | "HHL" | "VQLS";
export type BackendLabel = "Simulator" | "Noisy simulator" | "Real quantum backend";

export interface PhysicalComponent {
  id: string;
  icon: string;
  name: string;
  status: string;
  statusClass: string;
  summary: string;
  role: string;
  input: string;
  output: string;
  risk: string;
}

export interface PipelineModule {
  id: string;
  icon: string;
  name: string;
  question: string;
  input: string;
  output: string;
  quantum: string;
  tags: string[];
}

export interface QuantumMapping {
  code: ProblemCode;
  title: string;
  problem: string;
  position: string;
  role: string;
}

export interface ProblemInfo {
  title: string;
  status: string;
  summary: string;
  body: string;
  input: string;
  output: string;
  solver: string;
}

export interface GridBus {
  bus_id: number;
  type: "SLACK" | "PV" | "PQ";
  voltage_pu: number | null;
  angle_deg: number | null;
  p_generation_mw: number;
  p_load_mw: number;
}

export interface GridBranch {
  branch_id: string;
  from_bus: number;
  to_bus: number;
  x_pu: number;
  rate_mva: number;
}

export interface LinearSystem {
  description: string;
  variables: string[];
  A: number[][];
  b: number[];
  unit: string;
}

export interface GridCase {
  case_id: string;
  case_name: string;
  baseMVA: number;
  frequencyHz: number;
  problem_type: ProblemCode;
  model_type: string;
  buses: GridBus[];
  branches: GridBranch[];
  linear_system: LinearSystem;
}

export interface SolverConfig {
  solver_type: SolverType;
  backend: string;
  shots: number;
  tolerance: number;
  max_iterations: number;
  noise_model: "basic" | "none";
}

export interface BusResult {
  bus_id: number;
  voltage_pu: number;
  angle_deg: number;
  p_injection_mw: number;
  status: string;
}

export interface BranchResult {
  branch_id: string;
  from_bus: number;
  to_bus: number;
  p_flow_mw: number;
  loading_percent: number;
  status: string;
}

export interface SolverViolation {
  type: string;
  component_id: string;
  severity: string;
  message: string;
  recommended_action: string;
}

export interface ElectricalResult {
  bus_results: BusResult[];
  branch_results: BranchResult[];
  violations: SolverViolation[];
}

export interface SolverResult {
  solver_type: SolverType;
  status: string;
  runtime_ms: number;
  relative_error: number;
  residual_norm: number;
  iterations: number | null;
  qubit_count: number | null;
  circuit_depth: number | null;
  shots: number | null;
  electrical_result: ElectricalResult;
}

export interface SolverRun {
  run_id: string;
  case_id: string;
  problem_type: ProblemCode;
  model_type: string;
  status: string;
  created_at: string;
  comparison_summary: {
    best_accuracy: SolverType;
    best_quantum_feasibility: SolverType;
    recommended_solver_for_demo: SolverType;
    note: string;
  };
  solvers: SolverResult[];
  selected_solver?: SolverType;
  selected_config?: SolverConfig;
}

export interface SolverRequestPreview {
  run_id: string;
  problem_type: ProblemCode;
  grid_case: {
    case_id: string;
    baseMVA: number;
    buses: GridBus[];
    branches: GridBranch[];
  };
  solver_config: SolverConfig;
  options: {
    return_matrix: boolean;
    return_raw_solver_output: boolean;
    compare_with_classical: boolean;
  };
}

export const physicalComponents: PhysicalComponent[] = [
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

export const pipelineModules: PipelineModule[] = [
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

export const quantumMappings: QuantumMapping[] = [
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

export const problems: Record<ProblemCode, ProblemInfo> = {
  QPF: {
    title: "QPF - Quantum Power Flow",
    status: "MVP",
    summary:
      "Quantum Power Flow evaluates how electrical power flows through a grid and compares classical solvers with HHL/VQLS-based quantum solvers.",
    body:
      "Power Flow computes voltage, phase angle, line flow and losses when the grid topology, generation and load are known. In this MVP, QPF uses a linear DC Power Flow model so the problem can be converted into Ax = b and tested with Classical, HHL and VQLS solvers.",
    input: "Bus data, branch data, generator data, load data, baseMVA and solver configuration.",
    output:
      "Voltage angle, estimated voltage magnitude, line flow, loading percentage, violations and solver metrics.",
    solver:
      "Classical is the NumPy/SciPy-style baseline. HHL is a theoretical quantum linear solver benchmark. VQLS is better aligned with small NISQ simulations."
  },
  QSE: {
    title: "QSE - Quantum State Estimation",
    status: "Scaffold",
    summary: "Estimate the true state of the grid from noisy, missing or biased measurements.",
    body:
      "QSE targets linear systems generated inside state estimation workflows, especially Weighted Least Squares and linearized correction steps.",
    input: "Measurements, grid model, measurement weights and Jacobian or linearized system.",
    output: "Estimated bus voltage, phase angle and bad data indicators.",
    solver: "Prepared as a future extension with mock input, mock output and UI structure."
  },
  QOPF: {
    title: "QOPF - Quantum Optimal Power Flow",
    status: "Scaffold",
    summary: "Find a safe, economic operating plan under physical and market constraints.",
    body:
      "QOPF aims to use HHL/VQLS for linear systems that arise inside KKT systems, linearized OPF or iterative optimization steps.",
    input: "Load forecast, renewable forecast, cost curves, line limits, voltage limits and generator P/Q limits.",
    output: "Optimal generation, operating cost, voltage setpoints and active constraints.",
    solver: "Prepared as an extension after QPF stabilizes."
  },
  QEMTP: {
    title: "QEMTP - Quantum EMT / Transient Analysis",
    status: "Scaffold",
    summary: "Simulate transient and dynamic grid behavior after disturbances.",
    body:
      "QEMTP targets linear systems that can appear at each time step during electromagnetic transient or dynamic stability simulation.",
    input: "Dynamic system model, disturbance scenario, equipment parameters and time step.",
    output: "Voltage/current waveforms, stability index and event timeline.",
    solver: "Prepared as a future extension for small solver experiments."
  }
};

export const qpfCase: GridCase = {
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

export const mockResult: SolverRun = {
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
    note:
      "Classical solver is used as baseline. HHL and VQLS results are mock results for UI integration and will be replaced by FastAPI solver outputs."
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
          {
            type: "LINE_LOADING_WARNING",
            component_id: "L1-3",
            severity: "warning",
            message: "Line L1-3 loading is above 80% but below the limit.",
            recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise."
          }
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
          {
            type: "LINE_LOADING_WARNING",
            component_id: "L1-3",
            severity: "warning",
            message: "Line L1-3 loading is above 80% but below the limit.",
            recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise."
          }
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
          {
            type: "LINE_LOADING_WARNING",
            component_id: "L1-3",
            severity: "warning",
            message: "Line L1-3 loading is above 80% but below the limit.",
            recommended_action: "Monitor L1-3 and consider redispatch if loading continues to rise."
          }
        ]
      }
    }
  ]
};
