import React, { useState, useEffect, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, deleteTodo, createTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [isLoading, setIsLoading] = useState(false);
  const newTodoField = useRef<HTMLInputElement>(null);

  // Завантажуємо дані з сервера при першому рендері
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []); // Пустий масив означає, що ефект виконається лише раз

  useEffect(() => {
    // Якщо помилки немає, нічого не робимо і виходимо.
    // Цей 'return' без значення задовольняє TypeScript.
    if (!error) {
      return;
    }

    // Якщо ми дійшли сюди, значить помилка є.
    // Запускаємо таймер.
    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    // І повертаємо функцію очищення.
    // Тепер це єдиний шлях, який повертає значення.
    return () => clearTimeout(timerId);
  }, [error]);

  const handleFormSubmit = (event: React.FormEvent) => {
    // Забороняємо перезавантаження сторінки
    event.preventDefault();

    const normalizedTitle = newTodoTitle.trim();

    // Не даємо створити завдання з порожнім заголовком
    if (!normalizedTitle) {
      setError('Title should not be empty');

      return;
    }

    setIsLoading(true);

    createTodo(normalizedTitle)
      .then(newTodoFromServer => {
        // Сервер зберіг завдання і повернув його нам (вже з ID)
        // Тепер ми можемо безпечно додати його до нашого локального стану
        setTodos(prevTodos => [...prevTodos, newTodoFromServer]);

        setNewTodoTitle('');
      })
      .catch(() => {
        setError('Unable to add a todo');
      })
      .finally(() => {
        // Завжди вимикаємо завантаження і повертаємо фокус
        setIsLoading(false);
        newTodoField.current?.focus();
      });
  };

  const hideError = () => {
    setError('');
  };

  let filteredTodos = todos;

  switch (filter) {
    case FilterType.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case FilterType.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const deletePromises = completedTodos.map(todo => deleteTodo(todo.id));

    setIsLoading(true);

    // 3. Виконуємо всі запити паралельно
    Promise.all(deletePromises)
      .then(() => {
        // 4. Якщо ВСІ запити успішні, оновлюємо локальний стан
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
      })
      .catch(() => {
        setError('Unable to delete a todo');
      })
      .finally(() => {
        setIsLoading(false);
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
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form onSubmit={handleFormSubmit}>
            <input
              ref={newTodoField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isLoading}
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
          </form>
        </header>
        <fieldset disabled={isLoading}>
          <TodoList todos={filteredTodos} />
        </fieldset>

        {todos.length > 0 && (
          <fieldset disabled={isLoading}>
            <Footer
              filter={filter}
              onFilterChange={setFilter}
              activeTodosCount={activeTodosCount}
              completedTodosCount={completedTodosCount}
              onClearCompleted={handleClearCompleted}
            />
          </fieldset>
        )}
      </div>

      {/* Компонент помилки покаже себе сам, якщо буде текст помилки */}
      <Notification error={error} onClose={hideError} />
    </div>
  );
};
