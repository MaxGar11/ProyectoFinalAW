export default function Card({ title, text, color, image }) {
  return (
    <div className={`rounded-xl p-6 shadow-lg text-white ${color}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{text}</p>

      <div className="mt-4 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-32 object-cover" />
      </div>
    </div>
  );
}
