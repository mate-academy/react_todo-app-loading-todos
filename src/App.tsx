/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Errors/ErrorMessage';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState('all');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    async function todosFromServer() {
      try {
        if (user) {
          const visibleTodos = getTodos(user.id);

          setTodos(await visibleTodos);
        }
      } catch (error) {
        setErrorMessage(`${error} ${user}`);
      }
    }

    todosFromServer();
  }, []);

  const sortOption = todos?.filter(todoItem => {
    switch (sortBy) {
      case 'completed':
        return todoItem.completed;

      case 'active':
        return !todoItem.completed;

      default:
        return todoItem;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {todos
        && (
          <div className="todoapp__content">
            <Header newTodoField={newTodoField} />

            <TodoList todos={sortOption} />

            <Footer
              sortBy={sortBy}
              todos={todos}
              setSortBy={setSortBy}
            />
          </div>
        )}

      {
        errorMessage
          && <Error errorAlert={errorMessage} setErrorAlert={setErrorMessage} />
      }
    </div>
  );
};
