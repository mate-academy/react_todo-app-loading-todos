/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

const USER_ID = 12078;

function filterTodos(todos: Todo[], todosActivityFilter: string) {
  let resultTodos = [...todos];

  switch (todosActivityFilter) {
    case 'Completed':
      resultTodos = resultTodos.filter(todo => todo.completed);
      break;
    case 'Active':
      resultTodos = resultTodos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  return resultTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingDone, setLoadingDone] = useState(false);
  const [todosActivityFilter, setTodosActivityFilter] = useState('All');

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos(USER_ID);

      setTodos(data);
      setLoadingDone(true);
    };

    loadTodos();
  }, []);

  const onAdd = (todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  };

  const onCompletionChange = (todoId: number) => {
    const newTodos = todos.map(todo => {
      const newTodo = { ...todo };

      if (newTodo.id === todoId) {
        newTodo.completed = !newTodo.completed;
      }

      return newTodo;
    });

    setTodos(newTodos);
  };

  const onRemoveTodo = (todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  };

  const onClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const setActivityFilter = (filterValue: string) => {
    setTodosActivityFilter(filterValue);
  };

  const isCompletedTodo = todos.some(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <NewTodo
            onAdd={onAdd}
            todos={todos}
            userId={USER_ID}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {loadingDone && (
            <TodoList
              todos={filterTodos(todos, todosActivityFilter)}
              onCompletionChange={onCompletionChange}
              onRemoveTodo={onRemoveTodo}
            />
          )}
          {/* This todo is being edited */}
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${todosActivityFilter === 'All' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => setActivityFilter('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${todosActivityFilter === 'Active' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => setActivityFilter('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${todosActivityFilter === 'Completed' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => setActivityFilter('Completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          { isCompletedTodo
            && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={onClearCompleted}
              >
                Clear completed
              </button>
            )}
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
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
    </div>
  );
};
