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

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [createTodo, setCreateTodo] = useState<string>('');
  const [filter, setFilter] = useState(FilterTypes.All);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    setIsLoader(true);

    client.get(USER_ID);
  }, []);

  const handleAddTodo = (
    e: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (createTodo.trim() !== '' && e.key === 'Enter') {
      const newTodo: Todo = {
        id: Date.now(),
        userId: Date.now(),
        title: createTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setCreateTodo('');
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
    e: any,
  ) => {
    e.preventDefault();
    setFilter(e.target.value as FilterTypes);
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

        {!isLoader
          ? <Loader />
          : (
            <Todos
              onRemove={removeTodo}
              todos={filteredTodos}
            />
          )}
        {/* Hide the footer if there are no todos */}
        <TodoFilter
          todos={todos}
          onFilterType={filterTodos}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        {/* <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
