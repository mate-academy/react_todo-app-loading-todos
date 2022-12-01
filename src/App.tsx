/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Errors } from './types/Errors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.DEFAULT);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');

  const onClose = () => setIsError(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          await getTodos(user.id)
            .then(data => setTodos(data));
        }
      } catch (e) {
        setIsError(true);
        setErrorMessage(Errors.UNEXPECTED);
        setTimeout(() => setIsError(false), 3000);
      }
    })();

    const todosVisable = todos.filter(todo => {
      switch (filterBy) {
        case 'ACTIVE':
          return !todo.completed;

        case 'COMPLETED':
          return todo.completed;

        default:
          return todo;
      }
    });

    setTodosFiltered(todosVisable);
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={todosFiltered} />
            <Footer
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
            <ErrorNotification
              isError={isError}
              error={errorMessage}
              onClose={onClose}
            />
          </>
        )}

      </div>
    </div>
  );
};
