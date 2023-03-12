import { IDropdownOption } from "@/types/menu";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaSortDown } from "react-icons/fa";

export type DropdownStyle = {
  compactTitle?: boolean;
};

export const Dropdown = ({
  activeItem,
  className,
  items,
  setActiveItem,
  style,
  title,
}: {
  activeItem: IDropdownOption;
  className?: string;
  items: IDropdownOption[];
  setActiveItem:
    | React.Dispatch<React.SetStateAction<IDropdownOption>>
    | ((sort: IDropdownOption) => unknown);
  style?: DropdownStyle;
  title?: string;
}) => {
  return (
    <div>
      {title && <div className="mb-2 font-medium">{title}</div>}
      <Menu as="div" className={`relative ${className ? className : ""}`}>
        <div>
          <Menu.Button className="inline-flex w-fit h-fit items-center dark:bg-zinc-800 bg-zinc-200 rounded-md p-2 text-xs text-zinc-600 dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {activeItem.icon && (
              <activeItem.icon className="mr-3" size="1.5em" />
            )}
            <span
              className={`${
                style?.compactTitle ? "max-[865px]:hidden" : ""
              } mx-1 whitespace-nowrap`}
            >
              {activeItem.title}
            </span>
            <FaSortDown
              className="ml-2 mb-1 hover:text-zinc-700 dark:hover:text-zinc-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-400 dark:divide-zinc-100 rounded-md bg-zinc-300 dark:bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-zinc-800 dark:text-white">
            <div className="px-1 py-1">
              {items.map((item) => (
                <Menu.Item as="div" className="mb-1 last:mb-0">
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                          : item === activeItem
                          ? "bg-zinc-500 text-white"
                          : ""
                      } group flex w-full items-center rounded-md p-1 text-sm`}
                      onClick={() => setActiveItem({ ...item })}
                    >
                      {item.icon && (
                        <item.icon
                          className="mr-3 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      {item.title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
