import { FC, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col md:flex-row max-w-4xl w-full rounded-[25px] overflow-hidden shadow-2xl shadow-primary/10">
        {/* Left Panel - Auth Form */}
        <div className="w-full md:w-[393px] flex flex-col items-center justify-center p-6 md:p-8 md:rounded-l-[25px] bg-[rgba(12,16,20,0.8)] backdrop-blur-[50px] border border-[#181B22] relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-600/20 opacity-50 pointer-events-none" />

          {/* Mobile logo preview */}
          <div className="md:hidden mb-6 relative z-10">
            <div className={cn('logo-anim-unit', currentLogoEffect)}>
              <svg width="80" height="92" viewBox="0 0 113 128" fill="none" className="logo-svg">
                <g clipPath="url(#clip0_logo_mobile)">
                  <path
                    className="logo-shape"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.748047 63.9619L0.753226 64.3533C13.1061 61.8201 25.5249 59.1745 37.9666 56.5237L37.9895 119.407L79.8468 128C79.8468 114.191 79.7174 75.2902 79.8542 61.485L50.5652 55.4724L46.667 54.6726C68.5682 50.0183 90.5085 45.4255 112.252 41.4711L112.245 0C75.4715 7.54699 37.6389 16.4678 0.748047 22.8836L0.748047 63.9619Z"
                    fill="url(#paint0_linear_logo_mobile)"
                  />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_logo_mobile" x1="27.8276" y1="137.6" x2="75.9893" y2="8.13923" gradientUnits="userSpaceOnUse">
                    <stop className="logo-stop-primary" stopColor="#181A20" />
                    <stop className="logo-stop-accent" offset="1" stopColor="#A06AFF" />
                  </linearGradient>
                  <clipPath id="clip0_logo_mobile">
                    <rect width="111.504" height="128" fill="white" transform="translate(0.748047)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="w-full max-w-[341px] flex flex-col gap-4 relative z-10">
            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Sign In
            </h2>

            {/* Auth Method Toggle & QR Button */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 p-1 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] shadow-lg shadow-black/20">
                <button
                  onClick={() => setAuthMethod('phone')}
                  className={cn(
                    'flex items-center justify-center h-8 px-4 rounded-[32px] text-[15px] font-bold transition-all duration-300',
                    authMethod === 'phone'
                      ? 'border border-[#181B22] bg-[rgba(12,16,20,0.5)] text-white shadow-md'
                      : 'text-white hover:text-primary'
                  )}
                >
                  Phone
                </button>
                <button
                  onClick={() => setAuthMethod('email')}
                  className={cn(
                    'flex items-center justify-center h-8 px-4 rounded-[32px] text-[15px] font-bold transition-all duration-300',
                    authMethod === 'email'
                      ? 'bg-gradient-to-r from-primary to-[#482090] text-white shadow-lg shadow-primary/30'
                      : 'text-white hover:text-primary'
                  )}
                >
                  Email
                </button>
              </div>

              <button className="flex items-center justify-center w-[26px] h-[26px] rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:border-primary hover:bg-[rgba(12,16,20,0.7)] transition-all duration-300 hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4C2 3.05719 2 2.58579 2.29289 2.29289C2.58579 2 3.05719 2 4 2C4.94281 2 5.41421 2 5.70711 2.29289C6 2.58579 6 3.05719 6 4C6 4.94281 6 5.41421 5.70711 5.70711C5.41421 6 4.94281 6 4 6C3.05719 6 2.58579 6 2.29289 5.70711C2 5.41421 2 4.94281 2 4Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M2 12C2 11.0572 2 10.5858 2.29289 10.2929C2.58579 10 3.05719 10 4 10C4.94281 10 5.41421 10 5.70711 10.2929C6 10.5858 6 11.0572 6 12C6 12.9428 6 13.4142 5.70711 13.7071C5.41421 14 4.94281 14 4 14C3.05719 14 2.58579 14 2.29289 13.7071C2 13.4142 2 12.9428 2 12Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M2 8H6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V5.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4C10 3.05719 10 2.58579 10.2929 2.29289C10.5858 2 11.0572 2 12 2C12.9428 2 13.4142 2 13.7071 2.29289C14 2.58579 14 3.05719 14 4C14 4.94281 14 5.41421 13.7071 5.70711C13.4142 6 12.9428 6 12 6C11.0572 6 10.5858 6 10.2929 5.70711C10 5.41421 10 4.94281 10 4Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M14 8H10C9.0572 8 8.5858 8 8.29287 8.29287C8 8.5858 8 9.0572 8 10M8 11.8461V13.6923M10 10V11C10 11.9643 10.5225 12 11.3333 12C11.7015 12 12 12.2985 12 12.6667M10.6667 14H10M12 10C12.9428 10 13.4142 10 13.7071 10.2933C14 10.5866 14 11.0587 14 12.0029C14 12.9471 14 13.4191 13.7071 13.7125C13.4933 13.9265 13.1845 13.9844 12.6667 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-6">
              {/* Email/Phone Input */}
              <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20 transition-all duration-300 hover:border-primary/50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-colors duration-300 group-focus-within:text-primary">
                  <path d="M1.66675 5L7.4276 8.26414C9.55141 9.4675 10.4487 9.4675 12.5726 8.26414L18.3334 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M1.67989 11.2296C1.73436 13.7843 1.76161 15.0615 2.70421 16.0078C3.64681 16.954 4.95869 16.9869 7.58244 17.0528C9.1995 17.0935 10.8007 17.0935 12.4177 17.0528C15.0415 16.9869 16.3533 16.954 17.296 16.0078C18.2386 15.0615 18.2658 13.7843 18.3202 11.2296C18.3378 10.4082 18.3378 9.59171 18.3202 8.77029C18.2658 6.21568 18.2386 4.93837 17.296 3.99218C16.3533 3.04599 15.0415 3.01303 12.4177 2.9471C10.8007 2.90647 9.1995 2.90647 7.58243 2.94709C4.95869 3.01301 3.64681 3.04597 2.70421 3.99217C1.7616 4.93836 1.73436 6.21567 1.67988 8.77029C1.66236 9.59171 1.66237 10.4082 1.67989 11.2296Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Email/Subaccount"
                  className="flex-1 bg-transparent text-[15px] text-white placeholder:text-webGray outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center justify-between gap-2 h-11 px-3 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.9166 12.0834C15.678 12.0834 17.9166 9.84479 17.9166 7.08337C17.9166 4.32195 15.678 2.08337 12.9166 2.08337C10.1552 2.08337 7.91659 4.32195 7.91659 7.08337C7.91659 7.81705 8.0746 8.51379 8.3585 9.14146L2.08325 15.4167V17.9167H4.58325V16.25H6.24992V14.5834H7.91659L10.8585 11.6415C11.4862 11.9254 12.1829 12.0834 12.9166 12.0834Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5833 5.41663L13.75 6.24996" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-[15px] text-white placeholder:text-webGray outline-none"
                  />
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="#B0B0B0" strokeWidth="1.5"/>
                  <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#B0B0B0" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Sign In Button & Forgot Password */}
              <div className="flex flex-col items-center gap-2">
                <button className="relative w-full h-11 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#482090] text-[15px] font-bold text-white transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#482090] to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button className="text-[15px] text-primary hover:underline transition-all duration-300 hover:text-purple-400">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex items-center justify-center gap-6 mt-2">
              <button className="flex items-center justify-center w-11 h-11 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-110 active:scale-95 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_google)">
                    <path d="M12.4998 9.81812V14.4654H18.9579C18.6743 15.9599 17.8233 17.2254 16.547 18.0763L20.4415 21.0982C22.7106 19.0037 24.0197 15.9273 24.0197 12.2728C24.0197 11.4219 23.9433 10.6036 23.8015 9.81825L12.4998 9.81812Z" fill="#4285F4"/>
                    <path d="M5.77461 14.2839L4.89625 14.9563L1.78711 17.3781C3.76165 21.2944 7.80862 23.9999 12.4995 23.9999C15.7394 23.9999 18.4557 22.9308 20.4412 21.0981L16.5467 18.0763C15.4776 18.7963 14.114 19.2327 12.4995 19.2327C9.37951 19.2327 6.72868 17.1273 5.77952 14.2909L5.77461 14.2839Z" fill="#34A853"/>
                    <path d="M1.78718 6.62183C0.969042 8.23631 0.5 10.0581 0.5 11.9999C0.5 13.9417 0.969042 15.7636 1.78718 17.378C1.78718 17.3889 5.77997 14.2799 5.77997 14.2799C5.53998 13.5599 5.39812 12.7963 5.39812 11.9998C5.39812 11.2033 5.53998 10.4398 5.77997 9.71976L1.78718 6.62183Z" fill="#FBBC05"/>
                    <path d="M12.4997 4.77818C14.267 4.77818 15.8379 5.38907 17.0925 6.56727L20.5288 3.13095C18.4452 1.18917 15.7398 0 12.4997 0C7.80887 0 3.76165 2.69454 1.78711 6.62183L5.77978 9.72001C6.72882 6.88362 9.37976 4.77818 12.4997 4.77818Z" fill="#EA4335"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_google">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <button className="flex items-center justify-center w-11 h-11 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-110 active:scale-95 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_apple)">
                    <path d="M22.292 18.7035C21.929 19.542 21.4994 20.3139 21.0016 21.0235C20.3231 21.9908 19.7676 22.6605 19.3395 23.0323C18.6758 23.6426 17.9647 23.9552 17.2032 23.973C16.6566 23.973 15.9973 23.8175 15.23 23.5019C14.4601 23.1878 13.7525 23.0323 13.1056 23.0323C12.4271 23.0323 11.6994 23.1878 10.9211 23.5019C10.1415 23.8175 9.51355 23.9819 9.03342 23.9982C8.30322 24.0293 7.57539 23.7078 6.8489 23.0323C6.38521 22.6279 5.80523 21.9345 5.11043 20.9524C4.36498 19.9035 3.75211 18.6872 3.27198 17.3006C2.75777 15.8029 2.5 14.3526 2.5 12.9484C2.5 11.3401 2.84754 9.95284 3.54367 8.79035C4.09076 7.8566 4.81859 7.12003 5.72953 6.57931C6.64046 6.03858 7.62473 5.76304 8.68469 5.74541C9.26467 5.74541 10.0252 5.92481 10.9704 6.27739C11.9129 6.63116 12.5181 6.81056 12.7834 6.81056C12.9817 6.81056 13.654 6.60079 14.7937 6.18258C15.8714 5.79474 16.781 5.63415 17.5262 5.69741C19.5454 5.86037 21.0624 6.65634 22.0712 8.09037C20.2654 9.18456 19.3721 10.7171 19.3898 12.6831C19.4061 14.2145 19.9617 15.4888 21.0535 16.5006C21.5483 16.9703 22.1009 17.3332 22.7156 17.591C22.5823 17.9776 22.4416 18.348 22.292 18.7035ZM17.661 0.480381C17.661 1.68066 17.2225 2.80135 16.3484 3.83865C15.2937 5.0718 14.0179 5.78437 12.6343 5.67193C12.6167 5.52793 12.6065 5.37638 12.6065 5.21713C12.6065 4.06487 13.1081 2.83172 13.9989 1.82345C14.4436 1.31295 15.0092 0.888472 15.6951 0.54986C16.3796 0.216299 17.0269 0.0318332 17.6358 0.000244141C17.6536 0.160702 17.661 0.32117 17.661 0.480365V0.480381Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_apple">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <button className="flex items-center justify-center w-11 h-11 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] hover:border-[#2AABEE] hover:shadow-lg hover:shadow-[#2AABEE]/30 hover:scale-110 active:scale-95 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_telegram)">
                    <path d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z" fill="url(#paint0_linear_telegram)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.93177 11.8734C9.43001 10.3493 11.7627 9.34452 12.9299 8.85905C16.2624 7.47294 16.9549 7.23216 17.4062 7.22421C17.5055 7.22246 17.7275 7.24706 17.8712 7.36372C17.9926 7.46223 18.026 7.5953 18.042 7.6887C18.058 7.78209 18.0779 7.99485 18.0621 8.1611C17.8815 10.0586 17.1001 14.6633 16.7026 16.7885C16.5343 17.6877 16.2031 17.9892 15.8825 18.0188C15.1856 18.0829 14.6564 17.5582 13.9815 17.1158C12.9253 16.4235 12.3287 15.9925 11.3035 15.3169C10.1187 14.5362 10.8868 14.107 11.562 13.4058C11.7387 13.2222 14.8091 10.4295 14.8685 10.1761C14.8759 10.1444 14.8828 10.0263 14.8126 9.96397C14.7425 9.9016 14.6389 9.92293 14.5642 9.93989C14.4583 9.96393 12.771 11.0791 9.50252 13.2855C9.02361 13.6143 8.58982 13.7745 8.20117 13.7662C7.7727 13.7569 6.94851 13.5239 6.33582 13.3247C5.58431 13.0804 4.98704 12.9513 5.03905 12.5364C5.06614 12.3203 5.36371 12.0993 5.93177 11.8734Z" fill="white"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_telegram" x1="12.5" y1="0" x2="12.5" y2="23.822" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2AABEE"/>
                      <stop offset="1" stopColor="#229ED9"/>
                    </linearGradient>
                    <clipPath id="clip0_telegram">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <button className="flex items-center justify-center w-11 h-11 rounded-full border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] hover:border-white hover:shadow-lg hover:shadow-white/30 hover:scale-110 active:scale-95 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M18.8263 1.90381H22.1998L14.8297 10.3273L23.5 21.7898H16.7112L11.394 14.8378L5.30995 21.7898H1.93443L9.81743 12.7799L1.5 1.90381H8.46111L13.2674 8.25814L18.8263 1.90381ZM17.6423 19.7706H19.5116L7.44539 3.81694H5.43946L17.6423 19.7706Z" fill="white"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#482090] to-primary" />
              <span className="text-[15px] font-bold text-webGray">or</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary via-[#482090] to-transparent" />
            </div>

            {/* Email Button */}
            <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#181B22] bg-[rgba(11,14,17,0.5)] backdrop-blur-[50px] hover:bg-[rgba(11,14,17,0.7)] hover:border-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1.66675 5L7.4276 8.26414C9.55141 9.4675 10.4487 9.4675 12.5726 8.26414L18.3334 5" stroke="#B0B0B0" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M1.67989 11.2297C1.73436 13.7844 1.76161 15.0617 2.70421 16.0079C3.64681 16.9541 4.95869 16.987 7.58244 17.0529C9.1995 17.0936 10.8007 17.0936 12.4177 17.0529C15.0415 16.987 16.3533 16.9541 17.296 16.0079C18.2386 15.0617 18.2658 13.7844 18.3202 11.2297C18.3378 10.4083 18.3378 9.59183 18.3202 8.77042C18.2658 6.2158 18.2386 4.93849 17.296 3.9923C16.3533 3.04611 15.0415 3.01315 12.4177 2.94722C10.8007 2.90659 9.1995 2.90659 7.58243 2.94722C4.95869 3.01313 3.64681 3.04609 2.70421 3.99229C1.7616 4.93848 1.73436 6.21579 1.67988 8.77042C1.66236 9.59183 1.66237 10.4083 1.67989 11.2297Z" stroke="#B0B0B0" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span className="text-[15px] font-bold text-white">Email</span>
            </button>

            {/* Create Account Link */}
            <p className="text-center text-[15px] mt-2">
              <span className="text-webGray">New here? </span>
              <button className="text-primary underline hover:no-underline hover:text-purple-400 transition-colors duration-300">
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Right Panel - Branding (hidden on mobile) */}
        <div className="hidden md:flex w-[393px] flex-col items-center justify-center gap-12 p-8 rounded-r-[25px] bg-[rgba(11,14,17,0.72)] backdrop-blur-[50px] relative overflow-hidden">
          {/* Desktop logo showcase */}
          <div className="relative z-10">
            <div className={cn('logo-anim-unit', currentLogoEffect)}>
              <svg width="112" height="128" viewBox="0 0 113 128" fill="none" className="logo-svg">
                <g clipPath="url(#clip0_logo)">
                  <path
                    className="logo-shape"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.748047 63.9619L0.753226 64.3533C13.1061 61.8201 25.5249 59.1745 37.9666 56.5237L37.9895 119.407L79.8468 128C79.8468 114.191 79.7174 75.2902 79.8542 61.485L50.5652 55.4724L46.667 54.6726C68.5682 50.0183 90.5085 45.4255 112.252 41.4711L112.245 0C75.4715 7.54699 37.6389 16.4678 0.748047 22.8836L0.748047 63.9619Z"
                    fill="url(#paint0_linear_logo)"
                  />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_logo" x1="27.8276" y1="137.6" x2="75.9893" y2="8.13923" gradientUnits="userSpaceOnUse">
                    <stop className="logo-stop-primary" stopColor="#181A20" />
                    <stop className="logo-stop-accent" offset="1" stopColor="#A06AFF" />
                  </linearGradient>
                  <clipPath id="clip0_logo">
                    <rect width="111.504" height="128" fill="white" transform="translate(0.748047)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center relative z-10">
            <h3 className="text-2xl font-bold text-white max-w-[318px]">
              Join One and Only Ecosystem for Trading
            </h3>
            <p className="text-[15px] text-webGray">
              We shape the next generation of successful trading for everyone. We invite you to be a part of this journey with us. Let's empower everyone to succeed one lesson, one trade, one success story of their life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
