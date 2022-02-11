type Precio = {
    id: number;
    articulo: number;
    descripcion: string;
    kg: number;
    costo?: number;
    costos?: { nombre: string; monto: number }[];
    createdAt: string;
    updatedAt: string;
};

type Precios = {
    total: number;
    limit: number;
    skip: number;
    data: Precio[];
};
