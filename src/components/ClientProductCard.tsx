"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/store/notificationStore";
import ProductBadges from "./ProductBadges";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  showBadges?: boolean;
  stock?: number;
  isNew?: boolean;
  discount?: number;
}

export default function ClientProductCard({ 
  product, 
  showBadges = true, 
  stock = 100, 
  isNew = false, 
  discount 
}: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const wishlist = useWishlistStore();
  const cart = useCartStore();
  const notification = useNotificationStore();

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-square bg-gray-100" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-8 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  const inWishlist = wishlist.isInWishlist(product.id);

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    wishlist.toggleWishlist(product);
    notification.addNotification({
      type: inWishlist ? "info" : "success",
      title: inWishlist ? "Eliminado de favoritos" : "Agregado a favoritos",
      message: product.name,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem(product, 1);
    notification.addNotification({
      type: "success",
      title: "Agregado al carrito",
      message: product.name,
    });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/productos/${product.id}`);
  };

  return (
    <Link href={`/productos/${product.id}`} className="block">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square">
          <Image
            src={product.image || (product.images && product.images[0]) || ""}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {showBadges && (
            <ProductBadges
              product={product}
              stock={stock}
              isNew={isNew}
              discount={discount}
            />
          )}

          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full ${
                inWishlist ? "bg-primary text-white" : "bg-white text-primary"
              } hover:scale-110 transition-transform`}
              aria-label={
                inWishlist ? "Eliminar de favoritos" : "Agregar a favoritos"
              }
            >
              <FiHeart size={20} />
            </button>

            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-white text-primary hover:scale-110 transition-transform"
              aria-label="Agregar al carrito"
            >
              <FiShoppingCart size={20} />
            </button>

            <button
              onClick={handleViewDetails}
              className="p-2 rounded-full bg-white text-primary hover:scale-110 transition-transform"
              aria-label="Ver detalles"
            >
              <FiEye size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            {product.name}
          </h3>
          <p className="text-primary text-xl font-bold">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
}
