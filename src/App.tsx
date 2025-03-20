/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterTodo } from './types/FilterTodo';
import { Todo } from './types/Todo';
import * as api from './api/todos';

export const App: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<FilterTodo>('All');

  useEffect(() => {
    setLoading(true);

    api
      .getTodos()
      .then(setTodos)
      .catch(e => {
        setErrorMsg('Unable to load todos');
        throw e;
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filtered) {
      case 'Active':
        filteredTodos = filteredTodos.filter(td => !td.completed);
        break;
      case 'Completed':
        filteredTodos = filteredTodos.filter(td => td.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [filtered, todos]);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(td => !td.completed).length;
  }, [todos]);

  const changeVisibleTodos = (el: FilterTodo) => {
    setFiltered(el);
  };

  /* async function addTodo(todoToAdd: Omit<Todo, 'id'>) {
    try {
      const newTodo = await api.addTodo(todoToAdd);

      setTodos(prevTodos => {
        return [...prevTodos, newTodo];
      });
    } catch (e) {
      setErrorMsg('Unable to add todos');
      throw e;
    }
  }

  async function updateTodo(todoToUpdate: Todo) {
    try {
      const updatedTodo = await api.updateTodo(todoToUpdate);

      setTodos(prevTodos => {
        return prevTodos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        );
      });
    } catch (e) {
      setErrorMsg('Unable to update todos');
      throw e;
    }
  }

  async function deleteTodo(todoId: number) {
    try {
      await api.deleteTodo(todoId);

      setTodos(prevTodos => {
        return prevTodos.filter(todo => todo.id !== todoId);
      });
    } catch (e) {
      setErrorMsg('Unable to update todos');
      throw e;
    }
  } */

  if (!api.USER_ID) {
    return <UserWarning />;
  }

  const changeError = (er: string) => {
    setErrorMsg(er);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header changeError={changeError} />

        {!loading && <TodoList todos={visibleTodos} />}

        {todos.length && (
          <Footer
            changeVisibleTodos={changeVisibleTodos}
            filtered={filtered}
            uncompletedTodos={uncompletedTodos}
          />
        )}
      </div>

      <ErrorNotification errorMsg={errorMsg} changeError={changeError} />
    </div>
  );
};
