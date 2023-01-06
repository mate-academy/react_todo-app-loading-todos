import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import FooterLink from './FooterLink/FooterLink';

type Props = {
  setVisibleTodos: (arg0: Todo[]) => void,
  todos: Todo[]
};

const TodoFooter: React.FC<Props> = ({ setVisibleTodos, todos }) => {
  const filterTodos = () => {
    setVisibleTodos(todos.filter((todo: Todo) => {
      return todo;
    }));
  };

  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    filterTodos();
  }, []);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <FooterLink
          href="#/"
          dataCy="FilterLinkAll"
          className={`filter__link ${selectedClass === 'all' && 'selected'}`}
          text="All"
          onClick={() => {
            filterTodos();
            setSelectedClass('all');
          }}
        />
        <FooterLink
          href="#/active"
          dataCy="FilterLinkActive"
          className={`filter__link ${selectedClass === 'active' && 'selected'}`}
          text="Active"
          onClick={() => {
            setVisibleTodos(todos.filter((todo: Todo) => {
              return !todo.completed;
            }));
            setSelectedClass('active');
          }}
        />
        <FooterLink
          dataCy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${selectedClass === 'completed' && 'selected'}`}
          text="Completed"
          onClick={() => {
            setVisibleTodos(todos.filter((todo: Todo) => {
              return todo.completed;
            }));
            setSelectedClass('completed');
          }}
        />

      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;
