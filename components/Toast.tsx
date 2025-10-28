import React from 'react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  messages: ToastMessage[];
  removeToast: (id: number) => void;
}

const toastIcons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const toastColors = {
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-primary',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[100] space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-center gap-4 ${toastColors[msg.type]} text-white p-4 rounded-lg shadow-2xl animate-fade-in-up w-auto max-w-sm`}
        >
          <div className="flex-shrink-0">{toastIcons[msg.type]}</div>
          <span className="flex-grow font-medium">{msg.message}</span>
          <button onClick={() => removeToast(msg.id)} className="text-white/80 hover:text-white flex-shrink-0 ml-4">&times;</button>
        </div>
      ))}
    </div>
  );
};