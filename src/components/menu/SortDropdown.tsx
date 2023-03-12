import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaSortDown } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { SortDirection, SortOption, SortOptions } from "@/types/sorting";

import { Dropdown } from "@/components/menu/Dropdown";

export const SortDropdown = ({ sort, setSort }) => {
  const setSortWithDirection = (newOption: SortOption) => {
    setSort({ ...newOption, direction: sort.direction });
  };

  return (
    <div className="w-52 flex flex-row-reverse items-center ml-4 mr-2 text-right select-none">
      <div
        className="ml-2 p-2 rounded-md bg-zinc-600 bg-opacity-0 hover:bg-opacity-30 text-zinc-600 dark:text-white cursor-pointer"
        onClick={() =>
          setSort({
            ...sort,
            direction:
              sort.direction === SortDirection.Normal
                ? SortDirection.Reverse
                : SortDirection.Normal,
          })
        }
      >
        {sort.direction === SortDirection.Normal ? (
          <FaSortAmountDown />
        ) : (
          <FaSortAmountUp />
        )}
      </div>
      <Dropdown
        activeItem={sort}
        setActiveItem={setSortWithDirection}
        items={SortOptions}
      />
    </div>
  );
};
