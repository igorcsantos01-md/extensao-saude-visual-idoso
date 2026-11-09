import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { CERTIFICATE_07_DATA } from '../data/certificate07Data';
import { SeloOficialFePublica } from './InstitutionalAssets';

interface PublicValidatorSectionProps {
  baseUrl: string;
  initialQueryCode?: string;
  onJumpToCertificate: () => void;
}

export const PublicValidatorSection: React.FC<PublicValidatorSectionProps> = ({
  baseUrl,
  initialQueryCode,
  onJumpToCertificate,
}) => {
  const [inputCode, setInputCode] = useState<string>(
    initialQueryCode || CERTIFICATE_07_DATA.codigo
  );
  const [validationState, setValidationState] = useState<'valid' | 'invalid'>('valid');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullValidatorUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_07_DATA.codigo}#validador`;

  const validateValue = (rawVal: string) => {
    const normalized = rawVal.trim().toUpperCase();
    if (
      normalized === CERTIFICATE_07_DATA.codigo ||
      normalized === CERTIFICATE_07_DATA.chave ||
      normalized === CERTIFICATE_07_DATA.hashSha256.toUpperCase() ||
      normalized === '07' ||
      normalized === 'EMS-ACI-2025-0714'
    ) {
      setValidationState('valid');
    } else {
      setValidationState('invalid');
    }
  };

  useEffect(() => {
    if (initialQueryCode) {
      setInputCode(initialQueryCode);
      validateValue(initialQueryCode);
    }
  }, [initialQueryCode]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateValue(inputCode);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullValidatorUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E2DEC9] rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[#0B3B49] text-white p-6 sm:p-8 border-b border-[#0B3B49]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-[#FCD34D] uppercase tracking-wider">
              SISTEMA INTERINSTITUCIONAL DE AUTENTICAÇÃO PÚBLICA E FÉ ACADÊMICA
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white mt-1">
              Validador Oficial de Certificados e Registro de Extensão
            </h2>
          </div>
          <div className="text-xs font-mono-tabular bg-[#072630] px-3.5 py-2 rounded-lg border border-white/15 text-emerald-300">
            BASE DE REGISTRO ATIVA · LIVRO Nº {CERTIFICATE_07_DATA.livro}
          </div>
        </div>

        {/* Search / Verification Form */}
        <form onSubmit={handleFormSubmit} className="mt-6">
          <label
            htmlFor="validator-input"
            className="block text-xs font-medium text-slate-200 mb-2"
          >
            Informe o Código de Verificação, Chave de Controle ou Hash SHA-256 constante no
            Certificado:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="validator-input"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Ex.: EMS-EXT-2025-0714 ou 0714-8923-4510-7E4B"
                className="w-full pl-10 pr-4 py-3 bg-white text-[#112229] font-mono-tabular text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verificar Autenticidade</span>
            </button>
          </div>

          {/* Quick Fill Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span>Consulta rápida do registro deste repositório:</span>
            <button
              type="button"
              onClick={() => {
                setInputCode(CERTIFICATE_07_DATA.codigo);
                setValidationState('valid');
              }}
              className="underline hover:text-white font-mono-tabular cursor-pointer"
            >
              Cód. {CERTIFICATE_07_DATA.codigo}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setInputCode(CERTIFICATE_07_DATA.chave);
                setValidationState('valid');
              }}
              className="underline hover:text-white font-mono-tabular cursor-pointer"
            >
              Chave {CERTIFICATE_07_DATA.chave}
            </button>
          </div>
        </form>
      </div>

      {/* Validation Result Area */}
      <div className="p-6 sm:p-8 bg-[#FAF8F3]">
        {validationState === 'valid' ? (
          <div className="bg-white border-2 border-emerald-700/30 rounded-xl p-6 sm:p-8 shadow-xs">
            {/* Top Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono-tabular font-bold text-emerald-800 uppercase tracking-wider">
                    AUTENTICIDADE CONFIRMADA · DOCUMENTO VÁLIDO EM TODO O TERRITÓRIO NACIONAL
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0B3B49] mt-0.5">
                    Certificado de Extensão Nº {CERTIFICATE_07_DATA.numeroCertificado} — Registro
                    Ativo e Regular
                  </h3>
                </div>
              </div>

              <SeloOficialFePublica
                codigo={CERTIFICATE_07_DATA.codigo}
                className="w-20 h-20 shrink-0"
              />
            </div>

            {/* Detailed Metadata Grid */}
            <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-b border-slate-200 text-sm">
              <div>
                <dt className="text-xs font-mono-tabular uppercase text-slate-500">
                  Profissional Titular Certificado
                </dt>
                <dd className="font-bold text-[#112229] text-base mt-1">
                  {CERTIFICATE_07_DATA.titular.nome}
                </dd>
                <dd className="text-xs text-slate-600 font-mono-tabular mt-0.5">
                  CPF: {CERTIFICATE_07_DATA.titular.cpf} · {CERTIFICATE_07_DATA.titular.qualificacao}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono-tabular uppercase text-slate-500">
                  Instituição de Origem do Titular
                </dt>
                <dd className="font-semibold text-[#112229] mt-1">
                  {CERTIFICATE_07_DATA.titular.instituicao}
                </dd>
                <dd className="text-xs text-slate-600 mt-0.5">
                  Comprovação Curricular e Acadêmica (Item 08)
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono-tabular uppercase text-slate-500">
                  Livro, Folha e Data de Expedição
                </dt>
                <dd className="font-bold font-mono-tabular text-[#0B3B49] mt-1">
                  Livro nº {CERTIFICATE_07_DATA.livro} · Folha {CERTIFICATE_07_DATA.folha}
                </dd>
                <dd className="text-xs text-slate-600 mt-0.5">
                  Expedido em {CERTIFICATE_07_DATA.atividade.localEmissao},{' '}
                  {CERTIFICATE_07_DATA.atividade.dataEmissao}
                </dd>
              </div>

              <div className="md:col-span-2">
                <dt className="text-xs font-mono-tabular uppercase text-slate-500">
                  Título Oficial da Ação Extensionista Certificada
                </dt>
                <dd className="font-semibold text-[#112229] mt-1 leading-snug">
                  {CERTIFICATE_07_DATA.atividade.titulo}
                </dd>
                <dd className="text-xs text-[#92400E] font-medium mt-1">
                  Modalidades: {CERTIFICATE_07_DATA.atividade.modalidadesFrente}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono-tabular uppercase text-slate-500">
                  Período de Execução & Carga Horária
                </dt>
                <dd className="font-bold font-mono-tabular text-[#D97706] text-base mt-1">
                  {CERTIFICATE_07_DATA.atividade.cargaHorariaExtenso}
                </dd>
                <dd className="text-xs text-slate-600 mt-0.5">
                  Realizado de {CERTIFICATE_07_DATA.atividade.periodo}
                </dd>
              </div>
            </dl>

            {/* Institutional Issuers & Cryptographic Hash */}
            <div className="py-5 border-b border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#E2DEC9]">
                <div className="font-mono-tabular uppercase text-slate-500 mb-1">
                  Instituições Certificadoras em Parceria:
                </div>
                <div className="font-semibold text-[#112229]">
                  1. {CERTIFICATE_07_DATA.emissores.editora.nome} — CNPJ:{' '}
                  <span className="font-mono-tabular">
                    {CERTIFICATE_07_DATA.emissores.editora.cnpj}
                  </span>
                </div>
                <div className="font-semibold text-[#112229] mt-1">
                  2. {CERTIFICATE_07_DATA.emissores.centro.nome} — CNPJ:{' '}
                  <span className="font-mono-tabular">
                    {CERTIFICATE_07_DATA.emissores.centro.cnpj}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#E2DEC9] font-mono-tabular">
                <div className="uppercase text-slate-500 mb-1">
                  Chaves Criptográficas de Controle:
                </div>
                <div className="text-[#112229]">
                  <strong>CÓDIGO:</strong> {CERTIFICATE_07_DATA.codigo} &nbsp;|&nbsp;{' '}
                  <strong>CHAVE:</strong> {CERTIFICATE_07_DATA.chave}
                </div>
                <div className="text-slate-600 mt-1 break-all text-[11px]">
                  <strong>SHA-256:</strong> {CERTIFICATE_07_DATA.hashSha256}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-600 break-all">
                <span>URL Direta do Validador:</span>
                <span className="text-[#0B3B49] font-semibold">{fullValidatorUrl}</span>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans font-medium cursor-pointer shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={onJumpToCertificate}
                className="px-4 py-2.5 bg-[#0B3B49] hover:bg-[#135063] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileCheck2 className="w-4 h-4 text-[#FCD34D]" />
                <span>Visualizar / Baixar Certificado Original (2 Laudas PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 flex items-start gap-4">
            <XCircle className="w-7 h-7 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Código ou Chave não localizado nesta base específica
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Verifique se digitou corretamente o código{' '}
                <strong className="font-mono-tabular">{CERTIFICATE_07_DATA.codigo}</strong> ou a
                chave de controle{' '}
                <strong className="font-mono-tabular">{CERTIFICATE_07_DATA.chave}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setInputCode(CERTIFICATE_07_DATA.codigo);
                  setValidationState('valid');
                }}
                className="mt-3 px-4 py-2 bg-[#0B3B49] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Restaurar Certificado Nº 07 ({CERTIFICATE_07_DATA.codigo})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
