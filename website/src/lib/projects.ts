export interface Project {
  id: string;
  codename: string;
  industry: string;
  stack: string[];
  scale: string;
  problem: string;
  solution: string;
  result: string;
  ipfsCid: string;
}

export const projects: Project[] = [
  {
    id: 'ghostnet',
    codename: 'GHOSTNET',
    industry: 'Logistics & Supply Chain',
    stack: ['Rust', 'Go', 'Kafka', 'TimescaleDB', 'AWS GovCloud'],
    scale: '45,000 fleet assets · 2.4M daily requests',
    problem: 'Real-time geospatial tracking with sub-second latency was causing database write bottlenecks and scaling issues during peak hours.',
    solution: 'Designed a custom event-sourcing layer in Rust with Apache Kafka, outputting to TimescaleDB with real-time materialized views.',
    result: '99.99% uptime achieved. 40% infrastructure cost reduction and sub-6ms average query response times.',
    ipfsCid: 'QmXb123456GHOSTNET',
  },
  {
    id: 'corex',
    codename: 'COREX',
    industry: 'DeFi / High-Frequency Trading',
    stack: ['C++', 'Solidity', 'Arbitrum', 'Redis', 'gRPC'],
    scale: '$4.2B quarterly volume · 12ms execution speed',
    problem: 'Slippage and network latency on Ethereum Mainnet were causing high rates of front-running and execution failures on liquidations.',
    solution: 'Migrated the core matching engine to a custom Arbitrum Nitro Orbit chain, using gRPC stream pipelines and high-speed Redis caches.',
    result: 'Liquidation latency reduced from 14s to 12ms, leading to zero liquidation slippage losses over three quarters.',
    ipfsCid: 'QmY789012COREX',
  },
  {
    id: 'aegis',
    codename: 'AEGIS',
    industry: 'Cybersecurity / Threat Detection',
    stack: ['Go', 'Python', 'eBPF', 'ClickHouse', 'Kubernetes'],
    scale: '820M security events scanned daily · 50+ clusters',
    problem: 'Existing intrusion detection systems introduced severe network latency and overhead inside customer production Kubernetes clusters.',
    solution: 'Developed a zero-overhead daemonset using eBPF program hooks at the kernel level, streaming audit logs directly into ClickHouse.',
    result: 'Zero impact on application latency, with threat detection times reduced from minutes to sub-second alerts.',
    ipfsCid: 'QmZ345678AEGIS',
  },
  {
    id: 'shadowflow',
    codename: 'SHADOWFLOW',
    industry: 'Media & Web3 CDN',
    stack: ['TypeScript', 'Rust', 'WebAssembly', 'IPFS', 'Cloudflare Workers'],
    scale: '4.8 PB video assets delivered · 18M active users',
    problem: 'Traditional CDN hosting costs for high-definition video rendering and transcoding were scaling exponentially with user growth.',
    solution: 'Created an edge-transcoding mesh utilizing WebAssembly in Cloudflare Workers, backing up static video chunks onto IPFS.',
    result: 'Bandwidth billing reduced by 72%. Global video startup latency dropped by 30% through decentralized peer retrieval fallback.',
    ipfsCid: 'QmW901234SHADOWFLOW',
  },
  {
    id: 'kronos',
    codename: 'KRONOS',
    industry: 'IoT Telemetry & Industrial AI',
    stack: ['Python', 'PyTorch', 'MQTT', 'InfluxDB', 'Docker Edge'],
    scale: '150,000 Edge sensors · 12.8B telemetry data points',
    problem: 'Edge sensors in remote manufacturing sites experienced intermittent connectivity, preventing predictive maintenance ML models from running.',
    solution: 'Packaged lightweight quantized PyTorch models directly onto edge devices with MQTT local brokerage and store-and-forward telemetry queues.',
    result: '98% of anomalies predicted locally, preventing an estimated $4.3M in assembly line downtime over 12 months.',
    ipfsCid: 'QmK567890KRONOS',
  },
];
