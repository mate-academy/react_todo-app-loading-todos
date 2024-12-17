/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoStatus } from './types/TodoStatus';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { TodoError } from './components/TodoError';
import { getTodos } from './api/todos';
import { ErrorStatus } from './types/ErrorStatus';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(TodoStatus.all);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(ErrorStatus.LOAD_TODOS));
  }, []);

  function getVisibleTodos(newTodos: Todo[], newFilter: TodoStatus) {
    switch (newFilter) {
      case TodoStatus.active:
        return newTodos.filter(todo => !todo.completed);

      case TodoStatus.completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <TodoError error={errorMessage} />
    </div>
  );
};
