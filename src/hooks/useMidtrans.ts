import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VITE_APP_MIDTRANS_CLIENT_KEY, VITE_APP_SNAP_JS } from "utils/env";

declare global {
  interface Window {
    snap: any;
  }
}

export type MidtransResponse = {
  snap_token: string | null;
  snap_redirect_url: string | null;
};

type ActionStatus = {
  onSuccess: (result: any) => void;
  onPending: (result: any) => void;
  onClose: (result: any) => void;
};

type EmbedFunction = {
  snapToken: string;
  embedId: string;
  action: ActionStatus;
};

const useMidtrans = (isOpen: boolean) => {
  const [snap, setSnap] = useState<typeof window.snap | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const script = document.createElement("script");
    script.src = VITE_APP_SNAP_JS;
    script.setAttribute("data-client-key", VITE_APP_MIDTRANS_CLIENT_KEY);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

  const snapEmbed = ({ snapToken, embedId, action }: EmbedFunction) => {
    if (!snap) {
      toast.error("Transaksi online sedang tidak dapat diakses");

      return;
    }

    snap.embed(snapToken, {
      embedId,
      onSuccess: function (result: unknown) {
        console.log({ result }, " : => onSuccess");
        action.onSuccess(result);
      },
      onPending: function (result: unknown) {
        console.log({ result }, " : => onPending");
        action.onPending(result);
      },
      onClose: function (result: unknown) {
        console.error({ result }, " : => onClose");
        action.onClose(result);
      },
    });
  };

  return { snapEmbed };
};

export default useMidtrans;
