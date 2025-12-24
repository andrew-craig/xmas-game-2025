# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + TypeScript + Vite project using Tailwind CSS 4 for styling. It's currently a minimal template setup with HMR (Hot Module Replacement) configured.

## Development Commands

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Tech Stack

- **React 19.1.1** with React DOM
- **TypeScript 5.9** with strict mode enabled
- **Vite 7** for build tooling and dev server
- **Tailwind CSS 4.1** via `@tailwindcss/vite` plugin
- **ESLint 9** with TypeScript and React plugins

## TypeScript Configuration

The project uses TypeScript project references with two configs:
- `tsconfig.app.json` - Application code (src directory)
- `tsconfig.node.json` - Build tooling (vite.config.ts, etc.)

Strict mode is enabled with additional linting flags:
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`

## Code Structure

- [src/main.tsx](src/main.tsx) - Application entry point with React root creation
- [src/App.tsx](src/App.tsx) - Main App component
- [src/index.css](src/index.css) - Global styles
- [public/](public/) - Static assets

## Build Configuration

Vite is configured with two plugins:
1. `@vitejs/plugin-react` - React Fast Refresh support
2. `@tailwindcss/vite` - Tailwind CSS integration

## Linting

ESLint is configured with:
- TypeScript ESLint recommended rules
- React Hooks recommended rules
- React Refresh plugin for Vite
- Browser globals
- Ignores `dist/` directory
