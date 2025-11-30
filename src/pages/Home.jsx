import Navbar from "../components/Navbar_1";
import Hero from "../components/Hero";
import ServiceCard from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">

        <ServiceCard
          title="¡Organiza tus tareas!"
          text="Resuelve el desorden de tener fechas de entrega anotadas en cuadernos"
          color="bg-blue-600"
          image="https://rapiprofe.com/wp-content/uploads/2024/08/tareas-tareas-1024x678.jpg"
        />

        <ServiceCard
          title="Colabora con compañeros"
          text="Comparte apuntes o recursos para una tarea específica con otros usuarios."
          color="bg-red-500"
          image="https://grupo-pya.com/wp-content/uploads/2021/10/Relacion-entre-companeros-de-trabajo.jpg"
        />

        <ServiceCard
          title="Interfaz accesible y sencilla"
          text="Olvídate de complicadas plataformas de gestión de tareas."
          color="bg-purple-600"
          image="https://www.concur.com.mx/sites/mx/files/acn/2025-09/tareas%20administrativas.jpg"
        />

      </section>
      <Footer />
    </>
  );
}
