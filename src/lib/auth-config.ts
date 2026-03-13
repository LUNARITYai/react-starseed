import { MockAuthAdapter } from "@/auth/adapters/mock";

/**
 * Auth adapter — swap this out for your real auth provider.
 * See `src/auth/adapters/` for example adapters.
 */
export const authAdapter = new MockAuthAdapter();

/**
 * Auth feature flags — toggle which auth methods are shown in the UI.
 */
export const authConfig = {
  enableOAuth: true,
  oauthProviders: ["google", "github"] as const,
  enableMagicLink: true,
  enablePasskeys: false,
  enablePasswordReset: true,
} as const;

export type OAuthProvider = (typeof authConfig.oauthProviders)[number];
