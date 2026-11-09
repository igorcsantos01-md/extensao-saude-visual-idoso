import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Type,
  Contrast,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import {
  FOLHETOS_AMPLIADOS,
  AUDIO_GUIAS_WHATSAPP,
  FolhetoAmpliado,
  AudioGuia,
} from '../data/certificate07Data';

type FontScaleMode = '18pt' | '22pt' | '28pt';
type ContrastTheme = 'petroleo' | 'amarelo-preto' | 'marfim';

export const AccessibleMaterialsShowcase: React.FC = () => {
  // Folhetos State
  const [selectedFolhetoId, setSelectedFolhetoId] = useState<string>(FOLHETOS_AMPLIADOS[0].id);
  const [fontScale, setFontScale] = useState<FontScaleMode>('22pt');
  const [contrastTheme, setContrastTheme] = useState<ContrastTheme>('petroleo');

  // Audio-Guias State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const activeFolheto: FolhetoAmpliado =
    FOLHETOS_AMPLIADOS.find((f) => f.id === selectedFolhetoId) || FOLHETOS_AMPLIADOS[0];

  const stopAudioPlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlayingAudioId(null);
    setAudioProgress(0);
  };

  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  const handleToggleAudio = (audio: AudioGuia) => {
    if (playingAudioId === audio.id) {
      stopAudioPlayback();
      return;
    }

    stopAudioPlayback();
    setPlayingAudioId(audio.id);
    setAudioProgress(0);

    // Play pleasant introductory acoustic chime via Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Ignore audio context restrictions if blocked
    }

    // Narrate in Portuguese via Web Speech API if available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(audio.roteiroNarrado);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.92; // Paused cadence ideal for older adults
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setPlayingAudioId(null);
          setAudioProgress(100);
        };
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback to visual progress timer
      }
    }

    // Visual progress ticker
    timerRef.current = window.setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          stopAudioPlayback();
          return 100;
        }
        return prev + 2;
      });
    }, 450);
  };

  const getContrastClasses = () => {
    if (contrastTheme === 'amarelo-preto') {
      return {
        container: 'bg-black text-[#FDE047] border-2 border-[#FDE047]',
        heading: 'text-white',
        subtext: 'text-[#FEF08A]',
        card: 'bg-neutral-950 border border-[#FDE047]/60 text-[#FDE047]',
        alertBox: 'bg-[#FDE047] text-black font-bold',
      };
    }
    if (contrastTheme === 'petroleo') {
      return {
        container: 'bg-[#0B3B49] text-[#FAF8F3] border-2 border-[#D97706]',
        heading: 'text-white',
        subtext: 'text-[#FDE68A]',
        card: 'bg-[#072833] border border-white/20 text-[#FAF8F3]',
        alertBox: 'bg-[#D97706] text-white font-bold',
      };
    }
    return {
      container: 'bg-[#FAF8F3] text-[#112229] border-2 border-[#0B3B49]',
      heading: 'text-[#0B3B49]',
      subtext: 'text-[#92400E]',
      card: 'bg-white border border-[#D5CEBF] text-[#112229]',
      alertBox: 'bg-[#0B3B49] text-white font-bold',
    };
  };

  const getFontSizeClasses = () => {
    if (fontScale === '28pt') {
      return {
        title: 'text-2xl sm:text-4xl leading-tight',
        sectionTitle: 'text-xl sm:text-2xl',
        body: 'text-lg sm:text-2xl leading-relaxed',
      };
    }
    if (fontScale === '22pt') {
      return {
        title: 'text-xl sm:text-3xl leading-snug',
        sectionTitle: 'text-lg sm:text-xl',
        body: 'text-base sm:text-xl leading-relaxed',
      };
    }
    return {
      title: 'text-lg sm:text-2xl leading-snug',
      sectionTitle: 'text-base sm:text-lg',
      body: 'text-sm sm:text-lg leading-relaxed',
    };
  };

  const themeStyles = getContrastClasses();
  const fontStyles = getFontSizeClasses();

  return (
    <div className="space-y-12">
      {/* PART 1: INTERACTIVE LARGE-PRINT FLYERS VIEWER */}
      <div className="bg-white border border-[#E2DEC9] rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b border-[#E2DEC9] flex flex-wrap items-center justify-between gap-4 bg-[#FAF8F3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#92400E] uppercase tracking-wider">
              <span>EIXO I · PRODUÇÃO EDITORIAL EM MACRO-TIPOGRAFIA</span>
              <span aria-hidden="true">·</span>
              <span>ACESSIBILIDADE PARA BAIXA VISÃO</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-[#0B3B49] mt-1">
              Acervo de Folhetos em Fonte Ampliada (18pt a 28pt) e Alto Contraste
            </h3>
          </div>

          {/* Interactive Accessibility Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Font Scale Selector */}
            <div className="flex items-center gap-1 bg-[#EAE5D7] p-1 rounded-lg">
              <span className="px-2 text-xs font-medium text-[#112229] flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-[#D97706]" />
                Corpo:
              </span>
              {(['18pt', '22pt', '28pt'] as FontScaleMode[]).map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setFontScale(scale)}
                  className={`px-2.5 py-1 text-xs font-mono-tabular font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    fontScale === scale
                      ? 'bg-[#0B3B49] text-white'
                      : 'text-[#112229] hover:bg-white/60'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>

            {/* Contrast Mode Selector */}
            <div className="flex items-center gap-1 bg-[#EAE5D7] p-1 rounded-lg">
              <span className="px-2 text-xs font-medium text-[#112229] flex items-center gap-1">
                <Contrast className="w-3.5 h-3.5 text-[#0B3B49]" />
                Contraste:
              </span>
              <button
                type="button"
                onClick={() => setContrastTheme('petroleo')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  contrastTheme === 'petroleo'
                    ? 'bg-[#0B3B49] text-white'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                Azul Petróleo
              </button>
              <button
                type="button"
                onClick={() => setContrastTheme('amarelo-preto')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  contrastTheme === 'amarelo-preto'
                    ? 'bg-black text-[#FDE047]'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                Preto / Amarelo
              </button>
              <button
                type="button"
                onClick={() => setContrastTheme('marfim')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  contrastTheme === 'marfim'
                    ? 'bg-white text-[#0B3B49] shadow-xs'
                    : 'text-[#112229] hover:bg-white/60'
                }`}
              >
                Marfim Claro
              </button>
            </div>
          </div>
        </div>

        {/* Flyer Selector Tabs */}
        <div className="px-6 pt-5 bg-white flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {FOLHETOS_AMPLIADOS.map((folheto) => (
            <button
              key={folheto.id}
              type="button"
              onClick={() => setSelectedFolhetoId(folheto.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedFolhetoId === folheto.id
                  ? 'bg-[#D97706] text-white shadow-xs'
                  : 'bg-[#FAF8F3] text-[#112229] border border-[#E2DEC9] hover:border-[#D97706]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>
                {folheto.numero}: {folheto.titulo.split(':')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Accessible Flyer Canvas */}
        <div className="p-6 sm:p-8 bg-[#F4F1EA]">
          <div className={`rounded-xl p-6 sm:p-10 transition-colors ${themeStyles.container}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-current/20 text-xs font-mono-tabular">
              <span>{activeFolheto.numero.toUpperCase()} · DISTRIBUIÇÃO COMUNITÁRIA GRATUITA</span>
              <span>{activeFolheto.tipografiaOriginal}</span>
            </div>

            <h4 className={`font-bold ${fontStyles.title} ${themeStyles.heading} mb-3`}>
              {activeFolheto.titulo}
            </h4>
            <p className={`font-medium ${themeStyles.subtext} mb-8 text-base sm:text-lg`}>
              {activeFolheto.subtitulo} · Público-Alvo: {activeFolheto.publicoAlvo}
            </p>

            {/* Key Educational Blocks */}
            <div className="grid grid-cols-1 gap-5 mb-8">
              {activeFolheto.pontosChave.map((ponto) => (
                <div key={ponto.titulo} className={`p-5 rounded-lg ${themeStyles.card}`}>
                  <h5 className={`font-bold ${fontStyles.sectionTitle} mb-2`}>{ponto.titulo}</h5>
                  <p className={`${fontStyles.body}`}>{ponto.texto}</p>
                </div>
              ))}
            </div>

            {/* Warning Signs & SUS Guidance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-5 rounded-lg ${themeStyles.card}`}>
                <div className="flex items-center gap-2 font-bold text-base sm:text-lg mb-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>SINAIS DE ALERTA PARA PROCURAR O MÉDICO:</span>
                </div>
                <ul className="space-y-2.5">
                  {activeFolheto.sinaisAlerta.map((sinal) => (
                    <li key={sinal} className={`flex items-start gap-2.5 ${fontStyles.body}`}>
                      <span className="font-bold">•</span>
                      <span>{sinal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-6 rounded-lg flex flex-col justify-between ${themeStyles.alertBox}`}>
                <div>
                  <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-mono-tabular mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>ORIENTAÇÃO OFICIAL DE ACESSO AO SUS</span>
                  </div>
                  <p className={`${fontStyles.body} mt-2`}>{activeFolheto.orientacaoSUS}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-current/20 text-xs font-mono-tabular">
                  Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo ·
                  Extensão Comunitária 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: WHATSAPP AUDIO-GUIDES INTERACTIVE PLAYER */}
      <div className="bg-white border border-[#E2DEC9] rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b border-[#E2DEC9] bg-[#0B3B49] text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#FCD34D] uppercase tracking-wider">
              <Headphones className="w-4 h-4" />
              <span>EIXO II · TECNOLOGIA ASSISTIVA SONORA PARA WHATSAPP</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-white mt-1">
              Pílulas de Áudio-Guias Narrados sobre Catarata e Degeneração Macular
            </h3>
          </div>
          <p className="text-xs text-slate-200 max-w-md">
            Clique em <strong>“Ouvir Áudio-Guia”</strong> para escutar a narração em português com
            cadência pausada (115 palavras por minuto), desenvolvida para idosos com baixa visão
            severa compartilharem no WhatsApp da família.
          </p>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#FAF8F3]">
          {AUDIO_GUIAS_WHATSAPP.map((audio) => {
            const isPlaying = playingAudioId === audio.id;
            return (
              <div
                key={audio.id}
                className={`rounded-xl border p-6 flex flex-col justify-between transition-all bg-white ${
                  isPlaying
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/20 shadow-md'
                    : 'border-[#E2DEC9]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#92400E] mb-2">
                    <span>{audio.episodio}</span>
                    <span>DURAÇÃO: {audio.duracao}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#0B3B49] leading-snug mb-2">
                    {audio.titulo}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{audio.resumo}</p>

                  {/* Player Button + Progress Bar */}
                  <div className="bg-[#F4F1EA] p-3.5 rounded-lg border border-[#E2DEC9] mb-4">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleAudio(audio)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isPlaying
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#0B3B49] hover:bg-[#135063] text-white'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Pausar Narração</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Ouvir Áudio-Guia</span>
                          </>
                        )}
                      </button>

                      {isPlaying && (
                        <button
                          type="button"
                          onClick={stopAudioPlayback}
                          className="p-2 text-slate-600 hover:text-slate-900"
                          title="Reiniciar"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}

                      <div className="flex items-center gap-1 text-xs font-mono-tabular text-[#0B3B49] ml-auto">
                        <Volume2 className="w-4 h-4 text-[#D97706]" />
                        <span>{isPlaying ? `${audioProgress}%` : 'PT-BR'}</span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-[#D5CEBF] rounded-full overflow-hidden mt-3">
                      <div
                        style={{
                          width: `${isPlaying ? audioProgress : 0}%`,
                          transition: 'width 300ms linear',
                        }}
                        className="h-full bg-[#D97706]"
                      />
                    </div>
                  </div>

                  {/* Full Accessible Transcript */}
                  <div className="bg-[#FAF8F3] p-3.5 rounded-lg border border-[#E2DEC9]">
                    <div className="text-[11px] font-mono-tabular uppercase text-slate-500 mb-1">
                      Transcrição Integral do Áudio-Guia:
                    </div>
                    <p className="text-xs text-[#112229] leading-relaxed italic">
                      “{audio.roteiroNarrado}”
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  {audio.topicos.join(' · ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
