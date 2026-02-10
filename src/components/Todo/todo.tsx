/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../styles/todo.scss';
import * as postService from '../../api/todos';
import { Filter, Todo as Todos } from '../../types/Todo';
import { useState } from 'react';

type Props = {
  posts: Todos[];
  filter: Filter | undefined;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPosts: React.Dispatch<React.SetStateAction<Todos[]>>;
};

export const Todo: React.FC<Props> = ({
  posts,
  filter,
  setErrorMessage,
  setPosts,
}) => {
  const visibleTodos = posts.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const [updatingIds, setUpdatingIds] = useState<number[]>([]);

  async function handleTodoStatus(id: number, checked: boolean) {
    setErrorMessage('');
    setUpdatingIds(prev => [...prev, id]);
    try {
      const current = posts.find(post => post.id === id);

      if (!current) {
        return;
      }

      const serverTodo = await postService.updateTodo(id, {
        completed: checked,
      });

      setPosts(prev => prev.map(post => (post.id === id ? serverTodo : post)));
    } catch (error) {
      setErrorMessage('Unable to update todo');
    } finally {
      setUpdatingIds(prev => prev.filter(updatingId => updatingId !== id));
    }
  }

  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
  const onDelete = async (postId: number) => {
    setDeletingTodoId(postId);
    try {
      await postService.deletePost(postId);
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    } catch (error) {
      setErrorMessage('Unable to delete todo');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setDeletingTodoId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(post => (
        <div
          data-cy="Todo"
          key={post.id}
          className={`todo ${post.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onChange={event =>
                handleTodoStatus(post.id, event.target.checked)
              }
              checked={post.completed}
              disabled={updatingIds.includes(post.id)}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {post.title}
          </span>
          <button
            type="button"
            aria-label="Delete todo"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(post.id)}
            disabled={deletingTodoId === post.id}
          >
            ×
          </button>
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
