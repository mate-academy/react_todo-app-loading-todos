/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';
import { Error } from './components/error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);
  const [data, setData] = useState('');

  // const handleSubmit = (event: any) => {
  //   setData(event.target.value);
  // };

  const handleChange = (event: any) => {
    setData(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          data={data}
          handleChange={handleChange}
          // handleSubmit={handleSubmit}
        />
        {data && (
          <Main />
        )}

        {data && (
          <Footer />
        )}

      </div>

      <Error />
    </div>
  );
};
