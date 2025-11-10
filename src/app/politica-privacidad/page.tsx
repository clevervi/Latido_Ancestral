import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Latido Ancestral',
  description: 'Política de privacidad y protección de datos de Latido Ancestral - Tienda de artesanías colombianas',
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">1. Información que Recopilamos</h2>
            <p className="text-gray-700 leading-relaxed">
              En <strong>Latido Ancestral</strong>, recopilamos información personal que nos proporcionas voluntariamente cuando:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Te registras en nuestra tienda online</li>
              <li>Realizas una compra</li>
              <li>Contactas con nuestro servicio al cliente</li>
              <li>Te suscribes a nuestro boletín</li>
              <li>Dejas una reseña o comentario</li>
            </ul>
            <p className="mt-3 text-gray-700">
              La información puede incluir: nombre, dirección de correo electrónico, dirección de envío, número de teléfono, información de pago (procesada de forma segura).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">2. Uso de la Información</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos tu información personal para:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Procesar y entregar tus pedidos</li>
              <li>Comunicarnos contigo sobre tu pedido</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviarte información promocional (si has dado tu consentimiento)</li>
              <li>Prevenir fraudes y mejorar la seguridad</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">3. Protección de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Acceso no autorizado</li>
              <li>Alteración, divulgación o destrucción</li>
              <li>Pérdida accidental</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Todos los pagos se procesan a través de plataformas seguras que cumplen con los estándares PCI DSS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">4. Compartir Información</h2>
            <p className="text-gray-700 leading-relaxed">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Proveedores de servicios (envío, pagos) necesarios para completar tu pedido</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">5. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, recordar tus preferencias y analizar el tráfico del sitio. Puedes controlar el uso de cookies a través de la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">6. Tus Derechos</h2>
            <p className="text-gray-700 leading-relaxed">
              De acuerdo con la legislación colombiana de protección de datos, tienes derecho a:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Acceder a tu información personal</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Revocar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">7. Menores de Edad</h2>
            <p className="text-gray-700 leading-relaxed">
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información de menores. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos de inmediato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">8. Cambios en esta Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">9. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Si tienes preguntas sobre esta política de privacidad o el tratamiento de tus datos personales, puedes contactarnos:
            </p>
            <ul className="mt-3 text-gray-700 space-y-2">
              <li><strong>Email:</strong> privacidad@latidoancestral.com</li>
              <li><strong>Teléfono:</strong> +57 300 123 4567</li>
              <li><strong>Dirección:</strong> Carrera 7 #123-45, Bogotá, Colombia</li>
            </ul>
          </section>

          <div className="mt-8 pt-6 border-t text-center text-gray-600">
            <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
