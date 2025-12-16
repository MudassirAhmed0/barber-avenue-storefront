"use client";
import useAos from "@/hooks/useAos";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { CartDrawer } from "@/components/cart/CartDrawer";

const Header = () => {
  const dropDown = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useAos();

  function toggleSidebar() {
    if (window.innerWidth < 1024) {
      const body = document.querySelector("body");
      const sideBar = document.querySelector(".sideBar");
      const menu = document.querySelector(".menu");
      const header = document.querySelector("header");

      body?.classList.toggle("active");
      header?.classList.toggle("header_bg");
      sideBar?.classList.toggle("active");
      menu?.classList.toggle("active");
    }
  }

  function toggleDropDown() {
    if (window.innerWidth < 1024) {
      if (!dropDown.current) return;

      if (!open) {
        // open: set height to the ul's content height
        dropDown.current.style.maxHeight = `${dropDown.current.scrollHeight}px`;
        setOpen(true);
      } else {
        // close: set back to 0
        dropDown.current.style.maxHeight = "0px";
        setOpen(false);
      }
    }
  }

  const navLinks = [
    {
      link: "/",
      title: "home",
    },
    {
      link: "/",
      title: "Brand’s Culture",
    },
    {
      link: "/",
      title: "Products",
      dropDown: [
        {
          link: "/collections/barber-essentials",
          title: "Barber Essentials",
        },
        {
          link: "/collections/accessories",
          title: "Accessories",
        },
        {
          link: "/collections/merchandise",
          title: "Merchandise",
        },
      ],
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white header_bg z-[100]">
        <div className="flex items-center justify-between lg:px-vw50 lg:py-vw20 px-5 py-10">
          <Link
            href={"/"}
            className="lg:w-[length:var(--vw174)] lg:h-[length:var(--vw75)] w-[110px] h-[47px] sm:w-[200px] sm:h-[86px] relative z-[2]"
          >
            <Image
              fill
              alt="logo"
              src={"/images/icons/logo.png"}
              className="object-contain"
            />
          </Link>
          <nav className="sideBar absolute flex flex-wrap items-center lg:gap-x-vw24 inset-0 w-full fullVhcm fullSvhcm lg:static lg:!size-[unset] px-5 pt-36 pb-5 lg:p-0">
            <ul className="flex lg:flex-row flex-col gap-y-6 lg:items-center lg:gap-x-vw24 capitalize w-full lg:w-auto">
              {navLinks.map((navLink, index) => (
                <li
                  key={index}
                  className="lg:text16 mtext18 lg:py-vw8 font-inter ls016 group relative"
                >
                  <div
                    onClick={toggleDropDown}
                    className="flex cursor-pointer lg:gap-x-vw4 gap-x-4 items-center lg:text-black lg:hover:text-[color:var(--color-green)] text-white transition"
                  >
                    {navLink.dropDown ? (
                      <button className="capitalize ">{navLink.title}</button>
                    ) : (
                      <Link onClick={toggleSidebar} href={`${navLink.link}`}>
                        {navLink.title}
                      </Link>
                    )}
                    {navLink.dropDown && (
                      <div
                        className={`${
                          open ? "-scale-100" : "scale-100"
                        } relative lg:size-vw20 size-4 lg:group-hover:opacity-100 lg:opacity-60 opacity-100 lg:group-hover:-scale-y-100 transition`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="atlwh_Full"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            className="lg:stroke-black stroke-white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {navLink.dropDown && (
                    <div
                      ref={dropDown}
                      style={{ maxHeight: "0px" }}
                      className="lg:w-[12vw] lg:absolute lg:left-[-3vw] lg:top-[2.5vw] lg:!max-h-[unset] lg:opacity-0 lg:pointer-events-none lg:group-hover:pointer-events-auto lg:scale-95 lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:origin-bottom overflow-hidden lg:overflow-visible transition-all duration-500 lg:duration-300"
                    >
                      <ul className="flex flex-col  font-medium tracking-normal border border-green bg-dullwhite lg:rounded-vw8 rounded-[8px]">
                        {navLink.dropDown.map((dropDownLink, ind) => (
                          <li
                            onClick={() => {
                              toggleSidebar();
                              toggleDropDown();
                            }}
                            className=" lg:mx-auto lg:py-vw9 border-b border-green last:border-0 lg:px-0 p-3 lg:text-black lg:hover:text-green text-black transition flex lg:justify-center"
                            key={ind}
                          >
                            {" "}
                            <Link
                              href={`${dropDownLink.link}`}
                              className="w-full lg:text-center "
                            >
                              {dropDownLink.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-between lg:items-center lg:gap-x-vw24 gap-4 w-full lg:w-auto">
              <div
                onClick={toggleSidebar}
                className="rounded-full cursor-pointer lg:p-vw12 p-4 bg-[color:var(--color-green)] flex items-center justify-center"
              >
                <HiOutlineUser color="white" className="lg:size-vw20 size-5" />
              </div>
              <div className="flex items-center">
                <CartDrawer />
              </div>
            </div>
          </nav>
          <div
            onClick={toggleSidebar}
            className="block lg:hidden menu min-w-[20px] h-[20px] sm:w-[4vw] sm:h-[4vw] cursor-pointer z-[2] top-[4px]  "
          >
            <span className="top-0"></span>
            <span className="top-[30%]"></span>
            <span className="top-[60%]"></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
