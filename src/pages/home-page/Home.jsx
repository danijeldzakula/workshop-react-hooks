import React, { Suspense, lazy } from 'react';
import { useHome } from './Home.hooks';
import Layout from '@/layouts';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const RenderName = lazy(() => import('@/components/memo/render-name'));
const RenderNumber = lazy(() => import('@/components/memo/render-number'));
const RenderBoth = lazy(() => import('@/components/memo/render-both'));
const RenderNotes = lazy(() => import('@/components/memo/render-notes'));
const RenderData = lazy(() => import('@/components/memo/render-data'));
const RenderLazy = lazy(() => import('@/components/memo/render-lazy'));

export default function Test() {
  const { width, height } = useWindowDimensions();
  const { names, numbers, setData } = useHome();

  return (
    <Layout>
      <section className="section__test">
        <div>
          <h1 className='text-3xl font-bold underline'>SASS</h1>
          <Suspense fallback={false}>
            <RenderName setData={setData} />
            <RenderNumber setData={setData} />
            <RenderBoth names={names} numbers={numbers} />
            <RenderNotes setData={setData} />
            <RenderData />
            <RenderLazy />
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}
