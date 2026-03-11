import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthAdapter, AuthState, Session, User } from "./types";

interface AuthContextValue extends AuthState {
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, name?: string): Promise<void>;
  signOut(): Promise<void>;
  resetPasswordRequest(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  signInWithOAuth(provider: string): Promise<void>;
  handleOAuthCallback(params: Record<string, string>): Promise<void>;
  signInWithMagicLink(email: string): Promise<void>;
  verifyMagicLink(token: string): Promise<void>;
  signInWithPasskey(): Promise<void>;
  registerPasskey(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  adapter: AuthAdapter;
  children: React.ReactNode;
}

export function AuthProvider({ adapter, children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSession = useCallback((s: Session | null) => {
    setSession(s);
    setUser(s?.user ?? null);
  }, []);

  // Restore session on mount
  useEffect(() => {
    let cancelled = false;
    adapter.getSession().then((s) => {
      if (!cancelled) {
        handleSession(s);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [adapter, handleSession]);

  // Listen for 401 unauthorized events from axios
  useEffect(() => {
    const onUnauthorized = () => {
      handleSession(null);
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", onUnauthorized);
    };
  }, [handleSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const s = await adapter.signIn(email, password);
      handleSession(s);
    },
    [adapter, handleSession]
  );

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      const s = await adapter.signUp(email, password, name);
      handleSession(s);
    },
    [adapter, handleSession]
  );

  const signOut = useCallback(async () => {
    await adapter.signOut();
    handleSession(null);
  }, [adapter, handleSession]);

  const resetPasswordRequest = useCallback(
    async (email: string) => {
      await adapter.resetPasswordRequest(email);
    },
    [adapter]
  );

  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      await adapter.resetPassword(token, newPassword);
    },
    [adapter]
  );

  const signInWithOAuth = useCallback(
    async (provider: string) => {
      await adapter.signInWithOAuth(provider);
    },
    [adapter]
  );

  const handleOAuthCallback = useCallback(
    async (params: Record<string, string>) => {
      const s = await adapter.handleOAuthCallback(params);
      handleSession(s);
    },
    [adapter, handleSession]
  );

  const signInWithMagicLink = useCallback(
    async (email: string) => {
      await adapter.signInWithMagicLink(email);
    },
    [adapter]
  );

  const verifyMagicLink = useCallback(
    async (token: string) => {
      const s = await adapter.verifyMagicLink(token);
      handleSession(s);
    },
    [adapter, handleSession]
  );

  const signInWithPasskey = useCallback(async () => {
    const s = await adapter.signInWithPasskey();
    handleSession(s);
  }, [adapter, handleSession]);

  const registerPasskey = useCallback(async () => {
    await adapter.registerPasskey();
  }, [adapter]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      resetPasswordRequest,
      resetPassword,
      signInWithOAuth,
      handleOAuthCallback,
      signInWithMagicLink,
      verifyMagicLink,
      signInWithPasskey,
      registerPasskey,
    }),
    [
      user,
      session,
      isLoading,
      signIn,
      signUp,
      signOut,
      resetPasswordRequest,
      resetPassword,
      signInWithOAuth,
      handleOAuthCallback,
      signInWithMagicLink,
      verifyMagicLink,
      signInWithPasskey,
      registerPasskey,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
