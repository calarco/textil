type Items = {
    detalle: string;
    monto: number;
}[];

type Aumento = {
    id?: number;
    nombre?: string;
    porcentage: number;
};

type Aumentos = {
    total: number;
    limit: number;
    skip: number;
    data: Aumento[];
};

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

type PrecioInputs = {
    articulo?: number;
    descripcion?: string;
    peso?: number;
    detalle?: string;
    monto?: string;
    costo?: string;
};

type AumentoInputs = {
    fabrica?: number;
    vendedor?: number;
    venta?: number;
    signori?: number;
    porcentage?: number;
};
