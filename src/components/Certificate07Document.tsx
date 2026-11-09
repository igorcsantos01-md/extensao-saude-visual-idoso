import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
  Download,
  Printer,
  CheckCircle2,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { CERTIFICATE_07_DATA } from '../data/certificate07Data';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  AssinaturaBarbaraLima,
  AssinaturaJamesAraujo,
  SeloOficialFePublica,
} from './InstitutionalAssets';

interface Certificate07DocumentProps {
  baseUrl: string;
  onSelectVerify?: () => void;
}

export const Certificate07Document: React.FC<Certificate07DocumentProps> = ({
  baseUrl,
  onSelectVerify,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [activePageFilter, setActivePageFilter] = useState<'both' | 'front' | 'back'>('both');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(1122);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const frontPageCaptureRef = useRef<HTMLDivElement>(null);
  const backPageCaptureRef = useRef<HTMLDivElement>(null);

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const verificationFullUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_07_DATA.codigo}#validador`;

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(verificationFullUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#0A192F',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (mounted) setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error('QR Code generation error:', err);
      });
    return () => {
      mounted = false;
    };
  }, [verificationFullUrl]);

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        const w = wrapperRef.current.clientWidth - 32;
        setContainerWidth(Math.max(320, Math.min(1122, w)));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const computedScale = Math.min(1, containerWidth / 1122) * zoomScale;

  const handleVerifyLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSelectVerify) {
      e.preventDefault();
      window.history.replaceState(
        null,
        '',
        `/?codigo=${CERTIFICATE_07_DATA.codigo}#validador`
      );
      onSelectVerify();
    }
  };

  const handleDownloadPdf = async () => {
    if (!frontPageCaptureRef.current || !backPageCaptureRef.current || isExportingPdf) return;
    setIsExportingPdf(true);
    setExportSuccessMessage(null);

    try {
      await document.fonts.ready;

      const captureOptions = {
        quality: 0.98,
        pixelRatio: 3,
        width: 1122,
        height: 794,
        backgroundColor: '#FAF9F6',
        cacheBust: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
          width: '1122px',
          height: '794px',
        },
      };

      const frontImgData = await toJpeg(frontPageCaptureRef.current, captureOptions);
      const backImgData = await toJpeg(backPageCaptureRef.current, captureOptions);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Page 1 (Frente) + Interactive PDF Hyperlink Annotations on QR Code, Auth Box & Footer
      pdf.addImage(frontImgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.link(95, 158, 110, 32, { url: verificationFullUrl });
      pdf.link(12, 192, 273, 12, { url: verificationFullUrl });

      // Page 2 (Verso) + Interactive PDF Hyperlink Annotations on QR Code, Section 4 URL & Footer
      pdf.addPage('a4', 'landscape');
      pdf.addImage(backImgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.link(250, 130, 34, 34, { url: verificationFullUrl });
      pdf.link(14, 144, 235, 14, { url: verificationFullUrl });
      pdf.link(70, 184, 157, 19, { url: verificationFullUrl });

      pdf.save(
        `Certificado_Extensao_07_${CERTIFICATE_07_DATA.codigo}_Lucas_Goncalves_Silveira.pdf`
      );

      setExportSuccessMessage(
        'PDF Oficial (Frente e Verso com Links no QR Code e Rodapé) gerado com sucesso!'
      );
      setTimeout(() => setExportSuccessMessage(null), 6000);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const renderFrontPageContent = () => (
    <div
      style={{
        width: '1122px',
        height: '794px',
        backgroundColor: '#FAF9F6',
        color: '#111827',
        padding: '22px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Outer Green Frame (#0F4C3A) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '3px solid #0F4C3A',
          padding: '5px',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Navy Frame (#1B365D) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.5px solid #1B365D',
            padding: '22px 34px 16px 34px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9F6',
          }}
        >
          {/* TOP HEADER: 2 LOGOS + CENTER PROGRAM BLOCK */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '305px 1fr 305px',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid #D5CEBF',
              }}
            >
              {/* Left Institutional Issuer: Editora Mente e Saúde */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LogoEditoraMenteSaude className="w-[62px] h-[62px] shrink-0" />
                <div style={{ lineHeight: 1.25 }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#0F4C3A',
                      letterSpacing: '0.02em',
                    }}
                  >
                    EDITORA MENTE E SAÚDE
                  </div>
                  <div
                    className="font-mono-tabular"
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: '#1F2937',
                      marginTop: '2px',
                    }}
                  >
                    CNPJ: {CERTIFICATE_07_DATA.emissores.editora.cnpj}
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: '#1E6B52',
                      marginTop: '2px',
                      fontWeight: 500,
                    }}
                  >
                    {CERTIFICATE_07_DATA.emissores.editora.departamento}
                  </div>
                </div>
              </div>

              {/* Center Program Header */}
              <div style={{ textAlign: 'center', padding: '0 6px' }}>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '0.04em',
                    lineHeight: 1.35,
                  }}
                >
                  PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                  <br />E EDUCAÇÃO EM SAÚDE
                </div>
                <div
                  className="font-mono-tabular"
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: '#374151',
                    marginTop: '5px',
                  }}
                >
                  Certificado Nº {CERTIFICATE_07_DATA.numeroCertificado} · Livro de Extensão nº{' '}
                  {CERTIFICATE_07_DATA.livro} · Cód. {CERTIFICATE_07_DATA.codigo}
                </div>
              </div>

              {/* Right Institutional Issuer: Centro Profissionalizante Maria Dalva de Araújo */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >
                <div style={{ textAlign: 'right', lineHeight: 1.25 }}>
                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: '#1B365D',
                      letterSpacing: '0.02em',
                    }}
                  >
                    CENTRO PROFISSIONALIZANTE
                    <br />
                    MARIA DALVA DE ARAÚJO
                  </div>
                  <div
                    className="font-mono-tabular"
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: '#1F2937',
                      marginTop: '3px',
                    }}
                  >
                    CNPJ: {CERTIFICATE_07_DATA.emissores.centro.cnpj}
                  </div>
                </div>
                <LogoCentroMariaDalva className="w-[62px] h-[62px] shrink-0" />
              </div>
            </div>

            {/* MAIN CERTIFICATE TITLE */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <h1
                className="font-cert-title"
                style={{
                  fontSize: '33px',
                  fontWeight: 700,
                  color: '#0F4C3A',
                  letterSpacing: '0.06em',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                CERTIFICADO DE ATIVIDADE DE EXTENSÃO
              </h1>
              <p
                style={{
                  fontSize: '13.5px',
                  color: '#1F2937',
                  marginTop: '10px',
                  marginBottom: 0,
                  lineHeight: 1.45,
                }}
              >
                A <strong>Editora Mente e Saúde</strong> (CNPJ:{' '}
                {CERTIFICATE_07_DATA.emissores.editora.cnpj}), em parceria institucional com o{' '}
                <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:{' '}
                {CERTIFICATE_07_DATA.emissores.centro.cnpj}), certifica para os devidos fins de
                comprovação curricular e acadêmica que
              </p>
            </div>

            {/* RECIPIENT HIGHLIGHT BOX */}
            <div
              style={{
                marginTop: '14px',
                backgroundColor: '#F3EFE6',
                border: '1px solid #D6CFC2',
                padding: '12px 24px',
                textAlign: 'center',
              }}
            >
              <div
                className="font-cert-serif"
                style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#0D233A',
                  letterSpacing: '0.05em',
                  lineHeight: 1.15,
                }}
              >
                {CERTIFICATE_07_DATA.titular.nome}
              </div>
              <div
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#1F2937',
                  marginTop: '4px',
                }}
              >
                {CERTIFICATE_07_DATA.titular.qualificacao} | CPF: {CERTIFICATE_07_DATA.titular.cpf}{' '}
                | {CERTIFICATE_07_DATA.titular.instituicao}
              </div>
            </div>

            {/* MAIN EXTENSION NARRATIVE BODY */}
            <div
              style={{
                marginTop: '14px',
                fontSize: '13.6px',
                lineHeight: 1.56,
                color: '#111827',
                textAlign: 'justify',
              }}
            >
              <p style={{ margin: '0 0 10px 0' }}>
                participou de forma efetiva da <strong>Atividade de Extensão</strong> intitulada{' '}
                <strong>
                  “{CERTIFICATE_07_DATA.atividade.titulo}”
                </strong>
                , desenvolvida na modalidade de{' '}
                <strong>Atividade Comunitária, Campanha Educativa e Coleta de Dados Populacionais</strong>
                , realizada no período de <strong>{CERTIFICATE_07_DATA.atividade.periodo}</strong>,
                contabilizando carga horária total de{' '}
                <strong>{CERTIFICATE_07_DATA.atividade.cargaHorariaExtenso}</strong>.
              </p>
              <p style={{ margin: 0 }}>
                No âmbito desta ação extensionista, o profissional atuou na produção editorial
                acessível e distribuição comunitária gratuita de{' '}
                <strong>folhetos em fonte ampliada de alto contraste</strong> e{' '}
                <strong>pílulas de áudio-guias educativas para WhatsApp</strong> voltadas à
                população idosa, aplicação de enquete estruturada para{' '}
                <strong>coleta de dados populacionais</strong> sobre barreiras de leitura na
                terceira idade e percepção de sintomas de Catarata e Degeneração Macular
                Relacionada à Idade (DMRI),{' '}
                <strong>comunicação científica para combate à desinformação (fake news)</strong>{' '}
                sobre colírios milagrosos e receitas caseiras, e{' '}
                <strong>
                  divulgação dos canais oficiais de assistência oftalmológica e cirúrgica do SUS
                </strong>
                .
              </p>
            </div>

            {/* LOCATION AND DATE */}
            <div
              className="font-cert-serif"
              style={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#111827',
                marginTop: '14px',
              }}
            >
              {CERTIFICATE_07_DATA.atividade.localEmissao},{' '}
              {CERTIFICATE_07_DATA.atividade.dataEmissao}.
            </div>
          </div>

          {/* BOTTOM SIGNATURES + SEAL + QR CODE + MANUAL VERIFICATION */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '285px 1fr 285px',
                alignItems: 'end',
                gap: '14px',
                marginTop: '6px',
              }}
            >
              {/* Left Signatory: Bárbara Lima dos Santos */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '48px',
                    marginBottom: '2px',
                  }}
                >
                  <AssinaturaBarbaraLima className="h-12 w-48" />
                </div>
                <div
                  style={{
                    borderTop: '1.2px solid #1F2937',
                    paddingTop: '5px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {CERTIFICATE_07_DATA.emissores.editora.signataria}
                  </div>
                  <div style={{ fontSize: '10px', color: '#374151', marginTop: '1px' }}>
                    {CERTIFICATE_07_DATA.emissores.editora.cargo}
                  </div>
                  <div
                    className="font-mono-tabular"
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: '#374151',
                      marginTop: '2px',
                    }}
                  >
                    Editora Mente e Saúde (CNPJ: {CERTIFICATE_07_DATA.emissores.editora.cnpj})
                  </div>
                </div>
              </div>

              {/* Center Official Seal + QR Code + Verification Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <SeloOficialFePublica
                  codigo={CERTIFICATE_07_DATA.codigo}
                  className="w-[88px] h-[88px] shrink-0"
                />

                {/* QR Code Container with Clickable Link */}
                <a
                  href={verificationFullUrl}
                  onClick={handleVerifyLinkClick}
                  title={`Acessar Validador Oficial: ${verificationFullUrl}`}
                  style={{
                    width: '86px',
                    height: '86px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #0F4C3A',
                    padding: '3px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="QR Code de Autenticação do Certificado 07"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ fontSize: '9px', color: '#6B7280', textAlign: 'center' }}>
                      QR CODE
                    </div>
                  )}
                </a>

                {/* Manual Verification Box */}
                <div
                  style={{
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 9px',
                    fontSize: '9px',
                    lineHeight: 1.32,
                    color: '#1F2937',
                    maxWidth: '215px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#0F4C3A',
                      fontSize: '9px',
                      letterSpacing: '0.02em',
                      marginBottom: '2px',
                    }}
                  >
                    AUTENTICAÇÃO PÚBLICA MANUAL
                  </div>
                  <div className="font-mono-tabular">
                    <strong>Cód.:</strong> {CERTIFICATE_07_DATA.codigo}
                  </div>
                  <div className="font-mono-tabular">
                    <strong>Chave:</strong> {CERTIFICATE_07_DATA.chave}
                  </div>
                  <div style={{ marginTop: '2px', fontWeight: 600, color: '#374151' }}>
                    Link p/ Verificação Online:
                  </div>
                  <a
                    href={verificationFullUrl}
                    onClick={handleVerifyLinkClick}
                    className="font-mono-tabular"
                    style={{
                      display: 'block',
                      fontSize: '7.8px',
                      color: '#0F4C3A',
                      textDecoration: 'underline',
                      wordBreak: 'break-all',
                      fontWeight: 700,
                    }}
                  >
                    {verificationFullUrl}
                  </a>
                </div>
              </div>

              {/* Right Signatory: James Araújo de Santana */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '48px',
                    marginBottom: '2px',
                  }}
                >
                  <AssinaturaJamesAraujo className="h-12 w-48" />
                </div>
                <div
                  style={{
                    borderTop: '1.2px solid #1F2937',
                    paddingTop: '5px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {CERTIFICATE_07_DATA.emissores.centro.signatario}
                  </div>
                  <div style={{ fontSize: '10px', color: '#374151', marginTop: '1px' }}>
                    {CERTIFICATE_07_DATA.emissores.centro.cargo}
                  </div>
                  <div
                    className="font-mono-tabular"
                    style={{
                      fontSize: '8.7px',
                      fontWeight: 600,
                      color: '#374151',
                      marginTop: '2px',
                    }}
                  >
                    Centro Profissionalizante Maria Dalva de Araújo (CNPJ:{' '}
                    {CERTIFICATE_07_DATA.emissores.centro.cnpj})
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Verification Strip (Rodapé com Link Direto Clicável) */}
            <div
              className="font-mono-tabular"
              style={{
                marginTop: '8px',
                paddingTop: '5px',
                borderTop: '1px solid #E5E0D5',
                textAlign: 'center',
                fontSize: '9px',
                fontWeight: 600,
                color: '#374151',
              }}
            >
              Verifique via QR Code ou acesse o link direto{' '}
              <a
                href={verificationFullUrl}
                onClick={handleVerifyLinkClick}
                style={{
                  color: '#0F4C3A',
                  textDecoration: 'underline',
                  fontWeight: 700,
                }}
              >
                {verificationFullUrl}
              </a>{' '}
              (Cód. <strong>{CERTIFICATE_07_DATA.codigo}</strong> | Chave{' '}
              <strong>{CERTIFICATE_07_DATA.chave}</strong>)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackPageContent = () => (
    <div
      style={{
        width: '1122px',
        height: '794px',
        backgroundColor: '#FAF9F6',
        color: '#111827',
        padding: '22px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Outer Green Frame (#0F4C3A) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '3px solid #0F4C3A',
          padding: '5px',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Navy Frame (#1B365D) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.5px solid #1B365D',
            padding: '18px 28px 14px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9F6',
          }}
        >
          {/* TOP SECTION OF VERSO */}
          <div>
            {/* Header with both logos + Memorial Title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingBottom: '10px',
                borderBottom: '1.5px solid #0F4C3A',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <LogoEditoraMenteSaude className="w-[46px] h-[46px]" />
                <LogoCentroMariaDalva className="w-[46px] h-[46px]" />
              </div>
              <div>
                <h2
                  className="font-cert-title"
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#0F4C3A',
                    margin: 0,
                    letterSpacing: '0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                </h2>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#374151',
                    marginTop: '3px',
                  }}
                >
                  Verso Oficial do Certificado Nº {CERTIFICATE_07_DATA.numeroCertificado} · Fé
                  Pública Interinstitucional e Validação Curricular
                </div>
              </div>
            </div>

            {/* SECTIONS 1 & 2 GRID */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.08fr 0.92fr',
                gap: '14px',
                marginTop: '10px',
              }}
            >
              {/* Box 1: Dados de Identificação */}
              <div
                style={{
                  backgroundColor: '#F5F2EB',
                  border: '1px solid #D5CEBF',
                  padding: '9px 14px',
                }}
              >
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#0F4C3A',
                    letterSpacing: '0.03em',
                    marginBottom: '5px',
                  }}
                >
                  1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                </div>
                <div style={{ fontSize: '11.5px', lineHeight: 1.5, color: '#1F2937' }}>
                  <div>
                    Titular Certificado: <strong>{CERTIFICATE_07_DATA.titular.nome}</strong>
                  </div>
                  <div className="font-mono-tabular">
                    CPF Registrado: <strong>{CERTIFICATE_07_DATA.titular.cpf}</strong>
                  </div>
                  <div>
                    Qualificação Profissional:{' '}
                    <strong>{CERTIFICATE_07_DATA.titular.qualificacao}</strong>
                  </div>
                  <div>
                    Instituição de Origem:{' '}
                    <strong>{CERTIFICATE_07_DATA.titular.instituicao}</strong>
                  </div>
                </div>
              </div>

              {/* Box 2: Enquadramento Curricular e Pontuação */}
              <div
                style={{
                  backgroundColor: '#F5F2EB',
                  border: '1px solid #D5CEBF',
                  padding: '9px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: '#1B365D',
                      letterSpacing: '0.03em',
                      marginBottom: '5px',
                    }}
                  >
                    2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.4,
                    }}
                  >
                    {CERTIFICATE_07_DATA.atividade.enquadramentoEdital}
                  </div>
                </div>
                <div
                  className="font-mono-tabular"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#0F4C3A',
                    paddingTop: '6px',
                    borderTop: '1px solid #DFD9CC',
                    marginTop: '6px',
                  }}
                >
                  Período: {CERTIFICATE_07_DATA.atividade.periodo} &nbsp;|&nbsp; Total:{' '}
                  {CERTIFICATE_07_DATA.atividade.cargaHorariaNumeric}
                </div>
              </div>
            </div>

            {/* SECTION 3: MATRIZ DE ATIVIDADES PRÁTICAS (14 HORAS) */}
            <div
              style={{
                marginTop: '10px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div
                style={{
                  backgroundColor: '#EEF2F6',
                  padding: '6px 14px',
                  borderBottom: '1px solid #CBD5E1',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#0F4C3A',
                  letterSpacing: '0.03em',
                }}
              >
                3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (14 HORAS)
              </div>

              <div>
                {CERTIFICATE_07_DATA.eixosVerso.map((eixo, idx) => (
                  <div
                    key={eixo.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '295px 1fr 88px',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '7px 14px',
                      borderBottom:
                        idx < CERTIFICATE_07_DATA.eixosVerso.length - 1
                          ? '1px solid #E5E7EB'
                          : 'none',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#111827',
                          lineHeight: 1.25,
                        }}
                      >
                        {eixo.titulo}
                      </div>
                      <div
                        style={{
                          fontSize: '9.5px',
                          color: '#6B7280',
                          marginTop: '2px',
                          lineHeight: 1.2,
                        }}
                      >
                        {eixo.subtitulo}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: '10.8px',
                        color: '#1F2937',
                        lineHeight: 1.35,
                      }}
                    >
                      {eixo.descricao}
                    </div>

                    <div
                      className="font-mono-tabular"
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#0F4C3A',
                        textAlign: 'right',
                      }}
                    >
                      {eixo.cargaHoraria}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: REGISTRO OFICIAL DE FÉ PÚBLICA + QR CODE */}
            <div
              style={{
                marginTop: '10px',
                backgroundColor: '#FBF8F1',
                border: '1px solid #D9C9A3',
                padding: '9px 14px',
                display: 'grid',
                gridTemplateColumns: '1fr 96px',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#92400E',
                    letterSpacing: '0.03em',
                    marginBottom: '4px',
                  }}
                >
                  4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE
                  AUTENTICIDADE
                </div>
                <div style={{ fontSize: '11px', color: '#1F2937', lineHeight: 1.4 }}>
                  Certificado registrado sob o <strong>nº {CERTIFICATE_07_DATA.numeroCertificado}</strong>{' '}
                  no <strong>Livro de Extensão nº {CERTIFICATE_07_DATA.livro}, Folha {CERTIFICATE_07_DATA.folha}</strong>,
                  expedido pela <strong>Editora Mente e Saúde</strong> (CNPJ:{' '}
                  {CERTIFICATE_07_DATA.emissores.editora.cnpj}) e{' '}
                  <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:{' '}
                  {CERTIFICATE_07_DATA.emissores.centro.cnpj}).
                </div>
                <div
                  className="font-mono-tabular"
                  style={{
                    fontSize: '10px',
                    color: '#111827',
                    marginTop: '5px',
                    lineHeight: 1.45,
                  }}
                >
                  <div>
                    <strong>CÓDIGO DE AUTENTICIDADE:</strong> {CERTIFICATE_07_DATA.codigo}{' '}
                    &nbsp;|&nbsp; <strong>CHAVE DE CONTROLE / DÍGITO:</strong>{' '}
                    {CERTIFICATE_07_DATA.chave}
                  </div>
                  <div>
                    <strong>ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):</strong>{' '}
                    <a
                      href={verificationFullUrl}
                      onClick={handleVerifyLinkClick}
                      style={{
                        color: '#0F4C3A',
                        textDecoration: 'underline',
                        fontWeight: 700,
                      }}
                    >
                      {verificationFullUrl}
                    </a>
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '9.5px' }}>
                    <strong>HASH SHA-256:</strong> {CERTIFICATE_07_DATA.hashSha256}
                  </div>
                </div>
              </div>

              <a
                href={verificationFullUrl}
                onClick={handleVerifyLinkClick}
                title={`Acessar Validador Oficial: ${verificationFullUrl}`}
                style={{
                  width: '92px',
                  height: '92px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #0F4C3A',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code Verso do Certificado 07"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ fontSize: '9px', color: '#6B7280' }}>QR CODE</div>
                )}
              </a>
            </div>
          </div>

          {/* BOTTOM SIGNATURES OF VERSO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '265px 1fr 265px',
              alignItems: 'end',
              gap: '12px',
              marginTop: '4px',
            }}
          >
            {/* Left Signatory */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '38px',
                }}
              >
                <AssinaturaBarbaraLima className="h-10 w-44" />
              </div>
              <div style={{ borderTop: '1.2px solid #1F2937', paddingTop: '4px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#111827' }}>
                  {CERTIFICATE_07_DATA.emissores.editora.signataria}
                </div>
                <div
                  className="font-mono-tabular"
                  style={{ fontSize: '8.8px', color: '#374151', marginTop: '1px' }}
                >
                  Editora Mente e Saúde (CNPJ: {CERTIFICATE_07_DATA.emissores.editora.cnpj})
                </div>
              </div>
            </div>

            {/* Center Date & Validity Note + Direct Footer Link */}
            <div style={{ textAlign: 'center', paddingBottom: '1px' }}>
              <div
                className="font-cert-serif"
                style={{
                  fontSize: '15.5px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#111827',
                }}
              >
                {CERTIFICATE_07_DATA.atividade.localEmissao},{' '}
                {CERTIFICATE_07_DATA.atividade.dataEmissao}.
              </div>
              <div style={{ fontSize: '9.5px', color: '#374151', marginTop: '1px' }}>
                Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território
                Nacional
              </div>
              <div
                className="font-mono-tabular"
                style={{ fontSize: '8.5px', color: '#0F4C3A', marginTop: '2px' }}
              >
                Link de Verificação:{' '}
                <a
                  href={verificationFullUrl}
                  onClick={handleVerifyLinkClick}
                  style={{
                    color: '#0F4C3A',
                    textDecoration: 'underline',
                    fontWeight: 700,
                  }}
                >
                  {verificationFullUrl}
                </a>
              </div>
            </div>

            {/* Right Signatory */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '40px',
                }}
              >
                <AssinaturaJamesAraujo className="h-10 w-44" />
              </div>
              <div style={{ borderTop: '1.2px solid #1F2937', paddingTop: '4px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#111827' }}>
                  {CERTIFICATE_07_DATA.emissores.centro.signatario}
                </div>
                <div
                  className="font-mono-tabular"
                  style={{ fontSize: '8.8px', color: '#374151', marginTop: '1px' }}
                >
                  {CERTIFICATE_07_DATA.emissores.centro.nomeCurto} (CNPJ:{' '}
                  {CERTIFICATE_07_DATA.emissores.centro.cnpj})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={wrapperRef} className="w-full">
      {/* PDF Document Viewer Toolbar */}
      <div className="bg-[#0B3B49] text-white rounded-t-xl px-5 py-4 flex flex-wrap items-center justify-between gap-4 border border-[#0B3B49]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#D97706] flex items-center justify-center text-white shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#FCD34D] font-mono-tabular">
              <span>DOCUMENTO OFICIAL A4 PAISAGEM (2 LAUDAS)</span>
              <span aria-hidden="true">·</span>
              <span>CÓD. {CERTIFICATE_07_DATA.codigo}</span>
            </div>
            <h3 className="text-base font-semibold text-white">
              Certificado_Extensao_07_EMS-EXT-2025-0714_Lucas_Goncalves_Silveira.pdf
            </h3>
          </div>
        </div>

        {/* Page Filter & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#072630] p-1 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setActivePageFilter('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activePageFilter === 'both'
                  ? 'bg-[#D97706] text-white'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5" />
              2 Laudas (Frente + Verso)
            </button>
            <button
              type="button"
              onClick={() => setActivePageFilter('front')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activePageFilter === 'front'
                  ? 'bg-[#D97706] text-white'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Página 1 (Frente)
            </button>
            <button
              type="button"
              onClick={() => setActivePageFilter('back')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activePageFilter === 'back'
                  ? 'bg-[#D97706] text-white'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Página 2 (Verso 14h)
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden xl:flex items-center bg-[#072630] p-1 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(0.75, +(z - 0.1).toFixed(2)))}
              className="p-1.5 text-slate-200 hover:text-white"
              title="Reduzir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono-tabular text-slate-200">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(1.25, +(z + 0.1).toFixed(2)))}
              className="p-1.5 text-slate-200 hover:text-white"
              title="Ampliar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(1)}
              className="p-1.5 text-slate-200 hover:text-white"
              title="Restaurar Escala"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Download PDF CTA */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-[#D97706] hover:bg-[#B45309] disabled:opacity-60 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando PDF Alta Definição...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar PDF Oficial (2 Laudas)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Imprimir ou Salvar como PDF nativo"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir A4</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner after PDF Export */}
      {exportSuccessMessage && (
        <div className="bg-emerald-900 text-emerald-100 px-5 py-2.5 text-xs font-medium flex items-center justify-between border-x border-[#0B3B49]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportSuccessMessage}</span>
          </div>
          {onSelectVerify && (
            <button
              type="button"
              onClick={onSelectVerify}
              className="underline hover:text-white font-semibold whitespace-nowrap"
            >
              Testar no Validador Online →
            </button>
          )}
        </div>
      )}

      {/* PDF Canvas Viewport */}
      <div className="bg-[#1E293B] border-x border-b border-slate-700 rounded-b-xl p-4 sm:p-8 flex flex-col items-center gap-8 overflow-x-auto">
        {/* Page 1: FRENTE */}
        {(activePageFilter === 'both' || activePageFilter === 'front') && (
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[1122px] flex items-center justify-between text-xs text-slate-300 mb-2 px-1">
              <span className="font-mono-tabular">
                LAUDA 01 / 02 — FRENTE DO CERTIFICADO (A4 PAISAGEM · 297mm × 210mm)
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Assinaturas e Logos Higienizados · Fé Pública
              </span>
            </div>

            <div
              style={{
                width: `${Math.round(1122 * computedScale)}px`,
                height: `${Math.round(794 * computedScale)}px`,
                position: 'relative',
              }}
              className="shadow-2xl rounded-sm overflow-hidden bg-[#FAF9F6]"
            >
              <div
                style={{
                  transform: `scale(${computedScale})`,
                  transformOrigin: 'top left',
                  width: '1122px',
                  height: '794px',
                }}
              >
                {renderFrontPageContent()}
              </div>
            </div>
          </div>
        )}

        {/* Page 2: VERSO */}
        {(activePageFilter === 'both' || activePageFilter === 'back') && (
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[1122px] flex items-center justify-between text-xs text-slate-300 mb-2 px-1">
              <span className="font-mono-tabular">
                LAUDA 02 / 02 — VERSO: MEMORIAL DESCRITIVO E MATRIZ DE 14 HORAS (ITEM 08)
              </span>
              <span className="font-mono-tabular text-emerald-300">
                HASH SHA-256: {CERTIFICATE_07_DATA.hashSha256.slice(0, 18)}...
              </span>
            </div>

            <div
              style={{
                width: `${Math.round(1122 * computedScale)}px`,
                height: `${Math.round(794 * computedScale)}px`,
                position: 'relative',
              }}
              className="shadow-2xl rounded-sm overflow-hidden bg-[#FAF9F6]"
            >
              <div
                style={{
                  transform: `scale(${computedScale})`,
                  transformOrigin: 'top left',
                  width: '1122px',
                  height: '794px',
                }}
              >
                {renderBackPageContent()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Full-Scale 1:1 Unscaled Capture Nodes for High-Res PDF Export & Print */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '1122px',
          pointerEvents: 'none',
          zIndex: -50,
        }}
      >
        <div ref={frontPageCaptureRef}>{renderFrontPageContent()}</div>
        <div ref={backPageCaptureRef}>{renderBackPageContent()}</div>
      </div>
    </div>
  );
};
