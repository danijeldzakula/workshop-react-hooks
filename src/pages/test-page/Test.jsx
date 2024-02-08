import React, { Suspense, lazy } from 'react';
import { useTest } from './Test.hooks';
import { useApp } from '@/context/useApp';
import { Navigate } from 'react-router-dom';
import { REDIRECT_TO } from '@/helpers/constant';

const RenderName = lazy(() => import('@/components/memo/render-name'));
const RenderNumber = lazy(() => import('@/components/memo/render-number'));
const RenderBoth = lazy(() => import('@/components/memo/render-both'));
const RenderNotes = lazy(() => import('@/components/memo/render-notes'));
const RenderData = lazy(() => import('@/components/memo/render-data'));
const RenderLazy = lazy(() => import('@/components/memo/render-lazy'));

export default function Test() {
  const { loggedIn } = useApp();
  const { names, numbers, setData } = useTest();

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <main>
      <section className="section__test">
        <div>
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
    </main>
  );
}
