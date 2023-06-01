import classNames from 'classnames';

interface TodoInfoProps {
  completed: boolean;
  title: string;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ completed, title }) => (
  <div className={classNames('todo', { completed })}>
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
      />
    </label>

    <span className="todo__title">{title}</span>
    <button type="button" className="todo__remove">×</button>

    <div className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
