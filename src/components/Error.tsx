// import React, { useContext, useEffect, useState } from 'react';
// import cn from 'classnames';
// import { Context } from 'mocha';

// export const ErrorMessage: React.FC = () => {
//   const { errorMessage } = useContext(Context);
//   const [lastErrorMessage, setLastErrorMessage] = useState('');

//   useEffect(() => {
//     if (errorMessage !== '') {
//       setLastErrorMessage(errorMessage);
//     }
//   }, [errorMessage]);

//   return (
//     <div
//       data-cy="ErrorNotification"
//       className={cn('notification is-danger is-light has-text-weight-normal', {
//         hidden: !errorMessage,
//       })}
//     >
//       <button data-cy="HideErrorButton" type="button" className="delete" />
//       {lastErrorMessage}
//     </div>
//   );
// };
