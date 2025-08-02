import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main content container */}
      <div className="relative z-10">
        {/* Container with responsive padding */}
        <div className="w-full max-w-[1900px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Header with proper spacing */}
          <div className="pt-4 pb-6 sm:pt-6 sm:pb-8">
            <Header />
          </div>

          {/* Main content grid */}
          <div className="pb-6 sm:pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2 lg:gap-4">
              {/* Editor Panel - Full width on mobile/tablet, half on desktop */}
              <div className="w-full">
                <EditorPanel />
              </div>
              
              {/* Output Panel - Full width on mobile/tablet, half on desktop */}
              <div className="w-full">
                <OutputPanel />
              </div>
            </div>
          </div>

          {/* Optional: Responsive layout toggle for smaller screens */}
          <div className="block xl:hidden">
            {/* Mobile/Tablet specific enhancements can go here */}
          </div>
        </div>
      </div>

      {/* Responsive breakpoint indicators (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs font-mono">
          <span className="sm:hidden">XS</span>
          <span className="hidden sm:inline md:hidden">SM</span>
          <span className="hidden md:inline lg:hidden">MD</span>
          <span className="hidden lg:inline xl:hidden">LG</span>
          <span className="hidden xl:inline 2xl:hidden">XL</span>
          <span className="hidden 2xl:inline">2XL</span>
        </div>
      )}
    </div>
  );
}
