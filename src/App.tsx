/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { TodoProvider, TodosContext } from './context/TodoContext';

const USER_ID = 11526;

export const App: React.FC = () => {
  const { error } = useContext(TodosContext);
  const [selectedFilter, setSelectedFilter] = useState<
  'all' | 'active' | 'completed'>('all');

  const handleSelectFilter = (filterType: 'all' | 'active' | 'completed') => {
    setSelectedFilter(filterType);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoProvider>
          <Header />
          <TodoList selectedFilter={selectedFilter} />
          <Footer onFilterChange={handleSelectFilter} />
        </TodoProvider>
      </div>
      {error && <Error />}
    </div>
  );
};
