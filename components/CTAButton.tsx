"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import useFormRedirect from "@hooks/useFormRedirect";
import { cn } from "@lib/utils";

type CTAButtonProps = ButtonProps &
  (
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
  const { source, name, className, ...rest } = props;
  const t = useTranslations("CTAButton");
  const redirect = useFormRedirect();

  return (
    <Button
      {...rest}
      onClick={redirect}
      className={cn("w-full sm:w-60", className)}
    >
      {name ? name : source === "influencer" ? t("influencer") : t("brand")}
    </Button>
  );
};

export default CTAButton;
