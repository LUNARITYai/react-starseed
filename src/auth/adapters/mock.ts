import type { AuthAdapter, Session } from "../types";

const STORAGE_KEY = "mock_auth_session";
const DELAY_MIN = 300;
const DELAY_MAX = 500;

function delay(): Promise<void> {
  const ms = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN)) + DELAY_MIN;
  return new Promise((r) => setTimeout(r, ms));
}

function uuid(): string {
  return crypto.randomUUID();
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class MockAuthAdapter implements AuthAdapter {
  private users: StoredUser[] = [
    {
      id: "demo-user-id",
      email: "demo@example.com",
      name: "Demo User",
      password: "password",
    },
  ];

  private createSession(user: StoredUser): Session {
    const session: Session = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: uuid(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem("auth_token", session.token);
    return session;
  }

  async signIn(email: string, password: string): Promise<Session> {
    await delay();
    const user = this.users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    return this.createSession(user);
  }

  async signUp(
    email: string,
    password: string,
    name?: string
  ): Promise<Session> {
    await delay();
    if (this.users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists");
    }
    const user: StoredUser = {
      id: uuid(),
      email,
      name: name ?? email.split("@")[0] ?? email,
      password,
    };
    this.users.push(user);
    return this.createSession(user);
  }

  async signOut(): Promise<void> {
    await delay();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("auth_token");
  }

  async getSession(): Promise<Session | null> {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      const session: Session = JSON.parse(stored);
      if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("auth_token");
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  async resetPasswordRequest(_email: string): Promise<void> {
    await delay();
    // Mock: always succeeds (don't reveal if email exists)
  }

  async resetPassword(_token: string, newPassword: string): Promise<void> {
    await delay();
    // Mock: reset password for demo user
    const demo = this.users.find((u) => u.email === "demo@example.com");
    if (demo) {
      demo.password = newPassword;
    }
  }

  async signInWithOAuth(provider: string): Promise<void> {
    await delay();
    // Mock: simulate OAuth by auto-creating/signing in a user
    const email = `user@${provider}.example.com`;
    let user = this.users.find((u) => u.email === email);
    if (!user) {
      user = {
        id: uuid(),
        email,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        password: uuid(),
      };
      this.users.push(user);
    }
    this.createSession(user);
    // In a real adapter, this would redirect to the OAuth provider
    window.dispatchEvent(
      new CustomEvent("auth:oauth-callback", {
        detail: { provider, token: uuid() },
      })
    );
  }

  async handleOAuthCallback(_params: Record<string, string>): Promise<Session> {
    await delay();
    // Mock: return current session (set by signInWithOAuth)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    throw new Error("OAuth callback failed");
  }

  async signInWithMagicLink(_email: string): Promise<void> {
    await delay();
    // Mock: always succeeds
  }

  async verifyMagicLink(_token: string): Promise<Session> {
    await delay();
    // Mock: sign in as demo user
    const demo = this.users[0]!;
    return this.createSession(demo);
  }

  async signInWithPasskey(): Promise<Session> {
    await delay();
    // Mock: sign in as demo user
    const demo = this.users[0]!;
    return this.createSession(demo);
  }

  async registerPasskey(): Promise<void> {
    await delay();
    // Mock: always succeeds
  }
}
