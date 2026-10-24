# Auto Service

Astro site for an auto service landing page, with content editable via
[Pages CMS](https://pagescms.org).

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
├── public/            # Static assets
├── public/assets/     # Media uploaded via Pages CMS
├── src/
│   ├── components/    # Reusable UI components
│   ├── content/       # CMS collections (services, reviews)
│   ├── layouts/       # Page layouts
│   ├── pages/         # Astro routes
│   └── styles/        # SCSS styles
├── .pages.yml         # Pages CMS configuration
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Content editing (Pages CMS)

1. Install the Pages CMS GitHub App on `buhowski/auto-service`.
2. Open [app.pagescms.org](https://app.pagescms.org) and select this repo.
3. Pages CMS reads `.pages.yml` from the repository root.

Configured collections:

- `services` (`src/content/services`) — service cards with title, description, price, image
- `reviews` (`src/content/reviews`) — client reviews with client, text, rating

Media uploads are stored in `public/assets` and referenced as `/assets/...`.
