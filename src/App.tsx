/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodosList } from './TodosList';
import { InputField } from './InputField';
import { ErrorMessage } from './handleError';
import { Footer } from './Footer';

// type TodoStatus = 'all' | 'active' | 'completed';

enum TodoStatus {
  all,
  active,
  completed,
}

const USER_ID = 10627;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(TodoStatus.all);
  const [itemsLeft, setItemsLeft] = useState(0);

  const [isError, setIsError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodosList(response);
        setVisibleTodos(response);
        setItemsLeft(response.filter(todo => !todo.completed).length);
      })
      .catch((errorType) => setIsError(errorType));
  }, []);

  const handleFilterTodos = (newStatus: TodoStatus) => {
    setStatus(newStatus);

    switch (newStatus) {
      case TodoStatus.completed:
        setVisibleTodos(todosList.filter(todo => todo.completed));
        break;
      case TodoStatus.active:
        setVisibleTodos(todosList.filter(todo => !todo.completed));
        break;
      default:
        setVisibleTodos(todosList);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <InputField hasTodos={todosList.length > 0} />
        {todosList.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodosList
                visibleTodos={visibleTodos}
              />
            </section>
            <Footer
              handleFilterTodos={handleFilterTodos}
              status={status}
              itemsLeft={itemsLeft}
            />
          </>
        )}
      </div>
      {isError !== ''
      && <ErrorMessage handleSetError={setIsError} errorMess={isError} />}
    </div>
  );
};
