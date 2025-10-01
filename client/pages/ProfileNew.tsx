import { FC, useState } from 'react';
import UserHeader from '@/components/UserHeader/UserHeader';
import { cn } from '@/lib/utils';

type Tab = 'dashboard' | 'profile' | 'marketplace' | 'streaming' | 'social' | 'portfolios';

const tabs = [
  {
    id: 'dashboard' as Tab,
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M10.5 15V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.45884 11.0116C2.16466 9.09716 2.01757 8.14002 2.37949 7.29148C2.74141 6.44293 3.54437 5.86235 5.1503 4.70121L6.35017 3.83366C8.34792 2.38922 9.34678 1.66699 10.4994 1.66699C11.6519 1.66699 12.6508 2.38922 14.6485 3.83366L15.8484 4.70121C17.4544 5.86235 18.2573 6.44293 18.6192 7.29148C18.9811 8.14002 18.834 9.09716 18.5399 11.0116L18.289 12.644C17.8719 15.3577 17.6634 16.7147 16.6902 17.5242C15.7169 18.3337 14.294 18.3337 11.4484 18.3337H9.55037C6.70463 18.3337 5.28177 18.3337 4.30852 17.5242C3.33526 16.7147 3.12674 15.3577 2.70971 12.644L2.45884 11.0116Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'profile' as Tab,
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M5.98131 12.9017C4.80234 13.6037 1.71114 15.0371 3.59389 16.8308C4.51359 17.707 5.53791 18.3337 6.82573 18.3337H14.1743C15.4621 18.3337 16.4864 17.707 17.4061 16.8308C19.2888 15.0371 16.1977 13.6037 15.0187 12.9017C12.254 11.2554 8.74599 11.2554 5.98131 12.9017Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.25 5.41699C14.25 7.48806 12.5711 9.16699 10.5 9.16699C8.42893 9.16699 6.75 7.48806 6.75 5.41699C6.75 3.34593 8.42893 1.66699 10.5 1.66699C12.5711 1.66699 14.25 3.34593 14.25 5.41699Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'marketplace' as Tab,
    label: 'Marketplace',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M3 9.15625V12.9108C3 15.2706 3 16.4506 3.73223 17.1837C4.46447 17.9168 5.64297 17.9168 8 17.9168H13C15.357 17.9168 16.5355 17.9168 17.2677 17.1837C18 16.4506 18 15.2706 18 12.9108V9.15625" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 14.1475C12.4299 14.6535 11.5223 14.9808 10.5 14.9808C9.47764 14.9808 8.57008 14.6535 8 14.1475" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15.3305 2.08623L5.62567 2.11046C4.17719 2.03585 3.80581 3.1526 3.80581 3.69851C3.80581 4.18677 3.74294 4.89856 2.85518 6.23636C1.96742 7.57416 2.03413 7.97158 2.53474 8.8977C2.95021 9.66636 4.00699 9.96661 4.558 10.0171C6.30817 10.0569 7.15969 8.54353 7.15969 7.4798C8.0279 10.1525 10.4971 10.1525 11.5973 9.84686C12.6996 9.5407 13.6439 8.4447 13.8667 7.4798C13.9966 8.67895 14.391 9.37861 15.556 9.85945C16.7629 10.3574 17.8007 9.59628 18.3215 9.10828C18.8422 8.62036 19.1764 7.53712 18.2481 6.34653C17.608 5.52545 17.3411 4.75195 17.2535 3.95025C17.2027 3.48573 17.1581 2.98658 16.8318 2.66894C16.3548 2.20474 15.6705 2.06389 15.3305 2.08623Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'streaming' as Tab,
    label: 'Live Streaming',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M2.16602 9.16634C2.16602 6.41648 2.16602 5.04155 3.02029 4.18728C3.87456 3.33301 5.24949 3.33301 7.99935 3.33301H8.83268C11.5825 3.33301 12.9574 3.33301 13.8118 4.18728C14.666 5.04155 14.666 6.41648 14.666 9.16634V10.833C14.666 13.5828 14.666 14.9578 13.8118 15.8121C12.9574 16.6663 11.5825 16.6663 8.83268 16.6663H7.99935C5.24949 16.6663 3.87456 16.6663 3.02029 15.8121C2.16602 14.9578 2.16602 13.5828 2.16602 10.833V9.16634Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14.666 7.42187L14.7709 7.33529C16.5341 5.88052 17.4157 5.15313 18.1242 5.50434C18.8327 5.85556 18.8327 7.01995 18.8327 9.34874V10.6519C18.8327 12.9807 18.8327 14.1451 18.1242 14.4963C17.4157 14.8475 16.5341 14.1202 14.7709 12.6653L14.666 12.5787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.084 9.16699C10.7743 9.16699 11.334 8.60735 11.334 7.91699C11.334 7.22664 10.7743 6.66699 10.084 6.66699C9.39363 6.66699 8.83398 7.22664 8.83398 7.91699C8.83398 8.60735 9.39363 9.16699 10.084 9.16699Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'social' as Tab,
    label: 'Social Network',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M17.166 7.50033C16.5033 4.17912 13.4267 1.66699 9.7321 1.66699C5.55392 1.66699 2.16602 4.87967 2.16602 8.84199C2.16602 10.7458 2.94784 12.4757 4.22314 13.7593C4.50392 14.042 4.69139 14.4282 4.61573 14.8256C4.49087 15.4754 4.2079 16.0816 3.79356 16.5867C4.88371 16.7877 6.01724 16.6067 6.98936 16.0942C7.33301 15.9132 7.50482 15.8226 7.62607 15.8042C7.71095 15.7913 7.82151 15.8033 7.99935 15.8338" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.66602 13.5517C9.66602 15.9732 11.7183 17.9365 14.2493 17.9365C14.5469 17.9368 14.8437 17.9093 15.136 17.8545C15.3464 17.8149 15.4517 17.7952 15.5251 17.8064C15.5985 17.8176 15.7027 17.873 15.9108 17.9837C16.4997 18.2968 17.1863 18.4074 17.8468 18.2846C17.5958 17.9759 17.4243 17.6055 17.3487 17.2083C17.3028 16.9655 17.4164 16.7295 17.5865 16.5567C18.3591 15.7722 18.8327 14.7152 18.8327 13.5517C18.8327 11.1303 16.7803 9.16699 14.2493 9.16699C11.7183 9.16699 9.66602 11.1303 9.66602 13.5517Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'portfolios' as Tab,
    label: 'Portfolios',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M8.83398 11.1111C8.83398 10.8527 8.83398 10.7236 8.8624 10.6177C8.9394 10.3301 9.16407 10.1054 9.45165 10.0284C9.55757 10 9.68673 10 9.94507 10H11.0562C11.3146 10 11.4437 10 11.5497 10.0284C11.8372 10.1054 12.0619 10.3301 12.1389 10.6177C12.1673 10.7236 12.1673 10.8527 12.1673 11.1111V11.6667C12.1673 12.5872 11.4212 13.3333 10.5007 13.3333C9.58015 13.3333 8.83398 12.5872 8.83398 11.6667V11.1111Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.084 11.2503H13.0695C14.1396 11.2503 14.6747 11.2503 15.1303 11.1538C16.449 10.8745 17.5248 10.0176 17.9956 8.87158C18.1582 8.47566 18.2246 7.99659 18.3573 7.03841C18.4071 6.6787 18.4321 6.49885 18.4081 6.35173C18.3383 5.92328 17.995 5.57231 17.5324 5.45669C17.3736 5.41699 17.1727 5.41699 16.771 5.41699H4.23033C3.82857 5.41699 3.62769 5.41699 3.46887 5.45669C3.00633 5.57231 2.66296 5.92328 2.59318 6.35173C2.56922 6.49885 2.59414 6.6787 2.64397 7.03841C2.77672 7.99659 2.84308 8.47566 3.00572 8.87158C3.47648 10.0176 4.5523 10.8745 5.87095 11.1538C6.32652 11.2503 6.86163 11.2503 7.93184 11.2503H8.91732" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.41602 9.58301V11.2497C3.41602 14.3923 3.41602 15.9638 4.33809 16.94C5.26016 17.9163 6.74421 17.9163 9.71235 17.9163H11.2863C14.2545 17.9163 15.7385 17.9163 16.6606 16.94C17.5827 15.9638 17.5827 14.3923 17.5827 11.2497V9.58301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.4173 5.41634L13.3529 5.122C13.0321 3.65528 12.8717 2.92193 12.4897 2.50247C12.1078 2.08301 11.6006 2.08301 10.5859 2.08301H10.4154C9.40073 2.08301 8.89348 2.08301 8.51156 2.50247C8.12963 2.92193 7.96922 3.65528 7.64838 5.122L7.58398 5.41634" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const ProfileNew: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="flex flex-col gap-6">
      {/* User Header */}
      <UserHeader isOwn={true} />

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 p-1 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-[32px] text-sm font-bold transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-[#482090] text-white backdrop-blur-[58.33px]'
                  : 'border border-[#181B22] bg-[rgba(12,16,20,0.5)] text-webGray hover:text-white backdrop-blur-[58.33px]'
              )}
            >
              <span className={activeTab === tab.id ? 'text-white' : 'text-webGray'}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* My Revenue Card */}
            <div className="flex flex-col justify-center gap-4 p-4 h-[325px] rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] relative overflow-hidden">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-2xl font-bold text-white flex-1">My Revenue</h3>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#1C3430]">
                  <span className="text-xs font-bold text-green">Growing</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-xs font-bold uppercase text-webGray">Value</span>
                    <span className="text-3xl font-bold text-white">$72,450.00</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-webGray">Today Change</span>
                    <span className="text-sm font-bold text-green">+2.4%</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-webGray">All time</span>
                    <span className="text-sm font-bold text-green">+15.7%</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-1 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M7.25 16L13.25 10L7.25 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Portfolio
              </button>

              {/* Chart SVG */}
              <svg className="absolute left-4 bottom-12 w-[calc(100%-32px)] h-44" viewBox="0 0 369 184" fill="none" preserveAspectRatio="none">
                <path d="M13.1267 160.619L9 158.493V184H360V27.916L357.02 36.115L354.956 50.0837L352.664 49.1727L351.517 52.2094L348.766 23.9683L347.849 27.916L346.244 26.094L342.805 29.4343L340.971 44.0104L339.596 40.3664C339.061 43.7067 337.991 50.3267 337.991 50.0837C337.991 49.8408 337.074 45.3263 336.615 43.0994L335.24 50.3874L333.406 42.7957L331.113 40.67L329.967 20.9316L326.528 30.649H325.381L324.464 32.7747L323.777 29.1307L321.713 46.7434L321.025 41.8847L318.733 40.67L317.357 45.8324L316.899 34.9003L315.752 40.67L314.148 32.7747L312.772 37.026L312.084 34.9003L311.396 36.115L310.021 25.4867L308.875 48.2617L307.04 38.5444L305.206 36.115L303.372 51.9057L300.392 61.0158L298.099 59.1938L297.87 66.7854L296.724 60.7121L294.89 68.9111L293.514 87.4348L291.909 88.3458L290.304 89.5605L289.387 101.404L288.241 102.922L285.49 101.404L282.051 94.7229L280.905 103.833L277.924 107.173L276.778 105.959L276.319 108.995L273.339 103.833L272.88 106.262L269.671 104.744L266.92 111.121L266.69 115.676L265.315 114.461L263.71 119.016L262.564 115.676H259.813L259.354 117.194H258.437L256.832 120.838L254.081 117.802L252.705 111.425L251.101 111.728L249.496 119.016L248.349 116.587L247.662 119.927L246.515 117.802L242.618 119.927L240.784 127.823L238.033 125.697L237.116 131.467L235.052 129.037L233.447 134.807L232.301 136.629L230.926 136.933L229.091 132.681L227.945 133.592L227.028 128.126L225.882 129.948L223.131 125.697L222.214 126.912L221.297 125.697L220.15 117.802H217.399L216.024 124.786L215.794 123.268L215.106 127.215H214.189L213.043 131.467L211.438 127.823L210.063 132.074L208.229 125.09L206.395 127.215L206.165 132.074L205.248 128.43L203.873 129.037L203.414 127.215L202.268 138.755L200.892 137.54L199.746 141.488L198.37 130.556L197.224 129.037L196.078 123.268L195.161 125.09L192.639 117.802L191.951 118.713H190.575C190.27 120.433 189.658 123.936 189.658 124.179C189.658 124.422 187.213 118.611 185.99 115.676L183.468 118.713L182.322 122.357L180.717 119.927L179.571 128.43L175.673 134.503L174.986 132.074L173.61 135.111H172.234L171.547 131.467L170.171 133.896C169.101 131.264 166.916 125.818 166.732 125.09C166.549 124.361 164.516 128.43 163.523 130.556L161.001 126.001L159.854 129.037L158.02 119.927L155.957 121.446L154.811 126.608L153.435 116.891L149.767 117.802L148.162 113.247L147.245 115.676L145.411 111.121L144.723 113.247H143.806L141.972 108.692L140.138 113.247L137.157 113.854L136.011 112.032L135.553 115.069L133.948 114.461L132.114 112.032H130.738L130.28 113.247L128.904 112.639L125.924 106.87C125.694 109.603 125.236 115.433 125.236 116.891C125.236 118.348 123.707 114.664 122.943 112.639L121.797 116.283L121.109 114.461L120.192 122.66L119.275 119.927L117.899 122.66L116.524 123.268L115.836 117.802L114.231 123.268L110.792 116.891L109.417 118.713V125.09L107.583 126.001L105.749 115.676L104.373 119.927L102.31 115.676L100.934 116.283L99.0999 111.121L98.4121 115.069L97.4951 113.247L95.4317 115.676L94.5147 119.927L93.8269 114.461L91.7635 116.283L91.305 113.247L90.1587 116.283L87.8661 104.744L86.2613 107.781L85.8027 104.137L84.1979 111.121L82.1346 109.299L80.759 114.461L78.2371 104.137L76.403 107.173L75.2567 104.744L74.3396 107.781L72.047 105.351L69.2959 117.802L67.2325 110.514L66.0862 120.838L65.1692 112.639L64.2521 109.299L63.3351 115.069L62.418 108.692L60.5839 103.226L59.8961 106.262L58.5206 105.351L57.8328 110.514L55.9987 111.121L53.4768 118.713L51.6427 109.906C50.8785 113.145 49.3501 119.867 49.3501 120.838V120.231L47.9745 122.964L46.1404 120.231V128.734C46.1404 128.977 44.7649 134.503 44.0771 137.236L42.7015 136.325L41.0967 138.147L39.4918 136.325L38.5748 138.755L37.4285 137.236L36.2822 138.755L35.3651 136.325L32.3847 143.006L31.4677 142.095L24.8191 155.456L22.7557 153.938L20.4631 156.367L18.629 155.456L17.9412 157.886L15.6486 156.367L13.1267 160.619Z" fill="url(#paint0_linear_revenue)" />
                <path d="M9 146.086L13.1267 148.205L15.6486 143.968L17.9412 145.481L18.629 143.06L20.4631 143.968L22.7557 141.547L24.8191 143.06L31.4677 129.745L32.3847 130.653L35.3651 123.995L36.2822 126.416L37.4285 124.903L38.5748 126.416L39.4918 123.995L41.0967 125.811L42.7015 123.995L44.0771 124.903C44.7649 122.179 46.1404 116.672 46.1404 116.43C46.1404 116.188 46.1404 110.68 46.1404 107.956L47.9745 110.68L49.3501 107.956C49.3501 108.562 49.3501 109.53 49.3501 108.562C49.3501 107.593 50.8785 100.895 51.6427 97.6673L53.4768 106.443L55.9987 98.8777L57.8328 98.2725L58.5206 93.128L59.8961 94.0358L60.5839 91.0096L62.418 96.4568L63.3351 102.812L64.2521 97.062L65.1692 100.391L66.0862 108.562L67.2325 98.2725L69.2959 105.535L72.047 93.128L74.3396 95.5489L75.2567 92.5227L76.403 94.9437L78.2371 91.9175L80.759 102.207L82.1345 97.062L84.1979 98.8777L85.8027 91.9175L86.2613 95.5489L87.8661 92.5227L90.1587 104.022L91.305 100.996L91.7636 104.022L93.8269 102.207L94.5147 107.654L95.4317 103.417L97.4951 100.996L98.4121 102.812L99.0999 98.8777L100.934 104.022L102.31 103.417L104.373 107.654L105.749 103.417L107.583 113.706L109.417 112.798V106.443L110.792 104.627L114.231 110.982L115.836 105.535L116.524 110.982L117.899 110.377L119.275 107.654L120.192 110.377L121.109 102.207L121.797 104.022L122.943 100.391C123.707 102.408 125.236 106.08 125.236 104.627C125.236 103.175 125.694 97.3646 125.924 94.6411L128.904 100.391L130.28 100.996L130.738 99.7856H132.114L133.948 102.207L135.553 102.812L136.011 99.7856L137.157 101.601L140.138 100.996L141.972 96.4568L143.806 100.996H144.723L145.411 98.8777L147.245 103.417L148.162 100.996L149.767 105.535L153.435 104.627L154.811 114.311L155.957 109.167L158.02 107.654L159.854 116.732L161.001 113.706L163.523 118.245C164.516 116.127 166.549 112.072 166.732 112.798C166.916 113.524 169.101 118.951 170.171 121.574L171.547 119.153L172.234 122.785H173.61L174.986 119.758L175.673 122.179L179.571 116.127L180.717 107.654L182.322 110.075L183.468 106.443L185.99 103.417C187.213 106.342 189.658 112.132 189.658 111.89C189.658 111.648 190.27 108.158 190.575 106.443H191.951L192.639 105.535L195.161 112.798L196.078 110.982L197.224 116.732L198.37 118.245L199.746 129.14L200.892 125.206L202.268 126.416L203.414 114.917L203.873 116.732L205.248 116.127L206.165 119.758L206.395 114.917L208.229 112.798L210.063 119.758L211.438 115.522L213.043 119.153L214.189 114.917H215.106L215.794 110.982L216.024 112.496L217.399 105.535H220.15L221.297 113.403L222.214 114.614L223.131 113.403L225.882 117.64L227.028 115.824L227.945 121.271L229.091 120.364L230.926 124.6L232.301 124.298L233.447 122.482L235.052 116.732L237.116 119.153L238.033 113.403L240.784 115.522L242.618 107.654L246.515 105.535L247.662 107.654L248.349 104.325L249.496 106.746L251.101 99.483L252.705 99.1803L254.081 105.535L256.832 108.562L258.437 104.93H259.354L259.813 103.417H262.564L263.71 106.746L265.315 102.207L266.69 103.417L266.92 98.8777L269.671 92.5227L272.88 94.0358L273.339 91.6149L276.319 96.7594L276.778 93.7332L277.924 94.9437L280.905 91.6149L282.051 82.5363L285.49 89.1939L288.241 90.707L289.387 89.1939L290.304 77.3918L291.909 76.1813L293.514 75.2735L294.89 56.8137L296.724 48.643L297.87 54.6954L298.099 47.1299L300.392 48.9457L303.372 39.8671L305.206 24.1309L307.04 26.5519L308.875 36.2357L310.021 13.5393L311.396 24.1309L312.084 22.9205L312.772 25.0388L314.148 20.8021L315.752 28.6702L316.899 22.9205L317.357 33.8147L318.733 28.6702L321.025 29.8807L321.713 34.7226L323.777 17.1707L324.464 20.8021L325.381 18.6838H326.528L329.967 9L331.113 28.6702L333.406 30.7885L335.24 38.354L336.615 31.0912C337.074 33.3104 337.991 37.8093 337.991 38.0514C337.991 38.2935 339.061 31.6964 339.596 28.3676L340.971 31.999L342.805 17.4733L346.244 14.1445L347.849 15.9602L348.766 12.0262L351.517 40.1697L352.664 37.1435L354.956 38.0514L357.02 24.1309L360 15.9602" stroke="url(#paint1_linear_revenue)" strokeWidth="1.5" strokeLinecap="round" filter="drop-shadow(0 0 8px rgba(160, 106, 255, 0.24))" />
                <defs>
                  <linearGradient id="paint0_linear_revenue" x1="184.5" y1="20.9316" x2="184.5" y2="184" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A06AFF" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#181A20" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_revenue" x1="360" y1="78.6023" x2="9" y2="78.6023" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A06AFF" />
                    <stop offset="1" stopColor="#482090" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Live Streaming Card */}
            <div className="flex flex-col justify-between gap-4 p-4 h-[325px] rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-2xl font-bold text-white flex-1">Live Streaming</h3>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[rgba(255,168,0,0.16)]">
                  <span className="text-xs font-bold text-[#FFA800]">Soon</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-xs font-bold uppercase text-webGray">Stream iN</span>
                    <span className="text-sm font-bold text-white">2 Hours</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-xs font-bold uppercase text-webGray">Channel</span>
                    <span className="text-sm font-bold text-white">beautydoe</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-webGray">topic</span>
                  <p className="text-sm font-bold text-white">Investing in a new Solana solutions for the market</p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-webGray">Start</span>
                  <span className="text-sm font-bold text-white">18:30 MSK</span>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M3.58398 9.99983V7.03316C3.58398 3.34982 6.19232 1.8415 9.38398 3.68317L11.959 5.1665L14.534 6.64983C17.7257 8.4915 17.7257 11.5082 14.534 13.3498L11.959 14.8332L9.38398 16.3165C6.19232 18.1582 3.58398 16.6498 3.58398 12.9665V9.99983Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Join Stream
              </button>
            </div>

            {/* AI Assistant Card */}
            <div className="flex flex-col justify-center gap-4 p-4 h-[325px] rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-2xl font-bold text-white flex-1">AI Assistant</h3>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#2E2744]">
                  <span className="text-xs font-bold text-primary">New Tip</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-white">Monitor SOL support at $120</h4>
                <p className="text-sm text-webGray">Technical analysis suggests a potential rebound</p>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-4 p-2 px-4 rounded-lg border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-xs font-bold uppercase text-white">BTC/USD long</span>
                    <span className="text-xs font-bold text-webGray">Entry: $45,230</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#1C3430]">
                      <span className="text-xs font-bold text-green">+12.4%</span>
                    </div>
                    <span className="text-xs font-bold text-webGray">2h ago</span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-2 px-4 rounded-lg border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-xs font-bold uppercase text-white">ETH/USD Short</span>
                    <span className="text-xs font-bold text-webGray">Entry: $3,120</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#3A2127]">
                      <span className="text-xs font-bold text-[#EF454A]">-3.2%</span>
                    </div>
                    <span className="text-xs font-bold text-webGray">5h ago</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M11.9167 10.5403L13.8923 8.56458C14.1363 8.32058 14.2583 8.19856 14.3236 8.06693C14.4477 7.8165 14.4477 7.52247 14.3236 7.27203C14.2583 7.14041 14.1363 7.01839 13.8923 6.77436C13.6482 6.53032 13.5262 6.4083 13.3947 6.34307C13.1442 6.21898 12.8502 6.21898 12.5997 6.34307C12.4681 6.4083 12.3461 6.53032 12.1021 6.77436L10.1264 8.75M11.9167 10.5403L5.06462 17.3923C4.82058 17.6363 4.69856 17.7583 4.56693 17.8236C4.3165 17.9477 4.02247 17.9477 3.77203 17.8236C3.64041 17.7583 3.51839 17.6363 3.27436 17.3923C3.03032 17.1482 2.9083 17.0262 2.84307 16.8947C2.71898 16.6442 2.71898 16.3502 2.84307 16.0997C2.9083 15.9681 3.03032 15.8461 3.27436 15.6021L10.1264 8.75M11.9167 10.5403L10.1264 8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 2.08301L16.4079 2.33195C16.2871 2.65837 16.2267 2.82158 16.1077 2.94065C15.9886 3.05971 15.8253 3.12011 15.4989 3.24089L15.25 3.33301L15.4989 3.42512C15.8253 3.54591 15.9886 3.60631 16.1077 3.72537C16.2267 3.84443 16.2871 4.00764 16.4079 4.33407L16.5 4.58301L16.5921 4.33407C16.7129 4.00764 16.7733 3.84443 16.8923 3.72537C17.0114 3.60631 17.1747 3.54591 17.5011 3.42512L17.75 3.33301L17.5011 3.24089C17.1747 3.12011 17.0114 3.05971 16.8923 2.94065C16.7733 2.82158 16.7129 2.65837 16.5921 2.33195L16.5 2.08301Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M16.5 10.417L16.4079 10.6659C16.2871 10.9923 16.2267 11.1556 16.1077 11.2747C15.9886 11.3937 15.8253 11.4541 15.4989 11.5749L15.25 11.667L15.4989 11.7591C15.8253 11.8799 15.9886 11.9403 16.1077 12.0593C16.2267 12.1784 16.2871 12.3417 16.4079 12.6681L16.5 12.917L16.5921 12.6681C16.7129 12.3417 16.7733 12.1784 16.8923 12.0593C17.0114 11.9403 17.1747 11.8799 17.5011 11.7591L17.75 11.667L17.5011 11.5749C17.1747 11.4541 17.0114 11.3937 16.8923 11.2747C16.7733 11.1556 16.7129 10.9923 16.5921 10.6659L16.5 10.417Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 2.08301L8.90792 2.33195C8.78708 2.65837 8.72667 2.82158 8.60767 2.94065C8.48857 3.05971 8.32537 3.12011 7.99894 3.24089L7.75 3.33301L7.99894 3.42512C8.32537 3.54591 8.48857 3.60631 8.60767 3.72537C8.72667 3.84443 8.78708 4.00764 8.90792 4.33407L9 4.58301L9.09208 4.33407C9.21292 4.00764 9.27333 3.84443 9.39233 3.72537C9.51142 3.60631 9.67467 3.54591 10.0011 3.42512L10.25 3.33301L10.0011 3.24089C9.67467 3.12011 9.51142 3.05971 9.39233 2.94065C9.27333 2.82158 9.21292 2.65837 9.09208 2.33195L9 2.08301Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Open AI Assistant
              </button>
            </div>

            {/* Social Network Card */}
            <div className="flex flex-col justify-center gap-4 p-4 h-[325px] rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-2xl font-bold text-white">Social Network</h3>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#2E2744]">
                  <span className="text-xs font-bold text-primary">12 new messages</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/7746a2e8ebde2c6e52ec623079f09df3e63924fe?width=88" alt="Sophia Light" className="w-11 h-11 rounded-full" />
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-primary">Sophia Light</span>
                    <span className="text-sm text-webGray">Check out new ETH Analysis...</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/23996870cb880292839824f9010dd522308f5fac?width=88" alt="Market Chat" className="w-11 h-11 rounded-full" />
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-primary">Market Chat</span>
                    <span className="text-sm text-webGray">3 new messages in the group</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/68682742732be9f94522a43dd137511874548bb4?width=88" alt="Macro Outlook 2025" className="w-11 h-11 rounded-full" />
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-primary">Macro Outlook 2025</span>
                    <span className="text-sm text-webGray">17 new messages in the group</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-1 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M7.25 16L13.25 10L7.25 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Open Feed
              </button>
            </div>
            </div>

            {/* Second Row - Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Withdraws & Purchases */}
              <div className="flex flex-col gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex justify-between items-center pb-2">
                  <h3 className="text-2xl font-bold text-white flex-1">My Withdraws & Purchases</h3>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#1C3430]">
                    <span className="text-xs font-bold text-green">Live</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Withdraws
                    </button>
                    <button className="flex items-center gap-2 h-10 px-4 rounded-[32px] bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Purchases
                    </button>
                  </div>
                  <a href="#" className="text-sm font-bold text-primary underline">View All</a>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center text-xs font-bold uppercase text-webGray">
                    <div className="flex-1">Product</div>
                    <div className="w-14 text-center">Amount</div>
                    <div className="w-20 text-right">Date</div>
                    <div className="w-20 text-right">Status</div>
                  </div>

                  {[
                    { name: 'RiskMaster - powerful tool for traders', amount: '$39.99', date: '06.12.25', status: 'Pending', statusColor: 'text-primary' },
                    { name: 'BTC/USDT Grid-Bot HODL', amount: '$14.99', date: '06.12.25', status: 'Approved', statusColor: 'text-green' },
                    { name: 'RiskMaster - powerful tool for traders', amount: '$8.99', date: '06.12.25', status: 'Approved', statusColor: 'text-green' },
                    { name: 'Momentum Brealout: Signals with ...', amount: '$1.99', date: '06.12.25', status: 'Declined', statusColor: 'text-[#EF454A]' },
                    { name: 'BTC/USDT Grid-Bot HODL', amount: '$9.99', date: '06.12.25', status: 'Approved', statusColor: 'text-green' },
                    { name: 'RiskMaster - powerful tool for traders', amount: '$11.99', date: '06.12.25', status: 'Approved', statusColor: 'text-green' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="flex-1 text-white font-normal">{item.name}</div>
                      <div className="w-14 text-center text-white font-bold">{item.amount}</div>
                      <div className="w-20 text-right text-white font-normal">{item.date}</div>
                      <div className={`w-20 text-right font-bold ${item.statusColor}`}>{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Social Life */}
              <div className="flex flex-col gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex justify-between items-center pb-2">
                  <h3 className="text-2xl font-bold text-white">My Social Life</h3>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#2E2744]">
                    <span className="text-xs font-bold text-primary">19 new interactions</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button className="h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Posts
                    </button>
                    <button className="h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Chats
                    </button>
                    <button className="h-10 px-4 rounded-[32px] bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Groups
                    </button>
                    <button className="h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Streams
                    </button>
                  </div>
                  <a href="#" className="text-sm font-bold text-primary underline">View All</a>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Total Revenue</span>
                    <span className="text-2xl font-bold text-white">$0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Active Subs</span>
                    <span className="text-2xl font-bold text-white">0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Today's New Subs</span>
                    <span className="text-2xl font-bold text-white">0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Average raiting</span>
                    <span className="text-2xl font-bold text-white">0.0</span>
                  </div>
                </div>
              </div>

              {/* My Marketplace */}
              <div className="flex flex-col gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex justify-between items-center pb-2">
                  <h3 className="text-2xl font-bold text-white">My Marketplace</h3>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-[#1C3430]">
                    <span className="text-xs font-bold text-green">3 new sales</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button className="h-10 px-4 rounded-[32px] bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      New
                    </button>
                    <button className="h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      Top
                    </button>
                    <button className="h-10 px-4 rounded-[32px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[58.33px] text-white text-sm font-bold">
                      All
                    </button>
                  </div>
                  <a href="#" className="text-sm font-bold text-primary underline">View all</a>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Total Revenue</span>
                    <span className="text-2xl font-bold text-white">$0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Total Downloads</span>
                    <span className="text-2xl font-bold text-white">0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Active subscriptions</span>
                    <span className="text-2xl font-bold text-white">0</span>
                  </div>
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                    <span className="text-xs font-bold uppercase text-webGray">Average raiting</span>
                    <span className="text-2xl font-bold text-white">0.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row - Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Following on Marketplace */}
              <div className="flex flex-col justify-between gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex justify-between items-baseline pb-2">
                  <h3 className="text-2xl font-bold text-white flex-1">Following on Marketplace</h3>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  {[
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/5dad0d4f76c7f3927fd2ce9dfc5e32e8a9127e58?width=244', name: 'RiskMaster - powerful tool for traders' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/ca710cd801967c54c06ec127f796d210acf62902?width=244', name: 'Momentum Brealout: Signals with 65% accuracy' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/a049817adf1840513df051b8d1be7ee4276c4801?width=244', name: 'BTC/USDT Grid-Bot HODL' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/5dad0d4f76c7f3927fd2ce9dfc5e32e8a9127e58?width=244', name: 'RiskMaster - powerful tool for traders' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-[122px] h-16 rounded-lg object-cover" />
                      <div className="flex-1 text-sm font-bold text-white">{item.name}</div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center gap-1 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M7.39258 11.9422C7.39258 13.0172 8.21758 13.8838 9.24259 13.8838H11.3343C12.2259 13.8838 12.9509 13.1255 12.9509 12.1922C12.9509 11.1755 12.5093 10.8172 11.8509 10.5838L8.49257 9.41715C7.83424 9.18382 7.39258 8.82549 7.39258 7.80885C7.39258 6.87552 8.11757 6.11719 9.00926 6.11719H11.1009C12.1259 6.11719 12.9509 6.98385 12.9509 8.05885" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.166 5V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.1654 18.3327C14.7677 18.3327 18.4987 14.6017 18.4987 9.99935C18.4987 5.39697 14.7677 1.66602 10.1654 1.66602C5.56299 1.66602 1.83203 5.39697 1.83203 9.99935C1.83203 14.6017 5.56299 18.3327 10.1654 18.3327Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  View Purchases
                </button>
              </div>

              {/* Following Portfolios */}
              <div className="flex flex-col justify-between gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex justify-between items-baseline pb-2">
                  <h3 className="text-2xl font-bold text-white flex-1">Following Portfolios</h3>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {[
                    { name: 'Crypto Expert', desc: 'High-risk BTC Strategy with sharp swings', growth: '+12.3%', growthColor: 'text-green' },
                    { name: 'Long-Term HODL', desc: 'Steady ETH-focused portfolio for long-term gains', growth: '+4.8%', growthColor: 'text-green' },
                    { name: 'DeFi Radar', desc: 'Yield farming and token rotation', growth: '-2.1%', growthColor: 'text-[#EF454A]' },
                  ].map((portfolio, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 px-4 rounded-2xl border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px]">
                      <div className="flex flex-col gap-1 flex-1">
                        <span className="text-lg font-bold text-white">{portfolio.name}</span>
                        <span className="text-sm font-normal text-white">{portfolio.desc}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold uppercase text-webGray">Growth:</span>
                          <span className={`text-xs font-bold uppercase ${portfolio.growthColor}`}>{portfolio.growth}</span>
                        </div>
                      </div>
                      <svg width="24" height="24" viewBox="0 0 25 25" fill="none">
                        <path d="M9.66797 6.33301L15.668 12.333L9.66797 18.333" stroke="#A06AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center gap-1 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8.33398 10.2771C8.33398 10.0188 8.33398 9.8896 8.3624 9.78368C8.4394 9.4961 8.66407 9.27143 8.95165 9.19443C9.05757 9.16602 9.18673 9.16602 9.44507 9.16602H10.5562C10.8146 9.16602 10.9437 9.16602 11.0497 9.19443C11.3372 9.27143 11.5619 9.4961 11.6389 9.78368C11.6673 9.8896 11.6673 10.0188 11.6673 10.2771V10.8327C11.6673 11.7532 10.9212 12.4993 10.0007 12.4993C9.08015 12.4993 8.33398 11.7532 8.33398 10.8327V10.2771Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.502 10.8333C11.7616 10.7579 12.0561 10.6671 12.4006 10.5608L15.8766 9.48883C17.1138 9.10733 17.7193 8.4425 17.851 7.29148C17.9099 6.77665 17.9394 6.51923 17.898 6.30852C17.7797 5.7072 17.2747 5.21962 16.6017 5.05699C16.3659 5 16.0698 5 15.4776 5H4.52362C3.93148 5 3.63542 5 3.39957 5.05699C2.72657 5.21962 2.22157 5.7072 2.10334 6.30852C2.06191 6.51923 2.09137 6.77665 2.15028 7.29148C2.28202 8.4425 2.88752 9.10733 4.12467 9.48883L7.60062 10.5608C7.94512 10.6671 8.23968 10.7579 8.49932 10.8333" stroke="white" strokeWidth="1.5" />
                    <path d="M2.88569 9.16602L2.72215 10.9763C2.42901 14.2212 2.28243 15.8436 3.22278 16.8798C4.16313 17.916 5.78209 17.916 9.02 17.916H10.98C14.2179 17.916 15.8368 17.916 16.7772 16.8798C17.7176 15.8436 17.571 14.2212 17.2778 10.9763L17.1143 9.16602" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.9173 4.58398L12.8529 4.36323C12.5321 3.26319 12.3717 2.71318 11.9897 2.39858C11.6078 2.08398 11.1006 2.08398 10.0859 2.08398H9.9154C8.90073 2.08398 8.39348 2.08398 8.01156 2.39858C7.62963 2.71318 7.46922 3.26319 7.14838 4.36323L7.08398 4.58398" stroke="white" strokeWidth="1.5" />
                  </svg>
                  View Portfolios
                </button>
              </div>

              {/* Following Group Chats */}
              <div className="flex flex-col gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
                <div className="flex items-center gap-2 pb-2">
                  <h3 className="text-2xl font-bold text-white">Following Group Chats</h3>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  {[
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/a41932045d11fb04b12ef9336587c545788a4897?width=88', name: 'Crypto Basics - Live Q&A', subs: '72 subscribers' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/2fed6ad136bda82afad8c1217f85da48694cef42?width=88', name: 'Macro Outlook 2025', subs: '2,369 subscribers' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/5eb00142623d95405333abe65d6e36c1831036f7?width=88', name: 'Ask Jane: Portfolio Diversification', subs: '86 subscribers' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/128f58d068f62f85b2902e36565aaef59e190b49?width=88', name: 'Fed Policy & Inflation', subs: '823 subscribers' },
                    { image: 'https://api.builder.io/api/v1/image/assets/TEMP/193725c84dab4dcd05d7a90347c68161b6a82c94?width=88', name: 'ETH ETF Approval: What\'s Next?', subs: '72 subscribers' },
                  ].map((chat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={chat.image} alt={chat.name} className="w-11 h-11 rounded-full" />
                      <div className="flex flex-col gap-0.5 flex-1">
                        <span className="text-sm font-bold text-primary">{chat.name}</span>
                        <span className="text-sm font-normal text-webGray">{chat.subs}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center gap-1 h-[26px] px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M17.498 7.49935C16.8354 4.17814 13.7587 1.66602 10.0641 1.66602C5.88595 1.66602 2.49805 4.87869 2.49805 8.84102C2.49805 10.7448 3.27987 12.4747 4.55517 13.7583C4.83596 14.041 5.02342 14.4272 4.94776 14.8246C4.8229 15.4744 4.53993 16.0806 4.12559 16.5858C5.21574 16.7868 6.34927 16.6058 7.32139 16.0933C7.66504 15.9122 7.83685 15.8216 7.9581 15.8032C8.04298 15.7903 8.15354 15.8023 8.33138 15.8328" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.99805 13.5508C9.99805 15.9722 12.0504 17.9355 14.5814 17.9355C14.879 17.9358 15.1757 17.9083 15.468 17.8535C15.6785 17.8139 15.7837 17.7942 15.8571 17.8054C15.9305 17.8166 16.0347 17.872 16.2429 17.9827C16.8317 18.2958 17.5184 18.4064 18.1788 18.2836C17.9278 17.9749 17.7564 17.6045 17.6807 17.2073C17.6349 16.9645 17.7485 16.7285 17.9185 16.5558C18.6911 15.7713 19.1647 14.7142 19.1647 13.5508C19.1647 11.1293 17.1124 9.16602 14.5814 9.16602C12.0504 9.16602 9.99805 11.1293 9.99805 13.5508Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  Show All Groups
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6">
            <div className="container-card p-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-white">Profile Overview</h1>
                <p className="text-sm text-webGray">
                  Manage your personal information, contact details, and account preferences in one place.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Status</p>
                    <p className="mt-2 text-white text-lg font-semibold">Active</p>
                    <p className="mt-1 text-xs text-webGray">Member since January 2024</p>
                  </div>
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Plan</p>
                    <p className="mt-2 text-white text-lg font-semibold">Platinum</p>
                    <p className="mt-1 text-xs text-webGray">Next renewal: 14 Jul 2024</p>
                  </div>
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Security</p>
                    <p className="mt-2 text-white text-lg font-semibold">Two-factor enabled</p>
                    <p className="mt-1 text-xs text-webGray">Last login: 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="container-card p-6">
                <h2 className="text-xl font-semibold text-white">Personal Details</h2>
                <div className="mt-4 flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Full Name</span>
                    <span className="mt-1 font-medium">Devid Stone</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Email</span>
                    <span className="mt-1 font-medium">devid.stone@example.com</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Location</span>
                    <span className="mt-1 font-medium">Warsaw, Poland</span>
                  </div>
                </div>
              </div>

              <div className="container-card p-6">
                <h2 className="text-xl font-semibold text-white">Preferences</h2>
                <div className="mt-4 flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-xs text-webGray mt-1">Receive weekly summaries and announcements.</p>
                    </div>
                    <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold">Enabled</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">AI Recommendations</p>
                      <p className="text-xs text-webGray mt-1">Personalized suggestions for market opportunities.</p>
                    </div>
                    <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold">Enabled</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Two-Factor Auth</p>
                      <p className="text-xs text-webGray mt-1">Secure your account with an extra verification step.</p>
                    </div>
                    <span className="rounded-full bg-green/10 text-green px-3 py-1 text-xs font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Marketplace</h2>
            <p className="mt-2 text-sm text-webGray">Browse and purchase trading tools, indicators, and strategies.</p>
          </div>
        )}

        {activeTab === 'streaming' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Live Streaming</h2>
            <p className="mt-2 text-sm text-webGray">Watch live trading sessions and market analysis.</p>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Social Network</h2>
            <p className="mt-2 text-sm text-webGray">Connect with other traders and share insights.</p>
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Portfolios</h2>
            <p className="mt-2 text-sm text-webGray">Manage and track your investment portfolios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNew;
