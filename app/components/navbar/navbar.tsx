"use client";
import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import { useCart } from "@/hooks/useCart";
import CartCounter from "./CartCounter";
import UserMenu from "./UserMenu";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const { cartTotalQuantity } = useCart();
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} text-3xl font-bold`}
            >
              E-shop
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCounter />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
