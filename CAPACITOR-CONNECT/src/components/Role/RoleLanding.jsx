export default function RoleLanding({ role, title, description }) {
  return (
    <section className="role-landing">
      <span className="role-kicker">{role} workspace</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
