import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

import { USER_ID, createTodo, deleteTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { SortFields } from './types/sortFields';
import { ErrorTypes } from './types/errorTypes';

import { UserWarning } from './UserWarning';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorTypes | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedField, setSelectedField] = useState(SortFields.default);

  const handleError = (error: ErrorTypes) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleError(ErrorTypes.UnableToLoad);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function onAddTodo({ title, userId, completed }: Omit<Todo, 'id'>) {
    createTodo({ title, userId, completed }).then(newTodo => {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    });
  }

  function onDeleteTodo(todoId: number) {
    deleteTodo(todoId).then(() => {
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    });
  }

  const visibleTodos = getVisibleTodos(todos, selectedField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addTodo={onAddTodo} />

        <Main
          todos={visibleTodos}
          deleteTodo={onDeleteTodo}
          setTodos={setTodos}
        />

        {todos.length > 0 && (
          <Footer
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            todos={todos}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
