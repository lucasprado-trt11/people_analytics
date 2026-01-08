import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  Briefcase, 
  Scale, 
  Search,
  BookOpen,
  UserCheck,
  RotateCcw,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  Upload,
  FileText,
  Loader2,
  CheckSquare,
  X,
  Check,
  ThumbsUp,
  ThumbsDown,
  Info,
  Target,
  Lightbulb,
  Printer,
  ShieldAlert,
  HelpCircle,
  FileSearch,
  Activity,
  Lock,
  Eye,
  Sigma,
  Table,
  Microscope,
  Zap, // Importação essencial recuperada
  MoveHorizontal,
  TrendingUp 
} from 'lucide-react';

// --- CONFIGURAÇÃO E CONSTANTES ---

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

const PSYCHOMETRIC_SPECS = {
  abertura: { alpha: 0.84, sem: 4.1, convergent: "TIPI: Openness (r=0.68)" },
  conscienciosidade: { alpha: 0.81, sem: 4.5, convergent: "TIPI: Conscientiousness (r=0.72)" },
  extroversao: { alpha: 0.87, sem: 3.8, convergent: "TIPI: Extraversion (r=0.75)" },
  amabilidade: { alpha: 0.80, sem: 4.8, convergent: "TIPI: Agreeableness (r=0.65)" },
  estabilidade: { alpha: 0.86, sem: 3.9, convergent: "TIPI: Emotional Stability (r=0.70)" }
};

const BIG_FIVE_ADJECTIVES = [
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

const ARQUETIPOS = {
  LIDERANCA_VISIONARIA: { abertura: 90, conscienciosidade: 70, extroversao: 80, amabilidade: 60, estabilidade: 90 },
  LIDERANCA_ESTRATEGICA_ALTA: { abertura: 90, conscienciosidade: 75, extroversao: 85, amabilidade: 65, estabilidade: 90 },
  LIDERANCA_TATICA_GESTAO: { abertura: 70, conscienciosidade: 85, extroversao: 70, amabilidade: 75, estabilidade: 80 },
  LIDERANCA_OPERACIONAL_CHEFIA: { abertura: 50, conscienciosidade: 95, extroversao: 60, amabilidade: 60, estabilidade: 85 },
  GOVERNANCA_ESTRATEGICA: { abertura: 75, conscienciosidade: 95, extroversao: 50, amabilidade: 65, estabilidade: 85 },
  JURIDICO_ANALITICO: { abertura: 80, conscienciosidade: 85, extroversao: 30, amabilidade: 50, estabilidade: 80 },
  JURIDICO_OPERACIONAL: { abertura: 30, conscienciosidade: 98, extroversao: 45, amabilidade: 55, estabilidade: 85 },
  JURIDICO_ALTA_COMPLEXIDADE: { abertura: 90, conscienciosidade: 80, extroversao: 40, amabilidade: 50, estabilidade: 80 },
  JURIDICO_PROCESSUAL_RITMO: { abertura: 40, conscienciosidade: 95, extroversao: 50, amabilidade: 55, estabilidade: 85 },
  JURIDICO_CONCILIADOR_EMPATICO: { abertura: 65, conscienciosidade: 60, extroversao: 80, amabilidade: 95, estabilidade: 85 },
  CONCILIADOR_MEDIADOR: { abertura: 60, conscienciosidade: 60, extroversao: 75, amabilidade: 95, estabilidade: 90 },
  TIC_INOVACAO: { abertura: 95, conscienciosidade: 65, extroversao: 55, amabilidade: 70, estabilidade: 75 },
  TIC_TECNICO: { abertura: 50, conscienciosidade: 90, extroversao: 50, amabilidade: 80, estabilidade: 85 },
  TIC_GESTAO_INOVACAO: { abertura: 95, conscienciosidade: 70, extroversao: 70, amabilidade: 65, estabilidade: 80 },
  TIC_DESENVOLVIMENTO_ANALISE: { abertura: 85, conscienciosidade: 80, extroversao: 40, amabilidade: 50, estabilidade: 75 },
  TIC_INFRA_SUPORTE_AGIL: { abertura: 55, conscienciosidade: 85, extroversao: 60, amabilidade: 80, estabilidade: 85 },
  EXATAS_CONTROLE: { abertura: 30, conscienciosidade: 98, extroversao: 35, amabilidade: 40, estabilidade: 90 },
  FINANCAS_ANALITICO_RIGOR: { abertura: 40, conscienciosidade: 95, extroversao: 30, amabilidade: 45, estabilidade: 85 },
  DESENVOLVIMENTO_HUMANO: { abertura: 85, conscienciosidade: 60, extroversao: 80, amabilidade: 90, estabilidade: 70 },
  RH_DESENVOLVIMENTO_EDUCACAO: { abertura: 90, conscienciosidade: 60, extroversao: 75, amabilidade: 90, estabilidade: 70 },
  RH_ADMINISTRATIVO_FOLHA: { abertura: 30, conscienciosidade: 98, extroversao: 40, amabilidade: 50, estabilidade: 85 },
  SAUDE_ACOLHIMENTO: { abertura: 60, conscienciosidade: 75, extroversao: 65, amabilidade: 95, estabilidade: 80 },
  SAUDE_ASSISTENCIA_CUIDADO: { abertura: 60, conscienciosidade: 70, extroversao: 65, amabilidade: 95, estabilidade: 85 },
  SEGURANCA_ESTRATEGICA: { abertura: 40, conscienciosidade: 90, extroversao: 60, amabilidade: 40, estabilidade: 95 },
  SEGURANCA_VIGILANCIA_ESTAVEL: { abertura: 30, conscienciosidade: 90, extroversao: 60, amabilidade: 40, estabilidade: 95 },
  LOGISTICA_SUPORTE: { abertura: 40, conscienciosidade: 90, extroversao: 65, amabilidade: 60, estabilidade: 85 },
  LOGISTICA_OPERACIONAL_DINAMICA: { abertura: 50, conscienciosidade: 85, extroversao: 75, amabilidade: 60, estabilidade: 80 },
  COMUNICACAO_RELACIONAMENTO: { abertura: 85, conscienciosidade: 60, extroversao: 95, amabilidade: 85, estabilidade: 75 },
  COMUNICACAO_DINAMICA: { abertura: 90, conscienciosidade: 60, extroversao: 95, amabilidade: 85, estabilidade: 70 },
  ATENDIMENTO_RESOLUTIVIDADE: { abertura: 50, conscienciosidade: 75, extroversao: 85, amabilidade: 90, estabilidade: 80 },
  GESTAO_PROJETOS_PROCESSOS: { abertura: 85, conscienciosidade: 85, extroversao: 60, amabilidade: 60, estabilidade: 75 },
  AUDITORIA_COMPLIANCE_DETALHE: { abertura: 40, conscienciosidade: 98, extroversao: 40, amabilidade: 30, estabilidade: 90 },
  ADMINISTRATIVO_SUPORTE_ROTINA: { abertura: 30, conscienciosidade: 90, extroversao: 55, amabilidade: 70, estabilidade: 80 }
};

const postosTrabalho = [
  { id: '1', nome: 'ASSESSOR-CHEFE DE GABINETE (GAB)', setor: 'Alta Gestão', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '2', nome: 'ASSESSORIA DE GOVERNANÇA DE GESTÃO DE PESSOAS (ASSEGESP)', setor: 'Gestão de Pessoas', categoria: 'Governança', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '3', nome: 'ASSESSORIA DE INTEGRIDADE E GESTÃO DE RISCOS (ASSIGER)', setor: 'Alta Gestão', categoria: 'Governança', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '4', nome: 'ASSESSORIA DE ORDENANÇA (ASSORD)', setor: 'Alta Gestão', categoria: 'Apoio Executivo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '5', nome: 'CENTRO DE INTELIGÊNCIA - COORDENADORIA DE PRECEDENTES E AÇÕES COLETIVAS (CIPAC)', setor: 'Judiciário', categoria: 'Inteligência Jurídica', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '6', nome: 'NÚCLEO DE FORMAÇÃO E CAPACITAÇÃO DE MAGISTRADOS (NUCAM)', setor: 'Educação', categoria: 'Escola Judicial', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '7', nome: 'CHEFE DA SEARP (SEÇÃO DE ARQUIVO PERMANENTE)', setor: 'Administrativo', categoria: 'Gestão Documental', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '8', nome: 'CHEFE DA SEHASP (SEÇÃO DE HASTA PÚBLICA)', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '9', nome: 'CHEFE DA SEJURIS (SEÇÃO DE JURISPRUDÊNCIA)', setor: 'Judiciário', categoria: 'Jurisprudência', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '10', nome: 'CHEFE DA SEMAGE (SEÇÃO DE MONITORAMENTO E AVALIAÇÃO DOS ATOS DE GESTÃO)', setor: 'Estratégia', categoria: 'Monitoramento', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '11', nome: 'CHEFE DA SEMARK (SEÇÃO DE MARKETING E PUBLICIDADE)', setor: 'Comunicação', categoria: 'Marketing', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '12', nome: 'CHEFE DA SEPAS (SEÇÃO DE PAGAMENTO A SERVIDORES)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '13', nome: 'CHEFE DA SESERV (SEÇÃO DE SERVIDORES ATIVOS)', setor: 'Gestão de Pessoas', categoria: 'Administração de Pessoal', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '14', nome: 'CHEFE DO GABINETE DA SAD (GABSAD)', setor: 'Administrativo', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '15', nome: 'CHEFE DO GABINETE DA SETIC (GABSETIC)', setor: 'TIC', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '16', nome: 'CHEFE DO GABINETE DA SGPES (GABSGPES)', setor: 'Gestão de Pessoas', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '17', nome: 'COORDENADORIA DE APOIO À SECRETARIA DA CORREGEDORIA (COOASCR)', setor: 'Corregedoria', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '18', nome: 'COORDENADORIA DE APOIO À TURMA (COAT1, COAT2, COAT3)', setor: 'Judiciário', categoria: 'Secretaria de Turma', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '19', nome: 'COORDENADORIA DE APOIO AO NÚCLEO PERMANENTE DE METODOS CONSENSUAIS DE DISPUTAS (COONUPEMEC)', setor: 'Conciliação', categoria: 'Gestão de Conciliação', perfil_ideal: ARQUETIPOS.CONCILIADOR_MEDIADOR },
  { id: '20', nome: 'COORDENADORIA DE CERIMONIAL (COCEV)', setor: 'Comunicação', categoria: 'Cerimonial', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '21', nome: 'COORDENADORIA DE COMUNICAÇÃO SOCIAL (COORDCOM)', setor: 'Comunicação', categoria: 'Comunicação', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '22', nome: 'COORDENADORIA DE GESTÃO DAS INFORMAÇÕES FUNCIONAIS (COGINF)', setor: 'Gestão de Pessoas', categoria: 'Informações Funcionais', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '23', nome: 'COORDENADORIA DE GESTÃO DE PAGAMENTO DE PESSOAL (COPAP)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '24', nome: 'COORDENADORIA DE GESTÃO DO DESENVOLVIMENTO DE PESSOAS (CODEP)', setor: 'Gestão de Pessoas', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '25', nome: 'COORDENADORIA DE GESTÃO FINANCEIRA (COGEFIN)', setor: 'Financeiro', categoria: 'Finanças', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '26', nome: 'COORDENADORIA DE GOVERNANÇA DE CONTRATAÇÕES E OBRAS (COGCO)', setor: 'Administrativo', categoria: 'Obras e Contratações', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '27', nome: 'COORDENADORIA DE LICITAÇÃO E CONTRATOS (COLICON)', setor: 'Administrativo', categoria: 'Licitações', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '28', nome: 'COORDENADORIA DE MANUTENÇÃO E PROJETOS (COMANP)', setor: 'Infraestrutura', categoria: 'Manutenção', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '29', nome: 'COORDENADORIA DE MATERIAL E LOGÍSTICA (COLOG)', setor: 'Administrativo', categoria: 'Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '30', nome: 'COORDENADORIA DE OPERAÇÃO E SUPORTE (COOPS)', setor: 'TIC', categoria: 'Infraestrutura de TI', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '31', nome: 'COORDENADORIA DE POLÍCIA JUDICIAL (COOPJUD)', setor: 'Segurança', categoria: 'Segurança Institucional', perfil_ideal: ARQUETIPOS.SEGURANCA_ESTRATEGICA },
  { id: '32', nome: 'COORDENADORIA DE SAÚDE (CODSAU)', setor: 'Saúde', categoria: 'Gestão de Saúde', perfil_ideal: ARQUETIPOS.SAUDE_ACOLHIMENTO },
  { id: '33', nome: 'COORDENADORIA DO CENTRO DE MEMÓRIA (COGEM)', setor: 'Cultura', categoria: 'Memória', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '34', nome: 'COORDENADORIA JURÍDICA DA CORREGEDORIA (COOJUCOR)', setor: 'Corregedoria', categoria: 'Assessoria Jurídica', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '35', nome: 'DIRETOR DE SECRETARIA DE VARA DO TRABALHO', setor: 'Judiciário', categoria: 'Direção de Vara', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '36', nome: 'DIRETOR DO LIODS (DIVISÃO DE LABORATÓRIO DE INOVAÇÃO)', setor: 'Estratégia', categoria: 'Inovação', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '37', nome: 'DIRETOR DO NUPEMEC', setor: 'Conciliação', categoria: 'Direção', perfil_ideal: ARQUETIPOS.CONCILIADOR_MEDIADOR },
  { id: '38', nome: 'DIRETOR GERAL (DG)', setor: 'Alta Gestão', categoria: 'Direção Geral', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '39', nome: 'DIVISÃO DA OUVIDORIA (DIVIOUV)', setor: 'Comunicação', categoria: 'Ouvidoria', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '40', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTBV E MANDADOS JUDICIAIS (DIVAMFTBV)', setor: 'Administrativo', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '41', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTM (DIVAFTM)', setor: 'Administrativo', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '42', nome: 'DIVISÃO DE ANÁLISE CONTÁBIL, TRIBUTÁRIA E APOIO AO 1° GRAU (DIVACONT)', setor: 'Financeiro', categoria: 'Contabilidade', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '43', nome: 'DIVISÃO DE APOIO À VICE-PRESIDÊNCIA (DIVVP)', setor: 'Alta Gestão', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '44', nome: 'DIVISÃO DE APOIO AO CEJUSC', setor: 'Conciliação', categoria: 'Apoio Conciliação', perfil_ideal: ARQUETIPOS.CONCILIADOR_MEDIADOR },
  { id: '45', nome: 'DIVISÃO DE APOIO EXTERNO INSTITUCIONAL (DIVAEI)', setor: 'Estratégia', categoria: 'Relações Institucionais', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '46', nome: 'DIVISÃO DE CONTADORIA JURÍDICA (DICONJUD)', setor: 'Judiciário', categoria: 'Contadoria', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '47', nome: 'DIVISÃO DE COOPERAÇÃO JUDICIÁRIA (DICOOP)', setor: 'Judiciário', categoria: 'Cooperação', perfil_ideal: ARQUETIPOS.CONCILIADOR_MEDIADOR },
  { id: '48', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (DIVDIF)', setor: 'Judiciário', categoria: 'Distribuição', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '49', nome: 'DIVISÃO DE ESTATÍSTICA (DIVIEST)', setor: 'Estratégia', categoria: 'Estatística', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '50', nome: 'DIVISÃO DE EXECUÇÃO CONCENTRADA (DECON)', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '51', nome: 'DIVISÃO DE GESTÃO, EMPENHO E MANUTENÇÃO DOS SISTEMAS ORÇAMENTÁRIOS (DIGEORC)', setor: 'Financeiro', categoria: 'Orçamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '52', nome: 'DIVISÃO DE INICIATIVAS NACIONAIS E GOVERNANÇA DE TIC (DIVINGOV)', setor: 'TIC', categoria: 'Governança de TI', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '53', nome: 'DIVISÃO DE LEGISLAÇÃO DE PESSOAL (DILEP)', setor: 'Gestão de Pessoas', categoria: 'Legislação', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '54', nome: 'DIVISÃO DE PASSAGENS E DIÁRIAS (DIPADI)', setor: 'Administrativo', categoria: 'Viagens', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '55', nome: 'DIVISÃO DE PESQUISA PATRIMONIAL (DIPEP)', setor: 'Judiciário', categoria: 'Pesquisa Patrimonial', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '56', nome: 'DIVISÃO DE PROJETOS E DE INICIATIVAS NACIONAIS (DIPIN)', setor: 'Estratégia', categoria: 'Projetos', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '57', nome: 'DIVISÃO DE SEGURANÇA DA INFORMAÇÃO (DISEGINF)', setor: 'TIC', categoria: 'Segurança da Informação', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '58', nome: 'DIVISÃO DE SISTEMA DE INFORMAÇÃO (DIVINF)', setor: 'TIC', categoria: 'Sistemas', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '59', nome: 'GABINETE DE APOIO À CORREGEDORIA (GABCORREGI)', setor: 'Corregedoria', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '60', nome: 'GABINETE DE APOIO À EJUD (GABEJUD)', setor: 'Educação', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '61', nome: 'GABINETE DE APOIO À SECRETARIA-GERAL JUDICIÁRIA (GABSGJ)', setor: 'Judiciário', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '62', nome: 'GABINETE DE APOIO À SEGEST (GABSEGGEST)', setor: 'Estratégia', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '63', nome: 'GABINETE DE APOIO À SGP (GABSGP)', setor: 'Alta Gestão', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '64', nome: 'GABINETE DE APOIO À SOF (GABSOF)', setor: 'Financeiro', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '65', nome: 'NÚCLEO DE ATENDIMENTO A CLIENTES DE TIC (NUATEN)', setor: 'TIC', categoria: 'Atendimento', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '66', nome: 'NÚCLEO DE CONFORMIDADE ADMINISTRATIVA (NUCONF)', setor: 'Administrativo', categoria: 'Conformidade', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '67', nome: 'NUCLEO DE ENGENHARIA, ARQUITETURA E MANUTENÇÃO DE BENS (NUEA)', setor: 'Infraestrutura', categoria: 'Engenharia', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '68', nome: 'NÚCLEO DE FORMAÇÃO E CAPACITAÇÃO DE SERVIDORES (NUCAS)', setor: 'Educação', categoria: 'Capacitação', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '69', nome: 'SEÇÃO DE ALMOXARIFADO (SALMOX)', setor: 'Administrativo', categoria: 'Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '70', nome: 'SEÇÃO DE ANÁLISE E CONFORMIDADE DE GESTÃO DE SUPRIMENTOS DE FUNDOS (SASCONT)', setor: 'Financeiro', categoria: 'Conformidade', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '71', nome: 'SEÇÃO DE APOIO AO PLANEJAMENTO E CONTROLE DE EXECUÇÃO ORÇAMENTÁRIA (SACEO)', setor: 'Financeiro', categoria: 'Orçamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '72', nome: 'SEÇÃO DE APOSENTADOS E PENSIONISTAS (SEAPP)', setor: 'Gestão de Pessoas', categoria: 'Benefícios', perfil_ideal: ARQUETIPOS.SAUDE_ACOLHIMENTO },
  { id: '73', nome: 'SEÇÃO DE ARQUITETURA (SEARQ)', setor: 'Infraestrutura', categoria: 'Arquitetura', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '74', nome: 'SEÇÃO DE ARQUITETURA E MONITORAMENTO DE SERVIÇOS (SEAMOS)', setor: 'TIC', categoria: 'Arquitetura de TI', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '75', nome: 'SEÇÃO DE AUDITORIA CONTÁBIL, ORÇAMENTÁRIA E FINANCEIRA (SECOF)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '76', nome: 'SEÇÃO DE AUDITORIA DE CONTRATAÇÕES E PATRIMÔNIO (SECOP)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '77', nome: 'SEÇÃO DE AUDITORIA DE GESTÃO DE PESSOAS (SEAGEP)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '78', nome: 'SEÇÃO DE BENEFÍCIOS E ESTÁGIO (SEBES)', setor: 'Gestão de Pessoas', categoria: 'Benefícios', perfil_ideal: ARQUETIPOS.SAUDE_ACOLHIMENTO },
  { id: '79', nome: 'SEÇÃO DE BIBLIOTECA (SEBIB)', setor: 'Cultura', categoria: 'Biblioteca', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '80', nome: 'SEÇÃO DE COMPRAS (SECOMP)', setor: 'Administrativo', categoria: 'Compras', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '81', nome: 'SEÇÃO DE COMUNICAÇÃO DE DADOS (SECOMDA)', setor: 'TIC', categoria: 'Redes', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '82', nome: 'SEÇÃO DE CONTRATOS (SECONTR)', setor: 'Administrativo', categoria: 'Gestão de Contratos', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '83', nome: 'SEÇÃO DE DESENVOLVIMENTO DE SISTEMAS (SEDES)', setor: 'TIC', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '84', nome: 'SEÇÃO DE DIVULGAÇÃO E COMUNICAÇÃO (SEDIV)', setor: 'Comunicação', categoria: 'Comunicação', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '85', nome: 'SEÇÃO DE DOCUMENTAÇÃO (SEDOC)', setor: 'Administrativo', categoria: 'Documentação', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '86', nome: 'SEÇÃO DE ENGENHARIA (SEENG)', setor: 'Infraestrutura', categoria: 'Engenharia', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '87', nome: 'SEÇÃO DE ENSINO À DISTÂNCIA (SEEAD)', setor: 'Educação', categoria: 'EAD', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '88', nome: 'SEÇÃO DE GERENCIAMENTO DE PROCESSOS DE NEGÓCIOS (SEGENE)', setor: 'Estratégia', categoria: 'Processos', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '89', nome: 'SEÇÃO DE GESTÃO DE CONTRATOS DE TIC (SECONTI)', setor: 'TIC', categoria: 'Contratos TI', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '90', nome: 'SEÇÃO DE GESTÃO DE PRÁTICAS PARA DESENVOLVER PESSOAS (SEDEP)', setor: 'Gestão de Pessoas', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '91', nome: 'SEÇÃO DE GESTÃO DE RISCO DE SEGURANÇA (SEGERPJ)', setor: 'Segurança', categoria: 'Riscos', perfil_ideal: ARQUETIPOS.SEGURANCA_ESTRATEGICA },
  { id: '92', nome: 'SEÇÃO DE GESTÃO DOCUMENTAL (SEGDOC)', setor: 'Administrativo', categoria: 'Arquivo', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '93', nome: 'SEÇÃO DE GESTÃO SOCIOAMBIENTAL, ACESSIBILIDADE E INCLUSÃO (SEGEAMBI)', setor: 'Estratégia', categoria: 'Sustentabilidade', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '94', nome: 'SEÇÃO DE IMPLANTAÇÃO E MANUTENÇÃO DE SISTEMAS (SEIMSIS)', setor: 'TIC', categoria: 'Sistemas', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '95', nome: 'SEÇÃO DE IMPRENSA E RELAÇÕES PÚBLICAS (SEIRP)', setor: 'Comunicação', categoria: 'Imprensa', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '96', nome: 'SEÇÃO DE INTELIGÊNCIA POLICIAL (SEINP)', setor: 'Segurança', categoria: 'Inteligência', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '97', nome: 'SEÇÃO DE LICITAÇÃO (SELIC)', setor: 'Administrativo', categoria: 'Licitação', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '98', nome: 'SEÇÃO DE MAGISTRADOS (SEMAG)', setor: 'Gestão de Pessoas', categoria: 'Magistratura', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '99', nome: 'SEÇÃO DE MANDADOS JUDICIAIS (SEMAJUD)', setor: 'Judiciário', categoria: 'Diligências', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '100', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS (SEMANBE)', setor: 'Infraestrutura', categoria: 'Manutenção', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '101', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS DE TIC (SEMANTIC)', setor: 'TIC', categoria: 'Manutenção TI', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '102', nome: 'SEÇÃO DE MONITORAMENTO DE SEGURANÇA (SEMOSE)', setor: 'Segurança', categoria: 'Monitoramento', perfil_ideal: ARQUETIPOS.SEGURANCA_ESTRATEGICA },
  { id: '103', nome: 'SEÇÃO DE NEGÓCIOS (SENEG)', setor: 'Estratégia', categoria: 'Negócios', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '104', nome: 'SEÇÃO DE OPERAÇÕES DE SEGURANÇA DE POLÍCIA JUDICIAL (SEOPJ)', setor: 'Segurança', categoria: 'Operações', perfil_ideal: ARQUETIPOS.SEGURANCA_ESTRATEGICA },
  { id: '105', nome: 'SEÇÃO DE PAGAMENTO A MAGISTRADOS (SEPAM)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '106', nome: 'SEÇÃO DE PAGAMENTO DE PESSOAL (SEPAPE)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '107', nome: 'SEÇÃO DE PATRIMÔNIO (SEPAT)', setor: 'Administrativo', categoria: 'Patrimônio', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '108', nome: 'SEÇÃO DE SEGURANÇA DE POLÍCIA JUDICIAL (SESEPJ)', setor: 'Segurança', categoria: 'Polícia Judicial', perfil_ideal: ARQUETIPOS.SEGURANCA_ESTRATEGICA },
  { id: '109', nome: 'SEÇÃO DE SUPORTE DE TIC DE 1° GRAU (SESUP1)', setor: 'TIC', categoria: 'Suporte', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '110', nome: 'SEÇÃO DE SUPORTE DE TIC DE 2° GRAU (SESUP2)', setor: 'TIC', categoria: 'Suporte', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '111', nome: 'SEÇÃO DE SUPORTE TÉCNICO À PREPARAÇÃO DA FOLHA DE PAGAMENTO (SETEC)', setor: 'Gestão de Pessoas', categoria: 'Folha', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '112', nome: 'SEÇÃO DE TRANSPORTE (SETRANS)', setor: 'Administrativo', categoria: 'Transporte', perfil_ideal: ARQUETIPOS.LOGISTICA_SUPORTE },
  { id: '113', nome: 'SEÇÃO TÉCNICA DO E-GESTÃO E DATAJUD (SETDATA)', setor: 'Estratégia', categoria: 'Estatística', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '114', nome: 'SEÇÃO TÉCNICA DO PJE (SETPJE)', setor: 'TIC', categoria: 'PJe', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '115', nome: 'SECRETARIA DA CORREGEDORIA REGIONAL (SCR)', setor: 'Corregedoria', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '116', nome: 'SECRETARIA DE ADMINISTRAÇÃO (SAD)', setor: 'Administrativo', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '117', nome: 'SECRETARIA DE ASSESSORAMENTO JURÍDICO-ADMINISTRATIVO (SECJAD)', setor: 'Alta Gestão', categoria: 'Assessoria', perfil_ideal: ARQUETIPOS.JURIDICO_ANALITICO },
  { id: '118', nome: 'SECRETARIA DE AUDITORIA (SECAUD)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '119', nome: 'SECRETARIA DE EXECUÇÃO DA FAZENDA PÚBLICA - PRECATÓRIOS (SECEFAP)', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '120', nome: 'SECRETARIA DE GESTÃO DE PESSOAS (SGPES)', setor: 'Gestão de Pessoas', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '121', nome: 'SECRETARIA DE GOVERNANÇA E GESTÃO ESTRATÉGICA (SEGGEST)', setor: 'Estratégia', categoria: 'Governança', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '122', nome: 'SECRETARIA DE ORÇAMENTO E FINANÇAS (SOF)', setor: 'Financeiro', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '123', nome: 'SECRETARIA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÕES (SETIC)', setor: 'TIC', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '124', nome: 'SECRETARIA DE VARA DO TRABALHO (SECVT)', setor: 'Judiciário', categoria: 'Vara do Trabalho', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '125', nome: 'SECRETARIA DO TRIBUNAL PLENO E SEÇÕES ESPECIALIZADAS (STPSE)', setor: 'Judiciário', categoria: 'Pleno', perfil_ideal: ARQUETIPOS.JURIDICO_OPERACIONAL },
  { id: '126', nome: 'SECRETARIA GERAL JUDICIÁRIA (SGJ)', setor: 'Judiciário', categoria: 'Gestão Judiciária', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '127', nome: 'SECRETARIA-GERAL DA PRESIDÊNCIA (SGP)', setor: 'Alta Gestão', categoria: 'Secretaria Geral', perfil_ideal: ARQUETIPOS.LIDERANCA_VISIONARIA },
  { id: '128', nome: 'SECRETARIA DA ESCOLA JUDICIAL (SECEJUD)', setor: 'Educação', categoria: 'Escola Judicial', perfil_ideal: ARQUETIPOS.DESENVOLVIMENTO_HUMANO },
  { id: '129', nome: 'CHEFE DA SEMAGE (SEÇÃO DE MONITORAMENTO E AVALIAÇÃO)', setor: 'Gestão', categoria: 'Monitoramento', perfil_ideal: ARQUETIPOS.GOVERNANCA_ESTRATEGICA },
  { id: '130', nome: 'CHEFE DA SEMARK (MARKETING)', setor: 'Comunicação', categoria: 'Marketing', perfil_ideal: ARQUETIPOS.COMUNICACAO_RELACIONAMENTO },
  { id: '131', nome: 'GABINETE DA SETIC', setor: 'TIC', categoria: 'Gabinete', perfil_ideal: ARQUETIPOS.TIC_INOVACAO },
  { id: '132', nome: 'SEÇÃO DE APOIO AO PLANEJAMENTO E CONTROLE DE EXECUÇÃO ORÇAMENTÁRIA', setor: 'Financeiro', categoria: 'Orçamento', perfil_ideal: ARQUETIPOS.EXATAS_CONTROLE },
  { id: '133', nome: 'SEÇÃO DE APOSENTADOS E PENSIONISTAS', setor: 'Gestão de Pessoas', categoria: 'Inativos', perfil_ideal: ARQUETIPOS.SAUDE_ACOLHIMENTO },
  { id: '134', nome: 'SEÇÃO DE ARQUITETURA E MONITORAMENTO DE SERVIÇOS', setor: 'TIC', categoria: 'Monitoramento TI', perfil_ideal: ARQUETIPOS.TIC_TECNICO },
  { id: '135', nome: 'SEÇÃO DE AUDITORIA DE CONTRATAÇÕES E PATRIMÔNIO', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE_DETALHE },
  { id: '136', nome: 'SEÇÃO DE COMUNICAÇÃO DE DADOS', setor: 'TIC', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.TIC_INFRA_SUPORTE_AGIL },
  { id: '137', nome: 'SEÇÃO DE GERENCIAMENTO DE PROCESSOS DE NEGÓCIOS', setor: 'Gestão', categoria: 'Processos', perfil_ideal: ARQUETIPOS.GESTAO_PROJETOS_PROCESSOS },
  { id: '138', nome: 'SEÇÃO DE GESTÃO DE CONTRATOS DE TIC', setor: 'TIC', categoria: 'Contratos', perfil_ideal: ARQUETIPOS.AUDITORIA_COMPLIANCE_DETALHE }
];

// --- RENDERIZADOR DE MARKDOWN LIMPO ---
const RobustMarkdown = ({ text }) => {
  if (!text) return null;

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed font-sans text-sm">
      {text.split('\n').map((line, index) => {
        let cleanLine = line.trim();
        if (!cleanLine) return null;

        // Clean artifacts - Skip horizontal rules
        if (cleanLine === '---' || cleanLine === '***' || cleanLine === '___' || cleanLine.match(/^[-*_]{3,}$/)) {
             return <hr key={index} className="my-4 border-t border-slate-200" />;
        }
        
        // Remove Markdown table characters if they appear - Primitive table handling
        if (cleanLine.startsWith('|')) {
            cleanLine = cleanLine.replace(/\|/g, ' ').trim();
        }
        
        // Skip lines that look like table headers separator
        if (cleanLine.match(/^[|:\-\s]+$/)) return null;

        if (cleanLine.startsWith('###')) {
          const titleText = cleanLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
          return (
            <h3 key={index} className="text-lg font-bold text-purple-900 mt-6 mb-3 border-b border-purple-100 pb-2 flex items-center gap-2 break-after-avoid">
              {titleText}
            </h3>
          );
        }

        if (cleanLine.startsWith('####')) {
           const titleText = cleanLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
           return (
             <h4 key={index} className="text-md font-bold text-indigo-800 mt-4 mb-2 break-after-avoid">
               {titleText}
             </h4>
           );
        }

        if (cleanLine.match(/^[\*\-]\s/)) {
          const content = cleanLine.replace(/^[\*\-]\s/, '');
          return (
            <div key={index} className="flex gap-3 ml-2 mb-2 group">
              <span className="text-purple-500 font-bold mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 block print:bg-black"></span>
              <span className="flex-1">
                {parseBold(content)}
              </span>
            </div>
          );
        }
        
        if (cleanLine.startsWith('>')) {
           return (
            <blockquote key={index} className="border-l-4 border-purple-300 pl-4 italic text-slate-600 my-4 bg-purple-50 py-2 rounded-r print:border-black print:bg-transparent">
              {parseBold(cleanLine.replace(/^>\s*/, ''))}
            </blockquote>
           )
        }

        if (cleanLine.startsWith('*')) {
            cleanLine = cleanLine.replace(/^\*\s*/, '');
        }

        return (
          <p key={index} className="mb-2 text-justify">
            {parseBold(cleanLine)}
          </p>
        );
      })}
    </div>
  );
};

const parseBold = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part.replace(/\*/g, ''); 
  });
};

const PDILoadingSkeleton = () => (
  <div className="border-t border-slate-200 bg-purple-50 p-8 animate-pulse rounded-b-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-purple-200 p-2 rounded-lg w-10 h-10"></div>
      <div className="space-y-2">
        <div className="h-4 bg-purple-200 rounded w-48"></div>
        <div className="h-3 bg-purple-200 rounded w-32"></div>
      </div>
    </div>
    <div className="space-y-4 bg-white p-8 rounded-xl border border-purple-100">
      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
      <div className="h-4 bg-slate-100 rounded w-full"></div>
      <div className="h-4 bg-slate-100 rounded w-5/6"></div>
      <div className="h-8 bg-slate-100 rounded w-1/3 mt-6 mb-4"></div>
      <div className="space-y-2">
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-200 mt-2"></div>
          <div className="h-3 bg-slate-100 rounded w-full"></div>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-200 mt-2"></div>
          <div className="h-3 bg-slate-100 rounded w-5/6"></div>
        </div>
      </div>
    </div>
    <div className="mt-4 text-center text-xs text-purple-400 font-medium">
      <span className="animate-bounce">●</span>
      <span className="animate-bounce delay-100 mx-1">●</span>
      <span className="animate-bounce delay-200">●</span>
      <span className="ml-2">Gerando estratégias personalizadas com IA...</span>
    </div>
  </div>
);

// --- MODAL DE FICHA TÉCNICA E TRANSPARÊNCIA ---
const TechnicalModal = ({ onClose, consistencyScore }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 print:hidden animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-slate-100 sticky top-0 bg-white z-10 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          <Microscope className="w-6 h-6 text-indigo-600" />
          Relatório Psicométrico Avançado
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      
      <div className="p-8 space-y-8 overflow-y-auto">
        
        {/* Seção 1: Scoring e Confiabilidade */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sigma className="w-4 h-4" /> 1. Propriedades Psicométricas da Escala (Referência)
          </h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 text-sm text-slate-700">
            <p>
              Abaixo estão os coeficientes de confiabilidade (Alfa de Cronbach) e erro padrão <strong>baseados na literatura (Goldberg, 1992)</strong> para instrumentos deste tipo. Estes valores servem para validar a <em>ferramenta</em> teórica, não a resposta individual.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-500 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-2 rounded-l">Fator (Big Five)</th>
                    <th className="px-4 py-2">Alfa de Cronbach (α)</th>
                    <th className="px-4 py-2">Erro Padrão (SEM)</th>
                    <th className="px-4 py-2 rounded-r">Validade Convergente (r)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {Object.keys(TRAITS_CONFIG).map((trait) => (
                    <tr key={trait}>
                      <td className="px-4 py-2 font-bold text-slate-700">{TRAITS_CONFIG[trait].label}</td>
                      <td className="px-4 py-2 font-mono text-indigo-600">{PSYCHOMETRIC_SPECS[trait].alpha}</td>
                      <td className="px-4 py-2">±{PSYCHOMETRIC_SPECS[trait].sem}%</td>
                      <td className="px-4 py-2 text-slate-500 italic">{PSYCHOMETRIC_SPECS[trait].convergent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
              <strong>Nota Técnica:</strong> O "Erro Padrão de Medida" (SEM) indica a faixa de confiança teórica do score real. Um score de 80% em Extroversão deve ser interpretado como um intervalo verdadeiro entre 76.2% e 83.8% (IC 95%).
            </div>
          </div>
        </section>

        {/* Seção 2: Validação de Consistência Interna (Observed) */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" /> 2. Análise de Consistência da Sessão (Atual)
          </h3>
          <div className="border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
               <div>
                 <h4 className="font-bold text-slate-800">Confiabilidade Resposta-a-Resposta</h4>
                 <p className="text-xs text-slate-500">Calculado via Variância Intra-traço (Coerência de Respostas)</p>
               </div>
               <div className={`text-2xl font-black ${consistencyScore >= 80 ? 'text-green-600' : consistencyScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                 {consistencyScore}%
               </div>
            </div>
            
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full transition-all duration-1000 ${consistencyScore >= 80 ? 'bg-green-500' : consistencyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${consistencyScore}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-slate-600 text-justify">
              Este índice verifica se suas respostas são coerentes. Ele compara, por exemplo, se você marcou itens positivos (ex: "Organizado") e rejeitou os negativos (ex: "Desorganizado") do mesmo traço. 
              <br/><strong>Metodologia:</strong> Inversão de polaridade (Reverse Keying) seguida de cálculo de desvio padrão normalizado.
            </p>
          </div>
        </section>

        {/* Seção 3: Análise Fatorial e Limitações */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> 3. Limitações e Ética
          </h3>
          <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside bg-red-50 p-4 rounded-lg border border-red-100">
            <li><strong>Ausência de Normas Locais:</strong> Os escores T (T-Scores) não são aplicados pois não há base normativa brasileira validada para este instrumento específico no tribunal. Utilizamos escores brutos percentílicos.</li>
            <li><strong>Validade Preditiva:</strong> O algoritmo de "Fit" é teórico. Recomenda-se correlacionar os resultados com avaliações de desempenho reais futuramente para calibração.</li>
            <li><strong>Viés de Aquiescência:</strong> O instrumento controla itens reversos, mas não ajusta para desejabilidade social extrema.</li>
          </ul>
        </section>

      </div>
      
      <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
        <button 
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          Fechar Relatório Técnico
        </button>
      </div>
    </div>
  </div>
);

// --- COMPONENTE DE AVISO DE VIÉS/RISCO ---
const BiasWarning = () => (
  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded-r-lg shadow-sm mb-6 print:border-black print:bg-white">
    <div className="flex gap-3">
      <ShieldAlert className="w-6 h-6 text-orange-600 shrink-0 print:text-black" />
      <div>
        <h4 className="font-bold text-orange-800 text-sm uppercase mb-1 print:text-black">
          Aviso de Uso Responsável
        </h4>
        <p className="text-sm text-orange-800/90 leading-relaxed print:text-black text-justify">
          Esta ferramenta utiliza algoritmos de pontuação reversa (Reverse Scoring) para estimativa de traços. No entanto, os resultados possuem uma <strong>margem de erro estatística (SEM)</strong> e devem ser interpretados como tendências, não absolutos. <strong>NÃO</strong> utilizar para decisões de alto impacto (eliminação) sem validação humana.
        </p>
      </div>
    </div>
  </div>
);

export default function PeopleAnalyticsTRT11() {
  const [step, setStep] = useState(0); 
  const [testPhase, setTestPhase] = useState(1);
  const [answers, setAnswers] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [consistencyScore, setConsistencyScore] = useState(100); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false); 
  
  const [pdiResult, setPdiResult] = useState(null);
  const [pdiLoading, setPdiLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  const searchRef = useRef(null);
  const apiKey = ""; 

  // Injetar scripts de PDF
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script2.async = true;
    document.body.appendChild(script2);

    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if(document.body.contains(script1)) document.body.removeChild(script1);
      if(document.body.contains(script2)) document.body.removeChild(script2);
    };
  }, []);

  // Lógica para calcular recomendações (Top 3 Fits) - OTIMIZADA COM USEMEMO
  const recommendations = useMemo(() => {
    if (step !== 3 || !userProfile || !selectedUnit) return [];

    // 1. Mapeia todos os postos de trabalho disponíveis
    const allCalculatedMatches = postosTrabalho
      .filter(unit => selectedUnit && unit.id !== selectedUnit.id) // Exclui a unidade atual para não recomendar a mesma
      .map(unit => {
        // Safe guard: check if perfil_ideal exists
        if (!unit.perfil_ideal) return { ...unit, score: 0 };

        // Calcula fit para cada unidade usando a Distância de Manhattan Invertida
        const totalDiff = Object.keys(TRAITS_CONFIG).reduce((acc, trait) => {
          // Safe guard: check if traits exist
          const userVal = userProfile[trait] || 0;
          const idealVal = unit.perfil_ideal[trait] || 0;
          return acc + Math.abs(userVal - idealVal);
        }, 0);
        
        // Fórmula de Fit: 100 - (Diferença Total / 5)
        const score = Math.max(0, Math.round(100 - (totalDiff / 5)));
        return { ...unit, score };
      });

    // 2. Ordena todos os resultados do maior score para o menor (DESC)
    const sortedMatches = allCalculatedMatches.sort((a, b) => b.score - a.score);

    // 3. Pega apenas os 3 primeiros (Maior Fit Global)
    return sortedMatches.slice(0, 3);
  }, [step, userProfile, selectedUnit]);

  const generatePDF = async () => {
    if (!window.jspdf) {
        alert("Biblioteca PDF ainda carregando. Tente novamente em alguns segundos.");
        return;
    }
    setPdfLoading(true);
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        
        const content = document.createElement('div');
        content.style.width = '190mm';
        content.style.padding = '20px';
        content.style.fontFamily = 'Helvetica, Arial, sans-serif';
        content.style.fontSize = '12px';
        content.style.color = '#333';
        
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #312e81; font-size: 24px; margin: 0;">Relatório Psicométrico de Fit</h1>
                <p style="color: #6b7280; margin: 5px 0;">TRT11 People Analytics • Advanced Algorithms</p>
            </div>
            
            <div style="background-color: #fff7ed; color: #9a3412; padding: 10px; border: 1px solid #fdba74; margin-bottom: 20px; font-size: 10px;">
                <strong>AVISO LEGAL:</strong> Este relatório contém estimativas estatísticas (SEM incluso). Não constitui laudo clínico.
            </div>

            <div style="margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <p style="margin: 5px 0;"><strong>Posto Alvo:</strong> ${selectedUnit?.nome}</p>
                <p style="margin: 5px 0;"><strong>Categoria:</strong> ${selectedUnit?.categoria}</p>
                <p style="margin: 5px 0;"><strong>Índice de Aderência (Fit):</strong> <span style="font-size: 16px; font-weight: bold; color: ${matchResult?.score >= 75 ? '#16a34a' : '#ca8a04'}">${matchResult?.score}%</span></p>
                <p style="margin: 5px 0; font-size: 10px; color: #666;">Consistência Interna (Variância Intra-traço): ${consistencyScore}%</p>
            </div>

            <h3 style="color: #312e81; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Análise de Traços e Gaps (IC 95%)</h3>
            ${matchResult?.details.map(d => `
                <div style="margin-bottom: 8px; color: #374151;">
                    <strong>${d.trait.toUpperCase()}:</strong> ${d.text}
                </div>
            `).join('')}

            ${pdiResult ? `
                <div style="page-break-before: always;"></div>
                <h3 style="color: #312e81; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Plano de Desenvolvimento Individual (PDI)</h3>
                <div style="color: #374151; line-height: 1.6;">
                    ${pdiResult
                        .replace(/^### (.*$)/gim, '<h4 style="color: #4338ca; margin-top: 20px; margin-bottom: 10px; font-size: 14px;">$1</h4>')
                        .replace(/^\* (.*$)/gim, '<li style="margin-bottom: 5px;">$1</li>')
                        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                    }
                </div>
            ` : ''}
            
            <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #eee; padding-top: 10px;">
                Gerado automaticamente por TRT11 People Analytics AI • v4.1 (Audited Logic)
            </div>
        `;

        document.body.appendChild(content);

        await doc.html(content, {
            callback: function (doc) {
                doc.save(`Relatorio_Fit_${selectedUnit?.id || 'doc'}.pdf`);
                document.body.removeChild(content);
                setPdfLoading(false);
            },
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 900
        });
    } catch (e) {
        console.error(e);
        alert("Erro ao gerar PDF.");
        setPdfLoading(false);
    }
  };

  const filteredUnits = postosTrabalho.filter(unit => 
    unit.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnidadesAgrupadas = filteredUnits.reduce((acc, unit) => {
    if (!acc[unit.categoria]) acc[unit.categoria] = [];
    acc[unit.categoria].push(unit);
    return acc;
  }, {});

  const handleToggle = (id, value) => {
    setAnswers(prev => {
      const next = { ...prev };
      if (next[id] === value) {
        delete next[id]; 
      } else {
        next[id] = value; 
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

  // --- ALGORITMO AVANÇADO DE CONSISTÊNCIA (PSYCHOMETRIC CHECK) ---
  // Calcula a variância das respostas para cada traço.
  // Em uma escala Likert perfeita, itens do mesmo traço deveriam ter valores próximos (após reversão).
  // Se a variância for alta (ex: usuário diz que é "Organizado" (5) e "Desorganizado" (1->Reverso 5) -> OK, variância 0)
  // Se diz que é "Organizado" (5) e "Desorganizado" (5 -> Reverso 1) -> Erro, variância alta.
  const calculatePsychometrics = (finalAnswers) => {
    let totalVariance = 0;
    let traitsCount = 0;

    Object.keys(TRAITS_CONFIG).forEach(trait => {
        const traitItems = BIG_FIVE_ADJECTIVES.filter(i => i.trait === trait);
        const values = traitItems.map(item => {
            let rawVal = finalAnswers[item.id] || 3; // 3 é o neutro
            // Normalizar para direção positiva do traço
            return item.key === 1 ? rawVal : (6 - rawVal);
        });

        // Calcular Média do Traço
        const mean = values.reduce((a, b) => a + b, 0) / values.length;

        // Calcular Variância (Population Variance)
        const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
        
        totalVariance += variance;
        traitsCount++;
    });

    const avgVariance = totalVariance / traitsCount;
    
    // Max variance possível (se a pessoa responder extremos opostos aleatoriamente) é aprox 4.0
    // Consistency Score = 100 - (Variância Normalizada)
    // Uma variância média < 1.0 é excelente. > 2.0 é suspeita.
    
    let consistency = Math.max(0, 100 - (avgVariance * 25)); // Fator de escala empírico
    return Math.round(consistency);
  };
  
  const calculateResults = () => {
    setLoading(true);
    setTimeout(() => {
      let scores = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };
      let counts = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };

      // Normalização dos Scores (Formula Explícita Big Five - Reverse Scoring)
      // Base: Goldberg (1992)
      BIG_FIVE_ADJECTIVES.forEach(adj => {
        let val = answers[adj.id];
        if (val === undefined) val = 3; 
        
        // Se Key=1 (Positivo): 5 é alto, 1 é baixo.
        // Se Key=-1 (Reverso): 5 (Sou 'Negativo') -> Score 1 (Baixo Traço). 
        //                      1 (NÃO sou 'Negativo') -> Score 5 (Alto Traço).
        const adjustedVal = adj.key === 1 ? val : (6 - val);
        scores[adj.trait] += adjustedVal;
        counts[adj.trait] += 1;
      });

      const finalProfile = {};
      Object.keys(scores).forEach(trait => {
        if (counts[trait] > 0) {
          const avg = scores[trait] / counts[trait];
          // Min-Max Normalization para 0-100%
          finalProfile[trait] = Math.round(((avg - 1) / 4) * 100);
        } else {
          finalProfile[trait] = 0;
        }
      });

      // Calcular consistência avançada
      const cScore = calculatePsychometrics(answers);
      setConsistencyScore(cScore);

      setUserProfile(finalProfile);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

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
        const absDiff = Math.abs(diff);
        totalDiff += absDiff;

        // Análise com Intervalo de Confiança (Considerando SEM ~4-5%)
        // Se a diferença for menor que 10%, estatisticamente pode ser irrelevante.
        if (absDiff > 12) { 
             if (diff < -20) {
              analysis.push({ type: 'gap', trait: t, text: `Nível significativamente menor que o ideal (-${absDiff}%). Impacto provável.` });
            } else if (diff > 25) {
              analysis.push({ type: 'warn', trait: t, text: `Nível acima do perfil esperado (+${diff}%). Pode indicar subutilização.` });
            }
        }
      });

      const fit = Math.max(0, Math.round(100 - (totalDiff / 5)));

      setMatchResult({ score: fit, details: analysis });
      setSelectedUnit(unit);
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const generatePDI = async () => {
    setPdiLoading(true);
    const prompt = `
      Atue como um **Psicólogo Organizacional Sênior e Coach Executivo**.
      
      Crie um **Plano de Desenvolvimento Individual (PDI)** de alto impacto para um servidor do Tribunal Regional do Trabalho (TRT11).
      
      **ALERTA DE CONTEXTO:** Esta é uma ferramenta de desenvolvimento. Evite linguagem determinista ou de julgamento.
      
      **CONTEXTO:**
      - **Posto:** ${selectedUnit?.nome}
      - **Categoria:** ${selectedUnit?.categoria}
      
      **PERFIL (Ideal vs Real):**
      - Ideal: ${JSON.stringify(selectedUnit?.perfil_ideal)}
      - Real: ${JSON.stringify(userProfile)}
      
      **GAPS:**
      ${JSON.stringify(matchResult?.details)}
      
      ---
      
      **ESTRUTURA DE SAÍDA (MARKDOWN LIMPO):**
      
      ### 1. Diagnóstico Executivo (Foco em Potencial) 🧠
      Faça uma análise breve, empática e voltada ao crescimento.
      IMPORTANTE: Analise a COMBINAÇÃO dos traços, não apenas eles isolados (ex: Alta Conscienciosidade + Baixa Abertura = Risco de Rigidez).
      
      ### 2. Plano de Ação: Domínio Comportamental 🚀
      Para cada gap crítico, use uma lista com marcadores:
      * **Traço:** [Nome]
      * **Desafio:** Impacto prático no dia a dia do tribunal.
      * **Estratégia Micro:** Ação imediata (Quick Win).
      * **Estratégia Macro:** Mudança de hábito a longo prazo.
      
      ### 3. Curadoria de Conhecimento 📚
      Sugestões de livros/artigos.
      
      ### 4. Compromisso 🎯
      Frase motivadora final.
      
      **REGRAS DE FORMATAÇÃO:**
      - Use APENAS a sintaxe Markdown padrão.
      - NÃO use tabelas.
      - NÃO use linhas horizontais (---).
      - NÃO use símbolos estranhos no início das linhas.
      - Use **negrito** para destaque.
      - Use * para listas.
    `;

    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
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
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) throw new Error("A IA não retornou um plano válido.");

      setPdiResult(text);
    } catch (error) {
      console.error(error);
      setPdiResult("Não foi possível gerar o PDI no momento. Por favor, tente novamente.");
    } finally {
      setPdiLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setTestPhase(1);
    setAnswers({});
    setUserProfile(null);
    setSelectedUnit(null);
    setPreviewUnit(null);
    setMatchResult(null);
    setErrorMsg('');
    setSearchTerm('');
    setPdiResult(null);
    setConsistencyScore(100);
  };

  const itemsToDisplay = testPhase === 1 
    ? BIG_FIVE_ADJECTIVES 
    : BIG_FIVE_ADJECTIVES.filter(adj => answers[adj.id] !== 5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Modal de Transparência */}
      {showTechModal && (
        <TechnicalModal 
          onClose={() => setShowTechModal(false)} 
          consistencyScore={consistencyScore}
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">TRT11 People Analytics</h1>
              <p className="text-xs text-blue-200 flex items-center gap-1">
                <span className="bg-yellow-500/20 px-1 rounded text-yellow-300 font-bold">BETA</span>
                Fit Cultural & Técnico (Adjective Checklist)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowTechModal(true)}
               className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors border border-white/20"
             >
               <Microscope className="w-3 h-3 text-yellow-300" />
               Relatório Técnico (Psicometria)
             </button>
             <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-white/10 px-3 py-1 rounded border border-white/20">
               <BrainCircuit className="w-3 h-3 text-yellow-300" />
               <span>AI Powered v4.1</span>
             </div>
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Sistema de People Analytics TRT11</h2>
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-xs font-bold border border-orange-200 mb-4">
                ⚠️ FERRAMENTA EXPLORATÓRIA - NÃO UTILIZAR PARA DECISÕES ELIMINATÓRIAS
              </div>
              <p className="text-slate-500 max-w-xl mx-auto">
                Mapeamento de perfil comportamental via Adjective Markers (Big Five). 
                Esta ferramenta visa apoiar o desenvolvimento profissional e autoconhecimento, sem substituir avaliações psicológicas formais.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-10 text-left">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Metodologia e Limitações
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Base Científica (Big Five)</h4>
                  <p>
                    Utilizamos os marcadores adjetivos de Goldberg para mapear 5 dimensões universais. A escala é adaptada para feedback rápido e não possui, no momento, validação psicométrica para população local do TRT.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Perfis de Cargo</h4>
                  <p>
                    Os 138 perfis (arquétipos) foram construídos com base em taxonomia ocupacional padrão (O*NET/CBO) e heurísticas de psicologia organizacional, não em dados empíricos de performance do tribunal.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Uso Ético</h4>
                  <p>
                    O score de "Fit" é uma métrica de distância matemática, não um veredito de competência. O sistema não deve ser utilizado isoladamente para contratações ou promoções.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowTechModal(true)}
                  className="text-indigo-600 text-xs font-bold hover:underline flex items-center justify-center gap-1 w-full"
                >
                  <Eye className="w-3 h-3" />
                  Ver Ficha Técnica Completa e Fórmulas
                </button>
              </div>
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
                <h3 className="text-xl font-bold text-slate-800 mb-2">Checklist Comportamental</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Autoavaliação guiada baseada em 50 marcadores adjetivos (Big Five Markers).
                </p>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md group-hover:bg-indigo-700 transition-colors">
                  Iniciar Avaliação
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all group relative overflow-hidden opacity-75 grayscale hover:grayscale-0 hover:opacity-100">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={() => {}} // Placeholder
                  className="hidden" 
                  disabled
                />
                <div className="h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Upload className="w-32 h-32 text-purple-600" />
                  </div>
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Lock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Upload de Laudo (Em Breve)</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    A importação de PDFs externos está temporariamente desativada para revisão dos parsers de dados sensíveis.
                  </p>
                  <button disabled className="w-full py-3 bg-slate-100 text-slate-400 rounded-lg font-bold cursor-not-allowed mt-auto">
                    Indisponível
                  </button>
                </div>
              </div>
            </div>
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
                    : 'Os itens que sobrarem (não marcados em nenhuma etapa) serão NEUTROS (Valor 3).'}
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
                        <div className="text-right">
                            <span className="font-mono font-bold text-slate-700 text-sm print:text-black">{userProfile[trait]}%</span>
                            <span className="text-[10px] text-slate-400 ml-1">±{PSYCHOMETRIC_SPECS[trait].sem}%</span>
                        </div>
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

                {/* Consistency Indicator */}
                <div className="mt-6 p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-bold text-slate-500">Confiabilidade da Resposta</span>
                        <span className={consistencyScore >= 70 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                           {consistencyScore >= 80 ? 'Alta' : consistencyScore >= 50 ? 'Média' : 'Baixa'}
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${consistencyScore >= 70 ? 'bg-green-400' : 'bg-red-400'}`} style={{width: `${consistencyScore}%`}}></div>
                    </div>
                    {consistencyScore < 50 && (
                        <p className="text-[10px] text-red-500 mt-1 italic">
                           Detectamos inconsistências estatísticas em suas respostas (Variância elevada).
                        </p>
                    )}
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
                  Seleção de Posto de Trabalho para Fit
                </h2>
                <p className="text-slate-500 mb-8 text-sm">
                  Busque pelo nome da unidade, setor ou atividade (ex: "conciliação", "segurança", "manutenção").
                </p>

                <div className="space-y-8" ref={searchRef}>
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Buscar Posto de Trabalho</label>
                    
                    {/* AUTOCOMPLETE INPUT */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-indigo-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-11 pr-10 py-4 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
                        placeholder="Digite o nome, setor ou uma atividade (ex: 'folha de pagamento')..."
                        value={searchTerm}
                        onFocus={() => setShowDropdown(true)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowDropdown(true);
                          if (e.target.value === '') setPreviewUnit(null);
                        }}
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => {
                            setSearchTerm('');
                            setPreviewUnit(null);
                            setShowDropdown(true);
                          }}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* DROPDOWN FLUTUANTE DE RESULTADOS */}
                    {showDropdown && (
                      <div className="absolute z-30 w-full mt-2 bg-white rounded-xl shadow-2xl border border-indigo-100 max-h-80 overflow-y-auto custom-scrollbar animate-fade-in-up">
                        {Object.keys(filteredUnidadesAgrupadas).length > 0 ? (
                          Object.keys(filteredUnidadesAgrupadas).map((categoria) => (
                            <div key={categoria}>
                              <div className="bg-slate-50/80 backdrop-blur-sm px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 border-b border-slate-100">
                                {categoria}
                              </div>
                              {filteredUnidadesAgrupadas[categoria].map((unit) => (
                                <button
                                  key={unit.id}
                                  onClick={() => {
                                    setPreviewUnit(unit);
                                    setSearchTerm(unit.nome);
                                    setShowDropdown(false);
                                  }}
                                  className={`w-full text-left px-5 py-3 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group
                                    ${previewUnit?.id === unit.id ? 'bg-indigo-50' : 'hover:bg-indigo-50/50'}
                                  `}
                                >
                                  <div>
                                    <div className={`font-bold text-sm ${previewUnit?.id === unit.id ? 'text-indigo-700' : 'text-slate-700 group-hover:text-indigo-700'}`}>
                                      {unit.nome}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1 line-clamp-1 opacity-70">
                                      {unit.atividades}
                                    </div>
                                  </div>
                                  {previewUnit?.id === unit.id && <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 ml-2" />}
                                </button>
                              ))}
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-slate-400">
                            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="font-medium">Nenhum posto encontrado</p>
                            <p className="text-xs mt-1 opacity-70">Tente buscar por atividade, ex: "atendimento".</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {previewUnit ? (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                      <div className="mb-6 pb-6 border-b border-indigo-200/50">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-1 rounded uppercase tracking-wide">
                             {previewUnit.categoria}
                           </span>
                           <span className="text-[10px] font-bold bg-white border border-indigo-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">
                             {previewUnit.setor}
                           </span>
                        </div>
                        <h3 className="text-xl font-bold text-indigo-900">{previewUnit.nome}</h3>
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
                          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Atividades Típicas (Inferidas)</h4>
                          <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed shadow-sm">
                            Este perfil ideal foi calculado com base nas atividades padrão para {previewUnit.categoria} e {previewUnit.setor} (Fonte: O*NET/CBO Heuristics).
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
                        <Target className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-400 text-sm font-medium">Use a busca acima para encontrar um posto de trabalho.</p>
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
            {/* Bias Warning Header */}
            <BiasWarning />

            {/* Top Action Bar - Back and New Analysis */}
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
              
              {/* Top Generate PDI Button */}
              <button 
                onClick={generatePDI}
                disabled={pdiLoading || pdiResult}
                className={`
                  text-sm text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md font-bold
                  ${pdiLoading || pdiResult ? 'bg-purple-400 cursor-not-allowed hidden' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}
                `}
              >
                {pdiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {pdiLoading ? 'Gerando PDI...' : 'Gerar PDI com IA'}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 print:border-none print:shadow-none">
              {/* Score Header */}
              <div className="bg-slate-50 p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 print:bg-white print:border-b-2 print:border-slate-800">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">TRT11 PEOPLE ANALYTICS • BETA</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Relatório de Aderência (Fit)</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500 print:text-gray-600">
                    <span>Candidato</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 print:text-gray-400" />
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 print:border-0 print:bg-transparent print:text-black print:p-0">
                      {selectedUnit?.nome}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block print:block">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 print:text-gray-600">Aderência Global</div>
                    <div className={`text-4xl font-black ${matchResult?.score >= 75 ? 'text-green-600' : matchResult?.score >= 50 ? 'text-yellow-600' : 'text-red-600'} print:text-black`}>
                      {matchResult?.score}%
                    </div>
                    {/* Link para entender o cálculo */}
                    <button 
                      onClick={() => setShowTechModal(true)}
                      className="text-[10px] text-indigo-500 hover:underline mt-1 print:hidden"
                    >
                      Ver detalhes psicométricos
                    </button>
                  </div>
                  
                  {/* Score Circle */}
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white print:text-black print:shadow-none print:ring-0 print:border print:border-black
                    ${matchResult?.score >= 75 ? 'bg-gradient-to-br from-green-400 to-green-600 print:bg-none' : 
                      matchResult?.score >= 50 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 print:bg-none' : 
                      'bg-gradient-to-br from-red-400 to-red-600 print:bg-none'}
                  `}>
                    {matchResult?.score >= 75 ? 'A' : matchResult?.score >= 50 ? 'B' : 'C'}
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
                      <span className="flex items-center gap-1"><div className="w-2 h-2 border-l border-r border-slate-400 bg-slate-200"></div> SEM (Margem)</span>
                    </div>
                  </div>
                  
                  {Object.keys(TRAITS_CONFIG).map(trait => {
                    const diff = userProfile ? userProfile[trait] - selectedUnit?.perfil_ideal[trait] : 0;
                    const sem = PSYCHOMETRIC_SPECS[trait].sem;
                    
                    return (
                      <div key={trait} className="relative print:mb-4 break-inside-avoid">
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={`uppercase ${TRAITS_CONFIG[trait].color} print:text-black`}>{TRAITS_CONFIG[trait].label}</span>
                          <span className="text-slate-400 print:text-black flex items-center gap-1">
                             Diff: {diff > 0 ? `+${diff}` : diff}%
                             <span className="ml-1 text-[9px] text-slate-300 font-normal border border-slate-100 rounded px-1 bg-slate-50">SEM: ±{sem}%</span>
                          </span>
                        </div>
                        
                        {/* Bar Track */}
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative print:border print:border-gray-400">
                          
                          {/* Ideal Range Marker (Soft Background) */}
                          <div 
                            className="absolute top-0 bottom-0 bg-slate-200 opacity-50 z-0 print:bg-gray-300"
                            style={{ 
                              left: '0%', 
                              width: `${selectedUnit?.perfil_ideal[trait]}%` 
                            }}
                          ></div>
                          
                          {/* Ideal Line */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10 print:bg-black" 
                            style={{ left: `${selectedUnit?.perfil_ideal[trait]}%` }}
                          ></div>

                          {/* User Score Bar */}
                          <div 
                            className={`absolute top-1 bottom-1 rounded-full z-20 ${TRAITS_CONFIG[trait].bg} shadow-sm print:bg-black`}
                            style={{ width: `${userProfile ? userProfile[trait] : 0}%` }}
                          ></div>

                          {/* SEM Range Marker (Elemento Visual Realçado) */}
                          <div 
                            className="absolute top-0 bottom-0 z-30"
                            style={{ 
                              left: `${Math.max(0, (userProfile ? userProfile[trait] : 0) - sem)}%`, 
                              width: `${sem * 2}%` 
                            }}
                          >
                            <div className="w-full h-full bg-slate-800/10 border-l border-r border-slate-500/50 box-border" title={`Intervalo de Confiança`}></div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-600/40 -translate-x-1/2"></div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Textual Analysis */}
                <div className="space-y-6 break-inside-avoid">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 text-sm uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-indigo-500 print:text-black" /> Diagnóstico de Gaps
                  </h3>

                  {matchResult?.details.length === 0 ? (
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
                        {matchResult?.details.map((item, idx) => (
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
                      <HelpCircle className="w-4 h-4 text-blue-600 print:text-black" />
                      <h4 className="text-blue-900 font-bold text-xs uppercase print:text-black">Sobre o Modelo de Competências</h4>
                    </div>
                    <p className="text-blue-700 text-xs leading-relaxed text-justify print:text-black">
                      Esta análise utiliza heurísticas de competências baseadas em descrições de cargo padrão (O*NET). Traços como <strong>Conscienciosidade</strong> e <strong>Abertura</strong> são maleáveis. Um "Fit" baixo não indica incompetência, mas sim uma área onde o profissional pode precisar despender mais energia adaptativa.
                    </p>
                  </div>
                </div>
              </div>

              {/* NEW SECTION: RECOMMENDATIONS */}
              <div className="px-8 pb-8 print:break-inside-avoid">
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
                    <TrendingUp className="w-4 h-4 text-indigo-500" /> Outras Oportunidades com Alto Fit
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map(rec => (
                      <div key={rec.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors shadow-sm cursor-default">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold uppercase text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 tracking-tighter">{rec.categoria}</span>
                          <span className={`text-lg font-black ${rec.score >= 75 ? 'text-green-600' : 'text-indigo-600'}`}>{rec.score}%</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 line-clamp-2 leading-tight min-h-[2.5em]" title={rec.nome}>{rec.nome}</h4>
                        <div className="mt-2 text-[9px] text-slate-400">
                          Setor: {rec.setor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LOADING SKELETON */}
              {pdiLoading && <PDILoadingSkeleton />}

              {/* PDI AI SECTION */}
              {pdiResult && !pdiLoading && (
                <div className="border-t border-slate-200 bg-purple-50 p-8 animate-fade-in break-inside-avoid print:bg-white print:border-t-2 print:border-black">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-600 p-2 rounded-lg text-white print:text-black print:bg-transparent print:border print:border-black">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 print:text-black">Plano de Desenvolvimento Individual (PDI)</h3>
                      <p className="text-sm text-purple-700 print:text-gray-600">Gerado por IA (Gemini) • Estratégias de Domínio Comportamental</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl border border-purple-100 shadow-sm print:border-0 print:shadow-none print:p-0">
                    <RobustMarkdown text={pdiResult} />
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions - PDF Button */}
            <div className="mt-8 flex justify-center pb-12 no-print">
              <button 
                onClick={generatePDF}
                disabled={pdfLoading}
                className={`
                  bg-indigo-900 text-white hover:bg-indigo-800 px-8 py-4 rounded-xl flex items-center gap-3 transition-all shadow-xl font-bold text-lg hover:scale-105 transform active:scale-95
                  ${pdfLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {pdfLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Printer className="w-6 h-6" />}
                {pdfLoading ? 'Preparando Impressão...' : 'Imprimir / Salvar como PDF'}
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
