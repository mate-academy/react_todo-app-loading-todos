/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import * as apiMetodos from './api/todos';
import { useEffect } from 'react';
import { useState } from 'react';
import { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [actualyConditional, setActualyConditional] = useState('all');

  const getData = async (filtro: string) => {
    try {
      let res: Todo[] = [];

      if (filtro === 'all') {
        res = await apiMetodos.getTodos();
      }

      if (filtro === 'active') {
        const filtered = await apiMetodos.getTodos();

        res = filtered.filter(r => r.completed === false);
      }

      if (filtro === 'completed') {
        const filtered = await apiMetodos.getTodos();

        res = filtered.filter(r => r.completed === true);
      }

      setTodos(res);
    } catch (error) {
      throw new Error('Erro no get');
    }
  };

  useEffect(() => {
    getData(actualyConditional);
  });

  if (apiMetodos.USER_ID !== 4130) {
    return <UserWarning />;
  }

  async function postTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newPost = {
      id: await apiMetodos.getIdTodo(),
      userId: apiMetodos.USER_ID,
      title: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await apiMetodos.postTodo(newPost);
    setInput('');
    await getData(actualyConditional);
  }

  function canClearCompleted() {
    const findActiveNot = todos.filter(r => r.completed === false);

    return findActiveNot.length !== 0;
  }

  const mudarConficao = (condicao: string) => {
    setActualyConditional(condicao);
  };

  async function patchTodo(idNumber: number) {
    const newInfo = {
      completed: true,
      updatedAt: new Date().toISOString(),
    };

    await apiMetodos.patchTodo(idNumber, newInfo);
    getData(actualyConditional);
  }

  async function clearTodos() {
    todos.map(r => {
      apiMetodos.deleteTodo(r.id);
    });
    getData(actualyConditional);
  }

  async function deleteTodo(id: number) {
    await apiMetodos.deleteTodo(id);

    getData(actualyConditional);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <header className="todoapp__header">
        <button
          type="button"
          className={`todoapp__toggle-all`}
          data-cy="ToggleAllButton"
        />
        <form
          onSubmit={e => {
            postTodo(e);
          }}
        >
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </form>
      </header>

      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={`todo ${todo.completed ? 'completed' : ''}`}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onClick={() => patchTodo(todo.id)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              x
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>

      {(todos.length > 0 || actualyConditional !== 'all') && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${actualyConditional === 'all' ? ' selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => {
                getData('all');
                mudarConficao('all');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${actualyConditional === 'active' ? ' selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => {
                getData('active');
                mudarConficao('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${actualyConditional === 'completed' ? ' selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => {
                getData('completed');
                mudarConficao('completed');
              }}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={canClearCompleted()}
            onClick={() => clearTodos()}
          >
            Clear completed
          </button>
        </footer>
      )}

      <div
        data-cy="ErrorNotification"
        className="
        notification is-danger is-light has-text-weight-normal hidden
        "
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        Unable to load todos
      </div>
    </div>
  );
};
