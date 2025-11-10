'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';
import { FiCheckCircle, FiDownload, FiHome, FiPackage } from 'react-icons/fi';
import { generateInvoicePDF } from '@/utils/invoiceGenerator';

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { user } = useUserStore();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId && user) {
      const foundOrder = user.orders.find((o) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId, user]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Hemos recibido tu pedido correctamente.
          </p>

          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Detalles del Pedido
            </h2>
            
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Número de Orden:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString('es-CO')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-xl text-amber-600">
                  ${order.total.toLocaleString('es-CO')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-yellow-600">Pendiente</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-3">Dirección de Envío</h3>
            <div className="text-gray-600 text-sm">
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p>Tel: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            Te hemos enviado un correo de confirmación a <strong>{user?.email}</strong> con los
            detalles de tu pedido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => generateInvoicePDF(order)}
              className="flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <FiDownload /> Descargar Factura
            </button>
            
            <Link
              href="/perfil/pedidos"
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              <FiPackage /> Ver Mis Pedidos
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              <FiHome /> Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PedidoConfirmadoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    }>
      <ConfirmacionContent />
    </Suspense>
  );
}
