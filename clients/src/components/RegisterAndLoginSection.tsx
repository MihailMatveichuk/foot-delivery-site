import styles from '@/utils/style';
import { NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const RegisterAndLoginSection = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden sm:flex">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} className={styles.button} href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default RegisterAndLoginSection;
