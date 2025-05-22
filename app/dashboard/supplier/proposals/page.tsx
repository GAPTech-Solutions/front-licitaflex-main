import { redirect } from "next/navigation"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowRight, FileText, Plus } from "lucide-react"

export default async function SupplierProposalsPage() {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (!profile || profile.role !== "supplier") {
    redirect("/dashboard")
  }

  // Get supplier proposals
  const { data: proposals, error } = await supabase
    .from("proposals")
    .select(`
      *,
      tender:tenders(id, title, number, status),
      lot:tender_lots(id, number, description)
    `)
    .eq("supplier_id", profile.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching proposals:", error)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" }
    > = {
      draft: {
        label: "Rascunho",
        variant: "outline",
      },
      submitted: {
        label: "Enviada",
        variant: "default",
      },
      under_analysis: {
        label: "Em Análise",
        variant: "secondary",
      },
      accepted: {
        label: "Aceita",
        variant: "success",
      },
      rejected: {
        label: "Rejeitada",
        variant: "destructive",
      },
      winner: {
        label: "Vencedora",
        variant: "success",
      },
    }

    const config = statusConfig[status] || { label: status, variant: "outline" }

    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não definida"
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
    } catch (error) {
      return "Data inválida"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Minhas Propostas</h1>
          <p className="text-muted-foreground">Gerencie suas propostas para licitações</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/supplier/tenders">
            <Plus className="mr-2 h-4 w-4" />
            Nova Proposta
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals && proposals.length > 0 ? (
          proposals.map((proposal) => (
            <Card key={proposal.id} className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium line-clamp-2">{proposal.tender?.title}</CardTitle>
                  {getStatusBadge(proposal.status)}
                </div>
                <CardDescription>
                  Nº {proposal.tender?.number} - Lote {proposal.lot?.number}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 space-y-2 flex-grow">
                <div className="text-sm">
                  <span className="font-medium">Valor Total:</span> {formatCurrency(proposal.total_value || 0)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Enviada em:</span> {formatDate(proposal.created_at || "")}
                </div>
                {proposal.updated_at && proposal.updated_at !== proposal.created_at && (
                  <div className="text-sm">
                    <span className="font-medium">Atualizada em:</span> {formatDate(proposal.updated_at)}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/dashboard/supplier/proposals/${proposal.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Detalhes
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full p-8 text-center border rounded-lg bg-muted">
            <p className="text-muted-foreground">Você ainda não enviou nenhuma proposta.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/supplier/tenders">Ver Licitações Disponíveis</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
