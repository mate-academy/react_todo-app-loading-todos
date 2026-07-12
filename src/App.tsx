/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/filterStatus';
import { ErrorMessage } from './types/errorMessage';
import { TodoHeader } from './components/todoHeader/todoHeader';
import { TodoFooter } from './components/todoFooter/todoFooter';
import { TodoMain } from './components/todoMain/todoMain';

export const App: React.FC = () => {
  // Стан для збереження списку справ, завантажених з сервера
  const [todos, setTodos] = useState<Todo[]>([]);
  // Стан для збереження тексту помилки (LOAD, EMPTY_TITLE тощо)
  const [errorMessage, setErrorMessage] = useState('');
  // Стан для контролю значення в інпуті додавання нової справи
  const [newTodoTitle, setNewTodoTitle] = useState('');
  // Стан для блокування інпуту під час запиту до API
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Стан для поточного фільтра (all, active, completed)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  // Ефект для первинного завантаження справ при мовтуванні компонента
  useEffect(() => {
    getTodos()
      .then(response => {
        // Записуємо отримані з сервера справи у стан
        setTodos(response);
      })
      .catch(() => {
        // У разі помилки завантаження показуємо відповідне повідомлення
        setErrorMessage(ErrorMessage.LOAD);
      });
  }, []);

  // Ефект автоматичного приховання повідомлення про помилку через 3 секунди
  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    // Запускаємо таймер очищення помилки
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    // Очищаємо таймер при зміні помилки або розмонтуванні ефекту
    return () => clearTimeout(timerId);
  }, [errorMessage]);

  // Фільтрація справ на основі поточного filterStatus
  const visibleTodos = todos.filter(todo => {
    if (filterStatus === FilterStatus.ACTIVE) {
      return !todo.completed; // Повертаємо тільки неліквидовані справи
    }

    if (filterStatus === FilterStatus.COMPLETED) {
      return todo.completed; // Повертаємо тільки виконані справи
    }

    return true; // Для фільтра ALL повертаємо весь список
  });

  // Обробник створення нової справи
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTodoTitle.trim();

    // Якщо заголовок порожній, показуємо помилку валідації
    if (!trimmedTitle) {
      setErrorMessage(ErrorMessage.EMPTY_TITLE);

      return;
    }

    // Вмикаємо лоадер/блокування інпуту
    setIsSubmitting(true);

    createTodo(trimmedTitle)
      .then(newTodo => {
        // Додаємо нову справу в кінець поточного списку
        setTodos(prevTodos => [...prevTodos, newTodo]);
        // Очищаємо інпут після успішного виконання
        setNewTodoTitle('');
      })
      .catch(() => {
        // Показуємо помилку додавання, якщо сервер повернув помилку
        setErrorMessage(ErrorMessage.ADD);
      })
      .finally(() => {
        // Знімаємо блокування інпуту в будь-якому випадку
        setIsSubmitting(false);
      });
  };

  // Перевірка наявності ідентифікатора користувача
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleSubmit={handleSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          isSubmitting={isSubmitting}
        />

        {/* Рендеримо список та футер тільки якщо в масиві є хоча б один todo */}
        {todos.length > 0 && (
          <>
            <TodoMain visibleTodos={visibleTodos} />

            <TodoFooter
              todos={todos}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </>
        )}
      </div>

      {/* Контейнер помилки, який приховується за допомогою класу hidden */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
