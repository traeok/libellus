import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

import "./App.scss";
import { Todo } from "@/types/todo";
import { parseTodosInAppdata } from "@/todo/import";
import { AddItemDialog } from "@/components/add_item/AddItemDialog";
import { TodoCard } from "@/components/todo/TodoCard";
import { SortDropdown } from "@/components/menu/SortDropdown";
import { MenuBar } from "@/components/menu/MenuBar";
import { SortBy, SortDirection, SortOptions, sortTodos } from "@/types/sorting";

const App = () => {
  const [sort, setSort] = useState({
    ...SortOptions[SortBy.MostRecent],
    direction: SortDirection.Normal,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    parseTodosInAppdata(setTodos);
  }, []);

  useDeepCompareEffect(() => {
    let newTodos = [...todos];
    if (sort.value === SortBy.MostRecent) {
      // leave as-is
    } else {
      newTodos.sort(
        sortTodos(sort.value as Exclude<SortBy, SortBy.MostRecent>)
      );
    }

    if (
      sort.direction ===
      (sort.value === SortBy.MostRecent
        ? SortDirection.Normal
        : SortDirection.Reverse)
    ) {
      newTodos.reverse();
    }

    setSortedTodos(newTodos);
  }, [sort, todos]);

  return (
    <div className="h-full">
      <div className="select-none flex sticky top-0 self-start justify-between items-center mt-4 mb-8 z-30 dark:bg-zinc-900">
        <div className="text-zinc-800 dark:text-zinc-100 flex items-center">
          <h2 className="ml-2 p-2 py-1 dark:bg-zinc-300 bg-zinc-500 text-zinc-100 dark:text-zinc-800 font-bold">
            libellus
          </h2>
        </div>
        <MenuBar setAddingItem={setAddingItem} />
      </div>
      <div className="flex flex-row-reverse items-center mb-2">
        <SortDropdown sort={sort} setSort={setSort} />
        <hr className="ml-2 grow-0 shrink w-full h-1 bg-zinc-100 border-0 rounded dark:bg-zinc-700" />
      </div>
      <div className="z-10 w-full px-2 py-4 snap-mandatory snap-y overflow-y-auto h-5/6">
        {sortedTodos.map((todo: Todo, i) => (
          <TodoCard data={todo} key={`todo-entry-${i}`} setTodos={setTodos} />
        ))}
      </div>
      <AddItemDialog
        addingItem={addingItem}
        setAddingItem={setAddingItem}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
};

export default App;
