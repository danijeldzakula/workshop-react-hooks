import { ToastContainer } from 'react-toastify';

export default function Layout({ children, pathname }) {
  return (
    <div className="app">
      <main>{children}</main>
      <ToastContainer />
    </div>
  );
}
