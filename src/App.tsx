import React from 'react';

type BikeModel = {
  name: string;
  price: string;
  description: string;
  image: string;
};

const bikeModels: BikeModel[] = [
  {
    name: 'Sporty 4',
    price: '$ 2 590',
    description: 'The iconic frame engineered for urban performance rides.',
    image: '/images/bike-sport.svg',
  },
  {
    name: 'Ride in town ST',
    price: '$ 2 290',
    description:
      'Comfort geometry with practical setup for everyday city trips.',
    image: '/images/bike-road.svg',
  },
  {
    name: 'Aggressor 3',
    price: '$ 2 490',
    description: 'Balanced speed and control with premium all-round handling.',
    image: '/images/bike-city.svg',
  },
];

export const App: React.FC = () => {
  return (
    <div className="page">
      <header className="topbar">
        <a className="logo" href="#home" aria-label="BIKE homepage">
          MyBike
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About us</a>
          <a href="#compare">Compare bikes</a>
          <a href="#details">Details</a>
          <a href="#contacts">Contacts</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <h1>Take the Streets</h1>
          <p>
            Electrifying performance and clean design for riders who want
            comfort, style, and speed in one bike.
          </p>
          <a href="#compare" className="button button--primary">
            Book a test ride
          </a>
        </section>

        <section className="section" id="about">
          <h2 className="section__title">
            The move to electric has never felt so right.
          </h2>
          <p className="section__text">
            Our bikes combine advanced engineering, lightweight materials, and
            premium finishing for everyday city riding.
          </p>
        </section>

        <section className="section" id="compare">
          <h2 className="section__title">Compare bikes</h2>
          <div className="cards">
            {bikeModels.map(model => (
              <article className="card" key={model.name}>
                <img
                  src={model.image}
                  alt={model.name}
                  className="card__image"
                />
                <h3 className="card__name">{model.name}</h3>
                <p className="card__description">{model.description}</p>
                <p className="card__price">{model.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section details" id="details">
          <div>
            <h2 className="section__title">The details</h2>
            <p className="section__text">
              Every element is crafted for real-life comfort: from frame
              geometry to precision motor response and ergonomic controls.
            </p>
          </div>
          <div className="details__image-wrap">
            <img
              src="/images/bike-road.svg"
              alt="Detailed view of BIKE frame"
              className="details__image"
            />
          </div>
        </section>

        <section className="section contacts" id="contacts">
          <h2 className="section__title">Contact us</h2>
          <form className="form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea rows={4} placeholder="Message" />
            <button type="button" className="button button--primary">
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};
