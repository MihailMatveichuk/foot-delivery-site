import { ModalBody, Input, Button, ModalFooter } from '@nextui-org/react';

import React, { Dispatch, SetStateAction } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface IRegisterData {
  name: string;
  password: string;
  email: string;
  phone_number: string;
  address: string;
}

const RegisterModal = ({
  changeModal,
  onClose,
}: {
  changeModal: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      password: '',
      email: '',
      phone_number: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<IRegisterData> = (data) => {
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
              autoFocus
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              type="password"
            />
          )}
        />
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

        <p
          className="text-center mt-2 font-Poppins font-[500] text-[14px] text-[#2190ffcb] cursor-pointer hover:text-[#2190fff6] transform transition-all duration-300"
          onClick={() => changeModal(true)}
        >
          I have already signed in
        </p>
        <ModalFooter className="flex justify-end px-0 gap-4">
          <Button color="danger" onPress={onClose} type="reset">
            Close
          </Button>
          <Button className="bg-[#2190ffcb]" onPress={onClose} type="submit">
            Sing In
          </Button>
        </ModalFooter>
      </ModalBody>
    </form>
  );
};

export default RegisterModal;
