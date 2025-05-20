"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, FileText, AlertCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample notification data
const notifications = [
  {
    id: "1",
    title: "Nova Licitação Publicada",
    message: "Uma nova licitação foi publicada que corresponde aos seus interesses.",
    date: "2023-11-15T10:30:00",
    read: false,
    type: "tender",
  },
  {
    id: "2",
    title: "Prazo de Licitação Expirando",
    message: "O prazo para envio de propostas da licitação #12345 expira em 24 horas.",
    date: "2023-11-14T15:45:00",
    read: true,
    type: "deadline",
  },
  {
    id: "3",
    title: "Resultado de Licitação",
    message: "Sua empresa foi vencedora na licitação #12346. Parabéns!",
    date: "2023-11-13T09:20:00",
    read: false,
    type: "result",
  },
  {
    id: "4",
    title: "Documento Aprovado",
    message: "Seu documento 'Certidão Negativa de Débitos' foi aprovado.",
    date: "2023-11-12T14:10:00",
    read: true,
    type: "document",
  },
  {
    id: "5",
    title: "Sessão Pública Agendada",
    message: "Uma sessão pública para a licitação #12347 foi agendada para 20/11/2023.",
    date: "2023-11-10T11:05:00",
    read: false,
    type: "session",
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [userNotifications, setUserNotifications] = useState(notifications)

  const markAsRead = (id: string) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setUserNotifications(userNotifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Todas as notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas com sucesso.",
    })
  }

  const deleteNotification = (id: string) => {
    setUserNotifications(userNotifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notificação excluída",
      description: "A notificação foi excluída com sucesso.",
    })
  }

  const deleteAllNotifications = () => {
    setUserNotifications([])
    toast({
      title: "Notificações excluídas",
      description: "Todas as notificações foram excluídas com sucesso.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tender":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "deadline":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "result":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "document":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "session":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredNotifications = userNotifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  const unreadCount = userNotifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">Gerencie suas notificações do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Marcar todas como lidas
            </Button>
          )}
          {userNotifications.length > 0 && (
            <Button variant="outline" onClick={deleteAllNotifications}>
              Limpar todas
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Todas
            <Badge variant="secondary" className="ml-2">
              {userNotifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Não lidas
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="read">
            Lidas
            <Badge variant="secondary" className="ml-2">
              {userNotifications.length - unreadCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                {filteredNotifications.length > 0
                  ? `Mostrando ${filteredNotifications.length} notificação(ões)`
                  : "Nenhuma notificação encontrada"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                            )}
                            <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                          </div>
                        </div>
                        <p className="mt-1 text-sm">{notification.message}</p>
                        <div className="mt-2 flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Marcar como lida
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs text-red-500 hover:text-red-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                  <Bell className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhuma notificação</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Você não tem notificações{" "}
                    {activeTab === "unread" ? "não lidas" : activeTab === "read" ? "lidas" : ""} no momento.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
