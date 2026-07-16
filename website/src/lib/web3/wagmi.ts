import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base, arbitrum } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not configured');
}

export const config = getDefaultConfig({
  appName: 'Nyxel Technologies',
  projectId: projectId,
  chains: [mainnet, base, arbitrum],
  ssr: true,
});
