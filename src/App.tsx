import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { TodoCompletedCategory } from './types/TodoCompletedCategory';
import { filterTodosByComplated } from './utils/filterTodosByCompleted';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedCategory, setCompletedCategory] =
    useState<TodoCompletedCategory>(TodoCompletedCategory.all);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.noneError);
  const countOfNotCompletedTodos = todos.filter(todo => !todo.completed).length;
  const filtredTodos = filterTodosByComplated(todos, completedCategory);

  async function fetchTodosFromApi() {
    try {
      const todosFromApi = await getTodos();

      setTodos(todosFromApi);
    } catch {
      setErrorMessage(Errors.loadError);
    }
  }

  useEffect(() => {
    fetchTodosFromApi();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isAllTodosCompleted={countOfNotCompletedTodos === 0} />
        {!!todos.length && (
          <>
            <TodoList todos={filtredTodos} />
            <TodoFooter
              countOfNotCompletedTodos={countOfNotCompletedTodos}
              completedCategory={completedCategory}
              onCompletedCategory={setCompletedCategory}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
