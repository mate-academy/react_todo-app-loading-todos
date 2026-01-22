import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export enum FilterOption {
  Active = 'Active',
  Completed = 'Completed',
  default = '',
}

export enum ErrorMessage {
  title = 'Title should not be empty',
  loading = 'Unable to load todos',
  default = '',
}

function filteredTodos(todos: Todo[], filterOption: FilterOption) {
  switch (filterOption) {
    case 'Active':
      return todos.filter(x => {
        return !x.completed;
      });
    case 'Completed':
      return todos.filter(x => {
        return x.completed;
      });
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.default,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.default,
  );
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!todoTitle) {
      setErrorMessage(ErrorMessage.title);
    }
  }

  const usingTodos = filteredTodos(todos, filterOption);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(ErrorMessage.loading);
      }
    })();

    setTodoTitle('');
    inputRef.current?.focus();

    return undefined;
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(ErrorMessage.default);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleSubmit={handleSubmit}
          todos={usingTodos}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          inputRef={inputRef}
        ></TodoHeader>

        <TodoMain usingTodos={usingTodos}></TodoMain>

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          ></TodoFooter>
        )}
      </div>
      <ErrorNotification
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      ></ErrorNotification>
    </div>
  );
};
