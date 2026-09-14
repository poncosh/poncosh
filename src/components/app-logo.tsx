import type { SVGProps } from "react";

type AppLogoProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

export function AppLogo({
  size = 64,
  title = "Satrio Ponco Sushadi",
  className,
  ...props
}: AppLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>
      <rect width="64" height="64" rx="17" fill="var(--night, #151817)" stroke="var(--line)" strokeWidth="1" />
      <path
        d="M9 39C17 18 37 9 55 18"
        stroke="var(--signal, #DBFF45)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="var(--night, #151817)"
        stroke="#F2F0E9"
        strokeOpacity=".75"
        strokeWidth="1.5"
      />
      <text
        x="31"
        y="41"
        textAnchor="middle"
        fill="#F2F0E9"
        fontFamily="Georgia, serif"
        fontSize="28"
        fontStyle="italic"
      >
        S.
      </text>
      <circle cx="50" cy="49" r="4" fill="var(--signal, #DBFF45)" />
    </svg>
  );
}
