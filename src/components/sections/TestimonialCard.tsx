import { Testimonial } from '@/types';
import { Card } from '@/components/ui/Card';
import { StarRating } from './StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col">
      {testimonial.rating && (
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
      )}

      <p className="mb-6 flex-1 text-gray-600 dark:text-gray-300">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </Card>
  );
}
