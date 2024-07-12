import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';
import { Footer } from '../Footer';
import { Filter } from '../../types/Filter';

interface Props {
  displayedTodos: Todo[];
  filter: Filter;
  setFilter: (value: Filter) => void;
  activeTodosCount: number;
  areThereCompletedTodos: boolean;
}

export const TodoList: React.FC<Props> = ({
  displayedTodos,
  filter,
  setFilter,
  activeTodosCount,
  areThereCompletedTodos,
}) => (
  <>
    <section className="todoapp__main" data-cy="TodoList">
      {displayedTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>

    <Footer
      activeTodosCount={activeTodosCount}
      areThereCompletedTodos={areThereCompletedTodos}
      filter={filter}
      setFilter={setFilter}
    />
  </>
);
