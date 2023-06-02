import React from 'react';

interface Props {
  error: string;
}

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error.length ? (
        <div className="notification is-danger is-light has-text-weight-normal">
          <label htmlFor="errorButton">Error:</label>
          <button
            type="button"
            id="errorButton"
            className="delete"
            aria-label="Close"
          />
          {error}
        </div>
      ) : null}
    </>
  );
};
