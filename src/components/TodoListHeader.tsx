import React, { useContext } from 'react';
import { TodoContext } from '../context/todo.context';

const TodoListHeader:React.FC = () => {
  const { todosStatistics } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {
        todosStatistics.totalTodos > 0 && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button type="button" className="todoapp__toggle-all active" />
        )
      }

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default TodoListHeader;
