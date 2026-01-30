
import { AdSetData, AnnualStrategy, PlatformStrategy, WeeklyScheduleRow, MonthlyDetailedPlan } from './types';

export const ANNUAL_PLAN: AnnualStrategy = {
  northStar: {
    title: 'NORTE DO ANO',
    description: 'Autoridade técnica + presença em eventos + educação contínua + produto com contexto real'
  },
  benefits: [
    'Coerência ao longo do ano',
    'Conteúdo que evolui, não repete',
    'Eventos integrados (não soltos)',
    'Fácil validação com diretoria',
    'Base perfeita para o nível mensal'
  ],
  months: [
    {
      month: 'FEVEREIRO',
      title: 'POSICIONAMENTO TÉCNICO',
      function: 'Preparar o mercado',
      color: 'blue',
      deliverables: [
        'Educação técnica (base)',
        'Normas, aplicações, riscos',
        'Início oficial da série semanal de vídeos',
        'Reforço do papel da Next Safety no mercado'
      ],
      takeaways: ['Construção de autoridade', 'Preparação para eventos']
    },
    {
      month: 'MARÇO',
      title: 'AUTORIDADE & CONFIANÇA',
      function: 'Aprofundar credibilidade',
      color: 'blue',
      deliverables: [
        'Conteúdos técnicos mais densos',
        'Comparativos e critérios de escolha',
        'Bastidores de qualidade e produto',
        'Preparação para Proteminas'
      ],
      takeaways: ['Mercado começa a "escutar"']
    },
    {
      month: 'ABRIL',
      title: 'EVENTO + EDUCAÇÃO',
      function: 'Marca visível',
      color: 'yellow',
      events: [
        { name: 'Proteminas', date: '14 a 16/04' }
      ],
      deliverables: [
        'Pré-evento: contexto técnico',
        'Durante: presença, pessoas, bastidores',
        'Pós-evento: aprendizados e tendências'
      ],
      takeaways: ['Marca visível', 'Conteúdo com lastro real']
    },
    {
      month: 'MAIO',
      title: 'SST EM FOCO (MÊS FORTE)',
      function: 'Autoridade máxima',
      color: 'yellow',
      events: [
        { name: 'PrevenSul', date: '27 a 29/05' },
        { name: 'O Futuro da SST', date: '28/05' },
        { name: 'Enc. Estadual Técnicos TST', date: '29/05' }
      ],
      deliverables: [
        'Educação estratégica sobre SST',
        'Conteúdo institucional com profundidade',
        'Produto sempre ligado a risco real',
        'Forte presença no LinkedIn'
      ],
      takeaways: ['Mês de autoridade máxima', 'Conversa direta com técnicos e decisores']
    },
    {
      month: 'JUNHO',
      title: 'CONSOLIDAÇÃO TÉCNICA',
      function: 'Consolidação de aprendizados',
      color: 'yellow',
      events: [
        { name: 'Exposeg', date: '01 a 03/06' }
      ],
      deliverables: [
        'Encerramento do 1º bloco de eventos',
        'Consolidação de aprendizados',
        'Conteúdo técnico mais aplicado',
        'Reforço da exclusividade ATG'
      ],
      takeaways: ['Marca sólida', 'Sem repetição de discurso']
    },
    {
      month: 'JULHO',
      title: 'EDUCAÇÃO CONTÍNUA',
      function: 'Maturidade',
      color: 'blue',
      deliverables: [
        'Séries educativas avançadas',
        'Riscos combinados',
        'Aplicações específicas por setor',
        'Conteúdo evergreen'
      ],
      takeaways: ['Alto valor técnico', 'Baixo ruído']
    },
    {
      month: 'AGOSTO',
      title: 'PRODUTO COM CONTEXTO',
      function: 'Comercial inteligente',
      color: 'blue',
      deliverables: [
        'Produto explicado por aplicação',
        'Tecnologia como diferencial real',
        'Casos técnicos (sem depoimento)',
        'Preparação para SulSST'
      ],
      takeaways: ['Produto sem "vitrine"', 'Venda consultiva']
    },
    {
      month: 'SETEMBRO',
      title: 'AUTORIDADE REGIONAL',
      function: 'Conexão Regional',
      color: 'yellow',
      events: [
        { name: 'SulSST', date: '25 a 27/09' }
      ],
      deliverables: [
        'Conteúdo regionalizado',
        'Presença técnica',
        'Relacionamento',
        'Pós-evento estratégico'
      ],
      takeaways: ['Marca próxima do mercado', 'Forte conexão técnica']
    },
    {
      month: 'OUTUBRO',
      title: 'GRANDE PALCO',
      function: 'Liderança de mercado',
      color: 'red',
      events: [
        { name: 'FISP', date: '06 a 08/10' }
      ],
      deliverables: [
        'Conteúdos de inovação',
        'Tecnologia e futuro',
        'Liderança de mercado',
        'Forte presença institucional'
      ],
      takeaways: ['Pico de visibilidade', 'Marca em posição de liderança']
    },
    {
      month: 'NOVEMBRO',
      title: 'VISÃO & CONTINUIDADE',
      function: 'Maturidade institucional',
      color: 'blue',
      deliverables: [
        'Tendências observadas no ano',
        'Consolidação de posicionamento',
        'Conteúdo estratégico',
        'Planejamento implícito para 2027'
      ],
      takeaways: ['Autoridade silenciosa', 'Marca madura']
    },
    {
      month: 'DEZEMBRO',
      title: 'RELACIONAMENTO & FECHAMENTO',
      function: 'Vínculo humano',
      color: 'green',
      deliverables: [
        'Mensagens institucionais',
        'Operação (plantões, inventário)',
        'Relacionamento',
        'Encerramento de ciclo'
      ],
      takeaways: ['Próxima do cliente', 'Sem marketing vazio']
    }
  ]
};

export const SOCIAL_STRATEGY: PlatformStrategy[] = [
  {
    id: 'meta',
    name: 'Instagram / Facebook',
    schedule: 'Segunda, Quarta e Sexta',
    description: 'Esses dias são excelentes para B2B industrial em 2026.',
    bestDays: [
      {
        day: 'Segunda',
        reason: ['Planejamento da semana', 'Bom para conteúdos educacionais e institucionais']
      },
      {
        day: 'Quarta',
        reason: ['Pico de atenção no meio da semana', 'Ótimo para produto + aplicação']
      },
      {
        day: 'Sexta',
        reason: ['Conteúdos mais leves ou institucionais', 'Boa taxa de salvamento e leitura']
      }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    schedule: 'Terça e Quinta',
    description: 'Esses são, historicamente e em 2025/2026, os melhores dias do LinkedIn.',
    bestDays: [
      {
        day: 'Terça',
        reason: ['Maior taxa de engajamento técnico']
      },
      {
        day: 'Quinta',
        reason: ['Bom alcance', 'Leitura mais profunda']
      }
    ],
    tip: 'Colocar o post reaproveitado do Instagram em um desses dias (normalmente quinta) funciona muito bem.'
  }
];

export const WEEKLY_SCHEDULE: WeeklyScheduleRow[] = [
  {
    day: 'Segunda',
    platforms: 'Instagram/Facebook',
    content: 'Conteúdo principal (educacional / institucional)'
  },
  {
    day: 'Terça',
    platforms: 'LinkedIn',
    content: 'Conteúdo exclusivo LinkedIn'
  },
  {
    day: 'Quarta',
    platforms: 'Instagram/Facebook',
    content: 'Produto + aplicação'
  },
  {
    day: 'Quinta',
    platforms: 'LinkedIn',
    content: 'Conteúdo exclusivo OU repost adaptado'
  },
  {
    day: 'Sexta',
    platforms: 'Instagram/Facebook',
    content: 'Institucional / produto estratégico'
  }
];

export const DETAILED_MONTHLY_PLANS: MonthlyDetailedPlan[] = [
  {
    month: 'FEVEREIRO 2026',
    theme: 'POSICIONAMENTO TÉCNICO',
    objective: 'Preparar o mercado, estabelecer base técnica sólida e reforçar a Next Safety como referência em proteção das mãos.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Risco, Aplicação, Ambiente, Institucional'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Técnico, Analítico, Estratégico'
      ]
    },
    results: [
      'Frequência respeitada',
      'Dias respeitados',
      'Conteúdo específico por rede',
      'LinkedIn técnico e sério',
      'Instagram visual e educativo'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '02/02 – Segunda-feira',
            platform: 'meta',
            type: 'Estático / Carrossel',
            theme: 'O que observar antes de escolher uma luva de segurança',
            bullets: ['Foco em risco, aplicação e ambiente']
          },
          {
            day: '03/02 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto + imagem',
            theme: 'Critérios técnicos que devem guiar a escolha de luvas de segurança'
          },
          {
            day: '04/02 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – produto em uso)',
            theme: 'Proteção das mãos em aplicações reais',
            bullets: ['Luva em contexto industrial, sem vitrine']
          },
          {
            day: '05/02 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto analítico',
            theme: 'Por que tecnologia embarcada é um fator decisivo em EPIs de mãos'
          },
          {
            day: '06/02 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O papel da Next Safety na proteção das mãos no Brasil'
          },
          {
            day: '06/02 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post institucional',
            theme: 'Adaptado do post institucional de 06/02'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '09/02 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Diferença entre luvas de nitrila, PU e látex – quando usar cada uma'
          },
          {
            day: '10/02 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Materiais de luvas: impacto direto na segurança e produtividade'
          },
          {
            day: '11/02 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação com óleo/graxa)',
            theme: 'Luvas indicadas para ambientes com óleo e graxa'
          },
          {
            day: '12/02 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'O custo invisível de uma luva mal especificada'
          },
          {
            day: '13/02 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Por que conforto também é segurança no uso prolongado'
          },
          {
            day: '13/02 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 09/02 (materiais)',
            theme: 'Comparativo de materiais para decisores'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '16/02 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: '5 erros comuns no uso de luvas de segurança'
          },
          {
            day: '17/02 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Erros recorrentes que comprometem a proteção das mãos na indústria'
          },
          {
            day: '18/02 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto e destreza)',
            theme: 'Conforto, ajuste e redução de fadiga no trabalho manual'
          },
          {
            day: '19/02 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto consultivo',
            theme: 'Como decisões técnicas reduzem riscos operacionais'
          },
          {
            day: '20/02 – Sexta-feira',
            platform: 'meta',
            type: 'Estático produto + contexto',
            theme: 'Cada aplicação exige uma luva específica'
          },
          {
            day: '20/02 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 16/02',
            theme: 'Gestão de erros no uso de EPIs'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '23/02 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como saber se uma luva está vencida ou ineficaz'
          },
          {
            day: '24/02 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Critérios técnicos para substituição de EPIs de mãos'
          },
          {
            day: '25/02 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação mecânica)',
            theme: 'Proteção correta para riscos mecânicos reais'
          },
          {
            day: '26/02 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'O papel do distribuidor técnico na cadeia de segurança do trabalho'
          },
          {
            day: '27/02 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional estratégico',
            theme: 'Next Safety como parceira técnica do mercado brasileiro'
          },
          {
            day: '27/02 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post institucional de 27/02',
            theme: 'Parceria técnica e estratégica'
          }
        ]
      }
    ]
  },
  {
    month: 'MARÇO 2026',
    theme: 'AUTORIDADE & CONFIANÇA',
    objective: 'Aprofundar a credibilidade técnica da Next Safety, reforçando autoridade no mercado, critérios de escolha de luvas, diferenciação por tecnologia e preparação estratégica para o evento Proteminas (abril).',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Tecnologia, Critérios Técnicos, Aplicação Real'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Técnico, Analítico, Estratégico, Gestão'
      ]
    },
    results: [
      'Reforço de autoridade técnica',
      'Base preparada para Proteminas',
      'Consistência de mensagem',
      'Público educado sobre critérios técnicos'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '02/03 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel técnico',
            theme: 'Como avaliar tecnicamente uma luva de segurança (além do preço)'
          },
          {
            day: '03/03 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'O que diferencia uma luva comum de uma luva tecnicamente correta'
          },
          {
            day: '04/03 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação industrial)',
            theme: 'Tecnologia embarcada aplicada ao risco real'
          },
          {
            day: '05/03 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Como decisões técnicas reduzem acidentes e retrabalho'
          },
          {
            day: '06/03 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Por que a Next Safety atua como parceira técnica — não apenas fornecedora'
          },
          {
            day: '06/03 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post institucional',
            theme: 'Adaptado do post institucional de 06/03'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '09/03 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Principais erros na especificação de luvas de segurança'
          },
          {
            day: '10/03 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'O impacto da ergonomia das luvas na rotina industrial'
          },
          {
            day: '11/03 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto, destreza e ajuste)',
            theme: 'Por que ajuste e conforto impactam diretamente a segurança'
          },
          {
            day: '12/03 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto consultivo',
            theme: 'Segurança das mãos como parte da estratégia operacional'
          },
          {
            day: '13/03 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Tecnologia que trabalha a favor da produtividade'
          },
          {
            day: '13/03 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 09/03',
            theme: 'Adaptado do carrossel de 09/03'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '16/03 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como escolher a luva certa para cada tipo de risco'
          },
          {
            day: '17/03 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Riscos operacionais gerados por EPIs inadequados'
          },
          {
            day: '18/03 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação mecânica)',
            theme: 'Proteção mecânica aplicada ao dia a dia industrial'
          },
          {
            day: '19/03 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post analítico',
            theme: 'Critérios técnicos que fortalecem a tomada de decisão em SST'
          },
          {
            day: '20/03 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional técnico',
            theme: 'Autoridade técnica se constrói com critério e consistência'
          },
          {
            day: '20/03 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 16/03',
            theme: 'Adaptado do carrossel de 16/03'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '23/03 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Tecnologia nas luvas: o que realmente faz diferença no uso'
          },
          {
            day: '24/03 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Como a tecnologia aplicada às luvas evoluiu nos últimos anos'
          },
          {
            day: '25/03 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – ambiente com óleo/graxa)',
            theme: 'Desempenho técnico em ambientes críticos'
          },
          {
            day: '26/03 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Por que o mercado exige cada vez mais soluções técnicas em SST'
          },
          {
            day: '27/03 – Sexta-feira',
            platform: 'meta',
            type: 'Estático estratégico',
            theme: 'Preparação do mercado para novas soluções em proteção das mãos'
          },
          {
            day: '27/03 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 23/03',
            theme: 'Adaptado do post de 23/03'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '30/03 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel institucional',
            theme: 'Autoridade técnica construída com consistência'
          },
          {
            day: '31/03 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post de transição',
            theme: 'Preparação do mercado para o próximo nível: evento + educação (abril)'
          }
        ]
      }
    ]
  },
  {
    month: 'ABRIL 2026',
    theme: 'EVENTO + EDUCAÇÃO',
    objective: 'Aumentar visibilidade institucional e autoridade técnica da Next Safety por meio da Proteminas, conectando educação técnica, aplicações reais e posicionamento estratégico antes, durante e após o evento.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Evento, Tecnologia, Aplicação Real'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Técnico, Estratégico, Networking'
      ]
    },
    results: [
      'Visibilidade ampliada',
      'Conexão com mercado',
      'Autoridade técnica reforçada',
      'Público engajado com o evento'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '01/04 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações industriais diversas)',
            theme: 'Proteção das mãos começa com entendimento do risco'
          },
          {
            day: '02/04 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'O papel dos eventos técnicos na atualização profissional em SST'
          },
          {
            day: '03/04 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Por que eventos técnicos são fundamentais para a evolução da SST'
          },
          {
            day: '03/04 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 03/04 (Instagram)',
            theme: 'Adaptado do post de 03/04 (Instagram)'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '06/04 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Quais desafios técnicos o mercado de SST enfrenta hoje'
          },
          {
            day: '07/04 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como eventos fortalecem decisões técnicas mais seguras'
          },
          {
            day: '08/04 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – tecnologia aplicada às luvas)',
            theme: 'Tecnologia aplicada à proteção das mãos: o que mudou'
          },
          {
            day: '09/04 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'A importância da atualização técnica contínua em SST'
          },
          {
            day: '10/04 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Next Safety na Proteminas: conhecimento, tecnologia e diálogo técnico'
          },
          {
            day: '10/04 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 06/04',
            theme: 'Adaptado do carrossel de 06/04'
          }
        ]
      },
      {
        title: 'SEMANA 3 (PROTEMINAS)',
        days: [
          {
            day: '13/04 – Segunda-feira',
            platform: 'meta',
            type: 'Estático pré-evento',
            theme: 'Começa a Proteminas: tecnologia, proteção e troca de conhecimento'
          },
          {
            day: '14/04 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional estratégico',
            theme: 'A Proteminas como ponto de encontro técnico do setor de SST'
          },
          {
            day: '15/04 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações industriais)',
            theme: 'Proteção das mãos na prática: aplicações que exigem precisão técnica'
          },
          {
            day: '16/04 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'O que aprendemos ao conversar com profissionais de diferentes segmentos'
          },
          {
            day: '17/04 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Conexão com o mercado: ouvir, entender e evoluir soluções'
          },
          {
            day: '17/04 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 13/04',
            theme: 'Adaptado do post de 13/04'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '20/04 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Principais aprendizados técnicos da Proteminas'
          },
          {
            day: '21/04 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como transformar aprendizados de eventos em decisões práticas'
          },
          {
            day: '22/04 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – foco em tecnologia e conforto)',
            theme: 'Conforto e desempenho como fatores críticos de segurança'
          },
          {
            day: '23/04 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Eventos como aceleradores de maturidade técnica em SST'
          },
          {
            day: '24/04 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O que fica após um evento técnico: aprendizado aplicado'
          },
          {
            day: '24/04 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 20/04',
            theme: 'Adaptado do carrossel de 20/04'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '27/04 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel institucional',
            theme: 'Educação técnica contínua: o compromisso da Next Safety'
          },
          {
            day: '28/04 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post de transição',
            theme: 'Abril encerra, maio começa: SST no centro das decisões técnicas'
          }
        ]
      }
    ]
  },
  {
    month: 'MAIO 2026',
    theme: 'SST EM FOCO (MÊS FORTE)',
    objective: 'Consolidar a Next Safety como referência técnica nacional em SST, conectando educação estratégica, presença em eventos-chave e posicionamento institucional de alto nível junto a técnicos, distribuidores e decisores.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: SST, Risco Real, Decisão Técnica'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Responsabilidade Profissional, Estratégia, Eventos'
      ]
    },
    results: [
      'Autoridade máxima em SST',
      'Conexão com técnicos e decisores',
      'Forte presença nos eventos',
      'Engajamento qualificado'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '01/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST não é obrigação. É responsabilidade técnica.'
          },
          {
            day: '01/05 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post institucional',
            theme: 'O papel estratégico da SST nas organizações modernas'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '04/05 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'SST começa no entendimento correto dos riscos'
          },
          {
            day: '05/05 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Decisão técnica em SST: onde muitos erram'
          },
          {
            day: '06/05 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações industriais diversas)',
            theme: 'Risco real exige proteção correta'
          },
          {
            day: '07/05 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Responsabilidade técnica vai além da norma'
          },
          {
            day: '08/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'A diferença entre EPI escolhido e EPI correto'
          },
          {
            day: '08/05 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 04/05',
            theme: 'Adaptado do carrossel de 04/05'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '11/05 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como avaliar um EPI além da ficha técnica'
          },
          {
            day: '12/05 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Critérios técnicos que definem uma boa escolha de EPI'
          },
          {
            day: '13/05 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – foco em conforto, precisão e segurança)',
            theme: 'Conforto também é segurança'
          },
          {
            day: '14/05 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Quando a SST é levada a sério, os resultados aparecem'
          },
          {
            day: '15/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST como pilar de produtividade e continuidade operacional'
          },
          {
            day: '15/05 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 11/05',
            theme: 'Adaptado do post de 11/05'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '18/05 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'O que esperar dos grandes eventos de SST em 2026'
          },
          {
            day: '19/05 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'Eventos como catalisadores da evolução técnica em SST'
          },
          {
            day: '20/05 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações críticas)',
            theme: 'Ambientes críticos exigem soluções técnicas'
          },
          {
            day: '21/05 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Atualização técnica contínua: um dever profissional'
          },
          {
            day: '22/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST em foco: conhecimento que move decisões'
          },
          {
            day: '22/05 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 18/05',
            theme: 'Adaptado do carrossel de 18/05'
          }
        ]
      },
      {
        title: 'SEMANA 5 (PREVENSUL + EVENTOS)',
        days: [
          {
            day: '25/05 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Semana decisiva para a SST no Brasil'
          },
          {
            day: '26/05 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'A força dos encontros técnicos para o futuro da SST'
          },
          {
            day: '27/05 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – tecnologia aplicada)',
            theme: 'Tecnologia como aliada da segurança'
          },
          {
            day: '28/05 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'O futuro da SST passa por decisões melhores hoje'
          },
          {
            day: '29/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST se constrói com diálogo, técnica e responsabilidade'
          },
          {
            day: '29/05 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 25/05',
            theme: 'Adaptado do post de 25/05'
          }
        ]
      }
    ]
  },
  {
    month: 'JUNHO 2026',
    theme: 'CONSOLIDAÇÃO TÉCNICA',
    objective: 'Consolidar todo o conhecimento, autoridade e visibilidade construídos nos meses anteriores, transformando presença em eventos e educação técnica em posicionamento sólido, confiável e maduro da Next Safety como referência nacional em proteção das mãos.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Pós-evento, Aprendizado, Maturidade'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Técnico, Estratégico, Exclusividade'
      ]
    },
    results: [
      'Marca sólida',
      'Discurso maduro',
      'Reforço da exclusividade ATG',
      'Sem repetição de discurso'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '01/06 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O que os grandes eventos de SST nos ensinam'
          },
          {
            day: '02/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Eventos técnicos como fonte real de evolução em SST'
          },
          {
            day: '03/06 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações industriais variadas)',
            theme: 'Proteção correta nasce do entendimento do risco'
          },
          {
            day: '04/06 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'O papel das empresas na maturidade do mercado de SST'
          },
          {
            day: '05/06 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Da teoria à prática: como o conhecimento vira proteção real'
          },
          {
            day: '05/06 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 01/06',
            theme: 'Adaptado do post de 01/06'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '08/06 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como interpretar aprendizados técnicos e aplicar no dia a dia'
          },
          {
            day: '09/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Critérios técnicos que realmente importam na escolha de EPIs'
          },
          {
            day: '10/06 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – foco em conforto e precisão)',
            theme: 'Conforto também é critério técnico'
          },
          {
            day: '11/06 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Por que consolidar conhecimento é tão importante quanto inovar'
          },
          {
            day: '12/06 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Segurança real exige critérios claros'
          },
          {
            day: '12/06 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 08/06',
            theme: 'Adaptado do carrossel de 08/06'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '15/06 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Tecnologias embarcadas: o que realmente faz diferença'
          },
          {
            day: '16/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'Exclusividade técnica: o papel da Next Safety no Brasil'
          },
          {
            day: '17/06 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações críticas)',
            theme: 'Quando tecnologia e segurança caminham juntas'
          },
          {
            day: '18/06 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Tecnologia aplicada como diferencial competitivo em SST'
          },
          {
            day: '19/06 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Exclusividade que se traduz em desempenho'
          },
          {
            day: '19/06 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 15/06',
            theme: 'Adaptado do post de 15/06'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '22/06 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'SST não é tendência: é processo contínuo'
          },
          {
            day: '23/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'A maturidade da SST nas empresas brasileiras'
          },
          {
            day: '24/06 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de uso)',
            theme: 'Proteção das mãos como parte da estratégia operacional'
          },
          {
            day: '25/06 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto institucional',
            theme: 'Construindo uma cultura de segurança sólida e contínua'
          },
          {
            day: '26/06 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Decisões técnicas constroem ambientes mais seguros'
          },
          {
            day: '26/06 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 22/06',
            theme: 'Adaptado do carrossel de 22/06'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '29/06 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Consolidar conhecimento é proteger melhor'
          },
          {
            day: '30/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Encerrando um ciclo de consolidação técnica em SST'
          }
        ]
      }
    ]
  },
  {
    month: 'JULHO 2026',
    theme: 'EDUCAÇÃO CONTÍNUA',
    objective: 'Aprofundar o conhecimento técnico do público, reforçando a Next Safety como referência em educação aplicada à proteção das mãos, com conteúdos evergreen, técnicos e de alto valor — sem ruído comercial e sem repetição de discurso.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Educação, Evergreen, Técnica'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Maturidade, Estratégia, Educação'
      ]
    },
    results: [
      'Alto valor técnico',
      'Baixo ruído comercial',
      'Conteúdo perene',
      'Reforço de autoridade'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '01/07 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – múltiplas aplicações industriais)',
            theme: 'Por que educação técnica é a base da segurança no trabalho'
          },
          {
            day: '02/07 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Educação contínua como pilar da maturidade em SST'
          },
          {
            day: '03/07 – Sexta-feira',
            platform: 'meta',
            type: 'Estático educacional',
            theme: 'Proteção eficiente começa pelo entendimento do risco'
          },
          {
            day: '03/07 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do vídeo de 01/07',
            theme: 'Adaptado do vídeo de 01/07'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '06/07 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Riscos combinados: quando um único EPI não é suficiente'
          },
          {
            day: '07/07 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'O desafio dos riscos combinados na indústria moderna'
          },
          {
            day: '08/07 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – ambientes críticos)',
            theme: 'Como identificar riscos simultâneos nas mãos'
          },
          {
            day: '09/07 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Decisões técnicas mais inteligentes começam pela análise correta do risco'
          },
          {
            day: '10/07 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Corte, abrasão, impacto e calor: como pensar em conjunto'
          },
          {
            day: '10/07 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 06/07',
            theme: 'Adaptado do carrossel de 06/07'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '13/07 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como transformar normas e testes em decisões práticas'
          },
          {
            day: '14/07 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Da norma à aplicação: o papel da educação técnica'
          },
          {
            day: '15/07 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – foco em conforto e uso prolongado)',
            theme: 'Conforto também é critério técnico'
          },
          {
            day: '16/07 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto institucional',
            theme: 'Educação como diferencial competitivo em SST'
          },
          {
            day: '17/07 – Sexta-feira',
            platform: 'meta',
            type: 'Estático educacional',
            theme: 'Erros comuns na escolha de luvas de segurança'
          },
          {
            day: '17/07 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 13/07',
            theme: 'Adaptado do post de 13/07'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '20/07 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Critérios técnicos que nunca mudam na proteção das mãos'
          },
          {
            day: '21/07 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Conteúdo evergreen: construindo autoridade no longo prazo'
          },
          {
            day: '22/07 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de uso diário)',
            theme: 'Segurança das mãos no dia a dia industrial'
          },
          {
            day: '23/07 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Por que a educação contínua sustenta a segurança operacional'
          },
          {
            day: '24/07 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Proteção correta é resultado de conhecimento acumulado'
          },
          {
            day: '24/07 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 20/07',
            theme: 'Adaptado do carrossel de 20/07'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '27/07 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Educação contínua é compromisso com a segurança'
          },
          {
            day: '28/07 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'Encerrando um mês de educação e maturidade técnica'
          },
          {
            day: '29/07 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – encerramento conceitual)',
            theme: 'Quando conhecimento vira proteção real'
          },
          {
            day: '30/07 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Preparando o mercado para aplicações mais específicas'
          },
          {
            day: '31/07 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Segurança sólida se constrói com constância'
          },
          {
            day: '31/07 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 27/07',
            theme: 'Adaptado do post de 27/07'
          }
        ]
      }
    ]
  },
  {
    month: 'AGOSTO 2026',
    theme: 'PRODUTO COM CONTEXTO (VENDA CONSULTIVA)',
    objective: 'Apresentar produtos e tecnologias da Next Safety de forma consultiva e técnica, conectando cada solução a riscos reais, aplicações específicas e critérios de escolha — sem discurso comercial direto.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Produto, Aplicação, Tecnologia'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Venda Consultiva, Estratégia, Decisão Técnica'
      ]
    },
    results: [
      'Produto sem "vitrine"',
      'Venda consultiva',
      'Conexão risco-solução',
      'Educação aplicada'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '03/08 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Produto não é genérico: por que cada risco exige uma solução específica'
          },
          {
            day: '04/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Por que a escolha do produto impacta diretamente a segurança operacional'
          },
          {
            day: '05/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – luva em aplicação real)',
            theme: 'Quando a luva certa reduz riscos invisíveis'
          },
          {
            day: '06/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Venda consultiva em EPIs: o papel do conhecimento técnico'
          },
          {
            day: '07/08 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Critérios técnicos antes de definir um modelo de luva'
          },
          {
            day: '07/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 03/08',
            theme: 'Adaptado do carrossel de 03/08'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '10/08 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Luvas para ambientes com óleo, graxa e umidade: o que observar'
          },
          {
            day: '11/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Ambientes críticos exigem EPIs tecnicamente adequados'
          },
          {
            day: '12/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação com óleo/graxa)',
            theme: 'Grip e segurança em ambientes escorregadios'
          },
          {
            day: '13/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto consultivo',
            theme: 'Aplicação correta evita substituições prematuras de EPI'
          },
          {
            day: '14/08 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Por que o banho da luva faz diferença na aplicação'
          },
          {
            day: '14/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 10/08',
            theme: 'Adaptado do carrossel de 10/08'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '17/08 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Tecnologia embarcada: o que realmente importa no uso diário'
          },
          {
            day: '18/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Tecnologia aplicada como diferencial na proteção das mãos'
          },
          {
            day: '19/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto, ajuste e respirabilidade)',
            theme: 'Conforto prolongado também é segurança'
          },
          {
            day: '20/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Inovação em EPIs precisa resolver problemas reais'
          },
          {
            day: '21/08 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional técnico',
            theme: 'Quando tecnologia melhora produtividade e proteção'
          },
          {
            day: '21/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 17/08',
            theme: 'Adaptado do carrossel de 17/08'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '24/08 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Como escolher a luva certa considerando riscos combinados'
          },
          {
            day: '25/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Riscos combinados e o desafio da escolha correta de EPIs'
          },
          {
            day: '26/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – múltiplas aplicações industriais)',
            theme: 'Uma luva não resolve tudo: pensando em proteção combinada'
          },
          {
            day: '27/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Produto certo reduz custo operacional e risco jurídico'
          },
          {
            day: '28/08 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Decisão técnica correta começa na análise do risco'
          },
          {
            day: '28/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 24/08',
            theme: 'Adaptado do carrossel de 24/08'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '31/08 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Produto com contexto é proteção eficiente'
          },
          {
            day: '01/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post de transição',
            theme: 'Agosto encerra: preparando o mercado para aplicações por setor'
          }
        ]
      }
    ]
  },
  {
    month: 'SETEMBRO 2026',
    theme: 'APLICAÇÕES POR SETOR (INDÚSTRIA, MANUTENÇÃO, QUÍMICA, LOGÍSTICA)',
    objective: 'Demonstrar, de forma técnica e aplicada, como a escolha correta da luva varia conforme o setor, o risco e a operação, reforçando o papel da Next Safety como parceira técnica na especificação de EPIs.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Setorização, Aplicação, Risco Específico'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Análise Técnica, Estratégia, Gestão de EPIs'
      ]
    },
    results: [
      'Conexão com setores específicos',
      'Autoridade em aplicações críticas',
      'Suporte ao evento SulSST',
      'Percepção de especialista'
    ],
    weeks: [
      {
        title: 'SEMANA 1',
        days: [
          {
            day: '01/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'A importância da análise setorial na escolha de EPIs'
          },
          {
            day: '02/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – diferentes ambientes industriais)',
            theme: 'Cada setor apresenta riscos diferentes para as mãos'
          },
          {
            day: '03/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Setores diferentes exigem abordagens técnicas diferentes'
          },
          {
            day: '04/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Por que não existe uma luva “universal”'
          },
          {
            day: '04/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 04/09 (Instagram)',
            theme: 'Adaptado do post de 04/09 (Instagram)'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '07/09 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Luvas para manutenção industrial: o que considerar'
          },
          {
            day: '08/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Manutenção industrial e os riscos mais negligenciados às mãos'
          },
          {
            day: '09/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação mecânica)',
            theme: 'Proteção mecânica em atividades de manutenção'
          },
          {
            day: '10/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto consultivo',
            theme: 'Como especificar EPIs corretamente para equipes de manutenção'
          },
          {
            day: '11/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Corte, abrasão, impacto e calor: riscos comuns na manutenção'
          },
          {
            day: '11/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 07/09',
            theme: 'Adaptado do carrossel de 07/09'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '14/09 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Proteção das mãos na linha de produção industrial'
          },
          {
            day: '15/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'EPIs e produtividade: uma relação direta na indústria'
          },
          {
            day: '16/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – uso contínuo e precisão)',
            theme: 'Conforto e precisão na produção industrial'
          },
          {
            day: '17/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Como a escolha correta de EPIs reduz paradas operacionais'
          },
          {
            day: '18/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Produtividade também depende da luva correta'
          },
          {
            day: '18/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 14/09',
            theme: 'Adaptado do carrossel de 14/09'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '21/09 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Luvas para ambientes químicos: riscos e cuidados'
          },
          {
            day: '22/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Desafios da proteção das mãos em ambientes químicos'
          },
          {
            day: '23/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – contato com líquidos/químicos)',
            theme: 'Proteção química começa pela escolha correta do material'
          },
          {
            day: '24/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Critérios técnicos para EPIs em ambientes de alto risco'
          },
          {
            day: '25/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST aplicada aos ambientes mais críticos'
          },
          {
            day: '25/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 21/09',
            theme: 'Adaptado do carrossel de 21/09'
          }
        ]
      },
      {
        title: 'SEMANA 5',
        days: [
          {
            day: '28/09 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Aprendizados técnicos que fortalecem a SST'
          },
          {
            day: '29/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'A importância do SulSST para o avanço técnico da SST no Brasil'
          },
          {
            day: '30/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de aplicações)',
            theme: 'Proteção das mãos como estratégia por setor'
          }
        ]
      }
    ]
  },
  {
    month: 'OUTUBRO 2026',
    theme: 'FISP — AUTORIDADE, TECNOLOGIA E POSICIONAMENTO',
    objective: 'Reforçar a Next Safety como referência técnica nacional em proteção das mãos, aproveitando a FISP para consolidar autoridade, apresentar tecnologia aplicada e fortalecer o posicionamento institucional perante o mercado.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: FISP, Tecnologia, Autoridade'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Posicionamento, Estratégia, Evento'
      ]
    },
    results: [
      'Autoridade consolidada',
      'Liderança de mercado',
      'Conexão técnica',
      'Visibilidade nacional'
    ],
    weeks: [
      {
        title: 'SEMANA 1 — PRÉ-FISP (EXPECTATIVA & CONTEXTO)',
        days: [
          {
            day: '01/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional estratégico',
            theme: 'A importância da FISP para a evolução técnica da SST no Brasil'
          },
          {
            day: '02/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Por que a FISP é o principal encontro de SST do país'
          },
          {
            day: '02/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post institucional de 02/10',
            theme: 'Adaptado do post institucional de 02/10'
          }
        ]
      },
      {
        title: 'SEMANA 2 — PRÉ-FISP (AQUECIMENTO TÉCNICO)',
        days: [
          {
            day: '05/10 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Quais temas técnicos ganham destaque na FISP'
          },
          {
            day: '06/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como grandes eventos moldam o futuro da SST'
          },
          {
            day: '07/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações industriais diversas)',
            theme: 'Tecnologia aplicada à proteção das mãos: o que o mercado busca hoje'
          },
          {
            day: '08/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Por que a atualização técnica é indispensável em SST'
          },
          {
            day: '09/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'FISP: tecnologia, proteção e decisões técnicas'
          },
          {
            day: '09/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 05/10',
            theme: 'Adaptado do carrossel de 05/10'
          }
        ]
      },
      {
        title: 'SEMANA 3 — DURANTE A FISP',
        days: [
          {
            day: '12/10 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Conexões técnicas que fortalecem a segurança no trabalho'
          },
          {
            day: '13/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'O papel da FISP na consolidação da cultura de segurança'
          },
          {
            day: '14/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicações críticas e tecnologia)',
            theme: 'Proteção das mãos na prática: o que exige alto desempenho'
          },
          {
            day: '15/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto técnico',
            theme: 'Principais aprendizados técnicos que a FISP reforça ao mercado'
          },
          {
            day: '16/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Quando conhecimento e tecnologia se encontram'
          },
          {
            day: '16/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 12/10',
            theme: 'Adaptado do post de 12/10'
          }
        ]
      },
      {
        title: 'SEMANA 4 — PÓS-FISP (CONSOLIDAÇÃO)',
        days: [
          {
            day: '19/10 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'O que a FISP reforça sobre a proteção das mãos'
          },
          {
            day: '20/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como transformar aprendizados da FISP em decisões práticas'
          },
          {
            day: '21/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto, precisão e uso prolongado)',
            theme: 'Conforto e desempenho como fatores críticos de segurança'
          },
          {
            day: '22/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Eventos como catalisadores da maturidade em SST'
          },
          {
            day: '23/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O que fica após o maior evento de SST do país'
          },
          {
            day: '23/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 19/10',
            theme: 'Adaptado do carrossel de 19/10'
          }
        ]
      },
      {
        title: 'SEMANA 5 — FECHAMENTO DO MÊS',
        days: [
          {
            day: '26/10 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Autoridade técnica se constrói com constância'
          },
          {
            day: '27/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'O impacto da FISP no posicionamento técnico das empresas'
          },
          {
            day: '28/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de aplicações)',
            theme: 'Proteção das mãos como estratégia contínua'
          },
          {
            day: '29/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto de transição',
            theme: 'Do evento à prática: como o mercado evolui após a FISP'
          },
          {
            day: '30/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Encerrando um ciclo de autoridade técnica em 2026'
          },
          {
            day: '30/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 26/10',
            theme: 'Adaptado do post de 26/10'
          }
        ]
      }
    ]
  },
  {
    month: 'NOVEMBRO 2026',
    theme: 'CONSOLIDAÇÃO & VISÃO DE FUTURO EM SST',
    objective: 'Consolidar todo o posicionamento técnico construído ao longo de 2026, reforçando a Next Safety como referência madura em proteção das mãos e abrindo espaço para reflexões sobre o futuro da SST, sem caráter promocional ou comercial.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Autoridade, Estratégia, Futuro'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Maturidade, Análise, Visão de Longo Prazo'
      ]
    },
    results: [
      'Autoridade silenciosa',
      'Marca madura',
      'Visão de longo prazo',
      'Consistência técnica'
    ],
    weeks: [
      {
        title: 'SEMANA 1 — FECHAMENTO DE CICLO',
        days: [
          {
            day: '02/11 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O que 2026 reforçou sobre a importância da segurança das mãos'
          },
          {
            day: '03/11 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'As principais lições técnicas que 2026 deixa para a SST'
          },
          {
            day: '04/11 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – múltiplas aplicações industriais)',
            theme: 'Proteção correta é resultado de decisões técnicas consistentes'
          },
          {
            day: '05/11 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto analítico',
            theme: 'Como a maturidade técnica reduz riscos operacionais'
          },
          {
            day: '06/11 – Sexta-feira',
            platform: 'meta',
            type: 'Estático técnico',
            theme: 'Quando conhecimento acumulado vira proteção real'
          },
          {
            day: '06/11 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 02/11',
            theme: 'Adaptado do post de 02/11'
          }
        ]
      },
      {
        title: 'SEMANA 2 — MATURIDADE TÉCNICA',
        days: [
          {
            day: '09/11 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Critérios técnicos que permanecem relevantes ao longo do tempo'
          },
          {
            day: '10/11 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Por que critérios técnicos não podem ser flexibilizados em SST'
          },
          {
            day: '11/11 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto, ergonomia e uso prolongado)',
            theme: 'Conforto e segurança como pilares da produtividade'
          },
          {
            day: '12/11 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Maturidade técnica como diferencial competitivo'
          },
          {
            day: '13/11 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST madura é construída com consistência, não com atalhos'
          },
          {
            day: '13/11 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 09/11',
            theme: 'Adaptado do carrossel de 09/11'
          }
        ]
      },
      {
        title: 'SEMANA 3 — VISÃO DE FUTURO',
        days: [
          {
            day: '16/11 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel educacional',
            theme: 'Tendências técnicas em proteção das mãos para os próximos anos'
          },
          {
            day: '17/11 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'O futuro da SST passa por decisões mais técnicas e responsáveis'
          },
          {
            day: '18/11 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – tecnologia aplicada)',
            theme: 'Como a tecnologia continuará evoluindo a proteção das mãos'
          },
          {
            day: '19/11 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto analítico',
            theme: 'O papel das empresas na evolução técnica da SST no Brasil'
          },
          {
            day: '20/11 – Sexta-feira',
            platform: 'meta',
            type: 'Estático estratégico',
            theme: 'O futuro da SST exige decisões mais técnicas hoje'
          },
          {
            day: '20/11 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 16/11',
            theme: 'Adaptado do carrossel de 16/11'
          }
        ]
      },
      {
        title: 'SEMANA 4 — POSICIONAMENTO FINAL DO ANO',
        days: [
          {
            day: '23/11 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel institucional',
            theme: 'Autoridade técnica se constrói ao longo do tempo'
          },
          {
            day: '24/11 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'Consolidando um ano de autoridade técnica em SST'
          },
          {
            day: '25/11 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de aplicações industriais)',
            theme: 'Proteção das mãos como parte da estratégia operacional'
          },
          {
            day: '26/11 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto de fechamento estratégico',
            theme: 'O que a maturidade técnica representa para o futuro da SST'
          },
          {
            day: '27/11 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Encerrando o ano com maturidade técnica e responsabilidade'
          },
          {
            day: '27/11 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 23/11',
            theme: 'Adaptado do post de 23/11'
          }
        ]
      },
      {
        title: 'SEMANA 5 — TRANSIÇÃO PARA DEZEMBRO',
        days: [
          {
            day: '30/11 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Preparando o caminho para um novo ciclo em SST'
          },
          {
            day: '01/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post de transição',
            theme: 'Encerramos um ciclo. Começamos outro com mais consciência técnica.'
          }
        ]
      }
    ]
  },
  {
    month: 'DEZEMBRO 2026',
    theme: 'ENCERRAMENTO DE CICLO & POSICIONAMENTO INSTITUCIONAL',
    objective: 'Encerrar 2026 reforçando a Next Safety como uma marca sólida, técnica e confiável, valorizando o conhecimento construído ao longo do ano e preparando o terreno para um novo ciclo em 2027.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Memória institucional, Confiança, Continuidade'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Visão de longo prazo, Maturidade'
      ]
    },
    results: [
      'Marca sólida',
      'Discurso maduro',
      'Preparação para 2027',
      'Confiança técnica'
    ],
    weeks: [
      {
        title: 'SEMANA 1 — FECHAMENTO DO ANO TÉCNICO',
        days: [
          {
            day: '01/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: '2026 reforçou um princípio: segurança se constrói com critério técnico'
          },
          {
            day: '02/12 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão macro de aplicações industriais)',
            theme: 'Um ano de decisões técnicas que protegeram pessoas'
          },
          {
            day: '03/12 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto analítico',
            theme: 'O amadurecimento da SST no Brasil ao longo de 2026'
          },
          {
            day: '04/12 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O que aprendemos sobre segurança das mãos em 2026'
          },
          {
            day: '04/12 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 04/12 (Instagram)',
            theme: 'Adaptado do post de 04/12 (Instagram)'
          }
        ]
      },
      {
        title: 'SEMANA 2 — VALOR DA CONSTÂNCIA',
        days: [
          {
            day: '07/12 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Constância técnica é o que sustenta a segurança no longo prazo'
          },
          {
            day: '08/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Por que constância importa mais do que tendências em SST'
          },
          {
            day: '09/12 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – conforto, uso contínuo, proteção real)',
            theme: 'Proteção das mãos vai além do produto'
          },
          {
            day: '10/12 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto institucional',
            theme: 'Construir confiança técnica é um trabalho contínuo'
          },
          {
            day: '11/12 – Sexta-feira',
            platform: 'meta',
            type: 'Estático estratégico',
            theme: 'Quando a segurança é tratada como prioridade, os resultados aparecem'
          },
          {
            day: '11/12 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do post de 07/12',
            theme: 'Adaptado do post de 07/12'
          }
        ]
      },
      {
        title: 'SEMANA 3 — TRANSIÇÃO DE CICLO',
        days: [
          {
            day: '14/12 – Segunda-feira',
            platform: 'meta',
            type: 'Carrossel institucional',
            theme: 'O que permanece quando um ano termina'
          },
          {
            day: '15/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Encerrando um ciclo de aprendizado e evolução técnica'
          },
          {
            day: '16/12 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – visão conceitual de proteção)',
            theme: 'Proteção das mãos como compromisso contínuo'
          },
          {
            day: '17/12 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto de transição',
            theme: 'O que levamos de 2026 para o próximo ciclo da SST'
          },
          {
            day: '18/12 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Encerramos 2026 com maturidade técnica'
          },
          {
            day: '18/12 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Adaptado do carrossel de 14/12',
            theme: 'Adaptado do carrossel de 14/12'
          }
        ]
      },
      {
        title: 'SEMANA 4 — MENSAGEM DE FIM DE ANO',
        days: [
          {
            day: '21/12 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Proteção é compromisso com a vida'
          },
          {
            day: '22/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional',
            theme: 'Encerramos o ano com responsabilidade e visão de futuro'
          },
          {
            day: '23/12 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – mensagem conceitual de encerramento)',
            theme: 'Seguimos protegendo o que importa'
          },
          {
            day: '28/12 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: '2027 começa com o mesmo compromisso: segurança real'
          },
          {
            day: '29/12 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post de fechamento',
            theme: 'O próximo ciclo começa com decisões ainda mais conscientes'
          }
        ]
      }
    ]
  }
];

export const AD_SETS: AdSetData[] = [];
