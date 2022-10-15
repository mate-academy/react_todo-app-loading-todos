/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Notification } from './components/ErrorNotification/ErrorNotification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  if (error === false) {
    setTimeout(() => {
      setError(true);
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(response => {
          setTodos(response);
        })
        .catch(() => setError(true));
    }
  }, []);

  const filterSet = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header newTodoField={newTodoField} />
      <div className="todoapp__content">

        <TodoList todos={filterSet} />
        <Footer
          todos={filterSet}
          filterLink={filter}
          setFilter={setFilter}
        />

      </div>
      <Notification
        error={error}
        SetError={setError}
      />
    </div>
  );
};
