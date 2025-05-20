"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bot, Send, User, FileText, Search, Trash2, Download, Copy, Clock } from "lucide-react"
import { useAuth } from "@/lib/supabase/auth-context"

// Mock data for AI responses
const mockResponses: Record<string, string> = {
  "Como faço para participar de uma licitação?":
    "Para participar de uma licitação, você precisa seguir estes passos:\n\n1. Cadastre-se no sistema como fornecedor\n2. Verifique se sua empresa atende aos requisitos da licitação\n3. Prepare a documentação necessária\n4. Envie sua proposta dentro do prazo estipulado\n5. Acompanhe o processo licitatório\n\nVocê pode encontrar mais informações na seção de documentos do sistema.",

  "Quais documentos são necessários para cadastro de fornecedor?":
    "Para o cadastro de fornecedor, você precisará dos seguintes documentos:\n\n- CNPJ ativo\n- Contrato social ou estatuto\n- Certidão negativa de débitos federais\n- Certidão negativa de débitos estaduais\n- Certidão negativa de débitos municipais\n- Certidão de regularidade do FGTS\n- Certidão negativa de débitos trabalhistas\n\nTodos os documentos devem estar dentro do prazo de validade.",

  "Como funciona o processo de licitação?":
    "O processo de licitação segue estas etapas principais:\n\n1. Publicação do edital\n2. Período para esclarecimentos e impugnações\n3. Recebimento das propostas\n4. Abertura e julgamento das propostas\n5. Habilitação dos licitantes\n6. Adjudicação e homologação\n7. Assinatura do contrato\n\nCada modalidade de licitação pode ter particularidades em seu processo.",

  "Qual a diferença entre pregão eletrônico e presencial?":
    "As principais diferenças entre pregão eletrônico e presencial são:\n\n**Pregão Eletrônico:**\n- Realizado em plataforma online\n- Não exige presença física dos licitantes\n- Maior alcance geográfico\n- Maior competitividade\n- Menor custo operacional\n\n**Pregão Presencial:**\n- Realizado em local físico determinado\n- Exige presença física dos representantes\n- Permite negociação face a face\n- Pode ser mais adequado para objetos complexos\n\nO pregão eletrônico é a modalidade preferencial conforme a legislação atual.",
}

// Types for chat messages
type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

// Types for saved queries
type SavedQuery = {
  id: string
  query: string
  response: string
  timestamp: Date
}

export default function AssistantPage() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("chat")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Olá! Sou o assistente virtual do Canal de Compras Brasil. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load saved queries from local storage
  useEffect(() => {
    const savedQueriesFromStorage = localStorage.getItem("savedQueries")
    if (savedQueriesFromStorage) {
      try {
        const parsed = JSON.parse(savedQueriesFromStorage)
        setSavedQueries(
          parsed.map((query: any) => ({
            ...query,
            timestamp: new Date(query.timestamp),
          })),
        )
      } catch (error) {
        console.error("Error parsing saved queries:", error)
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let response =
        "Desculpe, não tenho uma resposta específica para essa pergunta. Poderia reformular ou perguntar algo relacionado a licitações?"

      // Check if we have a mock response for this query
      for (const [key, value] of Object.entries(mockResponses)) {
        if (input.toLowerCase().includes(key.toLowerCase())) {
          response = value
          break
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const saveQuery = () => {
    // Get the last user message and assistant response
    const userMessages = messages.filter((msg) => msg.sender === "user")
    const assistantMessages = messages.filter((msg) => msg.sender === "assistant")

    if (userMessages.length === 0 || assistantMessages.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Não há conversa para salvar.",
        variant: "destructive",
      })
      return
    }

    const lastUserMessage = userMessages[userMessages.length - 1]
    const lastAssistantMessage = assistantMessages[assistantMessages.length - 1]

    const newSavedQuery: SavedQuery = {
      id: Date.now().toString(),
      query: lastUserMessage.content,
      response: lastAssistantMessage.content,
      timestamp: new Date(),
    }

    const updatedSavedQueries = [...savedQueries, newSavedQuery]
    setSavedQueries(updatedSavedQueries)

    // Save to local storage
    localStorage.setItem("savedQueries", JSON.stringify(updatedSavedQueries))

    toast({
      title: "Consulta salva",
      description: "Sua consulta foi salva com sucesso.",
    })
  }

  const deleteSavedQuery = (id: string) => {
    const updatedSavedQueries = savedQueries.filter((query) => query.id !== id)
    setSavedQueries(updatedSavedQueries)

    // Update local storage
    localStorage.setItem("savedQueries", JSON.stringify(updatedSavedQueries))

    toast({
      title: "Consulta excluída",
      description: "A consulta foi excluída com sucesso.",
    })
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "Olá! Sou o assistente virtual do Canal de Compras Brasil. Como posso ajudar você hoje?",
        sender: "assistant",
        timestamp: new Date(),
      },
    ])

    toast({
      title: "Chat limpo",
      description: "O histórico de conversa foi limpo.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)

    toast({
      title: "Copiado",
      description: "Texto copiado para a área de transferência.",
    })
  }

  const filteredSavedQueries = savedQueries.filter(
    (query) =>
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.response.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assistente IA</h1>
          <p className="text-muted-foreground">Tire suas dúvidas sobre licitações e processos de compras públicas</p>
        </div>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="saved">Consultas Salvas</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="flex h-[calc(100vh-250px)] flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/logo.png" alt="AI Assistant" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Assistente Virtual</CardTitle>
                  <CardDescription>Canal de Compras Brasil</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.sender === "assistant" && (
                        <Avatar className="mt-0.5 h-6 w-6">
                          <AvatarImage src="/logo.png" alt="AI Assistant" />
                          <AvatarFallback>
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className="whitespace-pre-line text-sm">{message.content}</div>
                        <div className="mt-1 text-right text-xs opacity-70">{formatTimestamp(message.timestamp)}</div>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="mt-0.5 h-6 w-6">
                          <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.name} />
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-start gap-2 rounded-lg bg-muted p-3">
                      <Avatar className="mt-0.5 h-6 w-6">
                        <AvatarImage src="/logo.png" alt="AI Assistant" />
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-card pt-4">
              <div className="flex w-full flex-col gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Limpar
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveQuery} disabled={messages.length <= 1}>
                    <Download className="mr-1 h-4 w-4" />
                    Salvar
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Digite sua pergunta..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[60px] flex-1 resize-none"
                  />
                  <Button className="h-auto" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Pressione Enter para enviar, Shift+Enter para nova linha
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultas Salvas</CardTitle>
              <CardDescription>Acesse suas consultas salvas anteriormente para referência rápida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar consultas salvas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              {filteredSavedQueries.length > 0 ? (
                <div className="space-y-4">
                  {filteredSavedQueries.map((query) => (
                    <Card key={query.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <CardTitle className="text-base font-medium">
                              {query.query.length > 50 ? `${query.query.substring(0, 50)}...` : query.query}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(query.timestamp)}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-1 text-sm font-medium">Pergunta:</h4>
                            <p className="text-sm">{query.query}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium">Resposta:</h4>
                            <p className="whitespace-pre-line text-sm">{query.response}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 border-t bg-card pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`Pergunta: ${query.query}\n\nResposta: ${query.response}`)}
                        >
                          <Copy className="mr-1 h-4 w-4" />
                          Copiar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => deleteSavedQuery(query.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Excluir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhuma consulta salva</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Nenhuma consulta corresponde à sua pesquisa."
                      : "Você ainda não salvou nenhuma consulta. Salve suas perguntas importantes para referência futura."}
                  </p>
                  {searchTerm && (
                    <Button className="mt-4" variant="outline" onClick={() => setSearchTerm("")}>
                      Limpar pesquisa
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
