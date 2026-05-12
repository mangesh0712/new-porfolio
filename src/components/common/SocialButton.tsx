import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SocialPlatform = "github" | "linkedin" | "instagram";

interface SocialButtonProps {
  href: string;
  platform: SocialPlatform;
  icon: ReactNode;
  ariaLabel: string;
  variant?: "circular" | "rounded";
}

const platformColors: Record<SocialPlatform, { hover: string; darkHover: string }> = {
  github: { hover: "hover:bg-gray-900", darkHover: "dark:hover:bg-gray-900" },
  linkedin: { hover: "hover:bg-blue-600", darkHover: "dark:hover:bg-blue-600" },
  instagram: { hover: "hover:bg-pink-600", darkHover: "dark:hover:bg-pink-600" },
};

export function SocialButton({
  href,
  platform,
  icon,
  ariaLabel,
  variant = "rounded",
}: SocialButtonProps) {
  const colors = platformColors[platform];
  const roundedClass = variant === "circular" ? "rounded-full" : "rounded-lg";
  const scaleClass = variant === "circular" ? "hover:scale-110" : "";
  const transitionClass = variant === "circular" ? "transition-all" : "transition-colors";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        `${roundedClass} p-3 ${transitionClass}`,
        "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        `${colors.hover} ${colors.darkHover} hover:text-white dark:hover:text-white`,
        scaleClass
      )}
    >
      {icon}
    </a>
  );
}
