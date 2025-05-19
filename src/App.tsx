import React, { useEffect, useState } from 'react';

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorType } from './types/ErrorType';
import { Filter } from './utils/Filter';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [selectedPostId, setIsSelectedPostId] = useState(0);
  const [currentError, setCurrentError] = useState<ErrorType | ''>('');
  const [selectedFilter, setSelectedFilter] = useState(Filter.all);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setCurrentError(ErrorType.TodosLoad);
      }
    };

    loadTodos();
  }, []);

  const handleTodoAdd = async (newTodo: Todo) => {
    const createdTodo = await createTodo(newTodo);

    setTodos(currentTodos => [...currentTodos, createdTodo]);
  };

  const handleTodoDelete = async (todoId: number) => {
    try {
      await deleteTodo(todoId);

      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    } catch {
      setCurrentError(ErrorType.UnableToDeleteTodo);
    }
  };

  const handleTodoUpdate = async (updatedTodo: Todo) => {
    try {
      await updateTodo(updatedTodo);

      setTodos(currentTodos =>
        currentTodos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      );
    } catch {
      setCurrentError(ErrorType.UnableToUpdateTodo);
    }
  };

  useEffect(() => {
    if (!currentError) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos: number = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const completedTodos: number = todos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header
        todos={todos}
        completedTodos={completedTodos}
        setCurrentError={setCurrentError}
        onTodoAdd={handleTodoAdd}
      />

      <div className="todoapp__content">
        <TodoList
          selectedFilter={selectedFilter}
          visibleTodos={todos}
          isTodoEditing={isTodoEditing}
          selectedPostId={selectedPostId}
          setIsTodoEditing={setIsTodoEditing}
          setSelectedPostId={setIsSelectedPostId}
          onDelete={handleTodoDelete}
          onUpdate={handleTodoUpdate}
        />

        {!!todos.length && (
          <Footer
            activeTodos={activeTodos}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            completedTodos={completedTodos}
          />
        )}
      </div>

      <ErrorNotification
        currentError={currentError}
        setCurrentError={setCurrentError}
      />
    </div>
  );
};
