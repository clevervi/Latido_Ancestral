import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Latido Ancestral',
  description: 'Términos y condiciones de uso de Latido Ancestral - Tienda de artesanías colombianas',
};

export default function TerminosServicioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Términos y Condiciones de Servicio</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 leading-relaxed">
              Al acceder y utilizar el sitio web de <strong>Latido Ancestral</strong>, aceptas estar sujeto a estos términos y condiciones de servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">2. Descripción del Servicio</h2>
            <p className="text-gray-700 leading-relaxed">
              Latido Ancestral es una plataforma de comercio electrónico especializada en la venta de artesanías colombianas hechas a mano, incluyendo:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>Sombreros vueltiaos</li>
              <li>Mochilas wayuu</li>
              <li>Hamacas artesanales</li>
              <li>Sillas hamaca</li>
              <li>Ropa tradicional</li>
              <li>Accesorios y joyería artesanal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">3. Registro y Cuenta de Usuario</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Para realizar compras, debes crear una cuenta y proporcionar información precisa y completa. Eres responsable de:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Mantener la confidencialidad de tu contraseña</li>
              <li>Todas las actividades que ocurran bajo tu cuenta</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">4. Productos y Precios</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nos esforzamos por mostrar los productos con la mayor precisión posible:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Las imágenes son referenciales y pueden variar ligeramente del producto real</li>
              <li>Los precios están expresados en pesos colombianos (COP)</li>
              <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
              <li>Los productos artesanales pueden tener variaciones únicas</li>
              <li>Verificamos la disponibilidad antes de confirmar tu pedido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">5. Proceso de Compra y Pago</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Al realizar una compra:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Aceptas pagar el precio del producto más impuestos y costos de envío</li>
              <li>Aceptamos tarjetas de crédito/débito, PayPal, transferencia y pago contra entrega</li>
              <li>Tu pedido está sujeto a disponibilidad y confirmación</li>
              <li>Recibirás un email de confirmación con los detalles del pedido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">6. Envíos y Entregas</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Información sobre envíos:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Realizamos envíos a todo Colombia</li>
              <li>Los tiempos de entrega son estimados y pueden variar</li>
              <li>El costo de envío se calcula al finalizar la compra</li>
              <li>Envío gratuito en compras superiores a $200,000 COP</li>
              <li>No somos responsables por retrasos causados por la empresa de mensajería</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">7. Devoluciones y Reembolsos</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Política de devoluciones:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Tienes 15 días desde la recepción para solicitar una devolución</li>
              <li>El producto debe estar en su estado original y sin usar</li>
              <li>Los productos personalizados no admiten devolución</li>
              <li>El reembolso se procesará una vez recibido y verificado el producto</li>
              <li>Los gastos de envío de devolución corren por cuenta del cliente (salvo producto defectuoso)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">8. Propiedad Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todo el contenido del sitio web (imágenes, textos, logos, diseños) es propiedad de Latido Ancestral o sus proveedores de contenido y está protegido por leyes de propiedad intelectual. No puedes reproducir, distribuir o modificar ningún contenido sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">9. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Latido Ancestral no será responsable por:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Daños indirectos, incidentales o consecuentes</li>
              <li>Pérdida de datos o interrupción del servicio</li>
              <li>Uso indebido de los productos</li>
              <li>Eventos fuera de nuestro control razonable (fuerza mayor)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">10. Reseñas y Comentarios</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Al publicar reseñas o comentarios:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Otorgas a Latido Ancestral el derecho de usar ese contenido</li>
              <li>Garantizas que el contenido es original y no infringe derechos de terceros</li>
              <li>No puedes publicar contenido ofensivo, difamatorio o ilegal</li>
              <li>Nos reservamos el derecho de eliminar contenido inapropiado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">11. Modificaciones</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Es tu responsabilidad revisar periódicamente estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">12. Ley Aplicable y Jurisdicción</h2>
            <p className="text-gray-700 leading-relaxed">
              Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-amber-600">13. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para preguntas sobre estos términos y condiciones:
            </p>
            <ul className="mt-3 text-gray-700 space-y-2">
              <li><strong>Email:</strong> soporte@latidoancestral.com</li>
              <li><strong>Teléfono:</strong> +57 300 123 4567</li>
              <li><strong>Dirección:</strong> Carrera 7 #123-45, Bogotá, Colombia</li>
              <li><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</li>
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
