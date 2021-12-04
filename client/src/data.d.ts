type Pago = {
    id: number;
    pagoDate: string;
    proveedor: string;
    numero: string;
    monto: string;
    emisionDate: string;
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
    cliente?: string;
    numero: string;
    monto: string;
    depositoDate: string;
    banco?: string;
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

type FeathersErrorJSON = {
    name: string;
    message: string;
    code: number;
    className: string;
    data?: any;
    errors?: any;
};
