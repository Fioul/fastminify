export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">About FastMinify</h1>
        <p className="text-muted-foreground text-lg">
          The fastest, most reliable online minifier for JavaScript and CSS
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What is FastMinify?</h2>
          <p>
            FastMinify is a free, privacy-focused online tool designed to minify JavaScript and CSS code instantly. 
            Built with modern web technologies, it provides fast, reliable minification without compromising your data privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose FastMinify?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>100% Client-side:</strong> Your code never leaves your browser</li>
            <li><strong>Lightning Fast:</strong> Minification happens instantly in your browser</li>
            <li><strong>Privacy First:</strong> No data collection, no tracking, no uploads</li>
            <li><strong>Modern UI:</strong> Clean, responsive design with dark mode support</li>
            <li><strong>Advanced Options:</strong> Safe/Aggressive modes and ES5/ES6+ compatibility</li>
            <li><strong>Free Forever:</strong> No registration required, no hidden costs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p>
            FastMinify uses industry-standard minification libraries (Terser for JavaScript, CSSO for CSS) 
            running directly in your browser. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>No server processing required</li>
            <li>No file uploads or downloads</li>
            <li>Complete privacy and security</li>
            <li>Works offline after initial page load</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">JavaScript Minification</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Remove whitespace and comments</li>
                <li>• Shorten variable names</li>
                <li>• Optimize expressions</li>
                <li>• ES5/ES6+ compatibility</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">CSS Minification</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Remove unnecessary whitespace</li>
                <li>• Optimize selectors</li>
                <li>• Merge duplicate rules</li>
                <li>• Remove unused declarations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Built With</h2>
          <p>
            FastMinify is built using modern web technologies to ensure the best performance and user experience:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>Next.js 15:</strong> React framework for optimal performance</li>
            <li><strong>TypeScript:</strong> Type-safe development</li>
            <li><strong>TailwindCSS:</strong> Utility-first CSS framework</li>
            <li><strong>Shadcn/UI:</strong> Beautiful, accessible components</li>
            <li><strong>Terser:</strong> JavaScript minification engine</li>
            <li><strong>CSSO:</strong> CSS optimization library</li>
          </ul>
        </section>

        <section className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
          <p>
            FastMinify is open source and available on GitHub. We welcome contributions, 
            bug reports, and feature requests from the community.
          </p>
        </section>
      </div>
    </div>
  )
}
