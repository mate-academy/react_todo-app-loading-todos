import React from 'react';
import { Todo } from "../types/Todo";

interface TodoListProps {
    todos: Todo[];
    filterByStatus: 'all' | 'active' | 'completed';
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    filterByStatus,
    toggleTodo,
    deleteTodo
}) => {
    const filteredTodos = () => {
        if (filterByStatus === 'active') {
            return todos.filter(todo => !todo.completed);
        }

        if (filterByStatus === 'completed') {
            return todos.filter(todo => todo.completed);
        }

        return todos;
    };

    return (
        <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos().map(todo => (
                <div
                    key={todo.id}
                    data-cy="Todo"
                    className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                    <label className="todo__status-label">
                        <input
                            data-cy="TodoStatus"
                            type="checkbox"
                            className="todo__status"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                    </label>

                    <span data-cy="TodoTitle" className="todo__title">
                        {todo.title}
                    </span>
                    <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() => deleteTodo(todo.id)}
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