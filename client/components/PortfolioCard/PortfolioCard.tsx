import { FC, useState } from 'react';

interface LiveStream {
  id: string;
  title: string;
  thumbnail: string;
  viewers?: number;
  isLive?: boolean;
}

interface ScheduledStream {
  id: string;
  title: string;
  thumbnail: string;
}

interface PortfolioCardProps {
  title?: string;
  liveStreams?: LiveStream[];
  comingUpStreams?: ScheduledStream[];
  archivedStreams?: ScheduledStream[];
}

const PortfolioCard: FC<PortfolioCardProps> = ({
  title = "Jane's Activity",
  liveStreams = [
    {
      id: '1',
      title: 'Investing in a new Solana solutions for the market',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/dbbd62b80e49836f6450b147295360f9250a7666?width=744',
      viewers: 345,
      isLive: true,
    },
  ],
  comingUpStreams = [
    {
      id: '1',
      title: 'Profit Potential - Deep Dive!',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/006e9797db01c840c8cbe514616d9d83c627a4d1?width=168',
    },
  ],
  archivedStreams = [
    {
      id: '1',
      title: 'Instant Trades: Masterclass on Forex',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/e1bec4bad2ac9d7ed565fa25667f2a51deae4d6a?width=168',
    },
    {
      id: '2',
      title: 'Bitcoin & Ethereum Market Analysis',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/67dada7740037fe3a61dfd94adab83a7097c5803?width=168',
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'chats' | 'groups'>('live');

  return (
    <div className="flex w-full flex-col items-center gap-3 self-stretch rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-4 backdrop-blur-[50px]">
      <div className="flex items-baseline self-stretch pb-2">
        <div className="flex-1 text-2xl font-bold leading-normal text-white">
          {title}
        </div>
        <div className="flex items-center">
          <div className="text-right text-[15px] font-bold leading-normal text-[#A06AFF]">
            Show all
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex h-6 w-6 items-center justify-center">
            <path d="M10.7402 15.53L14.2602 12L10.7402 8.46997" stroke="#A06AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3 self-stretch">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex h-10 flex-col items-center justify-center rounded-[32px] px-4 py-3 backdrop-blur-[58px] ${
            activeTab === 'live'
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(12,16,20,0.50)]'
          }`}
        >
          <div className="text-[15px] font-bold leading-normal text-white">
            Live Streams
          </div>
        </button>
        <button
          onClick={() => setActiveTab('chats')}
          className={`flex h-10 items-center justify-center gap-1.5 rounded-[32px] px-4 py-3 backdrop-blur-[58px] ${
            activeTab === 'chats'
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(12,16,20,0.50)]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <div className="text-[15px] font-bold leading-normal text-white">
              Chats
            </div>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex h-10 items-center justify-center gap-1.5 rounded-[32px] px-4 py-3 backdrop-blur-[58px] ${
            activeTab === 'groups'
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(12,16,20,0.50)]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <div className="text-[15px] font-bold leading-normal text-white">
              Groups
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-start gap-4 self-stretch pt-3">
        <div className="flex h-5 items-center gap-2 self-stretch">
          <div className="flex flex-1 flex-col justify-center self-stretch text-[19px] font-bold leading-normal text-white">
            Live Now
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 self-stretch">
          {liveStreams.map((stream) => (
            <div key={stream.id} className="flex flex-col items-start gap-2.5">
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt=""
                  className="h-auto w-full rounded-lg"
                  style={{ aspectRatio: '372/209', maxWidth: '372px' }}
                />
                {stream.isLive && (
                  <div className="absolute left-3 top-3 flex items-center justify-center gap-1 rounded bg-[#EF454A] px-2 py-0.5">
                    <div className="text-xs font-bold uppercase leading-normal text-white">
                      LIVE
                    </div>
                  </div>
                )}
                {stream.viewers && (
                  <div className="absolute bottom-3 left-3 flex items-center justify-center gap-1 rounded bg-[#23252D] px-2 py-0.5">
                    <div className="text-xs font-bold uppercase leading-normal text-white">
                      {stream.viewers} viewers
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 self-stretch">
                <div className="flex-1 text-[19px] font-bold leading-normal text-white">
                  {stream.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {comingUpStreams.length > 0 && (
        <div className="flex flex-col items-start gap-4 self-stretch border-t border-[#181B22] pt-3">
          <div className="flex h-5 items-center gap-2 self-stretch">
            <div className="flex flex-1 flex-col justify-center self-stretch text-[19px] font-bold leading-normal text-white">
              Coming Up
            </div>
          </div>
          {comingUpStreams.map((stream) => (
            <div key={stream.id} className="flex items-center gap-2 self-stretch">
              <img
                src={stream.thumbnail}
                alt=""
                className="h-11 w-[84px] rounded-lg"
                style={{ aspectRatio: '21/11' }}
              />
              <div className="flex flex-1 flex-col items-start gap-0.5 self-stretch">
                <div className="flex items-center self-stretch">
                  <div className="flex flex-1 flex-col justify-center self-stretch text-[15px] font-bold leading-normal text-white">
                    {stream.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {archivedStreams.length > 0 && (
        <div className="flex flex-col items-start gap-4 self-stretch border-t border-[#181B22] pt-3">
          <div className="flex h-5 items-center gap-2 self-stretch">
            <div className="flex flex-1 flex-col justify-center self-stretch text-[19px] font-bold leading-normal text-white">
              Archived
            </div>
          </div>
          {archivedStreams.map((stream) => (
            <div key={stream.id} className="flex items-center gap-2 self-stretch">
              <img
                src={stream.thumbnail}
                alt=""
                className="h-11 w-[84px] rounded-lg"
                style={{ aspectRatio: '21/11' }}
              />
              <div className="flex flex-1 flex-col items-start gap-0.5 self-stretch">
                <div className="flex items-center self-stretch">
                  <div className="flex flex-1 flex-col justify-center self-stretch text-[15px] font-bold leading-normal text-[#B0B0B0]">
                    {stream.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;
