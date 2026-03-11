import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { useAuth } from "@/auth/auth-context";
import { Button } from "@/components/ui/button";

export function PasskeyButton() {
  const { signInWithPasskey } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePasskey = async () => {
    setLoading(true);
    try {
      await signInWithPasskey();
    } catch {
      // Error handling left to adapter / toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={loading}
      onClick={handlePasskey}
    >
      <Fingerprint className="size-4" />
      <span className="ml-2">
        {loading ? "Authenticating..." : "Sign in with passkey"}
      </span>
    </Button>
  );
}
