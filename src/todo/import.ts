import { priorityFromRegex } from "@/types/priority";
import { Todo } from "@/types/todo";
import { readFileSync } from "fs";
import { join as joinPath } from "path";

export const todoFromString = (todoRaw: string): Todo => {
  const todo = todoRaw.replace(/\-\s/, "").trim();
  const completed = todo.startsWith("[Completed");

  const priorityMatch = todo.match(/\((!{1,3})\)/);
  const priorityRaw = priorityMatch ? priorityMatch[1] : undefined;
  const priority = priorityFromRegex(priorityRaw);

  const projectList = todo.match(/\+([^\s]+)/g);
  const projects = projectList
    ? (projectList as string[]).map((proj) => proj.substring(1))
    : undefined;

  let title = todo.replace(/\(!{1,3}\)/, "");
  title = title.replace(/\+([^\s]+)/g, "").trim();

  let date;

  // Due date in format "{date}"
  const delimitedTodo = todo.match(/\{([^\s\]\}\)]+)\}/);
  if (delimitedTodo) {
    date = new Date(delimitedTodo[1]);
    title = title.replace(`{${delimitedTodo[1]}}`, "").trim();
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

export const parseTodosInAppdata = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const appdataPath =
    process.env.APPDATA ||
    (process.platform == "darwin"
      ? process.env.HOME + "/Library/Preferences"
      : process.env.HOME + "/.local/share");
  const localTodoPath = joinPath(appdataPath, "libellus", "todo.md");
  try {
    const buffer = readFileSync(localTodoPath);
    if (!buffer.toString().trim().length) {
      return;
    }

    const todoContents = buffer.toString();
    const todoList = todoContents.split(/\r?\n/);

    setTodos((_oldTodos: Todo[]) =>
      todoList
        .filter((todoString) => todoString.length > 0)
        .map((todoRaw, i) => todoFromString(todoRaw))
    );
  } catch (err) {}
};
