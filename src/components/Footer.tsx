export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <p>&copy; 2025 FastMinify. All rights reserved.</p>
          <p className="text-center">
            Free online tool to minify JavaScript and CSS instantly — fast, modern, and privacy-friendly.
          </p>
        </div>
      </div>
    </footer>
  )
}
