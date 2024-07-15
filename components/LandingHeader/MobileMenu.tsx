import React, { useEffect } from "react";
import { Accordion } from "@components/ui/accordion";
import { Link } from "@/navigation";
import { MergeHeaderProps } from "@components/merge-header/MergeHeader";

interface MobileMenuProps extends MergeHeaderProps {
  showMobileMenu: boolean;
  defaultValue: string[];
  handleAccordionChange: (value: string[]) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  showMobileMenu,
  defaultValue,
  handleAccordionChange,
  props,
}) => {
  useEffect(() => {
    if (showMobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showMobileMenu]);

  return (
    <div
      className={`${
        showMobileMenu
          ? "visible translate-x-0 opacity-100"
          : "invisible -translate-x-full opacity-0"
      } fixed inset-0 z-10 bg-black transition-all duration-300`}
    >
      <div
        className="absolute left-3 top-2 p-1.5 text-gray-200"
        onClick={() => setShowMobileMenu(false)}
      >
        <SvgIcon name="close-small" size={22} />
      </div>
      <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-10">
        <div className="mt-4 flex-1">
          <div className="mb-2 ml-3 mt-6 text-[10px] uppercase text-gray-500">
            Features
          </div>
          <Accordion
            type="multiple"
            className="w-full"
            value={defaultValue}
            onValueChange={handleAccordionChange}
          >
            {/* Accordion items here */}
          </Accordion>
          <Link
            className="block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline"
            href={`${props.shopDomain}/influencer-pricing`}
          >
            Pricing for influencer (Free)
          </Link>
          <Link
            className="block w-full p-3 text-xs text-gray-300 underline-offset-4 focus:underline"
            href={`${props.shopDomain}/brand-pricing`}
          >
            Pricing for brands
          </Link>
        </div>
        <div className="mt-10">
          <div className="mt-4 flex items-center gap-4">
            {/* Social media links */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
