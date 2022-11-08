import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Filter } from '../Filter/Filter';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [
    filterStatus,
    setTodosStatus,
  ] = useState<FilterType>(FilterType.All);

  const filterTodos = () => {
    let filtered;

    switch (filterStatus) {
      case FilterType.Active:
      case FilterType.Completed:
        filtered = todos.filter(todo => (
          (filterStatus === FilterType.Active)
            ? !todo.completed
            : todo.completed
        ));
        break;

      default:
        filtered = todos;
    }

    return filtered;
  };

  useEffect(() => {
    setFilteredTodos(filterTodos());
  }, [filterStatus]);

  const changeStatus = (status: FilterType) => {
    setTodosStatus(status);
  };

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </section>

      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          4 items left
        </span>

        <Filter
          changeFilterStatus={changeStatus}
          status={filterStatus}
        />

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
