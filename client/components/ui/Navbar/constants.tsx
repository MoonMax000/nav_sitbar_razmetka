import { ReactNode } from "react";
import {
  Home as HomeIcon,
  LayoutDashboard as StockMarket,
  Api as CryptoIcon,
  UsersRound as SocialIcon,
  BadgeCheck as MarketIcon,
  Bell as LiveIcon,
  UserCog as AiIcon,
  Calendar as CalendarIcon,
  FolderLibary as PortfolioIcon,
  CreditCard as BoxIcon,
  Compass as ExploreIcon,
  MessageSpark as MessageIcon,
  NotificationBell as NotificationIcon,
  QuillPen as ComposeIcon,
} from "./icons";
import DashboardNavIcon from "./DashboardNavIcon";

export interface NavElementProps {
  icon: ReactNode;
  title: string;
  route?: string;
  children?: NavElementProps[];
}

export const navElements: NavElementProps[] = [
  { icon: <DashboardNavIcon />, title: "Dashboard", route: "/dashboard" },
  { icon: <HomeIcon className="h-5 w-5" />, title: "Home", route: "/" },
  {
    icon: <StockMarket className="h-5 w-5" />,
    title: "Stock Market",
    route: "/stock",
    children: [
      { icon: <BoxIcon className="h-5 w-5" />, title: "Screener", route: "#" },
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "Events Calendar",
        route: "#",
      },
      { icon: <BoxIcon className="h-5 w-5" />, title: "News", route: "#" },
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "Stocks Comparison",
        route: "#",
      },
    ],
  },
  {
    icon: <CryptoIcon className="h-5 w-5" />,
    title: "Cryptocurrency",
    route: "/crypto",
    children: [
      { icon: <BoxIcon className="h-5 w-5" />, title: "Screener", route: "#" },
    ],
  },
  {
    icon: <SocialIcon className="h-5 w-5" />,
    title: "Social Network",
    route: "/social",
    children: [
      {
        icon: <HomeIcon className="h-5 w-5" />,
        title: "Home",
        route: "/social/home",
      },
      { icon: <BoxIcon className="h-5 w-5" />, title: "Feed", route: "#" },
      { icon: <BoxIcon className="h-5 w-5" />, title: "My page", route: "#" },
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "Chats & Groups",
        route: "#",
      },
      {
        icon: <ComposeIcon className="h-5 w-5" />,
        title: "Create Post",
        route: "/social/compose",
      },
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "🎨 Composer Showcase",
        route: "/composer-showcase",
      },
      {
        icon: <ExploreIcon className="h-5 w-5" />,
        title: "Explore",
        route: "/social/explore",
      },
      {
        icon: <NotificationIcon className="h-5 w-5" />,
        title: "Notifications",
        route: "/social/notifications",
      },
      {
        icon: <MessageIcon className="h-5 w-5" />,
        title: "Messages",
        route: "/social/messages",
      },
    ],
  },
  {
    icon: <MarketIcon className="h-5 w-5" />,
    title: "Marketplace",
    children: [
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "My Products",
        route: "#",
      },
      { icon: <BoxIcon className="h-5 w-5" />, title: "Cart", route: "#" },
    ],
  },
  {
    icon: <LiveIcon className="h-5 w-5" />,
    title: "Live Streaming",
    children: [
      { icon: <BoxIcon className="h-5 w-5" />, title: "Following", route: "#" },
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "Subscriptions",
        route: "#",
      },
    ],
  },
  {
    icon: <AiIcon className="h-5 w-5" />,
    title: "AI Assistant",
    route: "/ai",
    children: [
      {
        icon: <BoxIcon className="h-5 w-5" />,
        title: "Tech Analysis",
        route: "#",
      },
    ],
  },
  {
    icon: <CalendarIcon className="h-5 w-5" />,
    title: "Calendar",
    route: "/calendar",
  },
  {
    icon: <PortfolioIcon className="h-5 w-5" />,
    title: "My Portfolios",
    route: "/portfolios",
  },
];
