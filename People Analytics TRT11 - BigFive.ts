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
  GripHorizontal,
  ThumbsUp,
  ThumbsDown,
  Info,
  Target,
  ShieldCheck,
  GraduationCap,
  Zap,
  Lightbulb,
  Book,
  Printer,
  List
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

// --- ARQUÉTIPOS AVANÇADOS (Expandido para 40+ perfis) ---
// Modelagem baseada na taxonomia de atividades do TRT11 e teoria Big Five
const ARQUETIPOS = {
  // === NÍVEL 1: ESTRATÉGICO E ALTA LIDERANÇA ===
  ESTRATEGISTA_INSTITUCIONAL: { abertura: 90, conscienciosidade: 85, extroversao: 80, amabilidade: 60, estabilidade: 95 }, // Diretores Gerais, Secretários Gerais
  LIDER_POLITICO_ADMINISTRATIVO: { abertura: 80, conscienciosidade: 75, extroversao: 90, amabilidade: 75, estabilidade: 85 }, // Chefias de Gabinete (interface política)
  CONSELHEIRO_GOVERNANCA: { abertura: 80, conscienciosidade: 95, extroversao: 50, amabilidade: 60, estabilidade: 90 }, // Governança, Riscos, Estratégia

  // === NÍVEL 2: GESTÃO TÁTICA E CHEFIAS ===
  GESTOR_OPERACIONAL_JUDICIARIO: { abertura: 50, conscienciosidade: 95, extroversao: 65, amabilidade: 65, estabilidade: 85 }, // Diretores de Secretaria Vara/Turma
  GESTOR_OPERACIONAL_ADMINISTRATIVO: { abertura: 50, conscienciosidade: 90, extroversao: 60, amabilidade: 70, estabilidade: 85 }, // Chefes de Seção Administrativa
  GESTOR_PROJETOS_TIC: { abertura: 75, conscienciosidade: 90, extroversao: 70, amabilidade: 65, estabilidade: 85 }, // Gestão de Projetos e Contratos TI

  // === NÍVEL 3: ESPECIALISTAS JURÍDICOS ===
  JURISTA_ANALITICO_SENIOR: { abertura: 85, conscienciosidade: 90, extroversao: 30, amabilidade: 45, estabilidade: 85 }, // Jurisprudência, Precedentes, Assessoria Desembargador
  PROCESSUALISTA_EXECUTOR: { abertura: 35, conscienciosidade: 98, extroversao: 40, amabilidade: 55, estabilidade: 80 }, // Execução, Mandados (interno), Secretaria
  OFICIAL_DILIGENCIA_EXTERNA: { abertura: 60, conscienciosidade: 80, extroversao: 70, amabilidade: 45, estabilidade: 90 }, // Oficiais de Justiça (Rua)
  MEDIADOR_CONCILIADOR: { abertura: 70, conscienciosidade: 60, extroversao: 75, amabilidade: 98, estabilidade: 90 }, // NUPEMEC, CEJUSC, Cooperação

  // === NÍVEL 4: CONTROLE, FINANÇAS E DADOS ===
  AUDITOR_CONFORMIDADE_RIGOROSO: { abertura: 25, conscienciosidade: 99, extroversao: 35, amabilidade: 30, estabilidade: 90 }, // Auditoria Interna, Controle
  ANALISTA_ORCAMENTARIO_FINANCEIRO: { abertura: 40, conscienciosidade: 98, extroversao: 35, amabilidade: 50, estabilidade: 85 }, // Orçamento, Empenho
  CALCULISTA_JUDICIAL: { abertura: 40, conscienciosidade: 99, extroversao: 25, amabilidade: 40, estabilidade: 85 }, // Contadoria, Cálculos
  CIENTISTA_DADOS_ESTATISTICO: { abertura: 85, conscienciosidade: 90, extroversao: 30, amabilidade: 50, estabilidade: 80 }, // Estatística, DataJud

  // === NÍVEL 5: GESTÃO DE PESSOAS E BEM-ESTAR ===
  DESENVOLVEDOR_TALENTOS: { abertura: 90, conscienciosidade: 65, extroversao: 80, amabilidade: 90, estabilidade: 75 }, // Escola Judicial, Capacitação
  GESTOR_ADMINISTRATIVO_RH: { abertura: 40, conscienciosidade: 95, extroversao: 50, amabilidade: 60, estabilidade: 80 }, // Pagamento, Frequência, Legislação
  CUIDADOR_SAUDE_ORGANIZACIONAL: { abertura: 65, conscienciosidade: 75, extroversao: 70, amabilidade: 95, estabilidade: 85 }, // Saúde, Psicossocial, Benefícios

  // === NÍVEL 6: TECNOLOGIA DA INFORMAÇÃO ===
  INOVADOR_TECNOLOGICO: { abertura: 98, conscienciosidade: 60, extroversao: 60, amabilidade: 70, estabilidade: 75 }, // Inovação, LIODS
  ENGENHEIRO_SOFTWARE: { abertura: 90, conscienciosidade: 85, extroversao: 35, amabilidade: 55, estabilidade: 75 }, // Desenvolvimento de Sistemas
  ARQUITETO_INFRAESTRUTURA_TI: { abertura: 60, conscienciosidade: 95, extroversao: 30, amabilidade: 50, estabilidade: 90 }, // Redes, Segurança Info, Banco de Dados
  SUPORTE_TECNICO_EMPATICO: { abertura: 60, conscienciosidade: 80, extroversao: 75, amabilidade: 85, estabilidade: 85 }, // Service Desk, Atendimento ao Usuário

  // === NÍVEL 7: LOGÍSTICA E INFRAESTRUTURA ===
  GESTOR_CONTRATOS_LICITACOES: { abertura: 45, conscienciosidade: 98, extroversao: 50, amabilidade: 40, estabilidade: 90 }, // Licitações, Contratos Adm
  LOGISTICA_PATRIMONIAL: { abertura: 40, conscienciosidade: 90, extroversao: 60, amabilidade: 60, estabilidade: 80 }, // Material, Almoxarifado, Transporte
  ENGENHEIRO_MANUTENCAO_PREDIAL: { abertura: 50, conscienciosidade: 90, extroversao: 55, amabilidade: 50, estabilidade: 85 }, // Engenharia, Manutenção

  // === NÍVEL 8: SEGURANÇA E INTELIGÊNCIA ===
  ANALISTA_INTELIGENCIA_SEGURANCA: { abertura: 75, conscienciosidade: 90, extroversao: 40, amabilidade: 30, estabilidade: 95 }, // Inteligência Policial, Riscos
  AGENTE_OPERACIONAL_OSTENSIVO: { abertura: 30, conscienciosidade: 90, extroversao: 60, amabilidade: 35, estabilidade: 98 }, // Segurança Física, Operações Táticas
  GESTOR_SEGURANCA_ESTRATEGICA: { abertura: 50, conscienciosidade: 95, extroversao: 70, amabilidade: 45, estabilidade: 95 }, // Coordenação Polícia Judicial

  // === NÍVEL 9: COMUNICAÇÃO E MEMÓRIA ===
  COMUNICADOR_INSTITUCIONAL: { abertura: 90, conscienciosidade: 60, extroversao: 95, amabilidade: 85, estabilidade: 70 }, // Imprensa, Marketing
  CERIMONIALISTA_PROTOCOLAR: { abertura: 65, conscienciosidade: 90, extroversao: 85, amabilidade: 80, estabilidade: 80 }, // Cerimonial, Eventos
  CURADOR_MEMORIA_BIBLIOTECA: { abertura: 70, conscienciosidade: 85, extroversao: 35, amabilidade: 60, estabilidade: 75 }, // Biblioteca, Memória

  // === NÍVEL 10: APOIO ADMINISTRATIVO GERAL ===
  ASSISTENTE_ADMINISTRATIVO_ROTINA: { abertura: 35, conscienciosidade: 85, extroversao: 50, amabilidade: 75, estabilidade: 75 }, // Protocolo, Arquivo, Apoio Geral
  SECRETARIO_EXECUTIVO: { abertura: 50, conscienciosidade: 95, extroversao: 65, amabilidade: 80, estabilidade: 85 } // Secretariado de Gabinetes/Diretorias
};

// --- LISTA DE POSTOS DE TRABALHO (Mapeamento 1:1 com novos Arquétipos) ---
const postosTrabalho = [
  // --- ALTA GESTÃO E GABINETES ---
  { id: '1', nome: 'DIRETOR GERAL (DG)', setor: 'Alta Gestão', categoria: 'Direção Geral', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '2', nome: 'SECRETARIA-GERAL DA PRESIDÊNCIA (SGP)', setor: 'Alta Gestão', categoria: 'Direção Geral', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '3', nome: 'SECRETARIA GERAL JUDICIÁRIA (SGJ)', setor: 'Judiciário', categoria: 'Direção Geral', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '4', nome: 'ASSESSOR-CHEFE DE GABINETE (GAB)', setor: 'Alta Gestão', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDER_POLITICO_ADMINISTRATIVO },
  { id: '5', nome: 'CHEFE DO GABINETE DA SAD (GABSAD)', setor: 'Administrativo', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDER_POLITICO_ADMINISTRATIVO },
  { id: '6', nome: 'CHEFE DO GABINETE DA SGPES (GABSGPES)', setor: 'Gestão de Pessoas', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDER_POLITICO_ADMINISTRATIVO },
  { id: '7', nome: 'CHEFE DO GABINETE DA SETIC (GABSETIC)', setor: 'TIC', categoria: 'Chefia de Gabinete', perfil_ideal: ARQUETIPOS.LIDER_POLITICO_ADMINISTRATIVO },
  { id: '8', nome: 'GABINETE DE APOIO À CORREGEDORIA (GABCORREGI)', setor: 'Corregedoria', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '9', nome: 'GABINETE DE APOIO À EJUD (GABEJUD)', setor: 'Educação', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '10', nome: 'GABINETE DE APOIO À SECRETARIA-GERAL JUDICIÁRIA (GABSGJ)', setor: 'Judiciário', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '11', nome: 'GABINETE DE APOIO À SEGEST (GABSEGGEST)', setor: 'Estratégia', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '12', nome: 'GABINETE DE APOIO À SGP (GABSGP)', setor: 'Alta Gestão', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '13', nome: 'GABINETE DE APOIO À SOF (GABSOF)', setor: 'Financeiro', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '14', nome: 'DIVISÃO DE APOIO À VICE-PRESIDÊNCIA (DIVVP)', setor: 'Alta Gestão', categoria: 'Apoio Gabinete', perfil_ideal: ARQUETIPOS.SECRETARIO_EXECUTIVO },
  { id: '15', nome: 'SECRETARIA DE ASSESSORAMENTO JURÍDICO-ADMINISTRATIVO (SECJAD)', setor: 'Alta Gestão', categoria: 'Assessoria Jurídica', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '16', nome: 'ASSESSORIA DE ORDENANÇA (ASSORD)', setor: 'Alta Gestão', categoria: 'Apoio Executivo', perfil_ideal: ARQUETIPOS.ASSISTENTE_ADMINISTRATIVO_ROTINA },
  { id: '129', nome: 'ASSESSOR TÉCNICO DE GABINETE DE DESEMBARGADOR', setor: 'Judiciário', categoria: 'Assessoria Jurídica', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '130', nome: 'ASSESSOR DE JUIZ SUBSTITUTO', setor: 'Judiciário', categoria: 'Assessoria Jurídica', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '131', nome: 'ASSISTENTE DE JUIZ TITULAR', setor: 'Judiciário', categoria: 'Apoio Judiciário', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },

  // --- ESTRATÉGIA, GOVERNANÇA E DADOS ---
  { id: '17', nome: 'SECRETARIA DE GOVERNANÇA E GESTÃO ESTRATÉGICA (SEGGEST)', setor: 'Estratégia', categoria: 'Governança', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '18', nome: 'ASSESSORIA DE GOVERNANÇA DE GESTÃO DE PESSOAS (ASSEGESP)', setor: 'Gestão de Pessoas', categoria: 'Governança', perfil_ideal: ARQUETIPOS.CONSELHEIRO_GOVERNANCA },
  { id: '19', nome: 'ASSESSORIA DE INTEGRIDADE E GESTÃO DE RISCOS (ASSIGER)', setor: 'Alta Gestão', categoria: 'Compliance', perfil_ideal: ARQUETIPOS.CONSELHEIRO_GOVERNANCA },
  { id: '20', nome: 'COORDENADORIA DE GOVERNANÇA DE CONTRATAÇÕES E OBRAS (COGCO)', setor: 'Administrativo', categoria: 'Governança', perfil_ideal: ARQUETIPOS.CONSELHEIRO_GOVERNANCA },
  { id: '21', nome: 'DIVISÃO DE PROJETOS E DE INICIATIVAS NACIONAIS (DIPIN)', setor: 'Estratégia', categoria: 'Projetos', perfil_ideal: ARQUETIPOS.GESTOR_PROJETOS_TIC },
  { id: '22', nome: 'DIVISÃO DE ESTATÍSTICA (DIVIEST)', setor: 'Estratégia', categoria: 'Estatística', perfil_ideal: ARQUETIPOS.CIENTISTA_DADOS_ESTATISTICO },
  { id: '23', nome: 'SEÇÃO TÉCNICA DO E-GESTÃO E DATAJUD (SETDATA)', setor: 'Estratégia', categoria: 'Dados Judiciais', perfil_ideal: ARQUETIPOS.CIENTISTA_DADOS_ESTATISTICO },
  { id: '24', nome: 'CHEFE DA SEMAGE (SEÇÃO DE MONITORAMENTO E AVALIAÇÃO)', setor: 'Estratégia', categoria: 'Monitoramento', perfil_ideal: ARQUETIPOS.CIENTISTA_DADOS_ESTATISTICO },
  { id: '25', nome: 'SEÇÃO DE NEGÓCIOS (SENEG)', setor: 'Estratégia', categoria: 'Negócios', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '26', nome: 'SEÇÃO DE GERENCIAMENTO DE PROCESSOS DE NEGÓCIOS (SEGENE)', setor: 'Estratégia', categoria: 'Processos', perfil_ideal: ARQUETIPOS.CONSELHEIRO_GOVERNANCA },
  { id: '27', nome: 'SEÇÃO DE GESTÃO SOCIOAMBIENTAL, ACESSIBILIDADE E INCLUSÃO', setor: 'Estratégia', categoria: 'Sustentabilidade', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '28', nome: 'DIVISÃO DE APOIO EXTERNO INSTITUCIONAL (DIVAEI)', setor: 'Estratégia', categoria: 'Relações Institucionais', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL },

  // --- JURÍDICO E SECRETARIAS PROCESSUAIS ---
  { id: '29', nome: 'SECRETARIA DA CORREGEDORIA REGIONAL (SCR)', setor: 'Corregedoria', categoria: 'Gestão Judiciária', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },
  { id: '30', nome: 'COORDENADORIA DE APOIO À SECRETARIA DA CORREGEDORIA (COOASCR)', setor: 'Corregedoria', categoria: 'Apoio Administrativo', perfil_ideal: ARQUETIPOS.ASSISTENTE_ADMINISTRATIVO_ROTINA },
  { id: '31', nome: 'COORDENADORIA JURÍDICA DA CORREGEDORIA (COOJUCOR)', setor: 'Corregedoria', categoria: 'Assessoria Jurídica', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '32', nome: 'SECRETARIA DO TRIBUNAL PLENO E SEÇÕES ESPECIALIZADAS (STPSE)', setor: 'Judiciário', categoria: 'Pleno', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },
  { id: '33', nome: 'COORDENADORIA DE APOIO À TURMA (COAT1, COAT2, COAT3)', setor: 'Judiciário', categoria: 'Secretaria de Turma', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },
  { id: '34', nome: 'DIRETOR DE SECRETARIA DE VARA DO TRABALHO', setor: 'Judiciário', categoria: 'Direção de Vara', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },
  { id: '35', nome: 'SECRETARIA DE VARA DO TRABALHO (SECVT)', setor: 'Judiciário', categoria: 'Vara do Trabalho', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '36', nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (DIVDIF)', setor: 'Judiciário', categoria: 'Distribuição', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '37', nome: 'CHEFE DA SEJURIS (SEÇÃO DE JURISPRUDÊNCIA)', setor: 'Judiciário', categoria: 'Jurisprudência', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '38', nome: 'CENTRO DE INTELIGÊNCIA - COORDENADORIA DE PRECEDENTES (CIPAC)', setor: 'Judiciário', categoria: 'Inteligência Jurídica', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '39', nome: 'DIVISÃO DE COOPERAÇÃO JUDICIÁRIA (DICOOP)', setor: 'Judiciário', categoria: 'Cooperação', perfil_ideal: ARQUETIPOS.MEDIADOR_CONCILIADOR },
  { id: '40', nome: 'SECRETARIA DE EXECUÇÃO DA FAZENDA PÚBLICA - PRECATÓRIOS', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.CALCULISTA_JUDICIAL },
  { id: '41', nome: 'DIVISÃO DE EXECUÇÃO CONCENTRADA (DECON)', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '42', nome: 'DIVISÃO DE PESQUISA PATRIMONIAL (DIPEP)', setor: 'Judiciário', categoria: 'Pesquisa Patrimonial', perfil_ideal: ARQUETIPOS.ANALISTA_INTELIGENCIA_SEGURANCA },
  { id: '43', nome: 'CHEFE DA SEHASP (SEÇÃO DE HASTA PÚBLICA)', setor: 'Judiciário', categoria: 'Execução', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '44', nome: 'SEÇÃO DE MANDADOS JUDICIAIS (SEMAJUD)', setor: 'Judiciário', categoria: 'Mandados', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '45', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTBV E MANDADOS JUDICIAIS', setor: 'Administrativo', categoria: 'Apoio Mandados', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_ADMINISTRATIVO },
  { id: '46', nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTM (DIVAFTM)', setor: 'Administrativo', categoria: 'Apoio Fórum', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_ADMINISTRATIVO },
  { id: '47', nome: 'DIVISÃO DE CONTADORIA JURÍDICA (DICONJUD)', setor: 'Judiciário', categoria: 'Contadoria', perfil_ideal: ARQUETIPOS.CALCULISTA_JUDICIAL },
  { id: '132', nome: 'CALCULISTA JUDICIAL', setor: 'Judiciário', categoria: 'Cálculos', perfil_ideal: ARQUETIPOS.CALCULISTA_JUDICIAL },
  { id: '133', nome: 'SECRETÁRIO DE AUDIÊNCIA', setor: 'Judiciário', categoria: 'Apoio Audiência', perfil_ideal: ARQUETIPOS.PROCESSUALISTA_EXECUTOR },
  { id: '137', nome: 'CHEFE DE NÚCLEO DE APOIO ÀS VARAS DO INTERIOR', setor: 'Judiciário', categoria: 'Apoio Remoto', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },
  { id: '138', nome: 'COORDENADOR DE PLANTÃO JUDICIÁRIO', setor: 'Judiciário', categoria: 'Gestão Plantão', perfil_ideal: ARQUETIPOS.GESTOR_OPERACIONAL_JUDICIARIO },

  // --- CONCILIAÇÃO ---
  { id: '48', nome: 'DIRETOR DO NUPEMEC', setor: 'Conciliação', categoria: 'Gestão Conciliação', perfil_ideal: ARQUETIPOS.MEDIADOR_CONCILIADOR },
  { id: '49', nome: 'COORDENADORIA DE APOIO AO NUPEMEC (COONUPEMEC)', setor: 'Conciliação', categoria: 'Apoio Conciliação', perfil_ideal: ARQUETIPOS.MEDIADOR_CONCILIADOR },
  { id: '50', nome: 'DIVISÃO DE APOIO AO CEJUSC', setor: 'Conciliação', categoria: 'Conciliação', perfil_ideal: ARQUETIPOS.MEDIADOR_CONCILIADOR },

  // --- GESTÃO DE PESSOAS E SAÚDE ---
  { id: '51', nome: 'SECRETARIA DE GESTÃO DE PESSOAS (SGPES)', setor: 'Gestão de Pessoas', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '52', nome: 'COORDENADORIA DE GESTÃO DO DESENVOLVIMENTO DE PESSOAS (CODEP)', setor: 'Gestão de Pessoas', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '53', nome: 'SEÇÃO DE GESTÃO DE PRÁTICAS PARA DESENVOLVER PESSOAS', setor: 'Gestão de Pessoas', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '54', nome: 'COORDENADORIA DE GESTÃO DAS INFORMAÇÕES FUNCIONAIS (COGINF)', setor: 'Gestão de Pessoas', categoria: 'Dados Funcionais', perfil_ideal: ARQUETIPOS.GESTOR_ADMINISTRATIVO_RH },
  { id: '55', nome: 'DIVISÃO DE LEGISLAÇÃO DE PESSOAL (DILEP)', setor: 'Gestão de Pessoas', categoria: 'Legislação', perfil_ideal: ARQUETIPOS.JURISTA_ANALITICO_SENIOR },
  { id: '56', nome: 'CHEFE DA SESERV (SEÇÃO DE SERVIDORES ATIVOS)', setor: 'Gestão de Pessoas', categoria: 'Adm Pessoal', perfil_ideal: ARQUETIPOS.GESTOR_ADMINISTRATIVO_RH },
  { id: '57', nome: 'SEÇÃO DE MAGISTRADOS (SEMAG)', setor: 'Gestão de Pessoas', categoria: 'Magistratura', perfil_ideal: ARQUETIPOS.GESTOR_ADMINISTRATIVO_RH },
  { id: '58', nome: 'SEÇÃO DE BENEFÍCIOS E ESTÁGIO (SEBES)', setor: 'Gestão de Pessoas', categoria: 'Benefícios', perfil_ideal: ARQUETIPOS.CUIDADOR_SAUDE_ORGANIZACIONAL },
  { id: '59', nome: 'SEÇÃO DE APOSENTADOS E PENSIONISTAS (SEAPP)', setor: 'Gestão de Pessoas', categoria: 'Inativos', perfil_ideal: ARQUETIPOS.CUIDADOR_SAUDE_ORGANIZACIONAL },
  { id: '60', nome: 'COORDENADORIA DE GESTÃO DE PAGAMENTO DE PESSOAL (COPAP)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '61', nome: 'CHEFE DA SEPAS (SEÇÃO DE PAGAMENTO A SERVIDORES)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '62', nome: 'SEÇÃO DE PAGAMENTO DE PESSOAL (SEPAPE)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '63', nome: 'SEÇÃO DE PAGAMENTO A MAGISTRADOS (SEPAM)', setor: 'Gestão de Pessoas', categoria: 'Pagamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '64', nome: 'SEÇÃO DE SUPORTE TÉCNICO À PREPARAÇÃO DA FOLHA (SETEC)', setor: 'Gestão de Pessoas', categoria: 'Folha', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '65', nome: 'COORDENADORIA DE SAÚDE (CODSAU)', setor: 'Saúde', categoria: 'Saúde', perfil_ideal: ARQUETIPOS.CUIDADOR_SAUDE_ORGANIZACIONAL },

  // --- ORÇAMENTO E FINANÇAS ---
  { id: '66', nome: 'SECRETARIA DE ORÇAMENTO E FINANÇAS (SOF)', setor: 'Financeiro', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '67', nome: 'COORDENADORIA DE GESTÃO FINANCEIRA (COGEFIN)', setor: 'Financeiro', categoria: 'Finanças', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '68', nome: 'SEÇÃO DE AUDITORIA CONTÁBIL, ORÇAMENTÁRIA E FINANCEIRA', setor: 'Financeiro', categoria: 'Auditoria Financeira', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },
  { id: '69', nome: 'DIVISÃO DE GESTÃO, EMPENHO E SISTEMAS ORÇAMENTÁRIOS (DIGEORC)', setor: 'Financeiro', categoria: 'Orçamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '70', nome: 'DIVISÃO DE ANÁLISE CONTÁBIL, TRIBUTÁRIA E APOIO (DIVACONT)', setor: 'Financeiro', categoria: 'Contabilidade', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '71', nome: 'SEÇÃO DE APOIO AO PLANEJAMENTO E CONTROLE DE EXECUÇÃO', setor: 'Financeiro', categoria: 'Orçamento', perfil_ideal: ARQUETIPOS.ANALISTA_ORCAMENTARIO_FINANCEIRO },
  { id: '72', nome: 'SEÇÃO DE ANÁLISE E CONFORMIDADE DE GESTÃO DE SUPRIMENTOS', setor: 'Financeiro', categoria: 'Conformidade', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },

  // --- CONTROLE INTERNO E AUDITORIA ---
  { id: '73', nome: 'SECRETARIA DE AUDITORIA (SECAUD)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },
  { id: '74', nome: 'SEÇÃO DE AUDITORIA DE CONTRATAÇÕES E PATRIMÔNIO', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },
  { id: '75', nome: 'SEÇÃO DE AUDITORIA DE GESTÃO DE PESSOAS (SEAGEP)', setor: 'Controle', categoria: 'Auditoria', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },

  // --- ADMINISTRATIVO, CONTRATOS E LOGÍSTICA ---
  { id: '76', nome: 'SECRETARIA DE ADMINISTRAÇÃO (SAD)', setor: 'Administrativo', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '77', nome: 'NÚCLEO DE CONFORMIDADE ADMINISTRATIVA (NUCONF)', setor: 'Administrativo', categoria: 'Conformidade', perfil_ideal: ARQUETIPOS.AUDITOR_CONFORMIDADE_RIGOROSO },
  { id: '78', nome: 'COORDENADORIA DE LICITAÇÃO E CONTRATOS (COLICON)', setor: 'Administrativo', categoria: 'Licitações', perfil_ideal: ARQUETIPOS.GESTOR_CONTRATOS_LICITACOES },
  { id: '79', nome: 'SEÇÃO DE LICITAÇÃO (SELIC)', setor: 'Administrativo', categoria: 'Licitação', perfil_ideal: ARQUETIPOS.GESTOR_CONTRATOS_LICITACOES },
  { id: '80', nome: 'SEÇÃO DE CONTRATOS (SECONTR)', setor: 'Administrativo', categoria: 'Gestão de Contratos', perfil_ideal: ARQUETIPOS.GESTOR_CONTRATOS_LICITACOES },
  { id: '81', nome: 'SEÇÃO DE COMPRAS (SECOMP)', setor: 'Administrativo', categoria: 'Compras', perfil_ideal: ARQUETIPOS.LOGISTICA_PATRIMONIAL },
  { id: '82', nome: 'COORDENADORIA DE MATERIAL E LOGÍSTICA (COLOG)', setor: 'Administrativo', categoria: 'Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_PATRIMONIAL },
  { id: '83', nome: 'SEÇÃO DE ALMOXARIFADO (SALMOX)', setor: 'Administrativo', categoria: 'Logística', perfil_ideal: ARQUETIPOS.LOGISTICA_PATRIMONIAL },
  { id: '84', nome: 'SEÇÃO DE PATRIMÔNIO (SEPAT)', setor: 'Administrativo', categoria: 'Patrimônio', perfil_ideal: ARQUETIPOS.LOGISTICA_PATRIMONIAL },
  { id: '85', nome: 'DIVISÃO DE PASSAGENS E DIÁRIAS (DIPADI)', setor: 'Administrativo', categoria: 'Viagens', perfil_ideal: ARQUETIPOS.ASSISTENTE_ADMINISTRATIVO_ROTINA },
  { id: '86', nome: 'SEÇÃO DE TRANSPORTE (SETRANS)', setor: 'Administrativo', categoria: 'Transporte', perfil_ideal: ARQUETIPOS.LOGISTICA_PATRIMONIAL },
  { id: '87', nome: 'COORDENADORIA DE MANUTENÇÃO E PROJETOS (COMANP)', setor: 'Infraestrutura', categoria: 'Manutenção', perfil_ideal: ARQUETIPOS.ENGENHEIRO_MANUTENCAO_PREDIAL },
  { id: '88', nome: 'NUCLEO DE ENGENHARIA, ARQUITETURA E MANUTENÇÃO DE BENS', setor: 'Infraestrutura', categoria: 'Engenharia', perfil_ideal: ARQUETIPOS.ENGENHEIRO_MANUTENCAO_PREDIAL },
  { id: '89', nome: 'SEÇÃO DE ENGENHARIA (SEENG)', setor: 'Infraestrutura', categoria: 'Engenharia', perfil_ideal: ARQUETIPOS.ENGENHEIRO_MANUTENCAO_PREDIAL },
  { id: '90', nome: 'SEÇÃO DE ARQUITETURA (SEARQ)', setor: 'Infraestrutura', categoria: 'Arquitetura', perfil_ideal: ARQUETIPOS.INOVADOR_TECNOLOGICO },
  { id: '91', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS (SEMANBE)', setor: 'Infraestrutura', categoria: 'Manutenção', perfil_ideal: ARQUETIPOS.ENGENHEIRO_MANUTENCAO_PREDIAL },
  { id: '92', nome: 'SEÇÃO DE GESTÃO DOCUMENTAL (SEGDOC)', setor: 'Administrativo', categoria: 'Arquivo', perfil_ideal: ARQUETIPOS.ASSISTENTE_ADMINISTRATIVO_ROTINA },
  { id: '93', nome: 'CHEFE DA SEARP (SEÇÃO DE ARQUIVO PERMANENTE)', setor: 'Administrativo', categoria: 'Gestão Documental', perfil_ideal: ARQUETIPOS.CURADOR_MEMORIA_BIBLIOTECA },
  { id: '94', nome: 'SEÇÃO DE DOCUMENTAÇÃO (SEDOC)', setor: 'Administrativo', categoria: 'Documentação', perfil_ideal: ARQUETIPOS.ASSISTENTE_ADMINISTRATIVO_ROTINA },

  // --- SEGURANÇA INSTITUCIONAL ---
  { id: '95', nome: 'COORDENADORIA DE POLÍCIA JUDICIAL (COOPJUD)', setor: 'Segurança', categoria: 'Segurança Institucional', perfil_ideal: ARQUETIPOS.GESTOR_SEGURANCA_ESTRATEGICA },
  { id: '96', nome: 'SEÇÃO DE INTELIGÊNCIA POLICIAL (SEINP)', setor: 'Segurança', categoria: 'Inteligência', perfil_ideal: ARQUETIPOS.ANALISTA_INTELIGENCIA_SEGURANCA },
  { id: '97', nome: 'SEÇÃO DE GESTÃO DE RISCO DE SEGURANÇA (SEGERPJ)', setor: 'Segurança', categoria: 'Riscos', perfil_ideal: ARQUETIPOS.ANALISTA_INTELIGENCIA_SEGURANCA },
  { id: '98', nome: 'SEÇÃO DE OPERAÇÕES DE SEGURANÇA DE POLÍCIA JUDICIAL', setor: 'Segurança', categoria: 'Operações', perfil_ideal: ARQUETIPOS.AGENTE_OPERACIONAL_OSTENSIVO },
  { id: '99', nome: 'SEÇÃO DE SEGURANÇA DE POLÍCIA JUDICIAL (SESEPJ)', setor: 'Segurança', categoria: 'Polícia Judicial', perfil_ideal: ARQUETIPOS.AGENTE_OPERACIONAL_OSTENSIVO },
  { id: '100', nome: 'SEÇÃO DE MONITORAMENTO DE SEGURANÇA (SEMOSE)', setor: 'Segurança', categoria: 'Monitoramento', perfil_ideal: ARQUETIPOS.AGENTE_OPERACIONAL_OSTENSIVO },
  { id: '134', nome: 'AGENTE DE SEGURANÇA - TRANSPORTE', setor: 'Administrativo', categoria: 'Transporte Executivo', perfil_ideal: ARQUETIPOS.AGENTE_OPERACIONAL_OSTENSIVO },

  // --- TECNOLOGIA DA INFORMAÇÃO ---
  { id: '101', nome: 'SECRETARIA DE TECNOLOGIA DA INFORMAÇÃO (SETIC)', setor: 'TIC', categoria: 'Secretaria', perfil_ideal: ARQUETIPOS.ESTRATEGISTA_INSTITUCIONAL },
  { id: '102', nome: 'DIVISÃO DE INICIATIVAS NACIONAIS E GOVERNANÇA DE TIC', setor: 'TIC', categoria: 'Governança TI', perfil_ideal: ARQUETIPOS.CONSELHEIRO_GOVERNANCA },
  { id: '103', nome: 'SEÇÃO DE GESTÃO DE CONTRATOS DE TIC', setor: 'TIC', categoria: 'Contratos TI', perfil_ideal: ARQUETIPOS.GESTOR_PROJETOS_TIC },
  { id: '104', nome: 'DIRETOR DO LIODS (LABORATÓRIO DE INOVAÇÃO)', setor: 'Estratégia', categoria: 'Inovação', perfil_ideal: ARQUETIPOS.INOVADOR_TECNOLOGICO },
  { id: '105', nome: 'DIVISÃO DE SISTEMA DE INFORMAÇÃO (DIVINF)', setor: 'TIC', categoria: 'Sistemas', perfil_ideal: ARQUETIPOS.ENGENHEIRO_SOFTWARE },
  { id: '106', nome: 'SEÇÃO DE DESENVOLVIMENTO DE SISTEMAS (SEDES)', setor: 'TIC', categoria: 'Desenvolvimento', perfil_ideal: ARQUETIPOS.ENGENHEIRO_SOFTWARE },
  { id: '107', nome: 'SEÇÃO DE IMPLANTAÇÃO E MANUTENÇÃO DE SISTEMAS (SEIMSIS)', setor: 'TIC', categoria: 'Sistemas', perfil_ideal: ARQUETIPOS.ENGENHEIRO_SOFTWARE },
  { id: '108', nome: 'SEÇÃO TÉCNICA DO PJE (SETPJE)', setor: 'TIC', categoria: 'PJe', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },
  { id: '109', nome: 'COORDENADORIA DE OPERAÇÃO E SUPORTE (COOPS)', setor: 'TIC', categoria: 'Infraestrutura', perfil_ideal: ARQUETIPOS.ARQUITETO_INFRAESTRUTURA_TI },
  { id: '110', nome: 'DIVISÃO DE SEGURANÇA DA INFORMAÇÃO (DISEGINF)', setor: 'TIC', categoria: 'Segurança Info', perfil_ideal: ARQUETIPOS.ARQUITETO_INFRAESTRUTURA_TI },
  { id: '111', nome: 'SEÇÃO DE ARQUITETURA E MONITORAMENTO DE SERVIÇOS', setor: 'TIC', categoria: 'Arquitetura TI', perfil_ideal: ARQUETIPOS.ARQUITETO_INFRAESTRUTURA_TI },
  { id: '112', nome: 'SEÇÃO DE COMUNICAÇÃO DE DADOS (SECOMDA)', setor: 'TIC', categoria: 'Redes', perfil_ideal: ARQUETIPOS.ARQUITETO_INFRAESTRUTURA_TI },
  { id: '113', nome: 'SEÇÃO DE MANUTENÇÃO DE BENS DE TIC (SEMANTIC)', setor: 'TIC', categoria: 'Manutenção TI', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },
  { id: '114', nome: 'NÚCLEO DE ATENDIMENTO A CLIENTES DE TIC (NUATEN)', setor: 'TIC', categoria: 'Atendimento', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },
  { id: '115', nome: 'SEÇÃO DE SUPORTE DE TIC DE 1° GRAU (SESUP1)', setor: 'TIC', categoria: 'Suporte', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },
  { id: '116', nome: 'SEÇÃO DE SUPORTE DE TIC DE 2° GRAU (SESUP2)', setor: 'TIC', categoria: 'Suporte', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },
  { id: '135', nome: 'GESTOR DE PROJETOS DE TIC', setor: 'TIC', categoria: 'Gestão Projetos', perfil_ideal: ARQUETIPOS.GESTOR_PROJETOS_TIC },
  { id: '136', nome: 'ANALISTA DE SUPORTE AO PJE (2º GRAU)', setor: 'TIC', categoria: 'Suporte', perfil_ideal: ARQUETIPOS.SUPORTE_TECNICO_EMPATICO },

  // --- EDUCAÇÃO E MEMÓRIA ---
  { id: '117', nome: 'SECRETARIA DA ESCOLA JUDICIAL (SECEJUD)', setor: 'Educação', categoria: 'Escola Judicial', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '118', nome: 'NÚCLEO DE FORMAÇÃO E CAPACITAÇÃO DE MAGISTRADOS (NUCAM)', setor: 'Educação', categoria: 'Escola Judicial', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '119', nome: 'NÚCLEO DE FORMAÇÃO E CAPACITAÇÃO DE SERVIDORES (NUCAS)', setor: 'Educação', categoria: 'Capacitação', perfil_ideal: ARQUETIPOS.DESENVOLVEDOR_TALENTOS },
  { id: '120', nome: 'SEÇÃO DE ENSINO À DISTÂNCIA (SEEAD)', setor: 'Educação', categoria: 'EAD', perfil_ideal: ARQUETIPOS.INOVADOR_TECNOLOGICO },
  { id: '121', nome: 'COORDENADORIA DO CENTRO DE MEMÓRIA (COGEM)', setor: 'Cultura', categoria: 'Memória', perfil_ideal: ARQUETIPOS.CURADOR_MEMORIA_BIBLIOTECA },
  { id: '122', nome: 'SEÇÃO DE BIBLIOTECA (SEBIB)', setor: 'Cultura', categoria: 'Biblioteca', perfil_ideal: ARQUETIPOS.CURADOR_MEMORIA_BIBLIOTECA },

  // --- COMUNICAÇÃO ---
  { id: '123', nome: 'COORDENADORIA DE COMUNICAÇÃO SOCIAL (COORDCOM)', setor: 'Comunicação', categoria: 'Comunicação', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL },
  { id: '124', nome: 'CHEFE DA SEMARK (SEÇÃO DE MARKETING E PUBLICIDADE)', setor: 'Comunicação', categoria: 'Marketing', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL },
  { id: '125', nome: 'SEÇÃO DE DIVULGAÇÃO E COMUNICAÇÃO (SEDIV)', setor: 'Comunicação', categoria: 'Comunicação', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL },
  { id: '126', nome: 'SEÇÃO DE IMPRENSA E RELAÇÕES PÚBLICAS (SEIRP)', setor: 'Comunicação', categoria: 'Imprensa', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL },
  { id: '127', nome: 'COORDENADORIA DE CERIMONIAL (COCEV)', setor: 'Comunicação', categoria: 'Cerimonial', perfil_ideal: ARQUETIPOS.CERIMONIALISTA_PROTOCOLAR },
  { id: '128', nome: 'DIVISÃO DA OUVIDORIA (DIVIOUV)', setor: 'Comunicação', categoria: 'Ouvidoria', perfil_ideal: ARQUETIPOS.COMUNICADOR_INSTITUCIONAL }
];

// --- RENDERIZADOR DE MARKDOWN LIMPO E ROBUSTO ---
const RobustMarkdown = ({ text }) => {
  if (!text) return null;

  // Função auxiliar para renderizar negrito e itálico inline
  const renderInline = (str) => {
    // Primeiro separa por negrito **texto**
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-purple-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-3 text-slate-700 leading-relaxed font-sans text-sm">
      {text.split('\n').map((line, index) => {
        const cleanLine = line.trim();
        if (!cleanLine) return null;

        // Linha Horizontal (---)
        if (cleanLine.match(/^---+$/)) {
           return <hr key={index} className="border-t border-purple-100 my-4" />;
        }

        // Títulos (###)
        if (cleanLine.startsWith('###')) {
          return (
            <h3 key={index} className="text-lg font-bold text-purple-900 mt-6 mb-2 flex items-center gap-2">
              {cleanLine.replace(/^#+\s*/, '').replace(/\*\*/g, '')}
            </h3>
          );
        }
        
        // Listas (* ou -)
        if (cleanLine.match(/^[\*\-]\s/)) {
           return (
            <div key={index} className="flex gap-3 ml-2 mb-1">
              <span className="text-purple-500 font-bold mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 block"></span>
              <div className="flex-1 text-slate-700">
                {renderInline(cleanLine.replace(/^[\*\-]\s/, ''))}
              </div>
            </div>
           );
        }
        
        // Citações (>)
        if (cleanLine.startsWith('>')) {
             return (
                 <blockquote key={index} className="border-l-4 border-purple-300 pl-4 py-1 my-2 italic text-slate-600 bg-purple-50 rounded-r">
                     {renderInline(cleanLine.replace(/^>\s*/, ''))}
                 </blockquote>
             );
        }

        // Parágrafos Normais
        return <p key={index} className="mb-2 text-justify">{renderInline(cleanLine)}</p>;
      })}
    </div>
  );
};

// --- COMPONENTE DE LOADING SKELETON ---
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

export default function PeopleAnalyticsTRT11() {
  const [step, setStep] = useState(0); 
  const [testPhase, setTestPhase] = useState(1);
  const [answers, setAnswers] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [pdiResult, setPdiResult] = useState(null);
  const [pdiLoading, setPdiLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  const searchRef = useRef(null);
  const apiKey = ""; 
  const [draggedAdj, setDraggedAdj] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setLoading(true);
      setErrorMsg('');
      
      // Simulação de processamento de PDF
      setTimeout(() => {
        setLoading(false);
        const simulatedProfile = {
           abertura: Math.floor(Math.random() * (90 - 60) + 60),
           conscienciosidade: Math.floor(Math.random() * (95 - 70) + 70),
           extroversao: Math.floor(Math.random() * (85 - 40) + 40),
           amabilidade: Math.floor(Math.random() * (90 - 60) + 60),
           estabilidade: Math.floor(Math.random() * (90 - 50) + 50)
        };
        setUserProfile(simulatedProfile);
        setStep(2); 
        alert("Perfil extraído com sucesso do PDF (Simulação). Prossiga para a análise de aderência.");
      }, 2000);
    } else {
      setErrorMsg("Por favor, selecione um arquivo PDF válido.");
    }
  };

  // --- Função auxiliar para converter Markdown em HTML para o PDF ---
  const formatPDIForPDF = (rawText) => {
    if (!rawText) return '';
    
    let html = rawText
        // Sanitização básica
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        
        // Headers (### Title)
        .replace(/^### (.*$)/gim, '<h4 style="color: #4338ca; margin-top: 15px; margin-bottom: 8px; font-size: 14px; font-weight: bold;">$1</h4>')
        .replace(/^## (.*$)/gim, '<h3 style="color: #312e81; margin-top: 20px; margin-bottom: 10px; font-size: 16px; font-weight: bold;">$1</h3>')
        
        // Linha Horizontal (---)
        .replace(/^---+$/gim, '<hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;" />')
        
        // Listas (* Item ou - Item)
        .replace(/^[\*\-] (.*$)/gim, '<div style="margin-bottom: 4px; padding-left: 10px;">• <span style="margin-left: 5px;">$1</span></div>')
        
        // Citações (> Text) - nota: > foi escapado para &gt;
        .replace(/^&gt; (.*$)/gim, '<div style="border-left: 3px solid #c7d2fe; padding-left: 10px; margin: 10px 0; color: #555; font-style: italic;">$1</div>')
        
        // Negrito (**Text**)
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        
        // Quebras de linha
        .replace(/\n/g, '<br />');

    return html;
  };

  const generatePDF = async () => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
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
        
        // Formata o PDI usando a nova função robusta
        const formattedPDI = formatPDIForPDF(pdiResult);
        
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #312e81; font-size: 24px; margin: 0;">Relatório de Fit Comportamental</h1>
                <p style="color: #6b7280; margin: 5px 0;">TRT11 People Analytics</p>
            </div>
            
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <p style="margin: 5px 0;"><strong>Candidato para:</strong> ${selectedUnit.nome}</p>
                <p style="margin: 5px 0;"><strong>Categoria:</strong> ${selectedUnit.categoria}</p>
                <p style="margin: 5px 0;"><strong>Índice de Aderência:</strong> <span style="font-size: 16px; font-weight: bold; color: ${matchResult.score >= 75 ? '#16a34a' : '#ca8a04'}">${matchResult.score}%</span></p>
            </div>

            <h3 style="color: #312e81; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Análise de Gaps</h3>
            ${matchResult.details.map(d => `
                <div style="margin-bottom: 8px; color: #374151;">
                    <strong>${d.trait.toUpperCase()}:</strong> ${d.text}
                </div>
            `).join('')}

            ${pdiResult ? `
                <div style="page-break-before: always;"></div>
                <h3 style="color: #312e81; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Plano de Desenvolvimento Individual (PDI)</h3>
                <div style="color: #374151; line-height: 1.6;">
                    ${formattedPDI}
                </div>
            ` : ''}
            
            <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #eee; padding-top: 10px;">
                Gerado automaticamente por TRT11 People Analytics AI
            </div>
        `;

        document.body.appendChild(content);

        await doc.html(content, {
            callback: function (doc) {
                doc.save(`Relatorio_Fit_${selectedUnit.id}.pdf`);
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
  
  const calculateResults = () => {
    setLoading(true);
    setTimeout(() => {
      let scores = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };
      let counts = { abertura: 0, conscienciosidade: 0, extroversao: 0, amabilidade: 0, estabilidade: 0 };

      BIG_FIVE_ADJECTIVES.forEach(adj => {
        let val = answers[adj.id];
        if (val === undefined) val = 3; 
        const adjustedVal = adj.key === 1 ? val : (6 - val);
        scores[adj.trait] += adjustedVal;
        counts[adj.trait] += 1;
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

  const generatePDI = async () => {
    setPdiLoading(true);
    const prompt = `
      Atue como um **Psicólogo Organizacional Sênior e Coach Executivo**.
      
      Crie um **Plano de Desenvolvimento Individual (PDI)** de alto impacto para um servidor do Tribunal Regional do Trabalho (TRT11).
      
      **CONTEXTO:**
      - **Posto:** ${selectedUnit.nome}
      - **Categoria:** ${selectedUnit.categoria}
      
      **PERFIL (Ideal vs Real):**
      - Ideal: ${JSON.stringify(selectedUnit.perfil_ideal)}
      - Real: ${JSON.stringify(userProfile)}
      
      **GAPS:**
      ${JSON.stringify(matchResult.details)}
      
      ---
      
      **ESTRUTURA DE SAÍDA (MARKDOWN LIMPO):**
      
      ### 1. Diagnóstico Executivo 🧠
      Análise breve e empática.
      
      ### 2. Plano de Ação: Domínio Comportamental 🚀
      Para cada gap, use uma lista com marcadores:
      * **Traço:** [Nome]
      * **Desafio:** Impacto prático.
      * **Estratégia Micro:** Ação imediata.
      * **Estratégia Macro:** Mudança de hábito.
      
      ### 3. Curadoria de Conhecimento 📚
      Sugestões de livros/artigos.
      
      ### 4. Compromisso 🎯
      Frase motivadora final.
      
      **REGRAS DE FORMATAÇÃO RIGOROSAS:**
      - Use APENAS a sintaxe Markdown padrão.
      - NÃO use tabelas complexas (evite o uso de barras verticais | para formatação).
      - Para listas, use * ou - seguido de espaço.
      - Use **negrito** para destaque, evite outros caracteres especiais.
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
  };

  const itemsToDisplay = testPhase === 1 
    ? BIG_FIVE_ADJECTIVES 
    : BIG_FIVE_ADJECTIVES.filter(adj => answers[adj.id] !== 5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
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
            <span>AI Powered v3.4</span>
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
                            Este perfil ideal foi calculado com base nas atividades padrão para {previewUnit.categoria} e {previewUnit.setor}.
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
                className="bg-indigo-900 text-white hover:bg-indigo-800 px-8 py-4 rounded-xl flex items-center gap-3 transition-all shadow-xl font-bold text-lg hover:scale-105 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pdfLoading}
              >
                {pdfLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Printer className="w-6 h-6" />}
                {pdfLoading ? 'Gerando PDF...' : 'Baixar Relatório Completo (PDF)'}
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
