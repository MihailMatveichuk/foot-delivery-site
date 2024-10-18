import { IRegisterForm, RegisterFormSchema } from '@/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalBody, Input, Button, ModalFooter } from '@nextui-org/react';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegisterModal = ({
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
    formState: { errors, isSubmitting, isValid },
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

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log(data);
    setTimeout(() => {
      alert('Data was saved!!');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <ModalBody>
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
            onClick={() => changeModal(true)}
          >
            I have already signed in
          </p>
          <Button
            className="bg-[#2190ffcb]"
            onPress={isValid ? onClose : () => {}}
            type="submit"
            disabled={isSubmitting}
          >
            Sing In
          </Button>
        </ModalFooter>
      </ModalBody>
    </form>
  );
};

export default RegisterModal;
