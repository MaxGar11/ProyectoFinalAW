import { useEffect, useState } from "react";
import { getMotivationPhrase } from "../utils/motivationAPI";

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getMotivationPhrase();
      setQuote(data);
    };
    load();
  }, []);

  if (!quote) return <p>Cargando frase motivacional...</p>;

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow">
      <p className="italic text-lg">"{quote.phrase}"</p>
      <p className="text-right mt-2 font-semibold">— {quote.author}</p>
    </div>
  );
}
