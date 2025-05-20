"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Check, Clock, FileText, Loader2, Upload, X } from "lucide-react"

const documentSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Selecione um arquivo para enviar.",
  }),
})

type DocumentFormValues = z.infer<typeof documentSchema>

// Mock data for document status
const documents = [
  {
    id: 1,
    name: "Certidão Negativa de Débitos",
    status: "approved",
    uploadedAt: "2023-10-15T14:30:00Z",
    expiresAt: "2024-10-15T14:30:00Z",
  },
  {
    id: 2,
    name: "Contrato Social",
    status: "pending",
    uploadedAt: "2023-11-20T10:15:00Z",
  },
  {
    id: 3,
    name: "Balanço Patrimonial",
    status: "rejected",
    uploadedAt: "2023-11-05T09:45:00Z",
    rejectionReason: "Documento ilegível. Por favor, envie uma versão mais clara.",
  },
  {
    id: 4,
    name: "Certidão de Regularidade do FGTS",
    status: "expired",
    uploadedAt: "2023-05-10T11:20:00Z",
    expiresAt: "2023-11-10T11:20:00Z",
  },
]

export default function DocumentsPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("required")

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {},
    mode: "onChange",
  })

  async function onSubmit(data: DocumentFormValues) {
    try {
      setIsUploading(true)
      setError(null)
      setUploadProgress(0)

      const file = data.file[0]
      if (!file) return

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return prev
          }
          return prev + 5
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(interval)
      setUploadProgress(100)

      // Reset form
      form.reset()

      toast({
        title: "Documento enviado",
        description: "Seu documento foi enviado com sucesso e está em análise.",
      })

      // Simulate adding to the list
      setTimeout(() => {
        setActiveTab("pending")
      }, 500)
    } catch (error: any) {
      setError(error.message)
      toast({
        title: "Erro ao enviar documento",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500">
            <Check className="mr-1 h-3 w-3" /> Aprovado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Em análise
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500">
            <X className="mr-1 h-3 w-3" /> Rejeitado
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-gray-500">
            <AlertCircle className="mr-1 h-3 w-3" /> Expirado
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const requiredDocuments = [
    "Certidão Negativa de Débitos Federais",
    "Certidão Negativa de Débitos Estaduais",
    "Certidão Negativa de Débitos Municipais",
    "Certidão de Regularidade do FGTS",
    "Contrato Social ou Estatuto",
    "Balanço Patrimonial",
    "Atestado de Capacidade Técnica",
  ]

  const pendingDocuments = documents.filter((doc) => doc.status === "pending")
  const approvedDocuments = documents.filter((doc) => doc.status === "approved")
  const rejectedDocuments = documents.filter((doc) => doc.status === "rejected")
  const expiredDocuments = documents.filter((doc) => doc.status === "expired")

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">Gerencie seus documentos para participação em licitações</p>
        </div>

        <Separator />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Visão geral dos seus documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Aprovados</span>
                  <Badge variant="outline" className="bg-green-500/10">
                    {approvedDocuments.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Em análise</span>
                  <Badge variant="outline" className="bg-yellow-500/10">
                    {pendingDocuments.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rejeitados</span>
                  <Badge variant="outline" className="bg-red-500/10">
                    {rejectedDocuments.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expirados</span>
                  <Badge variant="outline" className="bg-gray-500/10">
                    {expiredDocuments.length}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progresso</span>
                    <span className="text-sm text-muted-foreground">
                      {approvedDocuments.length}/{requiredDocuments.length}
                    </span>
                  </div>
                  <Progress value={(approvedDocuments.length / requiredDocuments.length) * 100} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enviar novo documento</CardTitle>
                <CardDescription>Envie um novo documento para análise</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel>Documento</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                onChange(e.target.files)
                              }}
                              {...rest}
                            />
                          </FormControl>
                          <FormDescription>Formatos aceitos: PDF, DOC, DOCX, JPG, JPEG, PNG</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Enviando...</span>
                          <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}

                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Enviar documento
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meus documentos</CardTitle>
                <CardDescription>Visualize e gerencie seus documentos</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="required" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="required">Obrigatórios</TabsTrigger>
                    <TabsTrigger value="pending">Em análise</TabsTrigger>
                    <TabsTrigger value="approved">Aprovados</TabsTrigger>
                    <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
                    <TabsTrigger value="expired">Expirados</TabsTrigger>
                  </TabsList>

                  <TabsContent value="required" className="space-y-4">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>{doc}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Enviar
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4">
                    {pendingDocuments.length > 0 ? (
                      pendingDocuments.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Enviado em {formatDate(doc.uploadedAt)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">{getStatusBadge(doc.status)}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">Nenhum documento em análise.</div>
                    )}
                  </TabsContent>

                  <TabsContent value="approved" className="space-y-4">
                    {approvedDocuments.length > 0 ? (
                      approvedDocuments.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Aprovado em {formatDate(doc.uploadedAt)}
                              {doc.expiresAt && ` • Válido até ${formatDate(doc.expiresAt)}`}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">{getStatusBadge(doc.status)}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">Nenhum documento aprovado.</div>
                    )}
                  </TabsContent>

                  <TabsContent value="rejected" className="space-y-4">
                    {rejectedDocuments.length > 0 ? (
                      rejectedDocuments.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Rejeitado em {formatDate(doc.uploadedAt)}
                            </div>
                            {doc.rejectionReason && (
                              <div className="text-sm text-red-500 mt-1">Motivo: {doc.rejectionReason}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Reenviar
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">Nenhum documento rejeitado.</div>
                    )}
                  </TabsContent>

                  <TabsContent value="expired" className="space-y-4">
                    {expiredDocuments.length > 0 ? (
                      expiredDocuments.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Expirado em {formatDate(doc.expiresAt || "")}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Renovar
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">Nenhum documento expirado.</div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
