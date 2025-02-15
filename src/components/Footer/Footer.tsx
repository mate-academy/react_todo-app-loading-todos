import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useState } from 'react';
import { ClearButton } from '../ClearButton/ClearButton';
import { FilterButtons } from '../FilterButtons/FilterButtons';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const Footer: React.FC<Props> = ({ setTodos, setCounter, todos }) => {
  const [statusId, setStatusId] = useState<{
    id: number;
    isActive: boolean;
  }>({
    id: 0,
    isActive: true,
  });
  const statusOptions = Object.values(Status);
  const storageTodos = JSON.parse(localStorage.getItem('todosStorage') || '[]');
  const activeTodos: number = storageTodos.filter(
    (todo: Todo) => !todo.completed,
  ).length;
  const completedTodos: number = storageTodos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  const handleFiltering = (title: string, id: number) => {
    setCounter(storageTodos.length);
    setStatusId({ id, isActive: true });

    switch (title) {
      case Status.Active:
        setTodos([...storageTodos].filter(filterTodo => !filterTodo.completed));
        break;
      case Status.Completed:
        setTodos([...storageTodos].filter(filterTodo => filterTodo.completed));
        break;
      default:
        setTodos(storageTodos);
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {statusOptions.map((title, indx) => {
          return (
            <FilterButtons
              key={indx}
              title={title}
              id={indx}
              isActive={statusId.id === indx}
              handleFiltering={handleFiltering}
              setStatusId={setStatusId}
            />
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedTodos > 0 && (
        <ClearButton
          completedTodos={completedTodos}
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </footer>
  );
};
