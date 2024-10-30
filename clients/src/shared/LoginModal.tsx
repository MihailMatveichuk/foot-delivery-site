import {
  ModalBody,
  Input,
  Button,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@nextui-org/react';
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
import { setCookie } from 'cookies-next';

import login from '@/app/routes/login.route';
import styles from '@/utils/style';

const LoginModal = ({
  changeModalState,
  onClose,
}: {
  changeModalState: Dispatch<SetStateAction<string>>;
  onClose: () => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setLoading(true);
      const { access_token, refresh_token, user } = await login({
        email: data.email,
        password: data.password,
      });

      console.log(user);

      setCookie('access_token', access_token);
      setCookie('refresh_token', refresh_token);
      setError('');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError('Invalid login credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
      <ModalBody>
        {error && <p className="text-red-500">{error}</p>}
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
            onClick={() => changeModalState('Singup')}
          >
            Forgot Password
          </p>
        </div>

        <ModalFooter className="flex  flex-col px-0 gap-4">
          <Button
            className={`${styles.button} ${
              isLoading && 'cursor-not-allowed bg-[#2190ff9d]'
            }`}
            type="submit"
            disabled={isSubmitting && isLoading}
          >
            {isLoading ? <Spinner size="md" /> : 'Login'}
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
            onClick={() => changeModalState('Singup')}
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
