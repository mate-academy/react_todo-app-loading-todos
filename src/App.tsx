/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  deleteTodos, getTodos, patchTodos, sendTodos,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { SendedTodo } from './types/sendedTodo';
import { Todo } from './types/Todo';

const possibleStatus = ['All', 'Active', 'Completed'];

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [newTodo, setNewTodo] = useState<SendedTodo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [currentTodoId, setCurrentTodoId] = useState(0);
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
        await sendTodos(user?.id, data);

        loadTodos();
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

        loadTodos();
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
        await patchTodos(todoId, title, completed);

        loadTodos();
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

  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userTodo = {
      id: currentTodoId,
      userId: user?.id,
      title: event.target.value,
      completed: false,
    };

    setCurrentTodoId(current => current + 1);
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
    title: string,
    todoId: number,
  ) => {
    event?.preventDefault();

    if (!title) {
      deleteCurrentTodo(todoId);
    }

    modifieTodo(todoId, title);

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
          heandleSubmit={handleSubmit}
          title={newTodo?.title || ''}
          onAdd={handleNewTodo}
          newTodoField={newTodoField}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {!!todos.length
            && (
              <Todos
                onRemove={removeTodo}
                todos={todos}
                onComplete={handleCompleted}
                onTodoChange={handleTodoChange}
                onCurrentTodoChange={handleCurrentTodoChange}
                isForm={isForm}
                onFormComplete={formActive}
                status={status}
              />
            )}
        </section>

        {!!todos.length
          && (
            <Footer
              todos={todos}
              status={status}
              onStatusChange={changeStatus}
              possibleStatus={possibleStatus}
              willClearCompleted={clearCompleted}
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
