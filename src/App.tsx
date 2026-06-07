/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState('');
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  // Стани для редагування
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [tempTitle, setTempTitle] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage(ErrorMessage.TitleEmpty);
      setTimeout(() => setErrorMessage(''), 3000);

      return;
    }

    const newTodo = {
      title: title.trim(),
      userId: USER_ID,
      completed: false,
    };

    addTodo(newTodo)
      .then(createdTodo => {
        setTodos(currentTodos => [...currentTodos, createdTodo]);
        setTitle('');
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Add);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleDelete = (todoId: number) => {
    setErrorMessage(ErrorMessage.Delete);
    setProcessingIds(current => [...current, todoId]);

    // prettier-ignore
    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId)
        );
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Delete);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setProcessingIds(current => current.filter(id => id !== todoId));
      });
  };

  const handleToggle = (todoToUpdate: Todo) => {
    setErrorMessage('');
    setProcessingIds(current => [...current, todoToUpdate.id]);

    updateTodo(todoToUpdate.id, { completed: !todoToUpdate.completed })
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === todoToUpdate.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Update);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setProcessingIds(current =>
          current.filter(id => id !== todoToUpdate.id),
        );
      });
  };

  const handleClearCompleted = () => {
    setErrorMessage('');
    const completedTodos = todos.filter(todo => todo.completed);
    const completedIds = completedTodos.map(todo => todo.id);

    setProcessingIds(current => [...current, ...completedIds]);

    const deletePromises = completedTodos.map(todo =>
      deleteTodo(todo.id).then(() => {
        setTodos(current => current.filter(t => t.id !== todo.id));
      }),
    );

    Promise.all(deletePromises)
      .catch(() => {
        setErrorMessage(ErrorMessage.Delete);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setProcessingIds(current =>
          current.filter(id => !completedIds.includes(id)),
        );
      });
  };

  const handleEdit = (todo: Todo) => {
    setEditedTodo(todo);
    setTempTitle(todo.title);
  };

  const saveTitle = (todo: Todo) => {
    if (tempTitle === todo.title) {
      setEditedTodo(null);

      return;
    }

    if (!tempTitle.trim()) {
      handleDelete(todo.id);
      setEditedTodo(null);

      return;
    }

    setProcessingIds(current => [...current, todo.id]);

    updateTodo(todo.id, { title: tempTitle.trim() })
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
        );
        setEditedTodo(null);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Update);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setProcessingIds(current => current.filter(id => id !== todo.id));
      });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              visibleTodos={visibleTodos}
              processingIds={processingIds}
              editedTodo={editedTodo}
              tempTitle={tempTitle}
              setTempTitle={setTempTitle}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              saveTitle={saveTitle}
            />

            <TodoFooter
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              handleClearCompleted={handleClearCompleted}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
