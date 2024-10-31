type Props = {
  setFilter: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={element => setFilter(element.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
      </p>
    </form>
  );
};
