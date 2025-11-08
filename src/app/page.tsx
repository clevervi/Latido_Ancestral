import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Latido Ancestral
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre la belleza de las artesanías colombianas hechas a mano.
            Cada pieza cuenta una historia ancestral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colecciones" className="btn-secondary inline-block">
              Ver Colecciones
            </Link>
            <Link
              href="/esencia"
              className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold inline-block"
            >
              Conoce Nuestra Esencia
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-dark">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">
            Nuestras Colecciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/colecciones/${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-xl h-80 block transform transition-all duration-500 hover:scale-105"
              >
                {/* Imagen con efecto de difuminado/aclarado */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-500 brightness-50 group-hover:brightness-100 blur-sm group-hover:blur-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Gradiente de overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500 z-10" />
                
                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-semibold">Explorar colección</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-dark">
            Tradición en Cada Hilo
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            En Latido Ancestral, cada artesanía es creada con técnicas
            tradicionales transmitidas de generación en generación. Trabajamos
            directamente con artesanos colombianos para traerte piezas únicas que
            celebran nuestra cultura y tradición.
          </p>
          <Link href="/esencia" className="btn-primary">
            Conoce Más Sobre Nosotros
          </Link>
        </div>
      </section>
    </div>
  );
}
