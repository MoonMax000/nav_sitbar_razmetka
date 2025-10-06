import { FC, useState } from 'react';
import ActivityCard from '@/components/ActivityCard/ActivityCard';
import PortfolioCard from '@/components/PortfolioCard/PortfolioCard';
import ProductsCard from '@/components/ProductsCard/ProductsCard';
import SubscribeBlock from '@/components/SubscribeBlock/SubscribeBlock';
import UserHeader from '@/components/UserHeader/UserHeader';
import UserTabs from '@/components/UserTabs';
import CreatePostBox from '@/components/CreatePostBox/CreatePostBox';
import Pagination from '@/components/ui/Pagination/Pagination';
import UserInfoCards from '@/components/UserInfoCards/UserInfoCards';
import UserMarketsCard from '@/components/UserMarketsCard/UserMarketsCard';

interface Props {
  isOwn?: boolean;
}

const HomeScreen: FC<Props> = ({ isOwn = true }) => {
  const [, setCurrentPage] = useState(1);

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
  };

  return (
    <div id="root-content" className="flex min-w-0 flex-col gap-6">
      <UserHeader isOwn={isOwn} />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <UserInfoCards />
          <UserMarketsCard />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <SubscribeBlock isOwn={isOwn} />
            <CreatePostBox />
            <UserTabs isOwn={isOwn} />
            <Pagination
              totalPages={4}
              currentPage={1}
              onChange={handlePageChange}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <PortfolioCard />
            <ActivityCard />
            <ProductsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
