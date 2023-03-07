import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";

const ThemeIcon = ({ isDarkMode, size, className, onClick }) => {
  return isDarkMode ? (
    <IoMoon size={size} className={className} onClick={onClick} />
  ) : (
    <IoMoonOutline size={size} className={className} onClick={onClick} />
  );
};
export default ThemeIcon;
