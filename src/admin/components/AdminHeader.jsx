export default function AdminHeader({ eyebrow, title, text, action }) {
  return (
    <div className="admin-header">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}
