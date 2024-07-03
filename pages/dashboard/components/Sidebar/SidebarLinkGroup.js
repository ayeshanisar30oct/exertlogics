"use client";
import React, { ReactNode, useState } from "react";

const SidebarLinkGroup = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li>
      {typeof children === "function" ? children(handleClick, open) : null}
    </li>
  );
};

export default SidebarLinkGroup;
