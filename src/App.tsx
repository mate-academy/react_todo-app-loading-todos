/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import {
  getTodos, sendTodos, deleteTodos, patchTodos,
} from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { SendedTodo } from './types/SendedTodo';

const positionValues = ['All', 'Active', 'Completed'];

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [newTodo, setNewTodo] = useState<SendedTodo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [position, setPosition] = useState('all');
  const [currTodoId, setCurrTodoId] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState('');
  const [isForm, setIsForm] = useState(false);

  const loadTodos = async () => {
    if (user) {
      try {
        const todosFromApi = await getTodos(user?.id);

        setTodos(todosFromApi);
      } catch {
        setHidden(false);
        setError('Todos not found');
        throw new Error('Todos not found');
      }
    }
  };

  async function sendNewTodo(data: SendedTodo) {
    if (user && data) {
      try {
        const todoFromServer = await sendTodos(user?.id, data);
        const todoToShow: Todo = {
          id: todoFromServer.id,
          title: todoFromServer.title,
          completed: todoFromServer.completed,
          userId: todoFromServer.userId,
        };

        setTodos(current => [...current, todoToShow]);
      } catch {
        setHidden(false);
        setError('Todos not added');
        throw new Error('Todos not added');
      }
    }
  }

  async function deleteCurrentTodo(todoId: number) {
    if (user && todoId) {
      try {
        await deleteTodos(todoId);
        const todosToShow = todos.filter(todo => todo.id !== todoId);

        setTodos(todosToShow);
      } catch {
        setHidden(false);
        setError('Todos not deleted');
        throw new Error('Todos not deleted');
      }
    }
  }

  async function modifieTodo(
    todoId: number, title?: string, completed?: boolean,
  ) {
    if (user) {
      try {
        const todoFromServer = await patchTodos(todoId, title, completed);
        const todosToShow = todos.map(todo => {
          if (todo.id !== todoId) {
            return todo;
          }

          return {
            ...todo,
            title: todoFromServer.title,
            completed: todoFromServer.completed,
          };
        });

        setTodos(todosToShow);
      } catch {
        setHidden(false);
        setError('Todos not modified');
        throw new Error('Todos not modified');
      }
    }
  }

  const formActive = () => {
    setIsForm(true);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const changePosition = (newPosition: string) => {
    setPosition(newPosition);
  };

  const handleNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userTodo = {
      id: currTodoId,
      userId: user?.id,
      title: event.target.value,
      completed: false,
    };

    setCurrTodoId(current => current + 1);
    setNewTodo(userTodo);
  };

  const closeErrorMessage = () => {
    setHidden(true);
  };

  const handleTodoChange = (
    event: React.ChangeEvent<HTMLInputElement>, todoId: number,
  ) => {
    const newTodos = todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title: event.target.value,
      };
    });

    setTodos(newTodos);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo) {
      sendNewTodo(newTodo);
      setNewTodo(null);
    }

    newTodoField.current?.blur();
  };

  const removeTodo = (todoId: number) => {
    deleteCurrentTodo(todoId);
  };

  const handleCurrentTodoChange = (
    event: React.FormEvent<HTMLFormElement> | null,
    todoId: number,
    title: string,
  ) => {
    event?.preventDefault();

    if (!title) {
      deleteCurrentTodo(todoId);
    } else {
      modifieTodo(todoId, title);
    }

    setIsForm(false);
  };

  const handleCompleted = (todoId: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      const changedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      return changedTodo;
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    loadTodos();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
      closeErrorMessage();
    }, 3000);
  }, [error]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleSubmit={handleSubmit}
          title={newTodo?.title || ''}
          handleAdd={handleNewTodo}
          newTodoField={newTodoField}
        />
        <section className="todoapp__main" data-cy="TodoList">
          {!!todos.length && (
            <TodoList
              todos={todos}
              handleRemove={removeTodo}
              handleComplete={handleCompleted}
              handleTodoChange={handleTodoChange}
              handleCurrTodoChange={handleCurrentTodoChange}
              isForm={isForm}
              handleFormComplete={formActive}
              position={position}
            />
          )}
        </section>

        {!!todos.length && (
          <Footer
            todos={todos}
            position={position}
            onPositionChange={changePosition}
            positionValues={positionValues}
            completedClear={clearCompleted}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorMessage}
        />
        {error}
      </div>
    </div>
  );
};
