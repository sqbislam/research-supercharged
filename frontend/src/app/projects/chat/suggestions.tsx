import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dispatch } from 'react';

const suggestionsSample = [
  'What is the main idea of the article?',
  'What are the key points of the article?',
  'What are the datasets used in the article? Describe them?',
  'What are the methods used in the article?',
  'What are the results of the article?',
];
export default function Suggestions({
  suggestions = suggestionsSample,
  setMessage,
}: {
  setMessage: Dispatch<any>;
  suggestions?: string[];
}) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-[90%] mx-auto mb-2'
    >
      <CarouselContent>
        {suggestions.map((suggestion, index) => (
          <CarouselItem
            key={index}
            onClick={() => setMessage(suggestion)}
            className='flex items-center justify-center md:basis-1/2 lg:basis-1/3'
          >
            <Card>
              <CardContent className='p-3 hover:bg-secondary/60'>
                <span className='text-sm font-semibold select-none '>
                  {suggestion}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
