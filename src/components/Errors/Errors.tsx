import { ErrorSpec } from '../../types/ErrorSpec';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  error: ErrorSpec | null;
};

export const Errors: React.FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {(() => {
        switch (error) {
          case ErrorSpec.NOT_LOADED: {
            return (
              <span>
                Unable to load todos
                <br />
              </span>
            );
          }

          case ErrorSpec.EMPTY_TITLE: {
            return (
              <span>
                Title should not be empty
                <br />
              </span>
            );
          }

          case ErrorSpec.NOT_ADDED: {
            return (
              <span>
                Unable to add a todo
                <br />
              </span>
            );
          }

          case ErrorSpec.NOT_DELETED: {
            return (
              <span>
                Unable to delete a todo
                <br />
              </span>
            );
          }

          case ErrorSpec.NOT_UPDATED: {
            return (
              <span>
                Unable to update a todo
                <br />
              </span>
            );
          }

          default:
            return null;
        }
      })()}
    </div>
  );
};
