/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, postTodo } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorNotification, ErrorType } from './components/ErrorNotification';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('load'));
  }, []);

  const filteredTodo = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
          return todo;
        default:
          return true;
      }
    });
  }, [filter, todos]);

  const addTodo = (newTodoTitle: string) => {
    postTodo({ title: newTodoTitle, userId: USER_ID, completed: false }).then(
      newTodo => {
        setTodos(curTodos => [...curTodos, newTodo]);
      },
    );
  };

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} onAdd={addTodo} />
        <TodoList todos={filteredTodo} />
        <Footer onFilter={setFilter} todos={todos} filter={filter} />
      </div>

      <ErrorNotification errorType={error} onClose={handleCloseError} />
    </div>
  );
};
