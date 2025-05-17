import type { JSX } from 'react';
import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
  autoClose: 1800,
  position: 'top-right',
  theme: 'dark',
  style: {
    background: '#231F20',
  },
  // icon: false,
  hideProgressBar: false,
};

export const toaster = (
  type: 'info' | 'success' | 'error',
  message: string | JSX.Element
) => {
  const notify = () => toast[type](message, toastOptions);
  notify();
};
