# Nyxel Technologies (NXC) - Production TODO List

This checklist tracks tasks and verification parameters needed before pushing the workspace refactoring to a live production environment.

## 1. Cryptographic Salts & Security Environment Variables
- [ ] Add `INTERNAL_SECRET_SALT` to `.env.local` (and Vercel environment variables) to secure customer blind hashes.
- [ ] Add `REFERRAL_SECRET_SALT` to `.env.local` to securely derive referral codes from blind hashes.
- [ ] Ensure `AUTH_SECRET` is set to a secure, random 32-character string for NextAuth session encryption.

## 2. Google OAuth Integration Credentials
- [ ] Create a Google Cloud Console project.
- [ ] Configure OAuth consent screen.
- [ ] Generate OAuth 2.0 Client credentials and configure callback URLs:
  - Development Callback: `http://localhost:3000/api/auth/callback/google`
  - Production Callback: `https://yourdomain.com/api/auth/callback/google`
- [ ] Add `GOOGLE_CLIENT_ID` (or `AUTH_GOOGLE_ID`) and `GOOGLE_CLIENT_SECRET` (or `AUTH_GOOGLE_SECRET`) to your environment variables.

## 3. Web3 & Wallet Provider Configuration
- [ ] Verify `NEXT_PUBLIC_WC_PROJECT_ID` (or `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`) is active in production environment variables to prevent Wagmi configuration errors.
- [ ] Set `NEXT_PUBLIC_USDC_ADDRESS` to the live USDC token address on the target network:
  - Base Mainnet: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
  - Arbitrum Mainnet: `0xaf88d065e77c8cC2239327C5EDb3A432268e5831`

## 4. Third-Party Webhook Channels
- [ ] Replace default `SLACK_WEBHOOK_URL` in production environment to route verified network referrals and leads.

## 5. Attestations & Public Relays
- [ ] Perform Ethereum Attestation Service (EAS) schema attestation for the updated Charter and update the verification link in `/charter`.
- [ ] Generate studio PGP public keys and update the PGP key block inside the channel page `/channel`.
