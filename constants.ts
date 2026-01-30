
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
      function: 'Conexão técnica regional (SulSST)',
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
      title: 'FISP — AUTORIDADE NACIONAL E POSICIONAMENTO',
      function: 'Consolidar autoridade nacional',
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
    schedule: 'Terça, Quinta e Sexta',
    description: 'Foco total em qualidade e exclusividade. Sexta-feira para reaproveitamento estratégico.',
    bestDays: [
      {
        day: 'Terça',
        reason: ['Maior taxa de engajamento técnico (Conteúdo Exclusivo)']
      },
      {
        day: 'Quinta',
        reason: ['Bom alcance e leitura profunda (Conteúdo Exclusivo)']
      },
      {
        day: 'Sexta',
        reason: ['Reforço de mensagem (Conteúdo Adaptado/Reaproveitado)']
      }
    ],
    tip: 'A prioridade de Terça e Quinta segue sendo conteúdo 100% exclusivo e técnico. Sexta-feira é utilizada para adaptar os melhores conteúdos visuais do Instagram para o público B2B.'
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
    content: 'Conteúdo exclusivo (Estratégico / Mercado)'
  },
  {
    day: 'Sexta',
    platforms: 'Insta/Face + LinkedIn',
    content: 'Institucional / Produto (Meta) + Adaptação (LinkedIn)'
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
        'Foco: Produtividade, Custo, Tecnologia'
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
            type: 'Texto técnico',
            theme: 'O papel da segurança das mãos na produtividade industrial'
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
            theme: 'Por que tecnologia em EPI impacta diretamente o custo operacional'
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
            type: 'Post adaptado',
            theme: 'Tecnologia aplicada às luvas de segurança'
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
            theme: 'Segurança das mãos como indicador de maturidade em SST'
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
            theme: 'Como a escolha correta da luva reduz afastamentos e retrabalho'
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
            type: 'Post adaptado',
            theme: 'Aplicações reais de luvas técnicas em ambientes industriais'
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
            theme: 'O que diferencia um fornecedor técnico de um fornecedor comum'
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
            theme: 'O impacto das certificações internacionais na decisão de compra'
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
            type: 'Post adaptado',
            theme: 'Conteúdo educacional reaproveitado do Instagram'
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
            theme: 'Por que EPIs não devem ser tratados como commodities'
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
            theme: 'Tendências globais em proteção de mãos'
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
            type: 'Post adaptado',
            theme: 'Post adaptado de produto ATG'
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
        'Foco: Educação técnica, Tomada de decisão, Gestão'
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
            theme: 'Como avaliar riscos antes de escolher uma luva de segurança'
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
            theme: 'O erro mais comum na especificação de EPIs de mãos'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento educacional do Instagram'
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
            theme: 'Diferença entre proteção mecânica, térmica e química'
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
            theme: 'Por que normas existem — e por que devem ser respeitadas'
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
            type: 'Post adaptado',
            theme: 'Post adaptado sobre aplicações práticas'
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
            theme: 'Como EPIs influenciam indicadores de segurança da empresa'
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
            theme: 'O papel do gestor de SST na escolha correta de luvas'
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
            type: 'Post adaptado',
            theme: 'Conteúdo de produto reaproveitado'
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
            theme: 'A importância do treinamento aliado ao EPI correto'
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
            theme: 'Como interpretar informações técnicas de uma luva'
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
            type: 'Post adaptado',
            theme: 'Post educacional do Instagram'
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
        'Foco: Eventos técnicos, Networking, Atualização'
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
            theme: 'Por que acompanhar eventos do setor é estratégico'
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
            type: 'Post adaptado',
            theme: 'Post institucional reaproveitado'
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
            theme: 'A importância das feiras técnicas para evolução da SST'
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
            theme: 'Temas técnicos que ganham destaque na Proteminas'
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
            type: 'Post adaptado',
            theme: 'Conteúdo visual adaptado do Instagram'
          }
        ]
      },
      {
        title: 'SEMANA 3 (PROTEMINAS 14-16/04)',
        days: [
          {
            day: '13/04 – Segunda-feira',
            platform: 'meta',
            type: 'Estático pré-evento',
            theme: 'É amanhã: Proteminas reúne o setor para debater o futuro da proteção'
          },
          {
            day: '14/04 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional estratégico',
            theme: 'O setor de SST se encontra na Proteminas'
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
            theme: 'Como eventos ajudam a antecipar demandas do mercado'
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
            type: 'Post adaptado',
            theme: 'Post adaptado de consolidação'
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
            theme: 'O que os eventos técnicos revelam sobre o futuro da SST'
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
            theme: 'Conexão entre indústria, tecnologia e segurança'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento estratégico'
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
            theme: 'Aprendizados técnicos que permanecem após os eventos'
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
        'Foco: Inovação, Prevenção, Atualização técnica'
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
            type: 'Post adaptado',
            theme: 'Post educacional adaptado'
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
            theme: 'A prevenção como pilar da segurança do trabalho'
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
            theme: 'Inovação aplicada à rotina de SST'
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
            type: 'Post adaptado',
            theme: 'Conteúdo visual reaproveitado'
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
            theme: 'Como a tecnologia redefine a prevenção de acidentes'
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
            theme: 'O futuro da SST começa na escolha correta do EPI'
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
            type: 'Post adaptado',
            theme: 'Post institucional adaptado'
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
            theme: 'O setor de SST em movimento no Brasil'
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
            theme: 'Principais temas discutidos nos eventos técnicos'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento'
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
            theme: 'O que muda na SST após grandes encontros técnicos'
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
            theme: 'Como transformar conhecimento técnico em prática'
          },
          {
            day: '29/05 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'SST se constrói com diálogo, técnica e responsabilidade'
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
        'Foco: Exposeg, Tendências, Consolidação'
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
        title: 'SEMANA 1 (EXPOSEG 01-03/06)',
        days: [
          {
            day: '01/06 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Começa hoje a Exposeg: um marco para a SST no ano'
          },
          {
            day: '02/06 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'A importância da Exposeg para o setor de SST'
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
            theme: 'Tendências técnicas discutidas na Exposeg'
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
            type: 'Post adaptado',
            theme: 'Conteúdo adaptado do Instagram'
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
            theme: 'O que os grandes eventos ensinam sobre segurança'
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
            theme: 'Como antecipar riscos a partir de tendências do setor'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento'
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
            theme: 'Segurança como investimento estratégico'
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
            theme: 'A evolução das tecnologias de proteção de mãos'
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
            type: 'Post adaptado',
            theme: 'Post adaptado'
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
            theme: 'Consolidação técnica do primeiro semestre'
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
            theme: 'Como empresas maduras pensam SST'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento'
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
        'Foco: Aplicação correta, Especificação, Decisão'
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
            theme: 'Estratégia e especificação correta de EPIs'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento visual do Instagram'
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
            theme: 'Conteúdo técnico sobre aplicação correta de EPIs'
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
            theme: 'Tomada de decisão baseada em dados técnicos'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento visual do Instagram'
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
            theme: 'Aprofundamento em normas técnicas aplicadas'
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
            theme: 'Especificação técnica como diferencial competitivo'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento visual do Instagram'
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
            theme: 'Análise de risco e seleção de luvas'
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
            theme: 'Gestão de EPIs: durabilidade e troca'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento visual do Instagram'
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
            theme: 'Maturidade técnica na gestão de SST'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento visual do Instagram'
          }
        ]
      }
    ]
  },
  {
    month: 'AGOSTO 2026',
    theme: 'PRODUTO COM CONTEXTO',
    objective: 'Mostrar que tecnologia só faz sentido quando aplicada ao risco real, utilizando a FISP como pano de fundo conceitual (tendências e futuro) para reforçar a venda consultiva.',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Produto, Aplicação, Tecnologia'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Visão estratégica, Antecipação FISP'
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
            type: 'Estático',
            theme: 'Tecnologia em luvas só importa quando resolve o risco real'
          },
          {
            day: '04/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Produto sem contexto não gera valor em SST'
          },
          {
            day: '05/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – aplicação real)',
            theme: 'Como a tecnologia embarcada nas luvas impacta a segurança no dia a dia'
          },
          {
            day: '06/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Por que tecnologia aplicada virou critério decisório em segurança do trabalho'
          },
          {
            day: '07/08 – Sexta-feira',
            platform: 'meta',
            type: 'Carrossel',
            theme: 'Do laboratório ao chão de fábrica: como nasce uma luva de alto desempenho'
          },
          {
            day: '07/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Do laboratório ao chão de fábrica: como nasce uma luva de alto desempenho'
          }
        ]
      },
      {
        title: 'SEMANA 2',
        days: [
          {
            day: '10/08 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Por que não existe “luva genérica” para riscos industriais'
          },
          {
            day: '11/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como os critérios técnicos estão evoluindo na escolha de EPIs industriais'
          },
          {
            day: '12/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – ergonomia)',
            theme: 'O papel da ergonomia na produtividade e na segurança das mãos'
          },
          {
            day: '13/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'O papel da inovação responsável no futuro da SST'
          },
          {
            day: '14/08 – Sexta-feira',
            platform: 'meta',
            type: 'Carrossel',
            theme: 'Tecnologia que acompanha a evolução dos riscos industriais'
          },
          {
            day: '14/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Tecnologia que acompanha a evolução dos riscos industriais'
          }
        ]
      },
      {
        title: 'SEMANA 3',
        days: [
          {
            day: '17/08 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Quando conforto, proteção e durabilidade precisam andar juntos'
          },
          {
            day: '18/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'O que grandes feiras revelam sobre o futuro da proteção das mãos'
          },
          {
            day: '19/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – diferencial técnico)',
            theme: 'O que diferencia uma luva comum de uma luva de alta performance'
          },
          {
            day: '20/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Por que o setor de SST exige cada vez mais profundidade técnica'
          },
          {
            day: '21/08 – Sexta-feira',
            platform: 'meta',
            type: 'Carrossel',
            theme: 'Tendências globais em proteção das mãos na indústria'
          },
          {
            day: '21/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Inovação em EPI: o que está moldando o futuro da segurança industrial'
          }
        ]
      },
      {
        title: 'SEMANA 4',
        days: [
          {
            day: '24/08 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Produto bom é aquele que se adapta à realidade do trabalho'
          },
          {
            day: '25/08 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'FISP: por que ela se tornou o principal palco da SST no Brasil'
          },
          {
            day: '26/08 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – resultado final)',
            theme: 'Por que tecnologia aplicada faz diferença no resultado final'
          },
          {
            day: '27/08 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Como empresas técnicas se preparam para eventos que definem o mercado'
          },
          {
            day: '28/08 – Sexta-feira',
            platform: 'meta',
            type: 'Carrossel',
            theme: 'Inovação em EPI: o que está moldando o futuro da segurança industrial'
          },
          {
            day: '28/08 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Produto bom é aquele que se adapta à realidade do trabalho'
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
            theme: 'Encerrando o mês com foco na evolução técnica'
          }
        ]
      }
    ]
  },
  {
    month: 'SETEMBRO 2026',
    theme: 'AUTORIDADE REGIONAL',
    objective: 'Fortalecer a conexão com o mercado do Sul, usando o SulSST como palco central para demonstrar autoridade técnica, proximidade e liderança regional, preparando o terreno para o grande palco nacional (FISP).',
    overview: {
      meta: [
        'Segunda | Quarta | Sexta',
        'Foco: Regionalização, Setor Industrial, SulSST'
      ],
      linkedin: [
        'Terça | Quinta | Sexta (Reaproveitado)',
        'Foco: Conexão regional → FISP (regional → nacional)'
      ]
    },
    results: [
      'Conexão com mercado do Sul',
      'Autoridade em setores regionais',
      'Forte presença no SulSST',
      'Percepção de especialista'
    ],
    weeks: [
      {
        title: 'SEMANA 1 — CONSTRUÇÃO DE AUTORIDADE REGIONAL',
        days: [
          {
            day: '01/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Autoridade regional: o primeiro passo para liderança técnica nacional'
          },
          {
            day: '02/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – proximidade)',
            theme: 'Autoridade técnica começa estando próximo do mercado'
          },
          {
            day: '03/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Por que eventos regionais fortalecem a maturidade técnica da SST'
          },
          {
            day: '04/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'A força dos eventos regionais na evolução da SST'
          },
          {
            day: '04/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'A força dos eventos regionais na evolução da SST'
          }
        ]
      },
      {
        title: 'SEMANA 2 — CONEXÃO COM O SETOR',
        days: [
          {
            day: '07/09 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Conexão regional é mais do que presença: é escuta técnica'
          },
          {
            day: '08/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'A importância da escuta regional na evolução da SST'
          },
          {
            day: '09/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – troca técnica)',
            theme: 'O valor da troca técnica para a evolução da segurança do trabalho'
          },
          {
            day: '10/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'SulSST: quando o debate técnico ganha força regional'
          },
          {
            day: '11/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Por que o SulSST é um evento estratégico para a região Sul'
          },
          {
            day: '11/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Por que o SulSST é um evento estratégico para a região Sul'
          }
        ]
      },
      {
        title: 'SEMANA 3 — PRÉ-SulSST (AQUECIMENTO)',
        days: [
          {
            day: '14/09 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Na próxima semana, o setor de SST se encontra no Sul do país'
          },
          {
            day: '15/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Como eventos regionais fortalecem a base técnica do setor'
          },
          {
            day: '16/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – expectativa técnica)',
            theme: 'O que esperar de um grande encontro técnico regional'
          },
          {
            day: '17/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Do debate regional às decisões estratégicas em SST'
          },
          {
            day: '18/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Eventos regionais constroem o caminho para grandes palcos'
          },
          {
            day: '18/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Eventos regionais constroem o caminho para grandes palcos'
          }
        ]
      },
      {
        title: 'SEMANA 4 — SEMANA DO SulSST (EVENTO)',
        days: [
          {
            day: '21/09 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Esta semana, a SST ganha protagonismo no Sul do Brasil'
          },
          {
            day: '22/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'SulSST: quando o debate regional gera impacto real no setor'
          },
          {
            day: '23/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – avanço técnico)',
            theme: 'Por que eventos técnicos são fundamentais para o avanço da SST'
          },
          {
            day: '24/09 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'A importância estratégica do SulSST para a SST no Brasil'
          },
          {
            day: '25/09 – Sexta-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Hoje começa o SulSST: o setor reunido para evoluir'
          },
          {
            day: '25/09 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Hoje começa o SulSST: o setor reunido para evoluir'
          },
          {
            day: '27/09 – Sábado',
            platform: 'meta',
            type: 'Post Extra Evento',
            theme: 'Encerrando o SulSST: conexões técnicas que fortalecem o setor'
          },
          {
            day: '27/09 – Sábado',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post Extra Institucional',
            theme: 'SulSST reforça a importância da conexão técnica regional'
          }
        ]
      },
      {
        title: 'SEMANA 5 — TRANSIÇÃO PARA FISP',
        days: [
          {
            day: '28/09 – Segunda-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'O saldo do SulSST e o caminho para a FISP'
          },
          {
            day: '29/09 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Do regional ao nacional: o que o SulSST antecipou sobre a FISP'
          },
          {
            day: '30/09 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – convite/expectativa)',
            theme: 'Faltam poucos dias: a Next Safety na FISP 2026'
          }
        ]
      }
    ]
  },
  {
    month: 'OUTUBRO 2026',
    theme: 'FISP — AUTORIDADE NACIONAL E POSICIONAMENTO',
    objective: 'Consolidar a Next Safety como referência técnica nacional em proteção das mãos, utilizando a FISP (evento bienal) como o principal palco institucional do ano.',
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
        title: 'SEMANA 1 — PRÉ-FISP (AQUECIMENTO FINAL)',
        days: [
          {
            day: '01/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post institucional estratégico',
            theme: 'FISP: por que esse evento define os rumos da SST no país'
          },
          {
            day: '02/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Por que a FISP é o principal palco da SST no Brasil'
          },
          {
            day: '02/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Por que a FISP é o principal palco da SST no Brasil'
          }
        ]
      },
      {
        title: 'SEMANA 2 — SEMANA DA FISP (EVENTO)',
        days: [
          {
            day: '05/10 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Nesta semana, a SST se encontra no maior evento do setor'
          },
          {
            day: '06/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'FISP 2026: o ponto de encontro das decisões técnicas em SST'
          },
          {
            day: '07/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – tecnologia)',
            theme: 'Tecnologia, proteção e decisões técnicas ganham palco na FISP'
          },
          {
            day: '08/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'O papel da FISP na evolução técnica do mercado brasileiro'
          },
          {
            day: '09/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'FISP 2026: quando o setor se reúne para evoluir'
          },
          {
            day: '09/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'FISP 2026: quando o setor se reúne para evoluir'
          }
        ]
      },
      {
        title: 'SEMANA 3 — PÓS-FISP (CONSOLIDAÇÃO)',
        days: [
          {
            day: '12/10 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'O que a FISP reforça sobre o futuro da segurança do trabalho'
          },
          {
            day: '13/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'Principais aprendizados técnicos reforçados pela FISP'
          },
          {
            day: '14/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – tendências)',
            theme: 'Tendências técnicas que se consolidam após a FISP'
          },
          {
            day: '15/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Como transformar insights da FISP em decisões práticas'
          },
          {
            day: '16/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Quando conhecimento e tecnologia se encontram, o setor avança'
          },
          {
            day: '16/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'O que a FISP reforça sobre o futuro da segurança do trabalho'
          }
        ]
      },
      {
        title: 'SEMANA 4 — CONSOLIDAÇÃO DE AUTORIDADE',
        days: [
          {
            day: '19/10 – Segunda-feira',
            platform: 'meta',
            type: 'Estático',
            theme: 'Autoridade técnica se constrói com presença e consistência'
          },
          {
            day: '20/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post técnico',
            theme: 'O impacto da FISP no posicionamento técnico das empresas'
          },
          {
            day: '21/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – estratégia)',
            theme: 'Proteção das mãos como estratégia contínua nas operações'
          },
          {
            day: '22/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto estratégico',
            theme: 'Eventos como a FISP moldam a maturidade do setor'
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
            type: 'Post adaptado',
            theme: 'O que fica após o maior evento de SST do país'
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
            theme: 'A FISP termina, mas a evolução técnica continua'
          },
          {
            day: '27/10 – Terça-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Post estratégico',
            theme: 'Da FISP para o dia a dia: como o mercado evolui após o evento'
          },
          {
            day: '28/10 – Quarta-feira',
            platform: 'meta',
            type: 'Vídeo (IA – compromisso)',
            theme: 'Segurança das mãos: compromisso que vai além dos eventos'
          },
          {
            day: '29/10 – Quinta-feira',
            platform: 'linkedin',
            exclusive: true,
            type: 'Texto de transição',
            theme: 'Autoridade técnica não se constrói em um único evento'
          },
          {
            day: '30/10 – Sexta-feira',
            platform: 'meta',
            type: 'Estático institucional',
            theme: 'Encerrando outubro com liderança técnica consolidada'
          },
          {
            day: '30/10 – Sexta-feira',
            platform: 'linkedin',
            repurposed: true,
            type: 'Post adaptado',
            theme: 'Encerrando outubro com liderança técnica consolidada'
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
            type: 'Post técnico',
            theme: 'Aprendizados técnicos de 2026'
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
            type: 'Post estratégico',
            theme: 'O futuro da proteção das mãos'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento estratégico'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento estratégico'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento estratégico'
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
            type: 'Post adaptado',
            theme: 'Reaproveitamento estratégico'
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
            theme: 'Segurança como compromisso contínuo'
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
            theme: 'Visão técnica para o próximo ano'
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
            type: 'Post adaptado',
            theme: 'Conteúdo adaptado de retrospectiva'
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
            type: 'Post adaptado',
            theme: 'Conteúdo adaptado de retrospectiva'
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
            type: 'Post adaptado',
            theme: 'Conteúdo adaptado de retrospectiva'
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
