/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';

import { USER_ID, getTodos, postTodo } from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorTypes } from './types/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [errorCases, setErrorCases] = useState<ErrorTypes>({
    todoLoad: false,
    titleLength: false,
    addTodo: false,
    deleteTodo: false,
    updateTodo: false,
  });
  const [newTodo, setNewTodo] = useState<Todo | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const updateErrorCases = (
    value: boolean,
    errorTitle: keyof ErrorTypes | 'all' = 'all',
  ) => {
    if (errorTitle === 'all') {
      setErrorCases({
        todoLoad: false,
        titleLength: false,
        addTodo: false,
        deleteTodo: false,
        updateTodo: false,
      });
    } else {
      setErrorCases(prev => ({
        ...prev,
        [errorTitle]: value,
      }));
    }
  };

  useEffect(() => {
    getTodos()
      .then(serverTodos => {
        setTodos(
          serverTodos.map(todo => ({
            ...todo,
            isFromServer: true,
          })),
        );
        updateErrorCases(false, 'todoLoad');
      })
      .catch(() => {
        updateErrorCases(true, 'todoLoad');
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
          return todo;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const generateId = () => {
    return Math.floor(Math.random() * 2137);
  };

  const addTodo = async (newTodoTitle: string) => {
    let didSucceed = false;

    if (newTodoTitle.trim() === '') {
      updateErrorCases(true, 'titleLength');
    } else {
      updateErrorCases(false, 'titleLength');
      setNewTodo({
        title: newTodoTitle.trim(),
        userId: USER_ID,
        completed: false,
        id: generateId(),
      });
      setIsInputDisabled(true);
      await postTodo({
        title: newTodoTitle.trim(),
        userId: USER_ID,
        completed: false,
        id: generateId(),
      })
        .then(addedTodo => {
          setTodos(prev => [...prev, addedTodo]);
          updateErrorCases(false, 'addTodo');
          didSucceed = true;
          setNewTodo(null);
          setIsInputDisabled(false);
        })
        .catch(() => {
          updateErrorCases(true, 'addTodo');
        });
    }

    return didSucceed;
  };

  const deleteTodo = async (todoId: number) => {
    let didSucceed = false;

    await deleteTodo(todoId).then(() => {
      try {
        didSucceed = true;
        setTodos(prev => prev.filter(({ id }) => id !== todoId));
      } catch (error) {
        updateErrorCases(true, 'deleteTodo');
      }
    });

    return didSucceed;
  };

  const deleteFinishedTodos = async () => {
    const todosToDelete = todos
      .filter(({ completed }) => completed)
      .map(({ id }) => id);

    todosToDelete.forEach(todoId => {
      deleteTodo(todoId);
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          addTodo={addTodo}
          isInputDisabled={isInputDisabled}
        />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          newTodo={newTodo}
        />
        <Footer
          todos={todos}
          filter={filter}
          setFilter={setFilter}
          deleteFinishedTodos={deleteFinishedTodos}
        />
      </div>
      <ErrorNotification
        errorCases={errorCases}
        updateErrorCases={updateErrorCases}
      />
    </div>
  );
};
