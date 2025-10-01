export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.violet.200),transparent_40%),radial-gradient(ellipse_at_bottom_left,theme(colors.indigo.200),transparent_40%)]" />
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              Новое приложение • Готово к продакшену
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Современный старт для вашего веб‑приложения
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Быстрый, красивый и надёжный шаблон: React + TypeScript + Tailwind + Express.
              Идеальная основа, чтобы запускать продукт уже сегодня.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                id="get-started"
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Посмотреть возможности
              </a>
              <a
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                Обсудить проект
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Почему именно этот шаблон</h2>
          <p className="mt-3 text-muted-foreground">
            Всё, что нужно для старта, уже настроено. Фокус — на вашем продукте.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.1L18.9 22 12 17.7 5.1 22l2.4-8.9L2 9h7z"/></svg>
            </div>
            <h3 className="mt-4 text-base font-semibold">Производительность</h3>
            <p className="mt-2 text-sm text-muted-foreground">Vite, код‑сплиттинг и оптимизации по умолчанию для молниеносной загрузки.</p>
          </div>
          <div className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </div>
            <h3 className="mt-4 text-base font-semibold">Дизайн‑система</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tailwind и готовые токены темы. Легко поддерживать единый стиль.</p>
          </div>
          <div className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l8 4v6c0 5-8 8-8 8s-8-3-8-8V7z"/></svg>
            </div>
            <h3 className="mt-4 text-base font-semibold">Готовность к продакшену</h3>
            <p className="mt-2 text-sm text-muted-foreground">Типизация, тесты и серверная часть уже интегрированы.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate">
        <div className="container mx-auto px-4 py-16">
          <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-lg sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Готовы начать?</h3>
                <p className="mt-2 text-white/80">Расскажите о задаче — подска��ем оптимальный путь и сроки.</p>
              </div>
              <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100">
                Связаться
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
