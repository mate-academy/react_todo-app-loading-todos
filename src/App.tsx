/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import {
  deleteTodo, getTodos, patchTodo, postTodo,
} from './api/todos';
import { FilterTodoBy } from './types/FilterTodoBy';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 10331;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterTodoBy>(FilterTodoBy.ALL);

  const handleChangeFilter = (type: FilterTodoBy) => setTypeFilter(type);

  const numberOfItemsLeft = todos
    .filter(({ completed }) => !completed).length;

  const hasCompletedTodos = numberOfItemsLeft !== todos.length;
  const hasTodos = todos.length > 0;

  const visibleTodos = todos.filter(({ completed }) => {
    switch (typeFilter) {
      case FilterTodoBy.ACTIVE:
        return !completed;
      case FilterTodoBy.COMPLETED:
        return completed;
      default:
        return true;
    }
  });

  const clearValue = () => setTodoValue('');

  const fetchTodos = () => {
    getTodos(USER_ID).then(setTodos);
  };

  const handleAddTodo = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      userId: USER_ID,
      title: todoValue,
      completed: false,
    };

    await postTodo(USER_ID, newTodo);
    fetchTodos();
    clearValue();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleChangeTodoCompleted = async (id: number, completed: boolean) => {
    await patchTodo(id, { completed: !completed });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {hasTodos && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: numberOfItemsLeft === 0,
              })}
            />
          )}

          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoValue}
              onChange={(event) => setTodoValue(event.target.value)}
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
          onChangeCompleted={handleChangeTodoCompleted}
          onDelete={handleDeleteTodo}
        />

        {hasTodos && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${numberOfItemsLeft} items left`}
            </span>

            <TodoFilter
              typeFilter={typeFilter}
              onChangeFilter={handleChangeFilter}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              hidden={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {false && (
        <div className="notification is-danger is-light has-text-weight-normal">
          {/* Notification is shown in case of any error */}
          {/* Add the 'hidden' class to hide the message smoothly */}
          <button type="button" className="delete" />

          {/* show only one message at a time */}
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
