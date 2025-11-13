/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterEnum, Footer } from './components/Footer/footer';
import { Error } from './components/Error/errorMessage';
import { Header } from './components/Header/header';
import { TodoItem } from './components/TodoItem/todoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.all);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(todos);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    if (filter && todos) {
      switch (filter) {
        case FilterEnum.all:
          setFilteredTodos(todos);
          break;
        case FilterEnum.active:
          setFilteredTodos(todos.filter(todo => !todo.completed));
          break;
        case FilterEnum.completed:
          setFilteredTodos(todos.filter(todo => todo.completed));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function toggleTodoCompleted(todoId: number) {
    setTodos(prevTodos => {
      if (!prevTodos) {
        return prevTodos;
      }

      setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(false);
      }, 100);

      return prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      );
    });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos?.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isLoaded={isLoaded}
              toggleTodoCompleted={toggleTodoCompleted}
            />
          ))}
        </section>

        {todos && todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <Error errorMsg={errorMessage} />
    </div>
  );
};
