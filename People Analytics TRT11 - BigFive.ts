import React, { useState, useRef, useEffect } from 'react';
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
  Loader2,
  CheckSquare,
  X,
  Check,
  Minus,
  ArrowLeft,
  GripHorizontal
} from 'lucide-react';

// --- CONFIGURAÇÃO E CONSTANTES ---

// Cores e Identidade dos 5 Fatores (OCEAN)
const TRAITS_CONFIG = {
  abertura: { 
    label: "Abertura (Intelecto)", 
    color: "text-orange-600", 
    bg: "bg-orange-500", 
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    desc: "Criatividade, curiosidade intelectual e apreço pelo novo."
  },
  conscienciosidade: { 
    label: "Conscienciosidade (Foco)", 
    color: "text-blue-600", 
    bg: "bg-blue-600", 
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    desc: "Disciplina, eficiência, ordem e foco em resultados."
  },
  extroversao: { 
    label: "Extroversão", 
    color: "text-yellow-600", 
    bg: "bg-yellow-500", 
    lightBg: "bg-yellow-50",
    border: "border-yellow-200",
    desc: "Entusiasmo, assertividade e busca por interação social."
  },
  amabilidade: { 
    label: "Amabilidade (Cooperação)", 
    color: "text-green-600", 
    bg: "bg-green-500", 
    lightBg: "bg-green-50",
    border: "border-green-200",
    desc: "Empatia, confiança nos outros e tendência a ajudar."
  },
  estabilidade: { 
    label: "Estabilidade Emocional", 
    color: "text-purple-600", 
    bg: "bg-purple-600", 
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    desc: "Calma, segurança e resistência ao estresse."
  }
};

// --- BASE DE ADJETIVOS (BIG FIVE MARKERS - 50 ITENS) ---
const BIG_FIVE_ADJECTIVES = [
  // ABERTURA
  { id: 1, text: "Criativo(a)", trait: 'abertura', key: 1 },
  { id: 2, text: "Imaginativo(a)", trait: 'abertura', key: 1 },
  { id: 3, text: "Inovador(a)", trait: 'abertura', key: 1 },
  { id: 4, text: "Intelectual", trait: 'abertura', key: 1 },
  { id: 5, text: "Artístico(a)", trait: 'abertura', key: 1 },
  { id: 6, text: "Curioso(a)", trait: 'abertura', key: 1 },
  { id: 7, text: "Filosófico(a)", trait: 'abertura', key: 1 },
  { id: 8, text: "Convencional", trait: 'abertura', key: -1 },
  { id: 9, text: "Rotineiro(a)", trait: 'abertura', key: -1 },
  { id: 10, text: "Conservador(a)", trait: 'abertura', key: -1 },

  // CONSCIENCIOSIDADE
  { id: 11, text: "Organizado(a)", trait: 'conscienciosidade', key: 1 },
  { id: 12, text: "Eficiente", trait: 'conscienciosidade', key: 1 },
  { id: 13, text: "Sistemático(a)", trait: 'conscienciosidade', key: 1 },
  { id: 14, text: "Prático(a)", trait: 'conscienciosidade', key: 1 },
  { id: 15, text: "Cuidadoso(a)", trait: 'conscienciosidade', key: 1 },
  { id: 16, text: "Disciplinado(a)", trait: 'conscienciosidade', key: 1 },
  { id: 17, text: "Pontual", trait: 'conscienciosidade', key: 1 },
  { id: 18, text: "Desorganizado(a)", trait: 'conscienciosidade', key: -1 },
  { id: 19, text: "Negligente", trait: 'conscienciosidade', key: -1 },
  { id: 20, text: "Indisciplinado(a)", trait: 'conscienciosidade', key: -1 },

  // EXTROVERSÃO
  { id: 21, text: "Comunicativo(a)", trait: 'extroversao', key: 1 },
  { id: 22, text: "Extrovertido(a)", trait: 'extroversao', key: 1 },
  { id: 23, text: "Energético(a)", trait: 'extroversao', key: 1 },
  { id: 24, text: "Ousado(a)", trait: 'extroversao', key: 1 },
  { id: 25, text: "Sociável", trait: 'extroversao', key: 1 },
  { id: 26, text: "Assertivo(a)", trait: 'extroversao', key: 1 },
  { id: 27, text: "Tímido(a)", trait: 'extroversao', key: -1 },
  { id: 28, text: "Silencioso(a)", trait: 'extroversao', key: -1 },
  { id: 29, text: "Reservado(a)", trait: 'extroversao', key: -1 },
  { id: 30, text: "Inibido(a)", trait: 'extroversao', key: -1 },

  // AMABILIDADE
  { id: 31, text: "Simpático(a)", trait: 'amabilidade', key: 1 },
  { id: 32, text: "Gentil", trait: 'amabilidade', key: 1 },
  { id: 33, text: "Cooperativo(a)", trait: 'amabilidade', key: 1 },
  { id: 34, text: "Generoso(a)", trait: 'amabilidade', key: 1 },
  { id: 35, text: "Prestativo(a)", trait: 'amabilidade', key: 1 },
  { id: 36, text: "Tolerante", trait: 'amabilidade', key: 1 },
  { id: 37, text: "Frio(a)", trait: 'amabilidade', key: -1 },
  { id: 38, text: "Rude", trait: 'amabilidade', key: -1 },
  { id: 39, text: "Egoísta", trait: 'amabilidade', key: -1 },
  { id: 40, text: "Exigente", trait: 'amabilidade', key: -1 },

  // ESTABILIDADE (Inverso de Neuroticismo)
  { id: 41, text: "Calmo(a)", trait: 'estabilidade', key: 1 },
  { id: 42, text: "Relaxado(a)", trait: 'estabilidade', key: 1 },
  { id: 43, text: "Seguro(a)", trait: 'estabilidade', key: 1 },
  { id: 44, text: "Estável", trait: 'estabilidade', key: 1 },
  { id: 45, text: "Equilibrado(a)", trait: 'estabilidade', key: 1 }, 
  { id: 46, text: "Ansioso(a)", trait: 'estabilidade', key: -1 },
  { id: 47, text: "Nervoso(a)", trait: 'estabilidade', key: -1 },
  { id: 48, text: "Temperamental", trait: 'estabilidade', key: -1 },
  { id: 49, text: "Inseguro(a)", trait: 'estabilidade', key: -1 },
  { id: 50, text: "Emotivo(a)", trait: 'estabilidade', key: -1 }
];

// --- ARQUÉTIPOS IDEAIS POR CATEGORIA ---
const ARQUETIPOS = {
  // ESTRATÉGIA E LIDERANÇA
  LIDERANCA_VISIONARIA: { abertura: 95, conscienciosidade: 60, extroversao: 85, amabilidade: 70, estabilidade: 85 },
  GESTAO_OPERACIONAL_ALTA: { abertura: 50, conscienciosidade: 95, extroversao: 75, amabilidade: 50, estabilidade: 90 },

  // JURÍDICO
  JURIDICO_INTELECTUAL: { abertura: 85, conscienciosidade: 80, extroversao: 30, amabilidade: 45, estabilidade: 75 },
  JURIDICO_PROCEDIMENTAL: { abertura: 30, conscienciosidade: 95, extroversao: 45, amabilidade: 50, estabilidade: 85 },
  JURIDICO_CONCILIADOR: { abertura: 60, conscienciosidade: 55, extroversao: 80, amabilidade: 95, estabilidade: 85 },

  // EXATAS E CONTROLE
  AUDITORIA_RIGOROSA: { abertura: 30, conscienciosidade: 98, extroversao: 40, amabilidade: 25, estabilidade: 90 },
  CALCULOS_FINANCAS: { abertura: 40, conscienciosidade: 95, extroversao: 25, amabilidade: 50, estabilidade: 80 },

  // ATENDIMENTO E OPERACIONAL
  ATENDIMENTO_EMPATICO: { abertura: 50, conscienciosidade: 60, extroversao: 90, amabilidade: 90, estabilidade: 70 },
  LOGISTICA_DINAMICA: { abertura: 55, conscienciosidade: 80, extroversao: 75, amabilidade: 60, estabilidade: 80 },
  SEGURANCA_VIGILANTE: { abertura: 25, conscienciosidade: 85, extroversao: 65, amabilidade: 30, estabilidade: 95 },

  // ADMINISTRATIVO
  SUPORTE_ROTINA: { abertura: 25, conscienciosidade: 90, extroversao: 50, amabilidade: 75, estabilidade: 80 },
  COMPRAS_NEGOCIACAO: { abertura: 60, conscienciosidade: 85, extroversao: 80, amabilidade: 40, estabilidade: 85 },

  // TECNOLOGIA E PROJETOS
  TIC_INOVACAO_AGILE: { abertura: 95, conscienciosidade: 60, extroversao: 60, amabilidade: 70, estabilidade: 75 },
  TIC_INFRA_ESTRUTURADA: { abertura: 45, conscienciosidade: 90, extroversao: 40, amabilidade: 55, estabilidade: 80 },
  ENGENHARIA_TECNICA: { abertura: 65, conscienciosidade: 90, extroversao: 40, amabilidade: 45, estabilidade: 80 },

  // GESTÃO DE PESSOAS E CULTURA
  RH_ACOLHIMENTO: { abertura: 75, conscienciosidade: 50, extroversao: 85, amabilidade: 95, estabilidade: 70 },
  RH_NORMATIVO: { abertura: 35, conscienciosidade: 95, extroversao: 50, amabilidade: 60, estabilidade: 85 },
  COMUNICACAO_CRIATIVA: { abertura: 95, conscienciosidade: 55, extroversao: 90, amabilidade: 80, estabilidade: 65 }
};

// --- BASE DE DADOS COMPLETA DE UNIDADES TRT11 ---
const unidadesTRT11 = [
  // --- ALTA ADMINISTRAÇÃO ---
  { id: 'presidencia', nome: 'PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA, competencias: ['Visão Estratégica', 'Liderança', 'Articulação Política'] },
  { id: 'dg', nome: 'DIRETORIA-GERAL', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA, competencias: ['Gestão Executiva', 'Tomada de Decisão', 'Visão Sistêmica'] },
  { id: 'gab_dg', nome: 'GABINETE DA DIRETORIA-GERAL', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.GESTAO_OPERACIONAL_ALTA, competencias: ['Suporte Executivo', 'Organização', 'Discrição'] },
  { id: 'sec_geral_pres', nome: 'SECRETARIA-GERAL DA PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.GESTAO_OPERACIONAL_ALTA, competencias: ['Gestão de Fluxos', 'Comunicação Oficial', 'Protocolo'] },
  { id: 'ass_ordenanca', nome: 'ASSESSORIA DE ORDENANÇA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.LOGISTICA_DINAMICA, competencias: ['Logística', 'Disciplina', 'Prontidão'] },
  { id: 'div_apoio_vp', nome: 'DIVISÃO DE APOIO À VICE-PRESIDÊNCIA', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Gestão de Admissibilidade', 'Apoio Administrativo'] },
  { id: 'sec_ass_jur_adm', nome: 'SECRETARIA DE ASSESSORAMENTO JURÍDICO-ADMINISTRATIVO', setor: 'Alta Administração', categoria: 'Presidência e Direção', perfil_ideal: ARQUETIPOS.JURIDICO_INTELECTUAL, competencias: ['Pareceres Jurídicos', 'Direito Administrativo'] },

  // --- CORREGEDORIA ---
  { id: 'sec_corregedoria', nome: 'SECRETARIA DA CORREGEDORIA REGIONAL', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.AUDITORIA_RIGOROSA, competencias: ['Fiscalização', 'Normatização', 'Gestão Correicional'] },
  { id: 'coord_apoio_correg', nome: 'COORDENADORIA DE APOIO À SECRETARIA DA CORREGEDORIA', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Apoio Administrativo', 'Organização de Correicões'] },
  { id: 'gab_apoio_correg', nome: 'GABINETE DE APOIO À CORREGEDORIA', setor: 'Corregedoria', categoria: 'Corregedoria', perfil_ideal: ARQUETIPOS.JURIDICO_INTELECTUAL, competencias: ['Suporte Técnico', 'Análise Processual'] },

  // --- JUDICIÁRIO ---
  { id: 'gab_desembargador', nome: 'GABINETE DESEMBARGADOR', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_INTELECTUAL, competencias: ['Técnica Jurídica', 'Redação de Votos', 'Pesquisa Jurisprudencial'] },
  { id: 'sec_vara_trabalho', nome: 'SECRETARIA DE VARA DO TRABALHO', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_PROCEDIMENTAL, competencias: ['Atendimento', 'Celeridade Processual', 'PJe'] },
  { id: 'sec_pleno', nome: 'SECRETARIA DO TRIBUNAL PLENO E SEÇÕES ESPECIALIZADAS', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.GESTAO_OPERACIONAL_ALTA, competencias: ['Gestão de Sessões', 'Ata de Julgamento'] },
  { id: 'coord_apoio_turma', nome: 'COORDENADORIA DE APOIO À TURMA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_PROCEDIMENTAL, competencias: ['Apoio a Sessões', 'Gestão de Pauta'] },
  { id: 'gab_apoio_sgj', nome: 'GABINETE DE APOIO À SECRETARIA-GERAL JUDICIÁRIA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Suporte Administrativo', 'Gestão Judiciária'] },
  { id: 'nucleo_recursos', nome: 'NÚCLEO DE RECURSOS', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.JURIDICO_INTELECTUAL, competencias: ['Admissibilidade Recursal', 'Análise Técnica', 'Prazos'] },
  { id: 'centro_intel_prec', nome: 'CENTRO DE INTELIGÊNCIA - PRECEDENTES', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Pesquisa Jurídica', 'Gestão de Precedentes'] },
  { id: 'sec_jurisprudencia', nome: 'SEÇÃO DE JURISPRUDÊNCIA', setor: 'Judiciário', categoria: 'Unidades Judiciárias', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Sistematização', 'Pesquisa', 'Catalogação'] },
  { id: 'div_contadoria', nome: 'DIVISÃO DE CONTADORIA JURÍDICA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.CALCULOS_FINANCAS, competencias: ['Cálculos Judiciais', 'Matemática Financeira', 'PJe-Calc'] },
  { id: 'div_coop_jud', nome: 'DIVISÃO DE COOPERAÇÃO JUDICIÁRIA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.ATENDIMENTO_EMPATICO, competencias: ['Comunicação Interinstitucional', 'Cartas Precatórias'] },
  { id: 'div_exec_conc', nome: 'DIVISÃO DE EXECUÇÃO CONCENTRADA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.JURIDICO_PROCEDIMENTAL, competencias: ['Execução Trabalhista', 'Reunião de Processos'] },
  { id: 'div_pesq_patrimonial', nome: 'DIVISÃO DE PESQUISA PATRIMONIAL', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Investigação Patrimonial', 'Análise de Dados'] },
  { id: 'sec_exec_fazenda', nome: 'SECRETARIA DE EXECUÇÃO DA FAZENDA PÚBLICA', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.JURIDICO_PROCEDIMENTAL, competencias: ['Gestão de Precatórios', 'Direito Público'] },

  // --- APOIO E DISTRIBUIÇÃO ---
  { id: 'div_dist_manaus', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (MANAUS)', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Distribuição Processual', 'Agilidade'] },
  { id: 'div_dist_bv', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (BOA VISTA)', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Distribuição Processual', 'Agilidade'] },
  { id: 'div_adm_ftm', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTM', setor: 'Administrativo', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Gestão Predial', 'Apoio Logístico'] },
  { id: 'sec_mandados', nome: 'SEÇÃO DE MANDADOS JUDICIAIS', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.DILIGENCIA_SEGURANCA, competencias: ['Diligências Externas', 'Cumprimento de Ordens'] },
  { id: 'sec_hasta', nome: 'SEÇÃO DE HASTA PÚBLICA', setor: 'Judiciário', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Leilões Judiciais', 'Organização de Eventos'] },
  { id: 'div_apoio_cejusc_ftm', nome: 'DIVISÃO DE APOIO AO CEJUSC FTM', setor: 'Conciliação', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.JURIDICO_CONCILIADOR, competencias: ['Conciliação', 'Atendimento Humanizado', 'Negociação'] },
  { id: 'coord_metodos_consensuais', nome: 'NÚCLEO PERMANENTE DE MÉTODOS CONSENSUAIS', setor: 'Conciliação', categoria: 'Apoio e Distribuição', perfil_ideal: ARQUETIPOS.JURIDICO_CONCILIADOR, competencias: ['Gestão de Conflitos', 'Planejamento'] },

  // --- ADMINISTRAÇÃO E LOGÍSTICA ---
  { id: 'sec_adm', nome: 'SECRETARIA DE ADMINISTRAÇÃO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.GESTAO_OPERACIONAL_ALTA, competencias: ['Gestão Administrativa', 'Coordenação'] },
  { id: 'gab_apoio_sad', nome: 'GABINETE DE APOIO À SAD', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Suporte Administrativo', 'Redação'] },
  { id: 'coord_mat_log', nome: 'COORDENADORIA DE MATERIAL E LOGÍSTICA', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_DINAMICA, competencias: ['Logística', 'Gestão de Estoque'] },
  { id: 'coord_lic_contratos', nome: 'COORDENADORIA DE LICITAÇÃO E CONTRATOS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AUDITORIA_RIGOROSA, competencias: ['Legislação de Licitações', 'Gestão Contratual'] },
  { id: 'coord_gov_contratacoes', nome: 'COORDENADORIA DE GOVERNANÇA DE CONTRATAÇÕES', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA, competencias: ['Governança', 'Planejamento'] },
  { id: 'sec_compras', nome: 'SEÇÃO DE COMPRAS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.COMPRAS_NEGOCIACAO, competencias: ['Pesquisa de Preço', 'Negociação'] },
  { id: 'sec_contratos', nome: 'SEÇÃO DE CONTRATOS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AUDITORIA_RIGOROSA, competencias: ['Gestão Contratual', 'Análise Documental'] },
  { id: 'sec_licitacao', nome: 'SEÇÃO DE LICITAÇÃO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.AUDITORIA_RIGOROSA, competencias: ['Pregão', 'Editais'] },
  { id: 'sec_almoxarifado', nome: 'SEÇÃO DE ALMOXARIFADO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Controle de Estoque', 'Logística'] },
  { id: 'sec_patrimonio', nome: 'SEÇÃO DE PATRIMÔNIO', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Inventário', 'Controle de Bens'] },
  { id: 'sec_transporte', nome: 'SEÇÃO DE TRANSPORTE', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Logística de Frota', 'Manutenção Veicular'] },
  { id: 'sec_zeladoria', nome: 'SEÇÃO DE ZELADORIA', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Limpeza', 'Conservação'] },
  { id: 'div_passagens', nome: 'DIVISÃO DE PASSAGENS E DIÁRIAS', setor: 'Administrativo', categoria: 'Administração e Logística', perfil_ideal: ARQUETIPOS.ATENDIMENTO_EMPATICO, competencias: ['Logística de Viagem', 'Atendimento'] },

  // --- INFRAESTRUTURA ---
  { id: 'coord_manut_proj', nome: 'COORDENADORIA DE MANUTENÇÃO E PROJETOS', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_TECNICA, competencias: ['Gestão de Obras', 'Projetos'] },
  { id: 'nucleo_eng_arq', nome: 'NÚCLEO DE ENGENHARIA E ARQUITETURA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_TECNICA, competencias: ['Engenharia', 'Arquitetura'] },
  { id: 'sec_eng', nome: 'SEÇÃO DE ENGENHARIA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_TECNICA, competencias: ['Cálculo Estrutural', 'Fiscalização de Obras'] },
  { id: 'sec_arq', nome: 'SEÇÃO DE ARQUITETURA', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ENGENHARIA_TECNICA, competencias: ['Layout', 'Projetos Arquitetônicos'] },
  { id: 'sec_manut_bens', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS', setor: 'Infraestrutura', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.LOGISTICA_OPERACIONAL, competencias: ['Reparos', 'Manutenção Predial'] },

  // --- GESTÃO DE PESSOAS ---
  { id: 'sec_sgp', nome: 'SECRETARIA DE GESTÃO DE PESSOAS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Gestão de RH', 'Estratégia'] },
  { id: 'gab_apoio_sgp', nome: 'GABINETE DE APOIO À SGP', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.SUPORTE_ADMINISTRATIVO, competencias: ['Suporte Administrativo', 'Comunicação'] },
  { id: 'ass_gov_sgp', nome: 'ASSESSORIA DE GOVERNANÇA DE GESTÃO DE PESSOAS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Governança', 'Indicadores'] },
  { id: 'coord_saude', nome: 'COORDENADORIA DE SAÚDE', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_ACOLHIMENTO, competencias: ['Gestão de Saúde', 'Acolhimento'] },
  { id: 'coord_inf_func', nome: 'COORDENADORIA DE INFORMAÇÕES FUNCIONAIS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_NORMATIVO, competencias: ['Dados Funcionais', 'Sigilo'] },
  { id: 'coord_pag_pessoal', nome: 'COORD. DE GESTÃO DE PAGAMENTO DE PESSOAL', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_NORMATIVO, competencias: ['Folha de Pagamento', 'Conformidade'] },
  { id: 'coord_desenv_pessoas', nome: 'COORD. DE GESTÃO DO DESENVOLVIMENTO', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_DESENVOLVIMENTO, competencias: ['Treinamento', 'Desenvolvimento'] },
  { id: 'div_leg_pessoal', nome: 'DIVISÃO DE LEGISLAÇÃO DE PESSOAL', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.JURIDICO_SENIOR, competencias: ['Legislação', 'Pareceres'] },
  { id: 'sec_pag_magistrados', nome: 'SEÇÃO DE PAGAMENTO A MAGISTRADOS', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_NORMATIVO, competencias: ['Cálculos Complexos', 'Sigilo'] },
  { id: 'sec_pag_servidores', nome: 'SEÇÃO DE PAGAMENTO A SERVIDORES', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.RH_NORMATIVO, competencias: ['Folha de Servidores', 'Atenção'] },
  { id: 'sec_beneficios', nome: 'SEÇÃO DE BENEFÍCIOS E ESTÁGIO', setor: 'SGP', categoria: 'Gestão de Pessoas', perfil_ideal: ARQUETIPOS.ATENDIMENTO_PUBLICO, competencias: ['Gestão de Benefícios', 'Atendimento'] },

  // --- ORÇAMENTO E FINANÇAS ---
  { id: 'sec_sof', nome: 'SECRETARIA DE ORÇAMENTO E FINANÇAS', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.GESTAO_EXECUTIVA, competencias: ['Gestão Financeira', 'Responsabilidade Fiscal'] },
  { id: 'coord_gestao_fin', nome: 'COORDENADORIA DE GESTÃO FINANCEIRA', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Execução Financeira', 'Controle'] },
  { id: 'div_analise_contabil', nome: 'DIVISÃO DE ANÁLISE CONTÁBIL', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.CALCULOS_FINANCAS, competencias: ['Contabilidade', 'Tributos'] },
  { id: 'sec_pag_bens', nome: 'SEÇÃO DE PAGAMENTO DE BENS E SERVIÇOS', setor: 'SOF', categoria: 'Orçamento e Finanças', perfil_ideal: ARQUETIPOS.RH_NORMATIVO, competencias: ['Pagamentos', 'Conferência'] },

  // --- ESTRATÉGIA E PROJETOS ---
  { id: 'sec_gov_estrat', nome: 'SECRETARIA DE GOVERNANÇA E ESTRATÉGIA', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Planejamento Estratégico', 'Metas'] },
  { id: 'div_estatistica', nome: 'DIVISÃO DE ESTATÍSTICA', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.ANALISE_DADOS_JURIDICOS, competencias: ['Análise de Dados', 'Estatística'] },
  { id: 'div_lab_inov', nome: 'LABORATÓRIO DE INOVAÇÃO (LIODS)', setor: 'Estratégia', categoria: 'Estratégia e Projetos', perfil_ideal: ARQUETIPOS.TIC_INOVACAO_AGILE, competencias: ['Inovação', 'Criatividade', 'Design Thinking'] },
  { id: 'sec_auditoria', nome: 'SECRETARIA DE AUDITORIA', setor: 'Auditoria', categoria: 'Auditoria e Controle', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Auditoria Interna', 'Risco'] },

  // --- TIC (SETIC) ---
  { id: 'sec_tic', nome: 'SECRETARIA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÕES', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.LIDERANCA_ESTRATEGICA, competencias: ['Governança de TI', 'Inovação', 'Gestão Estratégica'] },
  { id: 'coord_op_suporte', nome: 'COORDENADORIA DE OPERAÇÃO E SUPORTE', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_INFRA_ESTRUTURADA, competencias: ['Operações', 'Infraestrutura'] },
  { id: 'div_seg_info', nome: 'DIVISÃO DE SEGURANÇA DA INFORMAÇÃO', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE, competencias: ['Cibersegurança', 'Riscos'] },
  { id: 'div_sist_info', nome: 'DIVISÃO DE SISTEMA DE INFORMAÇÃO', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['Desenvolvimento', 'Software'] },
  { id: 'nucleo_cli_tic', nome: 'NÚCLEO DE ATENDIMENTO A CLIENTES DE TIC', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.ATENDIMENTO_EMPATICO, competencias: ['Service Desk', 'Suporte'] },
  { id: 'sec_desenv_sist', nome: 'SEÇÃO DE DESENVOLVIMENTO DE SISTEMAS', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['Programação', 'Engenharia de Software'] },
  { id: 'sec_tec_pje', nome: 'SEÇÃO TÉCNICA DO PJE', setor: 'TIC', categoria: 'Tecnologia da Informação', perfil_ideal: ARQUETIPOS.TIC_DESENVOLVIMENTO, competencias: ['PJe', 'Configuração'] },

  // --- ESCOLA JUDICIAL E CULTURA ---
  { id: 'sec_ejud', nome: 'SECRETARIA DA ESCOLA JUDICIAL', setor: 'EJUD', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.COMUNICACAO_CRIATIVA, competencias: ['Gestão Educacional', 'Pedagogia'] },
  { id: 'sec_biblioteca', nome: 'SEÇÃO DE BIBLIOTECA', setor: 'Cultura', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['Biblioteconomia', 'Pesquisa'] },
  { id: 'coord_memoria', nome: 'CENTRO DE MEMÓRIA', setor: 'Cultura', categoria: 'Escola Judicial e Cultura', perfil_ideal: ARQUETIPOS.SUPORTE_ROTINA, competencias: ['História', 'Preservação'] },

  // --- COMUNICAÇÃO E SEGURANÇA ---
  { id: 'div_ouvidoria', nome: 'DIVISÃO DA OUVIDORIA', setor: 'Ouvidoria', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.ATENDIMENTO_EMPATICO, competencias: ['Escuta Ativa', 'Mediação'] },
  { id: 'coord_com_social', nome: 'COORDENADORIA DE COMUNICAÇÃO SOCIAL', setor: 'Comunicação', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.COMUNICACAO_CRIATIVA, competencias: ['Imprensa', 'Mídia', 'Comunicação'] },
  { id: 'coord_policia', nome: 'COORDENADORIA DE POLÍCIA JUDICIAL', setor: 'Segurança', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.SEGURANCA_VIGILANTE, competencias: ['Segurança', 'Estratégia de Segurança'] },
  { id: 'sec_seg_pol', nome: 'SEÇÃO DE SEGURANÇA DE POLÍCIA JUDICIAL', setor: 'Segurança', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.SEGURANCA_VIGILANTE, competencias: ['Segurança Patrimonial', 'Disciplina'] },
  { id: 'sec_socioambiental', nome: 'SEÇÃO DE GESTÃO SOCIOAMBIENTAL', setor: 'Sustentabilidade', categoria: 'Apoio Institucional', perfil_ideal: ARQUETIPOS.COMUNICACAO_CRIATIVA, competencias: ['Sustentabilidade', 'Acessibilidade'] }
];

// Helper para agrupar as unidades
const unidadesAgrupadas = unidadesTRT11.reduce((acc, unit) => {
  if (!acc[unit.categoria]) acc[unit.categoria] = [];
  acc[unit.categoria].push(unit);
  return acc;
}, {});

export default function PeopleAnalyticsTRT11() {
  const [step, setStep] = useState(0); 
  const [testPhase, setTestPhase] = useState(1); // 1 = Positive Selection, 2 = Negative Selection
  const [answers, setAnswers] = useState({}); // { [id]: 5 or 1 }
  const [userProfile, setUserProfile] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef(null);
  const apiKey = ""; // API Key Environment Variable
  const [draggedAdj, setDraggedAdj] = useState(null);

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
      Atue como um especialista em psicometria. Analise o documento PDF fornecido e extraia os percentuais (0-100) dos 5 grandes fatores (Big Five).
      Retorne APENAS um objeto JSON válido: { "abertura": number, "conscienciosidade": number, "extroversao": number, "amabilidade": number, "estabilidade": number }
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
      setUserProfile(extractedProfile);
      setStep(2); 
    } catch (error) {
      console.error(error);
      setErrorMsg('Não foi possível interpretar o relatório PDF.');
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DO TESTE SEQUENCIAL (2 FASES) ---
  
  const handleToggle = (id, value) => {
    setAnswers(prev => {
      const next = { ...prev };
      if (next[id] === value) {
        delete next[id]; // Toggle off
      } else {
        next[id] = value; // Set value
      }
      return next;
    });
  };
  
  const nextPhase = () => {
    window.scrollTo(0, 0);
    if (testPhase === 1) {
      setTestPhase(2);
    } else {
      calculateResults();
    }
  };
  
  // DRAG AND DROP LOGIC
  const onDragStart = (e, adjId) => {
    setDraggedAdj(adjId);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetVal) => {
    e.preventDefault();
    if (draggedAdj !== null) {
      // If dropping into "Selected" zone (value 5 or 1)
      if (targetVal !== 0) {
        handleToggle(draggedAdj, targetVal);
      } else {
        // Dropping back to "Available" (remove from answers)
        setAnswers(prev => {
          const next = { ...prev };
          delete next[draggedAdj];
          return next;
        });
      }
      setDraggedAdj(null);
    }
  };

  // --- CÁLCULO CIENTÍFICO (ADJECTIVE MARKERS) ---
  const calculateResults = () => {
    setLoading(true);
    setTimeout(() => {
      let scores = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };
      let counts = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };

      BIG_FIVE_ADJECTIVES.forEach(adj => {
        let val = answers[adj.id];
        if (val === undefined) val = 3; // Neutro se não marcado
        
        // Inversão de chave
        const adjustedVal = adj.key === 1 ? val : (6 - val);
        
        scores[adj.trait] += adjustedVal;
        counts[adj.trait] += 1;
      });

      const finalProfile = {};
      Object.keys(scores).forEach(trait => {
        if (counts[trait] > 0) {
          const avg = scores[trait] / counts[trait];
          // Normalização: (Média - 1) / 4 * 100
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
          analysis.push({ type: 'warn', trait: t, text: `Nível acima do perfil esperado (+${diff}%).` });
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
    setTestPhase(1);
    setAnswers({});
    setUserProfile(null);
    setSelectedUnit(null);
    setMatchResult(null);
    setErrorMsg('');
  };

  const handlePrint = () => {
    setTimeout(() => { window.print(); }, 100);
  };

  // --- FILTRAGEM DE ITENS ---
  const itemsToDisplay = testPhase === 1 
    ? BIG_FIVE_ADJECTIVES 
    : BIG_FIVE_ADJECTIVES.filter(adj => !answers[adj.id]);

  const selectedItems = testPhase === 1
    ? BIG_FIVE_ADJECTIVES.filter(adj => answers[adj.id] === 5)
    : BIG_FIVE_ADJECTIVES.filter(adj => answers[adj.id] === 1);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <style>{`
        @media print {
          @page { margin: 0.5cm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; color: black !important; }
          header, footer, .no-print, button { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
          .bg-slate-50 { background-color: #f8fafc !important; border: 1px solid #eee; }
          .text-white { color: black !important; } 
          .print\\:block { display: block !important; }
          .print\\:hidden { display: none !important; }
          .break-inside-avoid { break-inside: avoid; }
          .shadow-xl, .shadow-lg, .shadow-sm { box-shadow: none !important; border: 1px solid #ddd; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">TRT11 People Analytics</h1>
              <p className="text-xs text-blue-200">Fit Cultural & Técnico (Adjective Checklist)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-white/10 px-3 py-1 rounded border border-white/20">
            <BrainCircuit className="w-3 h-3 text-yellow-300" />
            <span>AI Powered v2.7</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        
        {/* Progress Stepper */}
        {step > 0 && (
          <div className="flex items-center justify-center mb-10 text-sm no-print">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 transition-colors ${step >= 1 ? 'bg-indigo-100 border-indigo-600' : 'border-slate-300'}`}>1</span>
              Checklist
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
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Sistema de People Analytics TRT11</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Mapeamento de perfil comportamental via Adjective Markers (Big Five). Escolha como deseja iniciar sua análise de aderência.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                onClick={() => setStep(1)}
                className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-indigo-500 cursor-pointer transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckSquare className="w-32 h-32 text-indigo-600" />
                </div>
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Checklist Rápido</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Avaliação rápida em 2 etapas baseada em 50 adjetivos-chave (Big Five Markers).
                </p>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md group-hover:bg-indigo-700 transition-colors">
                  Iniciar Checklist
                </button>
              </div>

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
                    e.stopPropagation();
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
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Upload de Laudo (PDF)</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Envie um laudo Big Five existente para que nossa IA extraia os dados e calcule o fit.
                  </p>
                  <button className="w-full py-3 bg-white border-2 border-purple-600 text-purple-700 rounded-lg font-bold group-hover:bg-purple-50 transition-colors mt-auto">
                    {loading ? 'Lendo PDF...' : 'Enviar Arquivo'}
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

        {/* STEP 1: CHECKLIST (SEQUENCIAL 2 ETAPAS - UNIFIED UI) */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6 flex flex-col h-[85vh]">
              
              {/* Header */}
              <div className={`p-6 border-b flex justify-between items-center shrink-0 ${testPhase === 1 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <div>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${testPhase === 1 ? 'text-green-800' : 'text-red-800'}`}>
                    {testPhase === 1 ? <ThumbsUp className="w-6 h-6" /> : <ThumbsDown className="w-6 h-6" />}
                    {testPhase === 1 ? 'Etapa 1: O que ME IDENTIFICA' : 'Etapa 2: O que NÃO ME IDENTIFICA'}
                  </h2>
                  <p className={`text-sm mt-1 ${testPhase === 1 ? 'text-green-700' : 'text-red-700'}`}>
                    {testPhase === 1 
                      ? 'Clique nos adjetivos que descrevem quem você é.' 
                      : 'Dos restantes, clique nos adjetivos que definitivamente NÃO descrevem você.'}
                  </p>
                </div>
                <div className="text-right">
                   <div className="text-xs font-bold uppercase text-slate-400 mb-1">Selecionados</div>
                   <div className={`text-3xl font-black ${testPhase === 1 ? 'text-green-600' : 'text-red-600'}`}>
                     {testPhase === 1 
                       ? Object.values(answers).filter(v => v === 5).length 
                       : Object.values(answers).filter(v => v === 1).length}
                   </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50">
                {/* Main Grid Area */}
                <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-wrap gap-3 justify-center content-start pb-20">
                    {itemsToDisplay.map(adj => {
                      const isSelected = testPhase === 1 ? answers[adj.id] === 5 : answers[adj.id] === 1;
                      return (
                        <button
                          key={adj.id}
                          onClick={() => handleToggle(adj.id, testPhase === 1 ? 5 : 1)}
                          className={`
                            px-4 py-2 rounded-full border text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2
                            ${isSelected 
                              ? (testPhase === 1 ? 'bg-green-600 text-white border-green-600 shadow-md ring-2 ring-green-200' : 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200')
                              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:bg-slate-100'}
                          `}
                        >
                          {isSelected && (testPhase === 1 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />)}
                          {adj.text}
                        </button>
                      )
                    })}
                    {itemsToDisplay.length === 0 && (
                      <div className="w-full text-center py-10 text-slate-400 italic">
                        Todos os itens foram classificados.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center shrink-0 z-40">
                <div className="text-xs text-slate-500 italic flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {testPhase === 1 
                    ? 'Os itens não selecionados passarão para a etapa "Não Sou Eu".' 
                    : 'Os itens que sobrarem (não marcados em nenhuma etapa) serão NEUTROS.'}
                </div>
                <button
                  onClick={testPhase === 1 ? nextPhase : calculateResults}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg transform hover:-translate-y-0.5
                    ${testPhase === 1 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'}
                  `}
                >
                  {loading ? 'Calculando...' : (testPhase === 1 ? 'Próxima Etapa' : 'Finalizar e Calcular')}
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
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24 print:border-none print:shadow-none">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Seu Perfil OCEAN
                </h3>
                
                <div className="space-y-6">
                  {Object.keys(TRAITS_CONFIG).map((trait) => (
                    <div key={trait} className="break-inside-avoid">
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-xs font-bold uppercase ${TRAITS_CONFIG[trait].color} print:text-black`}>
                          {TRAITS_CONFIG[trait].label}
                        </span>
                        <span className="font-mono font-bold text-slate-700 text-sm print:text-black">{userProfile[trait]}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden print:border print:border-gray-300">
                        <div 
                          className={`h-full rounded-full ${TRAITS_CONFIG[trait].bg} print:bg-black`} 
                          style={{ width: `${userProfile[trait]}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight print:text-gray-600">
                        {TRAITS_CONFIG[trait].desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 no-print">
                  <button onClick={handleRestart} className="w-full py-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                    <RotateCcw className="w-3 h-3" /> REINICIAR TESTE
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Unit Selection */}
            <div className="lg:col-span-8 print:hidden">
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
                <Download className="w-4 h-4" /> Imprimir / Salvar PDF
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 print:border-none print:shadow-none">
              {/* Score Header */}
              <div className="bg-slate-50 p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 print:bg-white print:border-b-2 print:border-slate-800">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">TRT11 PEOPLE ANALYTICS</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Relatório de Aderência (Fit)</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500 print:text-gray-600">
                    <span>Candidato</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 print:text-gray-400" />
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 print:border-0 print:bg-transparent print:text-black print:p-0">
                      {selectedUnit.nome}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block print:block">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 print:text-gray-600">Aderência Global</div>
                    <div className={`text-4xl font-black ${matchResult.score >= 75 ? 'text-green-600' : matchResult.score >= 50 ? 'text-yellow-600' : 'text-red-600'} print:text-black`}>
                      {matchResult.score}%
                    </div>
                  </div>
                  
                  {/* Score Circle */}
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white print:text-black print:shadow-none print:ring-0 print:border print:border-black
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
                <div className="space-y-8 print:mb-8 break-inside-avoid">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <BarChart2 className="w-4 h-4 text-indigo-500 print:text-black" /> Comparativo Detalhado
                    </h3>
                    <div className="flex gap-4 text-[10px] uppercase font-bold text-slate-400 print:text-gray-600">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-800 print:bg-black"></div> Você</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-slate-200 print:bg-gray-300"></div> Ideal</span>
                    </div>
                  </div>
                  
                  {Object.keys(TRAITS_CONFIG).map(trait => {
                    const diff = userProfile[trait] - selectedUnit.perfil_ideal[trait];
                    return (
                      <div key={trait} className="relative print:mb-4 break-inside-avoid">
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={`uppercase ${TRAITS_CONFIG[trait].color} print:text-black`}>{TRAITS_CONFIG[trait].label}</span>
                          <span className="text-slate-400 print:text-black">Diff: {diff > 0 ? `+${diff}` : diff}%</span>
                        </div>
                        
                        {/* Bar Track */}
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative print:border print:border-gray-400">
                          
                          {/* Ideal Range Marker (Soft Background) */}
                          <div 
                            className="absolute top-0 bottom-0 bg-slate-200 opacity-50 z-0 print:bg-gray-300"
                            style={{ 
                              left: '0%', 
                              width: `${selectedUnit.perfil_ideal[trait]}%` 
                            }}
                          ></div>
                          
                          {/* Ideal Line */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10 print:bg-black" 
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
                <div className="space-y-6 break-inside-avoid">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 text-sm uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-indigo-500 print:text-black" /> Diagnóstico da IA
                  </h3>

                  {matchResult.details.length === 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex gap-4 print:border-black print:bg-white">
                      <CheckCircle className="w-8 h-8 text-green-600 shrink-0 print:text-black" />
                      <div>
                        <h4 className="font-bold text-green-800 text-sm mb-1 print:text-black">Sinergia Elevada</h4>
                        <p className="text-green-700 text-sm leading-relaxed print:text-black">
                          Seu perfil Big Five demonstra grande alinhamento com as expectativas comportamentais desta unidade. Os traços de personalidade identificados sugerem uma adaptação natural à cultura e aos desafios do setor.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-1 print:bg-white print:border-0">
                      <ul className="divide-y divide-slate-100 print:divide-gray-300">
                        {matchResult.details.map((item, idx) => (
                          <li key={idx} className="p-4 flex gap-3 items-start break-inside-avoid">
                            {item.type === 'gap' 
                              ? <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5 print:text-black" /> 
                              : <div className="w-5 h-5 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 print:bg-black print:text-white">!</div>
                            }
                            <div>
                              <span className={`text-xs font-bold uppercase block mb-1 ${TRAITS_CONFIG[item.trait].color} print:text-black`}>
                                {TRAITS_CONFIG[item.trait].label}
                              </span>
                              <span className="text-slate-600 text-sm leading-snug print:text-black">{item.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 print:bg-white print:border-black break-inside-avoid">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600 print:text-black" />
                      <h4 className="text-blue-900 font-bold text-xs uppercase print:text-black">Nota Técnica</h4>
                    </div>
                    <p className="text-blue-700 text-xs leading-relaxed text-justify print:text-black">
                      Esta análise utiliza o modelo dos Cinco Grandes Fatores (Big Five) via marcadores adjetivos. O "Fit" não é determinístico; traços como <strong>Conscienciosidade</strong> e <strong>Abertura</strong> podem ser desenvolvidos conforme o contexto. Utilize este relatório como ferramenta de autoconhecimento e desenvolvimento profissional.
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
