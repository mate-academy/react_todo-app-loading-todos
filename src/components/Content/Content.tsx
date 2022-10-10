import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { getFilteredTodos, getTodos } from '../../api/todos';
import { getUserId } from '../../api/users';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';
import { Error } from '../../types/Error';

type Props = {
  onError: (error: Error | null) => void;
};

export const Content: React.FC<Props> = ({ onError }) => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState(TodoStatus.ALL);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, todoFilter)
  ), [todos, todoFilter]);

  const handleTodoFilter = useCallback((filterStatus: TodoStatus) => {
    setTodoFilter(filterStatus);
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(getUserId(user))
        .then(setTodos)
        .catch(() => {
          onError(Error.SERVER);
        });
    }
  }, []);

  return (
    <div className="todoapp__content">
      <Header
        todos={filteredTodos}
      />

      {todos.length > 0 && (
        <>
          <TodoList
            todos={filteredTodos}
          />

          <Footer
            todos={todos}
            todoFilter={todoFilter}
            onTodoFilter={handleTodoFilter}
          />
        </>
      )}
    </div>
  );
};
