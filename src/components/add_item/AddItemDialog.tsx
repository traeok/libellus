import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  FaCheck,
  FaClock,
  FaPlus,
  FaRegCalendarCheck,
  FaTimes,
} from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { TbSquare, TbSquareCheck } from "react-icons/tb";

import { Priority } from "@/types/priority";
import { Dropdown } from "../menu/Dropdown";
import { IDropdownOption } from "@/types/menu";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Todo } from "@/types/todo";
import { exportTodo } from "@/todo/export";

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
  setAddingItem,
  setTodos,
  todos,
}) => {
  const [completed, setCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date | undefined>();
  const [completionDatePicker, setCompletionDatePicker] =
    useState<DateValueType>({
      startDate: null,
      endDate: null,
    });
  const [date, setDate] = useState<Date | undefined>();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(PRIORITY_OPTS[0]);
  const [dueDatePicker, setDueDatePicker] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [projects, setProjects] = useState<string[]>([]);
  const [addingProject, setAddingProject] = useState(false);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    switch (priority.value) {
      case Priority.None:
        break;
      case Priority.Low:
      case Priority.Medium:
      case Priority.High:
        break;
    }
  }, [priority]);

  useEffect(() => {
    if (!completed) {
      setCompletionDatePicker({
        startDate: null,
        endDate: null,
      });
      setCompletionDate(undefined);
    }
  }, [completed]);

  useEffect(() => {
    if (completionDatePicker?.startDate) {
      const newDate = new Date(completionDatePicker.startDate.toString());
      newDate.setDate(newDate.getDate() + 1);
      setCompletionDate(newDate);
    }
  }, [completionDatePicker]);

  useEffect(() => {
    if (dueDatePicker?.startDate) {
      const newDate = new Date(dueDatePicker.startDate.toString());
      newDate.setDate(newDate.getDate() + 1);
      setDate(newDate);
    }
  }, [dueDatePicker]);

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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 pb-2 text-zinc-600 dark:text-zinc-100 text-left align-middle shadow-xl transition-all">
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
                    placeholder="Title"
                    value={title}
                    onInput={(e) =>
                      setTitle((e.target as HTMLInputElement).value)
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
                        value={dueDatePicker}
                        onChange={(value, e) => {
                          setDueDatePicker(value);
                        }}
                      />
                      <Datepicker
                        inputClassName="mt-2 bg-zinc-800 dark:bg-zinc-800"
                        placeholder="Completion date"
                        toggleClassName="mt-1"
                        toggleIcon={() => <FaRegCalendarCheck />}
                        useRange={false}
                        asSingle
                        value={completionDatePicker}
                        onChange={(value, e) => {
                          setCompletionDatePicker(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <p className="font-medium">Projects</p>
                    <div className="bg-zinc-200 dark:bg-zinc-600 dark:bg-zinc-800 mt-2 p-2 rounded-md flex">
                      {projects.length > 0 &&
                        projects.map((proj) => (
                          <div className="w-fit select-text px-2 py-1 mx-1 rounded-xl text-center bg-teal-500 text-white font-bold">
                            {proj}
                          </div>
                        ))}
                      <div
                        className="ml-2 h-8 select-none cursor-pointer p-1 mx-1 rounded-xl text-center bg-zinc-600 opacity-75 hover:opacity-100 text-white font-bold"
                        onClick={() => setAddingProject(true)}
                      >
                        <div className="flex items-center w-fit">
                          <input
                            className="ml-1 w-28 bg-zinc-600 rounded-md"
                            type="text"
                            placeholder="Add new..."
                            value={newProject}
                            onInput={(e) =>
                              setNewProject(
                                (e.target as HTMLInputElement).value
                              )
                            }
                          />
                          <FaPlus
                            className="ml-2 mr-1"
                            onClick={() => {
                              setProjects([...projects, newProject]);
                              setNewProject("");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-2 py-1 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      const newTodo: Todo = {
                        completed,
                        completionDate,
                        date,
                        title,
                        priority: priority.value as Priority,
                        projects,
                      };
                      exportTodo(newTodo);
                      setTodos([newTodo, ...todos]);
                      setAddingItem(false);
                      setTitle("");
                    }}
                  >
                    <FaCheck className="mr-2 mt-[2px]" />
                    <div>Add</div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
