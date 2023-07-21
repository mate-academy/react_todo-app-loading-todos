/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';
import { TodosContext } from '../context/TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { wait } from '../utils/wait';

export const TodoApp: React.FC = () => {
  // const [todoTitle, setTodoTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  /* Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo

    hide err on request
  */

  const [todosPrep, setTodos, errorMsg, setErrorMsg] = useContext(TodosContext);

  // left for future tasks so lint doesn't complain
  if (todosPrep.length === -1) {
    setTodos([]);
  }

  const todos = todosPrep.filter((todo) => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const leftTodos = todosPrep.filter((todo) => !todo.completed);
  const completedTodos = todosPrep.filter((todo) => todo.completed);
  const leftTodosText = leftTodos.length === 1 ? 'item' : 'items';

  const [allCompleated, setAllCompleated] = useState(
    leftTodos.length === 0,
  );

  useEffect(() => {
    setAllCompleated(leftTodos.length === 0);
  }, [leftTodos.length]);

  useEffect(() => {
    wait(3000)
      .then(() => setErrorMsg(''));
  }, [errorMsg]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todosPrep.length > 0 && (
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

        {todosPrep.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodoList todos={todos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${leftTodos.length} ${leftTodosText} left`}
              </span>

              <TodosFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />

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
