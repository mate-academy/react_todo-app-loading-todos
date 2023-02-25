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
import { FilterTodos } from './types/FilterTodos';

const USER_ID = 6336;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [creatingTodo, setCreatingTodo] = useState<Todo | null>(null);
  const [todosInProcessed, setTodosInProcessed] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [selectFilter, setSelectFilter] = useState(FilterTodos.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const itemsLeft = todos.filter(({ completed }) => !completed);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  const pushError = useCallback(() => {
    setHasError(true);
    warningTimer(setHasError, false, 3000);
  }, [errorMessage]);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim().length) {
      setErrorMessage('Title can\'t be empty');
      pushError();
      setTitle('');

      return;
    }

    try {
      setCreatingTodo({
        id: 0,
        title,
        userId: USER_ID,
        completed: false,
      });

      const addedTodo = await createTodo(title);

      setTodos(currentTodos => [...currentTodos, addedTodo]);
    } catch {
      setErrorMessage('Unable to add a todo');
      pushError();
    } finally {
      setCreatingTodo(null);
      setTitle('');
    }
  };

  const allCompleted = todos.filter(({ completed }) => completed);

  const isAllCompleted = allCompleted.length === todos.length;

  const clearCompleted = useCallback(() => {
    allCompleted.forEach(async todo => {
      try {
        setTodosInProcessed(currentTodos => [...currentTodos, todo]);
        await deleteTodo(todo.id);
        setTodos(prevTodos => prevTodos.filter(({ completed }) => !completed));
      } catch (error) {
        setErrorMessage('Unable to delete a todo');
        warningTimer(setErrorMessage, '', 3000);
      } finally {
        setTodosInProcessed(currentTodos => currentTodos
          .filter(({ completed }) => !completed));
      }
    });
  }, [todos]);

  const toogleAllTodo = useCallback(() => {
    todos.forEach(async todo => {
      try {
        setTodosInProcessed(currentTodos => [...currentTodos, todo]);

        const todoChange = await toogleTodo(todo.id, !isAllCompleted);

        setTodos(currentTodos => currentTodos.map(todoToogle => {
          return todoToogle.id === todoChange.id
            ? todoChange
            : todoToogle;
        }));
      } catch (error) {
        setErrorMessage('Unable to change completed');
        pushError();
      } finally {
        setTodosInProcessed(currentTodos => currentTodos
          .filter(({ id }) => id !== todo.id));
      }
    });
  }, [todos]);

  const handleUpdateTodo = useCallback(async (
    todoId: number,
    todoUpdate: Todo,
  ) => {
    try {
      setTodosInProcessed(currentTodos => [...currentTodos, todoUpdate]);
      const todoChange = await updateTodo(todoId, todoUpdate);

      setTodos(currentTodos => currentTodos.map(todo => {
        return todo.id === todoChange.id
          ? todoChange
          : todo;
      }));
    } catch {
      setErrorMessage('Unable to update a todo');
      pushError();
    } finally {
      setTodosInProcessed(currentTodos => (
        currentTodos.filter(({ id }) => id !== todoUpdate.id)
      ));
    }
  }, []);

  const visibleTodos = useMemo(() => {
    switch (selectFilter) {
      case FilterTodos.ACTIVE:
        return todos.filter(({ completed }) => !completed);
      case FilterTodos.COMPLETED:
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }, [todos, selectFilter]);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        setErrorMessage('Unable to loading todos');
        pushError();
      }
    };

    onLoadGetTodos();
  }, []);

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
          handleSubmit={handleAddTodo}
          query={title}
          onEventChange={handleEventChange}
        />

        <TodoList
          todos={visibleTodos}
          onSetTodos={setTodos}
          creatingTodo={creatingTodo}
          todosLoadingState={todosInProcessed}
          setTodosLoadingState={setTodosInProcessed}
          handleUpdateTodo={handleUpdateTodo}
          onSetErrorMessage={setErrorMessage}
          isHasError={pushError}
        />

        {!!todos.length ? (
          <Footer
            itemsLeft={itemsLeft}
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
            allCompleted={allCompleted}
            onClearCompleted={clearCompleted}
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
