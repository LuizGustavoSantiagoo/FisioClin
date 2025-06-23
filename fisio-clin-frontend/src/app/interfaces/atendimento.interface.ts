export interface Atendimento {
  id: number;
  motivo: string;
  sintomas: string;
  conclusao: string;
  id_paciente: string;
  id_fisio: string;
}

export interface AtendimentoResponse {
  message: string;
  paciente: Atendimento;
}
