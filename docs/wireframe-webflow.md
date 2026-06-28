# Wireframe & Webflow Technical Specification — QuanWatt

## 1. Document Scope

This document defines the page-level wireframe and user flow for the current QuanWatt web application. The specification is aligned to the existing Next.js implementation and covers:

- Home page for product positioning and guided storytelling.
- Solution page for pipeline explanation, quantum problem mapping, QPF demo workspace, result reporting, and export.
- Roadmap page for release planning and future module expansion.

## 2. Information Architecture

### 2.1 Primary routes

- Home: `/`
- Solution: `/solution`
- Demo anchor: `/solution#solver`
- Roadmap: `/roadmap`

### 2.2 Navigation contract

- Header navigation must remain consistent across all pages.
- The primary CTA should always drive users to the QPF workspace.
- Internal anchors are used for long-form scrolling and section-based navigation.

### 2.3 Main content flow

Home → Solution → Solver Workspace → Results/Report → Roadmap

## 3. Page Wireframe Specifications

### 3.1 Home Page

#### 3.1.1 Header

Purpose: provide global navigation and primary conversion entry.

Layout requirements:

- Left-aligned QuanWatt brand mark.
- Horizontal navigation links: Tổng quan, Giải pháp, Demo, Lộ trình.
- Primary CTA: Mở workspace.

#### 3.1.2 Hero section

Purpose: establish product positioning and direct users into the main flow.

Required elements:

- Full-bleed hero image with dark overlay.
- Kicker: Giải pháp vận hành lưới điện thế hệ mới.
- H1 describing QuanWatt as a quantum-assisted grid operation platform.
- Supporting copy with two language layers:
  - Product positioning.
  - Classical vs HHL/VQLS comparison intent.
- Primary actions:
  - Khám phá giải pháp → `/solution`
  - Chạy demo QPF → `/solution#solver`
- Hero metrics row:
  - 4 problem groups
  - 3 solver methods
  - 8 mapped operation steps
  - 1 integrated demo workspace
- Scroll anchor to overview.

#### 3.1.3 Overview map

Purpose: expose the page-level structure and reduce navigation ambiguity.

Content model:

- Section title: interactive table of contents.
- Four chapter cards:
  1. Platform overview
  2. Problem map
  3. Core capabilities
  4. QPF demo
- Each card must include:
  - ordinal label
  - icon
  - short description
  - anchor link

#### 3.1.4 Platform statement

Purpose: provide a concise system-level description.

Content requirements:

- One technical headline describing a single operational context.
- One paragraph explaining how grid data, system models, and solver experiments are integrated into one workflow.

#### 3.1.5 Problem story

Purpose: explain the four core power-system problem types in a scroll-driven narrative.

Problem objects:

- QSE
- QPF
- QOPF
- QEMTP

Per-step fields:

- Problem code
- Problem name
- Technical question
- Body copy
- Input
- Output
- Solution method

Interaction requirement:

- Visual panel on the right must update based on the active step.
- Progress indicator must reflect current story step.

#### 3.1.6 Capability section

Purpose: summarize the platform value chain.

Layout:

- One large capability card for end-to-end grid operation visibility.
- Two secondary cards:
  - Quantum application mapping
  - Solver workspace
- Each card should contain an image, heading, supporting text, and anchor CTA to the Solution page.

#### 3.1.7 Final CTA

Purpose: convert interest into demo interaction or roadmap exploration.

Required actions:

- Chạy demo QPF
- Xem lộ trình phát triển

#### 3.1.8 Footer

Purpose: reinforce brand and provide persistent route access.

Required elements:

- Brand logo
- Product tagline
- Route links
- Short MVP / future-module statement

### 3.2 Solution Page

#### 3.2.1 Hero section

Purpose: define the page as the functional workspace for explanation and execution.

Required elements:

- Full-width hero background.
- H1: Quantum-assisted Grid Operation Workspace.
- Copy describing the connection between grid operations and quantum experiments.
- Action set:
  - View Solution Flow → `#pipeline`
  - Run QPF Demo → `#solver`
  - Map Quantum Problems → `#quantum-map`

#### 3.2.2 Problem summary strip

Purpose: provide a compact overview of the supported problem set.

Cards:

- QSE
- QPF
- QOPF
- QEMTP

State rule:

- QPF must be visually emphasized as the current MVP scope.

#### 3.2.3 Visual overview band

Purpose: communicate the solution architecture at a glance.

Cards:

- Operation Pipeline
- Quantum Problem Map
- Solver Workspace

Card content:

- Illustration/image
- Short technical heading
- One-line explanation

#### 3.2.4 Operation pipeline

Purpose: model the data flow from sensing to decision support.

Required modules:

- Measurement
- Forecasting
- State Estimation
- Power Flow
- Contingency Analysis
- OPF / Dispatch
- EMT / Stability
- Decision

Detail panel fields:

- Purpose
- Input
- Output
- Quantum support

Interaction rule:

- Clicking a module updates the detail panel.
- The Quantum problem locations control must allow jump navigation to QSE, QPF, QOPF, and QEMTP sections.

#### 3.2.5 Quantum map

Purpose: place quantum linear solvers in the correct operational context.

Required mapping table:

- QSE → WLS linear systems
- QPF → DC PF / Newton linear solve
- QOPF → KKT / linearized OPF
- QEMTP → per-time-step linear systems

#### 3.2.6 Quantum Power Grid Problems

Purpose: provide an inspectable problem catalogue.

Per-card data model:

- Status
- Summary
- Body
- Input
- Output
- Solver explanation

Interaction rule:

- Selecting a problem updates the adjacent detail panel.

#### 3.2.7 Solver Workspace

Purpose: support the full demo flow from configuration to execution preview.

Wireframe blocks:

1. Case selector
   - Choose the grid case.
2. Problem selector
   - Choose QSE / QPF / QOPF / QEMTP.
3. Solver configuration
   - Solver type: Classical, HHL, VQLS.
   - Backend selector.
   - Shots control.
   - Tolerance control.
4. Run controls
   - Run Solver action.
   - Execution log.
5. Request preview
   - Display backend request payload.
6. Mini visualization
   - Matrix / vector / electrical result preview.

#### 3.2.8 Results dashboard

Purpose: compare solver outputs and grid-level electrical results.

Dashboard components:

- KPI cards:
  - Runtime
  - Relative error
  - Violations count
- Runtime comparison chart.
- Relative error comparison chart.
- Bus results table.
- Branch results table.
- Violations / warning panel.
- Solver comparison table.
- Recommendation summary for demo selection.

#### 3.2.9 Report export

Purpose: provide a portable technical report for downstream use.

Report content:

- Selected solver result
- Run metadata
- Grid case snapshot
- API contract reference

Action:

- Export technical report as JSON.

### 3.3 Roadmap Page

#### 3.3.1 Hero section

Purpose: describe delivery progression from MVP to platform expansion.

Required elements:

- Roadmap title
- Release trajectory summary
- CTAs:
  - Open Current Demo
  - Review Features
- Architecture illustration

#### 3.3.2 Milestone grid

Purpose: expose the project delivery plan.

Milestones:

- MVP 1: QPF Demo Workspace
- MVP 2: FastAPI Solver Integration
- Phase 3: QSE State Estimation Module
- Phase 4: QOPF Optimization Module
- Phase 5: QEMTP / Transient Analysis
- Release: Deployment and Documentation Hardening

Per-card fields:

- Phase
- Status
- Title
- Time window
- Body
- Outputs
- Image

#### 3.3.3 Current priority block

Purpose: anchor the current release focus.

Required elements:

- Short priority summary
- CTA to demo
- CTA back to home

## 4. Webflow Specification

### 4.1 Primary user flow

1. User lands on the Home page.
2. User reads hero messaging and overview map.
3. User scrolls through the problem story to understand QSE / QPF / QOPF / QEMTP.
4. User clicks the solution CTA.
5. User reviews the pipeline and quantum map on the Solution page.
6. User enters the Solver Workspace.
7. User configures the case, problem, solver type, backend, shots, and tolerance.
8. User runs the solver and reviews results, logs, and comparisons.
9. User exports the JSON report.
10. User navigates to the Roadmap page for future scope.

### 4.2 Secondary flows

- Fast demo flow: Home → Solution → `#solver`
- Product understanding flow: Home → Overview map → Solution
- Technical validation flow: Solver Workspace → Results → Report
- Planning flow: Home/Solution → Roadmap

### 4.3 Anchor map on Home

- `#home` → hero entry
- `#overview` → table of contents
- `#platform` → platform statement
- `#problem-map` → problem story
- `#capabilities` → capability section
- `#demo` → final CTA block

### 4.4 Anchor map on Solution

- `#pipeline` → operation pipeline
- `#quantum-map` → quantum placement map
- `#problems` → problem catalogue
- `#solver` → solver workspace
- `#results` → result dashboard
- `#report` → report export

## 5. Responsive Behaviour

### 5.1 Desktop

- Use sticky global navigation.
- Keep two-column or multi-panel layouts where screen width allows.
- Preserve visible CTA hierarchy above the fold.

### 5.2 Tablet

- Collapse dense content into one or two columns.
- Reduce hero copy length and keep primary CTA visible.
- Maintain anchor navigation usability.

### 5.3 Mobile

- Convert the header into a compact navigation pattern.
- Stack narrative sections vertically.
- Allow result tables and charts to scroll horizontally if required.

## 6. UX and State Requirements

- Primary CTAs must always direct users toward the QPF demo.
- Demo states must be explicit: idle, running, completed, warning.
- Scroll-driven sections must remain readable without requiring back-navigation.
- JSON export must remain stable for future backend integration.

## 7. Acceptance Criteria

- All routes listed in this document are present in the implementation.
- Each page section has a clear heading, purpose, and action path.
- The Solution page supports the full demo flow from configuration to export.
- The Roadmap page clearly communicates current and future delivery phases.

## 8. Conclusion

QuanWatt is structured as a three-layer technical website:

- Layer 1: Product introduction and guided storytelling.
- Layer 2: Technical explanation and problem placement.
- Layer 3: Interactive demo, result comparison, and roadmap projection.

The current implementation already matches this structure and can be used as the basis for a Figma wireframe or implementation-ready UX specification.
