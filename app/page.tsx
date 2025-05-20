import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Shield, FileText, BarChart3 } from "lucide-react";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo showText={false
            } />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#sobre"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Sobre Nós
            </Link>
            <Link
              href="#fornecedor"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Para Fornecedor
            </Link>
            <Link
              href="#comprador"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Para Comprador
            </Link>
            <Link
              href="#vantagens"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Vantagens
            </Link>
            <Link
              href="#planos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Planos
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="font-medium border-primary text-primary hover:bg-primary hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-medium bg-primary text-white hover:bg-primary/90">
                Registrar
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#1916a1] to-[#2b27b2]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white font-heading">
                  Inclua sua empresa em mais processos de licitação!
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Oferecemos um canal completo, com todo auxílio que sua empresa precisa para
                  inserir-se ativamente no processo de compras públicas.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register?type=supplier">
                    <Button size="lg" className="bg-[#f4d400] text-[#1916a1] hover:bg-[#e6c800]">
                      Sou Fornecedor
                    </Button>
                  </Link>
                  <Link href="/register?type=agency">
                    <Button size="lg" className="bg-white text-[#1916a1] hover:bg-gray-100">
                      Sou Comprador
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex-1 flex justify-center">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/businessman.png"
                    alt="Profissional de negócios"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1916a1] font-heading">
                  A tecnologia que você procura!
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Soluções completas para compradores e fornecedores no processo de licitação.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#f8f9fa] p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1916a1] flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1916a1] mb-4">COMPRADOR</h3>
                <p className="text-gray-600 mb-6">
                  Podem ser Órgãos Públicos, Empresas Públicas e Fundações que utilizam licitação
                  eletrônica para adquirir produtos e contratar serviços.
                </p>
                <Link href="/register?type=agency">
                  <Button className="bg-[#1916a1] hover:bg-[#150f8b]">PLANOS PARA COMPRADOR</Button>
                </Link>
              </div>

              <div className="bg-[#f8f9fa] p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#f4d400] flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-[#1916a1]" />
                </div>
                <h3 className="text-xl font-bold text-[#1916a1] mb-4">FORNECEDOR</h3>
                <p className="text-gray-600 mb-6">
                  Podem ser Órgãos Públicos, Empresas Públicas e Fundações que utilizam licitação
                  eletrônica para adquirir produtos e contratar serviços.
                </p>
                <Link href="/register?type=supplier">
                  <Button className="bg-[#f4d400] text-[#1916a1] hover:bg-[#e6c800]">
                    PLANOS PARA FORNECEDOR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1916a1] font-heading">
                Nossas vantagens
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-[#1916a1] to-[#3730c9] rounded-lg overflow-hidden text-white">
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <h3 className="text-xl font-bold mb-4">NEGOCIE DE FORMA DIGITAL</h3>
                  <p className="mb-4 flex-grow">
                    Faça propostas, analisar documentos e negociar de forma facilitada.
                  </p>
                  <FileText className="h-16 w-16 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#1916a1] to-[#3730c9] rounded-lg overflow-hidden text-white">
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <h3 className="text-xl font-bold mb-4">A QUALQUER LUGAR, A QUALQUER HORA</h3>
                  <p className="mb-4 flex-grow">
                    Garanta sua participação em licitações seja onde estiver.
                  </p>
                  <Globe className="h-16 w-16 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#1916a1] to-[#3730c9] rounded-lg overflow-hidden text-white">
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <h3 className="text-xl font-bold mb-4">ACOMPANHAMENTO EM TEMPO REAL</h3>
                  <p className="mb-4 flex-grow">
                    Acesso fácil às publicações online de editais, agilidade nos processos para
                    fornecedores.
                  </p>
                  <Clock className="h-16 w-16 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#1916a1] to-[#2b27b2] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">
                Identifique o melhor plano para você, fornecedor!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-[#1916a1] p-4 text-center">
                  <h3 className="text-xl font-bold text-white">TRIMESTRAL</h3>
                </div>
                <div className="p-6 text-center text-gray-800">
                  <div className="text-3xl font-bold mb-4">
                    <span className="text-lg align-top">R$</span> 600
                    <span className="text-sm">,00</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Acesso por 90 dias
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Boletim de Editais
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Participação ilimitada em licitações pelo período
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Assistência Técnica por Telefone
                    </li>
                  </ul>
                  <Button className="w-full bg-[#1916a1] hover:bg-[#150f8b]">
                    QUERO CONTRATAR
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg transform scale-105 z-10">
                <div className="bg-[#f4d400] p-4 text-center">
                  <h3 className="text-xl font-bold text-[#1916a1]">SEMESTRAL</h3>
                </div>
                <div className="p-6 text-center text-gray-800">
                  <div className="text-3xl font-bold mb-4">
                    <span className="text-lg align-top">R$</span> 720
                    <span className="text-sm">,00</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Acesso por 180 dias
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Boletim de Editais
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Participação ilimitada em licitações pelo período
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Assistência Técnica por Telefone
                    </li>
                  </ul>
                  <Button className="w-full bg-[#f4d400] text-[#1916a1] hover:bg-[#e6c800]">
                    QUERO CONTRATAR
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-[#1e293b] p-4 text-center">
                  <h3 className="text-xl font-bold text-white">ANUAL</h3>
                </div>
                <div className="p-6 text-center text-gray-800">
                  <div className="text-3xl font-bold mb-4">
                    <span className="text-lg align-top">R$</span> 880
                    <span className="text-sm">,00</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Acesso por um ano
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Boletim de Editais
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Participação ilimitada em licitações pelo período
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Assistência Técnica por Telefone
                    </li>
                  </ul>
                  <Button className="w-full bg-[#1e293b] hover:bg-[#0f172a]">
                    QUERO CONTRATAR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-[#1916a1] text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            {/* <Logo variant="white" size="sm" /> */}
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Canal de Compras Brasil. Todos os direitos
              reservados.
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/terms" className="hover:underline">
              Termos
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacidade
            </Link>
            <Link href="/contact" className="hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
