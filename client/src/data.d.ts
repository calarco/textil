type Pago = {
    id: number;
    pagoDate: string;
    monto: number;
    proveedor: string;
    emisionDate: string;
    numero: string;
    observaciones: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
};

type Pagos = {
    total: number;
    limit: number;
    skip: number;
    data: Pago[];
};

type Cobro = {
    id: number;
    ingresoDate: string;
    monto: number;
    cliente: string;
    depositoDate: string;
    banco: string;
    numero: string;
    titular?: string;
    cuit?: string;
    observaciones: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
};

type Cobros = {
    total: number;
    limit: number;
    skip: number;
    data: Cobro[];
};

type Total = {
    total: number;
    limit: number;
    skip: number;
    data: [{ total: number }];
};

type FeathersErrorJSON = {
    name: string;
    message: string;
    code: number;
    className: string;
    data?: any;
    errors?: any;
};
