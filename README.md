# Quantum Grid Operation Platform

Next.js web UI for a quantum-assisted power grid operation platform. The app is organized as a multipage site with Introduction, Solution & Features, and Roadmap & Milestones pages. The Solution page contains the interactive QPF demo comparing Classical, HHL, and VQLS solver results.

## Features

- Power grid physical layer overview: generation, transmission, substations, distribution, and loads.
- Operation pipeline dashboard for measurement, forecasting, state estimation, power flow, contingency analysis, OPF, EMT/stability, and decision support.
- Quantum problem map for QSE, QPF, QOPF, and QEMTP.
- QPF solver workspace using a 3-bus DC power flow mock case.
- FastAPI request preview for future backend integration.
- Result dashboard with runtime, relative error, voltage profile, line loading, result tables, and recommendation output.
- Technical report export as JSON and browser print output.
- Multipage navigation for Introduction, Solution & Features, Demo, and Roadmap & Milestones.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Plain global CSS
- Vercel-compatible production build

## Project Structure

```text
app/
  globals.css      Global styles migrated from the static prototype
  layout.tsx       App metadata and root layout
  page.tsx         Introduction page
  solution/        Solution & Features route with QPF demo
  roadmap/         Roadmap & Milestones route
components/
  site-chrome.tsx  Shared header and footer
  solution-page-client.tsx
lib/
  grid-data.ts     Typed mock data, solver contracts, and UI content
public/
  grid-quantum-hero.png
  images/          AI-generated local image assets for the multipage website
package.json
next.config.ts
tsconfig.json
eslint.config.mjs
```

The legacy static prototype files are still present for reference:

```text
index.html
styles.css
app.js
assets/grid-quantum-hero.png
```

For deployment and development, use the Next.js files under `app/`, `lib/`, and `public/`.

Generated website images are stored locally in `public/images/` so Vercel deployment does not depend on external image URLs.

## Requirements

- Conda environment: `scquan`
- Node.js 18.18 or newer
- npm

This project was verified with:

```bash
conda run -n scquan node -v
conda run -n scquan npm -v
```

## Local Development

Install dependencies:

```bash
conda run -n scquan npm install
```

Start the development server:

```bash
conda run -n scquan npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```text
http://127.0.0.1:3000
```

Routes:

```text
/                    Introduction
/solution            Solution & Features
/solution#solver     QPF demo workspace
/roadmap             Roadmap & Milestones
```

## Verification

Run lint:

```bash
conda run -n scquan npm run lint
```

Run production build:

```bash
conda run -n scquan npm run build
```

Check dependency advisories:

```bash
conda run -n scquan npm audit
```

## Vercel Deployment

Use the repository root as the Vercel project root.

Recommended Vercel settings:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: .next
Development Command: npm run dev
```

No custom server or static export is required.

## Data and Backend Contract

The current demo UI is mock-data driven. Solver and grid data are defined in `lib/grid-data.ts`.

The FastAPI request preview preserves this shape:

```ts
{
  run_id: string;
  problem_type: "QSE" | "QPF" | "QOPF" | "QEMTP";
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
```

The report export includes the selected solver result, the mock grid case, and placeholder backend routes:

```text
Next route: /api/solver-runs
FastAPI route: /solve/qpf
```

## Notes

- QPF is the implemented MVP demo.
- QSE, QOPF, and QEMTP are scaffolded as future modules.
- HHL and VQLS values are mock results for UI integration and should be replaced by FastAPI solver responses when the backend is available.
