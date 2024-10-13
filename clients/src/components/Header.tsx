import NavItems from './NavItems';

const Header = () => {
  return (
    <header className="flex items-center w-full fixed top-0 left-0 h-[80px] bg-[#0F1524] max-w-full">
      <NavItems isAuthorized={false} />
    </header>
  );
};

export default Header;
