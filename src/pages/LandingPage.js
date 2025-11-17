import React from "react";

// Conversio Landing Page (stacked, full-width sections)
// TailwindCSS required. Drop this component into your app and render at '/'.

export default function ConversioLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 60% 55%, rgba(255,150,90,0.95) 0%, rgba(255,130,70,0.6) 25%, rgba(255,180,150,0.35) 55%, rgba(245,210,200,0.25) 75%, rgba(240,225,220,0.25) 100%)",
            }}
          />
          <div>
            <div className="text-lg font-semibold">Conversio</div>
            <div className="text-xs text-gray-400">
              Chat, collaborate, connect
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-orange-400">
            Features
          </a>
          <a href="#pricing" className="hover:text-orange-400">
            Pricing
          </a>
          <a href="#contact" className="hover:text-orange-400">
            Contact
          </a>
          <a
            href="/signin"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Sign up
          </a>
        </nav>

        <div className="md:hidden">
          <a
            href="/signup"
            className="px-3 py-2 bg-black text-white rounded-md text-sm"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Stacked hero (text) then full-width chat preview */}
      <main className="w-full flex flex-col items-center px-6 pb-16 space-y-12">
        {/* Hero text (full width) */}
        <section className="w-full max-w-6xl text-center">
          <div className="mb-4 text-sm text-orange-400 font-medium">
            New — Conversio
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
            Chat built for teams that care about clarity
          </h1>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Conversio brings modern messaging, threads, file sharing and
            voice/video into a single delightful experience — fast, private, and
            delightful.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a
              href="/signin"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold"
            >
              Get started — Free
            </a>
            <a
              href="#features"
              className="inline-block px-6 py-3 rounded-lg border border-gray-200"
            >
              Learn more
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                ✓
              </div>
              <div>Secure messages</div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                ⚡
              </div>
              <div>Fast sync across devices</div>
            </div>
          </div>
        </section>

        {/* Chat preview (full width card) */}
        <section className="w-full flex justify-center">
          <div className="w-full max-w-5xl h-[420px] rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Warm orange gradient background (original) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 60% 55%, rgba(255,150,90,0.95) 0%, rgba(255,130,70,0.6) 25%, rgba(255,180,150,0.35) 55%, rgba(245,210,200,0.25) 75%, rgba(240,225,220,0.25) 100%)",
              }}
            />

            {/* Soft desaturating overlay to keep center glow but mute extremes */}
            <div className="absolute inset-0 bg-white/30 mix-blend-multiply" />

            {/* Inner glass panel for content (improves readability) */}
            <div className="relative h-full p-6 flex flex-col gap-6">
              {/* top row: Conversio (left) and version (right) */}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/30" />
                  <div className="text-gray-900 font-semibold">Conversio</div>
                </div>
                <div className="text-gray-800/60">v1.0</div>
              </div>

              {/* centered glass panel: takes 80% width and is centered in the outer card; its content is left-aligned */}
              <div className="mt-6 bg-white/70 w-4/5 mx-auto backdrop-blur-sm rounded-lg p-4 max-w-[700px] text-gray-900 text-left">
                <div className="text-sm font-medium text-gray-700">
                  #general
                </div>
                <div className="mt-4 text-sm leading-relaxed">
                  <strong>Alice:</strong> Hey team — design ready for review?
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Bob: Reviewing now — looks great!
                </div>
              </div>

              {/* bottom left user info */}
              <div className="mt-auto flex gap-3 items-center text-gray-900/80">
                <div className="w-10 h-10 rounded-full bg-white/60" />
                <div>
                  <div className="text-sm">You</div>
                  <div className="text-xs text-gray-600">online • 2 unread</div>
                </div>
              </div>
            </div>

            {/* subtle shadow / ground */}
            <div className="pointer-events-none absolute -bottom-6 left-4 right-4 h-6 rounded-b-2xl bg-black/5 blur-lg" />
          </div>
        </section>
      </main>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-bold mb-6">
          Built for conversation — and getting things done
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold mb-2">Threads & channels</h4>
            <p className="text-sm text-gray-500">
              Keep conversations organized by topics, projects or teams.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold mb-2">Secure by default</h4>
            <p className="text-sm text-gray-500">
              End-to-end encryption and enterprise-grade controls.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="font-semibold mb-2">Voice & video</h4>
            <p className="text-sm text-gray-500">
              One-click calls inside any channel or DM.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-white border-t mt-6">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Ready to start?</h3>
            <p className="text-gray-600">
              Create your team and start chatting in seconds.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href="/signup"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg"
            >
              Get started — it's free
            </a>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer
        id="contact"
        className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} Conversio</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
