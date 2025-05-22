"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { Bell, CheckIcon as CheckAll, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/lib/supabase/auth-context"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  entity_id: string
  entity_type: string
  is_read: boolean
  is_email_sent: boolean
  priority: "low" | "medium" | "high"
  created_at: string
}

export function NotificationSystem() {
  const supabase = createClientSupabaseClient()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)

      if (error) throw error

      setNotifications(data || [])
      setUnreadCount(data?.filter((n) => !n.is_read).length || 0)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast({
        title: "Erro ao carregar notificações",
        description: "Não foi possível carregar suas notificações. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id)

      if (error) throw error

      // Update local state
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast({
        title: "Erro ao marcar notificação como lida",
        description: "Não foi possível atualizar o status da notificação. Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return

    try {
      const unreadNotifications = notifications.filter((n) => !n.is_read)
      if (unreadNotifications.length === 0) return

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false)

      if (error) throw error

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)

      toast({
        title: "Notificações marcadas como lidas",
        description: `${unreadNotifications.length} notificações foram marcadas como lidas.`,
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      toast({
        title: "Erro ao marcar notificações como lidas",
        description: "Não foi possível atualizar o status das notificações. Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").delete().eq("id", id)

      if (error) throw error

      // Update local state
      const deletedNotification = notifications.find((n) => n.id === id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }

      toast({
        title: "Notificação removida",
        description: "A notificação foi removida com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast({
        title: "Erro ao remover notificação",
        description: "Não foi possível remover a notificação. Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  // Subscribe to new notifications
  useEffect(() => {
    if (!user) return

    fetchNotifications()

    // Subscribe to new notifications
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Add new notification to the list
          const newNotification = payload.new as Notification
          setNotifications((prev) => [newNotification, ...prev])
          setUnreadCount((prev) => prev + 1)

          // Show toast for high priority notifications
          if (newNotification.priority === "high") {
            toast({
              title: newNotification.title,
              description: newNotification.message,
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  // Format notification date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
    } catch (error) {
      return ""
    }
  }

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return ""
    try {
      return formatDistanceToNow(new Date(dateString), { locale: ptBR, addSuffix: true })
    } catch (error) {
      return ""
    }
  }

  // Get notification link based on type and entity
  const getNotificationLink = (notification: Notification) => {
    const { type, entity_id, entity_type } = notification

    switch (entity_type) {
      case "tender":
        return `/dashboard/tenders/${entity_id}`
      case "proposal":
        return `/dashboard/supplier/proposals/${entity_id}`
      case "impugnation":
        return `/dashboard/tenders/${entity_id}?tab=impugnations`
      case "clarification":
        return `/dashboard/tenders/${entity_id}?tab=clarifications`
      case "appeal":
        return `/dashboard/tenders/${entity_id}?tab=appeals`
      case "session":
        return `/tenders/${entity_id}/session`
      case "document":
        return `/dashboard/documents/${entity_id}`
      default:
        return "/dashboard/notifications"
    }
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string, priority: string) => {
    let color = "bg-blue-100 text-blue-600"

    if (priority === "high") {
      color = "bg-red-100 text-red-600"
    } else if (priority === "medium") {
      color = "bg-yellow-100 text-yellow-600"
    }

    return (
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
        <Bell className="w-5 h-5" />
      </div>
    )
  }

  // Filter notifications by type
  const getFilteredNotifications = (filter: string) => {
    if (filter === "all") return notifications
    if (filter === "unread") return notifications.filter((n) => !n.is_read)
    return notifications.filter((n) => n.type === filter)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notificações</h4>
          {unreadCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs h-8" onClick={markAllAsRead}>
                    <CheckAll className="h-4 w-4 mr-1" />
                    Marcar todas como lidas
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Marcar todas as notificações como lidas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">
              Todas
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="important">
              Importantes
              {notifications.filter((n) => n.priority === "high").length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {notifications.filter((n) => n.priority === "high").length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[350px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${!notification.is_read ? "bg-muted/50" : ""} relative group`}
                    >
                      <Link
                        href={getNotificationLink(notification)}
                        onClick={() => {
                          if (!notification.is_read) {
                            markAsRead(notification.id)
                          }
                          setIsOpen(false)
                        }}
                        className="block"
                      >
                        <div className="flex gap-3">
                          {getNotificationIcon(notification.type, notification.priority)}
                          <div className="space-y-1 flex-1">
                            <div className="flex justify-between">
                              <p className={`text-sm font-medium ${!notification.is_read ? "font-semibold" : ""}`}>
                                {notification.title}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {formatRelativeTime(notification.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação.</div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[350px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              ) : getFilteredNotifications("unread").length > 0 ? (
                <div className="divide-y">
                  {getFilteredNotifications("unread").map((notification) => (
                    <div key={notification.id} className="p-4 bg-muted/50 relative group">
                      <Link
                        href={getNotificationLink(notification)}
                        onClick={() => {
                          markAsRead(notification.id)
                          setIsOpen(false)
                        }}
                        className="block"
                      >
                        <div className="flex gap-3">
                          {getNotificationIcon(notification.type, notification.priority)}
                          <div className="space-y-1 flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold">{notification.title}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatRelativeTime(notification.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação não lida.</div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="important" className="m-0">
            <ScrollArea className="h-[350px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              ) : notifications.filter((n) => n.priority === "high").length > 0 ? (
                <div className="divide-y">
                  {notifications
                    .filter((n) => n.priority === "high")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 ${!notification.is_read ? "bg-muted/50" : ""} relative group`}
                      >
                        <Link
                          href={getNotificationLink(notification)}
                          onClick={() => {
                            if (!notification.is_read) {
                              markAsRead(notification.id)
                            }
                            setIsOpen(false)
                          }}
                          className="block"
                        >
                          <div className="flex gap-3">
                            {getNotificationIcon(notification.type, notification.priority)}
                            <div className="space-y-1 flex-1">
                              <div className="flex justify-between">
                                <p className={`text-sm font-medium ${!notification.is_read ? "font-semibold" : ""}`}>
                                  {notification.title}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.created_at)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</p>
                            </div>
                          </div>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação importante.</div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
            <Link href="/dashboard/notifications">Ver todas</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
