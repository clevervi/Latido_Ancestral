'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { PaymentMethodType, Order, OrderItem } from '@/types';
import { FiCreditCard, FiDollarSign, FiTruck } from 'react-icons/fi';
import { generateInvoicePDF } from '@/utils/invoiceGenerator';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, addOrder } = useUserStore();
  
  const [formData, setFormData] = useState({
    fullName: user?.addresses[0]?.fullName || '',
    email: user?.email || '',
    phone: user?.addresses[0]?.phone || '',
    street: user?.addresses[0]?.street || '',
    city: user?.addresses[0]?.city || '',
    state: user?.addresses[0]?.state || 'Cundinamarca',
    postalCode: user?.addresses[0]?.postalCode || '',
    country: 'Colombia',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [transferData, setTransferData] = useState({
    bankName: '',
    accountNumber: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotal();
  const shipping = 15000;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Crear orden
    const orderItems: OrderItem[] = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      variant: item.variant,
      price: item.product.price + (item.variant?.priceModifier || 0),
    }));

    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id || 'guest',
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      shippingAddress: {
        id: '1',
        fullName: formData.fullName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      paymentMethod: {
        id: '1',
        type: paymentMethod,
        ...(paymentMethod === 'card' && {
          cardLastFour: cardData.number.slice(-4),
          cardBrand: 'Visa',
        }),
        ...(paymentMethod === 'transfer' && {
          bankName: transferData.bankName,
          accountNumber: transferData.accountNumber,
        }),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Agregar orden al usuario
    addOrder(order);

    // Generar factura PDF
    generateInvoicePDF(order);

    // Limpiar carrito
    clearCart();

    setIsProcessing(false);

    // Redirigir a página de confirmación
    router.push(`/pedido-confirmado?orderId=${order.id}`);
  };

  if (items.length === 0) {
    router.push('/carrito');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información de envío */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiTruck /> Información de Envío
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiDollarSign /> Método de Pago
                </h2>

                <div className="space-y-4">
                  {/* Opciones de pago */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                        className="mr-2"
                      />
                      <FiCreditCard className="inline mr-2" />
                      Tarjeta de Crédito/Débito
                    </label>

                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                        className="mr-2"
                      />
                      PayPal
                    </label>

                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                        className="mr-2"
                      />
                      Transferencia Bancaria
                    </label>

                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                        className="mr-2"
                      />
                      Contra Entrega
                    </label>
                  </div>

                  {/* Formulario de tarjeta */}
                  {paymentMethod === 'card' && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de Tarjeta *
                        </label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          placeholder="1234 5678 9012 3456"
                          required
                          maxLength={19}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre en la Tarjeta *
                        </label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de Expiración *
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            placeholder="MM/YY"
                            required
                            maxLength={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            placeholder="123"
                            required
                            maxLength={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Información de transferencia */}
                  {paymentMethod === 'transfer' && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Realiza tu transferencia a la siguiente cuenta y envía el comprobante a nuestro email.
                      </p>
                      <div className="bg-white p-4 rounded border">
                        <p><strong>Banco:</strong> Bancolombia</p>
                        <p><strong>Cuenta:</strong> 1234567890</p>
                        <p><strong>Tipo:</strong> Ahorros</p>
                        <p><strong>Titular:</strong> Latido Ancestral</p>
                      </div>
                    </div>
                  )}

                  {/* Información contra entrega */}
                  {paymentMethod === 'cash_on_delivery' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Pagarás en efectivo cuando recibas tu pedido. El conductor aceptará efectivo o tarjeta.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString('es-CO')}</span>
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
                      <span>${total.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
