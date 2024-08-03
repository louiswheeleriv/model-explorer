import React from "react";

type Props = {
  href: string;
  label: string;
};

const TopNavBarButton = (props: Props) => {
  return (
    <a
      href={props.href}
      className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">
        {props.label}
    </a>
  );
};

export default TopNavBarButton;
