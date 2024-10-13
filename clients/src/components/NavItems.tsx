'use client';

import styles from '@/utils/style';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';
import { CgProfile } from 'react-icons/cg';

const NavItems = ({ isAuthorized }: { isAuthorized: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About us',
      url: '/about',
    },
    {
      title: 'Restaurants',
      url: '/restaurants',
    },
    {
      title: 'Popular Foods',
      url: '/foods',
    },
    {
      title: 'Contact us',
      url: '/contact',
    },
  ];

  const navBarItems = ({ title, url }: { title: string; url: string }) => (
    <Link
      className={`w-full text-white ${pathname === url && 'text-[#2190ffcb]'}`}
      href={url}
      size="lg"
    >
      {title}
    </Link>
  );

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-inherit w-full justify-between"
      classNames={{
        wrapper: 'max-w-full px-[20px]',
        item: 'font-Poppins',
      }}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="lg:hidden"
      />
      <NavbarBrand>
        <h1 className={`${styles.logo}`}>Food Delivery</h1>
      </NavbarBrand>

      <NavbarContent
        className="hidden lg:flex gap-10 justify-between"
        justify="center"
      >
        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} isActive={pathname === item.url}>
            {navBarItems(item)}
          </NavbarItem>
        ))}
      </NavbarContent>
      {/* {!isAuthorized && <RegisterAndLoginSection />} */}
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {navBarItems(item)}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      {isAuthorized ? (
        <ProfileDropDown />
      ) : (
        <NavbarContent justify="end" as="button">
          <CgProfile className="text-[2rem]" />
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default NavItems;
