/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoErrorNotification } from './components/TodoErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText] = useState('');
  const [sortType, setSortType] = useState(SortType.ALL);

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    switch (sortType) {
      case SortType.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case SortType.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
    }

    return filteredTodos;
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id).then(todoFromServer => setTodos(todoFromServer));
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList todos={getFilteredTodos()} />}

        {todos.length > 0 && (
          <TodoFooter
            setSortType={setSortType}
            todos={getFilteredTodos()}
          />
        )}
      </div>

      <TodoErrorNotification
        isError={isError}
        setIsError={setIsError}
        errorText={errorText}
      />
    </div>
  );
};
