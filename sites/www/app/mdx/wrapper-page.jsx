export function WrapperPage({ title, description, children }) {
  return (
    <>
      <header className="block hero">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
      <section className="block">
        <div className="post-content">{children}</div>
      </section>
    </>
  );
}
