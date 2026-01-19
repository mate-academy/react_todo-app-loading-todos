/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { FilterTodo } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { TodoError } from './types/TodoError';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [errorMessages, setErrorMessages] = useState<TodoError[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const [filter, setFilter] = useState<FilterTodo>(FilterTodo.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setErrorMessages([]);
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessages([TodoError.LoadTodos]);
        setIsHidden(false);
        setTimeout(() => setIsHidden(true), 3000);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);
  // const getIdTodo = (curTodos: Todo[]) => {
  //   if (curTodos.length === 0) {
  //     return 1;
  //   }

  //   const maxId = Math.max(...curTodos.map(todo => todo.id));

  //   return maxId + 1;
  // };

  const addTodo = (title: string, onSuccess?: () => void) => {
    if (title.trim() === '') {
      setErrorMessages([TodoError.EmptyTitle]);
      setIsHidden(false);
      setTimeout(() => setIsHidden(true), 3000);
      return;
    };
    
    const temporaryTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    };
    setTempTodo(temporaryTodo);
    setIsLoadingTodos(true);

    // const newTodo = {
    //   id: getIdTodo(todos),
    //   userId: USER_ID,
    //   title,
    //   completed: false,
    // };

    client.post<Todo>('/todos', temporaryTodo)
      .then((createdTodo) => {
        setTodos(prevTodo => [...prevTodo, createdTodo])
        setTempTodo(null);
        onSuccess?.();
      })
      .catch(() => {
        setErrorMessages([TodoError.AddTodo])
        setIsHidden(false)
        setTimeout(() => setIsHidden(true), 3000);
        setTempTodo(null);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      })
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (todoId: number) => {
    setIsLoadingTodos(true);
    client.delete(`/todos/${todoId}`)
      .then(() => {
        setTodos(prevTodo =>
          prevTodo.filter((todo) => todo.id !== todoId)
        )
      })
      .catch(() => {
        setErrorMessages([TodoError.DeleteTodo])
        setIsHidden(false)
        setTimeout(() => setIsHidden(true), 3000);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      })
  };

  const clearCompleted = () => {
    const completedTodo = todos.filter((todo) => todo.completed);
    setIsLoadingTodos(true);
    Promise.allSettled(
      completedTodo.map((todo) =>
        client.delete(`/todos/${todo.id}`)
      )
    )
      .then((res) => {
        const successTodo = completedTodo
          .filter((_, ind) => res[ind].status === 'fulfilled')
          .map((todo) => todo.id)
        setTodos(prevTodo => 
          prevTodo.filter((todo) => !successTodo.includes(todo.id))
        );

        if (res.some(r => r.status === 'rejected')) {
          setErrorMessages([TodoError.DeleteTodo]);
          setIsHidden(false);
          setTimeout(() => setIsHidden(true), 3000);
        }
      })
      .finally(() => {
        setIsLoadingTodos(false)
      })
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader 
          onAddTodo={addTodo}
          todos={todos}
          isLoadingTodos={isLoadingTodos}
        />

        <TodoList
          todos={todos}
          isLoadingTodos={isLoadingTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDeleteTodo={deleteTodo}
        />

        {tempTodo && (
          <TodoItem
            key={tempTodo.id}
            todo={tempTodo}
            isLoadingTodos={isLoadingTodos}
            onToggle={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        )}

        {todos.length > 0 && (
          <TodoFooter 
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        messages={errorMessages}
        hidden={isHidden}
        onClose={() => setIsHidden(true)}
      />
    </div>
  );
};
