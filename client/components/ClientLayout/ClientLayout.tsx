import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBackground } from '../ui/AppBackground/AppBackground';
import { Header } from '../ui/Header/Header';
import ContentWrapper from '../ui/ContentWrapper/ContentWrapper';
import Footer from '../ui/Footer/Footer';
import { LayoutVariant } from '../ui/AppBackground/AppBackground';
import NewNavBar from '../ui/Navbar/NewNavBar';

const PagesBg: Record<LayoutVariant, string[]> = {
  primal: [''],
  secondary: [
    'settings',
    'dashboard',
    'security',
    'notifications',
    'kyc',
    'billing',
    'referrals',
    'api',
    'profile_settings',
  ],
};

interface Props {
  children: ReactNode;
  contentWrapperClassname?: string;
}

export const ClientLayout: FC<Props> = ({
  children,
  contentWrapperClassname,
}) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const currentPage = segments[segments.length - 1] || '';
  const layoutVariant: LayoutVariant = PagesBg.secondary.includes(currentPage)
    ? 'secondary'
    : 'primal';

  return (
    <AppBackground variant={layoutVariant}>
      <Header />
      <div className="flex justify-start mb-60">
        <NewNavBar variant={layoutVariant} />
        <main className="flex-1">
          <ContentWrapper className={contentWrapperClassname}>
            {children}
          </ContentWrapper>
        </main>
      </div>
      <Footer />
    </AppBackground>
  );
};
