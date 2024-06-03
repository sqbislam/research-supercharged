'use client';
import { Blocks, Lightbulb, School } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import heroImage from '../../public/images/hero.png';
export default function Hero() {
  return (
    <section className='pb-[100px] pt-[50px]'>
      <div className='layout flex flex-col mt-[80px]'>
        <div className='flex flex-col md:grid md:grid-cols-2'>
          <div>
            <p className='text-xs md:text-sm text-muted mb-1'>
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
        <div className='mt-[80px] flex flex-col items-center '>
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
        <div className='grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-5 min-h-[100px] w-full mt-10 mb-[100px]'>
          <Card className='flex flex-col gap-2 h-full p-5'>
            <School size={80} />
            <h5 className='text-xl font-bold my-5 '>Smart Article Search</h5>
            <p className='text-muted'>
              Effortlessly find the most relevant articles and research papers
              with IntelliResearch's advanced AI search functionality
            </p>
          </Card>
          <Card className='flex flex-col h-full p-5'>
            <Blocks size={80} />
            <h5 className='text-xl font-bold  my-5'> Project Management</h5>
            <p className='text-muted'>
              Organize your research projects effortlessly with
              IntelliResearch's robust project management tools. Create, manage,
              and track multiple projects, keeping all your articles, and
              citations in one place.
            </p>
          </Card>
          <Card className='flex flex-col h-full p-5'>
            <Lightbulb size={80} />
            <h5 className='text-xl font-bold  my-5'>
              Summarization and Insights
            </h5>
            <p className='text-muted'>
              Generate concise and insightful summaries of your articles with
              IntelliResearch's AI-powered summarization tool. Extract key
              information and insights quickly, enabling you to understand and
              utilize your research material more effectively.
            </p>
          </Card>
        </div>

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
        </div>
      </div>
    </section>
  );
}
