/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { UserWarning } from './UserWarning';
import {
  getTodos,
  createTodo,
  deleteTodo,
  toogleTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notification } from './components/Notifications';
import { warningTimer } from './utils/warningTimer';

const USER_ID = 6336;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [hasError, setHasError] = useState(false);
  const [selectFilter, setSelectFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const itemsLeft = todos.filter(todo => todo.completed === false);

  const eventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTodo(query);
    } catch {
      setErrorMessage('Unable to add a todo');
    }

    setQuery('');
  };

  const allCompleted = useMemo(() => {
    return todos.filter(todo => todo.completed === true);
  }, [todos]);

  const isAllCompleted = allCompleted.length === todos.length;

  const clearCompleted = () => {
    allCompleted.forEach(todo => deleteTodo(todo.id));
  };

  const toogleAllTodo = () => {
    if (isAllCompleted) {
      todos.forEach(todo => toogleTodo(todo.id, false));
    } else {
      todos.forEach(todo => toogleTodo(todo.id, true));
    }
  };

  const handleUpdateTodo = useCallback(async (todoId: number, todo: Todo) => {
    try {
      await updateTodo(todoId, todo);
    } catch {
      setErrorMessage('Unable to update a todo');
    }
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const completedTodo = todo.completed;

      switch (selectFilter) {
        case 'all':
          return todo;
        case 'active':
          return !completedTodo;
        case 'completed':
          return completedTodo;
        default:
          return false;
      }
    });
  }, [todos, query, selectFilter]);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        setErrorMessage('Unable to loading todos');
      }
    };

    onLoadGetTodos();
  });

  useEffect(() => {
    setHasError(true);
    warningTimer(setHasError, false, 3000);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isAllCompleted={isAllCompleted}
          onToogleAllTodo={toogleAllTodo}
          handleSubmit={handleSubmit}
          query={query}
          onEventChange={eventChange}
        />

        <TodoList
          todos={visibleTodos}
          handleUpdateTodo={handleUpdateTodo}
          onSetErrorMessage={setErrorMessage}
        />

        {todos.length !== 0 ? (
          <Footer
            itemsLeft={itemsLeft}
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
            allCompleted={allCompleted}
            clearCompleted={clearCompleted}
          />
        ) : ''}
      </div>

      <Notification
        hasError={hasError}
        setHasError={setHasError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
