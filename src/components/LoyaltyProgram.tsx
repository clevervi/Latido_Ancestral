"use client";

import { useLoyaltyStore } from '@/store/loyaltyStore';
import { useNotificationStore } from '@/store/notificationStore';
import { FiAward, FiGift, FiTrendingUp } from 'react-icons/fi';

const tierConfig = {
  bronze: { name: 'Bronce', color: 'bg-amber-700', textColor: 'text-amber-700', min: 0 },
  silver: { name: 'Plata', color: 'bg-gray-400', textColor: 'text-gray-600', min: 200 },
  gold: { name: 'Oro', color: 'bg-yellow-500', textColor: 'text-yellow-600', min: 500 },
  platinum: { name: 'Platino', color: 'bg-purple-500', textColor: 'text-purple-600', min: 1000 },
};

export default function LoyaltyProgram() {
  const { points, tier, rewards, redeemReward, pointsHistory } = useLoyaltyStore();
  const { addNotification } = useNotificationStore();
  
  const currentTier = tierConfig[tier];
  const nextTier = tier === 'platinum' ? null : 
    tierConfig[tier === 'bronze' ? 'silver' : tier === 'silver' ? 'gold' : 'platinum'];

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    const success = redeemReward(reward);
    if (success) {
      addNotification({
        type: 'success',
        title: '¡Recompensa canjeada!',
        message: `Has canjeado: ${reward.name}`
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Puntos insuficientes',
        message: `Necesitas ${reward.pointsCost} puntos para canjear esta recompensa`
      });
    }
  };

  const progressToNextTier = nextTier ? 
    ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Tarjeta de puntos principal */}
      <div className={`${currentTier.color} text-white rounded-2xl p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 opacity-10">
          <FiAward className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Tu nivel</p>
              <h3 className="text-3xl font-bold">{currentTier.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Puntos totales</p>
              <h3 className="text-4xl font-bold">{points}</h3>
            </div>
          </div>

          {nextTier && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progreso al siguiente nivel</span>
                <span>{nextTier.min - points} puntos más para {nextTier.name}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${Math.min(progressToNextTier, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beneficios del nivel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-primary" />
          Beneficios de tu Nivel
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {tier === 'bronze' ? '1x' : tier === 'silver' ? '1.5x' : tier === 'gold' ? '2x' : '3x'}
            </div>
            <div className="text-sm text-gray-600">Multiplicador de puntos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {tier === 'bronze' ? '5%' : tier === 'silver' ? '10%' : tier === 'gold' ? '15%' : '20%'}
            </div>
            <div className="text-sm text-gray-600">Descuento exclusivo</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {tier === 'bronze' ? '❌' : '✅'}
            </div>
            <div className="text-sm text-gray-600">Envío gratis</div>
          </div>
        </div>
      </div>

      {/* Recompensas disponibles */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiGift className="w-5 h-5 text-primary" />
          Canjear Recompensas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const canAfford = points >= reward.pointsCost;
            
            return (
              <div 
                key={reward.id}
                className={`
                  border-2 rounded-lg p-4 transition-all
                  ${canAfford 
                    ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-bold text-gray-900">{reward.name}</h5>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {reward.pointsCost}
                      </div>
                      <div className="text-xs text-gray-500">puntos</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRedeemReward(reward.id)}
                  disabled={!canAfford}
                  className={`
                    w-full py-2 rounded-lg font-semibold transition-all mt-3
                    ${canAfford 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {canAfford ? 'Canjear' : `Necesitas ${reward.pointsCost - points} puntos más`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historial reciente */}
      {pointsHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">
            Historial Reciente
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pointsHistory.slice(-10).reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.date).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className={`
                  text-lg font-bold
                  ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}
                `}>
                  {entry.points > 0 ? '+' : ''}{entry.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cómo ganar puntos */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          ¿Cómo ganar puntos?
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Por cada $1,000 COP gastados = 1 punto
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Escribe una reseña = 10 puntos
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Comparte en redes sociales = 5 puntos
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Cumpleaños = 50 puntos de regalo
          </li>
        </ul>
      </div>
    </div>
  );
}
