import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import React from 'react';

const ProfileDropDown = () => {
  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            isBordered
            className="transition-transform"
            color="primary"
            name="Jason Hughes"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="font-Poppins"
        >
          <DropdownItem key="info" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="profile">My Profile</DropdownItem>
          <DropdownItem key="orders">All Orders</DropdownItem>
          <DropdownItem key="seller_account">
            Apply for seller account
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default ProfileDropDown;
