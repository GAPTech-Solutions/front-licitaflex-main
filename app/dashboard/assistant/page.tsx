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
import {
  Bot,
  Send,
  User,
  FileText,
  Search,
  Trash2,
  Download,
  Copy,
  Clock,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
} from "lucide-react"
import { useAuth } from "@/lib/supabase/auth-context"
import { useChat } from "ai/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssistantSuggestions } from "@/components/assistant-suggestions"
import { FeedbackDialog } from "@/components/feedback-dialog"

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
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [language, setLanguage] = useState("pt-BR")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    messageId: "",
    query: "",
    response: "",
    rating: true,
  })

  // AI Chat integration
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, setMessages, setInput } = useChat(
    {
      api: "/api/assistant",
      initialMessages: [
        {
          id: "welcome",
          content:
            language === "pt-BR"
              ? "Olá! Sou o assistente virtual do Canal de Compras Brasil. Como posso ajudar você hoje?"
              : "Hello! I'm the virtual assistant of the Brazil Procurement Channel. How can I help you today?",
          role: "assistant",
        },
      ],
      body: {
        language,
      },
    },
  )

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

  // Update initial message when language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        content:
          language === "pt-BR"
            ? "Olá! Sou o assistente virtual do Canal de Compras Brasil. Como posso ajudar você hoje?"
            : "Hello! I'm the virtual assistant of the Brazil Procurement Channel. How can I help you today?",
        role: "assistant",
      },
    ])
  }, [language, setMessages])

  // Hide suggestions after first message
  useEffect(() => {
    if (messages.length > 1) {
      setShowSuggestions(false)
    }
  }, [messages.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setInput(suggestion)
    // Opcional: enviar automaticamente a sugestão
    append({
      content: suggestion,
      role: "user",
    })
    setShowSuggestions(false)
  }

  const saveQuery = () => {
    // Get the last user message and assistant response
    const userMessages = messages.filter((msg) => msg.role === "user")
    const assistantMessages = messages.filter((msg) => msg.role === "assistant")

    if (userMessages.length === 0 || assistantMessages.length === 0) {
      toast({
        title: language === "pt-BR" ? "Erro ao salvar" : "Error saving",
        description: language === "pt-BR" ? "Não há conversa para salvar." : "There is no conversation to save.",
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
      title: language === "pt-BR" ? "Consulta salva" : "Query saved",
      description:
        language === "pt-BR" ? "Sua consulta foi salva com sucesso." : "Your query has been saved successfully.",
    })
  }

  const deleteSavedQuery = (id: string) => {
    const updatedSavedQueries = savedQueries.filter((query) => query.id !== id)
    setSavedQueries(updatedSavedQueries)

    // Update local storage
    localStorage.setItem("savedQueries", JSON.stringify(updatedSavedQueries))

    toast({
      title: language === "pt-BR" ? "Consulta excluída" : "Query deleted",
      description:
        language === "pt-BR" ? "A consulta foi excluída com sucesso." : "The query has been deleted successfully.",
    })
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          language === "pt-BR"
            ? "Olá! Sou o assistente virtual do Canal de Compras Brasil. Como posso ajudar você hoje?"
            : "Hello! I'm the virtual assistant of the Brazil Procurement Channel. How can I help you today?",
        role: "assistant",
      },
    ])
    setShowSuggestions(true)

    toast({
      title: language === "pt-BR" ? "Chat limpo" : "Chat cleared",
      description:
        language === "pt-BR" ? "O histórico de conversa foi limpo." : "The conversation history has been cleared.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)

    toast({
      title: language === "pt-BR" ? "Copiado" : "Copied",
      description: language === "pt-BR" ? "Texto copiado para a área de transferência." : "Text copied to clipboard.",
    })
  }

  const provideFeedback = (messageId: string, isPositive: boolean) => {
    // Find the user query and assistant response
    const messageIndex = messages.findIndex((msg) => msg.id === messageId)
    if (messageIndex <= 0) return

    // Get the user query that preceded this response
    const userQuery = messages[messageIndex - 1].content
    const assistantResponse = messages[messageIndex].content

    // Set feedback data and open dialog
    setFeedbackData({
      messageId,
      query: userQuery,
      response: assistantResponse,
      rating: isPositive,
    })
    setFeedbackDialogOpen(true)
  }

  const filteredSavedQueries = savedQueries.filter(
    (query) =>
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.response.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString(language, {
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
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Assistente IA" : "AI Assistant"}
          </h1>
          <p className="text-muted-foreground">
            {language === "pt-BR"
              ? "Tire suas dúvidas sobre licitações e processos de compras públicas"
              : "Get answers about tenders and public procurement processes"}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">Português</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="chat">{language === "pt-BR" ? "Chat" : "Chat"}</TabsTrigger>
          <TabsTrigger value="saved">{language === "pt-BR" ? "Consultas Salvas" : "Saved Queries"}</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
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
                      <CardTitle className="text-lg">
                        {language === "pt-BR" ? "Assistente Virtual" : "Virtual Assistant"}
                      </CardTitle>
                      <CardDescription>
                        {language === "pt-BR" ? "Canal de Compras Brasil" : "Brazil Procurement Channel"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pb-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="mt-0.5 h-6 w-6">
                              <AvatarImage src="/logo.png" alt="AI Assistant" />
                              <AvatarFallback>
                                <Bot className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="whitespace-pre-line text-sm">{message.content}</div>
                            <div className="mt-1 flex items-center justify-between">
                              <div className="text-xs opacity-70">
                                {message.timestamp ? formatTimestamp(new Date(message.timestamp)) : ""}
                              </div>
                              {message.role === "assistant" && message.id !== "welcome" && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => provideFeedback(message.id, true)}
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => provideFeedback(message.id, false)}
                                  >
                                    <ThumbsDown className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
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
                    {error && (
                      <div className="flex justify-center">
                        <div className="rounded-lg bg-red-100 p-3 text-red-600">
                          {language === "pt-BR"
                            ? "Erro ao processar sua solicitação. Por favor, tente novamente."
                            : "Error processing your request. Please try again."}
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
                        {language === "pt-BR" ? "Limpar" : "Clear"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={saveQuery} disabled={messages.length <= 1}>
                        <Download className="mr-1 h-4 w-4" />
                        {language === "pt-BR" ? "Salvar" : "Save"}
                      </Button>
                      {!showSuggestions && (
                        <Button variant="outline" size="sm" onClick={() => setShowSuggestions(true)}>
                          <HelpCircle className="mr-1 h-4 w-4" />
                          {language === "pt-BR" ? "Sugestões" : "Suggestions"}
                        </Button>
                      )}
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Textarea
                        placeholder={language === "pt-BR" ? "Digite sua pergunta..." : "Type your question..."}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="min-h-[60px] flex-1 resize-none"
                      />
                      <Button type="submit" className="h-auto" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                    <div className="text-xs text-muted-foreground">
                      {language === "pt-BR"
                        ? "Pressione Enter para enviar, Shift+Enter para nova linha"
                        : "Press Enter to send, Shift+Enter for a new line"}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            {showSuggestions && (
              <div className="hidden md:block">
                <AssistantSuggestions language={language} onSelectSuggestion={handleSelectSuggestion} />
              </div>
            )}
          </div>
          {showSuggestions && (
            <div className="md:hidden">
              <AssistantSuggestions language={language} onSelectSuggestion={handleSelectSuggestion} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "pt-BR" ? "Consultas Salvas" : "Saved Queries"}</CardTitle>
              <CardDescription>
                {language === "pt-BR"
                  ? "Acesse suas consultas salvas anteriormente para referência rápida"
                  : "Access your previously saved queries for quick reference"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={language === "pt-BR" ? "Pesquisar consultas salvas..." : "Search saved queries..."}
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
                            <h4 className="mb-1 text-sm font-medium">
                              {language === "pt-BR" ? "Pergunta:" : "Question:"}
                            </h4>
                            <p className="text-sm">{query.query}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium">
                              {language === "pt-BR" ? "Resposta:" : "Answer:"}
                            </h4>
                            <p className="whitespace-pre-line text-sm">{query.response}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 border-t bg-card pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `${language === "pt-BR" ? "Pergunta" : "Question"}: ${query.query}\n\n${language === "pt-BR" ? "Resposta" : "Answer"}: ${query.response}`,
                            )
                          }
                        >
                          <Copy className="mr-1 h-4 w-4" />
                          {language === "pt-BR" ? "Copiar" : "Copy"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => deleteSavedQuery(query.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          {language === "pt-BR" ? "Excluir" : "Delete"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    {language === "pt-BR" ? "Nenhuma consulta salva" : "No saved queries"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? language === "pt-BR"
                        ? "Nenhuma consulta corresponde à sua pesquisa."
                        : "No queries match your search."
                      : language === "pt-BR"
                        ? "Você ainda não salvou nenhuma consulta. Salve suas perguntas importantes para referência futura."
                        : "You haven't saved any queries yet. Save your important questions for future reference."}
                  </p>
                  {searchTerm && (
                    <Button className="mt-4" variant="outline" onClick={() => setSearchTerm("")}>
                      {language === "pt-BR" ? "Limpar pesquisa" : "Clear search"}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        messageId={feedbackData.messageId}
        query={feedbackData.query}
        response={feedbackData.response}
        rating={feedbackData.rating}
        language={language}
      />
    </div>
  )
}
