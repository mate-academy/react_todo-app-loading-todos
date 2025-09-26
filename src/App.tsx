/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';

const API_URL = 'https://mate.academy/students-api/todos';

// Тип для фільтрації
type Filter = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  // Додаємо стан для відстеження помилок
  const [error, setError] = useState<string>('');
  // Додаємо стан для активного фільтра
  const [filter, setFilter] = useState<Filter>('All');

  // isAllCompleted тепер залежить від відфільтрованого списку для Toggle All
  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  // Функція для показу помилки та її автоматичного приховування
  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  // 1. Завантаження todos з API для твого userId при старті
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Виправлена помилка в URL: `/` був зайвим, і краще використовувати URLSearchParams
        const response = await fetch(`${API_URL}?userId=${USER_ID}`); 

        if (!response.ok) {
          throw new Error('Can`t load todos from API');
        }

        const data: Todo[] = await response.json();

        setTodos(data);
      } catch (e: any) {
        console.error('Failed to fetch todos:', e);
        showError('Unable to load todos'); // 4. Повідомлення про помилку
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [showError]);

  // Логіка фільтрації
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      case 'All':
      default:
        return true;
    }
  });

  // Залишок активних завдань
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  // Компоненти, які відображаються лише коли є todos
  const shouldShowList = todos.length > 0;

  // Компонент, який симулює один Todo для початкової структури
  // У цій частині ми просто відображаємо завантажені Todo-елементи
  const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly // У цій частині функціональність не потрібна
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* Оверлей при завантаженні - не потрібен у цій частині */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );

  // У цій частині ми ігноруємо функцію handleToggleAll, оскільки зміни не зберігаються в API,
  // але додаємо її для уникнення помилки 'not defined'
  const handleToggleAll = () => {
    console.log('Toggle All clicked - functionality disabled in this part.');
  };

  // Функція для закриття повідомлення про помилку
  const handleCloseError = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (loading) {
    // Можна додати індикатор завантаження
    return <div className="loader">Loading todos...</div>;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* 5. Кнопка Toggle all активна, якщо всі todos completed */}
          <button
            type="button"
            className={`todoapp__toggle-all${isAllCompleted ? ' active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
            disabled={todos.length === 0}
            aria-label="Toggle all todos"
          />

          {/* Add a todo on form submit (не потрібна функціональність) */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled
            />
          </form>
        </header>

        {/* 2. Показ списку або приховування списку, якщо todos немає. */}
        {shouldShowList && (
          <section className="todoapp__main" data-cy="TodoList">
            {/* 2. Зберігаємо todos у useState і відмальовуємо через map */}
            {/* 3. Працює фільтрація */}
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}

            {/* Приклади-заглушки видалені, оскільки відображаються реальні дані */}
          </section>
        )}

        {/* 2. Приховування footer, якщо todos немає. */}
        {shouldShowList && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
            </span>

            {/* 3. Фільтри All / Active / Completed з підсвіткою активного. */}
            <nav className="filter" data-cy="Filter">
              {(['All', 'Active', 'Completed'] as Filter[]).map(filterName => (
                <a
                  key={filterName}
                  href={`#/${filterName.toLowerCase()}`}
                  className={`filter__link ${filter === filterName ? 'selected' : ''}`}
                  data-cy={`FilterLink${filterName}`}
                  onClick={() => setFilter(filterName)}
                >
                  {filterName}
                </a>
              ))}
            </nav>

            {/* Clear completed (не потрібна функціональність) */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(t => !t.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* 4. Повідомлення про помилку внизу: ховається класом hidden. */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />
        {error}
      </div>
    </div>
  );
};
