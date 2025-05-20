"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/supabase/auth-context"
import { supabase } from "@/lib/supabase/client"
import { Eye, EyeOff, Upload, User, Shield, FileText, Building, Briefcase, MapPin, Phone, Mail } from "lucide-react"

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cpf: "",
    cnpj: "",
    company_name: "",
    bio: "",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Format functions
  const formatCPF = (value: string) => {
    if (!value) return value
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatCNPJ = (value: string) => {
    if (!value) return value
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatPhone = (value: string) => {
    if (!value) return value
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  // Load user data
  useEffect(() => {
    if (profile) {
      setPersonalInfo({
        name: profile.name || "",
        email: user?.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        cpf: profile.cpf || "",
        cnpj: profile.cnpj || "",
        company_name: profile.company_name || "",
        bio: profile.bio || "",
      })

      if (profile.avatar_url) {
        setAvatarUrl(profile.avatar_url)
      }
    }
  }, [profile, user])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "cpf") {
      setPersonalInfo({ ...personalInfo, [name]: formatCPF(value) })
    } else if (name === "cnpj") {
      setPersonalInfo({ ...personalInfo, [name]: formatCNPJ(value) })
    } else if (name === "phone") {
      setPersonalInfo({ ...personalInfo, [name]: formatPhone(value) })
    } else {
      setPersonalInfo({ ...personalInfo, [name]: value })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordInfo({ ...passwordInfo, [name]: value })
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = e.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user?.id)

      if (updateError) {
        throw updateError
      }

      setAvatarUrl(data.publicUrl)

      toast({
        title: "Avatar atualizado",
        description: "Seu avatar foi atualizado com sucesso.",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar avatar",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const updatePersonalInfo = async () => {
    try {
      setIsLoading(true)

      // Update profile in database
      const { error } = await supabase
        .from("profiles")
        .update({
          name: personalInfo.name,
          phone: personalInfo.phone,
          address: personalInfo.address,
          cpf: personalInfo.cpf || null,
          cnpj: personalInfo.cnpj || null,
          company_name: personalInfo.company_name || null,
          bio: personalInfo.bio || null,
        })
        .eq("id", user?.id)

      if (error) {
        throw error
      }

      toast({
        title: "Perfil atualizado",
        description: "Suas informações pessoais foram atualizadas com sucesso.",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async () => {
    try {
      setIsLoading(true)

      // Validate passwords
      if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive",
        })
        return
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: passwordInfo.newPassword,
      })

      if (error) {
        throw error
      }

      // Clear password fields
      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getProfileTypeLabel = (type: string) => {
    switch (type) {
      case "citizen":
        return "Cidadão"
      case "supplier":
        return "Fornecedor"
      case "agency":
        return "Órgão Público"
      case "admin":
        return "Administrador"
      case "support":
        return "Suporte"
      default:
        return type
    }
  }

  const getProfileTypeIcon = (type: string) => {
    switch (type) {
      case "citizen":
        return <User className="h-4 w-4" />
      case "supplier":
        return <Briefcase className="h-4 w-4" />
      case "agency":
        return <Building className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      case "support":
        return <FileText className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const isOrganization = profile?.profile_type === "supplier" || profile?.profile_type === "agency"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e configurações de conta</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={personalInfo.name} />
                  <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">{personalInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
                <div className="mt-2 flex items-center justify-center">
                  <Badge className="flex items-center gap-1" variant="secondary">
                    {getProfileTypeIcon(profile?.profile_type)}
                    {getProfileTypeLabel(profile?.profile_type)}
                  </Badge>
                </div>
              </div>
              <div className="w-full space-y-2 pt-4">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.address}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais. Estas informações serão exibidas publicamente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={personalInfo.name}
                        onChange={handlePersonalInfoChange}
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" name="email" value={personalInfo.email} disabled placeholder="seu@email.com" />
                      <p className="text-xs text-muted-foreground">
                        O e-mail não pode ser alterado diretamente. Entre em contato com o suporte.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                        placeholder="Digite seu endereço completo"
                      />
                    </div>
                    {isOrganization ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="cnpj">CNPJ</Label>
                          <Input
                            id="cnpj"
                            name="cnpj"
                            value={personalInfo.cnpj}
                            onChange={handlePersonalInfoChange}
                            placeholder="00.000.000/0000-00"
                            maxLength={18}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company_name">Nome da Empresa/Órgão</Label>
                          <Input
                            id="company_name"
                            name="company_name"
                            value={personalInfo.company_name}
                            onChange={handlePersonalInfoChange}
                            placeholder="Digite o nome da empresa ou órgão"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          value={personalInfo.cpf}
                          onChange={handlePersonalInfoChange}
                          placeholder="000.000.000-00"
                          maxLength={14}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={personalInfo.bio}
                      onChange={handlePersonalInfoChange}
                      placeholder="Conte um pouco sobre você ou sua organização"
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={updatePersonalInfo} disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Atualize sua senha e gerencie as configurações de segurança da sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={passwordInfo.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Digite sua senha atual"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordInfo.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Digite sua nova senha"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordInfo.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirme sua nova senha"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={updatePassword} disabled={isLoading}>
                    {isLoading ? "Atualizando..." : "Atualizar Senha"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
