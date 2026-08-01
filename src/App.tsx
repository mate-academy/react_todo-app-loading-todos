/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import {
  USER_ID,
  getTodos,
  createTodos,
  deleteTodos,
  updateTodos,
} from './api/todos';
import { Todolist } from './forArray/Todolist';
import { Todofilter } from './filter/Todofilter';

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum ErrorMessage {
  Load = 'Unable to load todos',
  Title = 'Title should not be empty',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
  None = '',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );

  const [firstFilter, setFirstFilter] = useState<Filter>(Filter.All);

  const FilteredArray = todos.filter(obj => {
    const fExam =
      firstFilter === Filter.All ||
      (firstFilter === Filter.Active && !obj.completed) ||
      (firstFilter === Filter.Completed && obj.completed);

    return fExam;
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(ErrorMessage.None);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function handlesubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage(ErrorMessage.Title);

      return;
    }

    createTodos({
      userId: USER_ID,
      title: title,
      completed: false,
    })
      .then(createdTodo => {
        setTodos(currentarray => [...currentarray, createdTodo]);
        setTitle('');
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Add);
      });
  }

  function handledelete(idfordelete: number) {
    deleteTodos(idfordelete)
      .then(() => {
        setTodos(currentarray => [
          ...currentarray.filter(todo => todo.id !== idfordelete),
        ]);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Delete);
      });
  }

  function updateobj(todo: Todo) {
    updateTodos(todo)
      .then(thisarray => {
        setTodos(array =>
          array.map(cobj => (cobj.id === thisarray.id ? thisarray : cobj)),
        );
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Update);
      });
  }

  function handleClearCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => handledelete(todo.id));
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handlesubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <Todolist
            todos={FilteredArray}
            onselect={handledelete}
            Updated={updateobj}
          />
        </section>

        {todos.length > 0 && (
          <Todofilter
            setFirstFilter={setFirstFilter}
            firstFilter={firstFilter}
            todos={todos}
            cleared={handleClearCompleted}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.None)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
