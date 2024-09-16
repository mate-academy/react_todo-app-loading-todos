/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Filter } from './types/Filter';
import { TodoItem } from './components/TodoItem';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const USER_ID = 1414;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [userId] = useState(USER_ID);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        const timeoutId = setTimeout(() => {
          setError('');
        }, 3000);

        return () => clearTimeout(timeoutId);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const reset = () => {
    setTitle('');
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitle(title);

    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    createTodo({
      title,
      userId,
      completed,
    })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        reset();
      })
      .catch(() => setError('Unable to add a todo'));
  };

  const handleToggle = (todoId: number) => {
    setCompleted(true);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError('');
  };

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {!isloading && (
        <>
          <div className="todoapp__content">
            <Header
              todosLen={todos.length}
              onSubmit={handleSubmit}
              onReset={reset}
              isAllCompleted={isAllCompleted}
              title={title}
              onTitleChange={handleTitleChange}
            />

            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} onChange={handleToggle} />
              ))}
            </section>

            {todos.length > 0 && (
              <Footer
                todos={todos}
                filter={filter}
                onFilterChange={handleFilterChange}
                hasCompleted={hasCompleted}
              />
            )}
          </div>
        </>
      )}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        <div>{error}</div>
      </div>
    </div>
  );
};
