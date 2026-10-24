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
├── .github/workflows/   # CI/CD pipelines
│   └── firebase.yml     # Firebase deployment workflow
├── public/              # Static assets
├── public/assets/       # Media uploaded via Pages CMS
├── src/  
│   ├── components/      # Reusable UI components
│   ├── content/         # CMS collections (services, reviews)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Astro routes
│   └── styles/          # SCSS styles
├── .pages.yml           # Pages CMS configuration
├── .firebaserc          # Firebase project aliases
├── firebase.json        # Firebase Hosting configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Deployment

The project is automatically deployed to **Firebase Hosting** via GitHub Actions.

- **Trigger**: Every push to the `main` branch.
- **Workflow**: `.github/workflows/firebase.yml`.
- **Process**:
  1. Install dependencies (`yarn install`).
  2. Build the Astro site (`yarn build`).
  3. Deploy the `dist/` folder to Firebase.


1. Install the Pages CMS GitHub App on `buhowski/auto-service`.
2. Open [app.pagescms.org](https://app.pagescms.org) and select this repo.
3. Pages CMS reads `.pages.yml` from the repository root.

Configured collections:

- `services` (`src/content/services`) — service cards with title, description, price, image
- `reviews` (`src/content/reviews`) — client reviews with client, text, rating

Media uploads are stored in `public/assets` and referenced as `/assets/...`.
