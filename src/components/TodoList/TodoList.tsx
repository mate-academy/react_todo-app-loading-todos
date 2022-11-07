import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [
    currentStatus,
    setTodosStatus,
  ] = useState<TodoStatus>(TodoStatus.ALL);

  const filterTodos = () => {
    let filtered;

    switch (currentStatus) {
      case TodoStatus.ACTIVE:
      case TodoStatus.COMPLETED:
        filtered = todos.filter(todo => (
          (currentStatus === TodoStatus.ACTIVE)
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
  }, [currentStatus]);

  const handleChangeStatus = (status: TodoStatus) => {
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

        <TodoFilter
          onChangeFilter={handleChangeStatus}
          status={currentStatus}
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
