import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Search, FileText, DollarSign, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SupplierDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel do Fornecedor</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao sistema Licitações Brasil. Gerencie suas licitações e acompanhe oportunidades.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Agenda</CardTitle>
            <CardDescription>Visualize suas licitações em um calendário</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/supplier/calendar">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Agenda
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pesquisar Licitações</CardTitle>
            <CardDescription>Encontre novas oportunidades de licitações</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/supplier/search">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" />
                Pesquisar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Minhas Licitações</CardTitle>
            <CardDescription>Acompanhe suas licitações em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/supplier/my-tenders">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <FileText className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Licitações em Andamento</CardTitle>
            <CardDescription>Licitações que você está participando atualmente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTenders.map((tender) => (
                <div key={tender.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{tender.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">{tender.agency}</p>
                      <Badge variant={getBadgeVariant(tender.status)}>{tender.status}</Badge>
                    </div>
                  </div>
                  <Link href={`/dashboard/supplier/my-tenders/${tender.id}`}>
                    <Button variant="outline" size="sm">
                      Acessar
                    </Button>
                  </Link>
                </div>
              ))}
              {activeTenders.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">Nenhuma licitação em andamento</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alertas Recentes</CardTitle>
              <Link href="/dashboard/supplier/alerts">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4 mr-1" />
                  Ver todos
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 border-b pb-4">
                  <div className={`mt-0.5 rounded-full p-1 ${getAlertIconColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
              {recentAlerts.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">Nenhum alerta recente</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posição Financeira</CardTitle>
          <CardDescription>Informações sobre seu plano e pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Plano Atual</h3>
                  <p className="text-sm text-muted-foreground">Plano Anual</p>
                </div>
                <Badge variant="outline" className="bg-green-50">
                  Ativo
                </Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Validade:</span>
                  <span className="text-sm font-medium">05/06/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Valor:</span>
                  <span className="text-sm font-medium">R$ 1.200,00</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/dashboard/supplier/financial">
                <Button variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Ver detalhes financeiros
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions for badges and icons
function getBadgeVariant(status: string) {
  switch (status) {
    case "Em disputa":
      return "default"
    case "Em negociação":
      return "secondary"
    case "Declarado vencedor":
      return "success"
    case "Em recurso":
      return "destructive"
    default:
      return "outline"
  }
}

function getAlertIcon(type: string) {
  switch (type) {
    case "info":
      return <Search className="h-4 w-4 text-blue-500" />
    case "success":
      return <FileText className="h-4 w-4 text-green-500" />
    case "warning":
      return <Bell className="h-4 w-4 text-yellow-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

function getAlertIconColor(type: string) {
  switch (type) {
    case "info":
      return "bg-blue-100"
    case "success":
      return "bg-green-100"
    case "warning":
      return "bg-yellow-100"
    default:
      return "bg-gray-100"
  }
}

// Mock data for active tenders
const activeTenders = [
  {
    id: "1",
    title: "Aquisição de equipamentos de informática",
    agency: "Ministério da Educação",
    status: "Em disputa",
  },
  {
    id: "2",
    title: "Contratação de serviços de limpeza",
    agency: "Prefeitura Municipal de São Paulo",
    status: "Em negociação",
  },
  {
    id: "3",
    title: "Fornecimento de material de escritório",
    agency: "Secretaria de Saúde",
    status: "Declarado vencedor",
  },
]

// Mock data for recent alerts
const recentAlerts = [
  {
    id: "1",
    type: "info",
    title: "Nova licitação disponível",
    description: "Uma nova licitação compatível com seu perfil foi publicada",
    time: "Há 2 horas",
  },
  {
    id: "2",
    type: "success",
    title: "Proposta aceita",
    description: "Sua proposta para a licitação #2354 foi aceita",
    time: "Há 1 dia",
  },
  {
    id: "3",
    type: "warning",
    title: "Prazo de envio de documentos",
    description: "O prazo para envio de documentos da licitação #1098 está acabando",
    time: "Há 2 dias",
  },
]
