# Auto Service

## Getting Started

Requirements:

- Node.js 24
- Yarn

### Quick Start

```sh
yarn install

yarn dev

yarn build
```

## Structure

```sh
├── .github/workflows/   # CI/CD pipelines
├── public/              # Static assets
├── src/  
│   ├── components/      # Reusable UI components
│   ├── content/         # CMS collections (services, reviews)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Astro routes
│   └── styles/          # SCSS styles
├── .pages.yml           # Pages CMS configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```