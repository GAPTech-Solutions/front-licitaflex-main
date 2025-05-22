import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Globe, Clock, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Canal de Compras Brasil" width={40} height={40} className="h-10 w-auto" />
              <span className="font-bold text-blue-900 text-xl">Canal de Compras Brasil</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-900">
              Sobre Nós
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-900">
              Para Fornecedor
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-900">
              Para Comprador
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-900">
              Vantagens
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-900">
              Planos
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Registrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1916a1] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Inclua sua empresa em mais processos de licitação!</h1>
              <p className="mb-8">
                Oferecemos um canal completo, com todo auxílio que sua empresa precisa para inserir-se ativamente no
                processo de compras públicas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#fornecedor">
                  <Button className="bg-[#f4d400] text-black hover:bg-yellow-300">Sou Fornecedor</Button>
                </Link>
                <Link href="#comprador">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Sou Comprador
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/smiling-business-professional-laptop.png"
                alt="Profissional sorrindo"
                width={500}
                height={350}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16" id="tecnologia">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1916a1] mb-2">A tecnologia que você procura!</h2>
            <p className="text-gray-600">
              Soluções completas para compradores e fornecedores no processo de licitação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-t-[#1916a1]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#1916a1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#1916a1]">COMPRADOR</h3>
                <p className="text-gray-600 mb-6">
                  Podem ser Órgãos Públicos, Empresas Públicas e Fundações que utilizam licitação eletrônica para
                  adquirir produtos e contratar serviços.
                </p>
                <Button className="bg-[#1916a1] hover:bg-blue-900">PLANOS PARA COMPRADOR</Button>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#f4d400]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#f4d400] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                    <path d="M15 7h6v6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#1916a1]">FORNECEDOR</h3>
                <p className="text-gray-600 mb-6">
                  Podem ser Órgãos Públicos, Empresas Públicas e Fundações que utilizam licitação eletrônica para
                  adquirir produtos e contratar serviços.
                </p>
                <Button className="bg-[#f4d400] text-black hover:bg-yellow-500" id="fornecedor">
                  PLANOS PARA FORNECEDOR
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1916a1]">Nossas vantagens</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1916a1] text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">NEGOCIE DE FORMA DIGITAL</h3>
                <p className="mb-6">Faça propostas, analise documentos e negocie de forma facilitada.</p>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1916a1] text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">A QUALQUER LUGAR, A QUALQUER HORA</h3>
                <p className="mb-6">Gerencie sua participação em licitações seja onde estiver.</p>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1916a1] text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">ACOMPANHAMENTO EM TEMPO REAL</h3>
                <p className="mb-6">
                  Acesso fácil às publicações online de editais, agilidade nos processos para fornecedores.
                </p>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-[#1916a1] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Identifique o melhor plano para você, fornecedor!</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white text-gray-900">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#1916a1] mb-2">TRIMESTRAL</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-sm">R$</span>
                    <span className="text-4xl font-bold">600</span>
                    <span className="text-sm">,00</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Acesso por 90 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Boletim de Editais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Participação limitada em licitações pelo período</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Assistência Técnica por Telefone</span>
                  </div>
                </div>

                <Link href="/checkout?plan=trimestral">
                  <Button className="w-full bg-[#1916a1] hover:bg-blue-900">QUERO CONTRATAR</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#f4d400] text-gray-900">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#1916a1] mb-2">SEMESTRAL</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-sm">R$</span>
                    <span className="text-4xl font-bold">720</span>
                    <span className="text-sm">,00</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Acesso por 180 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Boletim de Editais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Participação limitada em licitações pelo período</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Assistência Técnica por Telefone</span>
                  </div>
                </div>

                <Link href="/checkout?plan=semestral">
                  <Button className="w-full bg-[#1916a1] hover:bg-blue-900">QUERO CONTRATAR</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 text-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">ANUAL</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-sm">R$</span>
                    <span className="text-4xl font-bold">880</span>
                    <span className="text-sm">,00</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Acesso por um ano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Boletim de Editais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Participação limitada em licitações pelo período</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Assistência Técnica por Telefone</span>
                  </div>
                </div>

                <Link href="/checkout?plan=anual">
                  <Button className="w-full bg-[#1916a1] hover:bg-blue-900">QUERO CONTRATAR</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2023 Canal de Compras Brasil. Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-gray-600 hover:text-[#1916a1]">
                Termos
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#1916a1]">
                Privacidade
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#1916a1]">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
