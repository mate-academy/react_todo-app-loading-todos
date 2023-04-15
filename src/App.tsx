import React, { useEffect, useMemo, useState } from "react";
import { UserWarning } from "./UserWarning";
import { getTodos } from "./api/todos";
import { Todo } from "./types/Todo";
import { ListofTodo } from "./Components/ListofTodo/ListofTodo";
import { Error } from "./Components/Error/Error";
import { FilterTodo } from "./Components/FilterTodo/FilterTodo";
import { FilterStatus } from "./types/FilterStatus";

const USER_ID = 6429;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.all);
  const activeTodosСount = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);
  const completedTodos = useMemo(() => {
    return todos.filter(({ completed }) => completed).length;
  }, [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((result) => setTodos(result))
      .catch(() => setError("Unable to load the todos"));
  }, []);

  const currentTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case FilterStatus.active:
          return !todo.completed;

        case FilterStatus.completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active">
            {" "}
          </button>
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <ListofTodo todos={currentTodos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">{`${activeTodosСount} items left`}</span>

              <FilterTodo filter={filter} onFilterChange={setFilter} />

              {completedTodos !== 0 && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>
      {error && <Error error={error} onClear={() => setError(" ")} />}
    </div>
  );
};
