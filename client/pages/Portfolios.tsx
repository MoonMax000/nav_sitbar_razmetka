import type { FC } from "react";

import { ArrowDownRight, ArrowUpRight, BarChart3, LineChart, PieChart, ShieldCheck, TrendingUp } from "lucide-react";

interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}

interface HoldingRow {
  symbol: string;
  name: string;
  allocation: number;
  pnl: string;
  pnlPositive: boolean;
  exposure: string;
}

const metrics: MetricCard[] = [
  {
    id: "equity",
    label: "Equity Value",
    value: "$218,560",
    change: "+4.2% за месяц",
    positive: true,
  },
  {
    id: "cash",
    label: "Свободные средства",
    value: "$42,130",
    change: "Готовы к вводу",
    positive: true,
  },
  {
    id: "risk",
    label: "Риск-профиль",
    value: "Умеренный",
    change: "VaR 4.1%",
  },
  {
    id: "yield",
    label: "Доходность YTD",
    value: "+18.6%",
    change: "vs S&P 500 (+12.2%)",
    positive: true,
  },
];

const holdings: HoldingRow[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    allocation: 18,
    pnl: "+12.4%",
    pnlPositive: true,
    exposure: "AI & Chips",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    allocation: 14,
    pnl: "+9.1%",
    pnlPositive: true,
    exposure: "Cloud & AI",
  },
  {
    symbol: "BTC",
    name: "Bitcoin Trust",
    allocation: 12,
    pnl: "+21.8%",
    pnlPositive: true,
    exposure: "Digital Assets",
  },
  {
    symbol: "GLD",
    name: "SPDR Gold",
    allocation: 8,
    pnl: "-1.6%",
    pnlPositive: false,
    exposure: "Commodities",
  },
  {
    symbol: "TLT",
    name: "US Treasury 20Y",
    allocation: 6,
    pnl: "+2.3%",
    pnlPositive: true,
    exposure: "Fixed Income",
  },
];

const rebalancingIdeas = [
  {
    id: "hedge-ai",
    title: "Зафиксировать часть прибыли в AI-секторе",
    description: "Перенести 3% из NVDA в широкий ETF QQQ для снижения волатильности.",
  },
  {
    id: "dividend",
    title: "Добавить дивидендное плечо",
    description: "Усилить позицию в SCHD на 2% за счёт кэш-баланса.",
  },
  {
    id: "hedge-btc",
    title: "Хедж крипто-экспозиции",
    description: "Ввести опционный коллар на BTC для защиты от откатов >15%.",
  },
];

const PortfolioPage: FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 pb-14">
      <header className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.75)] p-8 text-white shadow-[0_24px_60px_-40px_rgba(12,16,20,0.9)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#A06AFF]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#E3D8FF]">
              <TrendingUp className="h-4 w-4" />
              My Portfolios
            </span>
            <h1 className="text-3xl font-bold leading-tight">Tyrian Multi-Asset Strategy</h1>
            <p className="max-w-[640px] text-sm text-[#AEB6C2]">
              Смешанный портфель из акций роста, цифровых активов и защитных инструментов. Отчёт обновляется в реальном времени и готов к подключению бэкенда.
            </p>
          </div>
          <div className="rounded-3xl border border-[#272D37] bg-black/50 p-5">
            <div className="flex items-center gap-3 text-sm text-[#8B98A5]">
              <LineChart className="h-5 w-5 text-[#A06AFF]" />
              30-Day Sharpe Ratio
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">1.42</div>
            <div className="mt-1 text-xs text-[#5A6675]">Диапазон: 0.9 — 1.6</div>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.id}
            className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-5 text-white shadow-[0_16px_40px_-32px_rgba(12,16,20,0.8)]"
          >
            <div className="flex items-center justify-between text-sm text-[#8B98A5]">
              <span>{metric.label}</span>
              <BarChart3 className="h-4 w-4 text-[#A06AFF]" />
            </div>
            <div className="mt-3 text-2xl font-semibold">{metric.value}</div>
            <div
              className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                metric.positive ? "text-[#2EBD85]" : "text-[#F97066]"
              }`}
            >
              {metric.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {metric.change}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <article className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Структура портфеля</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-xs font-semibold text-[#E0E3EB] transition hover:border-[#A06AFF]/50 hover:text-white"
            >
              Экспортировать отчёт
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#1F242B]">
            <table className="min-w-full divide-y divide-[#1F242B]/60 text-left text-sm">
              <thead className="bg-white/5 text-[#8B98A5]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Тикер</th>
                  <th className="px-4 py-3 font-semibold">Доля</th>
                  <th className="px-4 py-3 font-semibold">Прибыль</th>
                  <th className="px-4 py-3 font-semibold">Сектор</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F242B] text-white">
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="transition hover:bg-white/3">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{holding.symbol}</span>
                        <span className="text-xs text-[#8B98A5]">{holding.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">{holding.allocation}%</td>
                    <td
                      className={`px-4 py-3 text-sm font-semibold ${holding.pnlPositive ? "text-[#2EBD85]" : "text-[#F97066]"}`}
                    >
                      {holding.pnl}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#AEB6C2]">{holding.exposure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-5 text-white">
            <div className="flex items-center gap-2 text-sm text-[#8B98A5]">
              <PieChart className="h-4 w-4 text-[#A06AFF]" />
              Диверсификация
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Технологии", value: 38 },
                { label: "Крипто", value: 20 },
                { label: "Защитные активы", value: 18 },
                { label: "Инфраструктура", value: 12 },
                { label: "Кэш", value: 12 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-[#1F242B]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <div className="w-36 text-xs text-[#8B98A5]">
                    <span className="font-semibold text-white">{item.value}%</span> {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-5 text-white">
            <div className="flex items-center gap-2 text-sm text-[#8B98A5]">
              <ShieldCheck className="h-4 w-4 text-[#4FC3F7]" />
              Рекомендации по ребалансировке
            </div>
            <ul className="mt-4 space-y-4 text-sm text-[#AEB6C2]">
              {rebalancingIdeas.map((idea) => (
                <li key={idea.id} className="rounded-2xl border border-[#272D37] bg-black/30 p-4">
                  <div className="text-sm font-semibold text-white">{idea.title}</div>
                  <p className="mt-2 leading-relaxed">{idea.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-6 text-white">
          <div className="flex items-center gap-2 text-sm text-[#8B98A5]">
            <LineChart className="h-4 w-4 text-[#A06AFF]" />
            Динамика портфеля (90 дней)
          </div>
          <div className="mt-4 h-48 w-full rounded-2xl border border-[#1F242B] bg-gradient-to-br from-[#111722] via-[#0C111A] to-[#0B0F15]" />
          <div className="mt-3 text-xs text-[#5A6675]">
            Подключите бэкенд, чтобы визуализировать реальные данные доходности.
          </div>
        </article>

        <article className="rounded-3xl border border-[#1F242B] bg-[rgba(12,16,20,0.65)] p-6 text-white">
          <div className="flex items-center gap-2 text-sm text-[#8B98A5]">
            <TrendingUp className="h-4 w-4 text-[#A06AFF]" />
            Последние сделки
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              {
                id: "buy-sol",
                action: "Покупка",
                asset: "SOL",
                amount: "$6,200",
                note: "Добавили позицию в блокчейн-инфраструктуру",
              },
              {
                id: "sell-nvda",
                action: "Частичная фиксация",
                asset: "NVDA",
                amount: "$4,800",
                note: "Перенос прибыли в индексный ETF",
              },
              {
                id: "hedge-btc",
                action: "Опционный хедж",
                asset: "BTC",
                amount: "$1,950",
                note: "Коллар на 45 дней для снижения риска",
              },
            ].map((trade) => (
              <li key={trade.id} className="rounded-2xl border border-[#272D37] bg-black/30 p-4">
                <div className="flex items-center justify-between text-xs text-[#8B98A5]">
                  <span>{trade.action}</span>
                  <span>{trade.amount}</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{trade.asset}</div>
                <p className="mt-2 text-xs text-[#AEB6C2]">{trade.note}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default PortfolioPage;
