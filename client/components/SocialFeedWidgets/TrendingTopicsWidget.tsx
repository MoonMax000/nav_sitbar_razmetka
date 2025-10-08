import type { FC } from 'react';

interface TrendingTopic {
  id: string;
  category: string;
  headline: string;
  meta: string;
  link?: string;
}

interface TrendingTopicsWidgetProps {
  title?: string;
  topics: TrendingTopic[];
}

const TrendingTopicsWidget: FC<TrendingTopicsWidgetProps> = ({
  title = "What's happening",
  topics,
}) => {
  return (
    <section className="rounded-[24px] border border-[#181B22] bg-[rgba(12,16,20,0.72)] p-5 shadow-[0_24px_48px_rgba(10,12,16,0.45)] backdrop-blur-[40px]">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-4 flex flex-col divide-y divide-[rgba(255,255,255,0.06)]">
        {topics.map((topic) => (
          <li key={topic.id} className="flex flex-col gap-1 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#636A7C]">{topic.category}</span>
            <span className="text-sm font-semibold text-white">{topic.headline}</span>
            <span className="text-xs font-medium text-[#8E8E94]">{topic.meta}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-3 text-sm font-semibold text-[#A06AFF] transition-colors duration-200 hover:text-white"
      >
        Show more
      </button>
    </section>
  );
};

export type { TrendingTopic };
export default TrendingTopicsWidget;
