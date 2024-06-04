/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './Components/Header/Header';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { TodoList } from './Components/TodoList/TodoList';
import { Errors } from './Components/Errors/Errors';

function idTodo(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [error, setError] = useState('');

  const onAdd = (todo: Todo) => {
    const newTodo = { ...todo, id: idTodo(todos) };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(initialTodos => {
        switch (status) {
          case 'all':
            setTodos(initialTodos);
            break;

          case 'active':
            setTodos(initialTodos.filter(todo => todo.completed === false));
            break;

          case 'completed':
            setTodos(initialTodos.filter(todo => todo.completed === true));
            break;

          default:
            setTodos(initialTodos);
        }
      })
      .catch(() => setError('Unable to load todos'))
      .finally(() => setTimeout(() => setError(''), 3000));
  }, [status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} onSubmit={onAdd} />

        <TodoList todos={todos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer status={status} onClick={setStatus} itemsLeft={itemsLeft} />
        )}

        <Errors error={error} onClose={() => setError('')} />
      </div>
    </div>
  );
};
