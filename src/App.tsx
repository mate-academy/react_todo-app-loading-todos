import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosApi from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getFilteredTodos } from './utils/getFilterTodos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { wait } from './utils/fetchClient';
import { Error } from './components/Error';

const getNextTodoId = (todo: Todo[]) => {
  const ids = todo.map(item => item.id);

  return Math.max(...ids, 0) + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    todosApi
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(`Unable to load todos`);
        wait(3000).then(() => {
          setErrorMessage('');
        });
      });
  }, []);

  function addTodo({ title, completed, userId }: Todo) {
    todosApi
      .createTodos({ title, completed, userId })
      .then(newTodo => {
        setTodos(currentTodos => {
          return [...currentTodos, newTodo];
        });
      });
  }

  const visibleTodos = getFilteredTodos([...todos], filter);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo({
      id: getNextTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: getNextTodoId(todos),
    });

    setTodoTitle('');
  };

  if (!todosApi.USER_ID) {
    return <UserWarning />;
  }

  const itemLeft = (items: Todo[]): number => {
    const item = items.filter(i => !i.completed);

    return item.length;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemLeft(todos)}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
