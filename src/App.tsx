/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoType } from './types/TodoType';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Footer, SortType } from './components/Footer';

const USER_ID = 6526;

const getReorderedList = (sortType: SortType, list: TodoType[]) => {
  switch (sortType) {
    case SortType.Active:
      return list.filter(item => !item.completed);
    case SortType.Completed:
      return list.filter(item => item.completed);
    default:
      return list;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [selectedSortType, setSortType] = useState(SortType.All);
  const [isError, setError] = useState(false);

  const fetchTodos = async () => {
    try {
      const actualTodos = await getTodos(USER_ID);

      setTodos(actualTodos);
    } catch (error) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const getSortType = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  const visibleList = useMemo(() => getReorderedList(selectedSortType, todos),
    [selectedSortType, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          activeTodos={getReorderedList(SortType.Active, todos).length}
          hasTodos={!!todos.length}
        />
        <Section
          todos={visibleList}
        />
        {!!todos.length && (
          <Footer
            itemsLeft={getReorderedList(SortType.Active, todos)}
            selectedSortType={selectedSortType}
            onSortType={getSortType}
          />
        )}
      </div>
      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden={!isError}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />
        Error
      </div>
    </div>
  );
};
