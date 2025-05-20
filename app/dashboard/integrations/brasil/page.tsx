"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Globe,
  Link2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
  Database,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertCircle,
  Clock,
} from "lucide-react"

export default function BrasilIntegrationPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("status")
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  // Integration settings
  const [settings, setSettings] = useState({
    apiKey: "",
    autoSync: true,
    syncInterval: "daily",
    importTenders: true,
    exportTenders: false,
    importDocuments: true,
    notifyChanges: true,
  })

  // Mock sync history
  const [syncHistory] = useState([
    {
      id: "1",
      date: "15/05/2025",
      time: "14:30",
      status: "success",
      items: 42,
      duration: "1m 23s",
      type: "import",
    },
    {
      id: "2",
      date: "14/05/2025",
      time: "09:15",
      status: "success",
      items: 38,
      duration: "1m 12s",
      type: "import",
    },
    {
      id: "3",
      date: "13/05/2025",
      time: "16:45",
      status: "error",
      items: 0,
      duration: "0m 45s",
      type: "import",
      error: "Erro de conexão com a API",
    },
    {
      id: "4",
      date: "12/05/2025",
      time: "10:30",
      status: "success",
      items: 27,
      duration: "0m 58s",
      type: "export",
    },
  ])

  const handleConnect = () => {
    if (!settings.apiKey) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API válida.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)

      toast({
        title: "Conectado com sucesso",
        description: "A integração com +Brasil foi estabelecida com sucesso.",
      })
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsLoading(true)

    // Simulate API disconnection
    setTimeout(() => {
      setIsConnected(false)
      setIsLoading(false)

      toast({
        title: "Desconectado",
        description: "A integração com +Brasil foi desconectada.",
      })
    }, 1000)
  }

  const handleSync = () => {
    if (!isConnected) {
      toast({
        title: "Erro",
        description: "É necessário estar conectado para sincronizar dados.",
        variant: "destructive",
      })
      return
    }

    setIsSyncing(true)

    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)

      toast({
        title: "Sincronização concluída",
        description: "Os dados foram sincronizados com sucesso.",
      })
    }, 3000)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSettings = () => {
    setIsLoading(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Configurações salvas",
        description: "As configurações da integração foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integração +Brasil</h1>
          <p className="text-muted-foreground">
            Gerencie a integração com a plataforma +Brasil para importar e exportar dados
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 md:mt-0">
          <Badge variant={isConnected ? "success" : "destructive"} className="flex items-center gap-1 px-3 py-1">
            {isConnected ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Conectado</span>
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5" />
                <span>Desconectado</span>
              </>
            )}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={!isConnected || isSyncing}
            className="gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Sincronizando..." : "Sincronizar"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="status" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status da Integração</CardTitle>
              <CardDescription>Verifique o status atual da integração com a plataforma +Brasil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className={`rounded-full p-3 ${isConnected ? "bg-green-100" : "bg-red-100"}`}>
                    <Globe className={`h-8 w-8 ${isConnected ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{isConnected ? "Integração Ativa" : "Integração Inativa"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {isConnected
                        ? "Sua conexão com a plataforma +Brasil está ativa e funcionando corretamente."
                        : "Sua conexão com a plataforma +Brasil não está ativa no momento."}
                    </p>
                  </div>
                  <Button
                    onClick={isConnected ? handleDisconnect : handleConnect}
                    disabled={isLoading}
                    variant={isConnected ? "outline" : "default"}
                    className="mt-2"
                  >
                    {isLoading
                      ? isConnected
                        ? "Desconectando..."
                        : "Conectando..."
                      : isConnected
                        ? "Desconectar"
                        : "Conectar"}
                  </Button>
                </div>
              </div>

              {!isConnected && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configurar Conexão</h3>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Chave de API</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) => handleSettingChange("apiKey", e.target.value)}
                      placeholder="Digite sua chave de API do +Brasil"
                    />
                    <p className="text-xs text-muted-foreground">
                      Você pode obter sua chave de API no portal do +Brasil na seção de integrações.
                    </p>
                  </div>
                </div>
              )}

              {isConnected && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informações da Conexão</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Última Sincronização</h4>
                          <p className="text-sm text-muted-foreground">15/05/2025 às 14:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Itens Sincronizados</h4>
                          <p className="text-sm text-muted-foreground">42 licitações, 156 documentos</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-2">
                        <ArrowDownToLine className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Próxima Importação</h4>
                          <p className="text-sm text-muted-foreground">16/05/2025 às 09:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Status da API</h4>
                          <p className="text-sm text-green-600">Operacional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {isConnected && (
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Realize ações comuns relacionadas à integração com o +Brasil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <ArrowDownToLine className="h-6 w-6" />
                    <div className="text-center">
                      <h4 className="text-sm font-medium">Importar Licitações</h4>
                      <p className="text-xs text-muted-foreground">Importar licitações do +Brasil</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <ArrowUpFromLine className="h-6 w-6" />
                    <div className="text-center">
                      <h4 className="text-sm font-medium">Exportar Licitações</h4>
                      <p className="text-xs text-muted-foreground">Exportar licitações para o +Brasil</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <FileText className="h-6 w-6" />
                    <div className="text-center">
                      <h4 className="text-sm font-medium">Sincronizar Documentos</h4>
                      <p className="text-xs text-muted-foreground">Atualizar documentos com o +Brasil</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Sincronização</CardTitle>
              <CardDescription>Visualize o histórico de sincronizações com a plataforma +Brasil</CardDescription>
            </CardHeader>
            <CardContent>
              {syncHistory.length > 0 ? (
                <div className="space-y-4">
                  {syncHistory.map((sync) => (
                    <div key={sync.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <div className={`rounded-full p-2 ${sync.status === "success" ? "bg-green-100" : "bg-red-100"}`}>
                        {sync.status === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-medium">
                            {sync.type === "import" ? "Importação" : "Exportação"} de Dados
                          </h3>
                          <div className="mt-1 sm:mt-0">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {sync.date} às {sync.time}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center">
                          <span>
                            {sync.status === "success" ? `${sync.items} itens processados` : "Falha na sincronização"}
                          </span>
                          <div className="hidden sm:block">•</div>
                          <span>Duração: {sync.duration}</span>
                          {sync.error && (
                            <>
                              <div className="hidden sm:block">•</div>
                              <span className="text-red-500">{sync.error}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum histórico disponível</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Não há registros de sincronização com a plataforma +Brasil.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Integração</CardTitle>
              <CardDescription>Personalize as configurações da integração com a plataforma +Brasil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Conexão</h3>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Chave de API</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => handleSettingChange("apiKey", e.target.value)}
                    placeholder="Digite sua chave de API do +Brasil"
                  />
                  <p className="text-xs text-muted-foreground">
                    Você pode obter sua chave de API no portal do +Brasil na seção de integrações.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Sincronização</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="autoSync" className="flex flex-col space-y-1">
                      <span>Sincronização Automática</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Sincronizar automaticamente dados com o +Brasil
                      </span>
                    </Label>
                    <Switch
                      id="autoSync"
                      checked={settings.autoSync}
                      onCheckedChange={(checked) => handleSettingChange("autoSync", checked)}
                    />
                  </div>

                  {settings.autoSync && (
                    <div className="space-y-2">
                      <Label htmlFor="syncInterval">Intervalo de Sincronização</Label>
                      <select
                        id="syncInterval"
                        value={settings.syncInterval}
                        onChange={(e) => handleSettingChange("syncInterval", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="hourly">A cada hora</option>
                        <option value="daily">Diariamente</option>
                        <option value="weekly">Semanalmente</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Dados</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="importTenders" className="flex flex-col space-y-1">
                      <span>Importar Licitações</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Importar licitações do +Brasil para o sistema
                      </span>
                    </Label>
                    <Switch
                      id="importTenders"
                      checked={settings.importTenders}
                      onCheckedChange={(checked) => handleSettingChange("importTenders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="exportTenders" className="flex flex-col space-y-1">
                      <span>Exportar Licitações</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Exportar licitações do sistema para o +Brasil
                      </span>
                    </Label>
                    <Switch
                      id="exportTenders"
                      checked={settings.exportTenders}
                      onCheckedChange={(checked) => handleSettingChange("exportTenders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="importDocuments" className="flex flex-col space-y-1">
                      <span>Importar Documentos</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Importar documentos do +Brasil para o sistema
                      </span>
                    </Label>
                    <Switch
                      id="importDocuments"
                      checked={settings.importDocuments}
                      onCheckedChange={(checked) => handleSettingChange("importDocuments", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notifyChanges" className="flex flex-col space-y-1">
                      <span>Notificar Alterações</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Receber notificações sobre alterações em licitações do +Brasil
                      </span>
                    </Label>
                    <Switch
                      id="notifyChanges"
                      checked={settings.notifyChanges}
                      onCheckedChange={(checked) => handleSettingChange("notifyChanges", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveSettings} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
