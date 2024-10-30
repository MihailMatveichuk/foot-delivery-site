'use client';

import { Modal, ModalContent } from '@nextui-org/react';
import { useState } from 'react';

import LoginModal from '@/shared/LoginModal';
import RegisterModal from '@/shared/RegisterModal';
import ActivationModal from '@/shared/ActivationModal';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function AuthScreen({ isOpen, onOpenChange }: Props) {
  const [activeState, setActiveState] = useState('Activation');

  const handleLoginModalOpen = () => {
    onOpenChange();
    setActiveState('Login');
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
              {activeState === 'Login' && (
                <LoginModal
                  changeModalState={setActiveState}
                  onClose={onClose}
                />
              )}
              {activeState === 'Singup' && (
                <RegisterModal changeModalState={setActiveState} />
              )}
              {activeState === 'Activation' && (
                <ActivationModal changeModalState={setActiveState} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
