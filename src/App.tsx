/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as client from './api/todos';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [erroMessage, setErroMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [listComponent, setListComponent] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await client.getTodos();

        setTodos(todosData);
      } catch (error) {
        setErroMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      await client.deletePost(id);

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error: unknown) {
      setErroMessage(error.message);
    }
  };

  const handleSubmitForm = async (title: string) => {
    setLoading(true);
    await wait(3000);
    setListComponent(true);
    try {
      const addTodo = await client.postTodos(title);

      setTodos(prev => [addTodo, ...prev]);
    } catch (error: unknown) {
      setErroMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const toggleTodoStatus = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);

      if (!todoToUpdate) {
        return;
      }

      const updatedTodo = await client.updateTodo(id, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      });

      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error: unknown) {
      setErroMessage(
        error instanceof Error ? error.message : 'Erro ao atualizar todo',
      );
    }
  };

  const clearCompleted = async () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    try {
      await Promise.all(completedTodoIds.map(id => client.deletePost(id)));

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErroMessage(error.message);
      } else {
        setErroMessage('Erro desconhecido ao limpar completados.');
      }
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={toggleAllTodos}
          />

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();
              if (inputValue.trim()) {
                handleSubmitForm(inputValue.trim());
                setInputValue('');
              } else {
                setErroMessage('Title should not be empty');
              }
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        listComponent && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {todos
                .filter(todo => {
                  if (!todo || !todo.title) {
                    return false; // remove nulos ou sem título
                  }

                  if (filter === 'active') {
                    return !todo.completed;
                  }

                  if (filter === 'completed') {
                    return todo.completed;
                  }

                  return true;
                })
                .map(todo => (
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
                        onClick={() => toggleTodoStatus(todo.id)}
                        checked={todo.completed}
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
                      ×
                    </button>

                    <div data-cy="TodoLoader" className="modal overlay">
                      <div
                        className="modal-background
                    has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  </div>
                ))}
              {erroMessage && (
                <div
                  data-cy="ErrorNotification"
                  className="notification is-danger
                is-light has-text-weight-normal"
                >
                  <button
                    data-cy="HideErrorButton"
                    type="button"
                    className="delete"
                  />
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
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length} items left
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilter('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilter('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )
      )}
    </div>
  );
};
