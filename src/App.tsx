/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { getTodos } from './api/todos';

const USER_ID = 11230;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isError, setIsError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(setIsError);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const preparedTodos = [...todos]
    .filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedTitle = todo.title.toLowerCase().trim();

      return query ? normalizedTitle.includes(normalizedQuery) : true;
    })
    .filter((todo) => {
      switch (filterType) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        default: return todo;
      }
    });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
        />

        {todos && (
          <section className={cn("todoapp__main")} data-cy="TodoList">
            {preparedTodos.map((todo: Todo) => {
              return (
                <div
                  key={todo.id}
                  className={cn('todo', {
                    'completed': todo.completed,
                  })}
                >
                  {/* This is a completed todo */}
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => { }}
                    />
                  </label>

                  <span className="todo__title">{todo.title}</span>

                  {/* Remove button appears only on hover */}
                  <button type="button" className="todo__remove">x</button>

                  {/* overlay will cover the todo while it is being updated */}
                  <div className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              )
            })}
          </section>
        )}

        {todos && (
          <Footer
            filterType={filterType}
            setFilterType={setFilterType}
            quantity={todos.length}
            // haveCompleted={todos.some((todo) => todo.completed === true)}
          />
        )}
      </div>

      {isError && (
        <>
          {/* Notification is shown in case of any error */ }
          {/* Add the 'hidden' class to hide the message smoothly */}
          <div className="notification is-danger is-light has-text-weight-normal">
            <button type="button" className="delete" />

            {/* show only one message at a time */}
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </div>
        </>
      )}
    </div>
  );
};
