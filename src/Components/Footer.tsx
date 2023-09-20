import React from 'react';
import { Todo } from '../types/Todo';
import { NavMenu } from './NavMenu';
import { ForComletedTodo } from '../types/enumFilter';

type Props = {
  todos: Todo[];
  condition: ForComletedTodo;
  setCondition: (condition: ForComletedTodo) => void;
};

export const Footer: React.FC<Props> = ({ todos, condition, setCondition }) => {
  const todosNoComleted = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosNoComleted} item${todosNoComleted !== 1 ? 's' : ''} left`}
      </span>
      <NavMenu condition={condition} setCondition={setCondition} />
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
