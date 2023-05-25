/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './Components/Todo';
import { Todo as TodoType } from './types/Todo';
import { getTodos } from './api/todos';
import { Notification } from './Components/Notification';
import { Filter } from './Components/Filter';

const USER_ID = 10539;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setFilteredTodos(response);
      })
      .catch(() => setError('Unable to Load todos'));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  useEffect(() => {
    switch (filter) {
      case 'Active': {
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      }

      case 'Completed': {
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      }

      default: {
        setFilteredTodos(todos);
      }
    }
  }, [filter]);

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const todoElements = filteredTodos.map(todo => (
    <Todo todo={todo} key={todo.id} />
  ));
  const countNotCompletedtodos = todos.filter(todo => (
    todo.completed === false
  )).length;

  const handleClose = () => {
    setError('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todoElements}
        </section>

        {todos.length > 0
          && (
            <Filter
              countNotCompletedtodos={countNotCompletedtodos}
              handleFilter={handleFilter}
              filter={filter}
            />
          )}
      </div>

      <Notification message={error} handleClose={handleClose} />
    </div>
  );
};
