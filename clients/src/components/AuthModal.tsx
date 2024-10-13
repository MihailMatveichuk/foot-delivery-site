'use client';

import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

import LoginModal from '@/shared/LoginModal';
import RegisterModal from '@/shared/RegisterModal';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function AuthModal({ isOpen, onOpenChange }: Props) {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginModalOpen = () => {
    onOpenChange();
    setIsLogin(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleLoginModalOpen}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {!isLogin ? 'Sign up' : 'Log in'}
              </ModalHeader>
              {isLogin ? (
                <LoginModal changeModal={setIsLogin} onClose={onClose} />
              ) : (
                <RegisterModal changeModal={setIsLogin} onClose={onClose} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
