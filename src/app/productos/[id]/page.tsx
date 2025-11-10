import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { generateProductSchema, generateMetaTags, generateBreadcrumbSchema } from '@/utils/seo';
import ProductReviews from '@/components/ProductReviews';
import ProductQuestions from '@/components/ProductQuestions';
import ProductRecommendations from '@/components/ProductRecommendations';
import StarRating from '@/components/StarRating';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return generateMetaTags({
    title: `${product.name} | Latido Ancestral`,
    description: product.description,
    keywords: `${product.name}, ${product.category}, artesanías colombianas, hecho a mano`,
    ogTitle: product.name,
    ogDescription: product.description,
    ogImage: product.image,
    ogUrl: `/productos/${product.id}`,
    canonical: `/productos/${product.id}`,
  });
}

// Generar rutas estáticas para mejor SEO
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.price);

  // Schema markup para SEO
  const productSchema = generateProductSchema(
    product,
    product.rating || 0,
    product.reviewsCount || 0
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Colecciones', url: '/colecciones' },
    { name: product.name, url: `/productos/${product.id}` },
  ]);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        {" / "}
        <Link href="/colecciones" className="hover:text-primary transition-colors">
          Colecciones
        </Link>
        {" / "}
        <span className="text-dark dark:text-white font-semibold">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
        <div className="relative h-96 md:h-[600px] bg-[#F5DEB3] dark:bg-dark rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          {/* Badge de destacado */}
          {product.featured && (
            <span className="inline-block w-fit px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-3">
              Destacado
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-dark dark:text-white">
            {product.name}
          </h1>

          {/* Rating */}
          {(product.rating && product.rating > 0) && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} size={20} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.reviewsCount || 0} {product.reviewsCount === 1 ? 'reseña' : 'reseñas'})
              </span>
            </div>
          )}

          <div className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {formattedPrice}
          </div>

          <div className="bg-[#FFF8DC] dark:bg-[#3D2817] rounded-xl shadow-lg p-6 mb-6 border-2 border-[#D2691E]">
            <h2 className="text-2xl font-bold mb-4 text-[#8B4513] dark:text-[#F4A460]">Descripción</h2>
            <p className="text-[#2C1810] dark:text-[#F5DEB3] text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-[#FAEBD7] dark:bg-[#4A3426] rounded-xl shadow-lg p-6 mb-6 border-2 border-[#F4A460]">
            <h3 className="text-xl font-bold mb-3 text-[#8B4513] dark:text-[#FFE4B5]">
              Características
            </h3>
            <ul className="space-y-2 text-[#2C1810] dark:text-[#FFF8DC]">
              <li className="flex items-start">
                <span className="text-[#8B4513] dark:text-[#F4A460] mr-2">✓</span>
                100% hecho a mano
              </li>
              <li className="flex items-start">
                <span className="text-[#8B4513] dark:text-[#F4A460] mr-2">✓</span>
                Materiales naturales y sostenibles
              </li>
              <li className="flex items-start">
                <span className="text-[#8B4513] dark:text-[#F4A460] mr-2">✓</span>
                Producto único y auténtico
              </li>
              <li className="flex items-start">
                <span className="text-[#8B4513] dark:text-[#F4A460] mr-2">✓</span>
                Apoya a comunidades artesanales
              </li>
              {product.color && (
                <li className="flex items-start">
                  <span className="text-[#8B4513] dark:text-[#F4A460] mr-2">✓</span>
                  Color: {product.color}
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary flex-1 flex items-center justify-center gap-2">
              <FaShoppingCart />
              Agregar al Carrito
            </button>
            <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
              <FaHeart />
              Añadir a Favoritos
            </button>
          </div>

          <div className="mt-6 p-4 bg-[#FFE4B5] dark:bg-[#5C3D2E] rounded-lg border border-accent">
            <p className="text-sm text-[#2C1810] dark:text-[#FFF8DC]">
              <strong className="text-[#8B4513] dark:text-[#F4A460]">Envío:</strong> Disponible a todo Colombia. El tiempo de
              entrega varía según la ubicación.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs de Información */}
      <div className="mb-16">
        <div className="bg-[#FDF5E6] dark:bg-[#362415] rounded-xl shadow-lg p-8 border-2 border-secondary">
          {/* Reseñas */}
          <div className="mb-12">
            <ProductReviews productId={product.id} />
          </div>

          {/* Preguntas y Respuestas */}
          <div>
            <ProductQuestions productId={product.id} />
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="mb-12">
        <ProductRecommendations 
          currentProductId={product.id}
          currentCategory={product.category}
          maxRecommendations={4}
        />
      </div>
      </div>
    </>
  );
}
