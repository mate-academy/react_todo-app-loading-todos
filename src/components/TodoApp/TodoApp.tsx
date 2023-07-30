import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './TodoApp.scss';
import { Filter } from '../Filter/Filter';
import { Todo } from '../Todo/Todo';
import { TodoType } from '../../types/TodoType';
import { getTodos } from '../../api/todos';

type Props = {
  userId: number;
};

function filterTodos(todo: TodoType, todoFilter: string) {
  switch (todoFilter) {
    case '':
      return true;

    case 'active':
      return !todo.completed;

    case 'completed':
      return todo.completed;

    default:
      throw new Error('Undefined error');
  }
}

export const TodoApp: React.FC<Props> = ({ userId }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [todoFilter, setTodoFilter] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = [...todos].filter(todo => (
    filterTodos(todo, todoFilter)
  ));

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* eslint-disable-next-line */}
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
            />
          ))}
        </section>

        {(todos.length > 0) && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            <Filter todoFilter={todoFilter} handleFilter={setTodoFilter} />

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
      </div>
    </div>
  );
};
