/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Error } from './components/Error/Error';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api/todos';
import { FilterType } from './types/Filter';


const getFilterTodos = (
  todos: Todo[],
  filterType: FilterType
  ) => {
    const copy = [...todos];

    switch (filterType) {
      case FilterType.Active:
        return copy.filter(({ completed }) => !completed)
      case FilterType.Completed:
        return copy.filter(({ completed }) => completed)
      default:
        return copy;
    }
}


export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext<User | null>(AuthContext);
  const userId = user?.id ? user.id : 0;
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterBy, setFilterBy] = useState(FilterType.All);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const todoFromServer = async () => {
      try {
        const todosFromServer = await getTodos(userId);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(`${error}`);
      } finally {
        setIsLoaded(true);
      }
    };

    todoFromServer();
  }, []);

const filteredTodos = getFilterTodos(todos, filterBy)

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header newTodoField={newTodoField} />

        {todos
          &&
          <>
            <Main todos={filteredTodos} isLoaded={isLoaded}/>

            <Footer
              filteredTodos={filteredTodos}
              getFilteredBy={setFilterBy}
              selectedButtonType={filterBy}
            />
          </>
        }

        {errorMessage
          &&
          <Error
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        }
      </div>
    </div>
  );
};
