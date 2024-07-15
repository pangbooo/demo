// components/ProfileMenu.tsx
import React, { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { LogOut, User } from "lucide-react";
import { Link, usePathname, useRouter } from "@/navigation";
import Avvvatars from "avvvatars-react";
import { useAuthStore } from "@store/auth";
import cn from "classnames";
import { useTranslations } from "next-intl";

interface ProfileMenuProps {
  profile: any;
  creatorDomain: string;
  logout: () => void;
  manageOtherUser: () => any;
  isAdminManageOther: boolean;
}

const createLink = (domain: string, path: string) => {
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${domain}${formattedPath}`;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  profile,
  creatorDomain,
  logout,
  manageOtherUser,
  isAdminManageOther,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const handleLogout = () => {
    logout();
  };

  return (
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
            <Avvvatars value={profile?.displayname || "CrowdCore"} />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-50 mt-[9px] w-60 origin-top-right overflow-hidden rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href={createLink(creatorDomain, "profile")}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm text-gray-700",
                        {
                          "bg-gray-100": active,
                        }
                      )}
                    >
                      <User className="mr-3 h-4 w-4" aria-hidden="true" />
                      <span className="block truncate">{t("profile")}</span>
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={cn(
                        "flex w-full items-center px-4 py-2 text-left text-sm text-gray-700",
                        {
                          "bg-gray-100": active,
                        }
                      )}
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
                      <span className="block truncate">{t("logout")}</span>
                    </button>
                  )}
                </MenuItem>
                {isAdminManageOther && (
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={cn(
                          "flex w-full items-center px-4 py-2 text-left text-sm text-gray-700",
                          {
                            "bg-gray-100": active,
                          }
                        )}
                        onClick={() => manageOtherUser()}
                      >
                        <User className="mr-3 h-4 w-4" aria-hidden="true" />
                        <span className="block truncate">
                          {t("manageOtherUser")}
                        </span>
                      </button>
                    )}
                  </MenuItem>
                )}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;
