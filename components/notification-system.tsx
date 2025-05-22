"use client";

import { useEffect, useState } from "react";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth-context";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  entity_id: string;
  entity_type: string;
  is_read: boolean;
  is_email_sent: boolean;
  priority: "low" | "medium" | "high";
  created_at: string;
};

interface NotificationSystemProps {
  count?: number;
}

export function NotificationSystem({ count = 0 }: NotificationSystemProps) {
  const supabase = createClientSupabaseClient();
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter((n) => !n.is_read).length || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Erro ao carregar notificações",
        description: "Não foi possível carregar suas notificações. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id);

      if (error) throw error;

      // Update local state
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Erro ao marcar notificação como lida",
        description:
          "Não foi possível atualizar o status da notificação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;

    try {
      const unreadNotifications = notifications.filter((n) => !n.is_read);
      if (unreadNotifications.length === 0) return;

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) throw error;

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);

      toast({
        title: "Notificações marcadas como lidas",
        description: `${unreadNotifications.length} notificações foram marcadas como lidas.`,
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast({
        title: "Erro ao marcar notificações como lidas",
        description:
          "Não foi possível atualizar o status das notificações. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").delete().eq("id", id);

      if (error) throw error;

      // Update local state
      const deletedNotification = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      toast({
        title: "Notificação removida",
        description: "A notificação foi removida com sucesso.",
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        title: "Erro ao remover notificação",
        description: "Não foi possível remover a notificação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  // Subscribe to new notifications
  useEffect(() => {
    if (!user) return;

    fetchNotifications();

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
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);

          // Show toast for high priority notifications
          if (newNotification.priority === "high") {
            toast({
              title: newNotification.title,
              description: newNotification.message,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  // Format notification date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch (error) {
      return "";
    }
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return "";
    try {
      return formatDistanceToNow(new Date(dateString), { locale: ptBR, addSuffix: true });
    } catch (error) {
      return "";
    }
  };

  // Get notification link based on type and entity
  const getNotificationLink = (notification: Notification) => {
    const { type, entity_id, entity_type } = notification;

    switch (entity_type) {
      case "tender":
        return `/dashboard/tenders/${entity_id}`;
      case "proposal":
        return `/dashboard/supplier/proposals/${entity_id}`;
      case "impugnation":
        return `/dashboard/tenders/${entity_id}?tab=impugnations`;
      case "clarification":
        return `/dashboard/tenders/${entity_id}?tab=clarifications`;
      case "appeal":
        return `/dashboard/tenders/${entity_id}?tab=appeals`;
      case "session":
        return `/tenders/${entity_id}/session`;
      case "document":
        return `/dashboard/documents/${entity_id}`;
      default:
        return "/dashboard/notifications";
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string, priority: string) => {
    let color = "bg-blue-100 text-blue-600";

    if (priority === "high") {
      color = "bg-red-100 text-red-600";
    } else if (priority === "medium") {
      color = "bg-yellow-100 text-yellow-600";
    }

    return (
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
        <Bell className="w-5 h-5" />
      </div>
    );
  };

  // Filter notifications by type
  const getFilteredNotifications = (filter: string) => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((n) => !n.is_read);
    return notifications.filter((n) => n.type === filter);
  };

  const handleViewAll = () => {
    router.push("/dashboard/notifications");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs font-normal"
            onClick={handleViewAll}>
            Ver todas
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
              <div className="flex w-full items-start justify-between">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(notification.created_at)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" onClick={handleViewAll}>
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
