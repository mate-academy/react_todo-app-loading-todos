import React from 'react';

type Props = {
  setQuery: (value: string) => void;
  query: string
};
export const AddTodoForm: React.FC<Props> = ({ setQuery, query }) => {
  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </form>
  );
};
