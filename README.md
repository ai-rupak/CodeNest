<h1 align="center">🪶 SaaS Code Editor - CodeNest ✨</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Auth-Clerk-blue" alt="Clerk">
  <img src="https://img.shields.io/badge/Backend-Convex-purple" alt="Convex">
  <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Realtime-Socket.IO-black?logo=socket.io" alt="Socket.IO">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License"></a>
</p>

<p align="center">
  <b>CodeNest</b> is a <b>full-stack, real-time, multi-language online code editor</b> with AI-powered error suggestions, collaborative editing, and premium subscription support.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>💻 Core Editor</h3>
<ul>
  <li>Multi-language support – Run code in multiple programming languages.</li>
  <li>Custom input handling – Provide <code>stdin</code> for dynamic execution.</li>
  <li>Code snippets – Save, share, and reuse snippets.</li>
  <li>Theme customization – Light/Dark mode + syntax themes.</li>
</ul>

<h3>🤝 Collaboration</h3>
<ul>
  <li>Real-time collaborative editing via <b>Socket.IO</b>.</li>
  <li>Comment system for snippet discussions.</li>
</ul>

<h3>🧠 AI Integration</h3>
<ul>
  <li>AI-powered error suggestions using <b>Google Gemini</b>.</li>
  <li>Code improvement tips for better quality.</li>
</ul>

<h3>💳 Monetization</h3>
<ul>
  <li>Premium subscription plans for advanced AI features.</li>
  <li>LemonSqueezy payment gateway integration.</li>
</ul>

<h3>🔒 Authentication & Authorization</h3>
<ul>
  <li>Clerk authentication – Email, OAuth, and more.</li>
  <li>Role-based access for free/premium users.</li>
</ul>

<hr/>

<h2>🛠 Tech Stack</h2>

<h4>Frontend</h4>
<ul>
  <li><a href="https://nextjs.org/">Next.js 14 (App Router)</a></li>
  <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
  <li><a href="https://clerk.com/">Clerk</a> for authentication</li>
  <li><a href="https://convex.dev/">Convex</a> for serverless backend</li>
</ul>

<h4>Backend</h4>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> + <a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://socket.io/">Socket.IO</a> for real-time collaboration</li>
  <li>Convex DB for storage & functions</li>
</ul>

<h4>AI</h4>
<ul>
  <li><a href="https://ai.google/">Google Gemini API</a> for AI-powered suggestions</li>
</ul>

<h4>Payments</h4>
<ul>
  <li><a href="https://www.lemonsqueezy.com/">LemonSqueezy</a> for subscriptions</li>
</ul>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
ai-rupak-codenest/
├── convex/              # Convex backend functions & schema
├── src/
│   ├── app/             # Next.js routes (App Router)
│   ├── components/      # Shared UI components
│   ├── hooks/           # Custom hooks
│   ├── store/           # Zustand state store
│   └── types/           # TypeScript types
└── ...
</pre>

<hr/>

<h2>⚡ Getting Started</h2>

<h4>1️⃣ Clone the repository</h4>

<pre>
git clone https://github.com/&lt;your-username&gt;/ai-rupak-codenest.git
cd ai-rupak-codenest
</pre>

<h4>2️⃣ Install dependencies</h4>

<pre>
npm install
# or
yarn install
</pre>

<h4>3️⃣ Configure environment variables</h4>
<p>Create a <code>.env.local</code> file:</p>

<pre>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CONVEX_URL=your_convex_url
GEMINI_API_KEY=your_google_gemini_key
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_key
</pre>

<h4>4️⃣ Run the development server</h4>

<pre>
npm run dev
</pre>

<p>Visit <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</p>

<hr/>

<h2>📸 Screenshots</h2>

<p><b>Editor View</b></p>
<img src="docs/images/editor.png" alt="Editor Screenshot">

<p><b>AI Suggestions</b></p>
<img src="docs/images/ai_suggestions.png" alt="AI Suggestions">

<p><b>Pricing Page</b></p>
<img src="docs/images/pricing.png" alt="Pricing Screenshot">

<hr/>

<h2>🗺 Roadmap</h2>
<ul>
  <li>[ ] More language support (Rust, Go, Swift, etc.)</li>
  <li>[ ] Offline mode for editing</li>
  <li>[ ] AI model fine-tuning</li>
  <li>[ ] Code version history</li>
</ul>

<hr/>

<h2>📜 License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>

<hr/>

<h2>💡 Contributing</h2>
<p>Pull requests are welcome! For major changes, please open an issue first.</p>

<hr/>

<h2>👨‍💻 Author</h2>
<p><b>Rupak Swar</b><br/>
🌐 <a href="https://yourwebsite.com">Portfolio/Website</a><br/>
🐦 <a href="https://twitter.com/yourhandle">Twitter</a><br/>
💻 <a href="https://github.com/yourusername">GitHub</a></p>
