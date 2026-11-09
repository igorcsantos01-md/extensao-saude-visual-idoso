import React from 'react';

export const LogoEditoraMenteSaude: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logotipo Editora Mente e Saúde"
  >
    {/* Outer rounded frame with transparent background */}
    <rect
      x="6"
      y="6"
      width="108"
      height="108"
      rx="16"
      stroke="#0F4C3A"
      strokeWidth="3.2"
      fill="none"
    />
    <rect
      x="11"
      y="11"
      width="98"
      height="98"
      rx="12"
      stroke="#0F4C3A"
      strokeWidth="1.2"
      strokeOpacity="0.45"
      fill="none"
    />

    {/* Curved top arc for institutional lettering */}
    <path
      id="emsTopCurve"
      d="M 18 54 A 42 42 0 1 1 102 54"
      fill="none"
      stroke="none"
    />
    <text
      fill="#0F4C3A"
      fontSize="7.3"
      fontWeight="700"
      letterSpacing="0.8"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#emsTopCurve" startOffset="50%" textAnchor="middle">
        EDITORA MENTE E SAÚDE
      </textPath>
    </text>

    {/* Inner circle halo */}
    <circle
      cx="60"
      cy="60"
      r="33"
      stroke="#0F4C3A"
      strokeWidth="2"
      fill="none"
    />

    {/* Human profile silhouette */}
    <path
      d="M44 82 C44 74, 42 68, 42 60 C42 46, 51 37, 63 37 C73 37, 80 44, 80 53 C80 56, 83 59, 84 61 C85 62, 83 64, 81 64 C81 67, 80 71, 76 72 C73 73, 70 73, 69 76 L69 83"
      stroke="#0F4C3A"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Green organic brain / leaves inside head */}
    <path
      d="M50 56 C49 49, 55 43, 62 44 C66 41, 73 45, 73 51 C76 54, 74 60, 69 61 C66 64, 57 64, 54 60 C51 60, 49 58, 50 56 Z"
      fill="#1E7E5C"
      fillOpacity="0.22"
      stroke="#0F4C3A"
      strokeWidth="2"
    />
    {/* Brain gyri & leaf veins */}
    <path
      d="M55 52 C58 49, 63 49, 66 52 M56 57 C60 55, 65 55, 68 58 M62 44 L62 62"
      stroke="#0F4C3A"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Sprouting leaf at crown */}
    <path
      d="M62 43 C62 39, 67 37, 70 40 C68 43, 64 44, 62 43 Z"
      fill="#1E7E5C"
    />

    {/* Open academic book at base */}
    <path
      d="M36 93 C44 90, 53 91, 60 95 C67 91, 76 90, 84 93 L84 100 C76 97, 67 98, 60 102 C53 98, 44 97, 36 100 Z"
      fill="#FAF9F6"
      stroke="#0F4C3A"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M60 94 L60 102" stroke="#0F4C3A" strokeWidth="2" />
  </svg>
);

export const LogoCentroMariaDalva: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Logotipo Centro Profissionalizante Maria Dalva de Araújo"
  >
    {/* Outer Navy Seal Circle (transparent exterior, no corner triangles, no phone numbers) */}
    <circle
      cx="60"
      cy="60"
      r="53"
      fill="#162F54"
      stroke="#0D1F38"
      strokeWidth="2.5"
    />
    <circle
      cx="60"
      cy="60"
      r="48"
      fill="none"
      stroke="#D5DFEE"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
    <circle cx="60" cy="60" r="34" fill="#21467A" stroke="#90B4E8" strokeWidth="1.2" />

    {/* Curved top and bottom institutional text paths */}
    <path
      id="cmdaTopArc"
      d="M 17 60 A 43 43 0 1 1 103 60"
      fill="none"
    />
    <path
      id="cmdaBottomArc"
      d="M 103 60 A 43 43 0 1 1 17 60"
      fill="none"
    />
    <text
      fill="#FFFFFF"
      fontSize="6.5"
      fontWeight="700"
      letterSpacing="0.7"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#cmdaTopArc" startOffset="50%" textAnchor="middle">
        CENTRO PROFISSIONALIZANTE
      </textPath>
    </text>
    <text
      fill="#E2ECFA"
      fontSize="6.4"
      fontWeight="700"
      letterSpacing="0.75"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#cmdaBottomArc" startOffset="50%" textAnchor="middle">
        ★ MARIA DALVA DE ARAÚJO ★
      </textPath>
    </text>

    {/* Lightbulb Rays */}
    <g stroke="#FCD34D" strokeWidth="1.8" strokeLinecap="round">
      <line x1="60" y1="30" x2="60" y2="34" />
      <line x1="42" y1="36" x2="45" y2="39" />
      <line x1="78" y1="36" x2="75" y2="39" />
      <line x1="35" y1="52" x2="39" y2="52" />
      <line x1="85" y1="52" x2="81" y2="52" />
    </g>

    {/* Central Puzzle Lightbulb */}
    <path
      d="M46 53 C46 44, 52 38, 60 38 C68 38, 74 44, 74 53 C74 59, 69 63, 67 68 L53 68 C51 63, 46 59, 46 53 Z"
      fill="#F8FAFC"
      stroke="#0D1F38"
      strokeWidth="2"
    />
    {/* Puzzle piece interlocking lines inside bulb */}
    <path
      d="M60 38 L60 51 C62.5 51, 62.5 54, 60 54 L60 68 M46 53 L55 53 C55 50.5, 58 50.5, 58 53 L74 53"
      stroke="#162F54"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Bulb screw base */}
    <rect
      x="53"
      y="69"
      width="14"
      height="4"
      rx="1.5"
      fill="#CBD5E1"
      stroke="#0D1F38"
      strokeWidth="1.4"
    />
    <rect
      x="55"
      y="74"
      width="10"
      height="3.5"
      rx="1.5"
      fill="#94A3B8"
      stroke="#0D1F38"
      strokeWidth="1.4"
    />
  </svg>
);

export const AssinaturaBarbaraLima: React.FC<{ className?: string }> = ({
  className = 'h-11 w-48',
}) => (
  <svg
    viewBox="0 0 260 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Assinatura de Bárbara Lima dos Santos"
  >
    {/* Clean high-contrast vector calligraphic signature matching the official PDF */}
    <path
      d="M28 16 C26 28, 23 44, 21 53 C20 42, 26 14, 39 14 C48 14, 51 22, 42 29 C34 34, 27 34, 35 35 C47 36, 52 44, 41 51 C33 55, 22 53, 19 48 C26 52, 43 50, 56 43 C63 39, 68 34, 66 43 C65 48, 71 48, 77 42 C82 37, 85 35, 84 43 C84 48, 91 47, 98 39 C104 31, 111 15, 108 12 C104 9, 98 25, 101 40 C103 48, 112 47, 119 41 C124 37, 128 36, 127 43 C127 47, 134 46, 141 40 C146 36, 151 39, 150 44 C150 47, 158 46, 166 39 C174 32, 183 16, 180 12 C176 9, 170 28, 174 41 C177 48, 188 46, 195 40 C200 35, 206 41, 214 43 C224 45, 236 41, 245 36"
      stroke="#111827"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Accent diacritic & dot */}
    <path
      d="M68 26 L74 21 M129 27 C130 27, 131 27, 131 28"
      stroke="#111827"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Subtle flourish underline */}
    <path
      d="M42 55 C88 51, 165 48, 238 46"
      stroke="#111827"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeOpacity="0.75"
    />
  </svg>
);

export const AssinaturaJamesAraujo: React.FC<{ className?: string }> = ({
  className = 'h-11 w-48',
}) => (
  <svg
    viewBox="0 0 260 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Assinatura de James Araújo de Santana"
  >
    {/* Clean high-contrast calligraphic rubric matching James Araújo de Santana */}
    <path
      d="M32 20 C42 15, 55 12, 56 21 C57 31, 47 46, 38 52 C31 56, 25 53, 29 47 C35 40, 56 42, 74 43 C90 44, 108 42, 122 38 C134 34, 146 19, 152 14 C155 11, 157 25, 156 43 C155 48, 147 35, 162 34 C174 33, 179 42, 187 42 C195 42, 202 35, 210 39 C217 42, 226 30, 229 19 C230 14, 227 34, 233 41 C238 46, 246 44, 251 41"
      stroke="#111827"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sweeping rubric base curve */}
    <path
      d="M52 54 C104 47, 172 44, 246 39"
      stroke="#111827"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const SeloOficialFePublica: React.FC<{
  codigo: string;
  className?: string;
}> = ({ codigo, className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 130 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Selo Oficial de Fé Pública"
  >
    <circle
      cx="65"
      cy="65"
      r="58"
      fill="#FCF7E6"
      stroke="#C6922C"
      strokeWidth="2.5"
    />
    <circle
      cx="65"
      cy="65"
      r="52"
      fill="none"
      stroke="#D4A74A"
      strokeWidth="1.2"
      strokeDasharray="3 2.5"
    />
    <circle
      cx="65"
      cy="65"
      r="46"
      fill="none"
      stroke="#C6922C"
      strokeWidth="0.9"
      strokeOpacity="0.6"
    />

    {/* Top 3 stars */}
    <text
      x="65"
      y="35"
      textAnchor="middle"
      fill="#B8821E"
      fontSize="9"
      fontWeight="700"
      letterSpacing="2"
    >
      ★ ★ ★
    </text>

    <text
      x="65"
      y="52"
      textAnchor="middle"
      fill="#7C530D"
      fontSize="9.5"
      fontWeight="700"
      fontFamily="Cinzel, Georgia, serif"
      letterSpacing="0.8"
    >
      SELO OFICIAL
    </text>
    <text
      x="65"
      y="66"
      textAnchor="middle"
      fill="#7C530D"
      fontSize="9.5"
      fontWeight="700"
      fontFamily="Cinzel, Georgia, serif"
      letterSpacing="0.8"
    >
      FÉ PÚBLICA
    </text>

    <line
      x1="32"
      y1="74"
      x2="98"
      y2="74"
      stroke="#C6922C"
      strokeWidth="1"
    />

    <text
      x="65"
      y="86"
      textAnchor="middle"
      fill="#8E6214"
      fontSize="7.2"
      fontWeight="700"
      fontFamily="JetBrains Mono, monospace"
    >
      {codigo}
    </text>

    <text
      x="65"
      y="102"
      textAnchor="middle"
      fill="#B8821E"
      fontSize="8"
      fontWeight="700"
      letterSpacing="2"
    >
      ★ ★
    </text>
  </svg>
);
