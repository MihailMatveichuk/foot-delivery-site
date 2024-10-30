'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button, ModalBody, Spinner } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

import activationService from '@/app/routes/activationUser.route';

import styles from '@/utils/style';

type VerifyNumber = {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
};

const ActivationModal = ({
  changeModalState,
}: {
  changeModalState: Dispatch<SetStateAction<string>>;
}) => {
  const [invalidError, setInvalidError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: '',
    1: '',
    2: '',
    3: '',
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join('');
    const activationToken = localStorage.getItem('activation_token');
    if (verificationNumber.length !== 4) {
      toast.error('Please enter a valid verification code!');
      setInvalidError(true);
      return;
    } else {
      setLoading(true);
      const data = {
        activationToken,
        activationCode: verificationNumber,
      };

      try {
        await activationService(data);
        localStorage.removeItem('activation_token');
        toast.success('Account activated successfully!');
        setTimeout(() => {
          changeModalState('Login');
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setInvalidError(true);
          toast.error('Invalid activation code!');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value.slice(0, 1) };
    setVerifyNumber(newVerifyNumber);

    if (value === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <ModalBody>
      <Toaster />
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[70px] aspect-square rounded-full bg-[#497DF2] flex items-center justify-center flex-shrink-0">
          <VscWorkspaceTrusted size={30} />
        </div>
      </div>
      <br />
      <div className="m-full flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[50px] aspect-square bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError ? 'shake border-red-500' : 'border-white'
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center h-[50px]">
        <Button
          className={`${styles.button} ${
            isLoading && 'cursor-not-allowed bg-[#2190ff9d]'
          }`}
          disabled={isLoading}
          onClick={verificationHandler}
        >
          {isLoading ? <Spinner size="md" /> : 'Verify OTP'}
        </Button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
        Go back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => changeModalState('Login')}
        >
          Sign in
        </span>
      </h5>
    </ModalBody>
  );
};

export default ActivationModal;
