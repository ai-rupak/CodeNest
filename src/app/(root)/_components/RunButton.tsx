"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import InputWarningModal from "./InputWarningModal";

function codeRequiresInput(code: string, language: string) {
  const inputPatterns: Record<string, RegExp[]> = {
    python: [/input\(/],
    javascript: [/readline/, /prompt/],
    java: [/Scanner\s*\(/],
    cpp: [/\bcin\s*>>/],
    c: [/\bscanf\s*\(/],
  };
  const patterns = inputPatterns[language.toLowerCase()] || [];
  return patterns.some((pattern) => pattern.test(code));
}

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning, input, getCode } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);
  const [showModal, setShowModal] = useState(false);

  const handleRun = async () => {
    const code = getCode();
    const needsInput = codeRequiresInput(code, language);

    if (needsInput && !input.trim()) {
      setShowModal(true); // show modal
      return;
    }

    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  return (
    <>
      <motion.button
        onClick={handleRun}
        disabled={isRunning}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group relative inline-flex items-center gap-2.5 px-5 py-2.5
          disabled:cursor-not-allowed
          focus:outline-none
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />
        <div className="relative flex items-center gap-2.5">
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <span className="text-sm font-medium text-white/90">Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white/90 group-hover:scale-110 group-hover:text-white" />
              <span className="text-sm font-medium text-white/90 group-hover:text-white">
                Run Code
              </span>
            </>
          )}
        </div>
      </motion.button>

      {/* Modal */}
      <InputWarningModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default RunButton;
