/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { User } from './types/User';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Error from './components/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user: User = useContext(AuthContext) as User;
  // const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([...todos]);

  const [addError, setAddError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [isAdding, setisAdding] = useState(true);
  const [loading, setLoading] = useState(false);

  const [leftNum, setLeftNum] = useState(0);

  enum SortBy {
    ALL,
    COMPLETED,
    ACTIVE,
  }

  const [sortType, setSortType] = useState(SortBy.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos(user.id)
      .then((json: Todo[]) => {
        setTodos(json);
        setFiltredTodos(json);
        setLeftNum(json.filter(todoItem => !todoItem.completed).length);
        setisAdding(false);
      })
      .catch(() => {
        setAddError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    setFiltredTodos([...todos]);
  }, [isAdding]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodos={setTodos}
          setFiltredTodos={setFiltredTodos}
          setTitle={setTitle}
          user={user}
          title={title}
          todos={todos}
          filtredTodos={filtredTodos}
          setUpdateError={setUpdateError}
          setAddError={setAddError}
          setTitleError={setTitleError}
          isAdding={isAdding}
          setLeftNum={setLeftNum}
          setLoading={setLoading}
          setisAdding={setisAdding}
        />
        <TodoList
          todos={filtredTodos}
          setTodos={setTodos}
          setFiltredTodos={setFiltredTodos}
          setLeftNum={setLeftNum}
          setDeleteError={setDeleteError}
          leftNum={leftNum}
          loading={loading}
          setLoading={setLoading}
        />
        <Footer
          todos={todos}
          setTodos={setTodos}
          setFiltredTodos={setFiltredTodos}
          leftNum={leftNum}
          setDeleteError={setDeleteError}
          setSortType={setSortType}
          sortType={sortType}
        />
      </div>

      <Error
        addError={addError}
        deleteError={deleteError}
        updateError={updateError}
        titleError={titleError}
        setAddError={setAddError}
        setDeleteError={setDeleteError}
        setUpdateError={setUpdateError}
        setTitleError={setTitleError}
      />
    </div>
  );
};
