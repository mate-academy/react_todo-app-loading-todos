import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle, import/extensions
// eslint-disable-next-line import/no-cycle
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';
import { TodoContextProps } from '../types/TodosContextProps';
// eslint-disable-next-line import/no-cycle
import { TodoContext } from './TodosContext';

export const TodoList:React.FC = () => {
  const {
    todos,
    filter,
    toggleCompleted,
    deleteTodo,
  }:TodoContextProps = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.ACTIVE:
        return !todo.completed;
      case Status.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
