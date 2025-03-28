/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { delTodos } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
export const App: React.FC = () => {
  const [isInput, setIsInput] = useState('');
  const [isTodo, setTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [errorType, setErrorType] = useState<string | null>(null);

  const handleError = (type: string) => {
    setErrorType(type);
    setTimeout(() => setErrorType(null), 3000);
  };

  useEffect(() => {
    if (!USER_ID) {
      return <UserWarning />;
    }

    getTodos()
      .then(data => setTodo(Array.isArray(data) ? data : []))
      .catch(() => {
        handleError('Unable to load todos');
      })
      .finally(() => {});
  }, []);

  const getFilter = () => {
    switch (filter) {
      case 'active':
        return isTodo.filter(todo => !todo.completed);
      case 'completed':
        return isTodo.filter(todo => todo.completed);
      default:
        return isTodo;
    }
  };

  const handleRemoveTodo = (todoId: number) => {
    delTodos(todoId).then(() => {
      setTodo(currentTodos =>
        Array.isArray(currentTodos)
          ? currentTodos.filter(todo => todo.id !== todoId)
          : [],
      );
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {<TodoHeader isInput={isInput} setIsInput={setIsInput} />}
        {<TodoList getFilter={getFilter} handleRemoveTodo={handleRemoveTodo} />}

        {/* Hide the footer if there are no todos */}
        {isTodo.length > 0 && (
          <TodoFooter setFilter={setFilter} isTodo={isTodo} filter={filter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification setErrorType={setErrorType} errorType={errorType} />
    </div>
  );
};
