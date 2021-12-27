type Pago = {
    id: number;
    pagoDate: string;
    monto: number;
    proveedoreId: number;
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
    clienteId: number;
    depositoDate: string;
    bancoId: number;
    numero: string;
    titular?: string;
    cuit?: string;
    observaciones: string;
    estado: string;
    salidaDate?: string;
    proveedoreId?: number;
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

type Proveedor = {
    id: number;
    nombre: string;
    createdAt: string;
    updatedAt: string;
};

type Proveedores = {
    total: number;
    limit: number;
    skip: number;
    data: Proveedor[];
};

type Cliente = {
    id: number;
    nombre: string;
    createdAt: string;
    updatedAt: string;
};

type Clientes = {
    total: number;
    limit: number;
    skip: number;
    data: Cliente[];
};

type Banco = {
    id: number;
    nombre: string;
    createdAt: string;
    updatedAt: string;
};

type Bancos = {
    total: number;
    limit: number;
    skip: number;
    data: Banco[];
};

type FeathersErrorJSON = {
    name: string;
    message: string;
    code: number;
    className: string;
    data?: any;
    errors?: any;
};
