'use client';
import React from 'react';

const Modal = ({
  children,
  isOpen,
  closeModal,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const handleBackgroundClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return isOpen ? (
    <div
      className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'
      onClick={handleBackgroundClick}
    >
      <button
        onClick={closeModal}
        className='absolute top-0 right-0 m-4 text-white hover:text-gray-700 text-lg h-[120px] w-[120px]'
      >
        &times;
      </button>
      <div className='rounded-lg shadow-lg p-6 relative'>{children}</div>
    </div>
  ) : null;
};
export default Modal;
