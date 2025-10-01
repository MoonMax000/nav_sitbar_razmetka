export function SiteFooter() {
  return (
    <footer className="border-t bg-white/60 dark:bg-black/40">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p>
            © {new Date().getFullYear()} Fusion. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="/about" className="hover:text-foreground">О нас</a>
            <a href="/contact" className="hover:text-foreground">Контакты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
