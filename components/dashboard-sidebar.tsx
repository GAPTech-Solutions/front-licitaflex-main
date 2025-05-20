"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Search,
  Settings,
  ShoppingBag,
  Users,
  Wallet,
  Bell,
  Clock,
  CheckCircle,
  Activity,
  Landmark,
  MessageSquare,
  Bot,
  Globe,
} from "lucide-react"
import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface SidebarNavProps {
  userRole?: string
}

export function DashboardSidebar({ userRole = "citizen" }: SidebarNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <div className="flex items-center px-2">
          <Link href="/">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive(`/dashboard/${userRole}`)}>
                  <Link href={`/dashboard/${userRole}`}>
                    <Home className="h-4 w-4" />
                    <span>Início</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Citizen Navigation */}
              {userRole === "citizen" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/citizen/search")}>
                      <Link href="/dashboard/citizen/search">
                        <Search className="h-4 w-4" />
                        <span>Buscar Licitações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/citizen/register-supplier")}>
                      <Link href="/dashboard/citizen/register-supplier">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Cadastrar Fornecedor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/citizen/register-agency")}>
                      <Link href="/dashboard/citizen/register-agency">
                        <Landmark className="h-4 w-4" />
                        <span>Cadastrar Órgão</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Supplier Navigation */}
              {userRole === "supplier" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/supplier/search")}>
                      <Link href="/dashboard/supplier/search">
                        <Search className="h-4 w-4" />
                        <span>Buscar Licitações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/supplier/my-tenders")}>
                      <Link href="/dashboard/supplier/my-tenders">
                        <FileText className="h-4 w-4" />
                        <span>Minhas Licitações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/supplier/financial")}>
                      <Link href="/dashboard/supplier/financial">
                        <Wallet className="h-4 w-4" />
                        <span>Posição Financeira</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/supplier/documents")}>
                      <Link href="/dashboard/supplier/documents">
                        <FileText className="h-4 w-4" />
                        <span>Documentos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/supplier/calendar")}>
                      <Link href="/dashboard/supplier/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Agenda</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Agency Navigation */}
              {userRole === "agency" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/agency/create-tender")}>
                      <Link href="/dashboard/agency/create-tender">
                        <FileText className="h-4 w-4" />
                        <span>Criar Licitação</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/agency/active-tenders")}>
                      <Link href="/dashboard/agency/active-tenders">
                        <Clock className="h-4 w-4" />
                        <span>Licitações em Andamento</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/agency/completed-tenders")}>
                      <Link href="/dashboard/agency/completed-tenders">
                        <CheckCircle className="h-4 w-4" />
                        <span>Licitações Concluídas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/agency/calendar")}>
                      <Link href="/dashboard/agency/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Agenda</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/agency/manage-users")}>
                      <Link href="/dashboard/agency/manage-users">
                        <Users className="h-4 w-4" />
                        <span>Gerenciar Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Admin Navigation */}
              {userRole === "admin" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/manage-users")}>
                      <Link href="/dashboard/admin/manage-users">
                        <Users className="h-4 w-4" />
                        <span>Gerenciar Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/analytics")}>
                      <Link href="/dashboard/admin/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Análises</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/active-tenders")}>
                      <Link href="/dashboard/admin/active-tenders">
                        <Clock className="h-4 w-4" />
                        <span>Licitações em Andamento</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/completed-tenders")}>
                      <Link href="/dashboard/admin/completed-tenders">
                        <CheckCircle className="h-4 w-4" />
                        <span>Licitações Concluídas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/user-activity")}>
                      <Link href="/dashboard/admin/user-activity">
                        <Activity className="h-4 w-4" />
                        <span>Atividade de Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Support Navigation */}
              {userRole === "support" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/support/manage")}>
                      <Link href="/dashboard/support/manage">
                        <MessageSquare className="h-4 w-4" />
                        <span>Gerenciar Chamados</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/support/users")}>
                      <Link href="/dashboard/support/users">
                        <Users className="h-4 w-4" />
                        <span>Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Common Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/assistant")}>
                  <Link href="/dashboard/assistant">
                    <Bot className="h-4 w-4" />
                    <span>Assistente IA</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/notifications")}>
                  <Link href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notificações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/integrations/brasil")}>
                  <Link href="/dashboard/integrations/brasil">
                    <Globe className="h-4 w-4" />
                    <span>Integração +Brasil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")}>
                  <Link href="/dashboard/profile">
                    <Settings className="h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <div className="px-3 text-xs text-muted-foreground">© 2023 Canal de Compras Brasil</div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
