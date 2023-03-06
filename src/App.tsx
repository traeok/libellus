import nodeLogo from "./assets/node.svg";
import { Fragment, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaFilter,
  FaGithub,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "./App.scss";
import { TodoCard } from "./components/todo/TodoCard";
import { IoMoon, IoMoonOutline } from "react-icons/io5";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Todo } from "@/types/todo";
import * as path from "path";
import { appendFileSync, readFileSync } from "fs";

import { env } from "process";

const processTodo = (todoRaw: string): Todo => {
  const todo = todoRaw.replace(/\-\s/, "").trim();
  const completed = todo.startsWith("[Completed");

  const priorityMatch = todo.match(/(\(!{1,3}\))/);
  const priorityRaw = priorityMatch ? priorityMatch[1] : undefined;
  let priority;
  switch (priorityRaw) {
    case "(!)":
      priority = "low";
      break;
    case "(!!)":
      priority = "medium";
      break;
    case "(!!!)":
      priority = "high";
      break;
    default:
      break;
  }

  const projectList = todo.match(/\+([^\s]+)/g);
  const projects = projectList
    ? (projectList as string[]).map((proj) => proj.substring(1))
    : undefined;

  let title = todo.replace(/\(!{1,3}\)/, "");
  title = title.replace(/\+([^\s]+)/g, "");

  let date;

  // Due date in format "{date}"
  const delimitedTodo = todo.match(/\{([^\s\]\}\)]+)\}/);
  if (delimitedTodo) {
    date = new Date(delimitedTodo[1]);
    title = title.replace(`{${delimitedTodo[1]}}`, "");
  }

  if (completed) {
    const dateMatch = todo.match(/\[Completed (.+?)\]/);
    const dateString = dateMatch ? dateMatch[1].trim() : "";
    title = title.replace(/\[Completed (.+?)\]\s/, "").trim();

    if (dateString.length > 0) {
      const completionDate = new Date(dateString);

      return {
        completed,
        completionDate,
        date,
        title,
        priority,
        projects,
      };
    }
  }

  return {
    completed,
    date,
    title,
    priority,
    projects,
  };
};

const priorityToSymbol = (priority: string | undefined) => {
  switch (priority) {
    case "low":
      return "(!)";
    case "medium":
      return "(!!)";
    case "high":
      return "(!!!)";
    default:
      return null;
  }
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [addingItem, setAddingItem] = useState(false);

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", (e) => {
    const darkModeOn = e.matches;
    setIsDarkMode(darkModeOn);
  });

  useEffect(() => {
    const appdataPath =
      env.APPDATA ||
      (process.platform == "darwin"
        ? env.HOME + "/Library/Preferences"
        : env.HOME + "/.local/share");
    const localTodoPath = path.join(appdataPath, "libellus", "todo.md");
    try {
      const buffer = readFileSync(localTodoPath);

      const todoContents = buffer.toString();
      const todoList = todoContents.split(/\r?\n/);

      setTodos((oldTodos) =>
        todoList.map((todoRaw, i) => processTodo(todoRaw))
      );
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const NightModeIcon = isDarkMode ? IoMoon : IoMoonOutline;

  return (
    <div className="h-full">
      <div className="select-none flex sticky top-0 self-start justify-between items-center mt-4 mb-8 z-50 dark:bg-zinc-900">
        <div className="text-zinc-800 dark:text-zinc-100 flex items-center">
          <h2 className="ml-2 p-2 py-1 dark:bg-zinc-300 bg-zinc-500 text-zinc-100 dark:text-zinc-800 font-bold">
            libellus
          </h2>
        </div>
        <div className="ml-auto mr-2 flex items-center">
          <NightModeIcon
            size="1.5em"
            className="cursor-pointer mr-4 dark:text-zinc-100 text-zinc-800"
            onClick={(e) => setIsDarkMode((wasDark) => !wasDark)}
          />
          <button
            type="button"
            className="flex items-center align-center py-2 px-4 mr-2 text-sm font-medium text-zinc-900 focus:outline-none bg-zinc-100 rounded-lg hover:bg-zinc-300 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <FaFilter className="mr-3" />
            <div className="hide-mobile">Filter by...</div>
          </button>

          <button
            type="button"
            className="flex items-center align-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
            onClick={() => setAddingItem(true)}
          >
            <FaPlus className="mr-3" />
            <div className="hide-mobile">Add item</div>
          </button>
        </div>
        {/* <hr className="h-px border-0 mx-8 h-8 bg-zinc-300 dark:bg-zinc-700 mb-4" /> */}
      </div>
      <div className="z-10 w-full px-2 py-4 snap-mandatory snap-y overflow-y-auto h-5/6">
        {todos.map((todo: Todo, i) => (
          <TodoCard data={todo} key={`todo-entry-${i}`} />
        ))}
        {/* <TodoCard data={{ title: "Test high priority.", priority: "high" }} />
        <TodoCard
          data={{ title: "Test medium priority.", priority: "medium" }}
        />
        <TodoCard data={{ title: "Test low priority.", priority: "low" }} />
        <TodoCard data={{ title: "Test no priority" }} />
        <TodoCard data={{ title: "**Test bold.**" }} />
        <TodoCard data={{ title: "_Test italic._" }} />
        <TodoCard data={{ title: "~Test strikethrough.~" }} />
        <TodoCard
          data={{ title: "Test item with a project", projects: ["project"] }}
        />
        <TodoCard
          data={{
            title: "Test item with projects and priority",
            projects: ["projA", "projB"],
            priority: "low",
          }}
        />
        <TodoCard
          data={{
            title:
              "Test item with **all of the above**, ~accept~ _except_ with a long title. One might suggest breaking this down into multiple items, ***but*** it's still possible.",
            projects: ["projA", "projB"],
            priority: "medium",
          }}
        />
        <TodoCard data={{ title: "# Look ma, headers!" }} />
        <TodoCard data={{ completed: true, title: "Test completed." }} />
        <TodoCard
          data={{
            completed: true,
            title: "Test completed w/ date",
            completionDate: TEST_DATE,
          }}
        /> */}
      </div>
      <Transition appear show={addingItem} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setAddingItem(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black dark:bg-zinc-100 bg-opacity-25 dark:bg-opacity-20 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-zinc-600 dark:text-zinc-100 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    <div className="flex items-center">
                      Add item
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent p-1 ml-auto text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        onClick={() => setAddingItem(false)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-4">
                    <input
                      className="w-full rounded-md p-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-100 mb-4"
                      type="text"
                      placeholder="Start typing..."
                      value={input}
                      onInput={(e) =>
                        setInput((e.target as HTMLInputElement).value)
                      }
                    />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        const newTodo = processTodo(input);
                        const appdataPath =
                          env.APPDATA ||
                          (process.platform == "darwin"
                            ? env.HOME + "/Library/Preferences"
                            : env.HOME + "/.local/share");
                        const localTodoPath = path.join(
                          appdataPath,
                          "libellus",
                          "todo.md"
                        );
                        try {
                          appendFileSync(
                            localTodoPath,
                            `\n- ${
                              newTodo.completed
                                ? `[Completed${
                                    newTodo.completionDate
                                      ? ` ${newTodo.completionDate.toDateString()}`
                                      : ""
                                  }] `
                                : ""
                            }${priorityToSymbol(newTodo.priority) ?? ""} ${
                              newTodo.title
                            }${
                              newTodo.projects
                                ? newTodo.projects
                                    ?.map((proj) => `+${proj}`)
                                    .join(" ")
                                : ""
                            } ${newTodo.date ? `{Due ${newTodo.date}}` : ""}`
                          );
                        } catch (err) {}
                        setTodos([newTodo, ...todos]);
                        setAddingItem(false);
                        setInput("");
                      }}
                    >
                      <FaCheck className="mr-2" />
                      <div>Add</div>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;
