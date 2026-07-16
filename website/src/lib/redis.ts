import { Redis } from '@upstash/redis';
import logger from './logger';

let redis: any;

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Temporary in-memory fallback for local development if Upstash env variables are missing
class InMemoryRedisFallback {
  private store = new Map<string, string>();
  private ttls = new Map<string, number>();

  async get(key: string): Promise<any> {
    const val = this.store.get(key);
    if (!val) return null;
    const expiry = this.ttls.get(key);
    if (expiry && Date.now() > expiry) {
      this.store.delete(key);
      this.ttls.delete(key);
      return null;
    }
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }

  async set(key: string, value: any, options?: { ex?: number; px?: number }): Promise<'OK'> {
    const stringVal = typeof value === 'string' ? value : JSON.stringify(value);
    this.store.set(key, stringVal);
    if (options?.ex) {
      this.ttls.set(key, Date.now() + options.ex * 1000);
    }
    return 'OK';
  }

  async del(key: string): Promise<number> {
    const existed = this.store.has(key);
    this.store.delete(key);
    this.ttls.delete(key);
    return existed ? 1 : 0;
  }

  async incr(key: string): Promise<number> {
    const current = await this.get(key);
    const num = current ? Number(current) : 0;
    const next = num + 1;
    await this.set(key, next.toString());
    return next;
  }

  async sadd(key: string, member: string): Promise<number> {
    const current = await this.get(key);
    const set = Array.isArray(current) ? new Set<string>(current) : new Set<string>();
    const existed = set.has(member);
    set.add(member);
    await this.set(key, Array.from(set));
    return existed ? 0 : 1;
  }

  async smembers(key: string): Promise<string[]> {
    const current = await this.get(key);
    return Array.isArray(current) ? current : [];
  }
}

if (url && token && !url.includes('your-cluster')) {
  try {
    redis = new Redis({ url, token });
    logger.info('Connected to Upstash Redis');
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Upstash Redis. Falling back to in-memory store.');
    redis = new InMemoryRedisFallback();
  }
} else {
  logger.warn('UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not configured. Using in-memory Redis mock.');
  redis = new InMemoryRedisFallback();
}

export { redis };
