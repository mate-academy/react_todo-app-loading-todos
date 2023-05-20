import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext, AuthProvider } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { Filter } from './types/Filter';

import { Header } from './components/Header/Header';
import { TodosList } from './components/TodosList/TodosList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [typeOfError, setTypeOfError] = useState(ErrorType.success);
  const [filterType, setFilterType] = useState(Filter.all);

  const handleGetRequest = (todoList: Todo[]) => {
    setTodos(todoList);
    setTypeOfError(ErrorType.success);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(list => handleGetRequest(list))
        .catch(() => setTypeOfError(ErrorType.get));
    }

    const timeoutID = setTimeout(() => setTypeOfError(ErrorType.success), 3000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleErrorRemove = () => {
    setTypeOfError(ErrorType.success);
  };

  const listModified = (type: Filter) => {
    switch (type) {
      case Filter.active:
        return todos.filter(item => !item.completed);
      case Filter.completed:
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const activeTodos = listModified(Filter.active).length;
  const completedTodos = listModified(Filter.completed).length;
  const todosFiltered = listModified(filterType);

  return (
    <AuthProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            newTodoField={newTodoField}
            onHandleInput={handleInput}
            inputValue={title}
          />
          <TodosList todos={todosFiltered} />
          {!!todos.length && (
            <Footer
              onSetFilterType={setFilterType}
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              filterType={filterType}
            />
          )}
        </div>

        <Error
          error={typeOfError}
          onErrorRemove={handleErrorRemove}
        />
      </div>
    </AuthProvider>
  );
};
