export default function AppFooter() {
  return (
    <footer className="bg-pampas-dark border-t border-cloudy-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cloudy">
        <span>© {new Date().getFullYear()} Codex Pet Share — the pixel companion catalog</span>
        <span>Made with ♥ for the coding community</span>
      </div>
    </footer>
  )
}
