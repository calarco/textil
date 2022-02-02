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
