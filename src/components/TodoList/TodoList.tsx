import { useEffect, useState } from 'react';
import { getTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoItem } from './TodoListElements/TodoItem';
import { FilterType } from '../../types/FilterType';
import { ErrorNotification } from './ErrorNotification';

type Props = {
  userId: number;
};

export const TodoList: React.FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filteredTodo, setFilteredTodo] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
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
    <>
      <div className="todoapp__content">
        <section className="todoapp__main" data-cy="TodoList">
          <Header
            userId={userId}
            setTodos={setTodos}
            currentTodos={todos}
            setErrorMessage={setErrorMessage}
          />

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
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>

  );
};
