import { FC, useState } from 'react';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
}

interface ActivityCardProps {
  title?: string;
  products?: Product[];
}

const ActivityCard: FC<ActivityCardProps> = ({
  title = "Jane's Products",
  products = [
    {
      id: '1',
      title: 'RiskMaster - powerful tool for traders',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/8543203b1a1113c95f70b9585dca067863022d78?width=168',
    },
    {
      id: '2',
      title: 'Momentum Brealout: Signals with 65% accuracy',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/3f5c80615ad603804c2775c67e4d43be32c7d542?width=168',
    },
    {
      id: '3',
      title: 'BTC/USDT Grid-Bot HODL',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/b0eab8630db70e8a9a1e1b9d22a223a811bc8fbe?width=168',
    },
    {
      id: '4',
      title: 'RiskMaster - powerful tool for traders',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/8543203b1a1113c95f70b9585dca067863022d78?width=168',
    },
    {
      id: '5',
      title: 'P2P Crypto Arbitrage from Scratch! Author\'s training program.',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/398f2f052884157dd032feb4fa540fbdf2aff5cc?width=168',
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'topSellers'>('new');

  return (
    <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.50)] p-4 backdrop-blur-[50px]">
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
          onClick={() => setActiveTab('new')}
          className={`flex h-10 flex-col items-center justify-center rounded-[32px] px-4 py-3 backdrop-blur-[58px] ${
            activeTab === 'new'
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(12,16,20,0.50)]'
          }`}
        >
          <div className="text-[15px] font-bold leading-normal text-white">
            New
          </div>
        </button>
        <button
          onClick={() => setActiveTab('topSellers')}
          className={`flex h-10 items-center justify-center gap-1.5 rounded-[32px] px-4 py-3 backdrop-blur-[58px] ${
            activeTab === 'topSellers'
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(12,16,20,0.50)]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <div className="text-[15px] font-bold leading-normal text-white">
              Top Sellers
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-start gap-3 self-stretch">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`flex items-center gap-2 self-stretch ${
              index < products.length - 1 ? 'border-b border-[#181B22] pb-3' : ''
            }`}
          >
            <img
              src={product.thumbnail}
              alt=""
              className="h-11 w-[84px] rounded-lg"
              style={{ aspectRatio: '21/11' }}
            />
            <div className="flex w-[280px] items-center self-stretch">
              <div className="flex-1 self-stretch text-[15px] font-bold leading-normal text-white">
                {product.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
