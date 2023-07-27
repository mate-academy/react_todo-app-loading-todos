/*eslint-disable*/
import React, { useEffect } from "react";

import classnames from "classnames";

type Props = {
  error: string;
  onCloseError: () => void;
};

export const ErrorComponent: React.FC<Props> = ({ error, onCloseError }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onCloseError();
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [error]);
  return (
    <div
      className={classnames({
        "notification is-danger is-light has-text-weight-normal": true,
        hidden: !error,
      })}
    >
      <button type="button" className="delete" onClick={() => onCloseError()} />
      {error}
    </div>
  );
};

