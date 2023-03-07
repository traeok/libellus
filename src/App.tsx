import { useEffect, useState } from "react";
import "./App.scss";
import { TodoCard } from "./components/todo/TodoCard";
import { Todo } from "@/types/todo";
import { parseTodosInAppdata } from "@/todo/import";
import { AddItemDialog } from "./components/add_item/AddItemDialog";
import { MenuBar } from "./components/menu/MenuBar";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    parseTodosInAppdata(setTodos);
  }, []);

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
      <div className="z-10 w-full px-2 py-4 snap-mandatory snap-y overflow-y-auto h-5/6">
        {todos.map((todo: Todo, i) => (
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
