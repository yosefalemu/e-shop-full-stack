import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="font-bold mb-2 text-base">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold mb-2 text-base">Customer Services</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, Tvs, laptops, watches, and accessories
            </p>
            <p>&copy; {new Date().getFullYear()} E~Shop. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="w-full flex  gap-2 flex-col ">
              <Link href="#" className="flex items-center gap-2">
                <FaFacebookSquare size={24} />
                <p>Face book</p>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <FaSquareXTwitter size={24} />
                <p>Twitter</p>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <FaLinkedin size={24} />
                <p>Linkedin</p>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <FaTelegram size={24} />
                <p>Telegram</p>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <FaYoutube size={24} />
                <p>You tube</p>
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <FaSquareInstagram size={24} />
                <p>Instagram</p>
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
