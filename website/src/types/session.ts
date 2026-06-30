export interface VaultSession {
  email?: string;
  address?: string;
  authType: 'web2' | 'web3';
  expiresAt: number;
  tier: 'Personal' | 'Incubation' | 'Scale';
  role?: 'admin' | 'client';
}
