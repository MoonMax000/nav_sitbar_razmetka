export default function Contact() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Связаться с нами</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Напишите нам — и мы поможем спланировать и реализовать ваш проект.
        </p>
        <form className="mt-10 grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="name">Имя</label>
            <input id="name" name="name" className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="Иван Иванов" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="message">Сообщение</label>
            <textarea id="message" name="message" rows={5} className="rounded-md border bg-background p-3 outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="Опишите задачу или идею" />
          </div>
          <button type="submit" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">Отправить</button>
        </form>
      </div>
    </section>
  );
}
