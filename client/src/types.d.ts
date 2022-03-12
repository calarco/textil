type Genericos = {
    total: number;
    limit: number;
    skip: number;
    data: Generico[];
};

type Generico = {
    id: number;
    nombre: string;
    createdAt: string;
    updatedAt: string;
};

type FeathersErrorJSON = {
    name: string;
    message: string;
    code: number;
    className: string;
    data?: any;
    errors?: any;
};

type Inputs = {
    monto?: string;
    debe?: string;
    haber?: string;
    costo?: string;
    destinatarioId?: number;
    destinatario?: string;
    libradoreId?: number;
    librador?: string;
    bancoId?: number;
    banco?: string;
};
