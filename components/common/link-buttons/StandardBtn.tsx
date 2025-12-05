"use client";
import Link from "next/link";
import React from "react";

interface StandardBtnProps {
  link: string;
  text: string;
  greenVersion?: boolean;
}

const StandardBtn = ({ link, text, greenVersion }: StandardBtnProps) => {
  return (
    <Link
      href={link}
      className={`capitalize inline-flex items-center justify-center font-medium transition-all duration-300 rounded-[5px]
        ${
          greenVersion
            ? "bg-[color:var(--color-green)] text-white hover:bg-black hover:bg-opacity-80"
            : "bg-white text-black hover:bg-[color:var(--color-green)] hover:text-white"
        }
       lg:text-[length:var(--vw16)] lg:py-[length:var(--vw18)] lg:px-[length:var(--vw50)] py-3 px-8 text-sm`}
    >
      {text}
    </Link>
  );
};

export default StandardBtn;
