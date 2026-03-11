export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface Session {
  user: User;
  token: string;
  expiresAt?: string;
}

export interface AuthAdapter {
  signIn(email: string, password: string): Promise<Session>;
  signUp(email: string, password: string, name?: string): Promise<Session>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
  resetPasswordRequest(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  signInWithOAuth(provider: string): Promise<void>;
  handleOAuthCallback(params: Record<string, string>): Promise<Session>;
  signInWithMagicLink(email: string): Promise<void>;
  verifyMagicLink(token: string): Promise<Session>;
  signInWithPasskey(): Promise<Session>;
  registerPasskey(): Promise<void>;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
