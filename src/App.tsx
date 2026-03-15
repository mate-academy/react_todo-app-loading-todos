import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './todo/TodoHeader';
import { TodoMain } from './todo/TodoMain';
import { TodoFooter } from './todo/TodoFooter';
import { ErrorNotification } from './components/Error/ErrorNotification';

export enum FilterOption {
  Active = 'Active',
  Completed = 'Completed',
  default = 'Default',
}

export enum ErrorMessage {
  title = 'Title should not be empty',
  loading = 'Unable to load todos',
  default = '',
}

function FilteredTodos(todos: Todo[], filterOption: FilterOption) {
  switch (filterOption) {
    case FilterOption.Active:
      return todos.filter(x => !x.completed);

    case FilterOption.Completed:
      return todos.filter(x => x.completed);

    case FilterOption.default:
      return todos;

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

  const usingTodos = FilteredTodos(todos, filterOption);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(ErrorMessage.loading);
      }
    };

    load();
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

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {!USER_ID && <UserWarning message="Please set your USER_ID" />}
      {USER_ID && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
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
    </div>
  );
};
