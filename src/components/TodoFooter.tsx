import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoFilter } from './TodoFilter';
import { TodoClear } from './TodoClear';

export const TodoFooter: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter((todo) => !todo.completed).length} items left`}
          </span>
          <TodoFilter />
          <TodoClear />
        </footer>
      )}
    </>
  );
};
