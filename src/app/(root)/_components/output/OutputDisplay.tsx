import { motion } from "framer-motion";
function OutputDisplay({ output }: { output: string }) {
  return (
    <div className="space-y-3 output-content">
      <div className="flex items-center gap-2 text-emerald-400 mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            ✓
          </div>
        </motion.div>
        <span className="font-medium">Execution Successful</span>
      </div>
      <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm bg-black/20 rounded-lg p-4 border border-emerald-500/10">
        {output}
      </pre>
    </div>
  );
}
export default OutputDisplay;