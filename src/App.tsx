import React from 'react';

const bikeModels = [
  {
    name: 'Urban Glide X1',
    price: '$2,490',
    description:
      'Clean geometry and smooth electric assistance for everyday city rides.',
  },
  {
    name: 'Gravel Pulse Pro',
    price: '$2,990',
    description:
      'All-road setup with reinforced frame and adaptive suspension comfort.',
  },
  {
    name: 'Night Shift S',
    price: '$2,650',
    description:
      'Integrated lights, anti-theft lock and ergonomic cockpit'
      + ' for late commuting.',
  },
];

export const App: React.FC = () => {
  return (
    <div className="bike-page">
      <header className="bike-header">
        <a href="#" className="bike-header__logo" aria-label="BIKE home page">
          BIKE
        </a>

        <nav className="bike-header__nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#catalog">Catalog</a>
          <a href="#contacts">Contacts</a>
        </nav>

        <button type="button" className="bike-header__cta">
          Book a test ride
        </button>
      </header>

      <main>
        <section className="hero" id="about">
          <p className="hero__eyebrow">Ride the future</p>
          <h1 className="hero__title">BIKE New Version</h1>
          <p className="hero__description">
            Lightweight frame, electric boost, and a clean urban silhouette.
            Discover a city bike that blends comfort, power, and modern style.
          </p>

          <div className="hero__actions">
            <button type="button" className="hero__primary-btn">
              Explore collection
            </button>
            <a className="hero__secondary-link" href="#catalog">
              View specifications
            </a>
          </div>
        </section>

        <section className="catalog" id="catalog">
          <div className="catalog__head">
            <p className="catalog__eyebrow">Popular models</p>
            <h2 className="catalog__title">Find your perfect bike</h2>
          </div>

          <div className="catalog__grid">
            {bikeModels.map(model => (
              <article className="bike-card" key={model.name}>
                <div className="bike-card__image" aria-hidden="true" />
                <h3 className="bike-card__name">{model.name}</h3>
                <p className="bike-card__description">{model.description}</p>
                <p className="bike-card__price">{model.price}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
