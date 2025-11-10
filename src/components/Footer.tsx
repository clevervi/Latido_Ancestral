"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Latido Ancestral</h3>
            <p className="text-gray-300">
              Promoviendo la cultura y tradición ancestral colombiana a través de artesanías hechas a mano.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/esencia" className="text-gray-300 hover:text-accent transition-colors">
                  Nuestra Esencia
                </Link>
              </li>
              <li>
                <Link href="/colecciones" className="text-gray-300 hover:text-accent transition-colors">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/inspiracion" className="text-gray-300 hover:text-accent transition-colors">
                  Inspiración
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-privacidad" className="text-gray-300 hover:text-accent transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terminos-servicio" className="text-gray-300 hover:text-accent transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-gray-300 hover:text-accent transition-colors">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/perfil" className="text-gray-300 hover:text-accent transition-colors">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: katemartinez1507@gmail.com</li>
              <li></li>
              <li>Colombia</li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-accent">{t.footer.followUs}</h5>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Latido Ancestral. {t.footer.allRightsReserved}</p>
          <p className="mt-2 text-sm">Kateryn Martinez | Hecho con ❤️ en Colombia</p>
          <div className="mt-3 flex justify-center gap-4 text-sm">
            <Link href="/politica-privacidad" className="hover:text-accent transition-colors">
              Privacidad
            </Link>
            <span>|</span>
            <Link href="/terminos-servicio" className="hover:text-accent transition-colors">
              Términos
            </Link>
            <span>|</span>
            <Link href="/sitemap.xml" className="hover:text-accent transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
