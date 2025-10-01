import { FC } from 'react';

const PortfolioCard: FC = () => {
  return (
    <div className="container-card p-6">
      <h3 className="text-lg font-semibold text-white">Portfolio</h3>
      <div className="mt-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-indigo/20 p-6">
          <p className="text-3xl font-bold text-white">$12,345</p>
          <p className="mt-1 text-sm text-green">+12.5%</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
