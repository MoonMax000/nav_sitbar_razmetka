import { Link, NavLink } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur dark:bg-black/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">Ф</span>
          <span className="text-lg font-semibold tracking-tight">Fusion</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            О нас
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Контакты
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Начать
          </a>
        </div>
      </div>
    </header>
  );
}
