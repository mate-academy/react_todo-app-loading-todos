/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMesage } from './components/ErrorMessage/ErrorMesage';
import { client } from './utils/fetchClient';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

const USER_ID = 10777;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorNotification, setErrorNotification] = useState(false);
  const [search, setSearch] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const arrTodos = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

        setTodos(arrTodos);
        setErrorNotification(false);
      } catch {
        setErrorNotification(true);
      }
    };

    if (USER_ID) {
      fetchTodos();
    }
  }, [USER_ID, setTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.ACTIVE:
          return !todo.completed;
        case Filter.COMPLETED:
          return todo.completed;
        case Filter.ALL:
          return true;
        default:
          return todo;
      }
    });
  }, [Filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          search={search}
          setSearch={setSearch}
        />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            todosShow={filteredTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {errorNotification && (
        <ErrorMesage
          errorString="Unable to perform the action"
        />
      )}
    </div>
  );
};
