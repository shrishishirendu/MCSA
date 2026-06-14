import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lotus-500 text-white hover:bg-lotus-700",
  secondary:
    "border border-indigoInk/15 bg-white text-indigoInk hover:border-lotus-500 hover:text-lotus-700",
  ghost: "text-indigoInk hover:bg-lotus-50"
};

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = BaseButtonProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export function Button({
  ...buttonProps
}: ButtonAsButton | ButtonAsLink) {
  const { children, className, variant = "primary" } = buttonProps;
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-lotus-500 focus:ring-offset-2",
    variantClasses[variant],
    className
  );

  if ("href" in buttonProps && buttonProps.href) {
    const linkButtonProps = buttonProps as ButtonAsLink;
    const {
      href,
      children: _children,
      className: _className,
      variant: _variant,
      ...linkProps
    } = linkButtonProps;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const nativeProps = buttonProps as ButtonAsButton;
  const {
    children: _children,
    className: _className,
    variant: _variant,
    href: _href,
    ...nativeButtonProps
  } = nativeProps;

  return (
    <button className={classes} {...nativeButtonProps}>
      {children}
    </button>
  );
}
