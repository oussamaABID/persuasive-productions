# Persuasive Productions

Persuasive Productions is a premium, high-fidelity photography platform. Built with a **Titanium Noir** aesthetic, it harmonizes cinematic noir textures with Asian-inspired motifs and high-contrast gold accents to deliver a museum-grade digital experience.

## 🏛️ Architectural Mandate (Vance Protocol)

This project adheres to a strict architectural hierarchy and technical purity standard known as the **Vance Mandate**.

### 1. The Layered Hierarchy

Crossing layer boundaries is prohibited. Every file resides in its designated domain:

- **`/app` (Routing Layer)**: Orchestrates data fetching and SEO. No UI logic or complex styling is permitted here.
- **`/features` (Domain Layer)**: Encapsulated business logic (e.g., `portfolio`, `booking`). Contains feature-specific hooks, types, and components.
- **`/components` (Shared UI Layer)**:
  - **Atoms**: Primitive, pure UI elements (Buttons, Badges).
  - **Molecules**: Combinations of atoms with minimal logic.
  - **Organisms**: High-level structural blocks (Navigation, Hero, Footer).

### 2. Technical Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Styling**: Tailwind CSS v4 (CSS-First Architecture)
- **Runtime**: Node.js 20+
- **Motion**: Framer Motion (Kinetic Reveal logic)
- **Icons**: Lucide React

## ❃ Design System (OKLCH)

The platform utilizes the **OKLCH color space** to ensure perceptual uniformity and premium vibrancy across all displays.

- **Background**: `oklch(0.1 0 0)` (Deep Obsidian)
- **Accent**: `oklch(0.85 0.12 85)` (Persuasive Gold)
- **Foreground**: `oklch(0.98 0 0)` (Pure Ivory)

### CSS-First Philosophy

Following the **Vance Mandate**, arbitrary utility classes are minimized. All recurring UI patterns are centralized in `app/globals.css` using semantic naming:

- `.nav-button`: Gold gradient interactive buttons with cinematic shine.
- `.site-container`: Global width constraints and layout rhythm.
- `.display-title`: Premium typographic hierarchy using **Playfair Display**.

## ☾ Kinetic Purity & Motion

Motion is not decorative; it is structural.

- **MotionReveal**: Standardized entrance animations with `animate` props to eliminate layout shifts (CLS).
- **HeroParallax**: Subtle depth-based motion on primary entry points.
- **Noise Texture**: A global fixed grain overlay (`z-noise`) provides a filmic texture to the entire viewport.

## 📂 Project Structure

```text
├── app/                  # Routing & Layouts
├── components/           # Shared UI Components
│   ├── atoms/            # Pure UI Primitives
│   ├── molecules/        # Interactive Elements
│   └── organisms/        # Complex Page Blocks
├── features/             # Domain Logic (Home, Portfolio, Book)
│   ├── api/              # Domain-specific fetchers
│   ├── components/       # Domain-specific components
│   └── hooks/            # Domain-specific logic
├── lib/                  # Core Utilities & Gallery Logic
├── public/               # Static Assets & Dynamic Gallery
└── content/              # Externalized Site Copy (JSON)
```

## 🚀 Development & Build

### Prerequisites

- **Node.js**: v20.x or higher
- **Package Manager**: npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Execute production build
npm run build
```

## ❃ The Jasmine Motif

The jasmine flower (❀) serves as the brand's spiritual anchor, symbolizing purity and grace. It is integrated into the grid rhythm and typography across the platform.

---

*Engineered with precision for Persuasive Productions.*
