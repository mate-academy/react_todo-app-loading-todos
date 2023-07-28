/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FilterChoise } from '../types/FilterChoise';
import { TodosContext } from '../context/TodoContext';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';
import { wait } from '../utils/wait';

export const TodoApp: React.FC = () => {
  const [filterChoise, setFilterChoise] = useState(FilterChoise.All);

  const [todos, setTodos, errorMsg, setErrorMsg] = useContext(TodosContext);

  if (todos.length === -1) {
    setTodos([]);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filterChoise) {
      case FilterChoise.Active:
        return !todo.completed;
      case FilterChoise.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const uncompleatedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompleatedTodosText
    = uncompleatedTodos.length === 1 ? 'item' : 'items';

  const [allCompleated, setAllCompleated] = useState(
    uncompleatedTodos.length === 0,
  );

  useEffect(() => {
    setAllCompleated(uncompleatedTodos.length === 0);
  }, [uncompleatedTodos.length]);

  useEffect(() => {
    wait(3000)
      .then(() => setErrorMsg(''));
  }, [errorMsg]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length !== 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleated,
              })}
            />
          )}
          {/* Add a todo on form submit */}
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
              <TodoList todos={filteredTodos} />
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${uncompleatedTodos.length} ${uncompleatedTodosText} left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <TodoFilter
                filterChoise={filterChoise}
                setFilterChoise={setFilterChoise}
              />

              {/* don't show this button if there are no completed todos */}
              {completedTodos.length > 0 && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMsg },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMsg('')}
        />
        {errorMsg}
      </div>
    </div>
  );
};
