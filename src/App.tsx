import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodoTitle, setInputTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selected, setSelected] = useState('All');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [elementLeft, setElementLeft] = useState(0);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
        const todosLeft = todosFromServer.filter(todo => !todo.completed);

        setElementLeft(todosLeft.length);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function handleKeyPressed(
    event: React.KeyboardEvent<HTMLInputElement>,
    input: string,
  ) {
    if (event.key === 'Enter') {
      const newTodo: Todo = {
        id: todos.length,
        userId: 677,
        title: input,
        completed: false,
      };

      addTodos(newTodo).then(() => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      });
      setInputTodoTitle('');
    }
  }

  function handleFilterSelected(selectedType: string) {
    setSelected(selectedType);
    let newTodos: Todo[];

    switch (selectedType) {
      case 'Active':
        newTodos = todos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        newTodos = todos.filter(todo => todo.completed);
        break;
      default:
        newTodos = [...todos];
    }

    setFilteredTodos(newTodos);
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
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputTodoTitle}
              onChange={event => setInputTodoTitle(event.target.value)}
              onKeyDown={event => handleKeyPressed(event, inputTodoTitle)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={`todo ${todo.completed && 'completed'}`}
              key={todo.id}
            >
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label
                className="todo__status-label"
                htmlFor={`todoStatus-${todo.id}`}
              >
                <input
                  id={`todoStatus-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {elementLeft} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${selected === 'All' && 'selected'}`}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterSelected('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${selected === 'Active' && 'selected'}`}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterSelected('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${selected === 'Completed' && 'selected'}`}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterSelected('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
