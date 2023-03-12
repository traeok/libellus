import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaRegCalendarCheck,
  FaTimes,
} from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { TbSquare, TbSquareCheck } from "react-icons/tb";

import { AddItemBtn } from "@/components/add_item/AddItemBtn";
import {
  findPriority,
  hasPriority,
  Priority,
  priorityAsNumber,
  removePriority,
} from "@/types/priority";
import { Dropdown } from "../menu/Dropdown";
import { IDropdownOption } from "@/types/menu";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { todoFromString } from "@/todo/import";

const PRIORITY_OPTS: IDropdownOption[] = [
  {
    title: "None",
    value: Priority.None,
  },
  {
    title: "Low",
    icon: FcLowPriority,
    value: Priority.Low,
  },
  {
    title: "Medium",
    icon: FcMediumPriority,
    value: Priority.Medium,
  },
  {
    title: "High",
    icon: FcHighPriority,
    value: Priority.High,
  },
];

export const AddItemDialog = ({
  addingItem,
  input,
  setAddingItem,
  setInput,
  setTodos,
  todos,
}) => {
  const [completed, setCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [priority, setPriority] = useState(PRIORITY_OPTS[0]);
  const [dueDate, setDueDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    let newInput = input;
    if (hasPriority(input)) {
      newInput = removePriority(input);
    }

    switch (priority.value) {
      case Priority.None:
        setInput(newInput);
        break;
      case Priority.Low:
      case Priority.Medium:
      case Priority.High:
        setInput(`${priority.value.toString()} `.concat(newInput));
        break;
    }
  }, [priority]);

  useEffect(() => {
    if (!completed) {
      let newInput = input.replace(/\[Completed\s?(.+?)?\]/, "").trim();
      setInput(newInput);
      setCompletionDate({
        startDate: null,
        endDate: null,
      });
    } else if (completed) {
      if (completionDate?.startDate == null) {
        setInput("[Completed] ".concat(input).trim());
      }
    }
  }, [completed]);

  useEffect(() => {
    if (completionDate?.startDate) {
      setCompleted(true);
      let newInput = input.replace(/\[Completed (.+?)?\]/, "");
      const newDate = new Date(completionDate.startDate.toString());
      newDate.setDate(newDate.getDate() + 1);
      setInput(
        `[Completed ${newDate.toLocaleDateString(navigator.language)}] `.concat(
          newInput
        )
      );
    }
  }, [completionDate]);

  useEffect(() => {
    if (dueDate?.startDate) {
      let newInput = input.replace(/\s\{(.+?)\}/, "").trim();
      const newDate = new Date(dueDate.startDate.toString());
      newDate.setDate(newDate.getDate() + 1);
      setInput(
        newInput.concat(` {${newDate.toLocaleDateString(navigator.language)}}`)
      );
    }
  }, [dueDate]);

  useEffect(() => {
    if (hasPriority(input) && priority.value === Priority.None) {
      setPriority(PRIORITY_OPTS[priorityAsNumber(findPriority(input))]);
    }

    const todo = todoFromString(input);
    setProjects(todo.projects ?? []);
  }, [input]);

  return (
    <Transition appear show={addingItem} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 text-zinc-600 dark:text-zinc-100 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
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
                <div className="my-4">
                  <input
                    className="w-full rounded-md p-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-100 mb-4"
                    type="text"
                    placeholder="Start typing..."
                    value={input}
                    onInput={(e) =>
                      setInput((e.target as HTMLInputElement).value)
                    }
                  />
                  <hr className="mt-2 w-full h-1 bg-zinc-100 border-0 rounded dark:bg-zinc-700" />
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div
                        className="inline-flex items-center select-none cursor-pointer text-zinc-600 dark:text-zinc-100 font-medium"
                        onClick={() => setCompleted(!completed)}
                      >
                        {completed ? (
                          <TbSquareCheck className="mr-2" size="1.5em" />
                        ) : (
                          <TbSquare className="mr-2" size="1.5em" />
                        )}
                        Completed
                      </div>
                      <Dropdown
                        activeItem={priority}
                        items={PRIORITY_OPTS}
                        setActiveItem={setPriority}
                        title="Priority"
                      />
                    </div>

                    <div className="w-56">
                      <Datepicker
                        inputClassName="mt-2 bg-zinc-800 dark:bg-zinc-800"
                        placeholder="Due date"
                        toggleClassName="mt-1"
                        toggleIcon={() => <FaClock />}
                        useRange={false}
                        asSingle
                        value={dueDate}
                        onChange={(value, e) => {
                          setDueDate(value);
                        }}
                      />
                      <Datepicker
                        inputClassName="mt-2 bg-zinc-800 dark:bg-zinc-800"
                        placeholder="Completion date"
                        toggleClassName="mt-1"
                        toggleIcon={() => <FaRegCalendarCheck />}
                        useRange={false}
                        asSingle
                        value={completionDate}
                        onChange={(value, e) => {
                          setCompletionDate(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <p className="font-medium">Projects</p>
                    <div className="bg-zinc-200 dark:bg-zinc-600 dark:bg-zinc-800 mt-2 p-2 rounded-md inline-flex">
                      {projects.length > 0 ? (
                        projects.map((proj) => (
                          <div className="w-fit select-text px-2 mx-1 rounded-xl text-center bg-teal-500 text-white font-bold">
                            {proj}
                          </div>
                        ))
                      ) : (
                        <div className="text-zinc-500">No projects added</div>
                      )}
                    </div>
                  </div>
                </div>
                <AddItemBtn
                  input={input}
                  setInput={setInput}
                  setAddingItem={setAddingItem}
                  setTodos={setTodos}
                  todos={todos}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
