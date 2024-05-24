'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import Hero from './hero';

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
      <Hero />
    </main>
  );
}
