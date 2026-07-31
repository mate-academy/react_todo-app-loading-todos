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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const [deleteError, setdeleteError] = useState(false);
  const [Error, setError] = useState(false);
  const [Rror, setRror] = useState(false);
  const [hidden, sethidden] = useState(false);
  const [notTitle, setNotTitle] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [firstFilter, setFirstFilter] = useState('All');

  const FilteredArray = todos.filter(obj => {
    const fExam =
      firstFilter === 'All' ||
      (firstFilter === 'Active' && !obj.completed) ||
      (firstFilter === 'Completed' && obj.completed);

    return fExam;
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setRror(true);
        sethidden(true);
      });
  }, []);

  useEffect(() => {
    if (!hidden) {
      return;
    }

    const timerId = setTimeout(() => {
      sethidden(false);
      setdeleteError(false);
      setError(false);
      setRror(false);
      setNotTitle(false);
      setUpdate(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [hidden]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function handlesubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
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
        /* eslint-disable */
        console.log(createdTodo);
      })
      .catch(() => {
        setError(true);
        sethidden(true);
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
        setdeleteError(true);
        sethidden(true);
      });
  }

  function updateobj(todo: Todo) {
    updateTodos(todo)
      .then(thisarray => {
        setTodos(array =>
          array.map(cobj => (cobj.id === thisarray.id ? (cobj = todo) : cobj)),
        );
      })
      .catch(() => {
        setUpdate(true);
        sethidden(true);
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
              onMouseLeave={() => {
                !title.trim() ? setNotTitle(true) : setNotTitle(false);
              }}
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
        className={`notification is-danger is-light has-text-weight-normal ${!hidden ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => sethidden(false)}
        />
        {/* show only one message at a time */}

        {Rror && <>Unable to load todos</>}
        {notTitle && (
          <>
            <br />
            Title should not be empty
          </>
        )}

        {Error && (
          <>
            <br />
            Unable to add a todo
          </>
        )}

        {deleteError && (
          <>
            <br />
            Unable to delete a todo
          </>
        )}

        {Update && (
          <>
            <br />
            Unable to update a todo
          </>
        )}
      </div>
    </div>
  );
};
