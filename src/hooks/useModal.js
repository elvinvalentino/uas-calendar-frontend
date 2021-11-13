import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
