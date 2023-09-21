import { useContext } from 'react';
import { TodoInfo } from './TodoInfo';
import { TodosContext } from '../context/TodoContext';

type TodoListProps = {
  selectedFilter: 'all' | 'active' | 'completed';
};

export const TodoList = ({ selectedFilter }: TodoListProps) => {
  const { todos } = useContext(TodosContext);

  const visibleTodos = todos.filter((todo) => {
    if (selectedFilter === 'completed') {
      return todo.completed;
    }

    if (selectedFilter === 'active') {
      return !todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoInfo todo={todo} />;
      })}
    </section>
  );
};
