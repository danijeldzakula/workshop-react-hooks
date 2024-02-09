import React, { Suspense, lazy } from 'react';
import { useHome } from './Home.hooks';
import Layout from '@/layouts';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import ThemeButton from '@/components/theme-button/theme-button';

const RenderName = lazy(() => import('@/components/memo/render-name'));
const RenderNumber = lazy(() => import('@/components/memo/render-number'));
const RenderBoth = lazy(() => import('@/components/memo/render-both'));
const RenderData = lazy(() => import('@/components/memo/render-data'));
const RenderNotes = lazy(() => import('@/components/memo/render-notes'));

export default function Home() {
  const { width, height } = useWindowDimensions();

  const { names, numbers, setData } = useHome();

  return (
    <Layout className='py-16'>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <div className='container mx-auto'>
            <div className="flex justify-center mb-8">
              <ThemeButton />
            </div>

            <div className='grid grid-cols-2 gap-8'>
              <RenderName setData={setData} />
              <RenderNumber setData={setData} />
              <RenderBoth names={names} numbers={numbers} />
              <RenderData />
            </div>

            <div className='grid'>
              <RenderNotes setData={setData} />
            </div>
          </div>
        </Suspense>
      </section>
    </Layout>
  );
}
