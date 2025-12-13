import Image from "next/image";

export default function InspiracionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-dark">
        Inspiración
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Lo que nos inspira */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Lo que nos Inspira
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestras piezas nacen de algo más que técnica: nacen de memorias, de paisajes,
                de voces antiguas que aún susurran en cada tejido. Esta es la inspiración que 
                nos guía y que queremos compartir contigo.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/assets11/artesana-tejiendo-mochila2.webp"
                alt="Artesana tejiendo mochila"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Fragmentos de Sabiduría - Voces entre hilos */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">
            Fragmentos de Sabiduría
          </h2>
          <h3 className="text-2xl font-semibold mb-8 text-secondary text-center">
            Voces entre Hilos
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/assets11/colores.webp"
                alt="Colores artesanales"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                "Cada hilo tiene su origen."
              </blockquote>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-secondary pl-4 py-2">
                "El arte popular no se copia, se hereda."
              </blockquote>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                "No es solo crear, es recordar."
              </blockquote>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-secondary pl-4 py-2">
                "Nada que se haga con las manos está vacío."
              </blockquote>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                "Lo que se teje con el alma nunca se deshace."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Historias que Inspiran */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">
            Historias que Inspiran
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-secondary text-center">
            El Legado entre sus Manos
          </h3>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Desde que tengo uso de razón, recuerdo a mi abuela con las manos 
              ocupadas en el arte: tejiendo hamacas, mochilas y memorias. Nunca 
              necesitó patrones, solo su intuición y los recuerdos de quienes 
              le enseñaron antes.
            </p>

            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg my-8">
              <Image
                src="/assets/assets11/tejedora-hamacas.webp"
                alt="Tejedora de hamacas"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sus dedos sabían exactamente qué hacer, cómo anudar sin errores, cómo elegir los colores
              que hablaban del campo, del cielo o del amor. Yo la miraba en silencio, sin saber que 
              esas imágenes se quedarían conmigo para siempre.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                Ahora entiendo que no era solo tejido. Era resistencia, era ternura, era pertenencia. 
                Y hoy, con esta tienda, intento honrar su legado. Cada pieza es una forma de decir:
                <strong className="text-primary"> "Aquí estoy, abuela, siguiendo tu hilo."</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Postales de Raíz */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">
            Postales de Raíz
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-secondary text-center">
            Memorias que Hablan con el Alma
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/assets11/atardecer.webp"
                alt="Atardecer inspirador"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos inspiran los colores del atardecer, las texturas de la tierra y los sonidos de los
                telares en movimiento. Todo lo que nos rodea tiene algo que contar, y nosotros intentamos
                escucharlo.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                El paisaje nos enseña los tonos del alma, y las manos los convierten en forma. 
                Cada pieza es un fragmento de esa conversación entre la tierra y el corazón.
              </p>
            </div>
          </div>
        </section>

        {/* Cierre Inspirador */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tejemos con el Corazón
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Cada artesanía que ofrecemos lleva consigo la inspiración de generaciones, 
            el amor por la tradición y la esperanza de que estas historias sigan vivas 
            en cada hogar que las acoge.
          </p>
        </section>
      </div>
    </div>
  );
}
