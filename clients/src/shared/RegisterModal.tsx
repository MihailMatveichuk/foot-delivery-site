import { IRegisterForm, RegisterFormSchema } from '@/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ModalBody,
  Input,
  Button,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@nextui-org/react';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import register from '@/app/routes/register.route';
import styles from '@/utils/style';

const RegisterModal = ({
  changeModalState,
}: {
  changeModalState: Dispatch<SetStateAction<string>>;
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
      email: '',
      phone_number: '',
      address: '',
    },
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      setLoading(true);
      const { activationToken } = await register({
        email: data.email,
        password: data.password,
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
      });

      localStorage.setItem('activation_token', activationToken.token);

      setError('');

      changeModalState('Activation');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <ModalHeader className="flex flex-col gap-1">Sing Up</ModalHeader>
      <ModalBody>
        {error && <p className="text-red-500">This user is already exists</p>}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-[10px]">{errors.name.message}</p>
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
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Phone number"
              placeholder="Enter your phone number"
              variant="bordered"
              type="tel"
            />
          )}
        />
        {errors.phone_number && (
          <p className="text-red-500 text-[10px]">
            {errors.phone_number.message}
          </p>
        )}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Address"
              placeholder="Enter your address"
              variant="bordered"
            />
          )}
        />
        {errors.address && (
          <p className="text-red-500 text-[10px]">{errors.address.message}</p>
        )}
        <ModalFooter className="flex flex-col px-0 gap-4">
          <p
            className="text-center font-Poppins font-[500] text-[12px] text-[#2190ffcb] cursor-pointer hover:text-[#2190fff6] transform transition-all duration-300"
            onClick={() => changeModalState('Login')}
          >
            I have already signed in
          </p>
          <Button
            className={`${styles.button} ${
              isLoading && 'cursor-not-allowed bg-[#2190ff9d]'
            }`}
            type="submit"
            disabled={isSubmitting && isLoading}
          >
            {isLoading ? <Spinner size="md" /> : 'Sign Up'}
          </Button>
        </ModalFooter>
      </ModalBody>
    </form>
  );
};

export default RegisterModal;
