'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import StarRating from './StarRating';
import { useReviewStore } from '@/store/reviewStore';
import type { Product } from '@/types';

interface ProductRecommendationsProps {
  currentProductId: string;
  currentCategory?: string;
  maxRecommendations?: number;
}

export default function ProductRecommendations({
  currentProductId,
  currentCategory,
  maxRecommendations = 4,
}: ProductRecommendationsProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { getAverageRating } = useReviewStore();

  // Algoritmo de recomendación
  const recommendations = useMemo(() => {
    const currentProduct = products.find(p => p.id === currentProductId);
    if (!currentProduct) return [];

    // Filtrar productos de la misma categoría
    const sameCategory = products.filter(
      p => p.id !== currentProductId && p.category === currentCategory
    );

    // Productos con colores similares (si aplica)
    const similarColor = products.filter(
      p => p.id !== currentProductId && 
           p.category !== currentCategory &&
           p.color === currentProduct.color
    );

    // Productos en rango de precio similar (±30%)
    const priceRange = currentProduct.price * 0.3;
    const similarPrice = products.filter(
      p => p.id !== currentProductId &&
           Math.abs(p.price - currentProduct.price) <= priceRange
    );

    // Combinar y priorizar
    const combined = [
      ...sameCategory.slice(0, 2),      // 2 de la misma categoría
      ...similarColor.slice(0, 1),      // 1 de color similar
      ...similarPrice.slice(0, 1),      // 1 de precio similar
    ];

    // Eliminar duplicados
    const unique = combined.filter(
      (product, index, self) => self.findIndex(p => p.id === product.id) === index
    );

    // Si no hay suficientes, agregar productos aleatorios
    if (unique.length < maxRecommendations) {
      const remaining = products
        .filter(p => p.id !== currentProductId && !unique.find(u => u.id === p.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, maxRecommendations - unique.length);
      unique.push(...remaining);
    }

    return unique.slice(0, maxRecommendations);
  }, [currentProductId, currentCategory, maxRecommendations]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">También te puede gustar...</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            rating={getAverageRating(product.id)}
            onAddToCart={() => addItem(product, 1)}
            onToggleWishlist={() => toggleItem(product.id)}
            isInWishlist={isInWishlist(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  rating,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: {
  product: Product;
  rating: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
}) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/productos/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 text-xs rounded">
              Destacado
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link href={`/productos/${product.id}`}>
          <h3 className="font-semibold hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <StarRating rating={rating} size={14} />
          {rating > 0 && (
            <span className="text-xs text-gray-600">({rating.toFixed(1)})</span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-amber-600">
            ${product.price.toLocaleString('es-CO')}
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaShoppingCart />
            Agregar
          </button>
          <button
            onClick={onToggleWishlist}
            className={`p-2 border rounded hover:border-amber-600 transition-colors ${
              isInWishlist ? 'bg-amber-50 border-amber-600 text-amber-600' : ''
            }`}
          >
            <FaHeart className={isInWishlist ? 'text-amber-600' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
