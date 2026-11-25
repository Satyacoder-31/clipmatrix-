const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Generates a readable unique access code for brand campaign analytics gating.
 */
export function generateCampaignAccessCode(length = 6): string {
  let suffix = '';
  for (let i = 0; i < length; i++) {
    suffix += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `CLM-${suffix}`;
}

/**
 * Normalizes user-entered campaign access codes for comparison and storage.
 */
export function normalizeAccessCode(code: string): string {
  return code.trim().toUpperCase();
}
