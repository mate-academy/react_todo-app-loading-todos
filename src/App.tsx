/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SearchField } from './components/SearchField';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorProvider } from './context/TodoError';
import { ErrorBox } from './components/ErrorBox';
import { waitToClose } from './utils/hideErrorWithDelay';
import { TodoStatus } from './types/TodoStatus';

const USER_ID = 11533;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);

  const {
    setHasLoadingError,
  } = useContext(ErrorProvider);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
        setHasLoadingError(false);
      })
      .catch(() => {
        setHasLoadingError(true);
      });

    waitToClose(3000, setHasLoadingError);
  }, []);

  const hasTodos = todos.length > 0;

  const filteredTodo = useMemo(() => todos.filter(todo => {
    switch (selectedStatus) {
      case TodoStatus.Active:
        return !todo.completed;

      case TodoStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [selectedStatus, todos]);

  const countOfNotCompletedTodo = useMemo(() => todos
    .reduce((acc, todo) => (
      acc + +!todo.completed
    ), 0), [todos]);

  const allTodoCompleted = filteredTodo
    .every(({ completed }) => completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          allTodoCompleted={allTodoCompleted}
          hasTodos={hasTodos}
        />

        {Boolean(todos.length) && (
          <TodoList todos={filteredTodo} />
        )}

        {Boolean(todos.length) && (
          <Footer
            countOfNotCompletedTodo={countOfNotCompletedTodo}
            setSelectedStatus={setSelectedStatus}
            allTodoCompleted={allTodoCompleted}
            selectedStatus={selectedStatus}
          />
        )}
      </div>

      <ErrorBox />
    </div>
  );
};
