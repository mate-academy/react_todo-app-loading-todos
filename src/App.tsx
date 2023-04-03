/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import {
  getTodos,
  addTodos,
  changeTodo,
  deleteTodos,
} from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const USER_ID = 6861;

enum Error {
  add = 'add',
  update = 'update',
  delete = 'delete',
}

export const App: React.FC = () => {
  const [todosOriginal, setTodosOriginal] = useState<Todo[] | undefined>();
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [activeTodo, setActiveTodo] = useState(0);
  const [statusTodo, setStatus] = useState('All');
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [idTodo, setIdTodo] = useState(0);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const fetchTodos = async () => {
    const todosArr: Todo[] = await getTodos(USER_ID);

    const activeCount = todosArr.filter(el => !el.completed).length;

    setTodosOriginal(todosArr);
    setTodos(todosArr);
    setActiveTodo(activeCount);
    setIdTodo(0);
  };

  const createTodo = async (value: string) => {
    const deal = {
      id: 1,
      userId: USER_ID,
      title: value,
      completed: false,
    };

    setIdTodo(1);

    if (todosOriginal) {
      setTodos([...todosOriginal, deal]);
    }

    try {
      await addTodos('/todos', {
        userId: USER_ID,
        title: value,
        completed: false,
      });
      fetchTodos();
    } catch {
      if (todosOriginal) {
        setTodos(todosOriginal);
      }

      setIdTodo(0);
      setError(Error.add);
      setTimeout(() => setError(null), 3000);
    }

    setQuery('');
  };

  const updateTodo = async (
    id: number,
    value: string,
    complete: boolean,
  ) => {
    setIdTodo(id);

    try {
      await changeTodo(`/todos/${id}`, {
        title: value,
        completed: complete,
      });
      fetchTodos();
    } catch {
      setIdTodo(0);
      setError(Error.update);
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteTodo = async (id: number) => {
    setIdTodo(id);

    try {
      await deleteTodos(`/todos/${id}`);
      fetchTodos();
    } catch {
      setIdTodo(0);
      setError(Error.delete);
      setTimeout(() => setError(null), 3000);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchTodos();
  }, []);

  const statusTodosHandler = async (value: string) => {
    let newTodos: Todo[] | undefined = [];

    switch (value) {
      case 'Active':
        newTodos = todosOriginal?.filter((ele: Todo) => !ele.completed);
        setAll(false);
        setActive(true);
        setCompletedTodo(false);
        setTodos(newTodos);

        return;
      case 'Completed':
        newTodos = todosOriginal?.filter((ele: Todo) => ele.completed);
        setAll(false);
        setActive(false);
        setCompletedTodo(true);
        setTodos(newTodos);

        return;
      default:
        setAll(true);
        setActive(false);
        setCompletedTodo(false);
        setTodos(todosOriginal);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {(todos && todos.length > 0) && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: (activeTodo === 0) },
              )}
            />
          )}

          <form
            onSubmit={() => createTodo(query)}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setError(null);
              }}
            />
          </form>
        </header>

        {todos && (
          <TodoList
            todos={todos}
            updateTodo={updateTodo}
            idTodo={idTodo}
            deleteTodo={deleteTodo}
          />
        )}

        {!!todosOriginal?.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodo} items left`}
            </span>

            <TodoFilter
              all={all}
              active={active}
              completedTodo={completedTodo}
              statusTodosHandler={statusTodosHandler}
              statusTodo={statusTodo}
              setStatus={setStatus}
            />

            {activeTodo !== todosOriginal.length && (
              <button
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={error !== Error.add}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        Unable to add a todo
      </div>

      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={error !== Error.update}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        Unable to update a todo
      </div>

      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={error !== Error.delete}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        Unable to delete a todo
      </div>
    </div>
  );
};
