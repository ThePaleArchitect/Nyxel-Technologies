import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

// EAS Contract Address on Base Mainnet
const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021';

// Minimal ABI for EAS getAttestation
const easAbi = [
  {
    inputs: [{ name: 'uid', type: 'bytes32' }],
    name: 'getAttestation',
    outputs: [
      {
        components: [
          { name: 'uid', type: 'bytes32' },
          { name: 'schema', type: 'bytes32' },
          { name: 'time', type: 'uint64' },
          { name: 'expirationTime', type: 'uint64' },
          { name: 'revocationTime', type: 'uint64' },
          { name: 'resolver', type: 'address' },
          { name: 'recipient', type: 'address' },
          { name: 'attester', type: 'address' },
          { name: 'revocable', type: 'bool' },
          { name: 'data', type: 'bytes' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export interface Attestation {
  uid: string;
  schema: string;
  time: bigint;
  expirationTime: bigint;
  revocationTime: bigint;
  resolver: string;
  recipient: string;
  attester: string;
  revocable: boolean;
  data: string;
}

/**
 * Fetches the attestation details for a given UID from the EAS contract on Base mainnet.
 * @param uid The 32-byte hex UID of the attestation
 */
export async function fetchAttestationStatus(uid: string): Promise<{ isValid: boolean; attestation: Attestation | null }> {
  if (!uid || uid === '0x' || uid.length !== 66) {
    return { isValid: false, attestation: null };
  }

  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  try {
    const attestation = await client.readContract({
      address: EAS_CONTRACT_ADDRESS,
      abi: easAbi,
      functionName: 'getAttestation',
      args: [uid as `0x${string}`],
    });

    // EAS returns a zeroed struct if the attestation does not exist
    const isValid = attestation && attestation.attester !== '0x0000000000000000000000000000000000000000';
    
    return {
      isValid,
      attestation: attestation as Attestation,
    };
  } catch (error) {
    console.error('Failed to read EAS contract:', error);
    throw error;
  }
}
