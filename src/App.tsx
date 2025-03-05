/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import * as todosService from './api/todos';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [id, setId] = useState(0);


  if (error !== '') {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  function handleToggle(todoId: number) {
    setLoading(true);
    setId(todoId);

    todosService
      .patchTodo(todos.find(todo => todo.id === todoId).id, {
        completed: !todos.find(todo => todo.id === todoId).completed,
      })
      .then(() => {
        setTimeout(() => {
          setTodos(currentTodos =>
            currentTodos.map(todo =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo,
            ),
          );
          setLoading(false);
        }, 500);
      })
      .catch(() => setError('Unable to update a todo'));
  }

  function deleteTodo(todoId) {
    setId(todoId);
    setLoading(true);
    todosService
      .deleteTodo(todoId)
      .then(() =>
        setTimeout(() => {
          setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== todoId);
          });

          setLoading(false);
        }, 500),
      )
      .catch(() => setError('Unable to delete a todo'));
  }

  useEffect(() => {
    //todosService.clearTodos();
    setLoading(true);
    todosService
      .getTodos()
      .then(data => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      })
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.Active) {
      return !todo.completed;
    }

    if (filter === Status.Completed) {
      return todo.completed;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onError={setError}
          onTodos={setTodos}
          onQuery={setQuery}
          query={query}
        />
        <TodoList
          onToggle={handleToggle}
          onDeleteTodo={deleteTodo}
          loading={loading}
          filtered={filteredTodos}
          id={id}
        />

        {!!todos.length && (
          <Footer
            onFilter={setFilter}
            onError={setError}
            onTodos={setTodos}
            todos={todos}
            filter={filter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: error === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};

{
  /* This form is shown instead of the title and remove button */
}

{
  /* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </form> */
}

{
  /* 'is-active' class puts this modal on top of the todo */
}

{
  /* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */
}
