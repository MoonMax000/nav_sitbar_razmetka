export default function About() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">О компании</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Мы создаём современные веб‑приложения с упором на скорость, дизайн и удобство.
          Наша команда объединяет опыт и лучшие практики фронтенда и бэкенда.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-base font-semibold">Миссия</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Делать слож��ое — простым. Мы помогаем бизнесу быстрее воплощать идеи в продукт.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-base font-semibold">Подход</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Компонентная архитектура, тестирование, производительность и доступность по умолчанию.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-base font-semibold">Технологии</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            React, TypeScript, Tailwind, Express и современные инструменты разработки.
          </p>
        </div>
      </div>
    </section>
  );
}
