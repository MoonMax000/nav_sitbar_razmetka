import type { FC } from 'react';

import type { FC } from "react";
import { X } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category?: string;
  publishedAgo: string;
  engagement?: string;
  avatars?: string[];
}

interface NewsWidgetProps {
  title?: string;
  items: NewsItem[];
  onDismissAll?: () => void;
}

const NewsWidget: FC<NewsWidgetProps> = ({
  title = "Today's News",
  items,
  onDismissAll,
}) => {
  return (
    <section className="rounded-[24px] border border-[#181B22] bg-[rgba(12,16,20,0.72)] p-5 shadow-[0_24px_48px_rgba(10,12,16,0.45)] backdrop-blur-[40px]">
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          type="button"
          aria-label="Hide news"
          onClick={onDismissAll}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#6C7080] transition-colors hover:bg-[#482090]/15 hover:text-white"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>

      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="group rounded-[18px] bg-transparent p-3 transition-colors duration-200 hover:bg-[#482090]/12"
          >
            <p className="text-sm font-semibold leading-snug text-white group-hover:text-[#E3D8FF]">
              {item.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-[#8E8E94]">
              {item.avatars && item.avatars.length > 0 ? (
                <div className="mr-1 flex items-center -space-x-2">
                  {item.avatars.slice(0, 3).map((avatar, index) => (
                    <span
                      key={`${item.id}-avatar-${index}`}
                      className="inline-flex h-5 w-5 overflow-hidden rounded-full border border-[#0C1014]"
                    >
                      <img src={avatar} alt="" className="h-full w-full object-cover" />
                    </span>
                  ))}
                </div>
              ) : null}
              <span>{item.publishedAgo}</span>
              {item.category ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-[#2F3336]" aria-hidden />
                  <span>{item.category}</span>
                </>
              ) : null}
              {item.engagement ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-[#2F3336]" aria-hidden />
                  <span>{item.engagement}</span>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export type { NewsItem };
export default NewsWidget;
