/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Errors } from './types/Errors';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState('');

  const [errors, setNewError] = useState<Errors>('');

  const [filterBy, setFilterBy] = useState<Filter>('All');

  useEffect(() => {
    getTodos()
      .then(todosList => setTodos(todosList))
      .catch(() => setNewError('Unable to load todos'));
  }, []);

  useEffect(() => {
    setTimeout(() => setNewError(''), 3000);
  }, [errors]);

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formElements = form.elements as typeof form.elements & {
      todo: HTMLInputElement;
    };

    const value = formElements.todo.value;

    // TBD
    return value;
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.every((todo: Todo) => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={addNewTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              name="todo"
              value={newTodo}
              onChange={e => setNewTodo(e.currentTarget.value)}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeFilter={filterBy}
            updateFilter={setFilterBy}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: errors === '',
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errors}
      </div>
    </div>
  );
};
