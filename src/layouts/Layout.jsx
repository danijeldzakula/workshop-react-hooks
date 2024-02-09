import Header from '@/components/header/header';
import { ToastContainer } from 'react-toastify';

export default function Layout({ className, children }) {
  return (
    <div className="app">
      <Header />
      <main className={className}>{children}</main>
      <ToastContainer />
    </div>
  );
}
