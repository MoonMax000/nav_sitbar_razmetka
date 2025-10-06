import { FC, useState } from 'react';
import ActivityCard from '@/components/ActivityCard/ActivityCard';
import PortfolioCard from '@/components/PortfolioCard/PortfolioCard';
import ProductsCard from '@/components/ProductsCard/ProductsCard';
import SubscribeBlock from '@/components/SubscribeBlock/SubscribeBlock';
import SuggestionCard from '@/components/SuggedtionCard/SuggestionCard';
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
    <div id="root-content" className="flex flex-col gap-6">
      <UserHeader isOwn={isOwn} />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <UserInfoCards />
          <UserMarketsCard />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <SubscribeBlock isOwn={isOwn} />
            <CreatePostBox />
            <UserTabs isOwn={isOwn} />
            <Pagination
              totalPages={4}
              currentPage={1}
              onChange={handlePageChange}
            />
          </div>
          <div className="flex flex-col gap-6">
            <PortfolioCard />
            <ActivityCard />
            <ProductsCard />
            <SuggestionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
