export interface Paciente {
    id: number;
    name: string;
    cpf: string;
    data_nasc: string;
    contato: string;
    created_at?: string;
    updated_at?: string;
}

export interface CadastroResponse {
    message: string;
    paciente: Paciente;
}