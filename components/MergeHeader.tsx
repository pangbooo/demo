"use client";
import React, { useEffect, useState } from "react";
import LandingHeader from "@components/merge-header/LandingHeader";
import { CreatorHeader } from "@components/merge-header/CreatorHeader";
import { getUserProfileDashboard } from "@/api";
// import { UserInfoProps } from '@models/user';

export interface MergeHeaderProps {
  shopDomain: string;
  creatorDomain: string;
  profileData: {
    profile: any | undefined;
    logout: () => void;
    manageOtherUser: () => any;
    backToRootToken: () => Promise<void>;
    isBrand: () => boolean;
    isAdminManageOther: boolean;
  };
}

export function MergeHeader(props: MergeHeaderProps) {
  const [profile, setProfile] = useState<any>();
  // 单独获取用户信息
  useEffect(() => {
    if (props.profileData?.profile?.consumer) {
      getUserProfileDashboard().then((res) => {
        if (res?.data?.data) {
          setProfile(res.data.data);
        }
      });
    }
  });

  if (!props.profileData?.profile?.consumer) {
    return <LandingHeader {...props} />;
  } else {
    return (
      <CreatorHeader
        {...props}
        profileData={{
          ...props.profileData,
          profile,
        }}
      />
    );
  }
}
