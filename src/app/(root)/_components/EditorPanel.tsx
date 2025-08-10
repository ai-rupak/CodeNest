"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon, Maximize2Icon, Minimize2Icon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import CopyButton from "@/app/snippets/[id]/_components/CopyButton";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {

    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!mounted) return null;

  return (
    <div className={`relative transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="relative bg-gradient-to-br from-[#12121a]/95 to-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20 p-3 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
          {/* Left Section - Title */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3a] ring-1 ring-white/10 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </motion.div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-white">Code Editor</h2>
              <p className="text-xs text-gray-400">Write and execute your code</p>
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Font Size Slider - Hidden on mobile, simplified on tablet */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] rounded-xl ring-1 ring-white/10 shadow-lg">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-16 md:w-20 h-1.5 bg-gray-600 rounded-lg cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((fontSize - 12) / 12) * 100}%, #4b5563 ${((fontSize - 12) / 12) * 100}%, #4b5563 100%)`
                  }}
                />
                <span className="text-sm font-medium text-gray-300 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Mobile Font Size - Simplified */}
            <div className="flex sm:hidden items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] rounded-xl ring-1 ring-white/10">
              <TypeIcon className="size-4 text-gray-400" />
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                className="bg-transparent text-gray-300 text-sm border-none outline-none"
              >
                {[12, 14, 16, 18, 20, 22, 24].map(size => (
                  <option key={size} value={size} className="bg-[#1e1e2e]">{size}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Fullscreen Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2.5 bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] hover:from-[#2a2a3a] hover:to-[#363649] rounded-xl ring-1 ring-white/10 transition-all duration-200 shadow-lg"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2Icon className="size-4 text-gray-400" />
                ) : (
                  <Maximize2Icon className="size-4 text-gray-400" />
                )}
              </motion.button>

              {/* Refresh Button */}
              <motion.button
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-2.5 bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] hover:from-[#2a2a3a] hover:to-[#363649] rounded-xl ring-1 ring-white/10 transition-all duration-200 shadow-lg"
                aria-label="Reset to default code"
              >
                <RotateCcwIcon className="size-4 text-gray-400" />
              </motion.button>

                {/* Copy Button */}
              <motion.button
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-2.5 bg-gradient-to-r from-[#1e1e2e] to-[#2a2a3a] hover:from-[#2a2a3a] hover:to-[#363649] rounded-xl ring-1 ring-white/10 transition-all duration-200 shadow-lg"
                aria-label="Reset to default code"
              >
                <CopyButton style='none' code={editor?.getValue() || ""}  />
              </motion.button>
              

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl overflow-hidden 
                         bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                         hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
                         transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                <ShareIcon className="size-4 text-white" />
                <span className="text-sm font-medium text-white hidden xs:inline">Share</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Editor Container */}
        <motion.div 
          className="relative group rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Decorative gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          
          {clerk.loaded && (
            <Editor
              height={isFullscreen ? "calc(100vh - 200px)" : "500px"}
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: window.innerWidth > 1024 }, // Only show minimap on larger screens
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 20, bottom: 20 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "SF Mono", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.7,
                letterSpacing: 0.3,
                roundedSelection: true,
                wordWrap: window.innerWidth < 768 ? "on" : "off", // Enable word wrap on mobile
                scrollbar: {
                  verticalScrollbarSize: window.innerWidth < 768 ? 12 : 8,
                  horizontalScrollbarSize: window.innerWidth < 768 ? 12 : 8,
                  useShadows: true,
                },
                folding: true,
                showFoldingControls: "always",
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
                suggest: {
                  showInlineDetails: true,
                },
                inlineSuggest: {
                  enabled: true,
                },
              }}
            />
          )}

          {!clerk.loaded && (
           
              <EditorPanelSkeleton />
           
          )}

          {/* Loading overlay */}
          {/* {!clerk.loaded && (
            <div className="absolute inset-0 bg-[#1e1e2e]/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading editor...</p>
              </div>
            </div>
          )} */}
        </motion.div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mt-3 px-4 py-2 bg-[#1a1a2e]/50 backdrop-blur-sm rounded-xl ring-1 ring-white/5">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Ready
            </span>
            <span className="hidden sm:inline">
              Font: {fontSize}px
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {LANGUAGE_CONFIG[language].monacoLanguage}
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}

      {/* Fullscreen Backdrop */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={toggleFullscreen}
        />
      )}
    </div>
  );
}

export default EditorPanel;