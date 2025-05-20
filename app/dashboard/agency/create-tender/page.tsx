"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Plus, Trash2, Upload, Save } from "lucide-react"
import { StepProgress } from "@/components/step-progress"

export default function CreateTenderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    modality: "",
    category: "",
    editalNumber: "",
    processNumber: "",
    judgmentCriteria: "",
    disputeMode: "",
    priceDecimals: "2",
    valueBetweenBids: "",
    secretValue: false,
    impugnationDate: undefined as Date | undefined,
    proposalDate: undefined as Date | undefined,
    openingDate: undefined as Date | undefined,
    documentationMode: "winner",
    phaseInversion: false,
    segments: [],
    object: "",
    team: {
      auctioneer: "",
      authority: "",
      supportTeam: [""],
    },
    lots: [
      {
        id: 1,
        description: "",
        type: "products",
        requireBrand: false,
        allowDescriptionChange: true,
        items: [
          {
            id: 1,
            description: "",
            quantity: "",
            unit: "",
            unitPrice: "",
            benefitType: "open",
          },
        ],
      },
    ],
    documents: [] as { name: string; file: File | null }[],
  })

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleTeamChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      team: { ...formData.team, [field]: value },
    })
  }

  const handleSupportTeamChange = (index: number, value: string) => {
    const newSupportTeam = [...formData.team.supportTeam]
    newSupportTeam[index] = value
    setFormData({
      ...formData,
      team: { ...formData.team, supportTeam: newSupportTeam },
    })
  }

  const addSupportTeamMember = () => {
    setFormData({
      ...formData,
      team: {
        ...formData.team,
        supportTeam: [...formData.team.supportTeam, ""],
      },
    })
  }

  const removeSupportTeamMember = (index: number) => {
    const newSupportTeam = [...formData.team.supportTeam]
    newSupportTeam.splice(index, 1)
    setFormData({
      ...formData,
      team: { ...formData.team, supportTeam: newSupportTeam },
    })
  }

  const handleLotChange = (lotIndex: number, field: string, value: any) => {
    const newLots = [...formData.lots]
    newLots[lotIndex] = { ...newLots[lotIndex], [field]: value }
    setFormData({ ...formData, lots: newLots })
  }

  const handleItemChange = (lotIndex: number, itemIndex: number, field: string, value: any) => {
    const newLots = [...formData.lots]
    newLots[lotIndex].items[itemIndex] = {
      ...newLots[lotIndex].items[itemIndex],
      [field]: value,
    }
    setFormData({ ...formData, lots: newLots })
  }

  const addLot = () => {
    const newLotId = formData.lots.length > 0 ? Math.max(...formData.lots.map((lot) => lot.id)) + 1 : 1

    setFormData({
      ...formData,
      lots: [
        ...formData.lots,
        {
          id: newLotId,
          description: "",
          type: "products",
          requireBrand: false,
          allowDescriptionChange: true,
          items: [
            {
              id: 1,
              description: "",
              quantity: "",
              unit: "",
              unitPrice: "",
              benefitType: "open",
            },
          ],
        },
      ],
    })
  }

  const removeLot = (index: number) => {
    const newLots = [...formData.lots]
    newLots.splice(index, 1)
    setFormData({ ...formData, lots: newLots })
  }

  const addItem = (lotIndex: number) => {
    const newLots = [...formData.lots]
    const newItemId =
      newLots[lotIndex].items.length > 0 ? Math.max(...newLots[lotIndex].items.map((item) => item.id)) + 1 : 1

    newLots[lotIndex].items.push({
      id: newItemId,
      description: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      benefitType: "open",
    })

    setFormData({ ...formData, lots: newLots })
  }

  const removeItem = (lotIndex: number, itemIndex: number) => {
    const newLots = [...formData.lots]
    newLots[lotIndex].items.splice(itemIndex, 1)
    setFormData({ ...formData, lots: newLots })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newDocuments = [...formData.documents]
      newDocuments[index] = {
        ...newDocuments[index],
        file: e.target.files[0],
      }
      setFormData({ ...formData, documents: newDocuments })
    }
  }

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    })
  }

  const removeDocument = (index: number) => {
    const newDocuments = [...formData.documents]
    newDocuments.splice(index, 1)
    setFormData({ ...formData, documents: newDocuments })
  }

  const handleDocumentNameChange = (index: number, name: string) => {
    const newDocuments = [...formData.documents]
    newDocuments[index] = { ...newDocuments[index], name }
    setFormData({ ...formData, documents: newDocuments })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to an API
    console.log("Form submitted:", formData)

    // Redirect to the active tenders page
    router.push("/dashboard/agency/active-tenders")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Criar Nova Licitação</h1>
        <p className="text-muted-foreground">Preencha os dados para criar um novo processo licitatório</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Licitação - Etapa {currentStep} de 4</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Informações básicas da licitação"}
            {currentStep === 2 && "Equipe responsável pelo processo"}
            {currentStep === 3 && "Lotes e itens da licitação"}
            {currentStep === 4 && "Documentos e publicação"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <StepProgress
              steps={["Informações Básicas", "Equipe", "Lotes e Itens", "Documentos"]}
              currentStep={currentStep}
            />
          </div>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="modality">Modalidade</Label>
                    <Select value={formData.modality} onValueChange={(value) => handleChange("modality", value)}>
                      <SelectTrigger id="modality">
                        <SelectValue placeholder="Selecione a modalidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pregao-eletronico">Pregão Eletrônico</SelectItem>
                        <SelectItem value="concorrencia-eletronica">Concorrência Eletrônica</SelectItem>
                        <SelectItem value="dispensa-eletronica">Dispensa Eletrônica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.modality === "pregao-eletronico" && (
                          <>
                            <SelectItem value="aquisicao-bens">Aquisição de bens</SelectItem>
                            <SelectItem value="servicos-comuns">Serviços comuns</SelectItem>
                            <SelectItem value="servicos-comuns-engenharia">Serviços comuns de engenharia</SelectItem>
                          </>
                        )}
                        {formData.modality === "concorrencia-eletronica" && (
                          <>
                            <SelectItem value="aquisicao-bens-especiais">Aquisição de bens especiais</SelectItem>
                            <SelectItem value="servicos-especiais">Serviços especiais</SelectItem>
                            <SelectItem value="obras">Obras</SelectItem>
                            <SelectItem value="servicos-especiais-engenharia">
                              Serviços especiais de engenharia
                            </SelectItem>
                            <SelectItem value="servicos-comuns-engenharia">Serviços comuns de engenharia</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="editalNumber">Número do Edital</Label>
                    <Input
                      id="editalNumber"
                      value={formData.editalNumber}
                      onChange={(e) => handleChange("editalNumber", e.target.value)}
                      placeholder="Ex: 001/2025"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="processNumber">Número do Processo</Label>
                    <Input
                      id="processNumber"
                      value={formData.processNumber}
                      onChange={(e) => handleChange("processNumber", e.target.value)}
                      placeholder="Ex: 123456/2025"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="judgmentCriteria">Critério de Julgamento</Label>
                    <Select
                      value={formData.judgmentCriteria}
                      onValueChange={(value) => handleChange("judgmentCriteria", value)}
                    >
                      <SelectTrigger id="judgmentCriteria">
                        <SelectValue placeholder="Selecione o critério" />
                      </SelectTrigger>
                      <SelectContent>
                        {(formData.modality === "pregao-eletronico" || formData.modality === "dispensa-eletronica") && (
                          <>
                            <SelectItem value="menor-preco-item">Menor Preço por item</SelectItem>
                            <SelectItem value="menor-preco-lote">Menor Preço por lote</SelectItem>
                            <SelectItem value="maior-desconto">Maior Desconto</SelectItem>
                            <SelectItem value="menor-taxa">Menor taxa administrativa</SelectItem>
                          </>
                        )}
                        {formData.modality === "concorrencia-eletronica" && (
                          <>
                            <SelectItem value="menor-preco">Menor Preço R$</SelectItem>
                            <SelectItem value="melhor-tecnica">Melhor técnica ou conteúdo artístico</SelectItem>
                            <SelectItem value="tecnica-preco">Técnica e preço R$</SelectItem>
                            <SelectItem value="maior-retorno">Maior retorno econômico R$ ou %</SelectItem>
                            <SelectItem value="maior-desconto">Maior Desconto (%)</SelectItem>
                            <SelectItem value="menor-taxa">Menor taxa administrativa %</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disputeMode">Modo de Disputa</Label>
                    <Select value={formData.disputeMode} onValueChange={(value) => handleChange("disputeMode", value)}>
                      <SelectTrigger id="disputeMode">
                        <SelectValue placeholder="Selecione o modo" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.modality === "pregao-eletronico" && (
                          <>
                            <SelectItem value="aberto">Aberto</SelectItem>
                            <SelectItem value="aberto-fechado">Aberto e Fechado</SelectItem>
                            <SelectItem value="fechado-aberto">Fechado e Aberto</SelectItem>
                            <SelectItem value="randomico">Randômico</SelectItem>
                          </>
                        )}
                        {formData.modality === "concorrencia-eletronica" && (
                          <>
                            <SelectItem value="aberto">Aberto</SelectItem>
                            <SelectItem value="fechado">Fechado</SelectItem>
                            <SelectItem value="aberto-fechado">Aberto e Fechado</SelectItem>
                            <SelectItem value="fechado-aberto">Fechado e Aberto</SelectItem>
                          </>
                        )}
                        {formData.modality === "dispensa-eletronica" && (
                          <SelectItem value="simples">Disputa Simples</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priceDecimals">Decimais dos Preços</Label>
                    <Select
                      value={formData.priceDecimals}
                      onValueChange={(value) => handleChange("priceDecimals", value)}
                    >
                      <SelectTrigger id="priceDecimals">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Casas</SelectItem>
                        <SelectItem value="3">3 Casas</SelectItem>
                        <SelectItem value="4">4 Casas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valueBetweenBids">Valor Entre Lances</Label>
                    <Input
                      id="valueBetweenBids"
                      value={formData.valueBetweenBids}
                      onChange={(e) => handleChange("valueBetweenBids", e.target.value)}
                      placeholder="Ex: 0,10 ou 1%"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="secretValue"
                    checked={formData.secretValue}
                    onCheckedChange={(checked) => handleChange("secretValue", checked)}
                  />
                  <Label htmlFor="secretValue">Valor Sigiloso</Label>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Data Limite para Impugnação e Esclarecimentos</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.impugnationDate ? (
                            format(formData.impugnationDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecionar data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.impugnationDate}
                          onSelect={(date) => handleChange("impugnationDate", date)}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Limite para Recebimento das Propostas</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.proposalDate ? (
                            format(formData.proposalDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecionar data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.proposalDate}
                          onSelect={(date) => handleChange("proposalDate", date)}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Data de Abertura da Sessão Pública</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.openingDate ? (
                            format(formData.openingDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecionar data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.openingDate}
                          onSelect={(date) => handleChange("openingDate", date)}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Documentos de Habilitação</Label>
                  <RadioGroup
                    value={formData.documentationMode}
                    onValueChange={(value) => handleChange("documentationMode", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">Todos apresentam na fase de proposta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="winner" id="winner" />
                      <Label htmlFor="winner">Somente o licitante arrematante apresenta</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="phaseInversion"
                    checked={formData.phaseInversion}
                    onCheckedChange={(checked) => handleChange("phaseInversion", checked)}
                  />
                  <Label htmlFor="phaseInversion">Inversão das fases</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="object">Objeto do Edital</Label>
                  <Textarea
                    id="object"
                    value={formData.object}
                    onChange={(e) => handleChange("object", e.target.value)}
                    placeholder="Descreva o objeto da licitação"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="auctioneer">
                    {formData.modality === "pregao-eletronico" ? "Pregoeiro" : "Agente de Contratação"}
                  </Label>
                  <Select
                    value={formData.team.auctioneer}
                    onValueChange={(value) => handleTeamChange("auctioneer", value)}
                  >
                    <SelectTrigger id="auctioneer">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao-silva">João Silva</SelectItem>
                      <SelectItem value="maria-santos">Maria Santos</SelectItem>
                      <SelectItem value="pedro-oliveira">Pedro Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authority">Autoridade Superior</Label>
                  <Select
                    value={formData.team.authority}
                    onValueChange={(value) => handleTeamChange("authority", value)}
                  >
                    <SelectTrigger id="authority">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos-ferreira">Carlos Ferreira</SelectItem>
                      <SelectItem value="ana-costa">Ana Costa</SelectItem>
                      <SelectItem value="roberto-almeida">Roberto Almeida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Equipe de Apoio</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSupportTeamMember}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>

                  {formData.team.supportTeam.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select value={member} onValueChange={(value) => handleSupportTeamChange(index, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lucas-martins">Lucas Martins</SelectItem>
                          <SelectItem value="julia-pereira">Julia Pereira</SelectItem>
                          <SelectItem value="fernando-gomes">Fernando Gomes</SelectItem>
                          <SelectItem value="patricia-lima">Patricia Lima</SelectItem>
                        </SelectContent>
                      </Select>

                      {formData.team.supportTeam.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSupportTeamMember(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {formData.judgmentCriteria === "menor-preco-item" ? "Itens" : "Lotes"}
                  </h3>
                  <Button type="button" variant="outline" onClick={addLot}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar {formData.judgmentCriteria === "menor-preco-item" ? "Item" : "Lote"}
                  </Button>
                </div>

                <div className="space-y-8">
                  {formData.lots.map((lot, lotIndex) => (
                    <Card key={lot.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {formData.judgmentCriteria === "menor-preco-item"
                              ? `Item ${lotIndex + 1}`
                              : `Lote ${lotIndex + 1}`}
                          </CardTitle>
                          {formData.lots.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeLot(lotIndex)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Tipo de Itens</Label>
                            <Select
                              value={lot.type}
                              onValueChange={(value) => handleLotChange(lotIndex, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="products">Produtos</SelectItem>
                                <SelectItem value="services">Serviços</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Descrição do {formData.judgmentCriteria === "menor-preco-item" ? "Item" : "Lote"}
                            </Label>
                            <Input
                              value={lot.description}
                              onChange={(e) => handleLotChange(lotIndex, "description", e.target.value)}
                              placeholder="Descrição"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          {lot.type === "products" && (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`requireBrand-${lotIndex}`}
                                checked={lot.requireBrand}
                                onCheckedChange={(checked) => handleLotChange(lotIndex, "requireBrand", checked)}
                              />
                              <Label htmlFor={`requireBrand-${lotIndex}`}>Requer Marca, Modelo e Fabricante</Label>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`allowDescriptionChange-${lotIndex}`}
                              checked={lot.allowDescriptionChange}
                              onCheckedChange={(checked) =>
                                handleLotChange(lotIndex, "allowDescriptionChange", checked)
                              }
                            />
                            <Label htmlFor={`allowDescriptionChange-${lotIndex}`}>Permitir Alterar a Descrição</Label>
                          </div>
                        </div>

                        {formData.judgmentCriteria === "menor-preco-lote" && (
                          <>
                            <div className="flex items-center justify-between mt-4">
                              <h4 className="font-medium">Itens do Lote</h4>
                              <Button type="button" variant="outline" size="sm" onClick={() => addItem(lotIndex)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Adicionar Item
                              </Button>
                            </div>
                          </>
                        )}

                        <div className="space-y-4">
                          {lot.items.map((item, itemIndex) => (
                            <div key={item.id} className="border rounded-md p-4">
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="font-medium">Item {itemIndex + 1}</h5>
                                {lot.items.length > 1 && formData.judgmentCriteria === "menor-preco-lote" && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(lotIndex, itemIndex)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label>Descrição</Label>
                                  <Input
                                    value={item.description}
                                    onChange={(e) =>
                                      handleItemChange(lotIndex, itemIndex, "description", e.target.value)
                                    }
                                    placeholder="Descrição do item"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Tipo de Benefício</Label>
                                  <Select
                                    value={item.benefitType}
                                    onValueChange={(value) =>
                                      handleItemChange(lotIndex, itemIndex, "benefitType", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="exclusive">Exclusivo ME/EPP</SelectItem>
                                      <SelectItem value="benefit">
                                        Ampla concorrência com benefício para ME/EPP
                                      </SelectItem>
                                      <SelectItem value="open">Ampla concorrência sem benefício</SelectItem>
                                      <SelectItem value="regional">Regional</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid gap-4 md:grid-cols-3 mt-4">
                                <div className="space-y-2">
                                  <Label>Quantidade</Label>
                                  <Input
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(lotIndex, itemIndex, "quantity", e.target.value)}
                                    placeholder="Quantidade"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Unidade de Medida</Label>
                                  <Input
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(lotIndex, itemIndex, "unit", e.target.value)}
                                    placeholder="Ex: UN, KG, CX"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Valor Unitário</Label>
                                  <Input
                                    value={item.unitPrice}
                                    onChange={(e) => handleItemChange(lotIndex, itemIndex, "unitPrice", e.target.value)}
                                    placeholder="R$ 0,00"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Documentos</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addDocument}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Documento
                    </Button>
                  </div>

                  {formData.documents.length === 0 && (
                    <div className="text-center p-8 border rounded-md border-dashed">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Adicione o Edital, Anexos, Estudo Técnico Preliminar, Termo de Referência
                      </p>
                    </div>
                  )}

                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-4 border rounded-md p-4">
                      <div className="flex-1 space-y-2">
                        <Label>Nome do Documento</Label>
                        <Input
                          value={doc.name}
                          onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                          placeholder="Ex: Edital, Termo de Referência"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Arquivo</Label>
                        <Input type="file" onChange={(e) => handleFileChange(e, index)} />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-6"
                        onClick={() => removeDocument(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-medium">Publicação</h3>

                  <Tabs defaultValue="now">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="now">Publicar Agora</TabsTrigger>
                      <TabsTrigger value="schedule">Agendar Publicação</TabsTrigger>
                    </TabsList>
                    <TabsContent value="now" className="p-4 border rounded-md mt-2">
                      <p className="text-sm text-muted-foreground">
                        A licitação será publicada imediatamente após salvar.
                      </p>
                    </TabsContent>
                    <TabsContent value="schedule" className="p-4 border rounded-md mt-2">
                      <div className="space-y-2">
                        <Label>Data de Publicação</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>Selecionar data</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus locale={ptBR} />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              Voltar
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={nextStep}>
              Próximo
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Salvar e Publicar
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
