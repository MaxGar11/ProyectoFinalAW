export default function FeedUserCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">

      {/* Foto */}
      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="User"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />

      {/* Nombre */}
      <h3 className="text-center text-xl font-bold text-gray-800 mb-1">
        Maximiliano García
      </h3>

      <p className="text-center text-purple-700 font-semibold text-sm">
        Tu
      </p>

      {/* Datos */}
      <div className="mt-4 text-center text-gray-600">
        <p>📞 +52 55 3323 9553</p>
        <p className="mt-1">📧 maximiliano@alumno.buap.mx</p>
      </div>

      {/* Lista de asistentes */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700 mb-2">
          Participantes (22)
        </h4>

        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <span>• Pepe</span>
          <span>• Alberto Flores</span>
          <span>• Juanito</span>
          <span>• Yair</span>
          <span>• Viejoo</span>
          <span className="text-blue-600">Ver todos</span>
        </div>
      </div>
    </div>
  );
}
