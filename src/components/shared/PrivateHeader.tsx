import { UserNav } from "./UserNav";

export function PrivateHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-primary text-primary-foreground px-4">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* TODO: Adicionar talvez um título da página atual ou breadcrumbs */}
        <div className="flex-1">
          {/* Placeholder Esquerdo */}
        </div>
        <div className="flex items-center space-x-4">
          {/* TODO: Adicionar ícones de notificação, tema, etc? */}
          <UserNav />
        </div>
      </div>
    </header>
  );
} 