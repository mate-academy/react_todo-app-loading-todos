/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorType } from './types/ErrorType';
import { ErrorNorification } from './Components/ErrorNorification';
import { TodosList } from './Components/TodosList';
import { getTodoId } from './utils/functionsHelper';
import { SortBy } from './types/SortBy';
import { TodoFooter } from './Components/TodoFooter';

const USER_ID = 10632;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [typeOfError, setTypeOfError] = useState<ErrorType>(ErrorType.none);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterBy, setFilterBY] = useState(SortBy.all);

  const countActiveTodos = useMemo(() => {
    const activeTodosCount = todos.reduce((count, cur) => {
      if (!cur.completed) {
        return count + 1;
      }

      return count;
    }, 0);

    return activeTodosCount;
  }, [todos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos(USER_ID);

        setTodos(data);
      } catch (error) {
        setTypeOfError(ErrorType.load);
      }
    };

    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newTodoTitle.trim()) {
        setTypeOfError(ErrorType.empty);
      } else {
        const newTodo = {
          completed: false,
          id: getTodoId(),
          userId: USER_ID,
          title: newTodoTitle,
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
        setNewTodoTitle('');
      }
    }
  };

  const handleFilterAllTodos = () => {
    setFilterBY(SortBy.all);
  };

  const handleFilterActiveTodos = () => {
    setFilterBY(SortBy.active);
  };

  const handleFilterCompletedTodos = () => {
    setFilterBY(SortBy.completed);
  };

  const updateTodoStatus = (currentTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleClearCompletedTodos = () => {
    const clearedTodos = todos.filter(
      todo => !todo.completed,
    );

    setTodos(clearedTodos);
  };

  const handleDeleteTodo = (deletedTodo: Todo) => {
    const newTodos = todos.filter(todo => todo.id !== deletedTodo.id);

    setTodos(newTodos);
  };

  const visibleTodosList = [...todos].filter(todo => {
    if (filterBy === SortBy.active) {
      return !todo.completed;
    }

    if (filterBy === SortBy.completed) {
      return todo.completed;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleInputChange}
              onKeyDown={handleOnKeyDown}
            />
          </form>
        </header>

        <TodosList
          todos={visibleTodosList}
          updateTodoStatus={updateTodoStatus}
          onDeleteTodo={handleDeleteTodo}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodoFooter
            onFilterAllTodos={handleFilterAllTodos}
            onFilterActiveTodos={handleFilterActiveTodos}
            onFilterCompletedTodos={handleFilterCompletedTodos}
            onClearCompleted={handleClearCompletedTodos}
            selectedFilter={filterBy}
            activeTodos={countActiveTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {typeOfError && (
        <ErrorNorification
          errorType={typeOfError}
        />
      )}
    </div>
  );
};
