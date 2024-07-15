// components/CreatorHeader.tsx
import React from "react";
import ArrowSvg from "./ArrowSvg";
import NotificationPopover from "./NotificationPopover";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";
import { useAuthStore } from "@store/auth";
import { useUserProfile } from "@hooks/useUserProfile";
import { useRouter } from "next/router";

const CreatorHeader = () => {
  const router = useRouter();
  const [profile, creatorDomain, logout] = useAuthStore((state) => [
    state.profile,
    state.creatorDomain,
    state.logout,
  ]);
  const isAdminManageOther = useUserProfile(
    (state) => state.isAdminManageOther
  );

  const manageOtherUser = () => {
    router.push("/admin/manage-other-user");
  };

  return (
    <header className="relative z-10 flex h-[50px] w-full justify-between border-b border-gray-100 bg-white">
      <div className="flex items-center pl-4">
        <Logo />
        <ArrowSvg />
      </div>
      <div className="flex items-center pr-4">
        <NotificationPopover />
        <ProfileMenu
          profile={profile}
          creatorDomain={creatorDomain}
          logout={logout}
          manageOtherUser={manageOtherUser}
          isAdminManageOther={isAdminManageOther}
        />
      </div>
    </header>
  );
};

export default CreatorHeader;
