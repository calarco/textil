type Items = {
    detalle: string;
    monto: number;
}[];

type Precio = {
    id: number;
    articulo: number;
    descripcion: string;
    peso: number;
    costo?: number;
    costos?: Items;
    aumentoId?: number;
    createdAt: string;
    updatedAt: string;
};

type Precios = {
    total: number;
    limit: number;
    skip: number;
    data: Precio[];
};

type Column = {
    nombre: string;
    porcentage: number;
    base: string;
};

type PrecioInputs = {
    articulo?: number;
    descripcion?: string;
    peso?: number;
    detalle?: string;
    monto?: string;
    costo?: string;
};
