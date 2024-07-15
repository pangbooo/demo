import React from "react";
import SvgIcon from "@/components/SvgIcon";

const SocialMediaLinks = () => {
  return (
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
  );
};

export default SocialMediaLinks;
