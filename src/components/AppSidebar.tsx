import { useLocation, Link } from 'react-router-dom'
import {
  ChartLineUpIcon, GearSixIcon, ListBulletsIcon,
  CalendarIcon, TagIcon, FileTextIcon,
  QuestionIcon, GlobeIcon, CaretDownIcon,
  BookOpenIcon, UsersIcon, CreditCardIcon,
} from '@phosphor-icons/react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarRail,
} from '@/components/ui/sidebar'
import { usePerfil } from '../contexts/PerfilContext.jsx'

type NavItem = {
  title: string
  path: string
  icon: React.ComponentType<{ weight?: string; className?: string }>
  disabled?: boolean
}

type NavSection = {
  label: string
  items: NavItem[]
}

const topItems: NavItem[] = [
  { title: 'Reservas',   path: '/reservas',   icon: BookOpenIcon,   disabled: true },
  { title: 'Hóspedes',   path: '/hospedes',   icon: UsersIcon,      disabled: true },
  { title: 'Transações', path: '/transacoes', icon: CreditCardIcon, disabled: true },
]

const motorSection: NavSection = {
  label: 'Motor de Reservas',
  items: [
    { title: 'Dashboard',    path: '/motor/dashboard',    icon: ChartLineUpIcon, disabled: true },
    { title: 'Configuração', path: '/motor/configuracao', icon: GearSixIcon,     disabled: true },
  ],
}

const canaisImplantador: NavSection = {
  label: 'Canais',
  items: [
    { title: 'Dashboard',    path: '/canais',             icon: ChartLineUpIcon },
    { title: 'Configuração', path: '/canais/configuracao', icon: GlobeIcon },
    { title: 'Logs',         path: '/canais/logs',        icon: ListBulletsIcon },
  ],
}

const canaisHoteleiro: NavSection = {
  label: 'Canais',
  items: [
    { title: 'Dashboard', path: '/canais', icon: ChartLineUpIcon },
  ],
}

const tarifarioSection: NavSection = {
  label: 'Tarifário',
  items: [
    { title: 'Calendário', path: '/tarifario/calendario', icon: CalendarIcon, disabled: true },
    { title: 'Promoções',  path: '/tarifario/promocoes',  icon: TagIcon,      disabled: true },
    { title: 'Políticas',  path: '/tarifario/politicas',  icon: FileTextIcon, disabled: true },
  ],
}

export function AppSidebar() {
  const location = useLocation()
  const { perfil } = usePerfil()
  const isHoteleiro = perfil === 'hoteleiro'

  const sections: NavSection[] = [
    motorSection,
    isHoteleiro ? canaisHoteleiro : canaisImplantador,
    tarifarioSection,
  ]

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <Sidebar collapsible="icon" style={{ '--sidebar-width': '240px' } as React.CSSProperties}>
      <SidebarHeader className="h-14 justify-center px-3">
        <Link to="/canais" className="flex items-center gap-2.5">
          <img src="/hospedin-icon-light.svg" alt="Hospedin" width={18} height={20} className="shrink-0" />
          <span className="text-base font-semibold text-white group-data-[collapsible=icon]:hidden">
            Hospedin.
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Top items */}
        <SidebarGroup className="px-0 pb-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path) && !item.disabled}
                    tooltip={item.title}
                    disabled={item.disabled}
                    className="rounded-none group-data-[state=expanded]:pl-5 data-active:group-data-[state=expanded]:border-l-4 data-active:group-data-[state=expanded]:border-l-[#32BBAA] data-active:group-data-[state=expanded]:pl-4 data-active:!bg-[#32BBAA]/12 data-active:!text-[#32BBAA] disabled:opacity-40"
                    render={item.disabled ? undefined : <Link to={item.path} />}
                  >
                    <item.icon weight={isActive(item.path) && !item.disabled ? 'fill' : 'regular'} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sectioned nav */}
        {sections.map((section) => (
          <Collapsible key={section.label} defaultOpen className="group/section">
            <SidebarGroup className="px-0">
              <SidebarGroupLabel
                render={<CollapsibleTrigger />}
                className="cursor-pointer pl-5 text-sidebar-foreground/55 uppercase tracking-wider hover:text-sidebar-foreground/80"
              >
                {section.label}
                <CaretDownIcon className="ml-auto size-3.5 transition-transform duration-200 group-data-[panel-open]/section:rotate-180" />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          isActive={isActive(item.path) && !item.disabled}
                          tooltip={item.title}
                          disabled={item.disabled}
                          className="rounded-none group-data-[state=expanded]:pl-5 data-active:group-data-[state=expanded]:border-l-4 data-active:group-data-[state=expanded]:border-l-[#32BBAA] data-active:group-data-[state=expanded]:pl-4 data-active:!bg-[#32BBAA]/12 data-active:!text-[#32BBAA] disabled:opacity-40"
                          render={item.disabled ? undefined : <Link to={item.path} />}
                        >
                          <item.icon weight={isActive(item.path) && !item.disabled ? 'fill' : 'regular'} />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Ajuda"
              className="rounded-none pl-5 text-[#f5d400] hover:text-[#f5d400] [&_svg]:text-[#f5d400]"
              render={<Link to="/ajuda" />}
            >
              <QuestionIcon weight="fill" />
              <span>Ajuda</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
