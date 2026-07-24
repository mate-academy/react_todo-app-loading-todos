/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { USER_ID, getTodos } from './api/todos';
import { todoFilterPredicates } from './utils/todoFilterPredicates';

import { Todo } from './types/Todo';
import { TodoFilterEnum } from './enums/TodoFilter';
import { ErrorsEnum } from './enums/ErrorMessage';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

import { useAutoDismissError } from './hooks/useAutoDismissError';

export const App: React.FC = () => {
  const [todos, addTodo] = useState<Todo[]>([]);
  const [todoFilter, setTodosFilter] = useState<TodoFilterEnum>(
    TodoFilterEnum.All,
  );

  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = useCallback((todo: Todo) => {
    addTodo(prev => [...prev, { ...todo }]);
  }, []);
  const handleSetErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);
  const handleCloseErrorMessage = useCallback(() => setErrorMessage(''), []);

  useEffect(() => {
    getTodos()
      .then(addTodo)
      .catch(() => setErrorMessage(ErrorsEnum.Load));
  }, []);

  useAutoDismissError(errorMessage, handleCloseErrorMessage);

  const visibleTodos = useMemo(() => {
    return todos.filter(todoFilterPredicates[todoFilter]);
  }, [todos, todoFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isAllTodoCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);
  const hasTodos = todos.length > 0;
  const leftItems = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header>
          <TodoForm
            onAddTodo={handleAddTodo}
            onSetErrorMessage={handleSetErrorMessage}
            hasTodos={hasTodos}
            isAllTodoCompleted={isAllTodoCompleted}
          />
        </Header>

        <TodoList todos={visibleTodos} />

        {hasTodos && (
          <TodoFilter
            todoFilter={todoFilter}
            leftItems={leftItems}
            hasCompletedTodo={hasCompletedTodo}
            onFilterChange={setTodosFilter}
          />
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        message={errorMessage}
        onCloseError={handleCloseErrorMessage}
      />
    </div>
  );
};
