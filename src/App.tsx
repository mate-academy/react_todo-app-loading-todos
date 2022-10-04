import {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { NewTodo } from './components/NewTodo';
import { getTodos } from './api/todos';
import { Todo, SortType } from './types/Todo';
import { Status } from './types/Status';

export const statuses:Status[] = [
  { id: '1', title: SortType.ALL, link: '/' },
  { id: '2', title: SortType.ACTIVE, link: '/active' },
  { id: '3', title: SortType.COMPLETED, link: '/completed' },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState(statuses[0].id);
  const [errorNotification, setErrorNotification] = useState('');
  const [isErrorShown, setIsErrorShown] = useState(false);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const selectedStatus = statuses
    .find(status => selectedStatusId === status.id) || statuses[0];

  const onStatusSelected = (status:Status) => {
    setSelectedStatusId(status.id);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        if (user) {
          const todosFromServer = await getTodos(user?.id);

          setTodos(todosFromServer);
        }
      } catch (error) {
        setErrorNotification('Unable to update a todo');
      }
    };

    loadTodos();
  }, []);

  const filteredTodos:Todo[] = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (selectedStatus.title) {
        case SortType.ACTIVE:
          return !completed;

        case SortType.COMPLETED:
          return completed;

        default:
          return true;
      }
    });
  }, [todos, selectedStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            aria-label="ToggleButton"
          />

          <NewTodo
            newTodoField={newTodoField}
          />
        </header>
        {todos.length > 0
          && (
            <>
              <TodoList
                todos={filteredTodos}
              />

              <Footer
                statuses={statuses}
                selectedStatusId={selectedStatusId}
                onStatusSelected={onStatusSelected}
                todos={todos}
              />
            </>
          )}
      </div>

      <ErrorNotification
        errorNotification={errorNotification}
        setErrorNotification={setErrorNotification}
        setIsErrorShown={setIsErrorShown}
        isErrorShown={isErrorShown}
      />

    </div>
  );
};
