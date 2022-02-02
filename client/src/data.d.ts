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
