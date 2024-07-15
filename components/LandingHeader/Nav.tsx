// components/Nav.tsx

import React, { useState } from "react";
import Link from "next/link";
import SvgIcon from "./SvgIcon"; // Assuming you have an SvgIcon component
import CTAButton from "./CTAButton"; // Assuming you have a CTAButton component
import Button from "./Button"; // Assuming you have a Button component
import LocaleSwitcher from "./LocaleSwitcher"; // Assuming you have a LocaleSwitcher component
import Loader from "./Loader"; // Assuming you have a Loader component
import { useAuth } from "@context/auth"; // Assuming you have an authentication context hook
import { useTranslation } from "next-i18next"; // Assuming you use next-i18next for translations

const Nav = (props) => {
  const { t } = useTranslation("your-translation-namespace"); // Replace with your actual translation namespace
  const { profile, loadProfileDone, logout } = useAuth(); // Replace with your authentication context

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLayoutSegment, setSelectedLayoutSegment] = useState(""); // You may need state to manage selected menu items

  const handleLogout = () => {
    logout(); // Implement your logout function
  };

  const redirect = () => {
    // Implement your redirect logic
  };

  return (
    <nav className="sticky top-0 z-10 w-full border-b border-gray-900 bg-white pt-px">
      <div className="container">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex items-center ml:hidden">
            <div
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center transition after:absolute after:bottom-0 after:left-1/2 after:-ml-[2px] after:h-1 after:w-1 after:rounded-full after:bg-gray-900 after:opacity-0 hover:after:opacity-100"
              onClick={() => setShowMobileMenu(true)}
            >
              <SvgIcon name="menu-thin" size={20} />
            </div>
            <Link href={`${props.shopDomain}/`}>
              <img
                className="ml-2 inline-block h-4 sm:h-5"
                src="/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <Link
            className="hidden ml:inline-block"
            href={`${props.shopDomain}/`}
          >
            <img className="h-4 sm:h-5" src="/images/logo.svg" alt="" />
          </Link>
          <ul className="hidden h-12 items-end gap-6 ml:flex">
            {/* Menu items with conditional styles */}
            <li className="group">
              <Link
                href={`${props.creatorDomain}/discover`}
                className={`relative inline-flex cursor-pointer items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100 ${
                  selectedLayoutSegment === "discover"
                    ? "text-gray-500 after:scale-x-100"
                    : ""
                }`}
              >
                <span className="mr-2">Discover</span>
              </Link>
            </li>
            {/* More menu items */}
            {/* Example of dropdown menu */}
            <li className="group">
              <a
                className={`relative inline-flex cursor-pointer items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100 ${
                  selectedLayoutSegment === "for-brands"
                    ? "text-gray-500 after:scale-x-100"
                    : ""
                }`}
              >
                <span className="mr-2">{t("forBrands.title")}</span>
                <SvgIcon name="arrow-down" size={8} />
              </a>
              <div className="absolute left-0 right-0 z-50 mt-px hidden w-full origin-top group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">
                {/* Dropdown content */}
                <div className="rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                  {/* Dropdown items */}
                  {/* Example: Link components for dropdown items */}
                </div>
              </div>
            </li>
            {/* More menu items */}
            {/* Example of another dropdown menu */}
            {/* More menu items */}
            <li className="group relative">
              <a
                className={`relative inline-flex items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100 ${
                  selectedLayoutSegment === "influencer-pricing" ||
                  selectedLayoutSegment === "brand-pricing"
                    ? "text-gray-500 after:scale-x-100"
                    : ""
                }`}
              >
                <span className="mr-2">{t("pricing.title")}</span>
                <SvgIcon name="arrow-down" size={8} />
              </a>
              <div className="absolute left-0 z-50 mt-px hidden w-52 origin-top-left group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">
                {/* Dropdown content */}
                <div className="rounded-b bg-white px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                  {/* Dropdown items */}
                  <Link
                    className="my-1 flex w-full p-1.5 text-xs text-gray-900 underline-offset-4 transition hover:underline"
                    href={`${props.shopDomain}/influencer-pricing`}
                  >
                    {t("pricing.Free for influencers")}
                  </Link>
                  <Link
                    className="my-1 flex w-full p-1.5 text-xs text-gray-900 underline-offset-4 transition hover:underline"
                    href={`${props.shopDomain}/brand-pricing`}
                  >
                    {t("pricing.Free for brands")}
                  </Link>
                </div>
              </div>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            {!loadProfileDone ? (
              <div className="flex items-center">
                <Loader type="buckle" size={14} />
                <span className="ml-2 text-xs">{t("Loading...")}</span>
              </div>
            ) : !profile ? (
              <>
                <CTAButton
                  name={t("Try for free")}
                  size="xs"
                  className="sm:w-auto"
                />
                <CTAButton
                  name={t("Sign in")}
                  size="xs"
                  variant="link"
                  className="mr-1 px-0 sm:w-auto"
                />
              </>
            ) : (
              <>
                <Button size="xs" variant="outline" onClick={redirect}></Button>
                <Button
                  size="xs"
                  variant="link"
                  className="mr-1 px-0"
                  onClick={handleLogout}
                >
                  {t("Log out")}
                </Button>
              </>
            )}
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
