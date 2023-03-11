import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import { TodoCard } from "./components/todo/TodoCard";
import { Todo } from "@/types/todo";
import { parseTodosInAppdata } from "@/todo/import";
import { AddItemDialog } from "./components/add_item/AddItemDialog";
import { MenuBar } from "./components/menu/MenuBar";

import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown, FaSortDown } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  FaClock,
  FaRegCalendarCheck,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import { MdPriorityHigh, MdUpdate } from "react-icons/md";
import { SortBy } from "@/types/sorting";
import { Priority, priorityAsNumber } from "./types/priority";

const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="w-56 text-right mr-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-zinc-600 bg-opacity-20 px-2 p-1 text-sm font-medium text-zinc-600 dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <HiBars3BottomLeft className="mr-2" size="1.5em" />
            <span className="mr-1 hide-mobile">Sort by...</span>
            <FaSortDown
              className="ml-2 hover:text-zinc-700 dark:hover:text-zinc-100"
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
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.CompletionDate
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.CompletionDate)}
                  >
                    <FaRegCalendarCheck
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Completion date
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.DueDate
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.DueDate)}
                  >
                    <FaClock className="mr-3 h-5 w-5" aria-hidden="true" />
                    Due date
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.MostRecent
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.MostRecent)}
                  >
                    <MdUpdate className="mr-3 h-5 w-5" aria-hidden="true" />
                    Most recent
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.Priority
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.Priority)}
                  >
                    <MdPriorityHigh
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Priority
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.AtoZ
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.AtoZ)}
                  >
                    <FaSortAlphaDown
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Alphabetical (ascending)
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-zinc-400 dark:bg-zinc-600 text-white"
                        : sort === SortBy.ZtoA
                        ? "bg-zinc-500 text-white"
                        : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSort(SortBy.ZtoA)}
                  >
                    <FaSortAlphaDownAlt
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Alphabetical (descending)
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const sortTodos = (sort: Exclude<SortBy, SortBy.MostRecent>) => {
  switch (sort) {
    case SortBy.CompletionDate:
      return (a: Todo, b: Todo): number => {
        if (a.completed) {
          if (b.completed) {
            return a.completionDate! < b.completionDate! ? -1 : 1;
          }

          return -1;
        }

        if (b.completed) {
          return 1;
        }

        return 0;
      };
    case SortBy.DueDate:
      return (a: Todo, b: Todo): number => {
        if (a.date) {
          if (b.date) {
            return a.date < b.date ? -1 : 1;
          }

          return -1;
        }

        if (b.date) {
          return 1;
        }

        return 0;
      };
    case SortBy.Priority:
      return (a: Todo, b: Todo): number => {
        if (a.priority === b.priority) {
          return 0;
        }

        return priorityAsNumber(a.priority) > priorityAsNumber(b.priority) ? -1 : 1;
      };
    case SortBy.AtoZ:
      return (a: Todo, b: Todo): number => {
        return a.title < b.title ? -1 : 1;
      };
    case SortBy.ZtoA:
      return (a: Todo, b: Todo): number => {
        return a.title > b.title ? -1 : 1;
      };
  }
};
function App() {
  const [sort, setSort] = useState(SortBy.MostRecent);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);
  const [input, setInput] = useState("");
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    parseTodosInAppdata(setTodos);
  }, []);

  useEffect(() => {
    if (sort === SortBy.MostRecent) {
      let newTodos = [...todos];
      setSortedTodos(newTodos.reverse());
    } else {
      let newTodos = [...todos];
      setSortedTodos(newTodos.sort(sortTodos(sort)));
    }
  }, [sort, todos]);

  return (
    <div className="h-full">
      <div className="select-none flex sticky top-0 self-start justify-between items-center mt-4 mb-8 z-50 dark:bg-zinc-900">
        <div className="text-zinc-800 dark:text-zinc-100 flex items-center">
          <h2 className="ml-2 p-2 py-1 dark:bg-zinc-300 bg-zinc-500 text-zinc-100 dark:text-zinc-800 font-bold">
            libellus
          </h2>
        </div>
        <MenuBar setAddingItem={setAddingItem} />
      </div>
      <div className="flex items-center mb-2">
        <hr className="ml-2 w-full h-1 bg-zinc-100 border-0 rounded dark:bg-zinc-700" />
        <SortDropdown sort={sort} setSort={setSort} />
      </div>
      <div className="z-10 w-full px-2 py-4 snap-mandatory snap-y overflow-y-auto h-5/6">
        {sortedTodos.map((todo: Todo, i) => (
          <TodoCard data={todo} key={`todo-entry-${i}`} />
        ))}
      </div>
      <AddItemDialog
        addingItem={addingItem}
        input={input}
        setAddingItem={setAddingItem}
        setInput={setInput}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
