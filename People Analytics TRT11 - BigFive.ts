import React, { useState, useRef } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  Briefcase, 
  Scale, 
  Search,
  BookOpen,
  UserCheck,
  ChevronDown,
  RotateCcw,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  Upload,
  FileText,
  Download,
  Printer,
  Loader2
} from 'lucide-react';

// --- CONFIGURAÇÃO E CONSTANTES ---

// Cores e Identidade dos 5 Fatores (OCEAN)
const TRAITS_CONFIG = {
  abertura: { 
    label: "Abertura à Experiência", 
    color: "text-orange-600", 
    bg: "bg-orange-500", 
    lightBg: "bg-orange-50",
    desc: "Imaginação, curiosidade, inovação e apreço pela arte."
  },
  conscienciosidade: { 
    label: "Conscienciosidade", 
    color: "text-blue-600", 
    bg: "bg-blue-600", 
    lightBg: "bg-blue-50",
    desc: "Organização, disciplina, foco em metas e responsabilidade."
  },
  extroversao: { 
    label: "Extroversão", 
    color: "text-yellow-600", 
    bg: "bg-yellow-500", 
    lightBg: "bg-yellow-50",
    desc: "Energia social, assertividade e busca por estímulos."
  },
  amabilidade: { 
    label: "Amabilidade", 
    color: "text-green-600", 
    bg: "bg-green-500", 
    lightBg: "bg-green-50",
    desc: "Cooperação, empatia, confiança e altruísmo."
  },
  estabilidade: { 
    label: "Estabilidade Emocional", 
    color: "text-purple-600", 
    bg: "bg-purple-600", 
    lightBg: "bg-purple-50",
    desc: "Resiliência, controle de impulsos e calma sob pressão."
  }
};

// --- BASE DE PERGUNTAS (IPIP-NEO-120 - VERSÃO PT-BR ADAPTADA) ---
const BIG_FIVE_120 = [
  // ABERTURA (O)
  { id: 1, text: "Tenho uma imaginação vívida.", trait: 'abertura', key: 1 },
  { id: 2, text: "Não estou interessado em ideias abstratas.", trait: 'abertura', key: -1 },
  { id: 3, text: "Tenho dificuldade em compreender ideias abstratas.", trait: 'abertura', key: -1 },
  { id: 4, text: "Tenho excelentes ideias.", trait: 'abertura', key: 1 },
  { id: 5, text: "Não tenho uma boa imaginação.", trait: 'abertura', key: -1 },
  { id: 6, text: "Gosto de refletir sobre teorias.", trait: 'abertura', key: 1 },
  { id: 7, text: "Evito discussões filosóficas.", trait: 'abertura', key: -1 },
  { id: 8, text: "Gosto de resolver problemas complexos.", trait: 'abertura', key: 1 },
  { id: 9, text: "Tenho interesse por arte e cultura.", trait: 'abertura', key: 1 },
  { id: 10, text: "Não gosto de ir a museus de arte.", trait: 'abertura', key: -1 },
  { id: 11, text: "Sinto emoções profundas ao ouvir música.", trait: 'abertura', key: 1 },
  { id: 12, text: "Gosto de experimentar coisas novas.", trait: 'abertura', key: 1 },
  { id: 13, text: "Prefiro fazer as coisas do jeito tradicional.", trait: 'abertura', key: -1 },
  { id: 14, text: "Gosto de variedade e mudança.", trait: 'abertura', key: 1 },
  { id: 15, text: "Acredito na importância da arte.", trait: 'abertura', key: 1 },
  { id: 16, text: "Tendo a votar em candidatos liberais/progressistas.", trait: 'abertura', key: 1 },
  { id: 17, text: "Não gosto de poesia.", trait: 'abertura', key: -1 },
  { id: 18, text: "Raramente noto minhas reações emocionais.", trait: 'abertura', key: -1 },
  { id: 19, text: "Gosto de aprender sobre a história de outros países.", trait: 'abertura', key: 1 },
  { id: 20, text: "Tenho pouco interesse em especulações sobre o universo.", trait: 'abertura', key: -1 },
  { id: 21, text: "Sou muito curioso(a).", trait: 'abertura', key: 1 },
  { id: 22, text: "Gosto de um trabalho que exija criatividade.", trait: 'abertura', key: 1 },
  { id: 23, text: "Não gosto de perder tempo sonhando acordado.", trait: 'abertura', key: -1 },
  { id: 24, text: "Gosto de me perder em pensamentos.", trait: 'abertura', key: 1 },

  // CONSCIENCIOSIDADE (C)
  { id: 25, text: "Estou sempre preparado(a).", trait: 'conscienciosidade', key: 1 },
  { id: 26, text: "Deixo meus pertences espalhados.", trait: 'conscienciosidade', key: -1 },
  { id: 27, text: "Presto atenção aos detalhes.", trait: 'conscienciosidade', key: 1 },
  { id: 28, text: "Faço as coisas de qualquer jeito.", trait: 'conscienciosidade', key: -1 },
  { id: 29, text: "Consigo realizar minhas tarefas logo.", trait: 'conscienciosidade', key: 1 },
  { id: 30, text: "Frequentemente esqueço de colocar as coisas no lugar.", trait: 'conscienciosidade', key: -1 },
  { id: 31, text: "Gosto de ordem.", trait: 'conscienciosidade', key: 1 },
  { id: 32, text: "Fujo das minhas responsabilidades.", trait: 'conscienciosidade', key: -1 },
  { id: 33, text: "Sigo um cronograma.", trait: 'conscienciosidade', key: 1 },
  { id: 34, text: "Sou exigente no meu trabalho.", trait: 'conscienciosidade', key: 1 },
  { id: 35, text: "Tenho dificuldade em começar a trabalhar.", trait: 'conscienciosidade', key: -1 },
  { id: 36, text: "Sempre termino o que começo.", trait: 'conscienciosidade', key: 1 },
  { id: 37, text: "Faço planos e os sigo.", trait: 'conscienciosidade', key: 1 },
  { id: 38, text: "Perco tempo com coisas triviais.", trait: 'conscienciosidade', key: -1 },
  { id: 39, text: "Não sou muito confiável.", trait: 'conscienciosidade', key: -1 },
  { id: 40, text: "Sou eficiente.", trait: 'conscienciosidade', key: 1 },
  { id: 41, text: "Mantenho minhas promessas.", trait: 'conscienciosidade', key: 1 },
  { id: 42, text: "Às vezes não me comporto como deveria.", trait: 'conscienciosidade', key: -1 },
  { id: 43, text: "Trabalho duro.", trait: 'conscienciosidade', key: 1 },
  { id: 44, text: "Faço mais do que é esperado de mim.", trait: 'conscienciosidade', key: 1 },
  { id: 45, text: "Tomo decisões precipitadas.", trait: 'conscienciosidade', key: -1 },
  { id: 46, text: "Lido com as tarefas de forma metódica.", trait: 'conscienciosidade', key: 1 },
  { id: 47, text: "Evito erros.", trait: 'conscienciosidade', key: 1 },
  { id: 48, text: "Prefiro agir logo a planejar.", trait: 'conscienciosidade', key: -1 },

  // EXTROVERSÃO (E)
  { id: 49, text: "Sou a alma da festa.", trait: 'extroversao', key: 1 },
  { id: 50, text: "Não falo muito.", trait: 'extroversao', key: -1 },
  { id: 51, text: "Sinto-me confortável perto das pessoas.", trait: 'extroversao', key: 1 },
  { id: 52, text: "Mantenho-me em segundo plano.", trait: 'extroversao', key: -1 },
  { id: 53, text: "Inicio conversas.", trait: 'extroversao', key: 1 },
  { id: 54, text: "Não gosto de chamar a atenção.", trait: 'extroversao', key: -1 },
  { id: 55, text: "Converso com muitas pessoas diferentes em festas.", trait: 'extroversao', key: 1 },
  { id: 56, text: "Não gosto de ambientes barulhentos.", trait: 'extroversao', key: -1 },
  { id: 57, text: "Não me importo de ser o centro das atenções.", trait: 'extroversao', key: 1 },
  { id: 58, text: "Sou quieto(a) perto de estranhos.", trait: 'extroversao', key: -1 },
  { id: 59, text: "Sei como cativar as pessoas.", trait: 'extroversao', key: 1 },
  { id: 60, text: "Tenho pouco a dizer.", trait: 'extroversao', key: -1 },
  { id: 61, text: "Faço amigos com facilidade.", trait: 'extroversao', key: 1 },
  { id: 62, text: "Mantenho as pessoas à distância.", trait: 'extroversao', key: -1 },
  { id: 63, text: "Sou uma pessoa alegre.", trait: 'extroversao', key: 1 },
  { id: 64, text: "Raramente me divirto muito.", trait: 'extroversao', key: -1 },
  { id: 65, text: "Tenho uma risada contagiante.", trait: 'extroversao', key: 1 },
  { id: 66, text: "Busco aventura e emoção.", trait: 'extroversao', key: 1 },
  { id: 67, text: "Evito situações perigosas.", trait: 'extroversao', key: -1 },
  { id: 68, text: "Ajo de forma selvagem e maluca às vezes.", trait: 'extroversao', key: 1 },
  { id: 69, text: "Gosto de estar ocupado(a).", trait: 'extroversao', key: 1 },
  { id: 70, text: "Reajo devagar às coisas.", trait: 'extroversao', key: -1 },
  { id: 71, text: "Sou cheio(a) de energia.", trait: 'extroversao', key: 1 },
  { id: 72, text: "Deixo que os outros liderem o caminho.", trait: 'extroversao', key: -1 },

  // AMABILIDADE (A)
  { id: 73, text: "Preocupo-me com os outros.", trait: 'amabilidade', key: 1 },
  { id: 74, text: "Não me interesso pelos problemas alheios.", trait: 'amabilidade', key: -1 },
  { id: 75, text: "Tenho um coração mole.", trait: 'amabilidade', key: 1 },
  { id: 76, text: "Sinto pouca preocupação pelos outros.", trait: 'amabilidade', key: -1 },
  { id: 77, text: "Respeito os sentimentos dos outros.", trait: 'amabilidade', key: 1 },
  { id: 78, text: "Insulto as pessoas.", trait: 'amabilidade', key: -1 },
  { id: 79, text: "Gosto de ajudar os outros.", trait: 'amabilidade', key: 1 },
  { id: 80, text: "Acredito que sou melhor que os outros.", trait: 'amabilidade', key: -1 },
  { id: 81, text: "Simpatizo com os sentimentos alheios.", trait: 'amabilidade', key: 1 },
  { id: 82, text: "Tenho uma língua afiada.", trait: 'amabilidade', key: -1 },
  { id: 83, text: "Faço as pessoas se sentirem à vontade.", trait: 'amabilidade', key: 1 },
  { id: 84, text: "Busco vingança contra quem me ofende.", trait: 'amabilidade', key: -1 },
  { id: 85, text: "Confio nas pessoas.", trait: 'amabilidade', key: 1 },
  { id: 86, text: "Desconfio das intenções alheias.", trait: 'amabilidade', key: -1 },
  { id: 87, text: "Acredito que os outros têm boas intenções.", trait: 'amabilidade', key: 1 },
  { id: 88, text: "Tiro vantagem dos outros.", trait: 'amabilidade', key: -1 },
  { id: 89, text: "Odeio discutir ou brigar.", trait: 'amabilidade', key: 1 },
  { id: 90, text: "Contrario os outros.", trait: 'amabilidade', key: -1 },
  { id: 91, text: "Adoro ajudar os necessitados.", trait: 'amabilidade', key: 1 },
  { id: 92, text: "Não tenho tempo para os outros.", trait: 'amabilidade', key: -1 },
  { id: 93, text: "Perdoo com facilidade.", trait: 'amabilidade', key: 1 },
  { id: 94, text: "Guardo rancor.", trait: 'amabilidade', key: -1 },
  { id: 95, text: "Vejo a mim mesmo como alguém cooperativo.", trait: 'amabilidade', key: 1 },
  { id: 96, text: "Critico os outros.", trait: 'amabilidade', key: -1 },

  // ESTABILIDADE (Inverso de Neuroticismo)
  { id: 97, text: "Estresso-me facilmente.", trait: 'estabilidade', key: -1 },
  { id: 98, text: "Estou relaxado(a) na maior parte do tempo.", trait: 'estabilidade', key: 1 },
  { id: 99, text: "Preocupo-me com as coisas.", trait: 'estabilidade', key: -1 },
  { id: 100, text: "Raramente me sinto triste.", trait: 'estabilidade', key: 1 },
  { id: 101, text: "Fico perturbado(a) com facilidade.", trait: 'estabilidade', key: -1 },
  { id: 102, text: "Não me irrito facilmente.", trait: 'estabilidade', key: 1 },
  { id: 103, text: "Mudo de humor com frequência.", trait: 'estabilidade', key: -1 },
  { id: 104, text: "Permaneço calmo(a) sob pressão.", trait: 'estabilidade', key: 1 },
  { id: 105, text: "Tenho oscilações de humor frequentes.", trait: 'estabilidade', key: -1 },
  { id: 106, text: "Tenho controle sobre minhas emoções.", trait: 'estabilidade', key: 1 },
  { id: 107, text: "Sinto-me triste muitas vezes.", trait: 'estabilidade', key: -1 },
  { id: 108, text: "Não sou facilmente incomodado(a) pelas coisas.", trait: 'estabilidade', key: 1 },
  { id: 109, text: "Entro em pânico facilmente.", trait: 'estabilidade', key: -1 },
  { id: 110, text: "Sinto-me confortável comigo mesmo(a).", trait: 'estabilidade', key: 1 },
  { id: 111, text: "Sinto-me sobrecarregado(a) pelos eventos.", trait: 'estabilidade', key: -1 },
  { id: 112, text: "Sei lidar com problemas.", trait: 'estabilidade', key: 1 },
  { id: 113, text: "Sinto que não sou capaz de lidar com as coisas.", trait: 'estabilidade', key: -1 },
  { id: 114, text: "Sou uma pessoa estável emocionalmente.", trait: 'estabilidade', key: 1 },
  { id: 115, text: "Fico irritado(a) facilmente.", trait: 'estabilidade', key: -1 },
  { id: 116, text: "Raramente perco a compostura.", trait: 'estabilidade', key: 1 },
  { id: 117, text: "Frequentemente me sinto para baixo (blue).", trait: 'estabilidade', key: -1 },
  { id: 118, text: "Não me preocupo com coisas pequenas.", trait: 'estabilidade', key: 1 },
  { id: 119, text: "Sinto-me ameaçado(a) facilmente.", trait: 'estabilidade', key: -1 },
  { id: 120, text: "Sou difícil de ofender.", trait: 'estabilidade', key: 1 },
];

// --- ARQUÉTIPOS IDEAIS POR CATEGORIA (REVISADOS E EXPANDIDOS) ---
const ARQUETIPOS = {
  // 1. Alta Gestão e Estratégia
  LIDERANCA_ESTRATEGICA: { abertura: 85, conscienciosidade: 75, extroversao: 85, amabilidade: 60, estabilidade: 80 },
  GESTAO_EXECUTIVA: { abertura: 60, conscienciosidade: 85, extroversao: 70, amabilidade: 65, estabilidade: 80 },
  
  // 2. Jurídico
  JURIDICO_SENIOR: { abertura: 65, conscienciosidade: 90, extroversao: 40, amabilidade: 50, estabilidade: 85 },
  JURIDICO_PROCESSUAL: { abertura: 40, conscienciosidade: 85, extroversao: 50, amabilidade: 60, estabilidade: 75 },
  ANALISE_DADOS_JURIDICOS: { abertura: 75, conscienciosidade: 90, extroversao: 30, amabilidade: 40, estabilidade: 80 },
  
  // 3. Finanças e Exatas
  CALCULOS_EXATOS: { abertura: 35, conscienciosidade: 95, extroversao: 30, amabilidade: 50, estabilidade: 85 },
  AUDITORIA_COMPLIANCE: { abertura: 50, conscienciosidade: 95, extroversao: 40, amabilidade: 30, estabilidade: 90 },
  
  // 4. Atendimento e Mediação
  CONCILIACAO: { abertura: 60, conscienciosidade: 60, extroversao: 80, amabilidade: 95, estabilidade: 85 },
  ATENDIMENTO_PUBLICO: { abertura: 50, conscienciosidade: 65, extroversao: 85, amabilidade: 90, estabilidade: 75 },
  
  // 5. Operacional e Segurança
  DILIGENCIA_SEGURANCA: { abertura: 40, conscienciosidade: 80, extroversao: 75, amabilidade: 40, estabilidade: 95 },
  LOGISTICA_OPERACIONAL: { abertura: 45, conscienciosidade: 85, extroversao: 60, amabilidade: 60, estabilidade: 80 },
  
  // 6. Administrativo e Compras
  SUPORTE_ADMINISTRATIVO: { abertura: 45, conscienciosidade: 80, extroversao: 55, amabilidade: 70, estabilidade: 70 },
  AQUISICOES_RIGOR: { abertura: 40, conscienciosidade: 95, extroversao: 50, amabilidade: 30, estabilidade: 85 },
  
  // 7. Engenharia e Infraestrutura
  ENGENHARIA_PROJETOS: { abertura: 70, conscienciosidade: 85, extroversao: 50, amabilidade: 50, estabilidade: 80 },
  
  // 8. Gestão de Pessoas (RH)
  RH_DESENVOLVIMENTO: { abertura: 80, conscienciosidade: 60, extroversao: 85, amabilidade: 90, estabilidade: 75 },
  RH_TECNICO: { abertura: 40, conscienciosidade: 95, extroversao: 40, amabilidade: 60, estabilidade: 85 },
  
  // 9. Tecnologia e Inovação
  TIC_DESENVOLVIMENTO: { abertura: 90, conscienciosidade: 80, extroversao: 30, amabilidade: 50, estabilidade: 75 },
  TIC_SUPORTE: { abertura: 60, conscienciosidade: 70, extroversao: 80, amabilidade: 85, estabilidade: 80 },
  INOVACAO_CRIATIVIDADE: { abertura: 95, conscienciosidade: 50, extroversao: 85, amabilidade: 75, estabilidade: 70 },
  
  // 10. Educação e Cultura
  EDUCACAO_MEMORIA: { abertura: 85, conscienciosidade: 70, extroversao: 60, amabilidade: 80, estabilidade: 80 }
};

// --- BASE DE DADOS COMPLETA DE UNIDADES TRT11 (REMAPEADA) ---
const unidadesTRT11 = [
  // --- ALTA ADMINISTRAÇÃO ---
  { id: 'presidencia', nome: 'PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Visão Estratégica', 'Liderança', 'Articulação Política'] },
  { id: 'dg', nome: 'DIRETORIA-GERAL', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Gestão Executiva', 'Tomada de Decisão', 'Visão Sistêmica'] },
  { id: 'gab_dg', nome: 'GABINETE DA DIRETORIA-GERAL', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Suporte Executivo', 'Organização', 'Discrição'] },
  { id: 'sec_geral_pres', nome: 'SECRETARIA-GERAL DA PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Gestão de Fluxos', 'Comunicação Oficial', 'Protocolo'] },
  { id: 'ass_ordenanca', nome: 'ASSESSORIA DE ORDENANÇA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Logística', 'Disciplina', 'Prontidão'] },
  { id: 'div_apoio_vp', nome: 'DIVISÃO DE APOIO À VICE-PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Gestão de Admissibilidade', 'Apoio Administrativo'] },
  { id: 'sec_ass_jur_adm', nome: 'SECRETARIA DE ASSESSORAMENTO JURÍDICO-ADMINISTRATIVO', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Pareceres Jurídicos', 'Direito Administrativo'] },

  // --- CORREGEDORIA ---
  { id: 'sec_corregedoria', nome: 'SECRETARIA DA CORREGEDORIA REGIONAL', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Fiscalização', 'Normatização', 'Gestão Correicional'] },
  { id: 'coord_apoio_correg', nome: 'COORDENADORIA DE APOIO À SECRETARIA DA CORREGEDORIA', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Apoio Administrativo', 'Organização de Correicões'] },
  { id: 'gab_apoio_correg', nome: 'GABINETE DE APOIO À CORREGEDORIA', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Suporte Técnico', 'Análise Processual'] },

  // --- JUDICIÁRIO ---
  { id: 'gab_desembargador', nome: 'GABINETE DESEMBARGADOR', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Técnica Jurídica', 'Redação de Votos', 'Pesquisa Jurisprudencial'] },
  { id: 'sec_vara_trabalho', nome: 'SECRETARIA DE VARA DO TRABALHO', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_PROCESSUAL, competencias: ['Atendimento', 'Celeridade Processual', 'PJe'] },
  { id: 'sec_pleno', nome: 'SECRETARIA DO TRIBUNAL PLENO E SEÇÕES ESPECIALIZADAS', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Gestão de Sessões', 'Ata de Julgamento'] },
  { id: 'coord_apoio_turma', nome: 'COORDENADORIA DE APOIO À TURMA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_PROCESSUAL, competencias: ['Apoio a Sessões', 'Gestão de Pauta'] },
  { id: 'gab_apoio_sgj', nome: 'GABINETE DE APOIO À SECRETARIA-GERAL JUDICIÁRIA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Suporte Administrativo', 'Gestão Judiciária'] },
  { id: 'nucleo_recursos', nome: 'NÚCLEO DE RECURSOS', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Admissibilidade Recursal', 'Análise Técnica', 'Prazos'] },
  { id: 'centro_intel_prec', nome: 'CENTRO DE INTELIGÊNCIA - PRECEDENTES', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Pesquisa Jurídica', 'Gestão de Precedentes'] },
  { id: 'sec_jurisprudencia', nome: 'SEÇÃO DE JURISPRUDÊNCIA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Sistematização', 'Pesquisa', 'Catalogação'] },
  { id: 'div_contadoria', nome: 'DIVISÃO DE CONTADORIA JURÍDICA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.CALCULOS_EXATOS, competencias: ['Cálculos Judiciais', 'Matemática Financeira', 'PJe-Calc'] },
  { id: 'div_coop_jud', nome: 'DIVISÃO DE COOPERAÇÃO JUDICIÁRIA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.ATENDIMENTO_PUBLICO, competencias: ['Comunicação Interinstitucional', 'Cartas Precatórias'] },
  { id: 'div_exec_conc', nome: 'DIVISÃO DE EXECUÇÃO CONCENTRADA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.JURIDICO_PROCESSUAL, competencias: ['Execução Trabalhista', 'Reunião de Processos'] },
  { id: 'div_pesq_patrimonial', nome: 'DIVISÃO DE PESQUISA PATRIMONIAL', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Investigação Patrimonial', 'Análise de Dados'] },
  { id: 'sec_exec_fazenda', nome: 'SECRETARIA DE EXECUÇÃO DA FAZENDA PÚBLICA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.JURIDICO_PROCESSUAL, competencias: ['Gestão de Precatórios', 'Direito Público'] },

  // --- APOIO E DISTRIBUIÇÃO ---
  { id: 'div_dist_manaus', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (MANAUS)', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Distribuição Processual', 'Agilidade'] },
  { id: 'div_dist_bv', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (BOA VISTA)', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Distribuição Processual', 'Agilidade'] },
  { id: 'div_adm_ftm', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTM', setor: 'Administrativo', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Gestão Predial', 'Apoio Logístico'] },
  { id: 'sec_mandados', nome: 'SEÇÃO DE MANDADOS JUDICIAIS', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Diligências Externas', 'Cumprimento de Ordens'] },
  { id: 'sec_hasta', nome: 'SEÇÃO DE HASTA PÚBLICA', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Leilões Judiciais', 'Organização de Eventos'] },
  { id: 'div_apoio_cejusc_ftm', nome: 'DIVISÃO DE APOIO AO CEJUSC FTM', setor: 'Conciliação', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.CONCILIACAO, competencias: ['Conciliação', 'Atendimento Humanizado', 'Negociação'] },
  { id: 'coord_metodos_consensuais', nome: 'NÚCLEO PERMANENTE DE MÉTODOS CONSENSUAIS', setor: 'Conciliação', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.CONCILIACAO, competencias: ['Gestão de Conflitos', 'Planejamento'] },

  // --- ADMINISTRAÇÃO E LOGÍSTICA ---
  { id: 'sec_adm', nome: 'SECRETARIA DE ADMINISTRAÇÃO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Gestão Administrativa', 'Coordenação'] },
  { id: 'gab_apoio_sad', nome: 'GABINETE DE APOIO À SAD', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Suporte Administrativo', 'Redação'] },
  { id: 'coord_mat_log', nome: 'COORDENADORIA DE MATERIAL E LOGÍSTICA', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Logística', 'Gestão de Estoque'] },
  { id: 'coord_lic_contratos', nome: 'COORDENADORIA DE LICITAÇÃO E CONTRATOS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AQUISICOES_RIGOR, competencias: ['Legislação de Licitações', 'Gestão Contratual'] },
  { id: 'coord_gov_contratacoes', nome: 'COORDENADORIA DE GOVERNANÇA DE CONTRATAÇÕES', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Governança', 'Planejamento'] },
  { id: 'sec_compras', nome: 'SEÇÃO DE COMPRAS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AQUISICOES_RIGOR, competencias: ['Pesquisa de Preço', 'Negociação'] },
  { id: 'sec_contratos', nome: 'SEÇÃO DE CONTRATOS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AQUISICOES_RIGOR, competencias: ['Gestão Contratual', 'Análise Documental'] },
  { id: 'sec_licitacao', nome: 'SEÇÃO DE LICITAÇÃO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AQUISICOES_RIGOR, competencias: ['Pregão', 'Editais'] },
  { id: 'sec_almoxarifado', nome: 'SEÇÃO DE ALMOXARIFADO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Controle de Estoque', 'Logística'] },
  { id: 'sec_patrimonio', nome: 'SEÇÃO DE PATRIMÔNIO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Inventário', 'Controle de Bens'] },
  { id: 'sec_transporte', nome: 'SEÇÃO DE TRANSPORTE', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Logística de Frota', 'Manutenção Veicular'] },
  { id: 'sec_zeladoria', nome: 'SEÇÃO DE ZELADORIA', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Limpeza', 'Conservação'] },
  { id: 'div_passagens', nome: 'DIVISÃO DE PASSAGENS E DIÁRIAS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.ATENDIMENTO_PUBLICO, competencias: ['Logística de Viagem', 'Atendimento'] },

  // --- INFRAESTRUTURA ---
  { id: 'coord_manut_proj', nome: 'COORDENADORIA DE MANUTENÇÃO E PROJETOS', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_PROJETOS, competencias: ['Gestão de Obras', 'Projetos'] },
  { id: 'nucleo_eng_arq', nome: 'NÚCLEO DE ENGENHARIA E ARQUITETURA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_PROJETOS, competencias: ['Engenharia', 'Arquitetura'] },
  { id: 'sec_eng', nome: 'SEÇÃO DE ENGENHARIA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_PROJETOS, competencias: ['Cálculo Estrutural', 'Fiscalização de Obras'] },
  { id: 'sec_arq', nome: 'SEÇÃO DE ARQUITETURA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_PROJETOS, competencias: ['Layout', 'Projetos Arquitetônicos'] },
  { id: 'sec_manut_bens', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Reparos', 'Manutenção Predial'] },

  // --- GESTÃO DE PESSOAS ---
  { id: 'sec_sgp', nome: 'SECRETARIA DE GESTÃO DE PESSOAS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Gestão de RH', 'Estratégia'] },
  { id: 'gab_apoio_sgp', nome: 'GABINETE DE APOIO À SGP', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Suporte Administrativo', 'Comunicação'] },
  { id: 'ass_gov_sgp', nome: 'ASSESSORIA DE GOVERNANÇA DE GESTÃO DE PESSOAS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Governança', 'Indicadores'] },
  { id: 'coord_saude', nome: 'COORDENADORIA DE SAÚDE', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_DESENVOLVIMENTO, competencias: ['Gestão de Saúde', 'Acolhimento'] },
  { id: 'coord_inf_func', nome: 'COORDENADORIA DE INFORMAÇÕES FUNCIONAIS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_TECNICO, competencias: ['Dados Funcionais', 'Sigilo'] },
  { id: 'coord_pag_pessoal', nome: 'COORD. DE GESTÃO DE PAGAMENTO DE PESSOAL', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_TECNICO, competencias: ['Folha de Pagamento', 'Conformidade'] },
  { id: 'coord_desenv_pessoas', nome: 'COORD. DE GESTÃO DO DESENVOLVIMENTO', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_DESENVOLVIMENTO, competencias: ['Treinamento', 'Desenvolvimento'] },
  { id: 'div_leg_pessoal', nome: 'DIVISÃO DE LEGISLAÇÃO DE PESSOAL', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Legislação', 'Pareceres'] },
  { id: 'sec_pag_magistrados', nome: 'SEÇÃO DE PAGAMENTO A MAGISTRADOS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_TECNICO, competencias: ['Cálculos Complexos', 'Sigilo'] },
  { id: 'sec_pag_servidores', nome: 'SEÇÃO DE PAGAMENTO A SERVIDORES', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_TECNICO, competencias: ['Folha de Servidores', 'Atenção'] },
  { id: 'sec_beneficios', nome: 'SEÇÃO DE BENEFÍCIOS E ESTÁGIO', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.ATENDIMENTO_PUBLICO, competencias: ['Gestão de Benefícios', 'Atendimento'] },

  // --- ORÇAMENTO E FINANÇAS ---
  { id: 'sec_sof', nome: 'SECRETARIA DE ORÇAMENTO E FINANÇAS', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Gestão Financeira', 'Responsabilidade Fiscal'] },
  { id: 'coord_gestao_fin', nome: 'COORDENADORIA DE GESTÃO FINANCEIRA', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Execução Financeira', 'Controle'] },
  { id: 'div_analise_contabil', nome: 'DIVISÃO DE ANÁLISE CONTÁBIL', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.CALCULOS_EXATOS, competencias: ['Contabilidade', 'Tributos'] },
  { id: 'sec_pag_bens', nome: 'SEÇÃO DE PAGAMENTO DE BENS E SERVIÇOS', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.RH_TECNICO, competencias: ['Pagamentos', 'Conferência'] },

  // --- ESTRATÉGIA E PROJETOS ---
  { id: 'sec_gov_estrat', nome: 'SECRETARIA DE GOVERNANÇA E ESTRATÉGIA', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Planejamento Estratégico', 'Metas'] },
  { id: 'div_estatistica', nome: 'DIVISÃO DE ESTATÍSTICA', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Análise de Dados', 'Estatística'] },
  { id: 'div_lab_inov', nome: 'LABORATÓRIO DE INOVAÇÃO (LIODS)', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.INOVACAO_CRIATIVIDADE, competencias: ['Inovação', 'Criatividade', 'Design Thinking'] },
  { id: 'sec_auditoria', nome: 'SECRETARIA DE AUDITORIA', setor: 'Auditoria', categoria: 'Auditoria e Controle', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Auditoria Interna', 'Risco'] },

  // --- TIC (SETIC) ---
  { id: 'sec_tic', nome: 'SECRETARIA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÕES', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Governança de TI', 'Inovação', 'Gestão Estratégica'] },
  { id: 'coord_op_suporte', nome: 'COORDENADORIA DE OPERAÇÃO E SUPORTE', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_GESTAO, competencias: ['Operações', 'Infraestrutura'] },
  { id: 'div_seg_info', nome: 'DIVISÃO DE SEGURANÇA DA INFORMAÇÃO', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Cibersegurança', 'Riscos'] },
  { id: 'div_sist_info', nome: 'DIVISÃO DE SISTEMA DE INFORMAÇÃO', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['Desenvolvimento', 'Software'] },
  { id: 'nucleo_cli_tic', nome: 'NÚCLEO DE ATENDIMENTO A CLIENTES DE TIC', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_SUPORTE, competencias: ['Service Desk', 'Suporte'] },
  { id: 'sec_desenv_sist', nome: 'SEÇÃO DE DESENVOLVIMENTO DE SISTEMAS', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['Programação', 'Engenharia de Software'] },
  { id: 'sec_tec_pje', nome: 'SEÇÃO TÉCNICA DO PJE', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['PJe', 'Configuração'] },

  // --- ESCOLA JUDICIAL E CULTURA ---
  { id: 'sec_ejud', nome: 'SECRETARIA DA ESCOLA JUDICIAL', setor: 'EJUD', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.EDUCACAO_MEMORIA, competencias: ['Gestão Educacional', 'Pedagogia'] },
  { id: 'sec_biblioteca', nome: 'SEÇÃO DE BIBLIOTECA', setor: 'Cultura', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.EDUCACAO_MEMORIA, competencias: ['Biblioteconomia', 'Pesquisa'] },
  { id: 'coord_memoria', nome: 'CENTRO DE MEMÓRIA', setor: 'Cultura', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.EDUCACAO_MEMORIA, competencias: ['História', 'Preservação'] },

  // --- COMUNICAÇÃO E SEGURANÇA ---
  { id: 'div_ouvidoria', nome: 'DIVISÃO DA OUVIDORIA', setor: 'Ouvidoria', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.CONCILIACAO, competencias: ['Escuta Ativa', 'Mediação'] },
  { id: 'coord_com_social', nome: 'COORDENADORIA DE COMUNICAÇÃO SOCIAL', setor: 'Comunicação', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.INOVACAO_CRIATIVIDADE, competencias: ['Imprensa', 'Mídia', 'Comunicação'] },
  { id: 'coord_policia', nome: 'COORDENADORIA DE POLÍCIA JUDICIAL', setor: 'Segurança', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Segurança', 'Estratégia de Segurança'] },
  { id: 'sec_seg_pol', nome: 'SEÇÃO DE SEGURANÇA DE POLÍCIA JUDICIAL', setor: 'Segurança', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Segurança Patrimonial', 'Disciplina'] },
  { id: 'sec_socioambiental', nome: 'SEÇÃO DE GESTÃO SOCIOAMBIENTAL', setor: 'Sustentabilidade', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.INOVACAO_CRIATIVIDADE, competencias: ['Sustentabilidade', 'Acessibilidade'] }
];

// Helper para agrupar as unidades
const unidadesAgrupadas = unidadesTRT11.reduce((acc, unit) => {
  if (!acc[unit.categoria]) acc[unit.categoria] = [];
  acc[unit.categoria].push(unit);
  return acc;
}, {});

export default function PeopleAnalyticsTRT11() {
  // Step 0: Selection Mode (New or Upload)
  // Step 1: Quiz
  // Step 2: Unit Selection
  // Step 3: Results
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(0); 
  
  const fileInputRef = useRef(null);
  const apiKey = ""; // API Key Environment Variable

  // PAGINAÇÃO
  const QUESTIONS_PER_PAGE = 10;
  const totalPages = Math.ceil(BIG_FIVE_120.length / QUESTIONS_PER_PAGE);
  const currentQuestions = BIG_FIVE_120.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE);

  // --- LÓGICA DE UPLOAD (GEMINI) ---
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setErrorMsg('');

      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Data = e.target.result.split(',')[1];
          analyzeWithGemini({ inlineData: { mimeType: 'application/pdf', data: base64Data } }, file.name);
        };
        reader.onerror = () => { setLoading(false); setErrorMsg('Erro ao ler o arquivo PDF.'); };
        reader.readAsDataURL(file);
      } else {
        setLoading(false);
        setErrorMsg('Por favor, envie um arquivo PDF válido.');
      }
    }
  };

  const analyzeWithGemini = async (contentPart, fileName) => {
    const systemInstruction = `
      Atue como um especialista em psicometria. Analise o documento PDF fornecido (que é um Relatório Big Five/OCEAN) e extraia os percentuais (0-100) dos 5 grandes fatores.
      
      Se o relatório usar termos diferentes, mapeie para:
      - Openness/Abertura
      - Conscientiousness/Conscienciosidade
      - Extraversion/Extroversão
      - Agreeableness/Amabilidade
      - Neuroticism/Instabilidade -> Inverta para Estabilidade (100 - Neuroticismo) se necessário, ou pegue Estabilidade Emocional diretamente.

      Retorne APENAS um objeto JSON válido (sem markdown):
      { "abertura": number, "conscienciosidade": number, "extroversao": number, "amabilidade": number, "estabilidade": number }
      
      Se não encontrar valores numéricos exatos, estime com precisão baseando-se em gráficos ou textos (Muito Baixo=10, Baixo=30, Médio=50, Alto=70, Muito Alto=90).
    `;

    try {
      const payload = {
        contents: [{ parts: Array.isArray(contentPart) ? contentPart : [contentPart] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { responseMimeType: "application/json" }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!jsonText) throw new Error("A IA não retornou dados válidos.");

      const extractedProfile = JSON.parse(jsonText);
      
      // Validar dados
      const requiredKeys = ['abertura', 'conscienciosidade', 'extroversao', 'amabilidade', 'estabilidade'];
      const isValid = requiredKeys.every(k => typeof extractedProfile[k] === 'number');

      if (!isValid) throw new Error("Dados incompletos no JSON retornado.");

      setUserProfile(extractedProfile);
      setStep(2); // Pula direto para seleção de unidade
    } catch (error) {
      console.error(error);
      setErrorMsg('Não foi possível interpretar o relatório PDF. Verifique se o arquivo está legível ou tente realizar o teste manual.');
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DO TESTE MANUAL ---
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      calculateBigFive();
    }
  };

  const canAdvance = currentQuestions.every(q => answers[q.id] !== undefined);

  // --- CÁLCULO CIENTÍFICO DO BIG FIVE ---
  const calculateBigFive = () => {
    setLoading(true);
    setTimeout(() => {
      let scores = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };
      let counts = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };

      BIG_FIVE_120.forEach(q => {
        let val = answers[q.id];
        if (val === undefined) val = 3; 
        const adjustedVal = q.key === 1 ? val : (6 - val);
        scores[q.trait] += adjustedVal;
        counts[q.trait] += 1;
      });

      const finalProfile = {};
      Object.keys(scores).forEach(trait => {
        if (counts[trait] > 0) {
          const avg = scores[trait] / counts[trait];
          finalProfile[trait] = Math.round(((avg - 1) / 4) * 100);
        } else {
          finalProfile[trait] = 0;
        }
      });

      setUserProfile(finalProfile);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  // --- LÓGICA DE MATCH ---
  const calculateMatch = (unit) => {
    if (!unit || !userProfile) return;
    setLoading(true);
    
    setTimeout(() => {
      const u = userProfile;
      const i = unit.perfil_ideal;
      const traits = ['abertura', 'conscienciosidade', 'extroversao', 'amabilidade', 'estabilidade'];
      
      let totalDiff = 0;
      let analysis = [];

      traits.forEach(t => {
        const diff = u[t] - i[t];
        totalDiff += Math.abs(diff);

        if (diff < -20) {
          analysis.push({ type: 'gap', trait: t, text: `Nível significativamente menor que o ideal (-${Math.abs(diff)}%).` });
        } else if (diff > 25) {
          analysis.push({ type: 'warn', trait: t, text: `Nível acima do perfil esperado (+${diff}%). Pode haver subutilização.` });
        }
      });

      const fit = Math.max(0, Math.round(100 - (totalDiff / 5)));

      setMatchResult({ score: fit, details: analysis });
      setSelectedUnit(unit);
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleRestart = () => {
    setStep(0);
    setCurrentPage(0);
    setAnswers({});
    setUserProfile(null);
    setSelectedUnit(null);
    setMatchResult(null);
    setErrorMsg('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Styles for Printing */}
      <style>{`
        @media print {
          @page { margin: 1cm; size: A4; }
          body { -webkit-print-color-adjust: exact; background: white; }
          header, .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          .shadow-xl, .shadow-lg, .shadow-sm { box-shadow: none !important; border: 1px solid #ddd; }
          .bg-slate-50 { background-color: #f8fafc !important; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">TRT11 People Analytics</h1>
              <p className="text-xs text-blue-200">Avaliação de Fit Cultural - Metodologia IPIP-NEO-120</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-white/10 px-3 py-1 rounded border border-white/20">
            <BrainCircuit className="w-3 h-3 text-yellow-300" />
            <span>AI Powered v2.1</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        
        {/* Progress Stepper (Only show if Step > 0) */}
        {step > 0 && (
          <div className="flex items-center justify-center mb-10 text-sm no-print">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 transition-colors ${step >= 1 ? 'bg-indigo-100 border-indigo-600' : 'border-slate-300'}`}>1</span>
              Mapeamento
            </div>
            <div className="w-16 h-1 bg-slate-200 mx-2"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-indigo-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 transition-colors ${step >= 2 ? 'bg-indigo-100 border-indigo-600' : 'border-slate-300'}`}>2</span>
              Seleção
            </div>
            <div className="w-16 h-1 bg-slate-200 mx-2"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-indigo-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 transition-colors ${step >= 3 ? 'bg-indigo-100 border-indigo-600' : 'border-slate-300'}`}>3</span>
              Relatório
            </div>
          </div>
        )}

        {/* STEP 0: SELECTION MODE */}
        {step === 0 && (
          <div className="max-w-4xl mx-auto animate-fade-in-up py-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Bem-vindo ao Sistema de People Analytics</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Utilize nossa inteligência artificial para mapear seu perfil comportamental (Big Five) e encontrar a unidade do TRT11 com maior aderência cultural.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Option A: Manual Quiz */}
              <div 
                onClick={() => setStep(1)}
                className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-indigo-500 cursor-pointer transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="w-32 h-32 text-indigo-600" />
                </div>
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Realizar Teste Completo</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Responda ao inventário IPIP-120 diretamente na plataforma. Ideal para quem ainda não possui um laudo recente.
                </p>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md group-hover:bg-indigo-700 transition-colors">
                  Iniciar Teste Agora
                </button>
              </div>

              {/* Option B: Upload PDF */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all group relative overflow-hidden">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  accept=".pdf"
                />
                <div 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click
                    if(!loading) fileInputRef.current.click();
                  }}
                  className="h-full flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Upload className="w-32 h-32 text-purple-600" />
                  </div>
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {loading ? <Loader2 className="w-8 h-8 text-purple-600 animate-spin" /> : <Sparkles className="w-8 h-8 text-purple-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Upload de Resultado PDF</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Já fez o teste? Envie seu relatório PDF (Big Five/OCEAN) e nossa IA extrairá os dados automaticamente.
                  </p>
                  <button className="w-full py-3 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-bold group-hover:bg-purple-50 transition-colors mt-auto">
                    {loading ? 'Processando IA...' : 'Selecionar Arquivo PDF'}
                  </button>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="mt-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-3 animate-pulse">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                {errorMsg}
              </div>
            )}
          </div>
        )}

        {/* STEP 1: IPIP-NEO-120 QUIZ */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6">
              <div className="p-6 bg-indigo-50 border-b border-indigo-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    Teste de Personalidade (IPIP-120)
                  </h2>
                  <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded">
                    Página {currentPage + 1} de {totalPages}
                  </span>
                </div>
                <p className="text-indigo-700 text-xs mt-2">
                  Avalie o quanto cada afirmação descreve você. Seja honesto(a) para garantir a precisão do perfil.
                </p>
              </div>

              <div className="p-8 space-y-8">
                {currentQuestions.map((q) => (
                  <div key={q.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <p className="text-slate-800 font-medium mb-3 text-sm md:text-base">
                      {q.id}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleAnswer(q.id, val)}
                          className={`
                            flex flex-col items-center justify-center py-3 rounded-lg border text-sm transition-all
                            ${answers[q.id] === val 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}
                          `}
                        >
                          <span className="font-bold text-lg">{val}</span>
                          <span className="text-[9px] uppercase hidden sm:block mt-1">
                            {val === 1 ? 'Discordo Totalmente' : val === 5 ? 'Concordo Totalmente' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <div className="text-xs text-slate-400">
                  Respondido: {Object.keys(answers).length} de {BIG_FIVE_120.length}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={!canAdvance}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all
                    ${canAdvance 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                  `}
                >
                  {currentPage === totalPages - 1 ? (
                    loading ? 'Calculando...' : 'Finalizar e Calcular'
                  ) : (
                    'Próxima Página'
                  )}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: UNIT SELECTION */}
        {step === 2 && userProfile && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Left Panel: User Profile Result */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Seu Perfil OCEAN
                </h3>
                
                <div className="space-y-6">
                  {Object.keys(TRAITS_CONFIG).map((trait) => (
                    <div key={trait}>
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-xs font-bold uppercase ${TRAITS_CONFIG[trait].color}`}>
                          {TRAITS_CONFIG[trait].label}
                        </span>
                        <span className="font-mono font-bold text-slate-700 text-sm">{userProfile[trait]}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${TRAITS_CONFIG[trait].bg}`} 
                          style={{ width: `${userProfile[trait]}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                        {TRAITS_CONFIG[trait].desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button onClick={handleRestart} className="w-full py-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                    <RotateCcw className="w-3 h-3" /> REINICIAR TESTE
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Unit Selection */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 h-full">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-800">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Seleção de Unidade para Fit
                </h2>
                <p className="text-slate-500 mb-8 text-sm">
                  Selecione uma das {unidadesTRT11.length} unidades do tribunal para comparar seu perfil com o arquétipo ideal.
                </p>

                <div className="space-y-8">
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Unidade de Destino</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm text-sm"
                        onChange={(e) => {
                          const unit = unidadesTRT11.find(u => u.id === e.target.value);
                          setPreviewUnit(unit);
                        }}
                        value={previewUnit?.id || ""}
                      >
                        <option value="">Selecione na lista...</option>
                        {Object.keys(unidadesAgrupadas).map((categoria) => (
                          <optgroup key={categoria} label={categoria} className="font-bold text-indigo-900">
                            {unidadesAgrupadas[categoria].map((unit) => (
                              <option key={unit.id} value={unit.id} className="text-slate-700">
                                {unit.nome}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {previewUnit ? (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                      <div className="mb-6 pb-6 border-b border-indigo-200/50">
                        <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                          {previewUnit.categoria}
                        </span>
                        <h3 className="text-xl font-bold text-indigo-900">{previewUnit.nome}</h3>
                        <p className="text-indigo-600 text-sm mt-1">{previewUnit.setor}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Fatores Chave (Perfil Ideal)</h4>
                          <div className="space-y-2">
                             {Object.entries(previewUnit.perfil_ideal)
                               .sort(([,a], [,b]) => b - a)
                               .slice(0, 3) // Top 3 traits
                               .map(([key, val]) => (
                                 <div key={key} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-indigo-100 shadow-sm">
                                   <div className="flex items-center gap-2">
                                     <div className={`w-2 h-2 rounded-full ${TRAITS_CONFIG[key].bg}`}></div>
                                     <span className="capitalize text-slate-700 font-medium">{key}</span>
                                   </div>
                                   <span className="font-bold text-indigo-900">{val}%</span>
                                 </div>
                               ))}
                           </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Competências Exigidas</h4>
                          <div className="flex flex-wrap gap-2">
                            {previewUnit.competencias.map(c => (
                              <span key={c} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 shadow-sm">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => calculateMatch(previewUnit)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform active:scale-[0.99]"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processando Algoritmo...</span>
                          </div>
                        ) : (
                          <>
                            <BrainCircuit className="w-5 h-5" />
                            CALCULAR ADERÊNCIA (FIT)
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50/50">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-400 text-sm font-medium">Selecione uma unidade acima para visualizar os detalhes.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && selectedUnit && matchResult && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2 no-print">
              <div className="flex gap-2">
                <button 
                  onClick={() => { setStep(2); setPreviewUnit(selectedUnit); }}
                  className="text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  &larr; Voltar
                </button>
                <button 
                  onClick={handleRestart}
                  className="text-sm bg-white border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Nova Análise
                </button>
              </div>

              <button 
                onClick={handlePrint}
                className="text-sm bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md font-bold"
              >
                <Download className="w-4 h-4" /> Baixar Relatório (PDF)
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 print:border-0 print:shadow-none">
              {/* Score Header */}
              <div className="bg-slate-50 p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 print:bg-white print:border-b-2 print:border-slate-800">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">TRT11 PEOPLE ANALYTICS</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Relatório de Aderência (Fit)</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Candidato</span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 print:border-0 print:bg-transparent print:text-black print:p-0">
                      {selectedUnit.nome}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block print:block">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Aderência Global</div>
                    <div className={`text-4xl font-black ${matchResult.score >= 75 ? 'text-green-600' : matchResult.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {matchResult.score}%
                    </div>
                  </div>
                  
                  {/* Score Circle */}
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white print:text-black print:shadow-none print:ring-0
                    ${matchResult.score >= 75 ? 'bg-gradient-to-br from-green-400 to-green-600 print:bg-none' : 
                      matchResult.score >= 50 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 print:bg-none' : 
                      'bg-gradient-to-br from-red-400 to-red-600 print:bg-none'}
                  `}>
                    {matchResult.score >= 75 ? 'A' : matchResult.score >= 50 ? 'B' : 'C'}
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 print:block">
                
                {/* Visual Chart - Detailed */}
                <div className="space-y-8 print:mb-8">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <BarChart2 className="w-4 h-4 text-indigo-500" /> Comparativo Detalhado
                    </h3>
                    <div className="flex gap-4 text-[10px] uppercase font-bold text-slate-400">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Você</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-slate-200"></div> Ideal</span>
                    </div>
                  </div>
                  
                  {Object.keys(TRAITS_CONFIG).map(trait => {
                    const diff = userProfile[trait] - selectedUnit.perfil_ideal[trait];
                    return (
                      <div key={trait} className="relative print:mb-4">
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={`uppercase ${TRAITS_CONFIG[trait].color} print:text-black`}>{TRAITS_CONFIG[trait].label}</span>
                          <span className="text-slate-400 print:text-black">Diff: {diff > 0 ? `+${diff}` : diff}%</span>
                        </div>
                        
                        {/* Bar Track */}
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative print:border print:border-slate-300">
                          
                          {/* Ideal Range Marker (Soft Background) */}
                          <div 
                            className="absolute top-0 bottom-0 bg-slate-200 opacity-50 z-0 print:bg-slate-300"
                            style={{ 
                              left: '0%', 
                              width: `${selectedUnit.perfil_ideal[trait]}%` 
                            }}
                          ></div>
                          
                          {/* Ideal Line */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" 
                            style={{ left: `${selectedUnit.perfil_ideal[trait]}%` }}
                          ></div>

                          {/* User Score Bar */}
                          <div 
                            className={`absolute top-1 bottom-1 rounded-full z-20 ${TRAITS_CONFIG[trait].bg} shadow-sm print:bg-black`}
                            style={{ width: `${userProfile[trait]}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Textual Analysis */}
                <div className="space-y-6 print:break-before-auto">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 text-sm uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Diagnóstico da IA
                  </h3>

                  {matchResult.details.length === 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex gap-4 print:border-black">
                      <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800 text-sm mb-1">Sinergia Elevada</h4>
                        <p className="text-green-700 text-sm leading-relaxed">
                          Seu perfil Big Five demonstra grande alinhamento com as expectativas comportamentais desta unidade. Os traços de personalidade identificados sugerem uma adaptação natural à cultura e aos desafios do setor.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-1 print:bg-white">
                      <ul className="divide-y divide-slate-100">
                        {matchResult.details.map((item, idx) => (
                          <li key={idx} className="p-4 flex gap-3 items-start">
                            {item.type === 'gap' 
                              ? <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> 
                              : <div className="w-5 h-5 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">!</div>
                            }
                            <div>
                              <span className={`text-xs font-bold uppercase block mb-1 ${TRAITS_CONFIG[item.trait].color} print:text-black`}>
                                {TRAITS_CONFIG[item.trait].label}
                              </span>
                              <span className="text-slate-600 text-sm leading-snug">{item.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 print:bg-white print:border-black">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <h4 className="text-blue-900 font-bold text-xs uppercase">Nota Técnica</h4>
                    </div>
                    <p className="text-blue-700 text-xs leading-relaxed text-justify">
                      Esta análise utiliza o modelo dos Cinco Grandes Fatores (Big Five). O "Fit" não é determinístico; traços como <strong>Conscienciosidade</strong> e <strong>Abertura</strong> podem ser desenvolvidos conforme o contexto. Utilize este relatório como ferramenta de autoconhecimento e desenvolvimento profissional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}