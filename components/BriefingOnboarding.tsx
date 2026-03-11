import React, { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Save, 
  Globe, 
  Target, 
  Users, 
  MessageSquare, 
  Zap,
  TrendingUp,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BriefingFormProps {
  onComplete?: () => void;
  isDashboardView?: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'grid';
  options?: string[];
  placeholder?: string;
  gridRows?: string[];
  gridColumns?: string[];
  allowOther?: boolean;
}

interface BriefingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  serviceRequired?: string;
  questions: Question[];
}

const SECTIONS: BriefingSection[] = [
  {
    id: 'publico_alvo',
    title: 'Análise de Público-alvo',
    description: 'Detalhe as características demográficas, comportamentais e psicográficas do seu público principal para uma estratégia de comunicação eficaz.',
    icon: <Users size={20} />,
    questions: [
      { 
        id: 'faixa_etaria', 
        text: '1. Faixa etária do seu público predominante', 
        type: 'radio',
        options: [
          'Jovem (18-24 anos)',
          'Jovem Adulto (25-34 anos)',
          'Adulto (35-44 anos)',
          'Meia-idade (45-54 anos)',
          'Sênior (55+ anos)',
          'Outro/Várias Faixas Etárias'
        ]
      },
      { 
        id: 'genero', 
        text: '2. Gênero predominante do público-alvo', 
        type: 'radio',
        options: [
          'Feminino',
          'Masculino',
          'Não-binário/Outros',
          'Equilibrado (Sem predominância)'
        ]
      },
      { id: 'localizacao', text: '3. Localização principal do seu público (cidade/estado/país)', type: 'text' },
      { 
        id: 'escolaridade', 
        text: '4. Nível de escolaridade predominante do seu público', 
        type: 'select',
        options: [
          'Ensino Fundamental Incompleto/Completo',
          'Ensino Médio Incompleto/Completo',
          'Ensino Técnico/Profissionalizante',
          'Ensino Superior Incompleto',
          'Ensino Superior Completo',
          'Pós-Graduação (Especialização, Mestrado, Doutorado)'
        ]
      },
      { 
        id: 'situacao_profissional', 
        text: '5. Situação profissional predominante do seu público', 
        type: 'checkbox',
        options: [
          'Empregado (CLT/Setor Público)',
          'Empresário/Dono de Negócio',
          'Autônomo/Freelancer',
          'Estudante',
          'Desempregado/Em busca de recolocação',
          'Aposentado/Pensionista',
          'Dona de Casa/Cuidador(a)'
        ]
      },
      { 
        id: 'renda_mensal', 
        text: '6. Faixa de renda mensal do seu público (Média ou predominante)', 
        type: 'radio',
        options: [
          'Até R$ 2.000 (Classe C/D/E)',
          'R$ 2.001 a R$ 5.000 (Classe C/B)',
          'R$ 5.001 a R$ 10.000 (Classe B)',
          'Acima de R$ 10.000 (Classe A)',
          'Varia muito/Não se aplica'
        ]
      },
      { 
        id: 'rede_social', 
        text: '7. Qual rede social esse público usa mais para buscar informações ou interagir?', 
        type: 'checkbox',
        options: [
          'Instagram',
          'Facebook',
          'YouTube',
          'TikTok',
          'LinkedIn',
          'Twitter/X',
          'Pinterest',
          'WhatsApp/Telegram (Mensageria)'
        ]
      },
      { id: 'conteudos', text: '8. Quais conteúdos esse público lê, assiste ou ouve? (Mencione influenciadores, canais, podcasts, publicações)', type: 'textarea' },
      { id: 'sonhos_ambicoes', text: '9. Quais são os maiores sonhos e ambições desse público em relação ao seu nicho?', type: 'textarea' },
      { id: 'medos_frustracoes', text: '10. Quais são os maiores medos e frustrações desse público que seu produto/serviço pode resolver?', type: 'textarea' },
      { 
        id: 'valoriza_compra', 
        text: '11. O que esse público valoriza mais na hora de tomar a decisão de compra?', 
        type: 'checkbox',
        options: [
          'Preço Baixo/Promoções',
          'Qualidade e Durabilidade',
          'Atendimento e Suporte',
          'Reconhecimento da Marca/Status',
          'Inovação e Tecnologia',
          'Facilidade de Uso/Conveniência',
          'Garantias e Prazos de Troca/Devolução',
          'Impacto Social/Sustentabilidade'
        ]
      },
      { 
        id: 'como_abordado', 
        text: '12. Como seu público prefere ser abordado e se comunicar?', 
        type: 'radio',
        options: [
          'Tom mais formal e profissional (linguagem técnica)',
          'Tom informal e descontraído (linguagem simples)',
          'Tom amigável, mas respeitoso (equilibrado)',
          'Depende do canal de comunicação'
        ]
      },
    ]
  },
  {
    id: 'persona',
    title: 'Criação de Persona',
    description: 'Defina as características e o contexto de uma persona-chave para o seu negócio. As respostas ajudarão a guiar as estratégias de marketing e vendas.',
    icon: <Target size={20} />,
    questions: [
      { id: 'nome_ficticio', text: '1. Dê um nome fictício para essa persona:', type: 'text' },
      { id: 'idade', text: '2. Quantos anos ela tem?', type: 'text' },
      { 
        id: 'situacao_familiar', 
        text: '3. Situação familiar (Estado civil e filhos, se aplicável):', 
        type: 'radio',
        options: [
          'Solteiro(a) / Sem filhos',
          'Solteiro(a) / Com filhos',
          'Casado(a) / Em união estável / Sem filhos',
          'Casado(a) / Em união estável / Com filhos',
          'Divorciado(a) / Viúvo(a) / Sem filhos',
          'Divorciado(a) / Viúvo(a) / Com filhos'
        ],
        allowOther: true
      },
      { id: 'profissao_cargo', text: '4. Profissão e cargo:', type: 'text' },
      { id: 'dia_tipico', text: '5. Descreva um dia típico na vida dessa persona:', type: 'textarea' },
      { 
        id: 'como_chegou', 
        text: '6. Como ela chegou até você? (Escolha a principal forma de contato inicial):', 
        type: 'select',
        options: [
          'Busca no Google/Outros Buscadores',
          'Indicação de um amigo/parceiro',
          'Instagram',
          'Facebook',
          'LinkedIn',
          'Anúncios Pagos (Google Ads, Meta Ads, etc.)',
          'E-mail Marketing',
          'Outro canal de mídia social/Outro'
        ]
      },
      { id: 'problema_resolver', text: '7. Qual problema estava tentando resolver quando te encontrou?', type: 'textarea' },
      { 
        id: 'maiores_ambicoes', 
        text: '8. Classifique as maiores ambições dessa persona:', 
        type: 'grid',
        gridRows: [
          'Ambições Profissionais (Ex: Crescimento de carreira, aumento de faturamento)',
          'Ambições Pessoais (Ex: Mais tempo livre, segurança financeira, novos aprendizados)'
        ],
        gridColumns: ['Baixa', 'Média', 'Alta', 'Muito Alta']
      },
      { 
        id: 'impede_comprar', 
        text: '9. O que a impede de comprar? (Principais objeções e barreiras):', 
        type: 'checkbox',
        options: [
          'Preço/Custo elevado',
          'Falta de tempo para implementação/uso',
          'Desconfiança na eficácia do produto/serviço',
          'Ceticismo em relação à sua empresa/marca',
          'Necessidade de aprovação de terceiros (sócios, chefe, cônjuge)',
          'Dificuldade em perceber o Retorno sobre Investimento (ROI)',
          'Resistência a mudar de fornecedor/solução atual',
          'Não possui conhecimento técnico suficiente'
        ],
        allowOther: true
      },
      { id: 'convenceu_fechar', text: '10. O que a convenceu a fechar (decisão de compra)?', type: 'textarea' },
      { 
        id: 'probabilidade_recomendar', 
        text: '11. Qual a probabilidade de ela recomendar sua empresa para um amigo?', 
        type: 'radio',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      { id: 'frase_resumo', text: '12. Que frase resume essa persona?', type: 'text' },
    ]
  },
  {
    id: 'tom_voz',
    title: 'Definição do Tom de Voz da Marca',
    description: 'Este formulário irá ajudar a estabelecer diretrizes claras sobre como sua marca deve se comunicar em todos os canais.',
    icon: <MessageSquare size={20} />,
    questions: [
      { 
        id: 'adjetivos', 
        text: '1. Escolha até 3 adjetivos que melhor definem a personalidade da sua marca.', 
        type: 'checkbox',
        options: [
          'Inovadora', 'Confiável', 'Amigável', 'Profissional', 'Divertida', 
          'Inspiradora', 'Acessível', 'Séria', 'Ousada', 'Sofisticada', 
          'Empática', 'Revolucionária'
        ],
        allowOther: true
      },
      { 
        id: 'dimensoes', 
        text: '2. Se sua marca fosse uma pessoa, como ela se comunicaria? (Selecione o nível de cada dimensão)', 
        type: 'grid',
        gridRows: ['Formalidade', 'Seriedade', 'Linguagem'],
        gridColumns: ['Extremamente Formal / Técnico', 'Mais Formal / Técnico', 'Neutro / Equilibrado', 'Mais Informal / Acessível', 'Extremamente Informal / Divertido']
      },
      { 
        id: 'emocao_principal', 
        text: '3. Qual a emoção principal que você deseja despertar no seu cliente ao consumir seu conteúdo?', 
        type: 'select',
        options: [
          'Confiança', 'Inspiração', 'Satisfação', 'Curiosidade', 'Alívio', 
          'Engajamento/Diversão', 'Segurança', 'Conhecimento/Clareza'
        ]
      },
      { 
        id: 'utiliza_humor', 
        text: '4. Sua marca utiliza humor em sua comunicação?', 
        type: 'radio',
        options: [
          'Sim, utiliza bastante.',
          'Sim, utiliza moderadamente e com cautela.',
          'Não, mantemos um tom mais sério.'
        ]
      },
      {
        id: 'tipo_humor',
        text: "Se 'Sim', que tipo de humor é predominante? (Selecione todos que se aplicam)",
        type: 'checkbox',
        options: [
          'Sarcasmo leve',
          'Humor Situacional/Cotidiano',
          'Memes e referências da internet',
          'Auto-depreciação (Leve)',
          'Observacional (Comentário perspicaz sobre o setor)'
        ]
      },
      { 
        id: 'girias_expressoes', 
        text: '5. Sua marca usa gírias ou expressões específicas do setor/público? Em caso afirmativo, dê exemplos de até 3 gírias/expressões que costumam ser usadas.', 
        type: 'textarea' 
      },
      { 
        id: 'palavras_proibidas', 
        text: '6. Cite até 3 palavras, frases ou expressões que NUNCA devem aparecer na comunicação da sua marca (Proibidas).', 
        type: 'textarea' 
      },
      { 
        id: 'uso_emojis', 
        text: '7. Uso de Emojis na Comunicação:', 
        type: 'radio',
        options: [
          'Usa bastante (Essenciais para a comunicação)',
          'Usa com moderação (Apenas para dar leveza ou ênfase)',
          'Não usa (Mantemos um tom estritamente profissional/texto puro)'
        ]
      },
      { 
        id: 'pilar_principal', 
        text: '8. O conteúdo da sua marca é mais baseado em qual pilar principal? (Selecione o principal e até 2 secundários)', 
        type: 'checkbox',
        options: [
          'Educação (Informar, ensinar, tirar dúvidas)',
          'Entretenimento (Divertido, leve, para passar o tempo)',
          'Inspiração (Motivacional, histórias de sucesso, visão de futuro)',
          'Vendas Diretas (Promoções, ofertas, chamadas para ação imediatas)'
        ]
      },
      { 
        id: 'marcas_admiradas', 
        text: '9. Cite 3 marcas (de qualquer setor) que você admira pela forma como se comunicam e o que você gosta no tom de voz delas.', 
        type: 'textarea' 
      },
      { 
        id: 'diferencial_tom', 
        text: '10. De que forma o seu tom de voz se diferencia dos seus principais concorrentes? (Qual é o seu \'toque\' único?)', 
        type: 'textarea' 
      },
    ]
  },
  {
    id: 'posicionamento',
    title: 'Posicionamento Digital',
    description: 'Formulário para definir a estratégia e o posicionamento da sua marca no ambiente digital.',
    icon: <Zap size={20} />,
    questions: [
      { id: 'descricao_empresa', text: '1. Descreva sua empresa em uma frase curta (como explicaria para um filho de 10 anos):', type: 'textarea' },
      { id: 'transformacao_concreta', text: '2. Qual transformação concreta seu serviço causa na vida do cliente?', type: 'textarea' },
      { id: 'diferenciais', text: '3. Quais são seus 3 principais diferenciais frente à concorrência? (Liste um por linha)', type: 'textarea' },
      { id: 'concorrentes', text: '4. Cite seus 3 principais concorrentes e detalhe o que eles fazem bem e mal.', type: 'textarea' },
      { 
        id: 'percebido_1_ano', 
        text: '5. Como você quer ser percebido pelo mercado daqui a 1 ano? (Escolha a opção mais relevante)', 
        type: 'radio',
        options: [
          'Líder de mercado e referência no setor',
          'Marca acessível e com ótimo custo-benefício',
          'Especialista e focado em um nicho específico',
          'Inovadora e disruptiva',
          'Confiável e tradicional'
        ],
        allowOther: true
      },
      { 
        id: 'objetivo_redes', 
        text: '6. Objetivo principal das redes sociais:', 
        type: 'radio',
        options: [
          'Gerar Leads (Capturar contatos para nutrir)',
          'Autoridade (Ser percebido como especialista)',
          'Vendas Diretas (Converter a audiência em clientes imediatamente)',
          'Comunidade (Construir um grupo engajado e fiel)'
        ]
      },
      { id: 'presenca_anterior', text: '7. Já teve presença digital antes? O que funcionou e o que não funcionou?', type: 'textarea' },
      { id: 'uma_palavra', text: '8. Em uma palavra: como você quer que as pessoas descrevam sua marca?', type: 'text' },
      { id: 'erro_concorrente', text: '9. Qual erro seu concorrente comete que você não comete?', type: 'textarea' },
      { id: 'pessoa_famosa', text: '10. Se sua marca fosse uma pessoa famosa, quem seria e por quê? (Pode ser personalidade, celebridade ou personagem histórico)', type: 'textarea' },
    ]
  },
  {
    id: 'site',
    title: 'Briefing de Criação de Website',
    description: 'Formulário essencial para coletar as informações necessárias para o desenvolvimento do seu novo website.',
    icon: <Globe size={20} />,
    serviceRequired: 'Website',
    questions: [
      { 
        id: 'objetivo_site', 
        text: '1. Qual é o objetivo principal do seu novo website?', 
        type: 'checkbox',
        options: [
          'Gerar Leads (Captura de contatos)',
          'Vender Online (E-commerce/Vendas diretas)',
          'Informar e Conscientizar (Conteúdo institucional/educacional)',
          'Marcar Consultas/Agendamentos',
          'Apresentação de Portfólio/Trabalhos'
        ],
        allowOther: true
      },
      { 
        id: 'paginas_essenciais', 
        text: '2. Quais das seguintes páginas são consideradas essenciais para o seu projeto?', 
        type: 'checkbox',
        options: [
          'Home (Página Inicial)',
          'Sobre/Institucional (Nossa História, Equipe)',
          'Serviços/Produtos',
          'Blog/Notícias (Área de Conteúdo)',
          'Contato (Com formulário)',
          'FAQ (Perguntas Frequentes)',
          'Portfólio/Casos de Sucesso',
          'Página de Carreiras/Trabalhe Conosco'
        ]
      },
      { id: 'tem_website', text: '3. Você tem um website atual? Se sim, qual é o endereço (URL)?', type: 'textarea' },
      { id: 'funciona_melhorar', text: '4. Se você tem um site atual, o que funciona bem e o que precisa ser melhorado/não funciona?', type: 'textarea' },
      { id: 'sites_admira', text: '5. Cite 3 websites que você admira. Por favor, especifique o que você admira em cada um (design, conteúdo ou usabilidade).', type: 'textarea' },
      { 
        id: 'estilo_design', 
        text: '6. Em relação ao design, qual estilo você prefere?', 
        type: 'radio',
        options: [
          'Minimalista e limpo (Foco no espaço em branco e simplicidade)',
          'Rico em cores e elementos (Mais vibrante e visualmente detalhado)'
        ],
        allowOther: true
      },
      { 
        id: 'sobre_conteudo', 
        text: '7. Sobre o conteúdo (textos) do site, qual opção se aplica?', 
        type: 'radio',
        options: [
          'Vou precisar de serviço de Copywriting (Criação profissional dos textos)',
          'Já tenho os textos prontos e revisados',
          'Parte dos textos está pronta, mas precisarei de revisão/ajuste'
        ]
      },
      { 
        id: 'imagens_midias', 
        text: '8. Em relação às imagens e mídias visuais, você tem fotos profissionais ou precisará de banco de imagens?', 
        type: 'radio',
        options: [
          'Temos fotos e vídeos profissionais prontos para uso',
          'Precisaremos de imagens de banco (stock photos)',
          'Precisaremos de sessão de fotos/produção de vídeos/Fotos com I.A'
        ]
      },
      { 
        id: 'formas_contato', 
        text: '9. Quais são as principais formas pelas quais o visitante deve entrar em contato com você?', 
        type: 'checkbox',
        options: [
          'Formulário de Contato',
          'Botão/Link direto para WhatsApp',
          'Telefone (Ligação)',
          'Chat Online/Bot',
          'E-mail direto'
        ]
      },
      { 
        id: 'integracoes', 
        text: '10. O projeto precisará de integrações específicas com outras ferramentas ou serviços?', 
        type: 'grid',
        gridRows: [
          'CRM (Customer Relationship Management)',
          'Plataforma de E-commerce (ex: Mercado Pago, PagSeguro)',
          'Sistema de Agendamento Online (ex: Calendly, Bookings)',
          'Ferramentas de Análise (ex: Google Analytics, Hotjar)',
          'Pixels de Rastreamento (ex: Facebook Pixel, Google Ads)'
        ],
        gridColumns: ['Sim, é necessário', 'Não é necessário', 'Talvez, preciso de consultoria']
      },
      { 
        id: 'dominio_hospedagem', 
        text: '11. Você já possui Domínio e Hospedagem para este projeto?', 
        type: 'radio',
        options: [
          'Sim, já temos domínio e hospedagem contratados',
          'Não, precisaremos contratar domínio e hospedagem'
        ]
      },
    ]
  },
  {
    id: 'trafego_pago',
    title: 'Cliente Ideal (Tráfego Pago)',
    description: 'Formulário essencial para definir o Perfil do Cliente Ideal (PCI) e otimizar estratégias de Tráfego Pago.',
    icon: <TrendingUp size={20} />,
    serviceRequired: 'Tráfego Pago',
    questions: [
      { id: 'descricao_cliente', text: '1. Descreva seu cliente ideal em detalhes — quem é essa pessoa?', type: 'textarea' },
      { id: 'faixa_etaria', text: '2. Faixa etária predominante (Ex: 28-45 anos)', type: 'text' },
      { 
        id: 'genero', 
        text: '3. Gênero predominante:', 
        type: 'radio',
        options: [
          'Masculino',
          'Feminino',
          'Ambos igualmente',
          'Outro/Prefiro não especificar'
        ]
      },
      { id: 'localizacao', text: '4. Onde seus clientes estão localizados? (Cidade, Estado, Região)', type: 'text' },
      { 
        id: 'renda_mensal', 
        text: '5. Qual é a renda mensal média do seu cliente ideal?', 
        type: 'select',
        options: [
          'Até R$ 2.000',
          'R$ 2.001 - R$ 5.000',
          'R$ 5.001 - R$ 10.000',
          'R$ 10.001 - R$ 20.000',
          'Acima de R$ 20.000',
          'Não se aplica/Não sei'
        ]
      },
      { id: 'profissao_cargo', text: '6. Qual é a profissão ou cargo mais comum?', type: 'text' },
      { id: 'maior_problema', text: '7. Qual é o maior problema que seu produto/serviço resolve na vida dele?', type: 'textarea' },
      { 
        id: 'motivou_buscar', 
        text: '8. O que motivou esse cliente a buscar sua solução? (Selecione as que se aplicam)', 
        type: 'checkbox',
        options: [
          'Dor ou necessidade imediata',
          'Busca por melhoria ou crescimento',
          'Recomendação/Prova Social',
          'Insatisfação com soluções atuais',
          'Curiosidade/Pesquisa'
        ],
        allowOther: true
      },
      { id: 'ticket_medio', text: '9. Qual é o ticket médio da sua venda? (Valor aproximado em R$)', type: 'text' },
      { 
        id: 'ciclo_vendas', 
        text: '10. Quanto tempo leva do primeiro contato até fechar a venda? (Ciclo de Vendas)', 
        type: 'radio',
        options: [
          'Menos de 24 horas',
          '1 a 7 dias',
          '1 a 4 semanas',
          'Mais de 1 mês'
        ]
      },
      { 
        id: 'principais_objecoes', 
        text: '11. Quais são as principais objeções antes de comprar? (Ex: preço, desconfiança, prazo)', 
        type: 'checkbox',
        options: [
          'Preço (Acha caro)',
          'Desconfiança na marca/produto',
          'Prazo de entrega/execução longo',
          'Não vê urgência na compra',
          'Precisa de aprovação de terceiros',
          'Não entende o valor/benefício'
        ],
        allowOther: true
      },
      { 
        id: 'onde_passa_tempo', 
        text: '12. Onde esse cliente passa o tempo online? (Selecione as plataformas mais importantes para a aquisição)', 
        type: 'checkbox',
        options: [
          'Instagram',
          'Google/Mecanismos de Busca',
          'YouTube',
          'Facebook',
          'LinkedIn',
          'TikTok',
          'Pinterest'
        ],
        allowOther: true
      },
      { 
        id: 'gatilho_agir', 
        text: '13. Qual gatilho faz esse cliente agir? (Ex: urgência, prova social, garantia)', 
        type: 'checkbox',
        options: [
          'Urgência (Oferta por tempo limitado)',
          'Prova Social (Depoimentos, estudos de caso)',
          'Garantia Incondicional',
          'Escassez (Poucas unidades/vagas)',
          'Autoridade (Conteúdo educativo, expertise)',
          'Novidade/Inovação'
        ]
      },
      { 
        id: 'experiencia_anterior', 
        text: '14. Avalie sua experiência anterior com campanhas pagas:', 
        type: 'grid',
        gridRows: [
          'Já rodei campanhas pagas antes?',
          'O que funcionou (positivamente)?',
          'O que não funcionou (negativamente)?'
        ],
        gridColumns: ['Sim', 'Não', 'Parcialmente']
      },
      { 
        id: 'meta_principal', 
        text: '15. Qual é sua meta principal com o tráfego pago neste momento?', 
        type: 'radio',
        options: [
          'Gerar Leads (Coleta de contatos)',
          'Vender Direto (E-commerce/Vendas online imediatas)',
          'Levar ao WhatsApp/Chat (Conversa direta)',
          'Levar à Loja Física/Estabelecimento',
          'Conscientização da Marca (Branding)'
        ]
      },
    ]
  }
];

export const BriefingOnboarding: React.FC<BriefingFormProps> = ({ onComplete, isDashboardView = false }) => {
  const { activeClient } = useAuth();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const availableSections = SECTIONS.filter(s => 
    !s.serviceRequired || (activeClient?.services || []).includes(s.serviceRequired)
  );

  const currentSection = availableSections[currentSectionIndex];

  useEffect(() => {
    setIsEditing(!completedSections.includes(currentSection?.id));
  }, [currentSectionIndex, completedSections, currentSection?.id]);

  useEffect(() => {
    const fetchResponses = async () => {
      if (!activeClient) return;
      const { data, error } = await supabase
        .from('client_briefings')
        .select('*')
        .eq('client_id', activeClient.id);
      
      if (data) {
        const loadedResponses: Record<string, any> = {};
        const loadedCompleted: string[] = [];
        data.forEach(item => {
          loadedResponses[item.briefing_type] = item.responses;
          if (item.is_completed) loadedCompleted.push(item.briefing_type);
        });
        setResponses(loadedResponses);
        setCompletedSections(loadedCompleted);
      }
      setLoading(false);
    };
    fetchResponses();
  }, [activeClient]);

  const handleInputChange = (sectionId: string, questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [questionId]: value
      }
    }));
  };

  const saveCurrentSection = async () => {
    if (!activeClient || !currentSection) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('client_briefings')
        .upsert({
          client_id: activeClient.id,
          briefing_type: currentSection.id,
          responses: responses[currentSection.id] || {},
          is_completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'client_id,briefing_type' });

      if (error) throw error;

      if (!completedSections.includes(currentSection.id)) {
        setCompletedSections(prev => [...prev, currentSection.id]);
      }

      if (!isDashboardView) {
        if (currentSectionIndex < availableSections.length - 1) {
          setCurrentSectionIndex(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Finalizar onboarding
          await supabase
            .from('clients')
            .update({ onboarding_completed: true })
            .eq('id', activeClient.id);
          
          if (onComplete) onComplete();
        }
      } else {
        setIsEditing(false);
        alert('Respostas salvas com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao salvar briefing:', err);
      alert('Erro ao salvar suas respostas. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Preparando seus formulários...</p>
    </div>
  );

  const progress = Math.round((completedSections.length / availableSections.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
          <Zap size={12} /> {isDashboardView ? 'Briefings Estratégicos' : 'Onboarding Estratégico'}
        </div>
        <h1 className="text-4xl font-bold text-brand-dark tracking-tight">
          {isDashboardView ? 'Formulários Estratégicos' : <>Seja bem-vindo, <span className="serif italic font-normal text-gray-400">{activeClient?.name}</span></>}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {isDashboardView 
            ? 'Aqui você pode visualizar e editar as respostas dos seus formulários estratégicos a qualquer momento.'
            : 'Para começarmos nossa estratégia com o pé direito, precisamos que você preencha alguns formulários iniciais. Isso nos ajudará a entender melhor sua marca e seus objetivos.'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-3xl border border-black/[0.03] p-8 mb-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">Seu Progresso</p>
              <p className="text-xs text-gray-400">{completedSections.length} de {availableSections.length} formulários concluídos</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-blue-600 h-full rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-3">
          {availableSections.map((section, index) => {
            const isCompleted = completedSections.includes(section.id);
            const isActive = currentSectionIndex === index;
            
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSectionIndex(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                  isActive 
                    ? 'bg-brand-dark border-brand-dark text-white shadow-lg shadow-brand-dark/10' 
                    : isCompleted
                      ? 'bg-white border-green-100 text-gray-700 hover:border-green-200'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/10' : isCompleted ? 'bg-green-50 text-green-600' : 'bg-gray-50'
                }`}>
                  {isCompleted ? <CheckCircle size={16} /> : section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest truncate">{section.title}</p>
                </div>
                {isActive && <ChevronRight size={16} className="opacity-50" />}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] border border-black/[0.03] p-10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    {currentSection.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-dark">{currentSection.title}</h2>
                    <p className="text-sm text-gray-500">{currentSection.description}</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    Editar Respostas
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {currentSection.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <label className="block text-sm font-bold text-brand-dark tracking-tight">
                      {q.text}
                    </label>
                    
                    {q.type === 'textarea' ? (
                      <textarea
                        value={responses[currentSection.id]?.[q.id] || ''}
                        onChange={(e) => handleInputChange(currentSection.id, q.id, e.target.value)}
                        placeholder={q.placeholder}
                        rows={4}
                        disabled={!isEditing}
                        className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    ) : q.type === 'select' ? (
                      <select
                        value={responses[currentSection.id]?.[q.id] || ''}
                        onChange={(e) => handleInputChange(currentSection.id, q.id, e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option value="">Selecione uma opção</option>
                        {q.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : q.type === 'radio' ? (
                      <div className="space-y-2">
                        {q.options?.map(opt => (
                          <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition-colors ${isEditing ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={responses[currentSection.id]?.[q.id] === opt}
                              onChange={(e) => handleInputChange(currentSection.id, q.id, e.target.value)}
                              disabled={!isEditing}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm text-gray-700">{opt}</span>
                          </label>
                        ))}
                        {q.allowOther && (
                          <div className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition-colors ${isEditing ? 'hover:bg-gray-50' : 'opacity-60'}`}>
                            <input
                              type="radio"
                              name={q.id}
                              value="Outro"
                              checked={responses[currentSection.id]?.[q.id] === 'Outro'}
                              onChange={(e) => handleInputChange(currentSection.id, q.id, e.target.value)}
                              disabled={!isEditing}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm text-gray-700">Outro:</span>
                            <input
                              type="text"
                              value={responses[currentSection.id]?.[`${q.id}_other`] || ''}
                              onChange={(e) => {
                                handleInputChange(currentSection.id, `${q.id}_other`, e.target.value);
                                handleInputChange(currentSection.id, q.id, 'Outro');
                              }}
                              disabled={!isEditing}
                              className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none text-sm px-2 py-1 disabled:cursor-not-allowed"
                            />
                          </div>
                        )}
                      </div>
                    ) : q.type === 'checkbox' ? (
                      <div className="space-y-2">
                        {q.options?.map(opt => {
                          const currentValues = responses[currentSection.id]?.[q.id] || [];
                          const isChecked = currentValues.includes(opt);
                          return (
                            <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition-colors ${isEditing ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                              <input
                                type="checkbox"
                                value={opt}
                                checked={isChecked}
                                onChange={(e) => {
                                  const newValues = isChecked 
                                    ? currentValues.filter((v: string) => v !== opt)
                                    : [...currentValues, opt];
                                  handleInputChange(currentSection.id, q.id, newValues);
                                }}
                                disabled={!isEditing}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
                              />
                              <span className="text-sm text-gray-700">{opt}</span>
                            </label>
                          );
                        })}
                        {q.allowOther && (
                          <div className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition-colors ${isEditing ? 'hover:bg-gray-50' : 'opacity-60'}`}>
                            <input
                              type="checkbox"
                              checked={responses[currentSection.id]?.[q.id]?.includes('Outro')}
                              onChange={(e) => {
                                const currentValues = responses[currentSection.id]?.[q.id] || [];
                                const newValues = e.target.checked 
                                  ? [...currentValues, 'Outro']
                                  : currentValues.filter((v: string) => v !== 'Outro');
                                handleInputChange(currentSection.id, q.id, newValues);
                              }}
                              disabled={!isEditing}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm text-gray-700">Outro:</span>
                            <input
                              type="text"
                              value={responses[currentSection.id]?.[`${q.id}_other`] || ''}
                              onChange={(e) => {
                                handleInputChange(currentSection.id, `${q.id}_other`, e.target.value);
                                const currentValues = responses[currentSection.id]?.[q.id] || [];
                                if (!currentValues.includes('Outro')) {
                                  handleInputChange(currentSection.id, q.id, [...currentValues, 'Outro']);
                                }
                              }}
                              disabled={!isEditing}
                              className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none text-sm px-2 py-1 disabled:cursor-not-allowed"
                            />
                          </div>
                        )}
                      </div>
                    ) : q.type === 'grid' ? (
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left">
                           <thead>
                             <tr>
                               <th className="p-3 font-medium text-gray-500"></th>
                               {q.gridColumns?.map(col => (
                                 <th key={col} className="p-3 font-medium text-gray-500 text-center min-w-[120px]">{col}</th>
                               ))}
                             </tr>
                           </thead>
                           <tbody>
                             {q.gridRows?.map(row => (
                               <tr key={row} className="border-t border-gray-100">
                                 <td className="p-3 font-medium text-gray-700">{row}</td>
                                 {q.gridColumns?.map(col => (
                                   <td key={col} className="p-3 text-center">
                                     <input
                                       type="radio"
                                       name={`${q.id}_${row}`}
                                       value={col}
                                       checked={responses[currentSection.id]?.[q.id]?.[row] === col}
                                       onChange={(e) => {
                                         const currentGrid = responses[currentSection.id]?.[q.id] || {};
                                         handleInputChange(currentSection.id, q.id, { ...currentGrid, [row]: e.target.value });
                                       }}
                                       disabled={!isEditing}
                                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                     />
                                   </td>
                                 ))}
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                    ) : (
                      <input
                        type="text"
                        value={responses[currentSection.id]?.[q.id] || ''}
                        onChange={(e) => handleInputChange(currentSection.id, q.id, e.target.value)}
                        placeholder={q.placeholder}
                        disabled={!isEditing}
                        className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                  <AlertCircle size={14} /> Suas respostas são salvas automaticamente ao avançar.
                </div>
                {isDashboardView ? (
                  isEditing && (
                    <button
                      onClick={saveCurrentSection}
                      disabled={saving}
                      className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Salvando...' : 'Salvar Respostas'}
                    </button>
                  )
                ) : (
                  <button
                    onClick={async () => {
                      if (isEditing) {
                        saveCurrentSection();
                      } else {
                        if (currentSectionIndex < availableSections.length - 1) {
                          setCurrentSectionIndex(prev => prev + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          if (activeClient) {
                            setSaving(true);
                            try {
                              await supabase
                                .from('clients')
                                .update({ onboarding_completed: true })
                                .eq('id', activeClient.id);
                              if (onComplete) onComplete();
                            } catch (err) {
                              console.error('Erro ao finalizar onboarding:', err);
                            } finally {
                              setSaving(false);
                            }
                          } else {
                            if (onComplete) onComplete();
                          }
                        }
                      }
                    }}
                    disabled={saving}
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Salvando...' : currentSectionIndex === availableSections.length - 1 ? 'Finalizar Onboarding' : 'Próximo Formulário'}
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

