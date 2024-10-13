import {
  ModalBody,
  Input,
  Checkbox,
  Button,
  ModalFooter,
} from '@nextui-org/react';

import React, { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface ILoginData {
  password: string;
  email: string;
}

const LoginModal = ({
  changeModal,
  onClose,
}: {
  changeModal: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    console.log(data);
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
        <div className="flex justify-between items-center">
          <p
            className="text-center font-Poppins font-[500] text-[12px] text-[#2190ffcb] cursor-pointer hover:text-[#2190fff6] transform transition-all duration-300"
            onClick={() => changeModal(false)}
          >
            Register now!
          </p>
        </div>
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

export default LoginModal;
