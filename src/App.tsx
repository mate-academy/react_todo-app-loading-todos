import React, { useState, useEffect, useRef } from 'react';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';

import {
  ErrorNotification,
  ErrorMessages,
} from './components/ErrorNotification';
import { Footer, TodoStatus } from './components/Footer';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { Todo as TodoItem } from './components/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteringByCompleted, setFilteringByCompleted] = useState<TodoStatus>(
    TodoStatus.ALL,
  );
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.NONE);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  function displayError(message: ErrorMessages) {
    setErrorMessage(message);
  }

  const handleCloseError = () => {
    setErrorMessage(ErrorMessages.NONE);
  };

  // > Fetching

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        displayError(ErrorMessages.FAILED_LOAD);
      });
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting, todos.length]);

  // > Add Todo

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      displayError(ErrorMessages.EMPTY_TITLE);
      return;
    }

    setIsSubmitting(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    createTodo({
      title: trimmedTitle,
      userId: USER_ID,
      completed: false,
    })
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTitle('');
      })
      .catch(() => {
        displayError(ErrorMessages.FAILED_ADD);
      })
      .finally(() => {
        setTempTodo(null);
        setIsSubmitting(false);
      });
  };

  // > Delete Todo

  const handleDeleteTodo = (todoId: number) => {
    setLoadingTodoIds(prev => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        displayError(ErrorMessages.FAILED_DELETE);
      })
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  // > Update Todo (Status / Title)

  const handleUpdateTodo = (todoToUpdate: Todo) => {
    setLoadingTodoIds(prev => [...prev, todoToUpdate.id]);

    return updateTodo(todoToUpdate)
      .then(updatedTodo => {
        setTodos(prev =>
          prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
        );
      })
      .catch(error => {
        displayError(ErrorMessages.FAILED_UPDATE);
        throw error;
      })
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoToUpdate.id));
      });
  };

  const handleToggleTodo = (todo: Todo) => {
    handleUpdateTodo({ ...todo, completed: !todo.completed });
  };

  // > Toggle All

  const incompleteTodoQuantity = todos.filter(todo => !todo.completed).length;

  const handleToggleAll = () => {
    const shouldCompleteAll = incompleteTodoQuantity > 0;
    const todosToUpdate = todos.filter(
      todo => todo.completed !== shouldCompleteAll,
    );

    todosToUpdate.forEach(todo => {
      handleUpdateTodo({ ...todo, completed: shouldCompleteAll });
    });
  };

  // > Clear Completed

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      handleDeleteTodo(todo.id);
    });
  };

  // > Filtering

  const filteredTodos = todos.filter(todo => {
    switch (filteringByCompleted) {
      case TodoStatus.ACTIVE:
        return !todo.completed;
      case TodoStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const hasCompletedTodos = todos.length !== incompleteTodoQuantity;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosCount={todos.length}
          activeCount={incompleteTodoQuantity}
          title={title}
          setTitle={setTitle}
          onSubmit={handleAddTodo}
          isSubmitting={isSubmitting}
          inputRef={inputRef}
          onToggleAll={handleToggleAll}
        />

        {(!!todos.length || tempTodo) && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={false}
                isLoading={loadingTodoIds.includes(todo.id)}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}

            {tempTodo && (
              <TodoItem
                todo={tempTodo}
                isSelected={false}
                isLoading={true}
              />
            )}
          </section>
        )}

        {!!todos.length && (
          <Footer
            incompleteTodoQuantity={incompleteTodoQuantity}
            onFilterSelect={setFilteringByCompleted}
            activeFiltering={filteringByCompleted}
            isAnyTodoCompleted={hasCompletedTodos}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={handleCloseError}
      />
    </div>
  );
};