import Link from 'next/link';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';

export default function NotFound() {
  return (
    <>
      <SiteNav tone="primary" />
      <main id="main" className="min-h-[80vh] bg-primary-container flex flex-col items-center justify-center text-center px-6">
        <span className="manrope-label text-primary mb-8">Erro 404</span>
        <h1 className="baskerville italic text-6xl md:text-9xl text-white leading-none">
          Página<br />não encontrada.
        </h1>
        <p className="font-body font-light text-white/60 mt-10 max-w-md">
          O endereço buscado não existe mais ou nunca existiu. Volte para o início e explore por outro caminho.
        </p>
        <Link
          href="/"
          className="mt-12 bg-white text-primary-container px-10 py-4 manrope-label font-bold hover:scale-105 transition-transform focus-ring"
        >
          Voltar ao início
        </Link>
      </main>
      <SiteFooter tone="primary" />
    </>
  );
}
