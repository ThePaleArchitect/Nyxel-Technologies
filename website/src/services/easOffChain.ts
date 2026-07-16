import { SchemaEncoder, Offchain, OffchainAttestationVersion } from '@ethereum-attestation-service/eas-sdk';
import { getAddress } from 'viem';

// Base Mainnet EAS Contract Address
const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021';
const SCHEMA_UID = '0x4d5573428d08c582cc78673a5042bf9e02788e07a3309a0670732890fc02ea7a'; // Schema: string principle, string status

export const offchainConfig = {
  address: EAS_CONTRACT_ADDRESS,
  version: '0.26.0',
  chainId: 8453, // Base Mainnet
};

export const schemaEncoder = new SchemaEncoder('string principle, string status');

export interface OffchainAttestationMessage {
  version: number;
  schema: string;
  recipient: string;
  time: number;
  expirationTime: number;
  revocable: boolean;
  refUID: string;
  data: string;
}

export interface OffchainAttestation {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  primaryType: string;
  types: {
    Attest: { name: string; type: string }[];
  };
  message: OffchainAttestationMessage;
  signature: {
    r: string;
    s: string;
    v: number;
  };
  uid: string;
  signer: string; // The address that signed this attestation
}

/**
 * Prepares the EIP-712 typed data parameters needed to sign the attestation for a charter principle.
 */
export function prepareCharterAttestation(
  principle: string,
  status: string,
  recipient: string
) {
  const encodedData = schemaEncoder.encodeData([
    { name: 'principle', value: principle, type: 'string' },
    { name: 'status', value: status, type: 'string' },
  ]);

  const time = Math.floor(Date.now() / 1000);

  const message: OffchainAttestationMessage = {
    version: 2, // Protocol version 2 for EAS v0.26.0+
    schema: SCHEMA_UID,
    recipient: getAddress(recipient),
    time,
    expirationTime: 0, // Never expires
    revocable: true,
    refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
    data: encodedData,
  };

  const domain = {
    name: 'EAS Attestation',
    version: '0.26.0',
    chainId: 8453,
    verifyingContract: EAS_CONTRACT_ADDRESS,
  };

  const types = {
    Attest: [
      { name: 'version', type: 'uint16' },
      { name: 'schema', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
      { name: 'time', type: 'uint64' },
      { name: 'expirationTime', type: 'uint64' },
      { name: 'revocable', type: 'bool' },
      { name: 'refUID', type: 'bytes32' },
      { name: 'data', type: 'bytes' },
    ],
  };

  return {
    domain,
    types,
    message,
    primaryType: 'Attest',
  };
}

/**
 * Completes the off-chain attestation by combining the prepared parameters with the generated signature.
 */
export function completeOffchainAttestation(
  prepared: ReturnType<typeof prepareCharterAttestation>,
  signature: string,
  signer: string
): OffchainAttestation {
  // Parse signature to get r, s, v
  const r = signature.slice(0, 66);
  const s = '0x' + signature.slice(66, 130);
  let v = parseInt(signature.slice(130, 132), 16);
  if (v < 27) {
    v += 27; // Ensure v is in correct format (27 or 28)
  }

  const offchain = new Offchain(offchainConfig, OffchainAttestationVersion.Version2);
  const uid = offchain.getAttestationUID(prepared.message);

  return {
    domain: prepared.domain,
    primaryType: prepared.primaryType,
    types: prepared.types,
    message: prepared.message,
    signature: { r, s, v },
    uid,
    signer: getAddress(signer),
  };
}

/**
 * Cryptographically verifies an off-chain attestation signature using the EAS SDK.
 */
export function verifyOffChainAttestation(attestation: OffchainAttestation): boolean {
  const offchain = new Offchain(offchainConfig, OffchainAttestationVersion.Version2);

  try {
    const verified = offchain.verifyOffchainAttestationSignature(
      attestation.signer,
      attestation as any
    );
    return verified;
  } catch (error) {
    console.error('Failed to verify off-chain EAS attestation:', error);
    return false;
  }
}
