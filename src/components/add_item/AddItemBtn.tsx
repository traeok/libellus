import { FaCheck } from "react-icons/fa";
import { join as joinPath } from "path";
import { todoFromString } from "@/todo/import";

import { env } from "process";
import { createAndExportTodo } from "@/todo/export";

export const AddItemBtn = ({
  input,
  setAddingItem,
  setTodos,
  setInput,
  todos,
}) => (
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-2 py-1 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
    onClick={() => {
      const newTodo = createAndExportTodo(input);
      setTodos([newTodo, ...todos]);
      setAddingItem(false);
      setInput("");
    }}
  >
    <FaCheck className="mr-2 mt-[2px]" />
    <div>Add</div>
  </button>
);
