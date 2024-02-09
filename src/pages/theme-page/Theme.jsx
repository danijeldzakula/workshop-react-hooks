import ThemeButton from "@/components/theme-button/theme-button";
import WindowButton from "@/components/window-button/window-button";
import Layout from "@/layouts";
import { Suspense } from "react";

export default function Theme() {
  return (
    <Layout className='py-16'>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <div className='container mx-auto'>
            <div className="flex justify-center gap-4">
              <ThemeButton />
              <WindowButton />
            </div>
          </div>
        </Suspense>
      </section>
    </Layout>
  )
}
