type Pagos = {
    total: number;
    limit: number;
    skip: number;
    data: Pago[];
};

type Pago = {
    id: number;
    emisionDate: string;
    pagoDate: string;
    monto: number;
    destinatarioId: number;
    numero: string;
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

type Cobro = {
    id: number;
    emisionDate: string;
    depositoDate: string;
    monto: number;
    libradoreId: number;
    numero: string;
    bancoId: number;
    titular?: string;
    cuit?: string;
    observaciones: string;
    estado: string;
    salidaDate?: string;
    destinatarioId?: number;
    createdAt: string;
    updatedAt: string;
};

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

type Total = {
    total: number;
    limit: number;
    skip: number;
    data: [{ total: number }];
};

type Saldo = {
    total: number;
    limit: number;
    skip: number;
    data: [{ debe: number; haber: number }];
};

type Cuentas = {
    total: number;
    limit: number;
    skip: number;
    data: Cuenta[];
};

type Cuenta = {
    id: number;
    nombre: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
};

type Compras = {
    total: number;
    limit: number;
    skip: number;
    data: Compra[];
};

type Compra = {
    id: number;
    fecha: string;
    debe: number;
    haber: number;
    comprobante: string;
    proveedoreId: number;
    createdAt: string;
    updatedAt: string;
};

type Ventas = {
    total: number;
    limit: number;
    skip: number;
    data: Venta[];
};

type Venta = {
    id: number;
    fecha: string;
    debe: number;
    haber: number;
    comprobante: string;
    clienteId: number;
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
