/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { TodoList } from '../TodoList/TodoList';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoNotification } from '../TodoNotification/TodoNotification';
import { useTodo } from '../TodoContext/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useTodo();
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              selectedFilter={selectedFilter}
            />

            <TodoFooter
              selectedFilter={selectedFilter}
              selectTheFilter={setSelectedFilter}
            />
          </>
        )}
      </div>

      <TodoNotification />
    </div>
  );
};
