/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos, postTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './Footer';
import { TodoList } from './TodoList';
import classNames from 'classnames';
import {Filters} from './types/Filters'

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [addTodoTitle, setAddTodoTitle] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterSelected, setFilterSelected] = useState<Filters>(Filters.All);

  const updateTodos = (todoId, title) => {
    // prettier-ignore
    setTodos(prevState =>
      title === null
        ? prevState.filter(todo => todo.id !== todoId)
        : prevState.map(todo => todoId === todo.id
          ? { ...todo, title: title } : todo,),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.preventDefault();

    if (!addTodoTitle.trim()) {
      setIsSubmitting(false);
      setErrorMessage('Title should not be empty');
      setShowErrorMessage(true);

      return;
    }

    if (addTodoTitle.trim()) {
      const newTodo = {
        title: addTodoTitle.trim(),
        completed: false,
        userId: USER_ID,
      };

      try {
        const createdTodo = await postTodos(newTodo);

        setTodos(prevState => [...prevState, createdTodo]);
        setAddTodoTitle('');
        setShowErrorMessage(false);
      } catch {
        setShowErrorMessage(true);
        setErrorMessage('Unable to add a todo');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const filteredTodos = () => {
    if (filterSelected === Filters.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filterSelected === Filters.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setShowErrorMessage(true);
      });
  }, []);

  useEffect(() => {
    if (showErrorMessage) {
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showErrorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            disabled={isSubmitting}
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          <form
            onSubmit={event => {
              handleSubmit(event);
            }}
          >
            <input
              disabled={isSubmitting}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={addTodoTitle}
              onChange={event => {
                setAddTodoTitle(event.target.value);
              }}
            />
          </form>
        </header>

        <TodoList
          todos={filteredTodos()}
          updateTodos={updateTodos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
        />

        {!!todos.length && (
          <Footer
            todos={todos}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${showErrorMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setShowErrorMessage(false)}
        />

        {errorMessage}
      </div>
    </div>
  );
};
