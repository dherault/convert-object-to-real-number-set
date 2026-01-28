# convert-object-to-real-number-set
A proof of concept

## Setup

This is a Node.js library built with TypeScript, ESLint, and Jest.

### Installation

```bash
npm install
```

### Development

```bash
# Build the library
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix

# Clean build artifacts
npm run clean
```

## Tech Stack

- **TypeScript 5.9.3** - Type-safe JavaScript with modern ES2020 features
- **ESLint 9.39.2** - Latest ESLint with flat config and TypeScript support
- **Jest 30.x** - Testing framework with TypeScript integration via ts-jest
- **No bundler** - Direct TypeScript compilation to CommonJS

## Project Structure

```
.
├── src/           # Source files (.ts)
├── dist/          # Compiled output (generated)
├── tsconfig.json  # TypeScript configuration
├── eslint.config.mjs  # ESLint configuration (flat config)
└── jest.config.mjs    # Jest configuration
```

