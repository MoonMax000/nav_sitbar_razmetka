import { FC } from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ totalPages, currentPage, onChange }) => {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-moonlessNight text-webGray hover:bg-onyxGrey hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
