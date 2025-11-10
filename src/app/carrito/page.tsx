'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Explora nuestras artesanías y encuentra algo especial
          </p>
          <Link
            href="/colecciones"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Ver Colecciones
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const shipping = 15000; // Costo fijo de envío
  const tax = total * 0.19; // IVA 19%
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemPrice = item.product.price + (item.variant?.priceModifier || 0);
              const itemTotal = itemPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.variant?.id || 'default'}`}
                  className="bg-white rounded-lg shadow-md p-6 flex gap-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${itemPrice.toLocaleString('es-CO')}
                    </p>
                    
                    {item.variant && (
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.variant.color && <p>Color: {item.variant.color}</p>}
                        {item.variant.size && <p>Talla: {item.variant.size}</p>}
                        {item.variant.material && <p>Material: {item.variant.material}</p>}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.variant?.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.variant?.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.variant?.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      ${itemTotal.toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>${shipping.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (19%)</span>
                  <span>${tax.toLocaleString('es-CO')}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-amber-600 text-white text-center px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium mb-3"
              >
                Proceder al Pago
              </Link>

              <Link
                href="/colecciones"
                className="block w-full bg-gray-200 text-gray-700 text-center px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
