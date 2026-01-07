import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
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
  Info,
  Sparkles,
  Loader2,
  Target,
  Brain,
  PieChart
} from 'lucide-react';

// --- DATABASE: UNIDADES E POSTOS DE TRABALHO (BASE COMPLETA TRT11 - NORMALIZADA 100%) ---
const unidadesTRT11 = [
  // --- ALTA ADMINISTRAÇÃO ---
  { 
    id: 'presidencia', 
    nome: 'PRESIDÊNCIA', 
    setor: 'Alta Administração', 
    categoria: 'Presidência e Direção',
    predominante: 'executor',
    descricao: 'Planejar, coordenar, dirigir e controlar atividades que atendam ao Presidente.',
    perfil_ideal: { executor: 40, comunicador: 30, planejador: 15, analista: 15 }, 
    competencias: ['Visão Estratégica', 'Liderança', 'Articulação Política'] 
  },
  {
    id: 'dg',
    nome: 'DIRETORIA-GERAL (DG)',
    setor: 'Alta Administração',
    categoria: 'Presidência e Direção',
    predominante: 'executor',
    descricao: 'Suporte executivo à Presidência e gestão administrativa macro.',
    perfil_ideal: { executor: 35, comunicador: 25, planejador: 25, analista: 15 },
    competencias: ['Gestão Executiva', 'Tomada de Decisão', 'Visão Sistêmica']
  },
  { 
    id: 'gab', 
    nome: 'ASSESSOR-CHEFE DE GABINETE (GAB)', 
    setor: 'Alta Administração', 
    categoria: 'Presidência e Direção',
    predominante: 'analista',
    descricao: 'Assessoria jurídica/administrativa, pesquisa e elaboração de minutas.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 }, 
    competencias: ['Assessoria Jurídica', 'Redação', 'Análise Processual'] 
  },
  {
    id: 'assord',
    nome: 'ASSESSORIA DE ORDENANÇA (ASSORD)',
    setor: 'Alta Administração',
    categoria: 'Presidência e Direção',
    predominante: 'planejador',
    descricao: 'Organização de agenda e logística de autoridades.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 40, analista: 15 },
    competencias: ['Organização', 'Protocolo', 'Discrição']
  },
  {
    id: 'secjad',
    nome: 'SECRETARIA DE ASSESSORAMENTO JURÍDICO-ADMINISTRATIVO (SECJAD)',
    setor: 'Alta Administração',
    categoria: 'Presidência e Direção',
    predominante: 'analista',
    descricao: 'Pareceres jurídicos e suporte legal à administração.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 30, analista: 50 },
    competencias: ['Direito Administrativo', 'Pareceres', 'Legislação']
  },
  {
    id: 'sgp_pres',
    nome: 'SECRETARIA-GERAL DA PRESIDÊNCIA (SGP)',
    setor: 'Alta Administração',
    categoria: 'Presidência e Direção',
    predominante: 'executor',
    descricao: 'Coordenação estratégica dos fluxos da Presidência.',
    perfil_ideal: { executor: 40, comunicador: 20, planejador: 25, analista: 15 },
    competencias: ['Gestão de Fluxos', 'Liderança', 'Visão Institucional']
  },
  {
    id: 'divvp',
    nome: 'DIVISÃO DE APOIO À VICE-PRESIDÊNCIA (DIVVP)',
    setor: 'Alta Administração',
    categoria: 'Presidência e Direção',
    predominante: 'analista',
    descricao: 'Suporte à admissibilidade de recursos e gestão do gabinete da VP.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Análise Recursal', 'Organização', 'Direito Processual']
  },
  {
    id: 'gab_dg',
    nome: 'GABINETE DA DIRETORIA-GERAL',
    setor: 'Alta Administração', 
    categoria: 'Presidência e Direção',
    predominante: 'executor',
    descricao: 'Assessoria direta ao Diretor-Geral e fluxo de processos.',
    perfil_ideal: { executor: 35, comunicador: 25, planejador: 25, analista: 15 },
    competencias: ['Organização', 'Discrição', 'Agilidade']
  },

  // --- CORREGEDORIA ---
  {
    id: 'scr',
    nome: 'SECRETARIA DA CORREGEDORIA REGIONAL (SCR)',
    setor: 'Corregedoria',
    categoria: 'Corregedoria',
    predominante: 'analista',
    descricao: 'Fiscalização e orientação das unidades judiciárias.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 20, analista: 45 },
    competencias: ['Fiscalização', 'Normatização', 'Rigor Técnico']
  },
  {
    id: 'cooascr',
    nome: 'COORDENADORIA DE APOIO À SECRETARIA DA CORREGEDORIA (COOASCR)',
    setor: 'Corregedoria',
    categoria: 'Corregedoria',
    predominante: 'planejador',
    descricao: 'Apoio logístico às correições e atividades da Corregedoria.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Organização', 'Logística', 'Apoio Administrativo']
  },
  {
    id: 'gabcorregi',
    nome: 'GABINETE DE APOIO À CORREGEDORIA (GABCORREGI)',
    setor: 'Corregedoria',
    categoria: 'Corregedoria',
    predominante: 'analista',
    descricao: 'Assessoria direta ao Corregedor e análise de expedientes.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Assessoria Jurídica', 'Análise', 'Redação']
  },
  {
    id: 'coojucor',
    nome: 'COORDENADORIA JURÍDICA DA CORREGEDORIA (COOJUCOR)',
    setor: 'Corregedoria',
    categoria: 'Corregedoria',
    predominante: 'analista',
    descricao: 'Análise jurídica de processos disciplinares e administrativos.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Direito Disciplinar', 'Pareceres', 'Investigação']
  },

  // --- JUDICIÁRIO ---
  { 
    id: 'sgj', 
    nome: 'SECRETARIA GERAL JUDICIÁRIA (SGJ)', 
    setor: 'Judiciário', 
    categoria: 'Unidades Judiciárias', 
    predominante: 'executor',
    descricao: 'Coordenação macro dos serviços judiciários e estatística.',
    perfil_ideal: { executor: 40, comunicador: 20, planejador: 25, analista: 15 },
    competencias: ['Gestão Judiciária', 'Estatística', 'Liderança'] 
  },
  {
    id: 'gabsgj',
    nome: 'GABINETE DE APOIO À SECRETARIA-GERAL JUDICIÁRIA (GABSGJ)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'planejador',
    descricao: 'Suporte administrativo e operacional à SGJ.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Organização', 'Fluxo Administrativo', 'Apoio']
  },
  {
    id: 'stpse',
    nome: 'SECRETARIA DO TRIBUNAL PLENO E SEÇÕES ESPECIALIZADAS (STPSE)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'planejador',
    descricao: 'Organização de pautas do Pleno e secretariado de sessões.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Organização de Sessões', 'Ata', 'Prazos']
  },
  {
    id: 'coat',
    nome: 'COORDENADORIA DE APOIO À TURMA (COAT1, COAT2, COAT3)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'planejador',
    descricao: 'Secretariado das sessões das Turmas Recursais.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 45, analista: 20 },
    competencias: ['Gestão de Pauta', 'Suporte a Sessões', 'Processos']
  },
  {
    id: 'sejuris',
    nome: 'SEÇÃO DE JURISPRUDÊNCIA (SEJURIS) / CHEFE',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Pesquisa e catalogação da jurisprudência do Tribunal.',
    perfil_ideal: { executor: 10, comunicador: 15, planejador: 25, analista: 50 },
    competencias: ['Pesquisa Jurídica', 'Catalogação', 'Análise']
  },
  {
    id: 'cipac',
    nome: 'CENTRO DE INTELIGÊNCIA - PRECEDENTES E AÇÕES COLETIVAS (CIPAC)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Gerenciamento de precedentes qualificados e ações coletivas.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Gestão de Precedentes', 'Análise de Dados', 'Direito Coletivo']
  },
  {
    id: 'diconjud',
    nome: 'DIVISÃO DE CONTADORIA JURÍDICA (DICONJUD)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Realização e conferência de cálculos judiciais trabalhistas.',
    perfil_ideal: { executor: 5, comunicador: 5, planejador: 20, analista: 70 },
    competencias: ['Cálculo Trabalhista', 'Matemática Financeira', 'PJe-Calc']
  },
  {
    id: 'divdif',
    nome: 'DIVISÃO DE DISTRIBUIÇÃO DOS FEITOS (DIVDIF)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Distribuição processual e triagem de ações.',
    perfil_ideal: { executor: 45, comunicador: 15, planejador: 25, analista: 15 },
    competencias: ['Agilidade', 'Atenção', 'Sistemas Processuais']
  },
  {
    id: 'secvt',
    nome: 'SECRETARIA DE VARA DO TRABALHO / DIRETOR',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'planejador',
    descricao: 'Gestão da secretaria da Vara, atendimento e cumprimento de prazos.',
    perfil_ideal: { executor: 25, comunicador: 20, planejador: 35, analista: 20 },
    competencias: ['Gestão de Vara', 'Atendimento', 'PJe']
  },
  {
    id: 'secefac',
    nome: 'SECRETARIA DE EXECUÇÃO DA FAZENDA PÚBLICA (SECEFAP)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Gestão de filas de precatórios e RPVs.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Precatórios', 'Direito Público', 'Organização']
  },
  {
    id: 'decon',
    nome: 'DIVISÃO DE EXECUÇÃO CONCENTRADA (DECON)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Reunião de execuções contra grandes devedores.',
    perfil_ideal: { executor: 40, comunicador: 20, planejador: 20, analista: 20 },
    competencias: ['Execução Trabalhista', 'Negociação', 'Organização']
  },
  {
    id: 'dipep',
    nome: 'DIVISÃO DE PESQUISA PATRIMONIAL (DIPEP)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Investigação patrimonial avançada (SIMBA, CCS, REI).',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 20, analista: 50 },
    competencias: ['Investigação', 'Análise de Dados', 'Quebra de Sigilo']
  },
  {
    id: 'dicoop',
    nome: 'DIVISÃO DE COOPERAÇÃO JUDICIÁRIA (DICOOP)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'comunicador',
    descricao: 'Atos de cooperação entre juízos e cartas precatórias.',
    perfil_ideal: { executor: 20, comunicador: 40, planejador: 25, analista: 15 },
    competencias: ['Cooperação', 'Comunicação', 'Processo Civil']
  },
  {
    id: 'sehasp',
    nome: 'SEÇÃO DE HASTA PÚBLICA (SEHASP) / CHEFE',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Organização e realização de leilões judiciais.',
    perfil_ideal: { executor: 35, comunicador: 30, planejador: 20, analista: 15 },
    competencias: ['Leilões', 'Organização de Eventos', 'Procedimentos Legais']
  },
  {
    id: 'semajud',
    nome: 'SEÇÃO DE MANDADOS JUDICIAIS (SEMAJUD)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Coordenação e cumprimento de mandados por Oficiais de Justiça.',
    perfil_ideal: { executor: 40, comunicador: 20, planejador: 20, analista: 20 },
    competencias: ['Diligências', 'Gestão de Oficiais', 'Logística']
  },
  {
    id: 'divamftbv',
    nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTBV E MANDADOS (DIVAMFTBV)',
    setor: 'Administrativo',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Gestão administrativa do Fórum de Boa Vista e mandados locais.',
    perfil_ideal: { executor: 35, comunicador: 20, planejador: 25, analista: 20 },
    competencias: ['Administração Predial', 'Gestão de Mandados', 'Liderança']
  },
  {
    id: 'divaftm',
    nome: 'DIVISÃO DE ADMINISTRAÇÃO DO FTM (DIVAFTM)',
    setor: 'Administrativo',
    categoria: 'Unidades Judiciárias',
    predominante: 'executor',
    descricao: 'Administração predial do Fórum Trabalhista de Manaus.',
    perfil_ideal: { executor: 35, comunicador: 20, planejador: 30, analista: 15 },
    competencias: ['Logística Predial', 'Atendimento', 'Manutenção']
  },
  {
    id: 'divacont',
    nome: 'DIVISÃO DE ANÁLISE CONTÁBIL E TRIBUTÁRIA 1° GRAU (DIVACONT)',
    setor: 'Judiciário',
    categoria: 'Unidades Judiciárias',
    predominante: 'analista',
    descricao: 'Suporte contábil e tributário às Varas do Trabalho.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Contabilidade', 'Tributário', 'Cálculos']
  },
  
  // --- CONCILIAÇÃO E MEDIAÇÃO ---
  {
    id: 'nupemec',
    nome: 'COORD. NÚCLEO PERMANENTE MÉTODOS CONSENSUAIS (COONUPEMEC)',
    setor: 'Judiciário',
    categoria: 'Conciliação',
    predominante: 'comunicador',
    descricao: 'Gestão da política de métodos consensuais de solução de disputas.',
    perfil_ideal: { executor: 15, comunicador: 45, planejador: 25, analista: 15 },
    competencias: ['Política de Conciliação', 'Gestão de Conflitos', 'Comunicação']
  },
  {
    id: 'div_cejusc',
    nome: 'DIVISÃO DE APOIO AO CEJUSC',
    setor: 'Judiciário',
    categoria: 'Conciliação',
    predominante: 'comunicador',
    descricao: 'Apoio operacional às audiências de conciliação do CEJUSC.',
    perfil_ideal: { executor: 20, comunicador: 40, planejador: 25, analista: 15 },
    competencias: ['Atendimento', 'Mediação', 'Organização de Pautas']
  },

  // --- GESTÃO DE PESSOAS (SGP/SGPES) ---
  { 
    id: 'sgpes', 
    nome: 'SECRETARIA DE GESTÃO DE PESSOAS (SGPES) / CHEFE', 
    setor: 'SGP', 
    categoria: 'Gestão de Pessoas', 
    predominante: 'planejador',
    descricao: 'Gestão macro de RH, servidores e magistrados.',
    perfil_ideal: { executor: 25, comunicador: 25, planejador: 35, analista: 15 },
    competencias: ['Gestão de RH', 'Liderança', 'Estratégia de Pessoas'] 
  },
  {
    id: 'gabsgpes',
    nome: 'GABINETE DE APOIO À SGPES (GABSGPES)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'planejador',
    descricao: 'Suporte administrativo à Secretaria de Gestão de Pessoas.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Apoio Administrativo', 'Organização', 'Comunicação Interna']
  },
  {
    id: 'gabsgp',
    nome: 'GABINETE DE APOIO À SGP (GABSGP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'planejador',
    descricao: 'Apoio administrativo específico à SGP.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Apoio', 'Organização', 'Secretariado']
  },
  { 
    id: 'assegesp', 
    nome: 'ASSESSORIA DE GOVERNANÇA DE PESSOAS (ASSEGESP)', 
    setor: 'SGP', 
    categoria: 'Gestão de Pessoas', 
    predominante: 'planejador',
    descricao: 'Governança, indicadores e estratégia de RH.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 40, analista: 30 },
    competencias: ['Governança', 'Indicadores', 'BPM'] 
  },
  {
    id: 'codsau',
    nome: 'COORDENADORIA DE SAÚDE (CODSAU)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'comunicador',
    descricao: 'Saúde ocupacional, perícias e bem-estar.',
    perfil_ideal: { executor: 15, comunicador: 40, planejador: 30, analista: 15 },
    competencias: ['Saúde', 'Acolhimento', 'Perícia']
  },
  {
    id: 'coginf',
    nome: 'COORDENADORIA DE GESTÃO DAS INFORMAÇÕES FUNCIONAIS (COGINF)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Gestão de registros funcionais e dados cadastrais.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Registro Funcional', 'Dados', 'Organização']
  },
  {
    id: 'copap',
    nome: 'COORDENADORIA DE GESTÃO DE PAGAMENTO DE PESSOAL (COPAP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Coordenação da folha de pagamento e cálculos.',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 25, analista: 45 },
    competencias: ['Folha de Pagamento', 'Cálculos', 'Conformidade']
  },
  {
    id: 'codep',
    nome: 'COORDENADORIA DE GESTÃO DO DESENVOLVIMENTO (CODEP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'comunicador',
    descricao: 'Treinamento, desenvolvimento e clima organizacional.',
    perfil_ideal: { executor: 20, comunicador: 45, planejador: 25, analista: 10 },
    competencias: ['T&D', 'Clima Organizacional', 'Educação Corporativa']
  },
  {
    id: 'dilep',
    nome: 'DIVISÃO DE LEGISLAÇÃO DE PESSOAL (DILEP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Pareceres sobre direitos e deveres de pessoal.',
    perfil_ideal: { executor: 10, comunicador: 15, planejador: 20, analista: 55 },
    competencias: ['Legislação RH', 'Pareceres', 'Normas']
  },
  {
    id: 'semag',
    nome: 'SEÇÃO DE MAGISTRADOS (SEMAG)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Gestão dos registros e direitos dos magistrados.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 30, analista: 40 },
    competencias: ['Magistratura', 'Sigilo', 'Organização']
  },
  {
    id: 'sepam',
    nome: 'SEÇÃO DE PAGAMENTO A MAGISTRADOS (SEPAM)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Folha de pagamento exclusiva de magistrados.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Folha', 'Cálculos', 'Sigilo']
  },
  {
    id: 'sepas',
    nome: 'SEÇÃO DE PAGAMENTO A SERVIDORES (SEPAS) / CHEFE',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Folha de pagamento dos servidores ativos.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Folha', 'Cálculos', 'Atenção']
  },
  {
    id: 'sepape',
    nome: 'SEÇÃO DE PAGAMENTO DE PESSOAL (SEPAPE) - GERAL',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Processamento geral de folha e consignações.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Processamento', 'Financeiro', 'Rotinas']
  },
  {
    id: 'setec',
    nome: 'SEÇÃO DE SUPORTE TÉCNICO À FOLHA (SETEC)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Suporte técnico aos sistemas de folha e auditoria.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 20, analista: 50 },
    competencias: ['Sistemas RH', 'Auditoria de Folha', 'Lógica']
  },
  {
    id: 'seapp',
    nome: 'SEÇÃO DE APOSENTADOS E PENSIONISTAS (SEAPP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'planejador',
    descricao: 'Gestão de inativos e atendimento.',
    perfil_ideal: { executor: 10, comunicador: 30, planejador: 40, analista: 20 },
    competencias: ['Previdência', 'Atendimento', 'Empatia']
  },
  {
    id: 'sebes',
    nome: 'SEÇÃO DE BENEFÍCIOS E ESTÁGIO (SEBES)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'comunicador',
    descricao: 'Gestão de auxílios e programa de estágio.',
    perfil_ideal: { executor: 15, comunicador: 35, planejador: 30, analista: 20 },
    competencias: ['Benefícios', 'Gestão de Estagiários', 'Atendimento']
  },
  {
    id: 'sedep',
    nome: 'SEÇÃO DE GESTÃO DE PRÁTICAS PARA DESENVOLVER PESSOAS (SEDEP)',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'comunicador',
    descricao: 'Ações de qualidade de vida e engajamento.',
    perfil_ideal: { executor: 20, comunicador: 45, planejador: 20, analista: 15 },
    competencias: ['Inovação RH', 'Engajamento', 'Projetos']
  },
  {
    id: 'seserv',
    nome: 'SEÇÃO DE SERVIDORES ATIVOS (SESERV) / CHEFE',
    setor: 'SGP',
    categoria: 'Gestão de Pessoas',
    predominante: 'analista',
    descricao: 'Controle de frequência, férias e registros de ativos.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 30, analista: 35 },
    competencias: ['Controle', 'Legislação', 'Atendimento']
  },

  // --- ORÇAMENTO E FINANÇAS (SOF) ---
  {
    id: 'sof',
    nome: 'SECRETARIA DE ORÇAMENTO E FINANÇAS (SOF)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'analista',
    descricao: 'Gestão orçamentária e financeira do Tribunal.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 25, analista: 40 },
    competencias: ['Finanças Públicas', 'Orçamento', 'Gestão']
  },
  {
    id: 'gabsof',
    nome: 'GABINETE DE APOIO À SOF (GABSOF)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'planejador',
    descricao: 'Apoio administrativo à SOF.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Organização', 'Apoio', 'Controle']
  },
  {
    id: 'cogefin',
    nome: 'COORDENADORIA DE GESTÃO FINANCEIRA (COGEFIN)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'analista',
    descricao: 'Execução financeira e pagamentos.',
    perfil_ideal: { executor: 25, comunicador: 10, planejador: 25, analista: 40 },
    competencias: ['Execução Financeira', 'SIAFI', 'Conformidade']
  },
  {
    id: 'digeorc',
    nome: 'DIVISÃO DE GESTÃO SISTEMAS ORÇAMENTÁRIOS (DIGEORC)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'analista',
    descricao: 'Emissão de empenhos e gestão de sistemas.',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 25, analista: 45 },
    competencias: ['Empenho', 'Sistemas', 'Orçamento']
  },
  {
    id: 'secof',
    nome: 'SEÇÃO DE AUDITORIA CONTÁBIL E FINANCEIRA (SECOF)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'analista',
    descricao: 'Análise contábil e conformidade financeira.',
    perfil_ideal: { executor: 10, comunicador: 5, planejador: 25, analista: 60 },
    competencias: ['Contabilidade Pública', 'Auditoria', 'Rigor']
  },
  {
    id: 'sascont',
    nome: 'SEÇÃO DE ANÁLISE GESTÃO DE SUPRIMENTOS (SASCONT)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'analista',
    descricao: 'Prestação de contas de suprimento de fundos.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Prestação de Contas', 'Conformidade', 'Análise']
  },
  {
    id: 'saceo',
    nome: 'SEÇÃO DE APOIO AO PLANEJAMENTO ORÇAMENTÁRIO (SACEO)',
    setor: 'SOF',
    categoria: 'Orçamento e Finanças',
    predominante: 'planejador',
    descricao: 'Acompanhamento da execução orçamentária.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 40, analista: 30 },
    competencias: ['Planejamento', 'Controle', 'Relatórios']
  },

  // --- ADMINISTRAÇÃO (SAD) ---
  {
    id: 'sad',
    nome: 'SECRETARIA DE ADMINISTRAÇÃO (SAD)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Gestão administrativa geral, logística e compras.',
    perfil_ideal: { executor: 35, comunicador: 25, planejador: 25, analista: 15 },
    competencias: ['Gestão Administrativa', 'Logística', 'Coordenação']
  },
  {
    id: 'gabsad',
    nome: 'GABINETE DE APOIO À SAD (GABSAD) / CHEFE',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Suporte à Secretaria de Administração.',
    perfil_ideal: { executor: 30, comunicador: 25, planejador: 25, analista: 20 },
    competencias: ['Apoio Administrativo', 'Agilidade', 'Organização']
  },
  {
    id: 'colog',
    nome: 'COORDENADORIA DE MATERIAL E LOGÍSTICA (COLOG)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Coordenação de aquisições e estoque.',
    perfil_ideal: { executor: 35, comunicador: 20, planejador: 30, analista: 15 },
    competencias: ['Logística', 'Cadeia de Suprimentos', 'Planejamento']
  },
  {
    id: 'colicon',
    nome: 'COORDENADORIA DE LICITAÇÃO E CONTRATOS (COLICON)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'analista',
    descricao: 'Gestão dos processos licitatórios e contratos.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 25, analista: 40 },
    competencias: ['Licitações', 'Contratos', 'Legislação']
  },
  {
    id: 'cogco',
    nome: 'COORDENADORIA DE GOVERNANÇA DE CONTRATAÇÕES (COGCO)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'planejador',
    descricao: 'Planejamento de contratações e governança.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Governança', 'Planejamento de Obras', 'Fiscalização']
  },
  {
    id: 'secomp',
    nome: 'SEÇÃO DE COMPRAS (SECOMP)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Cotação de preços e compras diretas.',
    perfil_ideal: { executor: 35, comunicador: 25, planejador: 20, analista: 20 },
    competencias: ['Pesquisa de Preço', 'Negociação', 'Agilidade']
  },
  {
    id: 'secontr',
    nome: 'SEÇÃO DE CONTRATOS (SECONTR)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'analista',
    descricao: 'Redação e gestão administrativa de contratos.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 25, analista: 40 },
    competencias: ['Gestão Contratual', 'Redação Técnica', 'Prazos']
  },
  {
    id: 'selic',
    nome: 'SEÇÃO DE LICITAÇÃO (SELIC)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'analista',
    descricao: 'Operacionalização de pregões.',
    perfil_ideal: { executor: 25, comunicador: 20, planejador: 20, analista: 35 },
    competencias: ['Pregão', 'Editais', 'Normas']
  },
  {
    id: 'salmox',
    nome: 'SEÇÃO DE ALMOXARIFADO (SALMOX)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Recebimento e distribuição de materiais.',
    perfil_ideal: { executor: 30, comunicador: 15, planejador: 40, analista: 15 },
    competencias: ['Estoque', 'Organização Física', 'Logística']
  },
  {
    id: 'sepat',
    nome: 'SEÇÃO DE PATRIMÔNIO (SEPAT)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'analista',
    descricao: 'Controle e inventário de bens permanentes.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 35, analista: 30 },
    competencias: ['Controle Patrimonial', 'Inventário', 'Organização']
  },
  {
    id: 'setrans',
    nome: 'SEÇÃO DE TRANSPORTE (SETRANS)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Gestão da frota de veículos.',
    perfil_ideal: { executor: 40, comunicador: 25, planejador: 25, analista: 10 },
    competencias: ['Logística de Transporte', 'Manutenção Veicular', 'Coordenação']
  },
  {
    id: 'dipadi',
    nome: 'DIVISÃO DE PASSAGENS E DIÁRIAS (DIPADI)',
    setor: 'Administrativo',
    categoria: 'Administração e Logística',
    predominante: 'executor',
    descricao: 'Emissão de passagens e diárias.',
    perfil_ideal: { executor: 30, comunicador: 25, planejador: 25, analista: 20 },
    competencias: ['Viagens Corporativas', 'Agilidade', 'Atendimento']
  },
  
  // --- INFRAESTRUTURA ---
  {
    id: 'comanp',
    nome: 'COORDENADORIA DE MANUTENÇÃO E PROJETOS (COMANP)',
    setor: 'Infraestrutura',
    categoria: 'Infraestrutura',
    predominante: 'executor',
    descricao: 'Coordenação de obras e projetos.',
    perfil_ideal: { executor: 35, comunicador: 20, planejador: 25, analista: 20 },
    competencias: ['Engenharia', 'Gestão de Obras', 'Projetos']
  },
  {
    id: 'nuea',
    nome: 'NÚCLEO DE ENGENHARIA E ARQUITETURA (NUEA)',
    setor: 'Infraestrutura',
    categoria: 'Infraestrutura',
    predominante: 'analista',
    descricao: 'Elaboração de projetos técnicos.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 25, analista: 40 },
    competencias: ['Projetos Técnicos', 'CAD', 'Fiscalização']
  },
  {
    id: 'seeng',
    nome: 'SEÇÃO DE ENGENHARIA (SEENG)',
    setor: 'Infraestrutura',
    categoria: 'Infraestrutura',
    predominante: 'executor',
    descricao: 'Acompanhamento técnico de obras.',
    perfil_ideal: { executor: 30, comunicador: 15, planejador: 25, analista: 30 },
    competencias: ['Fiscalização de Obras', 'Cálculos', 'Manutenção']
  },
  {
    id: 'searq',
    nome: 'SEÇÃO DE ARQUITETURA (SEARQ) / CHEFE',
    setor: 'Infraestrutura',
    categoria: 'Infraestrutura',
    predominante: 'planejador',
    descricao: 'Projetos de layout e acessibilidade.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 35, analista: 20 },
    competencias: ['Design', 'Layout', 'Acessibilidade']
  },
  {
    id: 'semanbe',
    nome: 'SEÇÃO DE MANUTENÇÃO DE BENS (SEMANBE)',
    setor: 'Infraestrutura',
    categoria: 'Infraestrutura',
    predominante: 'executor',
    descricao: 'Manutenção predial corretiva e preventiva.',
    perfil_ideal: { executor: 40, comunicador: 15, planejador: 25, analista: 20 },
    competencias: ['Manutenção Predial', 'Reparos', 'Praticidade']
  },

  // --- ESTRATÉGIA (SEGEST) ---
  {
    id: 'seggest',
    nome: 'SECRETARIA DE GOVERNANÇA E ESTRATÉGIA (SEGGEST)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'planejador',
    descricao: 'Gestão da estratégia institucional e metas.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 35, analista: 20 },
    competencias: ['Planejamento Estratégico', 'Gestão de Projetos', 'Metas']
  },
  {
    id: 'gabseggest',
    nome: 'GABINETE DE APOIO À SEGEST (GABSEGGEST)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'planejador',
    descricao: 'Apoio administrativo à Secretaria de Estratégia.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 40, analista: 20 },
    competencias: ['Organização', 'Apoio', 'Gestão']
  },
  {
    id: 'diviest',
    nome: 'DIVISÃO DE ESTATÍSTICA (DIVIEST)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'analista',
    descricao: 'Análise de dados estatísticos judiciários.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 25, analista: 55 },
    competencias: ['Estatística', 'BI', 'Datajus']
  },
  {
    id: 'dipin',
    nome: 'DIVISÃO DE PROJETOS NACIONAIS (DIPIN)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'executor',
    descricao: 'Gerenciamento de projetos estratégicos.',
    perfil_ideal: { executor: 30, comunicador: 25, planejador: 30, analista: 15 },
    competencias: ['Gestão de Projetos', 'PMBOK/Scrum', 'Inovação']
  },
  {
    id: 'liods',
    nome: 'DIRETOR DO LIODS (LABORATÓRIO DE INOVAÇÃO)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'comunicador',
    descricao: 'Fomento à inovação e ODS.',
    perfil_ideal: { executor: 25, comunicador: 40, planejador: 15, analista: 20 },
    competencias: ['Inovação', 'Design Thinking', 'Criatividade']
  },
  {
    id: 'divaei',
    nome: 'DIVISÃO DE APOIO EXTERNO INSTITUCIONAL (DIVAEI)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'comunicador',
    descricao: 'Articulação interinstitucional.',
    perfil_ideal: { executor: 20, comunicador: 40, planejador: 20, analista: 20 },
    competencias: ['Relações Institucionais', 'Parcerias', 'Comunicação']
  },
  {
    id: 'segene',
    nome: 'SEÇÃO DE PROCESSOS DE NEGÓCIOS (SEGENE)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'analista',
    descricao: 'Mapeamento e otimização de processos.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 25, analista: 40 },
    competencias: ['BPM', 'Processos', 'Otimização']
  },
  {
    id: 'seneg',
    nome: 'SEÇÃO DE NEGÓCIOS (SENEG)',
    setor: 'Estratégia',
    categoria: 'Estratégia e Projetos',
    predominante: 'analista',
    descricao: 'Análise de requisitos de negócio.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 25, analista: 30 },
    competencias: ['Análise de Negócio', 'Requisitos', 'Soluções']
  },

  // --- AUDITORIA E RISCOS ---
  {
    id: 'secaud',
    nome: 'SECRETARIA DE AUDITORIA (SECAUD)',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Auditoria interna e avaliação de controles.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Auditoria', 'Controle Interno', 'Risco']
  },
  {
    id: 'secop',
    nome: 'SEÇÃO DE AUDITORIA DE CONTRATAÇÕES (SECOP)',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Auditoria em contratações e bens.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Auditoria de Contratos', 'Fiscalização', 'Normas']
  },
  {
    id: 'seagep',
    nome: 'SEÇÃO DE AUDITORIA DE GESTÃO DE PESSOAS (SEAGEP)',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Auditoria em pessoal e folha.',
    perfil_ideal: { executor: 15, comunicador: 10, planejador: 25, analista: 50 },
    competencias: ['Auditoria de RH', 'Legislação', 'Conformidade']
  },
  {
    id: 'semage',
    nome: 'SEÇÃO DE MONITORAMENTO ATOS DE GESTÃO (SEMAGE) / CHEFE',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Monitoramento de atos administrativos.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 30, analista: 35 },
    competencias: ['Monitoramento', 'Indicadores', 'Controle']
  },
  {
    id: 'assiger',
    nome: 'ASSESSORIA DE INTEGRIDADE E RISCOS (ASSIGER)',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Compliance e gestão de riscos.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 25, analista: 40 },
    competencias: ['Compliance', 'Gestão de Riscos', 'Ética']
  },
  {
    id: 'nuconf',
    nome: 'NÚCLEO DE CONFORMIDADE ADMINISTRATIVA (NUCONF)',
    setor: 'Auditoria',
    categoria: 'Auditoria e Controle',
    predominante: 'analista',
    descricao: 'Verificação da conformidade administrativa.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Conformidade', 'Processos', 'Normas']
  },

  // --- TECNOLOGIA DA INFORMAÇÃO (SETIC) ---
  {
    id: 'setic',
    nome: 'SECRETARIA DE TI E COMUNICAÇÕES (SETIC) / CHEFE',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Gestão macro de TI e governança.',
    perfil_ideal: { executor: 35, comunicador: 20, planejador: 25, analista: 20 },
    competencias: ['Gestão de TI', 'Estratégia Digital', 'Liderança']
  },
  {
    id: 'gabsetic',
    nome: 'GABINETE DA SETIC (GABSETIC) / CHEFE',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'planejador',
    descricao: 'Apoio administrativo à TI.',
    perfil_ideal: { executor: 25, comunicador: 20, planejador: 35, analista: 20 },
    competencias: ['Organização', 'Processos de TI', 'Apoio']
  },
  {
    id: 'coops',
    nome: 'COORDENADORIA DE OPERAÇÃO E SUPORTE (COOPS)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Coordenação de infraestrutura e suporte.',
    perfil_ideal: { executor: 35, comunicador: 25, planejador: 20, analista: 20 },
    competencias: ['Operações', 'Infraestrutura', 'Disponibilidade']
  },
  {
    id: 'diseginf',
    nome: 'DIVISÃO DE SEGURANÇA DA INFORMAÇÃO (DISEGINF)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Gestão de segurança cibernética.',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 25, analista: 45 },
    competencias: ['Cibersegurança', 'Riscos de TI', 'Normas']
  },
  {
    id: 'divinf',
    nome: 'DIVISÃO DE SISTEMA DE INFORMAÇÃO (DIVINF)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Desenvolvimento e sustentação de sistemas.',
    perfil_ideal: { executor: 30, comunicador: 15, planejador: 25, analista: 30 },
    competencias: ['Engenharia de Software', 'DevOps', 'Sistemas']
  },
  {
    id: 'divingov',
    nome: 'DIVISÃO DE INICIATIVAS NACIONAIS DE TIC (DIVINGOV)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'planejador',
    descricao: 'Governança de TI e projetos nacionais.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 35, analista: 20 },
    competencias: ['Governança de TI', 'Planejamento', 'Projetos']
  },
  {
    id: 'nuaten',
    nome: 'NÚCLEO DE ATENDIMENTO A CLIENTES (NUATEN)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'comunicador',
    descricao: 'Service Desk e atendimento ao usuário.',
    perfil_ideal: { executor: 25, comunicador: 40, planejador: 20, analista: 15 },
    competencias: ['Service Desk', 'Atendimento', 'Resolução de Problemas']
  },
  {
    id: 'seamos',
    nome: 'SEÇÃO DE MONITORAMENTO DE SERVIÇOS (SEAMOS)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Monitoramento de ambiente (NOC).',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 25, analista: 45 },
    competencias: ['Monitoramento', 'Zabbix', 'Arquitetura']
  },
  {
    id: 'secomda',
    nome: 'SEÇÃO DE COMUNICAÇÃO DE DADOS (SECOMDA)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Gestão de redes e telecomunicações.',
    perfil_ideal: { executor: 30, comunicador: 10, planejador: 25, analista: 35 },
    competencias: ['Redes', 'Telecom', 'Infraestrutura']
  },
  {
    id: 'semantic',
    nome: 'SEÇÃO DE MANUTENÇÃO DE BENS DE TIC (SEMANTIC)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Manutenção de hardware.',
    perfil_ideal: { executor: 35, comunicador: 15, planejador: 30, analista: 20 },
    competencias: ['Hardware', 'Manutenção', 'Inventário TI']
  },
  {
    id: 'semose',
    nome: 'SEÇÃO DE MONITORAMENTO DE SEGURANÇA (SEMOSE)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Monitoramento de incidentes de segurança (SOC).',
    perfil_ideal: { executor: 20, comunicador: 10, planejador: 25, analista: 45 },
    competencias: ['Segurança', 'Análise de Logs', 'Resposta a Incidentes']
  },
  {
    id: 'sedes',
    nome: 'SEÇÃO DE DESENVOLVIMENTO DE SISTEMAS (SEDES)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Codificação e desenvolvimento.',
    perfil_ideal: { executor: 20, comunicador: 5, planejador: 25, analista: 50 },
    competencias: ['Programação', 'Lógica', 'Concentração']
  },
  {
    id: 'seimsis',
    nome: 'SEÇÃO DE IMPLANTAÇÃO DE SISTEMAS (SEIMSIS)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Deploy e sustentação de sistemas.',
    perfil_ideal: { executor: 30, comunicador: 15, planejador: 25, analista: 30 },
    competencias: ['Deploy', 'Sustentação', 'Testes']
  },
  {
    id: 'setdata',
    nome: 'SEÇÃO TÉCNICA DO E-GESTÃO E DATAJUD (SETDATA)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Gestão de dados judiciais.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 20, analista: 50 },
    competencias: ['Dados', 'SQL', 'BI']
  },
  {
    id: 'setpje',
    nome: 'SEÇÃO TÉCNICA DO PJE (SETPJE)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Suporte avançado ao PJe.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 20, analista: 45 },
    competencias: ['PJe', 'Configuração', 'Análise de Erros']
  },
  {
    id: 'sesup1',
    nome: 'SEÇÃO DE SUPORTE DE TIC DE 1° GRAU (SESUP1)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Suporte presencial às Varas.',
    perfil_ideal: { executor: 35, comunicador: 30, planejador: 20, analista: 15 },
    competencias: ['Suporte Técnico', 'Atendimento', 'Hardware']
  },
  {
    id: 'sesup2',
    nome: 'SEÇÃO DE SUPORTE DE TIC DE 2° GRAU (SESUP2)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'executor',
    descricao: 'Suporte presencial às unidades do Tribunal.',
    perfil_ideal: { executor: 35, comunicador: 30, planejador: 20, analista: 15 },
    competencias: ['Suporte Técnico', 'Atendimento', 'Hardware']
  },
  {
    id: 'seconti',
    nome: 'SEÇÃO DE GESTÃO DE CONTRATOS DE TIC (SECONTI)',
    setor: 'TIC',
    categoria: 'Tecnologia da Informação',
    predominante: 'analista',
    descricao: 'Fiscalização de contratos de TI.',
    perfil_ideal: { executor: 20, comunicador: 20, planejador: 25, analista: 35 },
    competencias: ['Gestão de Contratos TI', 'SLA', 'Fiscalização']
  },

  // --- ESCOLA JUDICIAL E CULTURA ---
  {
    id: 'secejud',
    nome: 'SECRETARIA DA ESCOLA JUDICIAL (SECEJUD)',
    setor: 'EJUD',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'comunicador',
    descricao: 'Gestão da escola e eventos jurídicos.',
    perfil_ideal: { executor: 25, comunicador: 40, planejador: 25, analista: 10 },
    competencias: ['Educação', 'Eventos', 'Comunicação']
  },
  {
    id: 'gabejud',
    nome: 'GABINETE DE APOIO À EJUD (GABEJUD)',
    setor: 'EJUD',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'planejador',
    descricao: 'Suporte administrativo à EJUD.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 35, analista: 20 },
    competencias: ['Apoio', 'Organização', 'Secretariado']
  },
  {
    id: 'nucam',
    nome: 'NÚCLEO DE FORMAÇÃO DE MAGISTRADOS (NUCAM)',
    setor: 'EJUD',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'planejador',
    descricao: 'Cursos específicos para magistrados.',
    perfil_ideal: { executor: 15, comunicador: 25, planejador: 40, analista: 20 },
    competencias: ['Formação Jurídica', 'Planejamento Pedagógico', 'Magistratura']
  },
  {
    id: 'nucas',
    nome: 'NÚCLEO DE FORMAÇÃO DE SERVIDORES (NUCAS)',
    setor: 'EJUD',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'executor',
    descricao: 'Treinamentos para servidores.',
    perfil_ideal: { executor: 30, comunicador: 30, planejador: 25, analista: 15 },
    competencias: ['Logística de Treinamento', 'Execução', 'Atendimento']
  },
  {
    id: 'seead',
    nome: 'SEÇÃO DE ENSINO À DISTÂNCIA (SEEAD)',
    setor: 'EJUD',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'analista',
    descricao: 'Gestão de plataformas EAD e cursos online.',
    perfil_ideal: { executor: 20, comunicador: 25, planejador: 35, analista: 20 },
    competencias: ['EAD', 'Tecnologia Educacional', 'Planejamento']
  },
  {
    id: 'cogem',
    nome: 'COORDENADORIA DO CENTRO DE MEMÓRIA (COGEM)',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'analista',
    descricao: 'Preservação histórica e cultural.',
    perfil_ideal: { executor: 15, comunicador: 20, planejador: 25, analista: 40 },
    competencias: ['História', 'Cultura', 'Preservação']
  },
  {
    id: 'sebib',
    nome: 'SEÇÃO DE BIBLIOTECA (SEBIB)',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'analista',
    descricao: 'Gestão do acervo bibliográfico.',
    perfil_ideal: { executor: 10, comunicador: 20, planejador: 30, analista: 40 },
    competencias: ['Biblioteconomia', 'Organização', 'Pesquisa']
  },
  {
    id: 'sediv',
    nome: 'SEÇÃO DE DIVULGAÇÃO CULTURAL (SEDIV)',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'comunicador',
    descricao: 'Divulgação de eventos culturais.',
    perfil_ideal: { executor: 20, comunicador: 45, planejador: 20, analista: 15 },
    competencias: ['Divulgação', 'Cultura', 'Eventos']
  },
  {
    id: 'sedoc',
    nome: 'SEÇÃO DE DOCUMENTAÇÃO (SEDOC)',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'analista',
    descricao: 'Gestão documental técnica.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Documentação', 'Arquivo', 'Organização']
  },
  {
    id: 'segdoc',
    nome: 'SEÇÃO DE GESTÃO DOCUMENTAL (SEGDOC)',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'analista',
    descricao: 'Política de gestão documental.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 30, analista: 40 },
    competencias: ['Arquivologia', 'Gestão Documental', 'Normas']
  },
  {
    id: 'searp',
    nome: 'SEÇÃO DE ARQUIVO PERMANENTE (SEARP) / CHEFE',
    setor: 'Cultura',
    categoria: 'Escola Judicial e Cultura',
    predominante: 'planejador',
    descricao: 'Guarda do arquivo permanente.',
    perfil_ideal: { executor: 10, comunicador: 10, planejador: 45, analista: 35 },
    competencias: ['Arquivo Permanente', 'Preservação', 'Organização']
  },

  // --- APOIO INSTITUCIONAL E OUTROS ---
  {
    id: 'diviouv',
    nome: 'DIVISÃO DA OUVIDORIA (DIVIOUV)',
    setor: 'Ouvidoria',
    categoria: 'Apoio Institucional',
    predominante: 'comunicador',
    descricao: 'Atendimento ao cidadão.',
    perfil_ideal: { executor: 15, comunicador: 45, planejador: 20, analista: 20 },
    competencias: ['Escuta Ativa', 'Empatia', 'Mediação']
  },
  {
    id: 'coordcom',
    nome: 'COORDENADORIA DE COMUNICAÇÃO SOCIAL (COORDCOM)',
    setor: 'Comunicação',
    categoria: 'Apoio Institucional',
    predominante: 'comunicador',
    descricao: 'Gestão da imagem institucional.',
    perfil_ideal: { executor: 25, comunicador: 45, planejador: 15, analista: 15 },
    competencias: ['Jornalismo', 'Marketing', 'Comunicação Estratégica']
  },
  {
    id: 'seirp',
    nome: 'SEÇÃO DE IMPRENSA E RELAÇÕES PÚBLICAS (SEIRP)',
    setor: 'Comunicação',
    categoria: 'Apoio Institucional',
    predominante: 'comunicador',
    descricao: 'Relacionamento com a imprensa.',
    perfil_ideal: { executor: 25, comunicador: 45, planejador: 15, analista: 15 },
    competencias: ['Assessoria de Imprensa', 'Redação', 'Relacionamento']
  },
  {
    id: 'semark',
    nome: 'SEÇÃO DE MARKETING E PUBLICIDADE (SEMARK) / CHEFE',
    setor: 'Comunicação',
    categoria: 'Apoio Institucional',
    predominante: 'comunicador',
    descricao: 'Criação e publicidade.',
    perfil_ideal: { executor: 20, comunicador: 45, planejador: 15, analista: 20 },
    competencias: ['Design', 'Criatividade', 'Publicidade']
  },
  {
    id: 'cocev',
    nome: 'COORDENADORIA DE CERIMONIAL (COCEV)',
    setor: 'Comunicação',
    categoria: 'Apoio Institucional',
    predominante: 'planejador',
    descricao: 'Organização de eventos oficiais.',
    perfil_ideal: { executor: 25, comunicador: 30, planejador: 35, analista: 10 },
    competencias: ['Protocolo', 'Eventos', 'Organização']
  },
  {
    id: 'coopjud',
    nome: 'COORDENADORIA DE POLÍCIA JUDICIAL (COOPJUD)',
    setor: 'Segurança',
    categoria: 'Apoio Institucional',
    predominante: 'executor',
    descricao: 'Segurança institucional estratégica.',
    perfil_ideal: { executor: 40, comunicador: 15, planejador: 25, analista: 20 },
    competencias: ['Segurança', 'Inteligência', 'Liderança']
  },
  {
    id: 'segerpj',
    nome: 'SEÇÃO DE GESTÃO DE RISCO DE SEGURANÇA (SEGERPJ)',
    setor: 'Segurança',
    categoria: 'Apoio Institucional',
    predominante: 'analista',
    descricao: 'Análise de riscos à segurança.',
    perfil_ideal: { executor: 15, comunicador: 15, planejador: 25, analista: 45 },
    competencias: ['Análise de Risco', 'Inteligência', 'Planejamento']
  },
  {
    id: 'seinp',
    nome: 'SEÇÃO DE INTELIGÊNCIA POLICIAL (SEINP)',
    setor: 'Segurança',
    categoria: 'Apoio Institucional',
    predominante: 'analista',
    descricao: 'Atividades de inteligência.',
    perfil_ideal: { executor: 20, comunicador: 15, planejador: 20, analista: 45 },
    competencias: ['Inteligência', 'Sigilo', 'Investigação']
  },
  {
    id: 'seopj',
    nome: 'SEÇÃO DE OPERAÇÕES DE SEGURANÇA (SEOPJ)',
    setor: 'Segurança',
    categoria: 'Apoio Institucional',
    predominante: 'executor',
    descricao: 'Operações táticas e escolta.',
    perfil_ideal: { executor: 45, comunicador: 10, planejador: 20, analista: 25 },
    competencias: ['Operações Táticas', 'Prontidão', 'Segurança Pessoal']
  },
  {
    id: 'sesepj',
    nome: 'SEÇÃO DE SEGURANÇA DE POLÍCIA JUDICIAL (SESEPJ)',
    setor: 'Segurança',
    categoria: 'Apoio Institucional',
    predominante: 'executor',
    descricao: 'Segurança patrimonial e controle de acesso.',
    perfil_ideal: { executor: 40, comunicador: 15, planejador: 25, analista: 20 },
    competencias: ['Vigilância', 'Controle', 'Disciplina']
  },
  {
    id: 'segeambi',
    nome: 'SEÇÃO DE GESTÃO SOCIOAMBIENTAL (SEGEAMBI)',
    setor: 'Sustentabilidade',
    categoria: 'Apoio Institucional',
    predominante: 'comunicador',
    descricao: 'Sustentabilidade e inclusão.',
    perfil_ideal: { executor: 20, comunicador: 40, planejador: 25, analista: 15 },
    competencias: ['Sustentabilidade', 'Inclusão', 'Projetos Sociais']
  }
];

// Agrupamento das unidades
const unidadesAgrupadas = unidadesTRT11.reduce((acc, unit) => {
  if (!acc[unit.categoria]) {
    acc[unit.categoria] = [];
  }
  acc[unit.categoria].push(unit);
  return acc;
}, {});

export default function PeopleAnalyticsTRT11() {
  const [step, setStep] = useState(1);
  const [servidor, setServidor] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef(null);
  
  // API Key - Injected by Environment
  const apiKey = "";

  // Função para chamar o Gemini
  const analyzeWithGemini = async (contentPart) => {
    const systemInstruction = `
      Você é um especialista em análise de relatórios comportamentais (DISC).
      Extraia EXCLUSIVAMENTE as porcentagens dos 4 perfis.
      
      Regras:
      1. Retorne APENAS um JSON: { "executor": number, "comunicador": number, "planejador": number, "analista": number }
      2. Se houver apenas texto (ex: "Muito Alto"), use: Muito Alto=90, Alto=75, Médio=50, Baixo=25.
      3. Se não houver dados, retorne 0.
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

      if (!response.ok) throw new Error(`Erro API: ${response.statusText}`);
      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonText) throw new Error("Sem resposta válida da IA.");

      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Erro Gemini:", error);
      throw error;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setErrorMsg('');

      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Data = e.target.result.split(',')[1];
          processFile({ inlineData: { mimeType: 'application/pdf', data: base64Data } }, file.name);
        };
        reader.onerror = () => { setLoading(false); setErrorMsg('Erro ao ler PDF.'); };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          processFile({ text: e.target.result }, file.name);
        };
        reader.readAsText(file);
      }
    }
  };

  const processFile = async (contentPart, fileName) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const discResults = await analyzeWithGemini(contentPart);
      const total = Object.values(discResults).reduce((a, b) => a + Number(b), 0);
      
      if (total < 5) throw new Error("Dados DISC insuficientes.");

      // --- NORMALIZAÇÃO AUTOMÁTICA DOS DADOS DO CANDIDATO ---
      const factor = 100 / total;
      const normalizedDisc = {
        executor: Math.round(discResults.executor * factor),
        comunicador: Math.round(discResults.comunicador * factor),
        planejador: Math.round(discResults.planejador * factor),
        analista: Math.round(discResults.analista * factor)
      };

      // Determinar perfil predominante do candidato
      const sortedProfiles = Object.entries(normalizedDisc).sort(([,a], [,b]) => b - a);
      const predominantProfile = sortedProfiles[0][0];

      setServidor({
        nome: fileName.length > 30 ? fileName.substring(0, 30) + '...' : fileName,
        matricula: 'Auto-detectado',
        disc: normalizedDisc,
        rawDisc: discResults,
        predominante: predominantProfile
      });
      setStep(2);

    } catch (error) {
      console.error(error);
      setErrorMsg('Não foi possível ler o perfil DISC. Verifique o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  const calculateMatch = (unit) => {
    if (!unit || !servidor) return;
    setLoading(true);
    
    setTimeout(() => {
      const s = servidor.disc; 
      const u = unit.perfil_ideal;

      const weights = {
        executor: unit.predominante === 'executor' ? 2.0 : 1,
        comunicador: unit.predominante === 'comunicador' ? 2.0 : 1,
        planejador: unit.predominante === 'planejador' ? 2.0 : 1,
        analista: unit.predominante === 'analista' ? 2.0 : 1
      };

      const diffE = Math.abs(s.executor - u.executor) * weights.executor;
      const diffC = Math.abs(s.comunicador - u.comunicador) * weights.comunicador;
      const diffP = Math.abs(s.planejador - u.planejador) * weights.planejador;
      const diffA = Math.abs(s.analista - u.analista) * weights.analista;

      const sumWeights = Object.values(weights).reduce((a, b) => a + b, 0);
      const totalWeightedDiff = (diffE + diffC + diffP + diffA);
      
      const averageDiff = totalWeightedDiff / sumWeights; 
      let rawScore = 100 - (averageDiff * 2.5); 
      
      if (servidor.predominante === unit.predominante) {
        rawScore += 5;
      }

      const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

      let analysis = [];
      
      if (finalScore > 85) {
        analysis.push({ type: 'success', text: `Excelente alinhamento! O perfil natural do servidor (${servidor.predominante}) se encaixa perfeitamente na distribuição de energia exigida pela unidade.` });
      } else if (finalScore > 70) {
        analysis.push({ type: 'success', text: `Bom alinhamento. O perfil apresenta boa aderência às principais demandas da vaga.` });
      }

      if (u.executor > 30 && s.executor < 20) analysis.push({ type: 'gap', text: 'A unidade demanda alta energia de Execução (rapidez/decisão), o que é um ponto de atenção no perfil atual.' });
      if (u.analista > 30 && s.analista < 20) analysis.push({ type: 'gap', text: 'A vaga exige foco elevado em detalhes e conformidade, competências que exigirão mais esforço do servidor.' });
      if (u.comunicador > 30 && s.comunicador < 20) analysis.push({ type: 'gap', text: 'A posição é intensiva em interação social/comunicação, pontos menos naturais ao perfil avaliado.' });
      if (u.planejador > 30 && s.planejador < 20) analysis.push({ type: 'gap', text: 'A rotina exige constância e paciência (Planejamento), o que pode gerar desconforto para perfis mais dinâmicos.' });

      if (s.executor > 40 && u.executor < 20) analysis.push({ type: 'warning', text: 'O servidor possui altíssima dominância, podendo se frustrar com a falta de autonomia ou ritmo da unidade.' });
      if (s.comunicador > 40 && u.comunicador < 20) analysis.push({ type: 'warning', text: 'Perfil muito expansivo para uma unidade técnica/isolada, risco de desmotivação por falta de interação.' });

      if (analysis.length === 0 && finalScore < 60) {
        analysis.push({ type: 'info', text: 'O perfil apresenta distribuição de fatores muito distinta da idealizada para a unidade, exigindo adaptação significativa.' });
      }

      setMatchResult({
        score: finalScore,
        details: analysis
      });
      setSelectedUnit(unit);
      setLoading(false);
      setStep(3);
    }, 800);
  };

  const handleRestart = () => {
    setStep(1);
    setServidor(null);
    setSelectedUnit(null);
    setPreviewUnit(null);
    setMatchResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">TRT11 People Analytics</h1>
              <p className="text-xs text-blue-200">Sistema de Análise de Fit Cultural & Técnico</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-blue-800 px-3 py-1 rounded border border-blue-700">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>AI Powered</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-8 text-sm">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 1 ? 'bg-blue-100 border-blue-600' : 'border-slate-300'}`}>1</span>
            Extração DISC
          </div>
          <div className="w-16 h-1 bg-slate-200 mx-2"></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 2 ? 'bg-blue-100 border-blue-600' : 'border-slate-300'}`}>2</span>
            Posto de Trabalho
          </div>
          <div className="w-16 h-1 bg-slate-200 mx-2"></div>
          <div className={`flex items-center ${step >= 3 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 3 ? 'bg-blue-100 border-blue-600' : 'border-slate-300'}`}>3</span>
            Análise de Fit
          </div>
        </div>

        {/* STEP 1: EXTRACTION */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Extração de Perfil via IA
              </h2>
              <p className="text-blue-700 text-sm mt-1">
                O sistema utiliza Inteligência Artificial para ler o relatório DISC (PDF) e extrair os indicadores comportamentais automaticamente.
              </p>
            </div>

            <div className="p-10 flex justify-center">
              <div className="w-full max-w-lg space-y-4">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  accept=".pdf,.txt,.json,.csv"
                />
                <div 
                  onClick={() => !loading && fileInputRef.current.click()}
                  className={`border-2 border-dashed border-slate-300 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all group ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 hover:border-blue-400 shadow-sm hover:shadow-md'}`}
                >
                  {loading ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                      <span className="text-lg font-medium text-slate-600">Analisando documento...</span>
                      <span className="text-sm text-slate-400 mt-2">Extraindo fatores D-I-S-C</span>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-12 h-12 text-blue-500" />
                      </div>
                      <p className="font-bold text-lg text-slate-700">Clique para carregar Relatório</p>
                      <p className="text-sm text-slate-400 mt-2 text-center">
                        Suporta PDF (DISC, Solides, PDA) ou texto simples.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            {errorMsg && (
              <div className="mx-8 mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" /> {errorMsg}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: UNIT SELECTION */}
        {step === 2 && servidor && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Panel: Profile Extracted */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Perfil do Servidor
                </h3>
                
                <div className="mb-4">
                  <p className="font-medium text-slate-800 truncate text-lg">{servidor.nome}</p>
                  <p className="text-xs text-slate-400">Perfil Predominante:</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase">
                    {servidor.predominante}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-500 font-semibold">Distribuição DISC (Total 100%)</span>
                  </div>
                  {Object.entries(servidor.disc).map(([key, value]) => {
                    const colors = {
                      executor: 'bg-red-500',
                      comunicador: 'bg-yellow-400',
                      planejador: 'bg-green-500',
                      analista: 'bg-blue-500'
                    };
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1 font-semibold text-slate-600 uppercase">
                          <span>{key}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${colors[key] || 'bg-slate-400'}`} 
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  onClick={handleRestart}
                  className="mt-6 w-full py-2 border border-slate-200 rounded-lg text-xs text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3 h-3" /> Trocar Arquivo
                </button>
              </div>
            </div>

            {/* Right Panel: Unit Selection */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 h-full">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-800">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Selecionar Posto de Trabalho
                </h2>
                <p className="text-slate-500 mb-6 text-sm">
                  Selecione a unidade para comparar o perfil do servidor com as exigências comportamentais do posto.
                </p>

                <div className="space-y-6">
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-4 pr-10 focus:ring-2 focus:ring-blue-500 block shadow-sm text-sm"
                      onChange={(e) => setPreviewUnit(unidadesTRT11.find(u => u.id === e.target.value))}
                      value={previewUnit?.id || ""}
                    >
                      <option value="">Selecione uma Unidade / Posto...</option>
                      {Object.keys(unidadesAgrupadas).map((categoria) => (
                        <optgroup key={categoria} label={categoria}>
                          {unidadesAgrupadas[categoria].map((unit) => (
                            <option key={unit.id} value={unit.id}>{unit.nome}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>

                  {previewUnit ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-fade-in">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-blue-900">{previewUnit.nome}</h3>
                        <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded uppercase">
                          {previewUnit.setor}
                        </span>
                      </div>
                      
                      <div className="bg-white/60 p-4 rounded-lg border border-blue-100 mb-4">
                        <p className="text-sm text-slate-700 italic leading-relaxed">"{previewUnit.descricao}"</p>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1">
                           <p className="text-xs font-bold text-slate-400 uppercase mb-1">Perfil Predominante Exigido</p>
                           <div className="flex items-center gap-2">
                             <Target className="w-5 h-5 text-red-500" />
                             <span className="font-bold text-slate-800 capitalize">{previewUnit.predominante}</span>
                           </div>
                        </div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-slate-400 uppercase mb-1">Competências Chave</p>
                           <div className="flex flex-wrap gap-1">
                             {previewUnit.competencias.slice(0,2).map(c => (
                               <span key={c} className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">{c}</span>
                             ))}
                           </div>
                        </div>
                      </div>

                      <button
                        onClick={() => calculateMatch(previewUnit)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98]"
                      >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Brain className="w-5 h-5" />}
                        REALIZAR ANÁLISE DE FIT
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50">
                      <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Aguardando seleção...</p>
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
            <div className="flex items-center justify-between">
              <button 
                onClick={() => { setStep(2); setPreviewUnit(selectedUnit); }}
                className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium"
              >
                &larr; Voltar
              </button>
              <button 
                onClick={handleRestart}
                className="text-sm border border-slate-300 text-slate-600 hover:text-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Nova Análise
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Resultado do Fit Cultural</h2>
                  <p className="text-sm text-slate-500">Unidade: {selectedUnit.nome}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400 font-bold uppercase">Pontuação Final</div>
                    <div className={`text-2xl font-bold ${matchResult.score >= 70 ? 'text-green-600' : matchResult.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {matchResult.score}/100
                    </div>
                  </div>
                  <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center text-xl font-bold shadow-sm
                    ${matchResult.score >= 75 ? 'border-green-100 bg-green-50 text-green-700' : 
                      matchResult.score >= 50 ? 'border-yellow-100 bg-yellow-50 text-yellow-700' : 
                      'border-red-100 bg-red-50 text-red-700'}`}>
                    {matchResult.score >= 75 ? 'A' : matchResult.score >= 50 ? 'B' : 'C'}
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Visual Chart */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 mb-4">
                     <BarChart2 className="w-5 h-5 text-blue-600" />
                     <h3 className="font-bold text-slate-700">Comparativo de Distribuição (%)</h3>
                  </div>
                  
                  {['executor', 'comunicador', 'planejador', 'analista'].map(factor => (
                    <div key={factor} className="relative group">
                      <div className="flex justify-between text-xs uppercase font-bold text-slate-500 mb-2">
                        <span className={`flex items-center gap-1 ${selectedUnit.predominante === factor ? 'text-blue-700 font-extrabold' : ''}`}>
                          {factor} {selectedUnit.predominante === factor && <Target className="w-3 h-3" />}
                        </span>
                      </div>
                      
                      {/* Comparison Bars */}
                      <div className="h-8 bg-slate-50 rounded-lg relative border border-slate-100 overflow-hidden">
                        {/* Target Marker (Ideal) */}
                        <div 
                          className="absolute top-0 bottom-0 bg-slate-800 z-10 opacity-20 border-r-2 border-slate-900" 
                          style={{ width: `${selectedUnit.perfil_ideal[factor]}%` }}
                        ></div>
                         <div 
                          className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 z-20 pl-2" 
                          style={{ left: `${selectedUnit.perfil_ideal[factor]}%` }}
                        >
                          Meta: {selectedUnit.perfil_ideal[factor]}%
                        </div>

                        {/* Candidate Bar */}
                        <div 
                          className={`absolute top-2 bottom-2 left-0 rounded-r-md transition-all duration-1000 
                            ${servidor.disc[factor] > selectedUnit.perfil_ideal[factor] + 10 ? 'bg-yellow-400' : // Excesso
                              Math.abs(servidor.disc[factor] - selectedUnit.perfil_ideal[factor]) < 10 ? 'bg-green-500' : // Match
                              'bg-red-400' // Falta
                            }`} 
                          style={{ width: `${servidor.disc[factor]}%` }}
                        >
                          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold px-1">
                            {servidor.disc[factor]}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4 text-xs text-slate-500 mt-4 border-t pt-4">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded"></div> Na Faixa</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded"></div> Acima da Meta</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded"></div> Abaixo da Meta</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded"></div> Perfil Ideal</div>
                  </div>
                </div>

                {/* Analysis Report */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-700">Parecer de Compatibilidade</h3>
                  </div>

                  {matchResult.details.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border flex gap-3 items-start
                      ${item.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 
                        item.type === 'gap' ? 'bg-red-50 border-red-200 text-red-800' : 
                        item.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                        'bg-blue-50 border-blue-200 text-blue-800'}`}>
                      
                      {item.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                      {item.type === 'gap' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
                      {item.type === 'warning' && <Info className="w-5 h-5 shrink-0 mt-0.5" />}
                      {item.type === 'info' && <Info className="w-5 h-5 shrink-0 mt-0.5" />}
                      
                      <p className="text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recomendação para Gestor</h4>
                    <p className="text-sm text-slate-600 italic">
                      {matchResult.score >= 75 ? 
                        "Candidato altamente recomendado. Focar na integração cultural imediata." :
                        matchResult.score >= 50 ? 
                        "Candidato viável com acompanhamento. Verificar disposição para adaptar perfil comportamental nas áreas de gap identificadas." :
                        "Candidato com perfil desafiador para a vaga. Requer entrevista aprofundada para alinhar expectativas sobre a rotina da unidade."}
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