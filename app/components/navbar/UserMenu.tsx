import { useState } from "react";
import Avatar from "../Avatar";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="relative">
        <div
          className="flex flex-row items-center gap-1 rounded-full cursor-pointer hover:drop-shadow-md transition text-slate-700 border-[1px] border-slate-900 p-2"
          onClick={handleToggle}
        >
          <Avatar />
          <FaCaretDown />
        </div>
        {isOpen && (
          <div className="z-30 absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            <div>
              <Link href="/orders">
                <MenuItems onClick={handleToggle}>Your orders</MenuItems>
              </Link>
              <Link href="/admin">
                <MenuItems onClick={handleToggle}>Admin dashboard</MenuItems>
              </Link>
              <MenuItems
                onClick={() => {
                  handleToggle();
                  signOut();
                }}
              >
                Logout
              </MenuItems>
            </div>
            <div>
              <Link href="/login">
                <MenuItems onClick={handleToggle}>Login</MenuItems>
              </Link>
              <Link href="/register">
                <MenuItems onClick={handleToggle}>Register</MenuItems>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={handleToggle} /> : null}
    </>
  );
};

export default UserMenu;
