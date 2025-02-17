/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, addTodos, deleteTodos, getTodos } from './api/todos';
import { Header } from './Components/Header/Header';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { TodoList } from './Components/TodoList/TodoList';
import { Errors } from './Components/Errors/Errors';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState('');

  function onAdd({ userId, title, completed }: Todo) {
    addTodos({ userId, title, completed }).then(newTodo => {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    });
  }

  function onDelete(todoId: number) {
    deleteTodos(todoId);
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setTimeout(() => setError(''), 3000));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={filteredTodos} onSubmit={onAdd} />

        <TodoList todos={filteredTodos} onDelete={onDelete} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer status={status} onClick={setStatus} itemsLeft={itemsLeft} />
        )}
      </div>
      <Errors error={error} onClose={() => setError('')} />
    </div>
  );
};
