"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/lib/supabase/auth-context"
import {
  Home,
  Search,
  Building2,
  Landmark,
  Calendar,
  FileText,
  DollarSign,
  Bell,
  Clock,
  CheckCircle,
  LifeBuoy,
  Users,
  Activity,
  ClipboardList,
} from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, signOut } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !profile) {
      router.push("/login")
    }
  }, [user, profile, router])

  // Get user data
  const userData = {
    name: profile?.name || "Usuário",
    email: profile?.email || user?.email || "",
    role: getUserRoleLabel(profile?.profile_type),
    image: "",
  }

  // Get navigation items based on user role
  const navItems = getNavItems(profile?.profile_type)
  const userRole = profile?.profile_type || "citizen"

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardSidebar userRole={userRole} />
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Breadcrumb or page title could go here */}
                </div>
                <UserNav user={userData} notificationCount={3} onLogout={handleLogout} />
              </div>
            </header>
            <main className="flex-1 p-4">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

// Helper function to get user role label
function getUserRoleLabel(profileType?: string): string {
  switch (profileType) {
    case "citizen":
      return "Cidadão"
    case "supplier":
      return "Fornecedor"
    case "agency":
      return "Órgão Público"
    case "admin":
      return "Administrador"
    case "support":
      return "Suporte"
    case "registration":
      return "Cadastro"
    default:
      return "Usuário"
  }
}

// Helper function to get navigation items based on user role
function getNavItems(profileType?: string) {
  const citizenItems = [
    {
      title: "Início",
      href: "/dashboard/citizen",
      icon: Home,
    },
    {
      title: "Pesquisar Licitações",
      href: "/dashboard/citizen/search",
      icon: Search,
    },
    {
      title: "Cadastrar Fornecedor",
      href: "/dashboard/citizen/register-supplier",
      icon: Building2,
    },
    {
      title: "Cadastrar Órgão Público",
      href: "/dashboard/citizen/register-agency",
      icon: Landmark,
    },
  ]

  const supplierItems = [
    {
      title: "Início",
      href: "/dashboard/supplier",
      icon: Home,
    },
    {
      title: "Agenda",
      href: "/dashboard/supplier/calendar",
      icon: Calendar,
    },
    {
      title: "Pesquisar Licitações",
      // href: "/dashboard/supplier/search",
      icon: Search,
    },
    {
      title: "Minhas Licitações",
      // href: "/dashboard/supplier/my-tenders",
      icon: FileText,
    },
    {
      title: "Posição Financeira",
      href: "/dashboard/supplier/financial",
      icon: DollarSign,
    },
    {
      title: "Alertas",
      href: "/dashboard/supplier/alerts",
      icon: Bell,
    },
  ]

  const agencyItems = [
    {
      title: "Início",
      href: "/dashboard/agency",
      icon: Home,
    },
    {
      title: "Agenda",
      href: "/dashboard/agency/calendar",
      icon: Calendar,
    },
    {
      title: "Licitações em Andamento",
      href: "/dashboard/agency/active-tenders",
      icon: Clock,
    },
    {
      title: "Licitações Concluídas",
      href: "/dashboard/agency/completed-tenders",
      icon: CheckCircle,
    },
    {
      title: "Suporte",
      href: "/dashboard/agency/support",
      icon: LifeBuoy,
    },
    {
      title: "Gerenciar Usuários",
      href: "/dashboard/agency/manage-users",
      icon: Users,
    },
    {
      title: "Alertas",
      href: "/dashboard/agency/alerts",
      icon: Bell,
    },
  ]

  const adminItems = [
    {
      title: "Início",
      href: "/dashboard/admin",
      icon: Home,
    },
    {
      title: "Licitações em Andamento",
      href: "/dashboard/admin/active-tenders",
      icon: Clock,
    },
    {
      title: "Licitações Concluídas",
      href: "/dashboard/admin/completed-tenders",
      icon: CheckCircle,
    },
    {
      title: "Gerenciar Usuários",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      title: "Posição Financeira",
      href: "/dashboard/admin/financial",
      icon: DollarSign,
    },
    {
      title: "Movimentação Usuários",
      href: "/dashboard/admin/user-activity",
      icon: Activity,
    },
    {
      title: "Gerenciamento Suporte",
      href: "/dashboard/admin/support-management",
      icon: LifeBuoy,
    },
    {
      title: "Gerenciamento Cadastro",
      href: "/dashboard/admin/registration-management",
      icon: ClipboardList,
    },
  ]

  const supportItems = [
    {
      title: "Início",
      href: "/dashboard/support",
      icon: Home,
    },
    {
      title: "Gerenciamento Suporte",
      href: "/dashboard/support/management",
      icon: LifeBuoy,
    },
  ]

  const registrationItems = [
    {
      title: "Início",
      href: "/dashboard/registration",
      icon: Home,
    },
    {
      title: "Gerenciamento Cadastro",
      href: "/dashboard/registration/management",
      icon: ClipboardList,
    },
  ]

  switch (profileType) {
    case "citizen":
      return citizenItems
    case "supplier":
      return supplierItems
    case "agency":
      return agencyItems
    case "admin":
      return adminItems
    case "support":
      return supportItems
    case "registration":
      return registrationItems
    default:
      return citizenItems // Default to citizen items
  }
}
