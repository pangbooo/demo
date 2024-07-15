import React, { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { MergeHeaderProps } from "@components/merge-header/MergeHeader";
import CollaborationIdeas from "./CollaborationIdeas";
import MobileMenu from "./MobileMenu";
import SocialMediaLinks from "./SocialMediaLinks";

const LandingHeader = (props: MergeHeaderProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const { logout } = props.profileData;
  const selectedLayoutSegment = useSelectedLayoutSegment();

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

  const handleAccordionChange = (value: string[]) => {
    setDefaultValue(value);
  };

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu
        showMobileMenu={showMobileMenu}
        defaultValue={defaultValue}
        handleAccordionChange={handleAccordionChange}
        {...props}
      />

      <div className="flex flex-col items-start p-6">
        <h1 className="mb-2 text-center text-4xl font-bold">
          New collaboration ideas of the day
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Content creators can create ideas by uploading social media content as
          the vibe box, and pre-adding items in the post to attract new brands
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Links to Collaboration Ideas */}
          <CollaborationIdeas {...props} />
        </div>
      </div>

      <div className="mt-10">
        {/* Social Media Links */}
        <SocialMediaLinks />
      </div>
    </>
  );
};

export default LandingHeader;
