/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Loader } from './components/Loader';
import { TodoFilter, FilterTypes } from './components/TodoFilter';
import { Todos } from './components/Todos';

import { client } from './utils/fetchClient';

import { Todo } from './types/Todo';

const USER_ID = '10682';

const TODO_ERRORS = {
  add: ' Unable to add a todo',
  delete: 'Unable to delete a todo',
  update: 'Unable to update a todo',
};

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [createTodo, setCreateTodo] = useState<string>('');
  const [filter, setFilter] = useState(FilterTypes.All);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoader(true);

    client.get((USER_ID)).then(
      fetchedTodos => {
        setTodos(fetchedTodos as Todo[]);
        setIsLoader(false);
      },
    );
  }, []);

  const handleAddTodo = (
    e: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (createTodo.trim() !== '' && e.key === 'Enter') {
      const newTodo: Omit<Todo, 'id'> = {
        userId: Number(USER_ID),
        title: createTodo,
        completed: false,
      };

      client.post(USER_ID, newTodo).then((todo) => {
        setTodos((prevTodos) => [...prevTodos, todo as Todo]);
        setCreateTodo('');
        if (error && error === TODO_ERRORS.add) {
          setError('');
        }
      }).catch(() => setError(TODO_ERRORS.add));
    }
  };

  const handleCreateTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCreateTodo(e.target.value);
  };

  const removeTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const filteredTodos = filter === FilterTypes.All
    ? todos
    : todos.filter((todo) => {
      if (filter === FilterTypes.Completed) {
        return todo.completed;
      }

      return !todo.completed;
    });

  const filterTodos = (
    type: FilterTypes,
  ) => {
    // e.preventDefault();
    setFilter(type);
  };

  const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // console.log(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={preventSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={createTodo}
              onChange={handleCreateTodo}
              onKeyDown={handleAddTodo}
            />
          </form>
        </header>

        {isLoader
          ? <Loader />
          : (
            <Todos
              onRemove={removeTodo}
              todos={filteredTodos}
            />
          )}
        {/* Hide the footer if there are no todos */}
        {todos.length ? (
          <TodoFilter
            todos={todos}
            onFilterType={filterTodos}
          />
        ) : undefined}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />

          {error}
        </div>
      )}
    </div>
  );
};
