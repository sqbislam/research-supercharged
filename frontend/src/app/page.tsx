'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import UnderlineLink from '@/components/links/UnderlineLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Research Supercharged</title>
      </Head>
      <section>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://saqib-islam.com'>
              Saqib Islam
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
