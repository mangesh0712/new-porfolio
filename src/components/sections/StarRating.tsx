import { FiStar } from 'react-icons/fi';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <FiStar
          key={i}
          size={18}
          className="fill-cyan-500 text-cyan-500"
        />
      ))}
    </div>
  );
}
