/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import * as servises from './servises/buttons';
import { ButtonProp } from './types/Button';

import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [appliedTitle, setAppliedTitle] = useState('');
  const [cheked, setChecked] = useState(false);
  const [loadContent, setLoadedContent] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredBy, setFilteredBy] = useState<string>('All');

  useEffect(() => {
    todoService
      .getTodos()
      .then(response => {
        const initData = response;

        setLoadedContent(initData);
      })
      .catch(error => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  }, []);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const timer = useRef(0);

  const handleTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    const newTitle = event.target.value;

    setTodoTitle(newTitle);

    clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      setAppliedTitle(newTitle);
    }, 1000);
  };

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      title: appliedTitle.length !== 0 ? appliedTitle : todoTitle,
      userId: todoService.USER_ID,
      completed: cheked,
      id: 0,
    };

    await todoService.postTodos(newTodo);
  };

  const filteredButtons: ButtonProp[] = servises.getButtons();

  const filter = (listOfTodos: Todo[], query: string) => {
    let sortBy = query;

    if (query === filteredBy) {
      sortBy = filteredBy;
    }

    switch (sortBy) {
      case 'Active':
        return listOfTodos.filter(item => item.completed === false);
      case 'Completed':
        return listOfTodos.filter(item => item.completed === true);
      default:
        return listOfTodos;
    }
  };

  const handleFilterButtons = async (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    const text: string | null = event.currentTarget.textContent;

    if (!text) {
      return;
    } else {
      setFilteredBy(text);
    }

    const existedTodos = await todoService.getTodos();
    const filteredTodos = filter(existedTodos, text);

    setLoadedContent(filteredTodos);
  };

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
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleTodoTitle}
            />
          </form>
        </header>

        {loadContent.map(data => (
          <section
            key={data.id}
            className={classNames('todoapp__main', {})}
            data-cy="TodoList"
          >
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: data.completed === true,
              })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  onChange={() =>
                    setChecked(prev => (prev === false ? true : false))
                  }
                  checked={data.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {data.title}
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
          </section>
        ))}

        {/* Hide the footer if there are no todos */}

        {loadContent.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${loadContent.filter(item => !item.completed).length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {filteredButtons.map(button => (
                <a
                  href={button.href}
                  className={classNames(`${button.className}`, {
                    selected: filteredBy === button.name,
                  })}
                  data-cy={button.dataCy}
                  key={button.key}
                  onClick={handleFilterButtons}
                >
                  {button.name}
                </a>
              ))}
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

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
