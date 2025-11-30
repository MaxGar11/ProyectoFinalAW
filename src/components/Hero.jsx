export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-blue-100 to-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center">

        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Bienvenido a <span className="text-blue-600">Taskhub</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Esta es tu plataforma para gestionar tareas de manera eficiente y sencilla.
          </p>

          <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600">
            Empezar
          </button>
        </div>

        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="https://www.adeccoinstitute.es/wp-content/uploads/2023/07/Priorizar-tareas-1024x768.jpg"
            alt="Kids"
            className="rounded-lg shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
