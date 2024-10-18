import { ModalBody, Input, Button, ModalFooter } from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { ILoginForm, loginFormSchema } from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';

const LoginModal = ({
  changeModal,
  onClose,
}: {
  changeModal: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    console.log(isSubmitted);
    setTimeout(() => {
      alert('Data was saved!!');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <ModalBody>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              type="email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-[10px]">{errors.email.message}</p>
        )}
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                placeholder="Enter your password"
                variant="bordered"
                type={isShowPassword ? 'text' : 'password'}
              />
            )}
          />
          {!isShowPassword ? (
            <AiOutlineEyeInvisible
              size={20}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setIsShowPassword(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setIsShowPassword(false)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500 text-[10px]">{errors.password.message}</p>
        )}
        <div className="flex justify-end  w-full">
          <p
            className="font-Poppins font-[500] text-[12px] text-[#2190ffcb] cursor-pointer hover:text-[#2190fff6] transform transition-all duration-300"
            onClick={() => changeModal(false)}
          >
            Forgot Password
          </p>
        </div>

        <ModalFooter className="flex  flex-col px-0 gap-4">
          <Button
            className="bg-[#2190ffcb]"
            onPress={isValid ? onClose : () => {}}
            type="submit"
            disabled={isSubmitting}
          >
            Sing In
          </Button>
        </ModalFooter>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-center font-Poppins font-[500] text-[12px] text-[#2190ffcb] cursor-pointer">
            Or join us
          </p>
          <div className="flex justify-center gap-4">
            <FcGoogle size={20} className="cursor-pointer" />
            <AiFillGithub size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-center items-center mb-4">
          <p
            className="text-center font-Poppins font-[500] text-[10px]"
            onClick={() => changeModal(false)}
          >
            Have you already had an account?{' '}
            <span className="text-[#2190ffcb] text-[12px] cursor-pointer hover:text-[#2190fff6] transition-all duration-300">
              Sing Up
            </span>
          </p>
        </div>
      </ModalBody>
    </form>
  );
};

export default LoginModal;
