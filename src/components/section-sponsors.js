import { h } from 'preact';

export function SectionSponsors({ sponsors }) {
  return (
    <section class="block sponsors">
      <h2 class="sponsors-heading">
        live captioning made possible by our sponsors
      </h2>
      <ul class="sponsors-list">
        {sponsors.map((sponsor) => (
          <li key={sponsor.url} class="sponsor">
            <a href={sponsor.url}>
              <img src={sponsor.image} alt={sponsor.name} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
