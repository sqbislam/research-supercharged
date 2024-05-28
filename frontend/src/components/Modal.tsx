'use client';
import React from 'react';

import { useModal } from '@/providers/modal-provider';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeModal } = useModal();
  const handleBackgroundClick = (event: any) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50'
      onClick={handleBackgroundClick}
    >
      <button
        onClick={closeModal}
        className='absolute top-0 right-0 m-4 text-white hover:text-gray-700 text-lg h-[120px] w-[120px]'
      >
        &times;
      </button>
      <div className='bg-white rounded-lg shadow-lg p-6 relative'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
