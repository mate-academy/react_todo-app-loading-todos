import React from 'react';
import { Todo } from '../../types/Todo'; // Adjust the path as needed

type FooterProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  todosCounter: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  preparedTodos: Todo[];
  setPreparedTodos: React.Dispatch<React.SetStateAction<Todo[] | []>>;
};

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const Footer: React.FC<FooterProps> = ({
  selected,
  setSelected,
  todosCounter,
  todos,
  setTodos,
  preparedTodos,
  setPreparedTodos,
}) => {
  function filterBy(filter: Filter = Filter.All): Todo[] | [] {
    switch (filter) {
      case Filter.Active:
        setPreparedTodos(() =>
          todos.filter((currentTodo: Todo) => currentTodo.completed === false),
        );
        setSelected(Filter.Active);

        return preparedTodos;

      case Filter.Completed:
        setPreparedTodos(() =>
          todos.filter((currentTodo: Todo) => currentTodo.completed === true),
        );
        setSelected(Filter.Completed);

        return preparedTodos;

      case Filter.All:
        setPreparedTodos(todos || []);
        setSelected(Filter.All);

        return preparedTodos;

      default:
        setSelected(Filter.All);

        return preparedTodos;
    }
  }

  function clearCompleted(todosItems: Todo[]): void {
    const cleanedTodos = todosItems.filter(
      todoItem => todoItem.completed !== true,
    );

    setTodos(cleanedTodos);
  }

  // todos.filter(todo => !todo.completed).length | 0
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${selected === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => {
            filterBy();
          }}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${selected === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => filterBy(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${selected === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => filterBy(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted(todos ?? [])}
      >
        Clear completed
      </button>
    </footer>
  );
};
