"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@lib/utils";

type CTAButtonProps = ButtonProps & {
  handleClick: (props: any) => void;
} & (
    | {
        source?: "influencer" | "brand";
        name: string;
        className?: string;
      }
    | {
        source: "influencer" | "brand";
        name?: string;
        className?: string;
      }
  );

const CTAButton = (props: CTAButtonProps) => {
  const { source, name, className, handleClick, ...rest } = props;
  const t = useTranslations("CTAButton");

  return (
    <Button
      {...rest}
      onClick={handleClick}
      className={cn("w-full sm:w-60", className)}
    >
      {name ? name : source === "influencer" ? t("influencer") : t("brand")}
    </Button>
  );
};

export default CTAButton;
