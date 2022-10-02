/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  // useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    async function todosFromServer() {
      try {
        const visibleTodos = getTodos(9);

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
      <Header
        newTodoField={newTodoField}
      />
      {todos && (
        <div className="todoapp__content">
          <TodoList
            filteredTodos={filteredTodos}
          />
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filteredTodos={filteredTodos}
          />
        </div>
      )}
      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
