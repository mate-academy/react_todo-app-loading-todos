/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    async function todosFromServer() {
      try {
        const visibleTodos = getTodos(5);

        setTodos(await visibleTodos);
      } catch (error) {
        setErrorMessage(`${error}`);
      }
    }

    todosFromServer();
  }, []);

  const filteredTodos = todos?.filter(todoItem => {
    if (filterBy === 'active') {
      return !todoItem.completed;
    }

    if (filterBy === 'completed') {
      return todoItem.completed;
    }

    return todoItem;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header newTodoField={newTodoField} />

      {todos && (
        <div className="todoapp__content">

          <Section filteredTodos={filteredTodos} />

          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filteredTodos={filteredTodos}
          />
        </div>
      )}

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
