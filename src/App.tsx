/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as postService from './api/todos';
import { Main } from './componets/Main';
import { Header } from './componets/Header';
import { Footer } from './componets/Footer';
import { Errors } from './componets/Errors';
import { Category } from './types/Category';
import { TypeErroros } from './types/Errors';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const [error, setError] = useState<TypeErroros>(TypeErroros.Normal);
  const [category, setCategory] = useState<Category>(Category.All);

  useEffect(() => {
    if (error === TypeErroros.Normal) {
      return;
    }

    const timer = setTimeout(() => {
      setError(TypeErroros.Normal);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);
  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError(TypeErroros.NotFindTodosErrors);
      });
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  function addTodo(newTitle: string) {
    postService
      .addTodo({
        title: newTitle,
        userId: USER_ID,
        completed: false,
      })
      .then(newTodo => {
        setTodos(currentPosts => [...currentPosts, newTodo]);
        setTitle('');
      })
      .catch(() => {
        if (title === '') {
          setError(TypeErroros.AddTodoErrorSpace);
        }

        setError(TypeErroros.AddTodoError);
      })
      .finally(() => setLoadingTodoId(null));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError(TypeErroros.AddTodoErrorSpace);

      return;
    }

    addTodo(trimmedTitle);
  };

  const handleDobelChangeTitle = (todoId: number, dobelTitle: string) => {
    setEditingTodoId(todoId);
    setEditTitle(dobelTitle);
  };

  const handleChangeComplete = (todoId: number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (!currentTodo) {
      return;
    }

    setLoadingTodoId(todoId);

    postService
      .updateTodo({
        ...currentTodo,
        completed: !currentTodo.completed,
      })

      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo => (todo.id === todoId ? updatedTodo : todo)),
        );
      })
      .catch(() => {
        setError(TypeErroros.ErorUppdate);
      })
      .finally(() => setLoadingTodoId(null));
  };

  const handleChangeCompleteAll = () => {
    setTodos(currentTodos => {
      const allCompleted = currentTodos.every(todo => todo.completed);

      return currentTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    });
  };

  function deletePost(todoId: number) {
    setLoadingTodoId(todoId);
    postService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => setError(TypeErroros.ErorDelet))
      .finally(() => setLoadingTodoId(null));
  }

  const removeElement = (todoId: number) => {
    deletePost(todoId);
  };

  const removeElementAllCompleted = () => {
    setLoadingTodoId(null);
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => postService.deleteTodo(todo.id)))
      .then(() => {
        setTodos(currntTodos => currntTodos.filter(todo => !todo.completed));
      })
      .finally(() => setLoadingTodoId(null));
  };

  useEffect(() => {
    let filtered: Todo[] = [...todos];

    if (category === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (category === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    setVisibleTodos(filtered);
  }, [category, todos]);

  const handleEditSubmit = (todoId: number) => {
    setLoadingTodoId(todoId);
    const trimmed = editTitle.trim();

    if (!trimmed) {
      return;
    }

    postService
      .updateTodo({
        id: todoId,
        title: trimmed,
        completed: false,
        userId: USER_ID,
      })
      .then(updated => {
        setTodos(current =>
          current.map(todo => (todo.id === updated.id ? updated : todo)),
        );

        setEditingTodoId(null);
        setEditTitle('');
      })
      .catch(() => {
        setError(TypeErroros.ErorUppdate);
      })
      .finally(() => setLoadingTodoId(null));
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
          title={title}
          handleSubmit={handleSubmit}
          handleChangeCompleteAll={handleChangeCompleteAll}
          handleTitleChange={handleTitleChange}
        />

        <Main
          visibleTodos={visibleTodos}
          handleChangeComplete={handleChangeComplete}
          editingTodoId={editingTodoId}
          handleEditSubmit={handleEditSubmit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          handleDobelChangeTitle={handleDobelChangeTitle}
          removeElement={removeElement}
          loadingTodoId={loadingTodoId}
        />

        <Footer
          todos={todos}
          activeTodosCount={activeTodosCount}
          category={category}
          setCategory={setCategory}
          removeElementAllCompleted={removeElementAllCompleted}
        />
      </div>

      <Errors error={error} setError={setError} />
    </div>
  );
};
