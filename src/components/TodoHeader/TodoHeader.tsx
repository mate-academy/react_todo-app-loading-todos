import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { FilterNav } from '../../types/Filter';
import { TodoFooter } from '../TodoFooter/TodoFooter';

type Props = {
  todos: Todo[];
  onSubmit: (newTitle: string) => void;
  deleteTodo: (todoId: number) => void;
  handleFilter: (filterName: FilterNav) => void;
  selectFilter: FilterNav;
  totalItems: number;
  completedTodos: number;
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  onSubmit,
  deleteTodo,
  handleFilter,
  selectFilter,
  totalItems,
  completedTodos,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(newTodoTitle);
    setNewTodoTitle('');
  };

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />

        {/* Add a todo on form submit */}
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleInputSubmit}
            ref={inputRef}
          />
        </form>
      </header>
      {todos.length !== 0 && <TodoList todos={todos} deleteTodo={deleteTodo} />}
      {totalItems !== 0 ? (
        <TodoFooter
          handleFilter={handleFilter}
          selectFilter={selectFilter}
          totalItems={totalItems}
          completedTodos={completedTodos}
        />
      ) : null}
    </div>
  );
};
