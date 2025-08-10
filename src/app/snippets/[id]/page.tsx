"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import { Clock, Code, MessageSquare, User, Terminal, Copy, Maximize2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";
import NavigationHeader from "@/components/NavigationHeaderClient";

function SnippetDetailPage() {
  const snippetId = useParams().id;
  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (


      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="bg-gradient-to-r from-[#1a1a24] to-[#16161f] border border-[#ffffff0d] rounded-lg p-6 shadow-sm backdrop-blur-xl">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#ffffff12] to-[#ffffff06] rounded-lg flex items-center justify-center">
                  <img
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <Code className="w-6 h-6 text-[#a0a0a6] hidden" />
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-white mb-3 break-words">
                    {snippet.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#a0a0a6]">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(snippet._creationTime).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>{comments?.length || 0} {comments?.length === 1 ? 'comment' : 'comments'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#ffffff12] to-[#ffffff08] text-white rounded-md text-sm font-medium border border-[#ffffff0a]">
                  {snippet.language}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Terminal Code Display */}
        <section className="mb-8">
          <div className="bg-[#1e1e2e] rounded-lg border border-[#ffffff0d] overflow-hidden shadow-lg">
            {/* Terminal Header */}
            <div className="bg-gradient-to-r from-[#2a2a3a] to-[#25252f] px-4 py-3 border-b border-[#ffffff08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Terminal Controls */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  {/* Terminal Title */}
                  <div className="flex items-center gap-2 text-[#a0a0a6]">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm font-mono">
                      {snippet.title.toLowerCase().replace(/\s+/g, '_')}.{snippet.language}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <CopyButton 
                    style="p-2 hover:bg-[#ffffff10] rounded text-[#a0a0a6] hover:text-white transition-colors" 
                    code={snippet.code} 
                  />
                  <button className="p-2 hover:bg-[#ffffff10] rounded text-[#a0a0a6] hover:text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal Prompt */}
            <div className="bg-[#1a1a2e] px-4 py-2 border-b border-[#ffffff05] font-mono text-sm">
              <span className="text-[#28ca42]">$</span>
              <span className="text-[#a0a0a6] ml-2">cat {snippet.title.toLowerCase().replace(/\s+/g, '_')}.{snippet.language}</span>
            </div>
            
            {/* Code Editor */}
            <div className="bg-[#0d1117]">
              <Editor
                height="500px"
                language={LANGUAGE_CONFIG[snippet.language]?.monacoLanguage || snippet.language}
                value={snippet.code}
                                  theme="github-dark"
                beforeMount={defineMonacoThemes}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineHeight: 22,
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16, left: 0 },
                  renderWhitespace: "none",
                  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                  fontLigatures: true,
                  cursorBlinking: "solid",
                  renderLineHighlight: "none",
                  folding: true,
                  lineNumbers: "on",
                  lineNumbersMinChars: 4,
                  glyphMargin: false,
                  wordWrap: "on",
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "visible",
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,
                  overviewRulerLanes: 0,
                }}
              />
            </div>
            
            {/* Terminal Footer with Stats */}
            <div className="bg-[#2a2a3a] px-4 py-2 border-t border-[#ffffff08]">
              <div className="flex items-center justify-between text-xs font-mono text-[#a0a0a6]">
                <div className="flex items-center gap-4">
                  <span>{snippet.code.split('\n').length} lines</span>
                  <span>{snippet.code.length} chars</span>
                  <span>{Math.ceil(snippet.code.length / 1024)} KB</span>
                </div>
                <span>
                  {new Date(snippet._creationTime).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section>
          <div className="bg-gradient-to-r from-[#1a1a24] to-[#16161f] border border-[#ffffff0d] rounded-lg shadow-sm backdrop-blur-xl">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#ffffff0d]">
                <MessageSquare className="w-5 h-5 text-[#61dafb]" />
                <h2 className="text-lg font-semibold text-white">
                  Comments
                </h2>
                <span className="text-sm text-[#a0a0a6]">
                  ({comments?.length || 0})
                </span>
              </div>
              <Comments snippetId={snippet._id} />
            </div>
          </div>
        </section>
      </main>
    </div>

  );
}

export default SnippetDetailPage;