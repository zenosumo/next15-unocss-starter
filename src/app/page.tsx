export default function Home() {
  return (
    <div className="min-h-screen bg-sys-bg text-sys-fg">
      {/* Header */}
      <header className="border-b border-sys-border">
        <div className="container mx-auto px-4 py-6 md:px-8 lg:px-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-sys-accent">
            Next15 UnoCSS Starter
          </h1>
          <p className="text-sm md:text-base mt-2 text-color-neutral-600">
            A demo of responsiveness, colors, and typography
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-8 lg:px-12 space-y-12">

        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-sans font-bold text-color-primary-400">
            Typography
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-sys-content p-6 rounded-lg border border-sys-border">
              <h3 className="font-sans text-lg font-semibold mb-3 text-color-primary-300">
                Sans Serif
              </h3>
              <p className="font-sans text-sm md:text-base">
                Source Sans 3 is our primary typeface for body text and headings.
              </p>
            </div>

            <div className="bg-sys-content p-6 rounded-lg border border-sys-border">
              <h3 className="font-code text-lg font-semibold mb-3 text-color-secondary-300">
                Code Font
              </h3>
              <code className="font-code text-sm md:text-base block">
                const demo = "SF Mono, Monaco, Inconsolata";
              </code>
            </div>

            <div className="bg-sys-content p-6 rounded-lg border border-sys-border">
              <h3 className="font-mono text-lg font-semibold mb-3 text-color-ternary-300">
                Monospace
              </h3>
              <pre className="font-mono text-sm md:text-base">
                Inconsolata{'\n'}Fixed-width
              </pre>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-sans font-bold text-color-primary-400">
            Color Palette
          </h2>

          {/* Brand Colors */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-color-neutral-700">
              Brand Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {['primary', 'secondary', 'ternary', 'action', 'neutral'].map((color) => (
                <div key={color} className="space-y-2">
                  <div className={`h-24 rounded-lg bg-color-${color}-400 border border-sys-border`} />
                  <p className="font-code text-xs text-center capitalize">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-color-neutral-700">
              Semantic Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['success', 'warning', 'danger'].map((color) => (
                <div key={color} className="space-y-2">
                  <div className={`h-24 rounded-lg bg-color-${color}-400 border border-sys-border`} />
                  <p className="font-code text-xs text-center capitalize">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Scale Demo */}
          <div>
            <h3 className="font-sans text-lg font-semibold mb-4 text-color-neutral-700">
              Primary Scale (50-900)
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((scale) => (
                <div key={scale} className="space-y-1">
                  <div className={`h-16 rounded bg-color-primary-${scale} border border-sys-border`} />
                  <p className="font-code text-xs text-center">{scale}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsive Grid Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-sans font-bold text-color-primary-400">
            Responsive Layout
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-color-primary-400/20 p-6 rounded-lg border border-color-primary-400">
              <h3 className="font-sans font-semibold mb-2 text-color-primary-300">Mobile</h3>
              <p className="font-sans text-sm text-color-neutral-600">1 column</p>
            </div>
            <div className="bg-color-secondary-400/20 p-6 rounded-lg border border-color-secondary-400">
              <h3 className="font-sans font-semibold mb-2 text-color-secondary-300">Tablet</h3>
              <p className="font-sans text-sm text-color-neutral-600">2 columns</p>
            </div>
            <div className="bg-color-ternary-400/20 p-6 rounded-lg border border-color-ternary-400">
              <h3 className="font-sans font-semibold mb-2 text-color-ternary-300">Desktop</h3>
              <p className="font-sans text-sm text-color-neutral-600">4 columns</p>
            </div>
            <div className="bg-color-action-400/20 p-6 rounded-lg border border-color-action-400">
              <h3 className="font-sans font-semibold mb-2 text-color-action-300">Large</h3>
              <p className="font-sans text-sm text-color-neutral-600">4 columns</p>
            </div>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-sans font-bold text-color-primary-400">
            Interactive Elements
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-sys-accent text-color-primary-900 px-6 py-3 rounded-lg font-sans font-semibold hover:bg-color-primary-500 transition-colors">
              Primary Button
            </button>
            <button className="bg-sys-success text-color-success-900 px-6 py-3 rounded-lg font-sans font-semibold hover:bg-color-success-500 transition-colors">
              Success Button
            </button>
            <button className="bg-sys-warning text-color-warning-900 px-6 py-3 rounded-lg font-sans font-semibold hover:bg-color-warning-500 transition-colors">
              Warning Button
            </button>
            <button className="bg-sys-danger text-color-danger-900 px-6 py-3 rounded-lg font-sans font-semibold hover:bg-color-danger-500 transition-colors">
              Danger Button
            </button>
          </div>

          <div className="bg-sys-content p-6 rounded-lg border border-sys-border space-y-4">
            <p className="font-sans">
              Links demo: <a href="#" className="text-sys-link hover:text-sys-link-hover underline">Primary link</a> and <a href="#" className="text-sys-link visited:text-sys-link-visited underline">visited link</a>
            </p>
            <code className="font-code block bg-color-neutral-50 p-4 rounded text-color-neutral-700">
              npm install @unocss/postcss style-dictionary
            </code>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-sys-border mt-12">
        <div className="container mx-auto px-4 py-6 md:px-8 lg:px-12">
          <p className="font-sans text-sm text-center text-color-neutral-600">
            Built with Next.js 15 + UnoCSS + Style Dictionary
          </p>
        </div>
      </footer>
    </div>
  );
}
