import React,
{
  useState, useEffect, useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { Errors } from './types/Errors';
import { getTodos } from './api/todos';
import Footer from './components/Footer';
import Header from './components/Header';
import Notification from './components/Notification';
import TodoList from './components/TodoList';
import { UserWarning } from './UserWarning';

const USER_ID = 6511;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilterType, setTodoFilterType] = useState<FilterBy>(FilterBy.all);
  const [errorType, setErrorType] = useState<Errors>(Errors.none);
  const [isErrorShow, setIsErrorShow] = useState(false);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (todoFilterType) {
        case FilterBy.active:
          return !todo.completed;

        case FilterBy.completed:
          return todo.completed;

        case FilterBy.all:
          return true;

        default:
          return todo;
      }
    });
  }, [todos, todoFilterType]);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setErrorType(Errors.load);
        setIsErrorShow(true);
      }
    };

    getTodosFromServer();
  }, []);

  const activeTodosNum = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );

  const completedTodosNum = todos.length - activeTodosNum;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodosNum={activeTodosNum}
        />

        {todos && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              activeTodosNum={activeTodosNum}
              completedTodosNum={completedTodosNum}
              todoFilterType={todoFilterType}
              setTodoFilterType={setTodoFilterType}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        errorType={errorType}
        isErrorShown={isErrorShow}
        onCloseError={() => setIsErrorShow(false)}
      />

    </div>
  );
};
