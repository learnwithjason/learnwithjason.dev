export function SectionSponsors({ sponsors }) {
  return (
    <section className="block sponsors">
      <h2 className="sponsors-heading">
        live captioning made possible by our sponsors
      </h2>
      <ul className="sponsors-list">
        {sponsors.map((sponsor) => (
          <li key={sponsor.url} className="sponsor">
            <a href={sponsor.url}>
              <img
                src={sponsor.image}
                alt={sponsor.name}
                width={sponsor.imageWidth}
                height={sponsor.imageHeight}
                loading="lazy"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
