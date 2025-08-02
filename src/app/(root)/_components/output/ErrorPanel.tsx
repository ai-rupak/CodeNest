import { Bot } from "lucide-react";
import { motion } from "framer-motion";

function ErrorPanel({ error, onAIHelp }: { error: string; onAIHelp: () => void }) {
  return (
    <div className="space-y-4 output-content">
      <div className="flex items-start gap-3 text-red-400">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 mt-1"
        >
          <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
            ⚠
          </div>
        </motion.div>
        <div className="flex-1 space-y-3">
          <div className="font-medium text-red-300">Execution Error</div>
          <pre className="whitespace-pre-wrap text-red-400/90 font-mono text-sm bg-red-500/5 rounded-lg p-4 border border-red-500/20 leading-relaxed">
            {error}
          </pre>
          
          {/* AI Help Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
          >
            <Bot className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-purple-300 font-medium">Need help fixing this error?</p>
              <p className="text-xs text-purple-400/80 mt-1">Get AI-powered suggestions to resolve this issue</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAIHelp}
              className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm font-medium transition-all border border-purple-500/30"
            >
              Ask AI
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default ErrorPanel;