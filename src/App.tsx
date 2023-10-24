/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoItem } from './components/TodoItem';
import { getTodos } from './api/todos';
import { TodoError } from './components/TodoError';
import { ErrorMessageEnum } from './types/ErrorMessageEnum';

const USER_ID = 11385;

export const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessageEnum | ''>('');
  const [hasMistake, setHasMistake] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      setHasMistake(true);

      const timeoutId = setTimeout(() => {
        setHasMistake(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    setHasMistake(false);

    return () => {};
  }, [errorMessage]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessageEnum.TodoLoadError));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilter = (newFilter: string) => {
    setActiveFilter(newFilter);
  };

  const handleTodoCompletedUpdate = (
    todoId: number,
    newCompletedStatus: boolean,
  ) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: newCompletedStatus };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const maxId = Math.max(0, ...todos.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      userId: USER_ID,
      title: query,
      completed: false,
    };

    if (!newTodo.title.trim()) {
      setErrorMessage(ErrorMessageEnum.TitleError);
      setHasMistake(!hasMistake);
    }

    if (newTodo.title.trim()) {
      setTodos([...todos, newTodo]);
    }

    setQuery('');
  };

  const handleDelete = (deletedTodo: Todo) => {
    const updateTodo = todos.filter(todo => todo.id !== deletedTodo.id);

    setTodos(updateTodo);
  };

  const handleDeleteUncomplete = () => {
    const updateTodo = todos.filter(todo => !todo.completed);

    setTodos(updateTodo);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              value={query}
              placeholder="What needs to be done?"
              onChange={handleQuery}
            />
          </form>
        </header>

        <TodoItem
          todos={todos}
          deleteTodo={handleDelete}
          todoCompleteUpdate={handleTodoCompletedUpdate}
          activeFilter={activeFilter}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <TodoFilter
              todos={todos}
              activeFilter={activeFilter}
              onFilterChange={handleFilter}
              deleteUncompletedtodos={handleDeleteUncomplete}
            />
          </footer>
        )}

        {/* Hide the footer if there are no todos */}
      </div>

      <TodoError
        errorMessage={errorMessage}
        hasMistake={hasMistake}
        setHasMistake={setHasMistake}
      />

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
    </div>
  );
};
