"use client";

import { useState, useEffect } from 'react';
import { FiX, FiGift, FiTag } from 'react-icons/fi';
import { useNewsletterStore } from '@/store/newsletterStore';
import { useNotificationStore } from '@/store/notificationStore';

interface PromoPopupProps {
  delay?: number; // Tiempo de espera antes de mostrar (en ms)
}

export default function PromoPopup({ delay = 5000 }: PromoPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { subscribe, isSubscribed } = useNewsletterStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    // No mostrar si ya está suscrito
    if (isSubscribed) return;

    // Verificar si el popup ya se mostró en esta sesión
    const popupShown = sessionStorage.getItem('promo_popup_shown');
    if (popupShown) return;

    // Mostrar después del delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('promo_popup_shown', 'true');
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isSubscribed]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Por favor ingresa tu correo electrónico'
      });
      return;
    }

    setIsLoading(true);
    const success = await subscribe(email);
    setIsLoading(false);

    if (success) {
      addNotification({
        type: 'success',
        title: '¡Felicidades!',
        message: 'Tu cupón BIENVENIDO10 está listo para usar'
      });
      setIsVisible(false);
    } else {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Correo electrónico no válido'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <FiGift className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              ¡10% de Descuento!
            </h2>
            <p className="text-lg text-white/90">
              En tu primera compra
            </p>
          </div>

          {/* Contenido */}
          <div className="p-8">
            <p className="text-center text-gray-600 mb-6">
              Suscríbete a nuestro newsletter y recibe un cupón de <strong>10% de descuento</strong> para tu primera compra
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
                disabled={isLoading}
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Procesando...' : 'Obtener Mi Cupón'}
              </button>
            </form>

            {/* Cupón preview */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-400 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Código de cupón</div>
                  <div className="text-lg font-bold text-gray-900 tracking-wider">
                    BIENVENIDO10
                  </div>
                </div>
                <FiTag className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              No spam. Puedes cancelar tu suscripción en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
