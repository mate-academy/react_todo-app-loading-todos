import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[],
  setTodoStatus: (status: TodoStatus) => void,
}

export const Footer: React.FC<Props> = ({ todos, setTodoStatus}) => {
  return (
    <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className="filter__link selected"
              onClick={() => setTodoStatus(TodoStatus.ALL)}  
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              onClick={() => setTodoStatus(TodoStatus.ACTIVE)}   
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              onClick={() => setTodoStatus(TodoStatus.COMPLETED)}
  
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
  )
}