import { Suspense } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { SessionChat } from "@/components/session-chat"
import { TenderSessionInfo } from "@/components/tender-session-info"
import { TenderSessionParticipants } from "@/components/tender-session-participants"
import { RegisterParticipationButton } from "@/components/register-participation-button"
import { TenderHeader } from "@/components/tender-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function TenderSessionPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  // Buscar informações da licitação
  const { data: tender } = await supabase
    .from("tenders")
    .select(`
      id,
      title,
      number,
      status,
      opening_date,
      agencies!inner (
        name
      )
    `)
    .eq("id", params.id)
    .single()

  // Verificar se a sessão está ativa
  const isSessionActive = tender?.status === "active" || tender?.status === "in_progress"

  return (
    <div className="container mx-auto py-6 space-y-6">
      <TenderHeader
        title={tender?.title || "Sessão Pública"}
        number={tender?.number || ""}
        agency={tender?.agencies?.name || ""}
        id={params.id}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sessão Pública</CardTitle>
              <CardDescription>
                {isSessionActive
                  ? "A sessão está em andamento. Acompanhe em tempo real."
                  : "A sessão ainda não foi iniciada ou já foi encerrada."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Carregando informações da sessão...</div>}>
                <TenderSessionInfo tenderId={params.id} />
              </Suspense>

              {!isSessionActive && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    A sessão pública será iniciada em{" "}
                    {tender?.opening_date
                      ? new Date(tender.opening_date).toLocaleString("pt-BR")
                      : "data a ser definida"}
                    .
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="chat">
            <TabsList>
              <TabsTrigger value="chat">Chat da Sessão</TabsTrigger>
              <TabsTrigger value="participants">Participantes</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="h-[500px]">
              <SessionChat />
            </TabsContent>
            <TabsContent value="participants">
              <Suspense fallback={<div>Carregando participantes...</div>}>
                <TenderSessionParticipants tenderId={params.id} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegisterParticipationButton tenderId={params.id} />

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Links Rápidos</h3>
                <div className="grid gap-2">
                  <a href={`/tenders/${params.id}`} className="text-sm text-blue-600 hover:underline">
                    Detalhes da Licitação
                  </a>
                  <a href={`/tenders/${params.id}/documents`} className="text-sm text-blue-600 hover:underline">
                    Documentos
                  </a>
                  <a href={`/tenders/${params.id}/clarifications`} className="text-sm text-blue-600 hover:underline">
                    Esclarecimentos
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
