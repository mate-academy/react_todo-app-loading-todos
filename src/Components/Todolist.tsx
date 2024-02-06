import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface T {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  filterType: string,
  isLoading: boolean,
}

export const filterTodos = (array: Todo[], type: string) => {
  switch (type) {
    case 'active':
      return array.filter(todo => !todo.completed);

    case 'completed':
      return array.filter(todo => todo.completed);

    default:
      return array;
  }
};

export const Section: React.FC<T> = (
  {
    todos,
    setTodos,
    filterType,
    isLoading,
  },
) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">

      <ul className="todo-list" data-cy="todoList">
        {filterTodos(todos, filterType).map(todo => (
          <TodoItem
            setTodos={setTodos}
            todos={todos}
            myTodo={todo}
            isLoading={isLoading}
            key={todo.id}
          />
        ))}
      </ul>

    </section>
  );
};
