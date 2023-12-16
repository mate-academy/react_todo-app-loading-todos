import { useContext, useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import '../styles/todo.scss';

export const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodoContext);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (status) {
      case 'active':
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;

      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
    }
  }, [status, todos]);

  return (
    <>
      {!!todos.length && (
        <>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </>
      )}
    </>
  );
};
