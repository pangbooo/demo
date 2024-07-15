import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { MergeHeaderProps } from "@components/merge-header/MergeHeader";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import SocialMediaLinks from "./SocialMediaLinks";

const LandingHeader: React.FC<MergeHeaderProps> = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const { logout, profile } = props.profileData;
  const loadProfileDone = true;
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

  const handleLogout = async () => {
    logout();
  };

  const handleAccordionChange = (value: string[]) => {
    setDefaultValue(value);
  };

  return (
    <>
      <Nav />
      <MobileMenu
        showMobileMenu={showMobileMenu}
        defaultValue={defaultValue}
        handleAccordionChange={handleAccordionChange}
        creatorDomain={props.creatorDomain} // Adjust as needed
        shopDomain={props.shopDomain} // Adjust as needed
      />
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <button
          className="text-lg font-bold text-gray-900"
          onClick={() => setShowMobileMenu(true)}
        >
          Menu
        </button>
        <LocaleSwitcher />
        {loadProfileDone && profile && (
          <div className="flex items-center gap-4">
            <span>{profile.name}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
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
        <div className="mt-10">
          <SocialMediaLinks />
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
