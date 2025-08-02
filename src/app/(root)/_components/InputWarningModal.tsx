// components/InputWarningModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function InputWarningModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#1e1e2e] border border-white/10 p-6 rounded-xl shadow-xl text-center max-w-md w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-lg font-semibold text-red-400 mb-4">
              ⚠️ Input Required
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              This code requires user input (e.g., `input()` or `cin`). Please provide it in the input panel before executing.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              Okay
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
