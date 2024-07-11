"use client";

import React, { useEffect, useState } from "react";
import SvgIcon from "@/components/SvgIcon";
import { useAuthStore } from "@/store/auth";
import { Button } from "@components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import LocaleSwitcher from "@components/LocaleSwitcher";
import { Loader } from "@components/ui/Loader";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import useFormRedirect from "@hooks/useFormRedirect";
import { cn } from "@lib/utils";
import CTAButton from "@components/merge-header/cta-button";
import { MergeHeaderProps } from "@components/merge-header/MergeHeader";

const CollaborationIdeas = (props: MergeHeaderProps) => {
  return (
    <div className="flex flex-col items-start p-6">
      <h1 className="mb-2 text-center text-4xl font-bold">
        New collaboration ideas of the day
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Content creators can create ideas by uploading social media content as
        the vibe box, and pre-adding items in the post to attract new brands
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href={`${props.creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + search influencers
          </button>
        </Link>
        <Link href={`${props.creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + find influencers by url
          </button>
        </Link>
        <Link href={`${props.creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + find influencers by existing influencers
          </button>
        </Link>
        <Link href={`${props.creatorDomain}/discover`}>
          <button className="rounded-md border border-black px-4 py-2">
            + recommended by us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function LandingHeader(props: MergeHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const { logout, profile } = props.profileData;
  // const [logout, profile] = useAuthStore(useShallow(state => [state.logout, state.profile]));
  const loadProfileDone = true;
  const pathname = usePathname();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const locale = useLocale();
  const t = useTranslations("navigation");
  const redirect = useFormRedirect();

  useEffect(() => {
    setShowMobileMenu(false);
    if (selectedLayoutSegment === "for-influencers") {
      setDefaultValue(["influencers"]);
    } else if (selectedLayoutSegment === "for-brands") {
      setDefaultValue(["brands"]);
    }
  }, [selectedLayoutSegment]);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showMobileMenu]);

  const handleLogout = async () => {
    logout();
  };

  const handleAccordionChange = (value: string[]) => {
    setDefaultValue(value);
  };
  return (
    <>
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
              <Link className="ml-2 inline-block" href={`${props.shopDomain}/`}>
                <img className="h-4 sm:h-5" src="/images/logo.svg" alt="" />
              </Link>
            </div>
            <Link
              className="hidden ml:inline-block"
              href={`${props.shopDomain}/`}
            >
              <img className="h-4 sm:h-5" src="/images/logo.svg" alt="" />
            </Link>
            <ul className="hidden h-12 items-end gap-6 ml:flex">
              {/* <li>
                <Link
                  className={cn(
                    'relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
                  )}
                  href={`${props.shopDomain}/`}
                >
                  {'About crowdcore'}
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className={cn(
                    'relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
                    {
                      'text-gray-500 after:scale-x-100':
                        selectedLayoutSegment === 'influencer-box-for-collaboration',
                    },
                  )}
                  href={`${props.shopDomain}/influencer-box-for-collaboration`}
                >
                  {t('collaborateIdeas')}
                </Link>
              </li> */}
              <li className="group">
                <Link
                  href={`${props.creatorDomain}/discover`}
                  className={cn(
                    "relative inline-flex cursor-pointer items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                    {
                      "text-gray-500 after:scale-x-100":
                        selectedLayoutSegment === "discover",
                    }
                  )}
                >
                  <span className="mr-2">Discover</span>
                  {/*<SvgIcon name="arrow-down" size={8} />*/}
                </Link>
                {/*<div className="absolute left-0 right-0 z-50 mt-px hidden w-full origin-top group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">*/}
                {/*  <div className="rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">*/}
                {/*    <div className="flex w-full px-3 sm:px-6 md:px-10 xl:px-20">*/}
                {/*      <CollaborationIdeas {...props} />*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </li>
              <li className="group">
                <a
                  className={cn(
                    "relative inline-flex cursor-pointer items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                    {
                      "text-gray-500 after:scale-x-100":
                        selectedLayoutSegment === "for-brands",
                    }
                  )}
                >
                  <span className="mr-2">{t("forBrands.title")}</span>
                  <SvgIcon name="arrow-down" size={8} />
                </a>
                <div className="absolute left-0 right-0 z-50 mt-px hidden w-full origin-top group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">
                  <div className="rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                    <div className="flex w-full px-3 sm:px-6 md:px-10 xl:px-20">
                      <div className="mx-auto grid max-w-[1024px] flex-1 grid-cols-2 gap-x-3 gap-y-2 py-4 xl:grid-cols-3">
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-brands/co-collaborate-with-influencers`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            {t(
                              "forBrands.Co-collaborate with influencers.title"
                            )}
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              {t(
                                "forBrands.Co-collaborate with influencers.des"
                              )}
                            </li>
                          </ul>
                        </Link>

                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-brands/invite-influencers-made-easy`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            {t("forBrands.Invite influencers.title")}
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>{t("forBrands.Invite influencers.des")}</li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-brands/influencer-management-made-easy`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            {t("forBrands.Influencer management.title")}
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>{t("forBrands.Influencer management.des")}</li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-brands/robust-end-to-end-system`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            {t("forBrands.Robust end-to-end system.title")}
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              {t("forBrands.Robust end-to-end system.des")}
                            </li>
                          </ul>
                        </Link>

                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-brands/brand-product-community`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            {t("forBrands.Brand product community.title")}
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              {t("forBrands.Brand product community.des")}
                            </li>
                          </ul>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="group">
                <a
                  className={cn(
                    "relative inline-flex cursor-pointer items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                    {
                      "text-gray-500 after:scale-x-100":
                        selectedLayoutSegment === "for-influencers",
                    }
                  )}
                >
                  <span className="mr-2">{t("forInfluencers.title")}</span>
                  <SvgIcon name="arrow-down" size={8} />
                </a>
                <div className="absolute left-0 right-0 z-50 mt-px hidden w-full origin-top group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">
                  <div className="rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                    <div className="flex w-full px-3 sm:px-6 md:px-10 xl:px-20">
                      <div className="mx-auto grid max-w-[1024px] flex-1 grid-cols-2 gap-x-3 gap-y-2 py-4 xl:grid-cols-3">
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-influencers/sell-via-vibe-boxes`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            Sell via vibe collections
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              Influencers Curate & Sell, Each Storefront a
                              Story, Each Box a Journey
                            </li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-influencers/manage-and-collaborate-with-brands`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            Manages and collaborates with brands
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>Invite and manage brands made easy</li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-influencers/influencer-first-boutique-store`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            Influencer-First boutique store
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              Establish your exclusive boutique storefront
                              without the hassle of managing supply chains.
                            </li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-influencers/unlock-more-brand-opportunities`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            Grow with brands
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              Efficiently connects you with a diverse range of
                              brands by introducing a two-way rating system for
                              brands and influencers
                            </li>
                          </ul>
                        </Link>
                        <Link
                          className="cursor-pointer rounded-md px-4 py-3 transition hover:bg-gray-100"
                          href={`${props.shopDomain}/for-influencers/sell-on-anywhere`}
                        >
                          <div className="mb-1.5 text-sm font-medium">
                            Sell on TikTok, Instagram, Youtube, or anywhere
                          </div>
                          <ul className="space-y-1.5 text-[11px] leading-[14px] text-gray-600">
                            <li>
                              Selectively screen and align a specific box with
                              your content, facilitating smooth product
                              promotion
                            </li>
                          </ul>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* <li className="group">
                <a
                  className={cn(
                    'relative inline-flex items-center pb-2 text-xs text-gray-900 after:absolute after:bg-gray-900 after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 cursor-pointer',
                  )}
                >
                  <span className="mr-2">Resources</span>
                  <SvgIcon name="arrow-down" className="w-2 h-1.5" />
                </a>
                <div className="hidden group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out] absolute z-50 left-0 right-0 w-full mt-px origin-top">
                  <div className="rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                    <div className="flex w-full px-3 sm:px-6 md:px-10 xl:px-20">
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-2 max-w-[1024px] mx-auto flex-1 py-4">
                        <div className="px-4 py-3 rounded-md transition cursor-pointer hover:bg-gray-100">
                          <div className="font-medium text-sm mb-1.5">Newsletter</div>
                          <ul className="text-[11px] leading-[14px] text-gray-600 space-y-1.5">
                            <li>Subscribe latest news from Crowdcore</li>
                          </ul>
                        </div>
                        <div className="px-4 py-3 rounded-md transition cursor-pointer hover:bg-gray-100">
                          <div className="font-medium text-sm mb-1.5">Blogs</div>
                          <ul className="text-[11px] leading-[14px] text-gray-600 space-y-1.5">
                            <li>Learn how to best utilize Crowdcore products and services</li>
                          </ul>
                        </div>
                        <div className="px-4 py-3 rounded-md transition cursor-pointer hover:bg-gray-100">
                          <div className="font-medium text-sm mb-1.5">Events & Webinairs</div>
                          <ul className="text-[11px] leading-[14px] text-gray-600 space-y-1.5">
                            <li>See latest events and webinairs for brands and influencers</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}

              {/* {locale === 'zh-CN' && (
                <li>
                  <Link
                    className={cn(
                      'relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
                      {
                        'text-gray-500 after:scale-x-100':
                          selectedLayoutSegment === 'influencer-risks-detect',
                      },
                    )}
                    href="/influencer-risks-detect"
                  >
                    红人黑名单
                  </Link>
                </li>
              )} */}
              <li className="group relative">
                <a
                  className={cn(
                    "relative inline-flex items-center pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                    {
                      "text-gray-500 after:scale-x-100":
                        selectedLayoutSegment === "influencer-pricing" ||
                        selectedLayoutSegment === "brand-pricing",
                    }
                  )}
                >
                  <span className="mr-2">{t("pricing.title")}</span>
                  <SvgIcon name="arrow-down" size={8} />
                </a>
                <div className="absolute left-0 z-50 mt-px hidden w-52 origin-top-left group-hover:block group-hover:animate-[fade-scale_.25s_ease-in-out]">
                  <div className="rounded-b bg-white px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
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
              {/* <li>
                <Link
                  className={cn(
                    'relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:bg-gray-900 after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300',
                    { 'after:scale-x-100 text-gray-500': pathname === '/who-we-are' },
                  )}
                  href="/"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    'relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:bg-gray-900 after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300',
                    { 'after:scale-x-100 text-gray-500': pathname === '/who-we-are' },
                  )}
                  href="/who-we-are"
                >
                  Who we are
                </Link>
              </li> */}
            </ul>
            <div className="flex items-center gap-3">
              {!loadProfileDone ? (
                <div className="flex items-center">
                  <Loader type="buckle" size={14} />
                  <span className="ml-2 text-xs">Loading...</span>
                </div>
              ) : !profile ? (
                <>
                  {/* <Button
                    size="xs"
                    variant="outline"
                    className="hidden sm:block"
                    onClick={() => {
                      window.open(
                        `https://share.hsforms.com/1spUhcUzLTmyWWb5OaARSrgr1lk6`,
                        '_blank',
                        'noreferrer',
                      );
                    }}
                  >
                    {t('Talk to sales')}
                  </Button> */}
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
                  <Button size="xs" variant="outline" onClick={redirect}>
                    {/*todo*/}
                    {/*{profile?.creatorProfile?._id ? t('myDashboard') : t('Join CrowdCore')}*/}
                  </Button>
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
      <div
        className={cn(
          "invisible fixed inset-0 z-10 -translate-x-full bg-black opacity-0 transition-all duration-300",
          {
            "visible translate-x-0 opacity-100": showMobileMenu,
          }
        )}
      >
        <div
          className="absolute left-3 top-2 p-1.5 text-gray-200"
          onClick={() => setShowMobileMenu(false)}
        >
          <SvgIcon name="close-small" size={22} />
        </div>
        <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-10">
          <div className="mt-4 flex-1">
            {/* <Link
              className={cn(
                'block p-3 w-full text-xs text-gray-300 focus:underline underline-offset-4',
                { 'underline text-white font-medium': pathname === '/' },
              )}
              href="/"
            >
              Shop
            </Link> */}

            <div className="mb-2 ml-3 mt-6 text-[10px] uppercase text-gray-500">
              Features
            </div>
            <Accordion
              type="multiple"
              className="w-full"
              value={defaultValue}
              onValueChange={handleAccordionChange}
            >
              <AccordionItem value="influencers">
                <AccordionTrigger
                  className="w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline"
                  iconName="down"
                  iconSize={14}
                >
                  {t("forInfluencers.title")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className={cn("grid grid-cols-2 gap-1")}>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname === "/for-influencers/sell-via-vibe-boxes",
                        }
                      )}
                      href={`${props.shopDomain}/for-influencers/sell-via-vibe-boxes`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Sell via vibe collections
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Influencers Curate & Sell, Each Storefront a Story,
                          Each Box a Journey
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname ===
                            "/for-influencers/manage-and-collaborate-with-brands",
                        }
                      )}
                      // href="/for-influencers/manage-and-collaborate-with-brands"
                      href={`${props.shopDomain}/for-influencers/manage-and-collaborate-with-brands`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Manages and collaborates with brands
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>Invite and manage brands made easy</li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname ===
                            "/for-influencers/influencer-first-boutique-store",
                        }
                      )}
                      href={`${props.shopDomain}/for-influencers/influencer-first-boutique-store`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Influencer-First boutique store
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Establish your exclusive boutique storefront without
                          the hassle of managing supply chains.
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname ===
                            "/for-influencers/unlock-more-brand-opportunities",
                        }
                      )}
                      href={`${props.shopDomain}/for-influencers/unlock-more-brand-opportunities`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Grow with brands
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Efficiently connects you with a diverse range of
                          brands by introducing a two-way rating system for
                          brands and influencers
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname === "/for-influencers/sell-on-anywhere",
                        }
                      )}
                      href={`${props.shopDomain}/for-influencers/sell-on-anywhere`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Sell on TikTok, Instagram, Youtube, or anywhere
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Selectively screen and align a specific box with your
                          content, facilitating smooth product promotion
                        </li>
                      </ul>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brands">
                <AccordionTrigger
                  className="w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline"
                  iconName="down"
                  iconSize={14}
                >
                  {t("forBrands.title")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className={cn("grid grid-cols-2 gap-1")}>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname === "/for-brands/brand-product-community",
                        }
                      )}
                      href={`${props.shopDomain}/for-brands/brand-product-community`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Brand product community
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Reinforce your brand’s core value of authenticity by
                          fostering transparency in collaborations
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname ===
                            "/for-brands/invite-influencers-made-easy",
                        }
                      )}
                      href={`${props.shopDomain}/for-brands/invite-influencers-made-easy`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Invite influencers
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Automated recommendations for more emerging
                          Influencers
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname === "/for-brands/robust-end-to-end-system",
                        }
                      )}
                      href={`${props.shopDomain}/for-brands/robust-end-to-end-system`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Virtual CMO for brands
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          All in one system for brands to sell products with
                          influencers
                        </li>
                      </ul>
                    </Link>
                    <Link
                      className={cn(
                        "rounded-md px-3 py-2 transition hover:bg-white/15",
                        {
                          "bg-white/15":
                            pathname ===
                            "/for-brands/influencer-management-made-easy",
                        }
                      )}
                      href={`${props.shopDomain}/for-brands/influencer-management-made-easy`}
                    >
                      <div className="mb-1 text-[11px] leading-[14px] text-gray-300">
                        Influencer management
                      </div>
                      <ul className="text-[10px] leading-[13px] text-gray-400">
                        <li>
                          Easily track the process and outcomes of
                          collaborations with various influencers
                        </li>
                      </ul>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <div className="text-[10px] text-gray-500 ml-3 mt-6 mb-2 uppercase">Resources</div> */}
            {/* <Link
              className={cn(
                'block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline',
                {
                  'font-medium text-white underline':
                    pathname === '/influencer-box-for-collaboration',
                },
              )}
              href={`${props.shopDomain}/influencer-box-for-collaboration`}
            >
              {t('collaborateIdeas')}
            </Link> */}
            {/* {locale === 'zh-CN' && (
              <Link
                className={cn(
                  'block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline',
                  {
                    'font-medium text-white underline': pathname === '/influencer-risks-detect',
                  },
                )}
                href="/influencer-risks-detect"
              >
                红人黑名单
              </Link>
            )} */}
            {/* <Link
                className={cn(
                  'block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline',
                  { 'font-medium text-white underline': pathname === '/blogs' },
                )}
                href="/blogs"
              >
                Blogs
              </Link>
              <Link
                className={cn(
                  'block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline',
                  { 'font-medium text-white underline': pathname === '/events' },
                )}
                href="/events"
              >
                Events
              </Link> */}
            <Link
              className={cn(
                "block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline",
                {
                  "font-medium text-white underline":
                    pathname === "/influencer-pricing",
                }
              )}
              href={`${props.shopDomain}/influencer-pricing`}
            >
              Pricing for influencer {`(Free)`}
            </Link>
            <Link
              className={cn(
                "block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline",
                {
                  "font-medium text-white underline":
                    pathname === "/brand-pricing",
                }
              )}
              href={`${props.shopDomain}/brand-pricing`}
            >
              Pricing for brands
            </Link>
          </div>
          <div className="mt-10">
            <div className="mt-4 flex items-center gap-4">
              <a
                className="inline-flex p-2 text-gray-300 hover:text-[#EE1D51]"
                target="_blank"
                rel="noreferrer"
                href="#"
              >
                <SvgIcon name="tiktok" size={18} />
              </a>
              <a
                className="inline-flex p-2 text-gray-300 hover:text-[#1DA1F2]"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/AppHappin"
              >
                <SvgIcon name="twitter" size={18} />
              </a>
              <a
                className="inline-flex p-2 text-gray-300 hover:text-[#1877F2]"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/HappinEventApp"
              >
                <SvgIcon name="facebook" size={18} />
              </a>
              <a
                className="inline-flex p-2 text-gray-300 hover:text-[#E4405F]"
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/happin.app/"
              >
                <SvgIcon name="instagram" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
