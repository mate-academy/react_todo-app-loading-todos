/* eslint-disable */
type Props = {
  query: string,
  setQuery: (val: string) => void,
};

export const Header = ({ query, setQuery }: Props) => {
  // useEffect(() => {

  // }, []);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form onSubmit={(event) => {
        event.preventDefault();
        setQuery('');
      }}>
        <input
          type="text"
          value={query}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
