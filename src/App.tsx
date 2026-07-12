/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // Створюємо стан todos. Використовуємо генерик <Todo[]>,
  // щоб вказати, що це буде саме масив об'єктів Todo.
  // Початкове значення — порожній масив [].
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  // Створюємо стан для збереження поточного фільтра.
  // Початкове значення — 'all', щоб користувач одразу бачив усі справи.
  const [filterStatus, setFilterStatus] = useState('all');
  // Стейт для зберігання тексту в інпуті нової справи
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Цей ефект завантажує дані з сервера ТІЛЬКИ ОДИН РАЗ при монтуванні компонента
  useEffect(() => {
    getTodos()
      .then(response => {
        // Успішно оновлюємо масив справ
        setTodos(response);
      })
      .catch(() => {
        // Якщо виникла помилка, записуємо текст
        setErrorMessage('Unable to load todos');
      });
  }, []); // Порожній масив залежностей гарантує одноразовий запуск

  // 2. Цей ефект стежить за помилкою і автоматично приховує її через 3 секунди
  useEffect(() => {
    // Якщо помилки немає (рядок порожній), нічого не робимо
    if (!errorMessage) {
      return;
    }

    // Якщо помилка з'явилася, запускаємо таймер
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    // Очищаємо таймер, якщо ефект перезапуститься або компонент зникне
    return () => clearTimeout(timerId);
  }, [errorMessage]); // Спрацьовує щоразу, коли змінюється errorMessage

  // Фільтруємо масив todos «на льоту» перед тим, як рендерити його в JSX
  const visibleTodos = todos.filter(todo => {
    if (filterStatus === 'active') {
      return !todo.completed; // Активні — це ті, у яких completed === false
    }

    if (filterStatus === 'completed') {
      return todo.completed; // Завершені — це ті, у яких completed === true
    }

    return true; // Якщо 'all', повертаємо всі справи без змін
  });
  // Обробник відправки форми для додавання нової справи
  const handleSubmit = (event: React.FormEvent) => {
    // Зупиняємо стандартне перезавантаження сторінки браузером
    event.preventDefault();

    // Очищаємо назву від пробілів по краях
    const trimmedTitle = newTodoTitle.trim();

    // Перевіряємо, чи заголовок не порожній
    if (!trimmedTitle) {
      // Встановлюємо текст помилки згідно з вимогами тестів
      setErrorMessage('Title should not be empty');

      // Автоматично ховаємо помилку через 3 секунди
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      // Зупиняємо виконання, щоб не надсилати запит на сервер
      return;
    }

    // Блокуємо інпут

    setIsSubmitting(true);

    createTodo(trimmedTitle)
      .then(newTodo => {
        // Додаємо нову справу в масив todos
        setTodos(prevTodos => [...prevTodos, newTodo]);
        // Очищаємо інпут після успішного додавання
        setNewTodoTitle('');
      })
      .catch(() => {
        // Якщо виникла помилка, показуємо повідомлення
        setErrorMessage('Unable to add a todo');
      })
      .finally(() => {
        // Розблоковуємо інпут незалежно від результату запиту
        setIsSubmitting(false);
      });
  };

  if (!USER_ID) {
    return <UserWarning />;
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
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
              // Блокуємо інпут, коли йде запит до сервера (isSubmitting === true)
              disabled={isSubmitting}
            />
          </form>
        </header>

        {/* Загальна перевірка: ховаємо список і футер, якщо справ немає взагалі */}
        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {/* Запускаємо цикл по масиву visibleTodos */}
              {visibleTodos.map(todo => (
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
                      readOnly // Додаємо тимчасово, щоб React не сварився на відсутність onChange
                    />
                  </label>

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
                    <div
                      className="
                      modal-background
                      has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {/* Рахуємо кількість активних (незавершених) справ динамічно */}
                {todos.filter(t => !t.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${filterStatus === 'all' ? 'selected' : ''}`}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${filterStatus === 'active' ? 'selected' : ''}`}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${filterStatus === 'completed' ? 'selected' : ''}`}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterStatus('completed')}
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
          </>
        )}
      </div>

      {/* Додаємо клас hidden, якщо errorMessage порожній */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        {/* При кліці на кнопку скидаємо стан помилки в порожній рядок */}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {/* Відображаємо актуальний текст помилки зі стану */}
        {errorMessage}
        {/* Закоментований блок для довідки:
        Unable to load todos
        Title should not be empty
        Unable to add a todo
        Unable to delete a todo
        Unable to update a todo
        */}
      </div>
    </div>
  );
};
