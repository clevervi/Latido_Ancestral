"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import ProductBadges from "./ProductBadges";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showBadges?: boolean;
  stock?: number;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({ 
  product, 
  showBadges = true, 
  stock = 100, 
  isNew = false, 
  discount 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { addNotification } = useNotificationStore();
  
  const inWishlist = isInWishlist(product.id);

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    addNotification({
      type: inWishlist ? 'info' : 'success',
      title: inWishlist ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      message: product.name
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    addNotification({
      type: 'success',
      title: 'Agregado al carrito',
      message: product.name
    });
  };

  return (
    <div 
      className="card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto */}
      <Link href={`/productos/${product.id}`} className="block relative h-64 bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        {showBadges && (
          <ProductBadges 
            product={product} 
            stock={stock} 
            isNew={isNew} 
            discount={discount} 
          />
        )}

        {/* Overlay con acciones rápidas */}
        <div className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm 
          flex items-center justify-center gap-2
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <button
            onClick={handleQuickAdd}
            className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg"
            title="Agregar al carrito"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
          
          <Link
            href={`/productos/${product.id}`}
            className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg"
            title="Ver detalles"
          >
            <FiEye className="w-5 h-5" />
          </Link>
        </div>
      </Link>

      {/* Botón de wishlist (siempre visible) */}
      <button
        onClick={handleWishlistToggle}
        className={`
          absolute top-3 right-3 z-20 p-2 rounded-full transition-all shadow-lg
          ${inWishlist 
            ? 'bg-red-500 text-white scale-110' 
            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
          }
        `}
        title={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
      </button>

      {/* Información del producto */}
      <div className="p-6">
        <Link href={`/productos/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 text-dark hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-500 text-sm">
              {'⭐'.repeat(Math.round(product.rating))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating.toFixed(1)} ({product.reviewsCount || 0})
            </span>
          </div>
        )}

        {/* Precio y categoría */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
            {discount && (
              <div className="text-sm text-gray-500 line-through">
                ${Math.round(product.price / (1 - discount / 100)).toLocaleString('es-CO')}
              </div>
            )}
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Botón ver detalles */}
        <Link
          href={`/productos/${product.id}`}
          className="btn-primary text-sm w-full text-center block"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
