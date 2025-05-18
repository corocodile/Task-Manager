interface Statsig {
  logEvent(
    eventName: string,
    value: string | null,
    metadata: Record<string, any>
  ): void;
}

interface Window {
  statsig: Statsig;
}
