import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

import { AddItemBtn } from "@/components/add_item/AddItemBtn";

export const AddItemDialog = ({
  addingItem,
  input,
  setAddingItem,
  setInput,
  setTodos,
  todos,
}) => (
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
