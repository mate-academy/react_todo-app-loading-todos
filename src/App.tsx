/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoStatusFilter } from './types/TodoStatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<TodoStatusFilter>(TodoStatusFilter.ALL);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setErrorMessage(null);
    setIsLoading(true);
    inputRef.current?.focus();
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (errorMessage) {
      timerRef.current = setTimeout(() => {
        setErrorMessage(null);
        timerRef.current = null;
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [errorMessage]);

  function addNewTodo(title: string) {
    const todo = {
      title,
      userId: USER_ID,
      completed: false,
    };

    setErrorMessage(null);
    setIsAdding(true);
    addTodo(todo)
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setNewTodoTitle('');
        inputRef.current?.focus();
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        inputRef.current?.focus();
      })
      .finally(() => setIsAdding(false));
  }

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (isAdding) {
        return;
      }

      const trimmedTitle = newTodoTitle.trim();

      if (trimmedTitle) {
        addNewTodo(trimmedTitle);
      }
    },
    [newTodoTitle, isAdding],
  );

  const handleHideError = () => {
    setErrorMessage(null);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const allCompleted =
    todos.length > 0 && todos.every(todo => todo.completed === true);

  const someCompleted = todos.some(todo => todo.completed === true);

  const lastSavingTodo: Todo = {
    id: 0,
    title: newTodoTitle,
    completed: false,
    userId: USER_ID,
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          allCompleted={allCompleted}
          newTodoTitle={newTodoTitle}
          inputRef={inputRef}
          handleSubmit={handleSubmit}
          setNewTodoTitle={setNewTodoTitle}
        />

        {todos.length > 0 && (
          <TodoList
            filteredTodos={filteredTodos}
            isAdding={isAdding}
            isLoading={isLoading}
            lastSavingTodo={lastSavingTodo}
          />
        )}

        {todos.length > 0 && (
          <TodoFilter
            todos={todos}
            filter={filter}
            someCompleted={someCompleted}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHideError={handleHideError}
      />
    </div>
  );
};
