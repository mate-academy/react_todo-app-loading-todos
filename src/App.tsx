/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodos,
  deleteTodos,
  getTodos,
  updateTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.all);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setLoadingErrorMessage('Unable to load todos');
        throw error;
      });

    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      titleErrorMessage ||
      addErrorMessage ||
      updateErrorMessage ||
      loadingErrorMessage
    ) {
      timer = setTimeout(() => {
        setTitleErrorMessage('');
        setAddErrorMessage('');
        setUpdateErrorMessage('');
        setLoadingErrorMessage('');
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [
    titleErrorMessage,
    addErrorMessage,
    updateErrorMessage,
    loadingErrorMessage,
  ]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = ({
    title,
    completed,
  }: {
    title: string;
    completed: boolean;
  }) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        userId: USER_ID,
        title,
        completed,
        loading: true,
        id: Date.now() + Math.random(),
      },
    ]);
    createTodos({ userId: USER_ID, title, completed })
      .then(newTodo => {
        setTodos(currentTodos =>
          currentTodos.map((todo, index) => {
            if (currentTodos.length - 1 === index) {
              return newTodo;
            }

            return todo;
          }),
        );
        setTodoTitle('');
      })
      .catch(error => {
        setAddErrorMessage('Unable to add a todo');
        setTodos(currentTodos => {
          const currentTodosCopy = [...currentTodos];

          currentTodosCopy.pop();

          return currentTodosCopy;
        });
        throw error;
      });
  };

  const removeTodo = (todoId: number) => {
    deleteTodos(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(error => {
        setAddErrorMessage('Unable to delete a todo');
        throw error;
      });
  };

  const updateTodo = (todoId: number) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    updateTodos(updatedTodo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo => (todoId === todo.id ? updatedTodo : todo)),
        );
      })
      .catch(error => {
        setUpdateErrorMessage('Unable to update a todo');
        throw error;
      });
  };

  const removeAllTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      deleteTodos(todo.id);
    });

    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleAllCompleted = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterType.active) {
      return !todo.completed;
    }

    if (filter === FilterType.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={handleAllCompleted}
            />
          )}

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();

              if (!todoTitle.trim()) {
                setTitleErrorMessage('Title should not be empty');

                return;
              }

              addTodo({ title: todoTitle, completed: false });
              setTitleErrorMessage('');
            }}
          >
            <input
              ref={titleField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            removeAllTodos={removeAllTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          titleErrorMessage ||
          addErrorMessage ||
          deleteErrorMessage ||
          updateErrorMessage ||
          loadingErrorMessage
            ? ''
            : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setTitleErrorMessage('');
            setAddErrorMessage('');
            setDeleteErrorMessage('');
            setUpdateErrorMessage('');
            setLoadingErrorMessage('');
          }}
        />
        {titleErrorMessage ||
          addErrorMessage ||
          deleteErrorMessage ||
          updateErrorMessage ||
          loadingErrorMessage}
      </div>

      {false && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
