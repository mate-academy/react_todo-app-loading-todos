import React, { useState } from 'react';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { useTodo } from './context/TodoContext';
import { Notification } from './components/Notification';
import { Status } from './types/filterStatusENUM';

export const App: React.FC = () => {
  const { todos } = useTodo();
  const [selectedFilter, setSelectedFilter] = useState(Status.All);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              selectedFilter={selectedFilter}
            />
            <Filter
              selectedFilter={selectedFilter}
              selectTheFilter={setSelectedFilter}
            />
          </>
        )}
      </div>

      <Notification />
    </div>
  );
};
