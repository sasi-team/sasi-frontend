export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose md:text-left">
          © {new Date().getFullYear()} SASI - Sistema de Análise em Saúde Integrada.
          {/* TODO: Adicionar links úteis e outros conteúdos do figma */}
        </p>
      </div>
    </footer>
  );
} 