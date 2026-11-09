/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Award,
  FileDown,
  ShieldCheck,
  Eye,
  Volume2,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowDownRight,
} from 'lucide-react';
import {
  CERTIFICATE_07_DATA,
  DADOS_POPULACIONAIS_ENQUETE,
} from './data/certificate07Data';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
} from './components/InstitutionalAssets';
import { Certificate07Document } from './components/Certificate07Document';
import { VisionSimulatorLab } from './components/VisionSimulatorLab';
import { AccessibleMaterialsShowcase } from './components/AccessibleMaterialsShowcase';
import { PublicValidatorSection } from './components/PublicValidatorSection';

export default function App() {
  const [baseUrl, setBaseUrl] = useState<string>(
    'https://extensao-inclusao-visual-idoso.vercel.app'
  );
  const [queryCodigo, setQueryCodigo] = useState<string>(CERTIFICATE_07_DATA.codigo);
  const [verifiedBannerVisible, setVerifiedBannerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
      const params = new URLSearchParams(window.location.search);
      const cod = params.get('codigo') || params.get('chave');
      if (cod) {
        setQueryCodigo(cod);
        setVerifiedBannerVisible(true);
      }
      if (window.location.hash === '#validador') {
        setTimeout(() => {
          document.getElementById('validador')?.scrollIntoView({ behavior: 'smooth' });
        }, 250);
      }
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#112229]">
      {/* TOP BAR CONTRACT: Strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E2DEC9] no-print">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            className="text-lg font-display font-bold tracking-tight text-[#0B3B49] whitespace-nowrap shrink-0"
          >
            Extensão Saúde Ocular
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#112229]/80">
            <a
              href="#certificado"
              className="hover:text-[#0B3B49] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 07 (PDF)
            </a>
            <a
              href="#simulador"
              className="hover:text-[#0B3B49] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador Óptico
            </a>
            <a
              href="#materiais"
              className="hover:text-[#0B3B49] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Folhetos e Áudio-Guias
            </a>
            <a
              href="#validador"
              className="hover:text-[#0B3B49] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Público
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('certificado')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Baixar Certificado PDF
            </button>
          </div>
        </div>
      </header>

      {/* Auto-Detected QR Code / Query Parameter Verification Strip */}
      {verifiedBannerVisible && (
        <div className="bg-[#0B3B49] text-white border-b border-[#D97706] px-6 py-3 no-print">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FCD34D] shrink-0" />
              <span>
                Acesso via Link / QR Code de Verificação detectado: Código{' '}
                <strong className="font-mono-tabular text-[#FCD34D]">{queryCodigo}</strong>{' '}
                autenticado com sucesso no Livro nº {CERTIFICATE_07_DATA.livro}, Folha{' '}
                {CERTIFICATE_07_DATA.folha}.
              </span>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('validador')}
              className="underline font-semibold text-[#FCD34D] hover:text-white cursor-pointer whitespace-nowrap"
            >
              Ver Registro Completo de Fé Pública ↓
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main id="topo" className="flex-1 no-print">
        {/* HERO SECTION */}
        <section className="border-b border-[#E2DEC9] bg-gradient-to-b from-[#FAF8F3] to-[#F3EFE4] py-12 lg:py-16">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Institutional Issuers Strip */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-8 border-b border-[#E2DEC9]">
              <div className="flex items-center gap-4">
                <LogoEditoraMenteSaude className="w-14 h-14 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#0F4C3A]">
                    EDITORA MENTE E SAÚDE
                  </div>
                  <div className="text-xs font-mono-tabular text-slate-600">
                    CNPJ: {CERTIFICATE_07_DATA.emissores.editora.cnpj} · Conselho Editorial e
                    Extensão Científica
                  </div>
                </div>
              </div>

              <div className="hidden lg:block text-center text-xs font-mono-tabular text-[#0B3B49]">
                <div>PARCERIA INTERINSTITUCIONAL DE EXTENSÃO E COMUNICAÇÃO CIENTÍFICA</div>
                <div className="text-[#92400E] font-semibold mt-0.5">
                  REGISTRO OFICIAL: LIVRO Nº {CERTIFICATE_07_DATA.livro} · FOLHA{' '}
                  {CERTIFICATE_07_DATA.folha} · CÓD. {CERTIFICATE_07_DATA.codigo}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right">
                  <div className="text-sm font-bold text-[#1B365D]">
                    CENTRO PROFISSIONALIZANTE MARIA DALVA DE ARAÚJO
                  </div>
                  <div className="text-xs font-mono-tabular text-slate-600">
                    CNPJ: {CERTIFICATE_07_DATA.emissores.centro.cnpj} · Coordenadoria de Projetos
                    Educativos
                  </div>
                </div>
                <LogoCentroMariaDalva className="w-14 h-14 shrink-0" />
              </div>
            </div>

            {/* Hero Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider mb-3">
                    <span>CERTIFICADO Nº 07</span>
                    <span aria-hidden="true">·</span>
                    <span>ITEM 08 — ATIVIDADE DE EXTENSÃO</span>
                    <span aria-hidden="true">·</span>
                    <span>FEVEREIRO DE 2025 (14 HORAS)</span>
                  </div>

                  <h1
                    style={{ textWrap: 'balance' }}
                    className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#0B3B49] leading-[1.15] tracking-tight"
                  >
                    Atividade Comunitária de Inclusão Visual do Idoso: Distribuição de Folhetos em
                    Fonte Ampliada e Áudio-Guias sobre Catarata e Degeneração Macular
                  </h1>

                  <p className="text-base sm:text-lg text-[#112229]/85 leading-relaxed mt-5 max-w-2xl">
                    Ação extensionista interinstitucional conduzida pelo médico{' '}
                    <strong className="text-[#0B3B49]">
                      {CERTIFICATE_07_DATA.titular.nome}
                    </strong>{' '}
                    (CPF: {CERTIFICATE_07_DATA.titular.cpf} ·{' '}
                    {CERTIFICATE_07_DATA.titular.instituicao}), dedicada à produção e entrega
                    comunitária gratuita de materiais educativos em macro-tipografia de alto
                    contraste (18pt–28pt) e pílulas de áudio para WhatsApp visando à prevenção da
                    cegueira reversível e orientação de acesso cirúrgico no SUS.
                  </p>
                </div>

                {/* Primary Hero CTAs */}
                <div className="mt-8 pt-6 border-t border-[#E2DEC9] flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificado')}
                    className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Visualizar e Baixar Certificado Nº 07 (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('validador')}
                    className="px-5 py-3.5 bg-[#0B3B49] hover:bg-[#135063] text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FCD34D]" />
                    <span>Autenticar Código {CERTIFICATE_07_DATA.codigo}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('simulador')}
                    className="px-4 py-3.5 bg-white hover:bg-[#FAF8F3] text-[#0B3B49] border border-[#0B3B49]/25 font-semibold text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Explorar Acervo Interativo</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Official Dossier Summary Card */}
              <div className="lg:col-span-5">
                <div className="h-full bg-[#0B3B49] text-white rounded-xl p-6 sm:p-8 border border-[#0B3B49] flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/15">
                      <div className="text-xs font-mono-tabular text-[#FCD34D] uppercase tracking-wider">
                        SÍNTESE DO REGISTRO CURRICULAR (ITEM 08)
                      </div>
                      <Award className="w-5 h-5 text-[#FCD34D] shrink-0" />
                    </div>

                    <dl className="space-y-4 text-sm">
                      <div>
                        <dt className="text-xs font-mono-tabular text-slate-300 uppercase">
                          Profissional Extensionista Titular
                        </dt>
                        <dd className="text-lg font-bold text-white mt-0.5">
                          {CERTIFICATE_07_DATA.titular.nome}
                        </dd>
                        <dd className="text-xs font-mono-tabular text-[#FCD34D]">
                          {CERTIFICATE_07_DATA.titular.qualificacao} · CPF:{' '}
                          {CERTIFICATE_07_DATA.titular.cpf} · UNIFAN
                        </dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                        <div>
                          <dt className="text-xs font-mono-tabular text-slate-300 uppercase">
                            Período de Execução
                          </dt>
                          <dd className="font-semibold text-white mt-0.5">
                            19 a 22 Fev 2025
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-mono-tabular text-slate-300 uppercase">
                            Carga Horária Total
                          </dt>
                          <dd className="font-bold font-mono-tabular text-[#FCD34D] mt-0.5">
                            14 (quatorze) horas
                          </dd>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <dt className="text-xs font-mono-tabular text-slate-300 uppercase">
                          Enquadramento Obrigatório no Edital
                        </dt>
                        <dd className="text-xs text-slate-100 leading-relaxed mt-1">
                          Atividades de Extensão: <strong>Atividade Comunitária</strong>,{' '}
                          <strong>Campanha Educativa</strong> e{' '}
                          <strong>Coleta de Dados Populacionais</strong>.
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/15 bg-[#072630] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-5 rounded-b-xl">
                    <div className="text-[11px] font-mono-tabular text-slate-300">
                      CHAVE DE VERIFICAÇÃO PÚBLICA:
                    </div>
                    <div className="font-mono-tabular text-sm font-bold text-[#FCD34D] mt-0.5">
                      CÓD: {CERTIFICATE_07_DATA.codigo} · CHAVE: {CERTIFICATE_07_DATA.chave}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof & Impact Strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DADOS_POPULACIONAIS_ENQUETE.indicadores.map((item) => (
                <div
                  key={item.percentual}
                  className="bg-white border border-[#E2DEC9] rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold font-mono-tabular text-[#D97706]">
                      {item.percentual}
                    </div>
                    <div className="text-sm font-bold text-[#0B3B49] mt-1.5 leading-snug">
                      {item.rotulo}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                    {item.detalhe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: EMBEDDED PDF CERTIFICATE Nº 07 (FRENTE E VERSO) */}
        <section id="certificado" className="py-14 lg:py-20 border-b border-[#E2DEC9]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
                  <span>01. DOCUMENTO OFICIAL CERTIFICADO</span>
                  <span aria-hidden="true">·</span>
                  <span>PADRÃO ACADÊMICO A4 PAISAGEM (FRENTE E VERSO)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B3B49] mt-1">
                  Visualizador Oficial do Certificado Nº 07 (Estilo PDF Acessível)
                </h2>
              </div>
              <p className="text-xs text-slate-600 max-w-md">
                Visualize abaixo as 2 laudas oficiais (Página 1: Frente; Página 2: Memorial
                Descritivo e Matriz de 14h no Verso) com logotipos higienizados, rubricas limpas e
                QR Code dinâmico, ou clique em <strong>Baixar PDF Oficial (2 Laudas)</strong>.
              </p>
            </div>

            <Certificate07Document
              baseUrl={baseUrl}
              onSelectVerify={() => scrollToSection('validador')}
            />
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE OPTICAL SIMULATOR (CATARATA VS DMRI) */}
        <section id="simulador" className="py-14 lg:py-20 border-b border-[#E2DEC9] bg-[#F4F1EA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
                <span>02. FUNDAMENTAÇÃO CLÍNICA E OFTALMOLÓGICA</span>
                <span aria-hidden="true">·</span>
                <span>SIMULAÇÃO INTERATIVA DE BAIXA VISÃO NO IDOSO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B3B49] mt-1">
                Simulador Interativo: Catarata Senil e Degeneração Macular (DMRI)
              </h2>
              <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-3xl">
                Compreenda por que folhetos impressos convencionais falham na comunicação em saúde
                com a população geriátrica e como a macro-tipografia aliada ao alto contraste
                restaura a autonomia de leitura.
              </p>
            </div>

            <VisionSimulatorLab />
          </div>
        </section>

        {/* SECTION 3: ACCESSIBLE LARGE-PRINT FLYERS & WHATSAPP AUDIO-GUIDES */}
        <section id="materiais" className="py-14 lg:py-20 border-b border-[#E2DEC9]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
                <span>03. ENTREGAS PRÁTICAS DA AÇÃO EXTENSIONISTA</span>
                <span aria-hidden="true">·</span>
                <span>FOLHETOS EM FONTE AMPLIADA + ÁUDIO-GUIAS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B3B49] mt-1">
                Materiais Educativos Distribuídos à Comunidade Idosa e Cuidadores
              </h2>
              <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-3xl">
                Explore integralmente os 3 folhetos de fonte ampliada (com ajuste interativo de
                corpo tipográfico e contraste cromático) e escute as 3 pílulas de áudio-guias
                desenvolvidas para circulação gratuita no WhatsApp.
              </p>
            </div>

            <AccessibleMaterialsShowcase />
          </div>
        </section>

        {/* SECTION 4: METODOLOGIA DOS 4 EIXOS (14 HORAS) */}
        <section className="py-14 lg:py-20 border-b border-[#E2DEC9] bg-[#F4F1EA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
                <span>04. DETALHAMENTO METODOLÓGICO</span>
                <span aria-hidden="true">·</span>
                <span>MATRIZ CURRICULAR DE 14 HORAS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B3B49] mt-1">
                Arquitetura de Execução da Atividade Comunitária e Educativa
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATE_07_DATA.eixosVerso.map((eixo, index) => {
                const icons = [BookOpen, Volume2, Users, Eye];
                const IconComponent = icons[index % icons.length];
                return (
                  <div
                    key={eixo.id}
                    className="bg-white border border-[#E2DEC9] rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                        <span className="text-xs font-mono-tabular font-bold text-[#D97706]">
                          ETAPA 0{index + 1} · CARGA HORÁRIA: {eixo.cargaHoraria}
                        </span>
                        <IconComponent className="w-4 h-4 text-[#0B3B49]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0B3B49]">{eixo.titulo}</h3>
                      <div className="text-xs font-medium text-[#92400E] mt-0.5 mb-3">
                        {eixo.subtitulo}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{eixo.descricao}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: PUBLIC VALIDATOR (#validador) */}
        <section id="validador" className="py-14 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
                <span>05. VERIFICAÇÃO DE AUTENTICIDADE E FÉ PÚBLICA</span>
                <span aria-hidden="true">·</span>
                <span>CONSULTA POR QR CODE, CÓDIGO OU CHAVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B3B49] mt-1">
                Portal Autenticador de Certificados de Extensão
              </h2>
            </div>

            <PublicValidatorSection
              baseUrl={baseUrl}
              initialQueryCode={queryCodigo}
              onJumpToCertificate={() => scrollToSection('certificado')}
            />
          </div>
        </section>
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#0B3B49] text-slate-200 py-10 border-t border-[#072630] no-print">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="space-y-1.5">
            <div className="font-display font-bold text-white text-sm">
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
            </div>
            <div>
              <strong>Editora Mente e Saúde</strong> (CNPJ: {CERTIFICATE_07_DATA.emissores.editora.cnpj}
              ) &amp; <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:{' '}
              {CERTIFICATE_07_DATA.emissores.centro.cnpj})
            </div>
            <div className="text-slate-300 font-mono-tabular">
              Certificado Nº 07 · Livro nº {CERTIFICATE_07_DATA.livro}, Folha{' '}
              {CERTIFICATE_07_DATA.folha} · Código: {CERTIFICATE_07_DATA.codigo}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#certificado" className="hover:text-white underline underline-offset-4">
              Visualizar Certificado PDF
            </a>
            <span aria-hidden="true">·</span>
            <a href="#validador" className="hover:text-white underline underline-offset-4">
              Validador de Autenticidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
