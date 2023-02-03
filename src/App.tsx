/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { TodoList } from './components/TodosList/TodosList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[] | []>([]);
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
  }, []);

  useEffect(() => {
    if (typeOfError !== ErrorType.success) {
      setTimeout(() => setTypeOfError(ErrorType.success), 3000);
    }
  }, [typeOfError]);

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
        return todos.filter(item => item.completed === false);
      case Filter.completed:
        return todos.filter(item => item.completed === true);
      default:
        return todos;
    }
  };

  const listBoolean = !!todos.length;

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
          <TodoList todos={listModified(filterType)} />
          {listBoolean && (
            <Footer
              onSetFilterType={setFilterType}
              activeTodos={listModified(Filter.active).length}
              filterType={filterType}
            />
          )}
        </div>

        <Error
          error={typeOfError}
          onHandleErrorRemove={handleErrorRemove}
        />
      </div>
    </AuthProvider>
  );
};
