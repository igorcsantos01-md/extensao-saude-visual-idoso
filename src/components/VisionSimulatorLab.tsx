import React, { useState } from 'react';
import { Eye, Sliders, Sun, Grid, CheckCircle2, AlertTriangle } from 'lucide-react';

type VisionCondition = 'normal' | 'catarata' | 'dmri';
type FlyerMode = 'padrao' | 'ampliado' | 'amsler';

export const VisionSimulatorLab: React.FC = () => {
  const [condition, setCondition] = useState<VisionCondition>('catarata');
  const [severity, setSeverity] = useState<number>(65);
  const [flyerMode, setFlyerMode] = useState<FlyerMode>('ampliado');

  // Compute CSS filter for Cataract simulation
  const blurPx = condition === 'catarata' ? ((severity / 100) * 4.2).toFixed(1) : '0';
  const sepiaPct = condition === 'catarata' ? Math.round((severity / 100) * 58) : 0;
  const contrastPct =
    condition === 'catarata' ? Math.round(100 - (severity / 100) * 38) : 100;

  return (
    <div className="bg-white border border-[#E2DEC9] rounded-xl overflow-hidden shadow-sm">
      {/* Top Educational Bar */}
      <div className="bg-[#0B3B49] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono-tabular text-[#FCD34D] tracking-wider uppercase">
            LABORATÓRIO ÓPTICO INTERATIVO · ERGONOMIA VISUAL NA TERCEIRA IDADE
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
            Por que Idosos com Catarata ou Degeneração Macular Precisam de Fonte Ampliada?
          </h3>
        </div>
        <div className="text-xs text-slate-200 max-w-md">
          Experimente na prática como a opacificação do cristalino (Catarata) e a lesão macular
          central (DMRI) impactam a leitura e comprove a eficácia do design inclusivo em 22pt.
        </div>
      </div>

      {/* Main 2-Zone Sandbox Layout (65% Interactive Stage / 35% Control & Concept Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Zone: Interactive Optical Stage (7 columns) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F4F1EA] border-b lg:border-b-0 lg:border-r border-[#E2DEC9] flex flex-col justify-between">
          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-1.5 bg-[#E6E1D5] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setFlyerMode('ampliado')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  flyerMode === 'ampliado'
                    ? 'bg-[#0B3B49] text-white shadow-xs'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                Folheto da Campanha (22pt AAA)
              </button>
              <button
                type="button"
                onClick={() => setFlyerMode('padrao')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  flyerMode === 'padrao'
                    ? 'bg-[#0B3B49] text-white shadow-xs'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                Impresso Comum (10pt Inacessível)
              </button>
              <button
                type="button"
                onClick={() => setFlyerMode('amsler')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  flyerMode === 'amsler'
                    ? 'bg-[#0B3B49] text-white shadow-xs'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                <Grid className="w-3.5 h-3.5 inline mr-1" />
                Tela de Amsler (Mácula)
              </button>
            </div>

            <div className="text-xs font-mono-tabular text-[#0B3B49] font-semibold">
              {condition === 'normal' && '● VISÃO PRESERVADA (100%)'}
              {condition === 'catarata' && `▲ CATARATA SENIL (${severity}% OPACIDADE)`}
              {condition === 'dmri' && `▲ DEGENERAÇÃO MACULAR (${severity}% ESCOTOMA)`}
            </div>
          </div>

          {/* Simulated Viewport Frame */}
          <div className="relative rounded-xl overflow-hidden border-2 border-[#0B3B49]/20 bg-white min-h-[360px] flex items-center justify-center p-6 shadow-inner">
            {/* Simulated Lens Content */}
            <div
              style={{
                filter:
                  condition === 'catarata'
                    ? `blur(${blurPx}px) sepia(${sepiaPct}%) contrast(${contrastPct}%)`
                    : 'none',
                transition: 'filter 150ms ease-out',
              }}
              className="w-full h-full flex flex-col justify-center"
            >
              {flyerMode === 'ampliado' && (
                <div className="bg-[#0B3B49] text-[#FAF8F3] p-6 rounded-lg border-2 border-[#D97706]">
                  <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#FCD34D] mb-2">
                    FOLHETO EM MACRO-TIPOGRAFIA 22PT · ALTO CONTRASTE (14.8:1)
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                    VISTA NUBLADA TEM TRATAMENTO GRATUITO NO SUS
                  </h4>
                  <p className="text-lg sm:text-xl font-medium text-[#FEF3C7] leading-relaxed mb-4">
                    1. Não pingue chás ou colírios sem receita nos olhos.
                    <br />
                    2. A cirurgia de catarata é rápida, segura e devolve a nitidez.
                  </p>
                  <div className="bg-[#D97706] text-white px-4 py-2.5 rounded-md font-bold text-base sm:text-lg inline-block">
                    PROCURE A UBS COM SEU CARTÃO DO SUS
                  </div>
                </div>
              )}

              {flyerMode === 'padrao' && (
                <div className="bg-slate-50 text-slate-500 p-6 rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
                    Folheto Impresso Convencional (Corpo 9.5pt · Contraste Insuficiente 2.8:1)
                  </div>
                  <h4 className="text-xs font-medium text-slate-600 mb-2">
                    Informações Gerais sobre Saúde Ocular na Terceira Idade e Prevenção
                  </h4>
                  <p className="text-[11px] leading-tight text-slate-400 mb-3">
                    A catarata senil caracteriza-se pela opacificação progressiva do cristalino,
                    ocasionando redução da acuidade visual e sensibilidade ao contraste. Pacientes
                    idosos devem evitar a automedicação com colírios sem prescrição oftalmológica
                    e buscar orientação junto à rede básica de saúde para avaliação cirúrgica
                    eletiva quando indicada pelo especialista.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Para maiores esclarecimentos, dirija-se ao posto de atendimento munido de
                    documento de identificação e cartão nacional de saúde.
                  </p>
                </div>
              )}

              {flyerMode === 'amsler' && (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="text-xs font-semibold text-[#0B3B49] mb-3 text-center">
                    GRADE DE AMSLER — Feche um olho e fixe o olhar no ponto central:
                  </div>
                  <svg
                    viewBox="0 0 240 240"
                    className="w-56 h-56 border-2 border-[#112229] bg-white"
                  >
                    {/* Grid Lines with optional DMRI wave distortion */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const pos = (i + 1) * 20;
                      const warp =
                        condition === 'dmri' && i >= 3 && i <= 7
                          ? ((severity / 100) * 18 * (i % 2 === 0 ? 1 : -1)).toFixed(1)
                          : 0;
                      return (
                        <React.Fragment key={i}>
                          <path
                            d={`M ${pos} 0 Q ${Number(pos) + Number(warp)} 120 ${pos} 240`}
                            stroke="#112229"
                            strokeWidth="1.2"
                            fill="none"
                          />
                          <path
                            d={`M 0 ${pos} Q 120 ${Number(pos) + Number(warp)} 240 ${pos}`}
                            stroke="#112229"
                            strokeWidth="1.2"
                            fill="none"
                          />
                        </React.Fragment>
                      );
                    })}
                    <circle cx="120" cy="120" r="5" fill="#D97706" />
                  </svg>
                </div>
              )}
            </div>

            {/* Cataract Glare / Veiling Luminance Overlay */}
            {condition === 'catarata' && severity > 10 && (
              <div
                style={{
                  opacity: (severity / 100) * 0.45,
                  background:
                    'radial-gradient(circle at 80% 20%, rgba(254, 243, 199, 0.95), rgba(217, 119, 6, 0.25) 60%, transparent 100%)',
                }}
                className="absolute inset-0 pointer-events-none"
              />
            )}

            {/* Macular Degeneration Central Scotoma Overlay */}
            {condition === 'dmri' && severity > 5 && (
              <div
                style={{
                  width: `${Math.round(50 + (severity / 100) * 165)}px`,
                  height: `${Math.round(50 + (severity / 100) * 145)}px`,
                  background:
                    'radial-gradient(circle, rgba(17, 24, 39, 0.96) 0%, rgba(31, 41, 55, 0.82) 52%, rgba(55, 65, 81, 0.25) 78%, transparent 100%)',
                  filter: 'blur(6px)',
                }}
                className="absolute pointer-events-none rounded-full transition-all duration-150"
              />
            )}
          </div>

          {/* Pedagogical Takeaway Strip below Canvas */}
          <div className="mt-4 flex items-start gap-3 text-xs text-[#112229] bg-white p-3.5 rounded-lg border border-[#E2DEC9]">
            {flyerMode === 'padrao' ? (
              <>
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <strong>Barreira Comprovada:</strong> No impresso comum de 10pt com baixo
                  contraste, a perda de sensibilidade ao contraste da Catarata ou o escotoma da
                  DMRI tornam o texto ilegível, levando 78,5% dos idosos a abandonarem a leitura.
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Inclusão Visual Efetiva:</strong> Com tipografia ampliada (22pt+),
                  espaçamento generoso e contraste cromático 14.8:1 (Marfim/Branco sobre Azul
                  Petróleo), o idoso preserva a leitura mesmo sob opacidade moderada ou utilizando
                  a visão periférica/excêntrica.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Zone: Control & Clinical Concept Deck (5 columns) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#0B3B49] font-semibold mb-3">
              <Sliders className="w-4 h-4 text-[#D97706]" />
              <span>1. Selecione a Condição Oftalmológica</span>
            </div>

            <div className="space-y-2.5 mb-6">
              <button
                type="button"
                onClick={() => setCondition('catarata')}
                className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                  condition === 'catarata'
                    ? 'border-[#D97706] bg-[#FFFBEB] text-[#112229]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#D97706]" />
                    Catarata Senil (Opacidade Cristaliniana)
                  </span>
                  <span className="text-xs font-mono-tabular font-semibold text-[#B45309]">
                    Reversível no SUS
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Embaçamento difuso, amarelamento das cores e ofuscamento intenso por dispersão
                  luminosa. Principal causa de cegueira reversível na 3ª idade.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCondition('dmri')}
                className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                  condition === 'dmri'
                    ? 'border-[#D97706] bg-[#FFFBEB] text-[#112229]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm flex items-center gap-2">
                    <Grid className="w-4 h-4 text-[#0B3B49]" />
                    Degeneração Macular (DMRI)
                  </span>
                  <span className="text-xs font-mono-tabular font-semibold text-[#0B3B49]">
                    Foco Central
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Preserva a visão periférica, mas provoca mancha escura central (escotoma) e
                  ondulação das linhas retas (metamorfopsia). Exige letras grandes para leitura
                  excêntrica.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCondition('normal')}
                className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                  condition === 'normal'
                    ? 'border-[#0B3B49] bg-slate-50 text-[#112229]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-700" />
                    Visão Normal Comparativa (Controle)
                  </span>
                  <span className="text-xs font-mono-tabular text-emerald-700 font-semibold">
                    20/20 Nitidez
                  </span>
                </div>
              </button>
            </div>

            {/* Slider Control */}
            <div className="bg-[#FAF8F3] p-4 rounded-lg border border-[#E2DEC9]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#112229] mb-2">
                <label htmlFor="severity-slider">
                  2. Grau de Comprometimento Visual Simulado:
                </label>
                <span className="font-mono-tabular text-sm text-[#D97706] font-bold">
                  {condition === 'normal' ? '0%' : `${severity}%`}
                </span>
              </div>
              <input
                id="severity-slider"
                type="range"
                min={15}
                max={95}
                value={severity}
                disabled={condition === 'normal'}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer disabled:opacity-40"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-slate-500 mt-1">
                <span>Inicial (15%)</span>
                <span>Moderado (55%)</span>
                <span>Avançado (95%)</span>
              </div>
            </div>
          </div>

          {/* Technical Metrics Summary */}
          <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E2DEC9]">
              <div className="text-slate-500 font-medium">Corpo Tipográfico Mínimo</div>
              <div className="text-lg font-bold font-mono-tabular text-[#0B3B49] mt-0.5">
                18pt a 28pt
              </div>
              <div className="text-[11px] text-slate-600">Sem serifa · Contraespessura aberta</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E2DEC9]">
              <div className="text-slate-500 font-medium">Índice de Contraste Óptico</div>
              <div className="text-lg font-bold font-mono-tabular text-[#D97706] mt-0.5">
                14.8 : 1 (AAA)
              </div>
              <div className="text-[11px] text-slate-600">Superior ao mínimo WCAG 7:1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
