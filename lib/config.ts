/**
 * Centralized configuration for Persuasive Productions.
 * All environment variables and global constants should be exported from here.
 */

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export const BRAND_CONFIG = {
  name: "Persuasive Productions",
  shortName: "Persuasive",
  essence: "Precision in Noir",
};
