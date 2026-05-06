import React from 'react';

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
      </main>
    </div>
  );
};
