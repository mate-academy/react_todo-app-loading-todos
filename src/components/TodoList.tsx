import { useContext, useState } from 'react';
import { InitialTodosContext, TodosContext } from '../store';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodos, updeteTodo } from '../api/todos';

export const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const { setInitialTodos } = useContext(InitialTodosContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const removeTodo = (todo: Todo) => {
    deleteTodos(todo.id);

    dispatch({ type: 'REMOVE_TODO', payload: todo.id });
    setInitialTodos(prevState => prevState.filter(state => state.id !== todo.id));
  };

  const isDone = (todo: Todo) => {
    updeteTodo({ ...todo, completed: !todo.completed });

    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
    setInitialTodos(prevState => prevState.map(state =>
      state.id === todo.id
        ? { ...state, completed: !state.completed }
        : state));
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const deletTodoWithEmptyText = () => {
    dispatch({ type: 'REMOVE_TODO', payload: editingTodoId });

    if (editingTodoId) {
      deleteTodos(editingTodoId);
    }
  };

  const addTodoAfterOnBlur = () => {
    const updatedTodos = todos.map(t =>
      t.id === editingTodoId ? { ...t, title: editingTitle.trim() } : t,
    );

    dispatch({ type: 'UPDATE_TITLE', payload: updatedTodos })

    const updetedTodo = updatedTodos.find(todo => todo.id === editingTodoId);

    if (updetedTodo) {
      updeteTodo(updetedTodo)
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingTitle.trim()) {
      e.preventDefault();
      addTodoAfterOnBlur();
      setEditingTodoId(null);
      setEditingTitle('');
    } else if (e.key === 'Enter' && !editingTitle.trim()) {
      e.preventDefault();
      deletTodoWithEmptyText();
      setEditingTodoId(null);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditingTodoId(null);
      setEditingTitle('');
    }
  };

  const handleBlur = () => {
    if (editingTitle) {
      addTodoAfterOnBlur();
    } else if (!editingTitle) {
      deletTodoWithEmptyText();
    }

    setEditingTodoId(null);
    setEditingTitle('');
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onChange={() => isDone(todo)}
              checked={todo.completed}
            />
          </label>

          {editingTodoId === todo.id ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editingTitle}
                onChange={handleEditTitleChange}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDoubleClick(todo)}
            >
              {todo.title}
            </span>
          )}

          {todo.id !== editingTodoId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => removeTodo(todo)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
