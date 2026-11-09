export interface EixoMetodologico {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  cargaHoraria: string;
}

export interface FolhetoAmpliado {
  id: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  publicoAlvo: string;
  tipografiaOriginal: string;
  pontosChave: {
    titulo: string;
    texto: string;
  }[];
  sinaisAlerta: string[];
  orientacaoSUS: string;
}

export interface AudioGuia {
  id: string;
  episodio: string;
  titulo: string;
  duracao: string;
  formato: string;
  resumo: string;
  roteiroNarrado: string;
  topicos: string[];
}

export const CERTIFICATE_07_DATA = {
  numeroCertificado: '07',
  livro: '01/2025',
  folha: '14',
  codigo: 'EMS-EXT-2025-0714',
  chave: '0714-8923-4510-7E4B',
  hashSha256: '9f4e2a71c8b30d56e1924f8a3c61b70e5d2894a1c7f3e60b8d4219a5c3e70714',
  titular: {
    nome: 'LUCAS GONÇALVES SILVEIRA',
    cpf: '702.794.941-57',
    qualificacao: 'Médico',
    instituicao: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  },
  emissores: {
    editora: {
      nome: 'Editora Mente e Saúde',
      cnpj: '51.372.335/0001-71',
      departamento: 'Conselho Editorial e Extensão Científica',
      signataria: 'BÁRBARA LIMA DOS SANTOS',
      cargo: 'Editora-Chefe e Coordenadora de Extensão Editorial',
    },
    centro: {
      nome: 'Centro Profissionalizante Maria Dalva de Araújo',
      nomeCurto: 'Centro Maria Dalva de Araújo',
      cnpj: '51.269.112/0001-83',
      signatario: 'JAMES ARAÚJO DE SANTANA',
      cargo: 'Coordenador de Extensão e Projetos Educativos',
    },
  },
  atividade: {
    programa:
      'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE',
    titulo:
      'Atividade Comunitária de Inclusão Visual do Idoso: Distribuição de Folhetos em Fonte Ampliada e Áudio-Guias sobre Catarata e Degeneração Macular',
    enquadramentoEdital:
      'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
    modalidadesFrente:
      'Atividade Comunitária, Campanha Educativa e Coleta de Dados Populacionais',
    periodo: '19 a 22 de fevereiro de 2025',
    dataEmissao: '28 de fevereiro de 2025',
    localEmissao: 'Goiânia - GO',
    cargaHorariaNumeric: '14h',
    cargaHorariaExtenso: '14 (quatorze) horas',
  },
  eixosVerso: [
    {
      id: 'eixo-1',
      titulo: 'Eixo I — Design Inclusivo e Produção Editorial em Fonte Ampliada',
      subtitulo: 'Acessibilidade Tipográfica e Contraste Cromático para Baixa Visão Senil',
      descricao:
        'Revisão de literatura oftalmológica e elaboração editorial de folhetos comunitários impressos e digitais em macro-tipografia (18pt a 28pt) com alto contraste sobre Catarata Senil e Degeneração Macular Relacionada à Idade (DMRI).',
      cargaHoraria: '03h 30min',
    },
    {
      id: 'eixo-2',
      titulo: 'Eixo II — Produção de Áudio-Guias Educativos e Acessibilidade Digital',
      subtitulo: 'Tecnologia Assistiva Sonora e Comunicação Comunitária via WhatsApp',
      descricao:
        'Estruturação de roteiros clínicos em linguagem acessível e gravação de pílulas de áudio-guias sobre sintomas de embaçamento visual, metamorfopsia (Grade de Amsler) e prevenção da cegueira evitável no idoso.',
      cargaHoraria: '03h 30min',
    },
    {
      id: 'eixo-3',
      titulo: 'Eixo III — Coleta de Dados Populacionais e Combate a Fake News Oculares',
      subtitulo: 'Inquérito Comunitário sobre Barreiras Visuais na Terceira Idade',
      descricao:
        'Aplicação de enquete estruturada para coleta de dados populacionais sobre dificuldades de leitura de rótulos e receitas médicas em idosos, aliada ao combate a fake news sobre colírios milagrosos que prometem dissolver catarata sem cirurgia.',
      cargaHoraria: '03h 30min',
    },
    {
      id: 'eixo-4',
      titulo: 'Eixo IV — Ação Comunitária e Divulgação dos Canais Oficiais do SUS',
      subtitulo: 'Cidadania em Saúde Ocular e Fluxo de Acesso à Cirurgia de Catarata',
      descricao:
        'Distribuição gratuita dos folhetos ampliados e áudio-guias a idosos, familiares e cuidadores, com orientação prática sobre o encaminhamento via Unidade Básica de Saúde (UBS) para consulta oftalmológica e facectomia pelo SUS.',
      cargaHoraria: '03h 30min',
    },
  ] as EixoMetodologico[],
};

export const FOLHETOS_AMPLIADOS: FolhetoAmpliado[] = [
  {
    id: 'folheto-catarata',
    numero: 'Folheto Acessível Nº 01',
    titulo: 'Catarata Tem Cura: Quando a Visão Nublada Precisa de Avaliação Médica',
    subtitulo: 'Material diagramado originalmente em corpo 22pt sem serifa e contraste triplo (AAA)',
    publicoAlvo: 'Idosos acima de 60 anos, familiares e cuidadores comunitários',
    tipografiaOriginal: 'Plus Jakarta Sans SemiBold · Corpo 22pt · Entrelinha 1.6',
    pontosChave: [
      {
        titulo: '1. O que é a Catarata Senil?',
        texto:
          'Dentro do nosso olho existe uma lente natural chamada cristalino. Com o passar dos anos, essa lente pode ficar opaca e esbranquiçada, como uma janela embaçada pela fumaça ou neblina.',
      },
      {
        titulo: '2. Por que trocar os óculos não resolve?',
        texto:
          'Quando a catarata avança, mesmo usando óculos novos a imagem continua lavada, sem brilho e com muita sensibilidade à luz do sol ou aos faróis de carros à noite.',
      },
      {
        titulo: '3. O tratamento definitivo é seguro e rápido',
        texto:
          'Não existe colírio, vitamina ou chá capaz de limpar a catarata. O único tratamento eficaz é a cirurgia (facectomia), na qual a lente opaca é substituída por uma lente intraocular transparente.',
      },
    ],
    sinaisAlerta: [
      'Sensação constante de névoa, fumaça ou véu na frente dos olhos',
      'Cores que parecem desbotadas ou amareladas no dia a dia',
      'Visão dupla em um dos olhos ou ofuscamento intenso com lâmpadas',
      'Troca frequente do grau dos óculos sem melhora real da leitura',
    ],
    orientacaoSUS:
      'Procure a Unidade Básica de Saúde (UBS / Posto de Saúde) mais próxima com seu Cartão do SUS e documento de identidade. O médico da família solicitará o encaminhamento oficial para o mutirão ou centro especializado de Oftalmologia do SUS.',
  },
  {
    id: 'folheto-dmri',
    numero: 'Folheto Acessível Nº 02',
    titulo: 'Degeneração Macular (DMRI): Proteja o Centro da Sua Visão',
    subtitulo: 'Guia prático de identificação precoce de distorções visuais e linhas tortas',
    publicoAlvo: 'População idosa, tabagistas, hipertensos e pessoas com histórico familiar',
    tipografiaOriginal: 'Plus Jakarta Sans SemiBold · Corpo 24pt · Entrelinha 1.65',
    pontosChave: [
      {
        titulo: '1. O que é a Mácula?',
        texto:
          'A mácula é a região central da retina responsável pelos detalhes finos: reconhecer o rosto dos netos, ler embalagens de remédios, costurar e enxergar letras pequenas.',
      },
      {
        titulo: '2. Como a Degeneração Macular se manifesta?',
        texto:
          'Diferente da catarata que embaça tudo por igual, a DMRI afeta o centro da visão. As linhas retas de azulejos, portas e cadernos começam a parecer onduladas ou surge uma mancha escura central.',
      },
      {
        titulo: '3. Faça o autoexame mensal de um olho por vez',
        texto:
          'Muitas vezes um olho saudável esconde o problema do outro. Tampe um olho com a mão (usando seus óculos de perto) e observe se os quadradinhos da grade continuam retos.',
      },
    ],
    sinaisAlerta: [
      'Linhas retas de batentes de porta ou pisos que parecem tortas ou onduladas',
      'Mancha escura, cinzenta ou vazia bem no meio da palavra que você tenta ler',
      'Dificuldade para reconhecer feições de pessoas conhecidas a poucos metros',
      'Necessidade de iluminação cada vez mais forte para conseguir ler',
    ],
    orientacaoSUS:
      'Se notar linhas tortas ou mancha central repentina, não espere! Procure atendimento oftalmológico prioritário via UBS ou serviço de referência em Retina do SUS para exame de Fundo de Olho (Mapeamento de Retina).',
  },
  {
    id: 'folheto-fakenews',
    numero: 'Folheto Acessível Nº 03',
    titulo: 'Alerta à Terceira Idade: O Perigo dos Colírios Milagrosos e Receitas Caseiras',
    subtitulo: 'Comunicação científica de combate à desinformação ocular em grupos de mensagens',
    publicoAlvo: 'Comunidade geral, grupos de terceira idade e familiares',
    tipografiaOriginal: 'Plus Jakarta Sans Bold · Corpo 22pt · Alto Contraste',
    pontosChave: [
      {
        titulo: '1. Nenhum colírio dissolve catarata!',
        texto:
          'Desconfie de anúncios na internet ou correntes de WhatsApp que vendem gotas "naturais" prometendo curar catarata ou glaucoma sem cirurgia. Esses produtos não têm registro na ANVISA.',
      },
      {
        titulo: '2. Nunca pingue limão, leite materno, mel ou chás nos olhos',
        texto:
          'Substâncias caseiras alteram o pH da lágrima, causam queimaduras químicas na córnea e carregam fungos e bactérias que podem levar à perda irreversível da visão.',
      },
      {
        titulo: '3. Como ler a validade e o rótulo do seu colírio com segurança',
        texto:
          'Peça ajuda ou utilize uma lupa iluminada para conferir o nome do colírio antes de pingar. Nunca use colírios emprestados de vizinhos ou parentes.',
      },
    ],
    sinaisAlerta: [
      'Vermelhidão intensa, dor ocular aguda ou secreção amarelada após uso de gotas',
      'Queda súbita da visão acompanhada de dor de cabeça ou náuseas',
      'Frascos de colírio abertos há mais de 30 dias ou sem rótulo legível',
    ],
    orientacaoSUS:
      'Em caso de acidente ocular, irritação severa ou dor súbita nos olhos, lave apenas com soro fisiológico estéril ou água filtrada abundante e procure imediatamente uma UPA 24h ou Emergência Oftalmológica do SUS.',
  },
];

export const AUDIO_GUIAS_WHATSAPP: AudioGuia[] = [
  {
    id: 'audio-01',
    episodio: 'Áudio-Guia 01 · WhatsApp Acessível',
    titulo: 'Vista Nublada Não é Normal da Idade: Entenda a Catarata e a Cirurgia no SUS',
    duracao: '01:45',
    formato: 'Áudio OGG/MP3 de Voz Clara e Cadência Pausada (115 palavras/min)',
    resumo:
      'Explica de forma acolhedora o que é a catarata, desmistifica o medo da cirurgia na terceira idade e orienta o passo a passo para agendar pelo posto de saúde.',
    roteiroNarrado:
      'Olá! Esta é uma mensagem educativa do Projeto de Inclusão Visual do Idoso. Se você tem mais de sessenta anos e sente que a sua visão está ficando nublada, como se olhasse através de um vidro embaçado, saiba que isso não precisa ser aceito como algo sem solução. Na maioria das vezes, trata-se da catarata, um embaçamento natural da lente interna do olho. Não acredite em boatos de colírios milagrosos: a catarata é corrigida com uma cirurgia rápida, segura e gratuita pelo SUS. Procure o posto de saúde do seu bairro com seu Cartão do SUS e peça avaliação para o oftalmologista. Enxergar bem é segurança, autonomia e qualidade de vida!',
    topicos: ['Sintomas da Catarata', 'Segurança da Facectomia', 'Acesso gratuito via UBS/SUS'],
  },
  {
    id: 'audio-02',
    episodio: 'Áudio-Guia 02 · WhatsApp Acessível',
    titulo: 'Linhas Tortas ou Mancha no Centro da Visão? Conheça a Degeneração Macular',
    duracao: '01:52',
    formato: 'Áudio OGG/MP3 de Voz Clara e Cadência Pausada (115 palavras/min)',
    resumo:
      'Ensina o idoso a fazer o teste simples de tampar um olho de cada vez olhando para os azulejos da parede para detectar precocemente alterações na mácula.',
    roteiroNarrado:
      'Atenção, idosos e familiares! Vocês já ouviram falar na Degeneração Macular Relacionada à Idade? Ela é uma condição que afeta bem o centro da nossa visão, dificultando ler letras pequenas ou reconhecer rostos, enquanto a visão lateral continua funcionando. Um teste muito simples pode ser feito em casa hoje mesmo: coloque seus óculos de leitura, olhe para as linhas retas dos azulejos da cozinha ou do batente da porta, e tampe um olho de cada vez com a mão. Se as linhas retas parecerem tortas, onduladas ou se houver uma mancha escura no meio da visão, procure o médico oftalmologista com prioridade. O diagnóstico precoce protege a sua visão!',
    topicos: ['O que é a Mácula', 'Autoexame de 1 olho por vez', 'Alerta contra linhas onduladas'],
  },
  {
    id: 'audio-03',
    episodio: 'Áudio-Guia 03 · WhatsApp Acessível',
    titulo: 'Cuidado com Receitas Caseiras nos Olhos e Como Organizar Seus Colírios',
    duracao: '01:38',
    formato: 'Áudio OGG/MP3 de Voz Clara e Cadência Pausada (115 palavras/min)',
    resumo:
      'Combate notícias falsas sobre chás e colírios sem prescrição médica e ensina dicas de marcação com fitas coloridas de alto contraste nos frascos.',
    roteiroNarrado:
      'Mensagem de proteção à saúde dos seus olhos: nunca, em nenhuma hipótese, pingue chás caseiros, água com limão, mel ou colírios de outras pessoas nos seus olhos. Essas receitas caseiras podem causar infecções graves e queimaduras na córnea. Além disso, se você usa mais de um colírio receitado pelo médico e tem dificuldade para ler as letras miúdas da embalagem, peça a um familiar para colar uma etiqueta grande com letra preta bem grossa na caixa, marcando um sol para o colírio da manhã e uma lua para o colírio da noite. Cuide dos seus olhos com carinho e orientação médica!',
    topicos: ['Perigo de colírios caseiros', 'Etiquetas em fonte ampliada', 'Canais de urgência do SUS'],
  },
];

export const DADOS_POPULACIONAIS_ENQUETE = {
  totalParticipantes: 312,
  periodoColeta: '19 a 22 de fevereiro de 2025',
  publicoRespondente: 'Idosos (60 a 86 anos) e cuidadores familiares',
  indicadores: [
    {
      percentual: '78,5%',
      rotulo: 'Relataram dificuldade severa para ler bulas, rótulos e folhetos comuns (fonte < 11pt)',
      detalhe: '245 de 312 participantes afirmaram desistir da leitura de impressos de saúde tradicionais.',
    },
    {
      percentual: '64,1%',
      rotulo: 'Acreditavam que "vista embaçada na velhice é normal" e não procuraram avaliação cirúrgica',
      detalhe: 'Principal barreira cultural identificada para o diagnóstico oportuno da Catarata Senil.',
    },
    {
      percentual: '81,7%',
      rotulo: 'Nunca haviam realizado o teste de oclusão monocular (Grade de Amsler) para a mácula',
      detalhe: 'Desconheciam que o olho contralateral saudável pode mascarar escotomas e metamorfopsia.',
    },
    {
      percentual: '94,2%',
      rotulo: 'Aprovaram os Folhetos em Fonte Ampliada (22pt+) combinados aos Áudio-Guias no WhatsApp',
      detalhe: 'Relataram autonomia imediata para compreender os sinais de alerta e buscar a UBS.',
    },
  ],
};
