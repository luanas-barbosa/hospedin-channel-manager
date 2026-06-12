import React from 'react'
import { Link } from 'react-router-dom'
import {
  BellIcon, CaretDownIcon, CornersOutIcon, MagnifyingGlassIcon,
  PlusIcon, WarningCircleIcon, GearSixIcon, UserIcon, NotePencilIcon,
  FileTextIcon, PowerIcon,
} from '@phosphor-icons/react'
import { AppSidebar } from './AppSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePerfil } from '../contexts/PerfilContext.jsx'

type Props = { children: React.ReactNode }

const notices = [
  { icon: WarningCircleIcon, count: 119, tone: 'bg-rose-500', label: 'Pendências' },
  { icon: BellIcon, count: 3, tone: 'bg-orange-400', label: 'Notificações' },
]

export default function Layout({ children }: Props) {
  const { perfil, setPerfil } = usePerfil()

  return (
    <TooltipProvider delay={0}>
      <SidebarProvider style={{ '--sidebar-width': '240px' } as React.CSSProperties}>
        <AppSidebar />
        <SidebarInset>
          {/* Topbar — matches PMS AppTopbar exactly */}
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-1 border-b border-border bg-background px-3">
            <SidebarTrigger className="size-9" />

            <Button variant="ghost" size="icon" className="size-9 text-muted-foreground">
              <CornersOutIcon className="size-5" />
              <span className="sr-only">Tela cheia</span>
            </Button>
            <Button variant="ghost" size="icon" className="size-9 text-muted-foreground">
              <PlusIcon className="size-5" />
              <span className="sr-only">Criar</span>
            </Button>
            <Button variant="ghost" size="icon" className="size-9 text-muted-foreground">
              <MagnifyingGlassIcon className="size-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            <div className="ml-auto flex items-center gap-1">
              {notices.map((notice) => (
                <Button
                  key={notice.label}
                  variant="ghost"
                  size="icon"
                  className="relative size-9 text-muted-foreground"
                >
                  <notice.icon className="size-5" />
                  <span className={`absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold text-white ${notice.tone}`}>
                    {notice.count}
                  </span>
                  <span className="sr-only">{notice.label}</span>
                </Button>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-1.5 py-1 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-[#404e67] text-xs text-white">MP</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">Minha pousada</span>
                  <CaretDownIcon className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <GearSixIcon className="size-4" />
                    Minha conta
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserIcon className="size-4" />
                    Meu usuário
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <NotePencilIcon className="size-4" />
                    Cadastros
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileTextIcon className="size-4" />
                    Relatórios
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Perfil toggle — prototype only */}
                  {perfil === 'implantador' && (
                    <DropdownMenuItem onSelect={() => setPerfil('hoteleiro')}>
                      <UserIcon className="size-4" />
                      Ver como hoteleiro
                    </DropdownMenuItem>
                  )}
                  {perfil === 'hoteleiro' && (
                    <DropdownMenuItem onSelect={() => setPerfil('implantador')}>
                      <UserIcon className="size-4" />
                      Ver como implantador
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onSelect={() => { setPerfil(null) }} render={<Link to="/" />}>
                    <PowerIcon className="size-4" />
                    Trocar perfil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto bg-background">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
