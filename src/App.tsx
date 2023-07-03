import React, { useEffect, useState } from 'react';
import { Todo } from './components/Todo';
import { Todo as TodoType } from './types/Todo';
import { getTodos, createTodo } from './api/todos';
import { Notification } from './components/Notification';
import { Filter } from './components/Filter';

const USER_ID = 10915;

enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos);
  const [filter, setFilter] = useState(FilterType.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setFilteredTodos(response);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  useEffect(() => {
    switch (filter) {
      case FilterType.Active: {
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      }

      case FilterType.Completed: {
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      }

      default: {
        setFilteredTodos(todos);
      }
    }
  }, [filter, todos]);

  const handleFilter = (value: FilterType) => {
    setFilter(value);
  };

  const handleCreateTodo = (title: string) => {
    createTodo({
      userId: USER_ID,
      title,
      completed: false,
      id: 0,
    })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
      })
      .catch(() => setError('Unable to create todo'));
  };

  const todoElements = filteredTodos.map(todo => (
    <Todo todo={todo} key={todo.id} />
  ));
  const countNotCompletedtodos = todos.filter(todo => !todo.completed).length;

  const handleClose = () => {
    setError('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form
            onSubmit={e => {
              e.preventDefault();
              const newTodoTitle = (e.target as HTMLFormElement)['new-todo']
                .value;

              handleCreateTodo(newTodoTitle);
              (e.target as HTMLFormElement).reset();
            }}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              name="new-todo"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todoElements}
        </section>

        {todos.length > 0 && (
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
