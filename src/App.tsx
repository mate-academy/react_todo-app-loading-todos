/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { createTodos } from './api/todos';
import { getTodos } from './api/todos';
import { updateTodos } from './api/todos';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    // Вызов функции для получения всех задач
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos); // Сохраняем задачи в состоянии
      })
      .catch(err => {
        setError('Unable to load todos' + err.message);
      });
  }, []);

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null); // Очищаем ошибку через 3 секунды
      }, 3000);

      // Очистка таймера при размонтировании компонента или при изменении ошибки
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  function addTodo({ title, userId, completed }: Omit<Todo, 'id'>) {
    // Проверка на пустое значение
    if (title.trim().length === 0) {
      setError('Title should not be empty');

      return;
    }

    createTodos({ title, userId, completed })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]); // Добавляем задачу в состояние
        setError(null); // Очищаем ошибку, если задача успешно добавлена
      })
      .catch(err => {
        setError('Unable to load todos' + err.message);
      });
  }

  function updateTodoStatus(todoId: number, completed: boolean) {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    updateTodos({ ...todoToUpdate, completed })
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(err => {
        setError('Unable to update a todo' + err.message);
      });
  }

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }
  // Считаем количество активных тудушек

  let counterOfActiveTodos = 0;

  for (const t of todos) {
    if (t.completed === false) {
      counterOfActiveTodos++;
    }
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
          <form
            onSubmit={e => {
              e.preventDefault();

              const form = e.target as HTMLFormElement;
              const newTodoTitle = form.todo.value; // получаем значение поля ввода

              // Вызываем функцию для отправки данных на сервер
              addTodo({
                title: newTodoTitle,
                userId: 1445, // используйте реальный userId
                completed: false, // Новая задача будет не завершена по умолчанию
              });

              form.todo.value = ''; // очищаем поле ввода после отправки
            }}
          >
            <input
              name="todo"
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => {
            return (
              <div
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => updateTodoStatus(todo.id, !todo.completed)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${counterOfActiveTodos} items left`}
            </span>
            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === Filter.ALL ? 'selected' : ''}`}
                onClick={() => handleFilterChange(Filter.ALL)}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === Filter.ACTIVE ? 'selected' : ''}`}
                onClick={() => handleFilterChange(Filter.ACTIVE)}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === Filter.COMPLETED ? 'selected' : ''}`}
                onClick={() => handleFilterChange(Filter.COMPLETED)}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>
            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed === true)}
            >
              Clear completed
            </button>
          </footer>
        ) : null}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error === null ? 'hidden' : ''}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
