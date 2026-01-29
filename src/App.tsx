/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoElement } from './components/Todo/Todo';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';
import { FilterStatus } from './types/FilterStatus';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const todoInput = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [showedTodos, setShowedTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.NoError,
  );

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const itemsLeft = activeTodos.length;

  useEffect(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        setShowedTodos(activeTodos);
        break;
      case FilterStatus.Completed:
        setShowedTodos(completedTodos);
        break;
      case FilterStatus.All:
      default:
        setShowedTodos(todos);
        break;
    }
  }, [filterStatus, todos]);

  const handleFocus = () => {
    if (todoInput.current) {
      todoInput.current.focus();
    }
  };

  const hideError = () => {
    setTimeout(() => {
      setErrorMessage(ErrorType.NoError);
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
        setShowedTodos(result);
        handleFocus();
      })
      .catch(error => {
        setErrorMessage(ErrorType.LoadTodosError);
        hideError();
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });

    handleFocus();
  }, []);

  const handleTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length > 0) {
      setLoading(true);

      addTodo(title.trim())
        .then((response: Todo) => {
          setTodos([...todos, response]);
        })
        .catch(error => {
          setErrorMessage(ErrorType.AddTodoError);
          handleFocus();
          hideError();
          throw error;
        })
        .finally(() => {
          setLoading(false);
          setTitle('');
        });
    } else {
      setErrorMessage(ErrorType.EmptyTodoTitleError);
      hideError();
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setErrorMessage(ErrorType.NoError);
  };

  const handleRemoveError = () => {
    setErrorMessage(ErrorType.NoError);

    handleFocus();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todoInput={todoInput}
          title={title}
          onTodoSubmit={handleTodoSubmit}
          onTitleChange={handleTitleChange}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {showedTodos.map(todo => (
            <TodoElement key={todo.id} todo={todo} loading={loading} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            itemsLeft={itemsLeft}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error errorMessage={errorMessage} onRemoveError={handleRemoveError} />
    </div>
  );
};
