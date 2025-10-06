import { FC } from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ totalPages, currentPage, onChange }) => {
  const handleFirst = () => onChange(1);
  const handlePrev = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };
  const handleLast = () => onChange(totalPages);

  return (
    <div className="inline-flex items-start gap-1">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-2 rounded border border-[#181B22] bg-[rgba(11,14,17,0.50)] p-2.5 backdrop-blur-[50px] disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0">
          <path d="M14.6585 15L15.8335 13.825L12.0168 10L15.8335 6.175L14.6585 5L9.6585 10L14.6585 15Z" fill="#B0B0B0"/>
          <path d="M9.1668 15L10.3418 13.825L6.52513 10L10.3418 6.175L9.1668 5L4.1668 10L9.1668 15Z" fill="#B0B0B0"/>
        </svg>
      </button>

      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-2 rounded border border-[#181B22] bg-[rgba(11,14,17,0.50)] p-2.5 backdrop-blur-[50px] disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0">
          <path d="M12.575 15L13.75 13.825L9.93333 10L13.75 6.175L12.575 5L7.575 10L12.575 15Z" fill="#B0B0B0"/>
        </svg>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`flex h-11 w-11 flex-col items-center justify-center gap-2.5 rounded p-2 ${
            currentPage === page
              ? 'bg-gradient-to-r from-[#A06AFF] to-[#482090]'
              : 'border border-[#181B22] bg-[rgba(11,14,17,0.50)] backdrop-blur-[50px]'
          }`}
        >
          <div className={`text-center text-[15px] font-bold leading-normal ${
            currentPage === page ? 'text-white' : 'text-[#B0B0B0]'
          }`}>
            {page}
          </div>
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-2 rounded border border-[#181B22] bg-[rgba(11,14,17,0.50)] p-2.5 backdrop-blur-[50px] disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0">
          <path d="M8.675 5L7.5 6.175L11.3167 10L7.5 13.825L8.675 15L13.675 10L8.675 5Z" fill="#B0B0B0"/>
        </svg>
      </button>

      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-2 rounded border border-[#181B22] bg-[rgba(11,14,17,0.50)] p-2.5 backdrop-blur-[50px] disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0">
          <path d="M5.3415 5L4.1665 6.175L7.98317 10L4.1665 13.825L5.3415 15L10.3415 10L5.3415 5Z" fill="#B0B0B0"/>
          <path d="M10.8332 5L9.6582 6.175L13.4749 10L9.6582 13.825L10.8332 15L15.8332 10L10.8332 5Z" fill="#B0B0B0"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
