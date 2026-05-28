# Medicare Advantage Demo

A demo Medicare Advantage application built with Vite, React, and Tailwind CSS. This project simulates key modules for a Medicare Advantage platform, including member dashboard, benefits, provider network, care team management, compliance reporting, gamification, social feed, and unified patient view. All data is mock/simulated for demonstration purposes.

## Tech Stack

- **React** (18.2.0)
- **Vite** (4.4.9)
- **Tailwind CSS** (3.3.3)
- **PostCSS** / **Autoprefixer**
- **PropTypes** for component validation

## Features

- Member dashboard with personalized recommendations and engagement metrics
- Benefits & prescription info
- Provider network directory and partnerships
- Care team management and assignment
- Compliance & CMS reporting with audit trail
- Gamification: rewards, badges, leaderboard
- Social/community feed: posts, comments, messaging, groups
- Unified patient profile: claims, EMR, pharmacy
- Demo login/signup (no real authentication)
- All data is static/mock for simulation

## Folder Structure

```
medicare-advantage-demo/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── context/
│   │   └── AppContext.jsx
│   ├── components/
│   │   ├── ApplicationChannelTabs.jsx
│   │   ├── AuditTrailViewer.jsx
│   │   ├── BenefitList.jsx
│   │   ├── CareTeamRoster.jsx
│   │   ├── EngagementTracker.jsx
│   │   ├── GamificationBoard.jsx
│   │   ├── OutcomeDashboardWidget.jsx
│   │   ├── PersonalizedRecommendations.jsx
│   │   ├── ProviderDirectory.jsx
│   │   ├── ReportForm.jsx
│   │   ├── SocialPostList.jsx
│   │   ├── TaskList.jsx
│   │   ├── TeamChatSim.jsx
│   │   └── UnifiedPatientProfile.jsx
│   ├── pages/
│   │   ├── ApplicationIntake.jsx
│   │   ├── AuditTrail.jsx
│   │   ├── Benefits.jsx
│   │   ├── CareTeam.jsx
│   │   ├── ComplianceReporting.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Gamification.jsx
│   │   ├── Login.jsx
│   │   ├── OutcomeDashboard.jsx
│   │   ├── ProviderNetwork.jsx
│   │   ├── SignUp.jsx
│   │   ├── SocialFeed.jsx
│   │   └── UnifiedPatientView.jsx
│   ├── routes.jsx
│   ├── utils/
│   │   ├── localStorageService.js
│   │   ├── mockDataFactory.js
│   │   └── piiMasking.js
│   ├── mock/
│   │   ├── application_intake.json
│   │   ├── audit_trail.json
│   │   ├── benefits.json
│   │   ├── care_team.json
│   │   ├── compliance_reports.json
│   │   ├── engagement_metrics.json
│   │   ├── gamification.json
│   │   ├── member_profiles.json
│   │   ├── outcome_reports.json
│   │   ├── prescriptions.json
│   │   ├── provider_directory.json
│   │   ├── social_posts.json
│   │   └── unified_patient_data.json
│   └── __tests__/
│       └── ... (Jest/RTL test files)
```

## Setup & Usage

### Prerequisites

- Node.js (>= 16)
- npm

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```
npm run build
```

### Preview production build

```
npm run preview
```

### Run tests

> No tests specified (demo only). See `src/__tests__` for sample test files.

## Demo Login

- Use any username/password and select a role (Member, Provider, Admin).
- No real authentication or data persistence.

## License

**Private Project**  
All code and assets are for demonstration purposes only.  
Do not use in production or distribute without permission.

---

© {current_year} Medicare Advantage Demo. All rights reserved.