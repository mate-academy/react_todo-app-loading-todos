/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Footer } from './components/footer/Footer';
import { ErrorMessage } from './components/errorMessage/error';
import { Header } from './components/header/header';
import { TodoList } from './components/todoList/todoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const FILTERS = {
    all: 'all',
    completed: 'completed',
    active: 'active',
  };

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredList, setFilteredList] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(true);
  const [unCompletedCount, setUnCompletedCount] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodoList(data);
        setFilteredList(data);
      })
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  // прибираємо помилку через 3 секунди, а після вже видаляємо таймер
  useEffect(() => {
    // let timer: ReturnType<typeof setTimeout>;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const uncompleted = todoList.filter(todo => todo.completed === false);

    setUnCompletedCount(uncompleted.length);

    if (uncompleted.length === 0) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [todoList]);

  const handleFilter = (query: string) => {
    switch (query) {
      case FILTERS.completed:
        setFilteredList(todoList.filter(todo => todo.completed === true));
        break;
      case FILTERS.active:
        setFilteredList(todoList.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredList(todoList);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header toggleAll={isCompleted} />

        <TodoList todoList={filteredList} />

        {todoList.length > 0 && (
          <Footer filter={handleFilter} unCompletedCount={unCompletedCount} />
        )}
      </div>

      <ErrorMessage error={error} hideError={setError} />
    </div>
  );
};
