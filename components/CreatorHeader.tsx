"use client";
import { cn } from "@lib/utils";
import { useAuthStore } from "@store/auth";
import Avvvatars from "avvvatars-react";
import { BellDot, LogOut, User, X, Menu as MenuIcon } from "lucide-react";
import { Link, usePathname, useRouter } from "@/navigation";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@components/ui/button";
import { useShallow } from "zustand/react/shallow";
// import { Badge } from 'antd';
import { fetcher } from "@lib/request";
import useSWRInfinite from "swr/infinite";
import { NotificationsApiProps, UnreadProps } from "@models/notification";
import { useNotificationStore } from "@store/notification";
import useSWR from "swr";
import LocaleSwitcher from "@components/LocaleSwitcher";
import { useTranslations } from "next-intl";
import SvgIcon from "@components/SvgIcon";
import InfiniteScroll from "@components/InfiniteScroll";
import { Loader } from "@components/ui/Loader";
import { MergeHeaderProps } from "@components/merge-header/MergeHeader";

const ArrowSvg = () => (
  <svg
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.99999 5.08071C3.91243 5.08081 3.82572 5.06361 3.74483 5.03009C3.66394 4.99657 3.59048 4.94739 3.52866 4.88538L0.700184 2.05728C0.575173 1.93227 0.504943 1.76272 0.504944 1.58593C0.504944 1.40913 0.575175 1.23958 0.700187 1.11457C0.825199 0.989561 0.99475 0.919331 1.17154 0.919331C1.34834 0.919332 1.51789 0.989563 1.6429 1.11457L3.99999 3.47132L6.35708 1.11455C6.48209 0.989543 6.65165 0.919312 6.82844 0.919312C7.00523 0.919311 7.17478 0.989541 7.29979 1.11455C7.42481 1.23956 7.49504 1.40911 7.49504 1.58591C7.49504 1.7627 7.42481 1.93225 7.2998 2.05726L4.47132 4.8854C4.4095 4.9474 4.33604 4.99658 4.25515 5.0301C4.17426 5.06361 4.08755 5.08082 3.99999 5.08071V5.08071Z"
      fill="currentColor"
    />
  </svg>
);

const PAGE_SIZE = 10;
const fetch = (url: string) => fetcher(url).then((res) => res.data);

const createLink = (domain: string, path: string) => {
  // 确保 path 以斜杠开头
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${domain}${formattedPath}`;
};

export function CreatorHeader(props: MergeHeaderProps) {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unread, markReadAll] = useNotificationStore((state) => [
    state.unread,
    state.markReadAll,
  ]);
  const {
    profile,
    logout,
    manageOtherUser,
    backToRootToken,
    isBrand,
    isAdminManageOther,
  } = props.profileData;
  const pathname = usePathname();
  const router = useRouter();
  const popoverRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("navigation");

  const menu = isBrand()
    ? [
        {
          title: t("brandDiscover"),
          link: createLink(props.creatorDomain, "/discover"),
        },
        {
          title: t("Collaboration"),
          link: createLink(props.creatorDomain, "/collaboration"),
        },
        {
          title: t("Inventory"),
          link: createLink(props.creatorDomain, "/inventory"),
        },
        {
          title: t("Orders"),
          link: createLink(props.creatorDomain, "/orders"),
        },
        {
          title: t("Analysis"),
          link: createLink(props.creatorDomain, "/analysis"),
        },
      ]
    : [
        {
          title: t("influencerDiscover"),
          link: createLink(props.creatorDomain, "/discover"),
        },
        {
          title: t("Collaboration"),
          link: createLink(props.creatorDomain, "/collaboration"),
        },
        {
          title: t("Boutique store"),
          link: createLink(props.creatorDomain, "/boutique-store"),
        },
        {
          title: t("Analysis"),
          link: createLink(props.creatorDomain, "/analysis"),
        },
      ];

  const { data: unreadData } = useSWR<UnreadProps[]>(
    "/notification/countUnreadNotifications",
    fetch,
    {
      refreshInterval: 10 * 60 * 1000, // 5分钟重新验证
    }
  );

  useEffect(() => {
    if (unreadData) {
      useNotificationStore.setState({ unread: unreadData });
    }
  }, [unreadData]);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!isNotifyOpen) return null;
    if (previousPageData && !previousPageData.length) return null; // 已经到最后一页
    return `/notification/getNotifications?page=${pageIndex}&pageSize=${PAGE_SIZE}`;
  };

  /// 不需要一直访问，只有在用户点击铃铛采访问 todo
  const swr = useSWRInfinite<NotificationsApiProps[]>(getKey, fetch);

  const { data } = swr;

  const notifications = data
    ? ([] as NotificationsApiProps[]).concat(...data)
    : [];

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const targetElement = popoverRef.current;
    if (!targetElement) {
      return;
    }
    const observer = new MutationObserver(() => {
      const isOpen = targetElement.getAttribute("aria-expanded");
      setIsNotifyOpen(isOpen === "true");
      if (isOpen === "false" && unread.length > 0) {
        // 处理关闭通知面板的逻辑
      }
    });
    const config: MutationObserverInit = { attributes: true };
    observer.observe(targetElement, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClickNotify = () => {};

  return (
    <>
      {manageOtherUser() ? (
        <div className="fixed left-0 top-0 flex h-10 w-full items-center justify-between bg-blue-600 px-8 text-white">
          <span>You are managing {manageOtherUser()?.name}.</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={async () => {
              await backToRootToken();
              if (isAdminManageOther) {
                router.push("/admin/brand-account");
                return;
              }
              if (pathname !== "/settings/team") {
                router.push("/settings/team");
              } else {
                window?.location?.reload();
              }
            }}
          >
            Back to your account
          </Button>
        </div>
      ) : null}
      <div
        className={cn(
          "z-50 border-b border-gray-900 px-3 pt-px md:px-8",
          pathname.startsWith("/creation/start/")
            ? "bg-gray-50"
            : "fixed left-0 top-0 z-20 w-full bg-white",
          manageOtherUser() ? "top-10" : ""
        )}
      >
        <div className="container">
          <div className="relative flex h-12 items-center justify-center">
            <div className="absolute left-0 flex items-center">
              <div
                className="relative mr-2 flex h-8 w-8 cursor-pointer items-center justify-center transition after:absolute after:bottom-0 after:left-1/2 after:-ml-[2px] after:h-1 after:w-1 after:rounded-full after:bg-gray-900 after:opacity-0 hover:after:opacity-100 md:hidden"
                onClick={() => setShowMobileMenu(true)}
              >
                <MenuIcon size={20} />
              </div>
              <Link href={createLink(props.creatorDomain, "/public")}>
                <img className="h-5" src="/images/logo.svg" alt="" />
              </Link>
            </div>
            {!pathname.startsWith("/creation/start/") && (
              <ul className="hidden h-12 items-end gap-6 md:flex">
                {[...menu].map((menu) => (
                  <li key={menu.title} className="group relative">
                    <Link
                      href={menu.link}
                      className={cn(
                        "relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                        {
                          "text-gray-500 after:scale-x-100":
                            pathname.startsWith(menu.link),
                        }
                      )}
                    >
                      {menu.title}
                    </Link>
                  </li>
                ))}
                {profile?.isAdmin && (
                  <li className="group relative">
                    <Link
                      href={createLink(props.creatorDomain, "/admin")}
                      className={cn(
                        "relative inline-flex pb-2 text-xs text-gray-900 after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
                        {
                          "text-gray-500 after:scale-x-100":
                            pathname === "/admin",
                        }
                      )}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            )}
            <div className="absolute right-0 flex items-center gap-3">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <PopoverButton
                      as="div"
                      ref={popoverRef}
                      className={cn(
                        "relative flex h-8 w-8 cursor-pointer items-center justify-center after:absolute after:bottom-0 after:left-1/2 after:-ml-[2px] after:h-1 after:w-1 after:rounded-full after:bg-gray-900 after:opacity-0 hover:after:opacity-100",
                        {
                          "after:opacity-100": open,
                        }
                      )}
                      onClick={() => markReadAll()}
                    >
                      {/*<Badge count={unread.length} dot offset={[-1, 1]}>*/}
                      {/*  <SvgIcon name="bell" size={20} className="text-gray-900" />*/}
                      {/*</Badge>*/}
                    </PopoverButton>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <PopoverPanel className="absolute right-0 z-50 mt-[9px] w-80 origin-top-right overflow-hidden rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                        <div className="scrollbar-light max-h-[400px] divide-y divide-gray-100 overflow-y-auto">
                          <InfiniteScroll
                            swr={swr}
                            loadingIndicator={
                              <div className="flex justify-center py-2">
                                <Loader type="buckle" size={20} />
                              </div>
                            }
                            emptyContent={
                              <div className="flex flex-col items-center justify-center p-6">
                                <BellDot
                                  size={24}
                                  strokeWidth={1.75}
                                  className="text-gray-500"
                                />
                                <div className="mt-2 text-gray-500">
                                  No notifications
                                </div>
                              </div>
                            }
                            isReachingEnd={({ data }) =>
                              data?.[0]?.length === 0 ||
                              (data && data[data.length - 1].length < PAGE_SIZE)
                            }
                          >
                            {(data) =>
                              data?.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex cursor-pointer px-4 py-3.5 transition hover:bg-gray-50"
                                  onClick={() => handleClickNotify()}
                                >
                                  <img
                                    className="h-6 w-6 rounded-full object-cover"
                                    src={
                                      item.sender?.photourl ||
                                      "/images/logo-single.svg"
                                    }
                                    alt=""
                                  />
                                  <div className="mx-3 min-w-0 flex-1">
                                    <div className="break-words leading-tight">
                                      <span className="mr-1 font-medium">
                                        {item.sender?.displayname ||
                                          "CrowdCore"}
                                      </span>
                                      {item.title}
                                    </div>
                                    {item?.desc && item.desc.length > 0 && (
                                      <div className="ellipsis-2 mt-1 text-xs text-gray-600">
                                        {item.desc}
                                      </div>
                                    )}
                                  </div>
                                  {item.count > 1 && (
                                    <div className="text-xs leading-5 text-gray-500">
                                      + {item.count}
                                    </div>
                                  )}
                                </div>
                              ))
                            }
                          </InfiniteScroll>
                        </div>
                      </PopoverPanel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Menu as="div" className="relative">
                {({ open }) => (
                  <>
                    <MenuButton
                      as="div"
                      className={cn(
                        "relative flex h-8 w-8 cursor-pointer items-center justify-center after:absolute after:bottom-0 after:left-1/2 after:-ml-[2px] after:h-1 after:w-1 after:rounded-full after:bg-gray-900 after:opacity-0 hover:after:opacity-100",
                        {
                          "after:opacity-100": open,
                        }
                      )}
                    >
                      {!profile ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 bg-gray-200 text-gray-600">
                          <User size={14} />
                        </div>
                      ) : profile?.photourl ? (
                        <img
                          className="h-5 w-5 overflow-hidden rounded-full border border-gray-900"
                          src={profile.photourl}
                          alt=""
                        />
                      ) : (
                        <Avvvatars
                          size={20}
                          value={profile?.displayname ?? "User"}
                        />
                      )}
                    </MenuButton>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-50 mt-[9px] w-44 origin-top-right divide-y divide-gray-100 rounded-b bg-white px-1 shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
                        <div className="py-1">
                          <MenuItem>
                            <Link
                              href={createLink(
                                props.creatorDomain,
                                "/my-profile"
                              )}
                              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                            >
                              {t("My profile")}
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              href={createLink(
                                props.creatorDomain,
                                "/settings/user-package"
                              )}
                              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                            >
                              {t("Account")}
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              href={createLink(
                                props.creatorDomain,
                                "/settings/payout"
                              )}
                              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                            >
                              {t("Payout")}
                            </Link>
                          </MenuItem>
                          {!manageOtherUser() && (
                            <MenuItem>
                              <Link
                                href={createLink(
                                  props.creatorDomain,
                                  "/settings/team"
                                )}
                                className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                              >
                                {t("Team")}
                              </Link>
                            </MenuItem>
                          )}
                        </div>
                        {!manageOtherUser() && (
                          <div className="py-1">
                            <MenuItem>
                              <a
                                className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                                onClick={handleLogout}
                              >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t("Log out")}</span>
                              </a>
                            </MenuItem>
                          </div>
                        )}
                      </MenuItems>
                    </Transition>
                  </>
                )}
              </Menu>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "invisible fixed inset-0 z-50 -translate-x-full bg-black opacity-0 transition-all duration-300",
          {
            "visible translate-x-0 opacity-100": showMobileMenu,
          }
        )}
      >
        <button
          className="absolute left-3 top-2 p-1.5 text-gray-200"
          onClick={() => setShowMobileMenu(false)}
        >
          <X size={20} />
        </button>
        <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-10">
          <div className="mt-4 flex-1">
            {[...menu].map((menu) => (
              <Link
                key={menu.title}
                href={menu.link}
                className={cn(
                  "block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline",
                  {
                    "font-medium text-white underline": pathname.startsWith(
                      menu.link
                    ),
                  }
                )}
              >
                {menu.title}
              </Link>
            ))}
            {profile?.isAdmin && (
              <Link
                href={createLink(props.creatorDomain, "/admin")}
                className={cn(
                  "block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline",
                  { "font-medium text-white underline": pathname === "/admin" }
                )}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
