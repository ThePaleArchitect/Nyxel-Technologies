# Null Execution Collective (NXC) - Complete Setup & Customization Guide

This document provides a comprehensive developer runbook for configuring, deploying, and customizing the **Null Execution Collective (NXC)** website and the Web3 Escrow smart contracts. 

---

## Table of Contents
1. [System Prerequisites](#1-system-prerequisites)
2. [Local Development Environment Setup](#2-local-development-environment-setup)
3. [Environment Variables Configuration](#3-environment-variables-configuration)
4. [Smart Contract Compilation & Deployment](#4-smart-contract-compilation--deploying)
5. [Branding & Styling Customization](#5-branding--styling-customization)
6. [Copy & Identity Configuration](#6-copy--identity-configuration)
7. [Admin Console & Dynamic Database Management](#7-admin-console--dynamic-database-management)
8. [Production Hosting & Deployment](#8-production-hosting--deployment)

---

## 1. System Prerequisites

Before starting, ensure the following tools are installed on your system:
* **Node.js**: Version 18.x or later (LTS recommended)
* **npm**: Version 9.x or later (comes bundled with Node.js)
* **Git**: For version control and deployment integration
* **Upstash Redis**: An account to create a low-latency serverless database for caching, session stores, and dynamic content.
* **Resend**: An account for transactional email OTP security delivery.
* **WalletConnect (Reown)**: A developer account to obtain a `Project ID` for Web3 SIWE logins.
* **Ethereum Wallet**: Metamask, Coinbase Wallet, or Rabby with testnet/mainnet funds on Base or Arbitrum for contract deployment.

---

## 2. Local Development Environment Setup

### 2.1 Website Setup

The website is located in the [website/](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website) subfolder. Follow these commands to run it locally:

1. **Navigate to the website directory:**
   ```bash
   cd website
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Configure Local Environment File:**
   Copy the provided env template to create your local variables:
   ```bash
   cp .env.example .env.local
   ```
   *(Windows Powershell: `copy .env.example .env.local`)*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be running at [http://localhost:3000](http://localhost:3000).

5. **Build for Production:**
   To test compile the site locally:
   ```bash
   npm run build
   ```

---

## 3. Environment Variables Configuration

Open the [website/.env.local](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/.env.local) file and configure the following parameters:

```env
# Upstash Redis Configuration (Database & Session Caching)
UPSTASH_REDIS_REST_URL=https://your-database-name.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here

# Resend Configuration (Sending OTP Security Passcodes)
RESEND_API_KEY=re_your_resend_api_key_here
NEXT_PUBLIC_EMAIL_FROM=security@yourdomain.com
NEXT_PUBLIC_EMAIL_DOMAIN=yourdomain.com

# Stripe Configuration (Web2 client payments tracking)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Notification Channels (Slack lead relay integration)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000/B000/XXXXXX
CHANNEL_REQUEST_LIMIT=2

# Web3 Configuration (WalletConnect Project ID for SIWE / RainbowKit)
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id_here

# Token Addresses (USDC on Base / Arbitrum)
# Base USDC default: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

### Config Notes:
* **Upstash Redis Fallback:** If `UPSTASH_REDIS_REST_URL` is empty, the application will fallback to a transient in-memory mock (`InMemoryRedisFallback`). Database additions/sessions will not persist across server restarts or Vercel serverless function warmups.
* **Resend Fallback:** If `RESEND_API_KEY` is not provided, security passcodes (OTPs) generated during login will print directly to the server terminal console instead of being emailed. This is convenient for local debugging.
* **Slack Webhooks:** Secure Channel briefs submitted by clients are sent instantly to your Slack channel if the webhook is set up.

---

## 4. Smart Contract Compilation & Deploying

Null Execution Collective features an on-chain milestone Escrow contract for the **Scale ($18,000+)** Web3 tier. The contract is in [contracts/Escrow.sol](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/contracts/Escrow.sol) and uses **Hardhat** for development.

### 4.1 Deployment Configuration

1. **Verify Contract Logic:**
   The Escrow contract accepts client funds in USDC, releases them to the contractor on a milestone-by-milestone basis via an authorized Multi-Sig Arbiter wallet (like a Gnosis Safe), and provides refund capacities if terms aren't met.

2. **Deploy Environment Variables:**
   Set up your keys in a `.env` file at the **root** folder (or export them):
   ```env
   PRIVATE_KEY=0x_deployer_wallet_private_key
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
   ```

3. **Configure Deployment Variables:**
   Open the deploy script [scripts/deploy.js](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/scripts/deploy.js) and fill in your targets:
   ```javascript
   // line 8-10:
   "0xClientAddress",      // Your client's wallet address
   "0xContractorAddress",  // Your studio/developer wallet address
   "0xSafeAddress",        // Multi-sig arbiter wallet address (Gnosis Safe)
   ```

### 4.2 Compiling & Deploying

Run these commands from the **root** workspace directory:

1. **Install dependencies:**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv @openzeppelin/contracts
   ```

2. **Compile the Solidity contract:**
   ```bash
   npx hardhat compile
   ```

3. **Deploy to Target Chain:**
   * Deploy to **Base**:
     ```bash
     npx hardhat run scripts/deploy.js --network base
     ```
   * Deploy to **Arbitrum**:
     ```bash
     npx hardhat run scripts/deploy.js --network arbitrum
     ```
   Take note of the printed deployment address:
   `Escrow deployed to: 0x...`

4. **Verify Contract on Etherscan/Basescan:**
   Use the hardhat verify tool to make the contract code publicly readable:
   ```bash
   npx hardhat verify --network base [DEPLOYED_CONTRACT_ADDRESS] "[USDC_ADDRESS]" "[CLIENT_ADDRESS]" "[CONTRACTOR_ADDRESS]" "[ARBITER_ADDRESS]" "18000000000"
   ```
   *(USDC has 6 decimals, so 18,000 USDC is specified as `18000000000`)*

---

## 5. Branding & Styling Customization

Nyxel's visual identity fuses **Neo-Brutalism, Swiss Minimalism, Dynamic Editorial Typography, and Glassmorphism**.

### 5.1 CSS Theme Variables
To customize branding colors, borders, and effects, edit [website/src/app/globals.css](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/globals.css).

```css
:root {
  /* Hex Color Codes */
  --bg-primary: #0A0A0A;      /* Pure black page backgrounds */
  --bg-secondary: #121212;    /* Dark card background */
  --bg-tertiary: #1A1A1A;     /* Hover actions background */
  --bg-glass: rgba(255, 255, 255, 0.03);

  /* Highlight Accents */
  --accent-cyan: #00F0FF;     /* Glass glow and interactive links */
  --accent-orange: #FF4500;   /* Neo-Brutalist thick borders and active CTAs */
  --accent-gold: #FFD700;     /* Pull-quotes, highlights, and borders */
  --accent-crimson: #FF1A1A;  /* Error prompts and Incident Response alerts */

  /* Borders */
  --border-default: #2A2A2A;
  --border-neo: #FF4500;
}
```

### 5.2 Fonts Stack
The website uses `next/font/google` for optimized font delivery. Custom configurations are in [website/src/app/layout.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/layout.tsx):
* **Serif Headings:** *Playfair Display* (applied to headlines via `.font-serif` / `--font-serif`).
* **Monospace UI & Body:** *JetBrains Mono* (applied via `.font-mono` / `--font-mono`).

---

## 6. Copy & Identity Configuration

### 6.1 Brand Identity & Logos
* **Navigation Logo:** Replace the `"NXC ✦"` logo text in [Header.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/components/layout/Header.tsx#L25-L27).
* **Footer Branding & Disclaimers:** Customize copyright terms, footer descriptions, and legal disclaimers in [Footer.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/components/layout/Footer.tsx#L9-L12).
* **SEO Metadata & Base URL:** Update site title, description, and production canonical links in [layout.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/layout.tsx#L18-L45) and the sitemap builder in [sitemap.ts](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/sitemap.ts#L4).

### 6.2 Team Roster & Charter Principles
Static defaults are defined in [website/src/lib/constants.ts](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/lib/constants.ts):
* **Roster Members:** Change handles (`Architect Ω`, `Distributed Δ`, etc.), roles, experience levels, tech stacks, and timezones in the `ROSTER` array.
* **The Charter:** Customize the 6 guiding core principles, descriptions, and roman numeral index styling in `CHARTER_PRINCIPLES`.
* **SLA Guidelines:** Modify response times and support allocations in the `SLA_TABLE` array.

### 6.3 Classified Deployments Portfolio
Customize the 5 default projects shown inside the Vault dashboard in [website/src/lib/projects.ts](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/lib/projects.ts). Modify parameters:
* `codename`: Visible project identifier (e.g. `COREX`).
* `industry`: Category classification.
* `stack`: Technical language array.
* `scale`: Operational metrics summary.
* `problem`, `solution`, `result`: Core case study descriptions.
* `ipfsCid`: Pinata or IPFS hash pointing to architectural blueprints or documentation.

### 6.4 Hardcoded Settings & PGP Keys
* **EAS Charter Attestation:** To link a real on-chain attestation of your charter, edit the verification link in [charter/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/charter/page.tsx#L79-L87).
* **Secure Channel Email & PGP Key:** Update your studio PGP public key block and contact email in [channel/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/channel/page.tsx#L37-L45) (PGP Key string) and [channel/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/channel/page.tsx#L295).
* **SIWE Message Domain:** Modify signature messages in [vault/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/vault/page.tsx#L103) to reflect your own domain during web3 wallet sign-in requests.
* **Legal Contacts:** Update contact mailboxes in [dmca/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/dmca/page.tsx#L43) and [privacy/page.tsx](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/%28marketing%29/privacy/page.tsx#L53).

### 6.5 Admin Users Configuration
The administrative console bypass role is determined by email address during OTP verification.
Open [website/src/app/api/vault/verify/route.ts](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/app/api/vault/verify/route.ts#L93) and change the admin emails array:
```typescript
const adminEmails = ['your-admin-email@nyxeltechnologies.com', 'relay@yourdomain.com'];
```
Any user logging in with these configured email addresses receives the `role: 'admin'` session token, gaining write access to portfolio databases.

---

## 7. Admin Console & Dynamic Database Management

### 7.1 Accessing the Console
1. Navigate to `/vault` on the website.
2. Under **Web2 Auth**, enter one of the configured admin email addresses.
3. Check the server console logs (local environment) or your Resend inbox (production) for the 6-digit OTP code and submit it.
4. Once verified, a link to the `[Admin Console]` will appear on your Vault dashboard, or you can go directly to `/vault/admin`.

### 7.2 Admin Panel Features
Through the panel, actions modify Redis database collections dynamically:
* **Leads Inbox:** Displays client brief inquiries sent to the secure channel, stored under the Redis key `db:leads`.
* **Dynamic Projects:** Adds, edits, or deletes portfolio projects. These are written to the Redis key `db:projects` and override the static list in `projects.ts`.
* **Dynamic Roster:** Manages the engineering roster, stored under the Redis key `db:roster` to override the static list in `constants.ts`.

---

## 8. Production Hosting & Deployment

### 8.1 Vercel Hosting (Recommended)
Vercel is the ideal host for Next.js 15 apps containing Edge routes and Server Components.

1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Import the repository into Vercel:**
   * Go to Vercel dashboard → **Add New** → **Project**.
   * Select your repository.
3. **Configure Settings:**
   * **Framework Preset:** Next.js.
   * **Root Directory:** `website`.
4. **Environment Variables:**
   Add all keys listed in Section 3 under the **Environment Variables** tab.
5. **Click Deploy.**

### 8.2 Next.js Edge Middleware Notes
The security middleware [website/src/middleware.ts](file:///c:/Users/dell/OneDrive/Documents/Nyxel%20Technologies/website/src/middleware.ts) intercepts route requests to verify sessions.
* **Edge Runtime Limitation:** Standard Edge middleware cannot easily resolve nested Node modules. When locally developing without an active Upstash database URL, the middleware falls back gracefully and lets you bypass checks.
* **Production Validation:** For active deployments, ensure the environment variables `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are active in Vercel to protect the `/vault/admin` pages.
