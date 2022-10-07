/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErroNotification } from './components/ErrorNot';
import { TodoFooter } from './components/Filters';
import { TodoHeader } from './components/Todo';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFiterBy] = useState('all');

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

      <TodoHeader newTodoField={newTodoField} />

      {todos && (
        <div className="todoapp__content">
          <TodoList todos={filteredTodos} />

          <TodoFooter
            setFilterBy={setFiterBy}
            todos={filteredTodos}
            filterBy={filterBy}
          />
        </div>
      )}

      {!!errorMessage && (
        <ErroNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}

        />
      )}
    </div>
  );
};
