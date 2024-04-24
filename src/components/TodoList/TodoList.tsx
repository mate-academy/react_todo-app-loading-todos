import { useTodosContext } from '../../context/TodosProvider';
import TodoItem from '../TodoItem';
import { useMemo } from 'react';

const TodoList = () => {
  const { todos, filter } = useTodosContext();

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filter === 'Active') {
      filtered = todos.filter(todo => !todo.completed);
    }

    if (filter === 'Completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    return filtered;
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

export default TodoList;
