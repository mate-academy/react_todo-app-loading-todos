import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';
import { InfoTodo } from '../InfoTodo';
import { FilterForTodo } from '../FilterForTodo';

type Props = {
  todos: Todo[];
};

export const ListOfTodo: React.FC<Props> = ({ todos }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentStatus, setTodosStatus] = useState<TodoStatus>(TodoStatus.ALL);

  const filterTodos = () => {
    let filtered;

    switch (currentStatus) {
      case TodoStatus.ACTIVE:
      case TodoStatus.COMPLETED:
        filtered = todos.filter((todo) => (currentStatus === TodoStatus.ACTIVE
          ? !todo.completed : todo.completed));
        break;
      default:
        filtered = todos;
    }

    return filtered;
  };

  useEffect(() => {
    setFilteredTodos(filterTodos());
  }, [currentStatus, filterTodos]);

  const handleChangeStatus = (status: TodoStatus) => {
    setTodosStatus(status);
  };

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map((todo) => (
          <InfoTodo todo={todo} key={todo.id} />
        ))}
      </section>

      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {todos.length}
          {' '}
          items left
        </span>

        <FilterForTodo
          onChangeFilter={handleChangeStatus}
          status={currentStatus}
        />

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          {todos.find((todo) => Object.values(todo).includes(true))
            ? 'Clear completed'
            : ''}
        </button>
      </footer>
    </>
  );
};
