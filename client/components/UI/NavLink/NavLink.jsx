import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./NavLink.module.scss";

export default function NavLink({
  children,
  activeClassName = style.active,
  ...props
}) {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}
