/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorStatus } from './types/ErrorStatus';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos()
      .then(res => setTodoList(res))
      .catch(() => {
        setError(ErrorStatus.UnableToLoad);
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const filteredTodoList = (): Todo[] => {
    switch (filter) {
      case Status.Active:
        return todoList.filter(todo => !todo.completed);
      case Status.Completed:
        return todoList.filter(todo => todo.completed);
      default:
        return todoList;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todoList.length !== 0 && (
          <TodoList filteredTodos={filteredTodoList()} />
        )}
        {/* Hide the footer if there are no todos */}
        {todoList.length !== 0 && (
          <Footer
            todosCounter={todoList.filter(el => !el.completed).length}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
