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

const benefits = [
  'Up to 120 km range on one charge',
  'Carbon belt drive for low maintenance',
  'Fast USB-C charging in 3.5 hours',
  'Mobile app with GPS and security alerts',
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
          <a href="#details">Details</a>
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

        <section className="details" id="details">
          <div className="details__content">
            <p className="details__eyebrow">Technology</p>
            <h2 className="details__title">
              Designed for speed, built for comfort
            </h2>
            <p className="details__text">
              Every BIKE model combines aerodynamic lines with smart control.
              Enjoy silent acceleration, reliable grip, and intuitive riding
              experience built for modern cities.
            </p>
            <ul className="details__list">
              {benefits.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="details__image" aria-hidden="true" />
        </section>

        <section className="contact" id="contacts">
          <div>
            <p className="contact__eyebrow">Contact us</p>
            <h2 className="contact__title">Ready for your first ride?</h2>
            <p className="contact__text">
              Leave your details and our team will help choose the ideal model.
            </p>
          </div>

          <form className="contact__form">
            <input type="text" name="name" placeholder="Your name" />
            <input type="tel" name="phone" placeholder="Phone number" />
            <input type="email" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Message" rows={4} />
            <button type="button">Send request</button>
          </form>
        </section>
      </main>

      <footer className="footer">© 2026 BIKE. All rights reserved.</footer>
    </div>
  );
};
