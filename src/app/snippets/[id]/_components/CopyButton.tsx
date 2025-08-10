"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ code , style }: { code: string , style:string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      onClick={copyToClipboard}
      // type="button"
      className={` hover:bg-white/10 rounded-xl transition-all duration-200 ${style} `}
    >
      {copied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
      )}
    </span>
  );
}

export default CopyButton;
