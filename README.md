# ⚡ Clip Matrix — Premium Viral Clipping Platform & Creator Ecosystem

> **Turn Every Second of Content Into Millions of Opportunities.**  
> A decentralized viral video clipping marketplace and creator economy ecosystem inspired by the business model and visual experience of Sponz.

---

## 🌟 Executive Overview

**Clip Matrix** is a full-stack, multi-stakeholder viral clipping platform built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and SQLite. It connects three primary stakeholders:

1. **Brands & Businesses:** Upload long-form podcasts, webinars, keynote speeches, and product demos; configure guaranteed CPM or bounty rewards, lock funds in platform escrow, and review submitted clips with 1-click approvals.
2. **Clippers & Video Editors:** Discover brand campaigns, access high-resolution source footage and assets, edit retention-optimized 9:16 vertical hooks, publish directly to their Instagram Reels, YouTube Shorts, and TikTok pages, submit post links, and withdraw verified earnings directly via UPI or Bank IMPS.
3. **Super Administrators:** Monitor platform health, manage users, review and approve brand campaigns, audit views via the dedicated **View Verification Engine**, approve pending UPI cashouts, track net platform commissions, and inspect audit logs.

---

## 🚀 Live Access & Portals

The application is running live at: **`http://localhost:3005`**

### 🔑 Test Personas & Quick Role Switcher
A persistent **Interactive Tester Mode Bar** is pinned at the top of every page. You can jump into any stakeholder dashboard with **1 click** without typing passwords:

| Persona | Name | Email | Password | Role & Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **👑 Super Admin** | Matrix Core Administrator | `admin@clipmatrix.com` | `password123` | Full platform control, View Verification Engine, User moderation, Payout approvals, Audit logs |
| **🏢 Brand** | Aether AI Labs | `brand@clipmatrix.com` | `password123` | Campaign creation wizard, Escrow locking, Clip review workbench, Billing & Wallet top-up |
| **✂️ Clipper** | Aarav Sharma (Elite) | `clipper@clipmatrix.com` | `password123` | Campaign marketplace, Clip submission, Earnings ledger, UPI cashouts, Leaderboard |

---

## 🎨 Visual Identity & Color Palette

Designed with an ultra-premium, dark purple creator-economy aesthetic:
- **Primary Background:** `#090612`
- **Secondary Background:** `#0E071C` / `#120A22`
- **Card Background:** `#140C26` / `#1A1130`
- **Primary Neon Accent:** `#8B5CF6` (Vibrant Violet)
- **Secondary Accent:** `#C084FC` / `#A78BFA` (Soft Purple)
- **Cyan Highlight:** `#06B6D4` (High-Energy Neon)
- **Success Glow:** `#22C55E` (Emerald Green)
- **Typography:** *Space Grotesk* for bold headlines & numbers; *Inter* for interface clarity.

---

## 🛠️ Key Architectural Components

### 1. Public Marketing Experience
- **Hero Section (`/`):** Full-screen high-energy hero with floating 9:16 vertical smartphone previews, play overlays, dynamic live stats badges (`+142k Views Spike`, `₹15,000 Settled`), and dual CTAs.
- **Trust Counters:** 84.5M+ Verified Views, 3,420+ Active Clippers, 240+ Campaigns, ₹1.8Cr+ Payouts, 18,500+ Approved Clips.
- **4-Step Engine Process:** 1. Brand Upload & Escrow -> 2. Clipper Edits -> 3. Organic Social Posting -> 4. View Verification & Payout.
- **Live Campaign Showcase:** Direct database-driven cards displaying live brand campaigns, platform tags, CPM rates, and claimed budget progress.
- **Interactive Dashboard Preview:** Real tabbed preview on the homepage toggling between Brand Analytics and Clipper Earnings.
- **Real-Time ROI Simulator:** Interactive sliders for Campaign Budget, Target CPM, and Product AOV dynamically calculating CPV, projected views, clicks, conversions, revenue, and ROAS.
- **For Brands (`/brands`):** Complete brand acquisition page with interactive Campaign Brief preview, comparison table vs traditional agencies, and brand FAQ.
- **For Clippers (`/clippers`):** Monetization hub featuring earnings calculator, accepted software (CapCut, Premiere, DaVinci), instant UPI proof, and clipper FAQ.
- **Campaign Marketplace (`/campaigns` & `/campaigns/[id]`):** Search with live multi-filter by platform (Instagram, YouTube, TikTok), industry, and reward model; detailed campaign page with creative guidelines, 3-second hook suggestions, downloadable source links, and direct "Join Campaign" / "Submit Clip" actions.
- **Case Studies (`/case-studies`):** In-depth proof from Aether AI, KicksDrop Sneakers, and Founders Unplugged Podcast.
- **Pricing (`/pricing`):** Transparent tier packages (Starter Viral, Scale Matrix, Dominance Enterprise).
- **Contact & Consultation (`/contact`):** Interactive inquiry form and consultation calendar booking with instant confirmation.
- **Legal Suite:** `/terms`, `/privacy`, `/clipper-agreement`, `/brand-agreement`, and `/payout-policy`.

---

### 2. Functional Stakeholder Dashboards

#### ✂️ Clipper Dashboard (`/dashboard/clipper`)
- **Overview:** Live KPI cards (Withdrawable Balance, Lifetime Earned, Verified Views, Approval Ratio) and recent submissions feed.
- **Submit a Clip (`/dashboard/clipper/submit`):** Multi-field form validating social platform (Instagram, YouTube, TikTok), live post URL, title, reported initial views, and reviewer notes. Generates unique `CLM-SUB-XXXX` identifier.
- **My Submissions (`/dashboard/clipper/submissions`):** Real-time status table with color-coded badges (`Pending Review`, `Under Review`, `Approved`, `Views Verified`, `Paid`, `Rejected` with reason), verified view counts, and reward amount.
- **Earnings & Payouts (`/dashboard/clipper/earnings`):** Ledger transaction history and interactive **Request Payout** modal with instant balance check and UPI ID or Bank routing.
- **Leaderboard (`/dashboard/clipper/leaderboard`):** Monthly rankings with verified view counts, payout badges, and clipper tier levels.

#### 🏢 Brand Dashboard (`/dashboard/brand`)
- **Overview:** Brand KPI metrics (Campaign Spend, Verified Views, Pending Review Count, Approved Clips count).
- **Create Campaign Wizard (`/dashboard/brand/campaigns/new`):** 4-step wizard (Overview -> Footage & Assets -> Creative Guidelines & 3s Hooks -> Budget & Escrow). Automatically allocates escrow from brand balance and publishes to the live marketplace.
- **Campaign Management (`/dashboard/brand/campaigns`):** Real-time monitoring of budget utilization, verified reach, and instant Pause/Resume toggles.
- **Review Workbench (`/dashboard/brand/submissions`):** Interactive review table where brand inspects submitted video links and clipper handles, approving them for CPM tracking or rejecting them with custom reviewer notes.
- **Billing & Escrow (`/dashboard/brand/billing`):** Escrow pool overview, lifetime spend tracker, and simulated Razorpay deposit modal.

#### 👑 Super Admin Command Center (`/dashboard/admin`)
- **Overview:** System-wide database metrics (Total Users, Brands, Clippers, Active Campaigns, Verified Views, Payouts Dispatched, 15% Platform Commission).
- **View Verification Engine (`/dashboard/admin/verification`):** Dedicated view audit module. Admin selects any submission, inputs audited view counts, selects verification method (Instagram Graph API, YouTube Data API, or Manual Audit), and triggers **"Verify Views & Credit Clipper Wallet"**. This creates a timestamped `ViewSnapshot`, calculates the exact reward using the campaign engine, updates the clipper's withdrawable balance, debits brand escrow, and writes an audit log!
- **User Directory (`/dashboard/admin/users`):** Searchable user list with role filters and instant 1-click Account Suspension / Activation controls.
- **Payouts Queue (`/dashboard/admin/withdrawals`):** Pending withdrawal requests list. 1-click **"Approve UPI Payout"** marks withdrawal as processed, generates a transaction reference, and sends notifications.
- **Global Campaign Controls (`/dashboard/admin/campaigns`):** Global moderation, budget audits, and status toggles.

---

### 3. Campaign Reward & CPM Calculation Engine (`src/lib/rewards.ts`)
Supports 4 dynamic calculation models:
- **Model A – Fixed Bounty:** Fixed payout per approved clip (e.g. ₹800).
- **Model B – Guaranteed CPM:** `Reward = (Verified Views / 1,000) × CPM Rate` (e.g. 185k views / 1k × ₹140 = ₹25,900).
- **Model C – Tiered Milestones:** Structured milestone rewards (10k, 50k, 100k, 500k, 1M views).
- **Model D – Hybrid:** Base approval bounty + CPM performance bonus.
- **Safety Protections:** Enforces single-clip maximum reward caps and ensures payouts never exceed the remaining campaign escrow budget.

---

## 🗄️ Database Architecture (Prisma & SQLite)

The database schema (`prisma/schema.prisma`) includes:
- `User` (Role-based: `BRAND`, `CLIPPER`, `ADMIN`)
- `BrandProfile` (Company name, industry, size, website, verified status)
- `ClipperProfile` (Social handles, editing software, UPI ID, bank details, rating, tier level)
- `Campaign` (Budget, remaining budget, CPM rate, reward model, guidelines, hook suggestions, assets)
- `CampaignParticipation` (Track clippers joined to campaigns)
- `Submission` (Unique submission ID, platform, video URL, reported & verified views, status, reward)
- `ViewSnapshot` (Timestamped view audits with verification source)
- `Wallet` (Withdrawable balance, pending balance, escrow balance, lifetime stats)
- `Transaction` (Double-entry ledger of deposits, escrow locks, rewards, and cashouts)
- `Withdrawal` (Cashout requests, UPI details, approval status, transaction IDs)
- `Notification` (In-app updates on campaign, submission, and payout events)
- `AuditLog` (Security and administrative action trail)
- `PlatformSetting` (Commission percentages, minimum limits)

---

## 💻 Tech Stack Summary

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Custom Glassmorphism, Neon Glow Utilities
- **Icons:** Lucide React
- **Database & ORM:** Prisma ORM with SQLite (zero-config, high-performance relational storage)
- **Security & Auth:** bcryptjs password hashing, JWT session cookies, Server-side role authorization
- **Currency & Localization:** INR (₹) formatting with Lakhs/Crores notation & International numbers

---

## 🏃 Running the Application

```bash
# 1. Install dependencies
npm install

# 2. Synchronize database and seed realistic demo records
npx prisma db push
node prisma/seed.js

# 3. Build for production
npm run build

# 4. Start production server on port 3005
npm run start
```

Visit **`http://localhost:3005`** in your browser.
