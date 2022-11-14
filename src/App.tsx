/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodosFilter } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [hasError, setHasError] = useState<Error>({
    message: '',
    status: false,
  });
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.All);

  const showError = useCallback((message: string) => {
    setHasError({ status: true, message });

    setTimeout(() => {
      setHasError({ status: false, message: '' });
    }, 3000);
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (err) {
      showError('Unable to load todos');
    }
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  useEffect(() => {
    let todosCopy = [...todos];

    if (todoStatus !== TodoStatus.All) {
      todosCopy = todosCopy.filter(todo => {
        switch (todoStatus) {
          case TodoStatus.Active:
            return !todo.completed;

          case TodoStatus.Completed:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    setVisibleTodos(todosCopy);
  }, [todoStatus, todos]);

  const handleErrorClose = useCallback(
    () => setHasError({ status: false, message: '' }), [],
  );

  const handleStatusSelect = useCallback((status: TodoStatus) => {
    setTodoStatus(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <NewTodo newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodosFilter
              todos={todos}
              todoStatus={todoStatus}
              handleStatusSelect={handleStatusSelect}
            />
          </>
        )}
      </div>
      <ErrorNotification
        hasError={hasError}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
