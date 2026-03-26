import React, { useEffect, useState } from 'react';
import './styles/todoapp.scss';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrorNotification } from './components/TodoErrorNotification';
import { Todo } from './types/Todo';
import { ErrorState } from './types/ErrorState';
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userInput, setUserInput] = useState('');
  const [filterType, setFilterType] = useState<FilterTypes>('all');
  const [errorState, setErrorState] = useState<ErrorState>({
    message: '',
    isVisible: false,
  });

  const getPreparedTodos = (type: FilterTypes): Todo[] => {
    let preparedTodos = [...todos];

    if (type) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (type) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });
    }

    return preparedTodos;
  };

  useEffect(() => {
    const loadTodos = async () => {
      setErrorState({
        message: '',
        isVisible: false,
      });

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorState({
          message: 'Unable to load todos',
          isVisible: true,
        });
      }
    };

    loadTodos();
  }, []);

  const preparedTodos = getPreparedTodos(filterType);

  const hasTodos = todos.length > 0;

  const countActiveTodos = () => {
    let count = 0;

    todos.forEach(todo => {
      if (!todo.completed) {
        count++;
      }
    });

    return count;
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader userInput={userInput} onFieldChange={setUserInput} />

        <TodoList todos={preparedTodos} />

        {/* Hide the footer if there are no todos */}
        {hasTodos && (
          <TodoFooter
            activeTodos={countActiveTodos()}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoErrorNotification errorState={errorState} onHide={setErrorState} />
    </div>
  );
};
