// app/utils/logger.server.ts
export function logInfo(message: string) {
  console.log(`[INFO] ${message}`);
}

export function logError(err: unknown) {
  console.error(`[ERROR]`, err);
}
