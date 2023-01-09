import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import FooterLink from './FooterLink/FooterLink';

type Props = {
  setVisibleTodos: (value: Todo[]) => void,
  visibleTodos: Todo[]
  todos: Todo[]
};

enum FilterTypes {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

const TodoFooter:
React.FC<Props> = ({ setVisibleTodos, todos, visibleTodos }) => {
  const filterTodos = () => {
    setVisibleTodos(todos.filter((todo: Todo) => {
      return todo;
    }));
  };

  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    filterTodos();
  }, []);

  const showAllTodos = () => {
    filterTodos();
    setSelectedClass(FilterTypes.All);
  };

  const showFilteredTodos = (value: string) => {
    if (value === 'active') {
      setVisibleTodos(todos.filter((todo: Todo) => {
        return !todo.completed;
      }));
    } else {
      setVisibleTodos(todos.filter((todo: Todo) => {
        return todo.completed;
      }));
    }

    setSelectedClass(value);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${visibleTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <FooterLink
          href="#/"
          dataCy="FilterLinkAll"
          className={`filter__link ${selectedClass === 'all' && 'selected'}`}
          text="All"
          onClick={showAllTodos}
        />
        <FooterLink
          href="#/active"
          dataCy="FilterLinkActive"
          className={`filter__link ${selectedClass === 'active' && 'selected'}`}
          text="Active"
          onClick={() => showFilteredTodos(FilterTypes.Active)}
        />
        <FooterLink
          dataCy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${selectedClass === 'completed' && 'selected'}`}
          text="Completed"
          onClick={() => showFilteredTodos(FilterTypes.Completed)}
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
