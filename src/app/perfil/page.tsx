'use client';

import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMapPin, FiCreditCard, FiPackage, FiHeart, FiLogOut } from 'react-icons/fi';

export default function PerfilPage() {
  const { user, isAuthenticated, logout } = useUserStore();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Debes iniciar sesión
          </h1>
          <p className="text-gray-600 mb-8">
            Por favor, inicia sesión para ver tu perfil
          </p>
          <Link
            href="/login"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">
            Bienvenido, {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Información Personal */}
          <Link
            href="/perfil/informacion"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <FiUser className="text-2xl text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Información Personal
                </h2>
                <p className="text-sm text-gray-600">
                  Actualiza tus datos personales
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.phone || 'No registrado'}</p>
            </div>
          </Link>

          {/* Direcciones */}
          <Link
            href="/perfil/direcciones"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiMapPin className="text-2xl text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Direcciones</h2>
                <p className="text-sm text-gray-600">
                  Gestiona tus direcciones de envío
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{user.addresses.length} {user.addresses.length === 1 ? 'dirección' : 'direcciones'} guardadas</p>
            </div>
          </Link>

          {/* Métodos de Pago */}
          <Link
            href="/perfil/metodos-pago"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FiCreditCard className="text-2xl text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Métodos de Pago
                </h2>
                <p className="text-sm text-gray-600">
                  Administra tus métodos de pago
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{user.paymentMethods.length} {user.paymentMethods.length === 1 ? 'método' : 'métodos'} guardados</p>
            </div>
          </Link>

          {/* Pedidos */}
          <Link
            href="/perfil/pedidos"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiPackage className="text-2xl text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Mis Pedidos
                </h2>
                <p className="text-sm text-gray-600">
                  Historial de tus compras
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{user.orders.length} {user.orders.length === 1 ? 'pedido' : 'pedidos'} realizados</p>
            </div>
          </Link>

          {/* Lista de Deseos */}
          <Link
            href="/wishlist"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <FiHeart className="text-2xl text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Lista de Deseos
                </h2>
                <p className="text-sm text-gray-600">
                  Tus productos favoritos
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{user.wishlist.length} {user.wishlist.length === 1 ? 'producto' : 'productos'}</p>
            </div>
          </Link>

          {/* Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <FiLogOut className="text-2xl text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Cerrar Sesión
                </h2>
                <p className="text-sm text-gray-600">
                  Salir de tu cuenta
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
