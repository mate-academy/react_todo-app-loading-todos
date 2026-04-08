// App.tsx
import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { UserWarning } from '../../react_todo-app-loading-todos/src/UserWarning';
import { createTodo, getTodos, updateTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';

const FILTERS = {
  all: 'all' as const,
  active: 'active' as const,
  completed: 'completed' as const,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  //Тайтл для створення нового туду
  const [newTitle, setNewTitle] = useState('');
  //Тайтл для редактування вже створеного туду
  const [titleToSet, setTitleToSet] = useState('');
  //Для задання ІД туду яке буде змінюватися
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  //Тимчасовий туду до поки сервер не надасть відповідь
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[keyof typeof FILTERS]>(
    FILTERS.all,
  );
  const [error, setError] = useState<string | null>(null);
  //Для задання по ІД лоадерів
  const [loading, setLoading] = useState<number[]>([]);
  //відфільтрований за фільтром туду лист який виводиться на екран
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  //Кількість яку залишилося відмітити зробленими
  const remainingCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  //Стала для перевірки на всі виконані туду
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);
  const hasCompletedTodos = todos.some(t => t.completed);

  useEffect(() => {
    getTodos()
      .then(data => {
        if (!data) {
          throw new Error();
        }

        setTodos(data);
      })
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        // setLoadingAll(false);
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const addTodo = async (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Title should not be empty');

      return;
    }

    setError(null);

    setLoading(prev => [...prev, 0]);

    try {
      const newTempTodo: Todo = {
        id: 0,
        title: trimmed,
        userId: USER_ID,
        completed: false,
      };

      setTempTodo(newTempTodo);

      const created = await createTodo({
        title: trimmed,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prev => [...prev, created]);
      setNewTitle('');
    } catch (err) {
      setError('Unable to add a todo');
    } finally {
      setLoading(prev => prev.filter(id => id !== 0));
      setTempTodo(null);
    }
  };

  const updateTodo = async (id: number, checked?: boolean, title?: string) => {
    setError(null);
    setLoading(prev => [...prev, id]);

    try {
      const payload = {
        id,
        ...(checked !== undefined ? { completed: checked } : {}),
        ...(title !== undefined ? { title } : {}),
      };

      if (checked !== undefined) {
        payload.completed = checked;
      }

      if (title !== undefined) {
        payload.title = title;
      }

      const updated = await updateTodos(payload);

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setSelectedTodoId(null);
      setTitleToSet('');
    } catch {
      setError("Can't update todo");
    } finally {
      setLoading(prev => prev.filter(lid => lid !== id));
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(prev => [...prev, id]);
    try {
      await client.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Unable to delete a todo');
    } finally {
      setLoading(prev => prev.filter(lid => lid !== id));
    }
  };

  const deleteCompletedTodos = async () => {
    const ids = todos.filter(t => t.completed).map(t => t.id);

    if (ids.length === 0) {
      return;
    }

    setError(null);
    setLoading(prev => [...prev, ...ids]);

    try {
      const results = await Promise.allSettled(
        ids.map(id => client.delete(`/todos/${id}`)),
      );

      const successfulIds = results
        .map((result, idx) => {
          if (result.status === 'fulfilled') {
            return ids[idx];
          }

          return null;
        })
        .filter((id): id is number => id !== null);

      setTodos(prev =>
        prev.filter(t => !(t.completed && successfulIds.includes(t.id))),
      );

      const hasRejected = results.some(r => r.status === 'rejected');

      if (hasRejected) {
        setError('Unable to delete a todo');
      }
    } catch (err) {
      setError('Unable to delete a todo');
    } finally {
      setLoading(prev => prev.filter(lid => !ids.includes(lid)));
    }
  };

  const onToggleAll = async () => {
    if (todos.length === 0) {
      return;
    }

    const shouldComplete = !allCompleted;

    setError(null);

    setLoading(prev => [...prev, ...todos.map(t => t.id)]);

    try {
      await Promise.all(todos.map(t => updateTodo(t.id, shouldComplete)));
    } catch {
      setError("Can't update some todos");
    } finally {
      setLoading(prev =>
        prev.filter(lid => !todos.map(t => t.id).includes(lid)),
      );
    }
  };

  const handleToggle = (id: number, completed: boolean) => {
    updateTodo(id, completed);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          onAdd={addTodo}
          onToggleAll={onToggleAll}
          allCompleted={allCompleted}
          error={error}
          loading={loading}
        />
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
          titleToSet={titleToSet}
          setTitleToSet={setTitleToSet}
          loading={loading}
          onDelete={deleteTodo}
          onToggle={handleToggle}
          onUpdate={updateTodo}
        />

        {tempTodo && (
          <TodoItem
            todo={tempTodo}
            todos={todos}
            selectedTodoId={selectedTodoId}
            setSelectedTodoId={setSelectedTodoId}
            titleToSet={titleToSet}
            setTitleToSet={setTitleToSet}
            loading={loading}
            onDelete={deleteTodo}
            onToggle={handleToggle}
            onUpdate={updateTodo}
            isProcessed={true}
          />
        )}

        {todos.length > 0 && (
          <Footer
            remainingCount={remainingCount}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={deleteCompletedTodos}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </div>
  );
};
