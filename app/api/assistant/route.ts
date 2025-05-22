import { OpenAIStream, StreamingTextResponse } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// Contexto para o assistente em português
const contextPT = `
Você é o assistente virtual do Canal de Compras Brasil, uma plataforma de licitações públicas.
Seu objetivo é ajudar fornecedores e órgãos públicos com informações sobre licitações e processos de compras públicas.

Informações importantes sobre licitações:

1. Modalidades de licitação:
   - Pregão Eletrônico: Modalidade mais comum, realizada em plataforma online.
   - Pregão Presencial: Realizada em local físico determinado.
   - Concorrência: Para contratos de grande valor.
   - Tomada de Preços: Para contratos de médio valor.
   - Convite: Para contratos de pequeno valor.
   - Concurso: Para seleção de trabalho técnico, científico ou artístico.
   - Leilão: Para venda de bens móveis inservíveis ou produtos legalmente apreendidos.

2. Documentos necessários para participar de licitações:
   - CNPJ ativo
   - Contrato social ou estatuto
   - Certidão negativa de débitos federais
   - Certidão negativa de débitos estaduais
   - Certidão negativa de débitos municipais
   - Certidão de regularidade do FGTS
   - Certidão negativa de débitos trabalhistas

3. Etapas do processo licitatório:
   - Publicação do edital
   - Período para esclarecimentos e impugnações
   - Recebimento das propostas
   - Abertura e julgamento das propostas
   - Habilitação dos licitantes
   - Adjudicação e homologação
   - Assinatura do contrato

4. Legislação relevante:
   - Lei nº 8.666/1993 (Lei de Licitações)
   - Lei nº 10.520/2002 (Lei do Pregão)
   - Lei nº 14.133/2021 (Nova Lei de Licitações)
   - Lei Complementar nº 123/2006 (Tratamento diferenciado para ME/EPP)

Responda de forma clara, objetiva e amigável. Se não souber a resposta, indique que não tem essa informação específica e sugira que o usuário entre em contato com o suporte.
`

// Contexto para o assistente em inglês
const contextEN = `
You are the virtual assistant of the Brazil Procurement Channel, a public procurement platform.
Your goal is to help suppliers and public agencies with information about tenders and public procurement processes.

Important information about tenders:

1. Tender modalities:
   - Electronic Bidding: Most common modality, conducted on an online platform.
   - Face-to-face Bidding: Conducted at a specific physical location.
   - Competition: For high-value contracts.
   - Price Taking: For medium-value contracts.
   - Invitation: For small-value contracts.
   - Contest: For selection of technical, scientific, or artistic work.
   - Auction: For the sale of unserviceable movable property or legally seized products.

2. Documents required to participate in tenders:
   - Active CNPJ (Brazilian company registration)
   - Articles of incorporation or bylaws
   - Federal tax clearance certificate
   - State tax clearance certificate
   - Municipal tax clearance certificate
   - FGTS (Severance Indemnity Fund) regularity certificate
   - Labor debt clearance certificate

3. Stages of the bidding process:
   - Publication of the notice
   - Period for clarifications and challenges
   - Receipt of proposals
   - Opening and evaluation of proposals
   - Qualification of bidders
   - Award and approval
   - Contract signing

4. Relevant legislation:
   - Law No. 8,666/1993 (Bidding Law)
   - Law No. 10,520/2002 (Bidding Law)
   - Law No. 14,133/2021 (New Bidding Law)
   - Complementary Law No. 123/2006 (Differential treatment for ME/EPP)

Answer clearly, objectively, and in a friendly manner. If you don't know the answer, indicate that you don't have that specific information and suggest that the user contact support.
`

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Verificar autenticação
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages, language = "pt-BR" } = await req.json()

  // Selecionar o contexto com base no idioma
  const context = language === "pt-BR" ? contextPT : contextEN

  // Preparar o sistema de mensagens com o contexto
  const systemMessage = {
    role: "system",
    content: context,
  }

  // Adicionar o sistema de mensagens ao início da conversa
  const messagesWithContext = [systemMessage, ...messages]

  // Chamar a API do OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messagesWithContext,
    stream: true,
    temperature: 0.7,
    max_tokens: 1000,
  })

  // Criar um stream de texto para a resposta
  const stream = OpenAIStream(response)

  // Registrar a consulta no histórico (opcional)
  // Isso poderia ser implementado para análise e melhoria do assistente

  // Retornar a resposta como um stream
  return new StreamingTextResponse(stream)
}
