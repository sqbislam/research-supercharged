'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import heroImage from '../../public/images/hero.png';
export default function Hero() {
  return (
    <section>
      <div className='layout flex flex-col mt-[100px]'>
        <div className='grid grid-cols-2'>
          <div>
            <p className='text-xs md:text-sm text-muted mb-5'>
              IntelliResearch: Intelligent Research Assistant and Manager
            </p>
            <h5 className='font-bold text-6xl'>
              Empowering Intelligent Research
            </h5>
          </div>
          <div>
            <Image
              width={600}
              height={600}
              priority
              title='Brand Image'
              src={heroImage}
              alt='Brand Image'
            />
          </div>
        </div>
        <div className='mt-[100px] flex flex-col items-center '>
          <p className='mb-5 text-center text-lg'>
            Experience the future of research today with IntelliResearch. Start
            your free trial now and discover how our intelligent AI can
            transform your research workflow, enhance productivity, and help you
            achieve your academic and professional goals. Don’t just manage your
            research—excel with IntelliResearch!
          </p>
          <Link href='/projects/list'>
            <Button className='mt-4 bg-teal-500' variant='secondary'>
              Get Started
            </Button>
          </Link>
        </div>
        {/* 
        <div>
          Welcome to IntelliResearch, the ultimate AI-powered research assistant
          and manager designed to streamline your academic and professional
          research endeavors. IntelliResearch empowers you to effortlessly
          search for articles, create and manage projects, and generate concise
          summaries. Engage in insightful chats with your articles, store them
          efficiently, and seamlessly export citations. With IntelliResearch,
          your research process becomes more organized, productive, and
          intelligent. Whether you’re a student, academic, or professional
          researcher, IntelliResearch is your partner in achieving research
          excellence with ease and precision.
        </div> */}
      </div>
    </section>
  );
}
