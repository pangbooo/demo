// components/Logo.tsx
import React from "react";
import { Link } from "@/navigation";
import Image from "next/image";

const Logo = () => (
  <Link href="/" className="relative flex h-[40px] w-[140px]">
    <Image
      src="/images/logo-wide.svg"
      alt="CrowdCore"
      className="block w-full dark:hidden"
      width={140}
      height={40}
    />
    <Image
      src="/images/logo-wide-dark.svg"
      alt="CrowdCore"
      className="hidden w-full dark:block"
      width={140}
      height={40}
    />
  </Link>
);

export default Logo;
