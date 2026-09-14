import type { CSSProperties, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function SocialIcon({ platform, ...props }: IconProps & { platform: string }) {
  if (platform === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.02-1.9-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.13c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg {...baseProps} aria-hidden="true" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...baseProps} aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

type SkillIconProps = { iconKey: string; name: string; accent: string };

export function SkillIcon({ iconKey, name, accent }: SkillIconProps) {
  const style = { "--skill-color": accent } as CSSProperties;

  return (
    <span className="skill-icon" style={style} aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        {iconPath(iconKey)}
      </svg>
      <span className="sr-only">{name}</span>
    </span>
  );
}

function iconPath(iconKey: string) {
  switch (iconKey) {
    case "oracle":
      return <><ellipse cx="24" cy="24" rx="17" ry="9" /><ellipse cx="24" cy="24" rx="10" ry="3" /></>;
    case "java":
      return <><path d="M19 33c-7 2 4 6 17 2" /><path d="M17 29c-9 4 3 8 21 4" /><path d="M20 25h15c0 5-3 8-8 8s-7-3-7-8Z" /><path d="M24 22c-5-5 7-6 1-11M29 22c-3-3 6-5 2-9" /></>;
    case "database":
      return <><ellipse cx="24" cy="12" rx="14" ry="6" /><path d="M10 12v12c0 3 6 6 14 6s14-3 14-6V12M10 24v12c0 3 6 6 14 6s14-3 14-6V24" /></>;
    case "next":
      return <><circle cx="24" cy="24" r="18" /><path d="M16 33V16l18 24M27 16h6v17" /></>;
    case "typescript":
      return <><rect x="6" y="6" width="36" height="36" rx="4" /><path d="M13 20h16M21 20v17M31 34c2 3 8 3 8-1 0-5-8-2-8-8 0-4 6-5 9-2" /></>;
    case "go":
      return <><path d="M8 18h11M5 24h12M8 30h11" /><path d="M19 17c3-5 15-5 20 0 4 5 1 14-8 15-10 1-15-8-12-15Z" /><circle cx="30" cy="20" r="1.5" fill="currentColor" /></>;
    case "dotnet":
      return <><circle cx="24" cy="24" r="18" /><path d="M13 31V18l9 13V18M27 18h9M31.5 18v13" /><circle cx="10" cy="31" r="1" fill="currentColor" /></>;
    case "sqlserver":
      return <><path d="M10 16c7-8 21-10 29-5-11 0-21 6-25 14-3 6-1 11 5 13-8-1-13-5-13-11 0-4 1-7 4-11Z" /><path d="M20 32c5 2 13 1 19-2M23 24c5 1 12 0 16-3" /></>;
    case "docker":
      return <><path d="M8 27h31c0 10-7 15-17 15-8 0-13-5-14-15Z" /><path d="M12 21h6v6h-6zM19 21h6v6h-6zM26 21h6v6h-6zM19 14h6v6h-6zM26 14h6v6h-6z" /><path d="M39 25c2-3 5-3 7-2-1 3-3 5-7 5" /></>;
    case "openshift":
      return <><path d="M12 16a16 16 0 0 1 27 1l-8 3a8 8 0 0 0-13-1ZM36 32A16 16 0 0 1 9 31l8-3a8 8 0 0 0 13 1Z" /><path d="m7 18 9-3 3 8-9 3ZM29 25l9-3 3 8-9 3Z" /></>;
    case "jenkins":
      return <><circle cx="24" cy="16" r="9" /><path d="M16 23c-4 4-5 11-4 17h24c1-6 0-13-4-17M18 28l6 7 6-7M20 14c2 2 6 2 8 0M19 11h.1M29 11h.1" /></>;
    case "harbor":
      return <><path d="M24 5v34M14 13h20M17 21h14M20 29h8M9 39h30" /><path d="M12 39c4-5 6-8 12-8s8 3 12 8" /></>;
    default:
      return <><rect x="8" y="8" width="32" height="32" rx="8" /><path d="M16 24h16M24 16v16" /></>;
  }
}

