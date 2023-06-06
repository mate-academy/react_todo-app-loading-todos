/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo as TypeTodo } from './types/Todo';
import { Todo } from './components/Todo';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';

const USER_ID = 10607;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<TypeTodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TypeTodo[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodosList(response);
        setFilteredTodos(response);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    switch (filter) {
      case 'All': {
        setFilteredTodos(todosList);
        break;
      }

      case 'Active': {
        setFilteredTodos(todosList.filter(todo => !todo.completed));
        break;
      }

      case 'Completed': {
        setFilteredTodos(todosList.filter(todo => todo.completed));
        break;
      }

      default: {
        setFilteredTodos(todosList);
      }
    }
  }, [filter]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  const handleFilterChange = (filteredBy: string) => {
    setFilter(filteredBy);
  };

  const todos = filteredTodos.map(todo => (
    <Todo todo={todo} key={todo.id} />
  ));

  const todosLeftCounter = todosList.filter(todo => (
    !todo.completed
  )).length;

  const handleErrorReset = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

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
          {todos}
        </section>

        {todosList.length > 0
          && (
            <Filter
              todosLeftCounter={todosLeftCounter}
              handleFilterChange={handleFilterChange}
              filter={filter}
            />
          )}
      </div>

      <Notification message={error} handleErrorReset={handleErrorReset} />
    </div>
  );
};
