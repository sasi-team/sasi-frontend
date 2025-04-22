import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Coluna 1 - Logo/Redes */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo-sasi.png"
            alt="Logo SASI"
            width={60}
            height={60}
            className="mb-4"
          />
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        {/* Coluna 2 - Endereço */}
        <div>
          <div>
            <strong>Ilhéus – BA</strong>
            <p>Av. Prof. Milton Santos, s/n – Tapera, Ilhéus – BA, 45654-165</p>
            <p>CEPEDI</p>
          </div>
          <div className="mt-4">
            <strong>Brasília – DF</strong>
            <p>Setor de Autarquias Sul (SAUS) Quadra 1, Lote 01, Bloco M, Ed. Libertas, Sala 1404, Asa Sul, 70070-010, Brasília/DF</p>
            <p>SOFTEX</p>
          </div>
        </div>

        {/* Coluna 3 - Menu */}
        <div>
          <h3 className="font-semibold mb-2">Menu</h3>
          <ul className="space-y-1">
            <li>Plataforma</li>
            <li>Galeria</li>
            <li>FAQ</li>
            <li>Sobre Nós</li>
            <li>Contato</li>
          </ul>
        </div>

        {/* Coluna 4 - Links úteis */}
        <div>
          <h3 className="font-semibold mb-2">Links úteis</h3>
          <ul className="space-y-1">
            <li>Políticas</li>
            <li>FAQ</li>
            <li>Sobre</li>
          </ul>
          <h3 className="font-semibold mb-2">Baixe nosso aplicativo</h3>
          <div className="space-y-2">
            <Image src="/google-play.png" alt="Google Play" width={150} height={50} className="rounded-md" />
            <Image src="/app-store.png" alt="App Store" width={150} height={50} className="rounded-md" />
          </div>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="mt-10 border-t border-white/30 pt-4 text-sm text-center">
        © 2025 SASI – Desenvolvido por <span className="font-medium"><Link href={"https://cepedi.org.br"} target="_blank">CEPEDI</Link > | <Link href={"https://www.restic36.cepedi.org.br"} target="_blank">RESTIC36</Link> | <Link href={"https://softex.br"} target="_blank"> SOFTEX </Link> </span> | Todos os direitos reservados
      </div>
    </footer>
  );
}
