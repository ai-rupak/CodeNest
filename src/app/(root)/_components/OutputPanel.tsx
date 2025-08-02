"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";
import { 
  Terminal, 
  Keyboard, 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import OutputHeader from "./output/OutputHeader";
import InputPanel from "./output/InputPanel";
import OutputDisplay from "./output/OutputDisplay";
import ErrorPanel from "./output/ErrorPanel";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import AISupport from "./output/AISupport";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showAISupport, setShowAISupport] = useState(false);

  const hasContent =  output;
  const hasError = !!error;
  const clerk = useClerk();
  const mounted = useMounted();


  const handleInputSubmit = (inputValue: string) => {
    // Handle input submission logic here
    console.log("Input submitted:", inputValue);
    setInput(inputValue);
  };

  const handleAIHelp = () => {
    setShowAISupport(true);
  };
  if (!mounted) return null;
  return (
    <div className="relative flex flex-col h-full">
      <div className="relative bg-gradient-to-br from-[#181825]/95 to-[#1e1e2e]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20 flex flex-col h-full">
        
        {/* Header */}
        <OutputHeader 
          hasContent={hasContent}
          isRunning={isRunning}
          showInput={showInput}
          onToggleInput={() => setShowInput(!showInput)}
          onAIHelp={handleAIHelp}
          hasError={hasError}
        />
        {!clerk.loaded && (
                         
                            <EditorPanelSkeleton />
                         
                        )}

        {/* Input Panel - Collapsible */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <InputPanel onSubmit={handleInputSubmit} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Output Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2e]/50 to-[#2a2a3a]/30 backdrop-blur-sm border border-[#313244]/50 rounded-xl overflow-hidden">
              
               
              {/* Content */}
              <div className="h-full overflow-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                  {isRunning ? (
                    <motion.div
                      key="running"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <RunningCodeSkeleton />
                    </motion.div>
                  ) : hasError ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <ErrorPanel
                        error={error} 
                        onAIHelp={handleAIHelp}
                      />
                    </motion.div>
                  ) : output ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <OutputDisplay output={output} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-gray-500"
                    >
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 ring-1 ring-gray-600/30 mb-6 shadow-lg">
                        <Terminal className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-lg font-medium text-gray-400">Ready to Execute</p>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                          Run your code to see the output here. Use the input panel for interactive programs.
                        </p>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex items-center gap-3 mt-8">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowInput(!showInput)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all"
                        >
                          <Keyboard className="w-4 h-4" />
                          <span className="text-sm">Toggle Input</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e]/50 backdrop-blur-sm rounded-b-xl border-t border-white/5">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isRunning ? 'bg-yellow-500 animate-pulse' : 
                hasError ? 'bg-red-500' : 
                hasContent ? 'bg-green-500' : 'bg-gray-500'
              }`} />
              {isRunning ? 'Running...' : hasError ? 'Error' : hasContent ? 'Complete' : 'Idle'}
            </span>
            {hasContent && (
              <span className="hidden sm:inline">
                Lines: {(error || output).split('\n').length}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {showInput && (
              <span className="flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                Input Active
              </span>
            )}
            <span>Terminal</span>
          </div>
        </div>
      </div>

      {/* AI Support Modal */}
      <AnimatePresence>
        {showAISupport && (
          <AISupport
            error={error ?? "" }
            onClose={() => setShowAISupport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default OutputPanel;