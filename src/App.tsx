/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import { UserWarning } from './UserWarning';
import React, { useCallback, useEffect, useState } from 'react';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ErrorField } from './components/ErrorField/ErrorField';
import { FilterBy, ERROR } from './types/enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterQwery, setFilterQwery] = useState(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState<ERROR>(ERROR.default);
  const [, setTodosLoading] = useState(false);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  // console.log('render app');

  const loadTodos = useCallback(async () => {
    try {
      setTodosLoading(true);
      setErrorMessage(ERROR.default);
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      setErrorMessage(ERROR.todos);
    } finally {
      setTodosLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const onAdd = useCallback(async (value: string) => {
    try {
      if (value.trim() === '') {
        throw new Error(ERROR.title);
      }

      const res = await addTodo({
        title: value.trim(),
        userId: USER_ID,
        completed: false,
      });

      return res;
    } catch (err) {
      setErrorMessage(err.message || ERROR.add);
      throw new Error(ERROR.add);
    } finally {
      setTodosLoading(false);
    }
  }, []);

  const filteredTodos = (qwery: FilterBy): Todo[] => {
    return todos.filter(item => {
      if (qwery === FilterBy.Active) {
        return !item.completed;
      }

      if (qwery === FilterBy.Completed) {
        return item.completed;
      }

      return true;
    });
  };

  const visibleTodos = filteredTodos(filterQwery);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header onAdd={onAdd} />
        {todos.length > 0 && <TodoList todos={visibleTodos} />}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterQwery={filterQwery}
            setFilterQwery={setFilterQwery}
          />
        )}
      </div>
      <ErrorField
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
