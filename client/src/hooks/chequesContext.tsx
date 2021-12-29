import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import feathersClient from "feathersClient";

type ContextType = {
    getProveedor: (proveedorId: number) => string;
    getCliente: (clienteId: number) => string;
    getBanco: (bancoId: number) => string;
    proveedores: Proveedores;
    clientes: Clientes;
    bancos: Bancos;
};

const ChequesContext = createContext<ContextType>({
    getProveedor: () => "",
    getCliente: () => "",
    getBanco: () => "",
    proveedores: {
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    },
    clientes: {
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    },
    bancos: {
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    },
});

type ComponentProps = {
    children: ReactNode;
};

function ChequesProvider({ children }: ComponentProps) {
    const [proveedores, setProveedores] = useState<Proveedores>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [clientes, setClientes] = useState<Clientes>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [bancos, setBancos] = useState<Bancos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });

    function loadData() {
        feathersClient
            .service("proveedores")
            .find({
                query: {
                    $limit: 100,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((found: Proveedores) => {
                found.data[0] && setProveedores(found);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error);
            });
        feathersClient
            .service("clientes")
            .find({
                query: {
                    $limit: 200,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((found: Clientes) => {
                found.data[0] && setClientes(found);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error);
            });
        feathersClient
            .service("bancos")
            .find({
                query: {
                    $limit: 200,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((found: Bancos) => {
                found.data[0] && setBancos(found);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error);
            });
    }

    const getProveedor = (proveedorId: number) => {
        try {
            return proveedores.data.find(({ id }) => id === proveedorId)!
                .nombre;
        } catch {
            return "error";
        }
    };

    const getCliente = (clienteId: number) => {
        try {
            return clientes.data.find(({ id }) => id === clienteId)!.nombre;
        } catch {
            return "error";
        }
    };

    const getBanco = (bancoId: number) => {
        try {
            return bancos.data.find(({ id }) => id === bancoId)!.nombre;
        } catch {
            return "error";
        }
    };

    useEffect(() => {
        loadData();
        feathersClient.service("proveedores").on("created", () => loadData());
        feathersClient.service("clientes").on("created", () => loadData());
        feathersClient.service("bancos").on("created", () => loadData());
    }, []);

    return (
        <ChequesContext.Provider
            value={{
                getProveedor: getProveedor,
                getCliente: getCliente,
                getBanco: getBanco,
                proveedores: proveedores,
                clientes: clientes,
                bancos: bancos,
            }}
        >
            {children}
        </ChequesContext.Provider>
    );
}

function useCheques() {
    const context = useContext(ChequesContext);
    if (context === undefined) {
        throw new Error("useCheques must be used within a ChequesProvider");
    }
    return context;
}

export { ChequesProvider, useCheques };
