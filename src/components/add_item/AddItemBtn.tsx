import { FaCheck } from "react-icons/fa";
import { appendFileSync } from "fs";
import { join as joinPath } from "path";
import { todoFromString } from "@/todo/import";
import { priorityAsMd } from "@/types/priority";

export const AddItemBtn = ({
  input,
  setAddingItem,
  setTodos,
  setInput,
  todos,
}) => (
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
    onClick={() => {
      const newTodo = todoFromString(input);
      const appdataPath =
        process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/Library/Preferences"
          : process.env.HOME + "/.local/share");
      const localTodoPath = joinPath(appdataPath, "libellus", "todo.md");
      try {
        appendFileSync(
          localTodoPath,
          `- ${
            newTodo.completed
              ? `[Completed${
                  newTodo.completionDate
                    ? ` ${newTodo.completionDate.toLocaleDateString(
                        navigator.language,
                        { month: "2-digit", day: "2-digit", year: "numeric" }
                      )}`
                    : ""
                }] `
              : ""
          }${priorityAsMd(newTodo.priority)} ${newTodo.title}${
            newTodo.projects
              ? ` ${newTodo.projects?.map((proj) => `+${proj}`).join(" ")}`
              : ""
          }${
            newTodo.date
              ? ` {${newTodo.date.toLocaleDateString(navigator.language, {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}}`
              : ""
          }`
        );
        appendFileSync(localTodoPath, "\n");
      } catch (err) {}
      setTodos([newTodo, ...todos]);
      setAddingItem(false);
      setInput("");
    }}
  >
    <FaCheck className="mr-2" />
    <div>Add</div>
  </button>
);
