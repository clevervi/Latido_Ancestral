"use client";

import { Order, OrderStatus } from '@/types';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';

interface OrderTrackingProps {
  order: Order;
}

const statusConfig: Record<OrderStatus, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}> = {
  pending: {
    label: 'Pendiente',
    icon: <FiClock className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  processing: {
    label: 'Procesando',
    icon: <FiPackage className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  shipped: {
    label: 'Enviado',
    icon: <FiTruck className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  delivered: {
    label: 'Entregado',
    icon: <FiCheckCircle className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  cancelled: {
    label: 'Cancelado',
    icon: <FiX className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
};

const statusOrder: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Seguimiento de Pedido
      </h3>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Pedido</span>
          <span className="text-sm font-bold text-gray-900">#{order.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Fecha</span>
          <span className="text-sm text-gray-900">
            {new Date(order.createdAt).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {isCancelled ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <FiX className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Pedido Cancelado
          </h4>
          <p className="text-gray-600">
            Este pedido ha sido cancelado
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Línea de progreso */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
          <div 
            className="absolute left-8 top-0 w-1 bg-primary transition-all duration-500"
            style={{ 
              height: `${(currentStatusIndex / (statusOrder.length - 1)) * 100}%` 
            }}
          ></div>

          {/* Pasos */}
          <div className="space-y-8">
            {statusOrder.map((status, index) => {
              const config = statusConfig[status];
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={status} className="relative flex items-center gap-4">
                  {/* Círculo del paso */}
                  <div 
                    className={`
                      relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg transition-all duration-300
                      ${isCompleted 
                        ? `${config.bgColor} ${config.color}` 
                        : 'bg-gray-100 text-gray-400'
                      }
                      ${isCurrent ? 'scale-110 ring-4 ring-primary/20' : ''}
                    `}
                  >
                    {config.icon}
                  </div>

                  {/* Información del paso */}
                  <div className="flex-1">
                    <h4 className={`
                      text-lg font-bold transition-colors
                      ${isCompleted ? 'text-gray-900' : 'text-gray-400'}
                    `}>
                      {config.label}
                    </h4>
                    <p className={`
                      text-sm transition-colors
                      ${isCompleted ? 'text-gray-600' : 'text-gray-400'}
                    `}>
                      {isCompleted 
                        ? getStatusMessage(status, order)
                        : 'Pendiente'
                      }
                    </p>
                  </div>

                  {/* Check de completado */}
                  {isCompleted && !isCurrent && (
                    <div className="text-green-500">
                      <FiCheckCircle className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dirección de envío */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Dirección de Envío</h4>
        <p className="text-sm text-gray-600">
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.street}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state}<br />
          {order.shippingAddress.country} - {order.shippingAddress.postalCode}<br />
          Tel: {order.shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}

function getStatusMessage(status: OrderStatus, order: Order): string {
  const date = new Date(order.updatedAt).toLocaleDateString('es-CO', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  switch (status) {
    case 'pending':
      return `Recibido el ${date}`;
    case 'processing':
      return `En preparación desde el ${date}`;
    case 'shipped':
      return `Despachado el ${date}`;
    case 'delivered':
      return `Entregado el ${date}`;
    default:
      return '';
  }
}
