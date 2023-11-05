import { useEffect, useState } from 'react';
import { TodoItem } from './TodoListElements/TodoItem';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { Footer } from './Footer';
import { FilterType } from '../../types/FilterType';

type Props = {
  userId: number;
};

export const TodoList: React.FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMesage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filteredTodo, setFilteredTodo] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setErrorMesage('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  let updatedTodos = [...todos];

  switch (filteredTodo) {
    case FilterType.ALL:
      updatedTodos = todos.filter(todo => todo);
      break;
    case FilterType.ACTIVE:
      updatedTodos = todos.filter(todo => !todo.completed);
      break;
    case FilterType.COMPLETED:
      updatedTodos = todos.filter(todo => todo.completed);
      break;
    default: updatedTodos = todos;
  }

  const todosQty = todos.filter(todo => todo.completed !== true).length;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <p>{errorMessage}</p>

      { updatedTodos.map(todo => (
        <TodoItem
          title={todo.title}
          key={todo.id}
          completed={todo.completed}
          isLoading={loading}
        />
      ))}

      { todos.length > 0 && (
        <Footer
          todosQty={todosQty}
          filterTodo={setFilteredTodo}
          selectedTodoFilter={filteredTodo}
        />
      )}

    </section>
  );
};
