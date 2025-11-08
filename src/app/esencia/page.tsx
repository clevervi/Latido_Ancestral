import Image from "next/image";

export default function EsenciaPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-dark">
        Nuestra Esencia
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Nuestra Raíz */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Nuestra Raíz
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                En cada nudo, en cada hilo, en cada color... hay una historia que late desde generaciones pasadas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong className="text-primary">Latido Ancestral</strong> nace como un puente entre 
                la memoria y el presente, entre manos sabias de los artesanos
                y los corazones que valoran lo hecho con alma. No vendemos objetos, compartimos fragmentos de identidad.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Aquí, cada pieza es una ofrenda de raíces, una herencia
                viva que sigue hablándonos en tramas, tejidos y formas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Creemos en lo lento, en lo auténtico, en lo humano. Por eso, cuidamos 
                cada detalle como se cuida la tradición que no debe perderse; nuestra 
                esencia es un latido. Uno que viene de lejos, pero que vibra contigo.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/assets11/artesana-tejiendo-mochila1.webp"
                alt="Artesana tejiendo mochila"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Elegirnos es Abrazar una Historia */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Elegirnos es Abrazar una Historia
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cuando eliges una de nuestras piezas, estás abrazando la voz de una comunidad
            que no ha dejado de crear a pesar del olvido. Estás sosteniendo un fragmento de tierra,
            de sol, de historia tejida a mano.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cada forma, cada textura, ha nacido de la paciencia 
            y la sabiduría popular. Nada aquí es casual: los colores tienen memoria, los nudos tienen 
            intención. Cada objeto lleva el eco de una conversación ancestral entre generaciones.
          </p>
          <div className="bg-primary/5 border-l-4 border-primary p-6 mt-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Trabajamos con respeto.</strong> No intervenimos: acompañamos. No explotamos: compartimos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Honramos los procesos y los tiempos de quienes han hecho del tejido una herencia y una resistencia.
            </p>
          </div>
        </section>

        {/* Una Herencia que Vibra Contigo */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">
            Una Herencia que Vibra Contigo
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Nuestra esencia no es solo la de nuestras raíces, sino también la tuya.
            Porque cuando conectas con lo auténtico, lo haces parte de tu camino.
          </p>
          <p className="text-lg leading-relaxed">
            En <strong>Latido Ancestral</strong> tejemos puentes, no solo productos. Y 
            deseamos que cada creación encuentre en ti un hogar que también valore 
            la belleza de lo que no debe olvidarse.
          </p>
        </section>

        {/* Nuestros Valores */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-secondary pl-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                Autenticidad
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Cada producto es genuinamente hecho a mano por artesanos
                colombianos, garantizando piezas únicas que llevan el alma de quien las creó.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                Sostenibilidad
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Trabajamos con materiales naturales y prácticas que respetan el
                medio ambiente y las tradiciones ancestrales.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                Comercio Justo
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aseguramos que los artesanos reciban una compensación justa por su
                trabajo, tiempo y dedicación.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                Preservación Cultural
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Contribuimos a mantener vivas las tradiciones ancestrales
                colombianas para futuras generaciones.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
