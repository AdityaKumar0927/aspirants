// app/utils/logger.server.ts

/**
 * If you no longer need pino, just remove the entire file or do a minimal stub:
 */

export function logInfo(message: string) {
    console.log(`[INFO] ${message}`);
  }
  
  export function logError(err: unknown) {
    console.error(`[ERROR]`, err);
  }
  
  /**
   * Done. No pino references. If you do want pino, run:
   *   npm install pino @types/pino
   */
  