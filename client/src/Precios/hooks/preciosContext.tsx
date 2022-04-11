import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import feathersClient from "feathersClient";

type ContextType = {
    fabrica: Aumento;
    vendedor: Aumento;
    venta: Aumento;
    signori: Aumento;
    aumentos: Aumento[];
    getAumento: (aumentoId: number) => number;
};

const PreciosContext = createContext<ContextType>({
    fabrica: { id: 0, porcentage: 0 },
    vendedor: { id: 0, porcentage: 0 },
    venta: { id: 0, porcentage: 0 },
    signori: { id: 0, porcentage: 0 },
    aumentos: [],
    getAumento: () => 0,
});

type ComponentProps = {
    children: ReactNode;
};

function PreciosProvider({ children }: ComponentProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Aumentos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [aumentos, setAumentos] = useState<Aumento[]>([]);
    const [fabrica, setFabrica] = useState<Aumento>({ id: 0, porcentage: 0 });
    const [vendedor, setVendedor] = useState<Aumento>({ id: 0, porcentage: 0 });
    const [venta, setVenta] = useState<Aumento>({ id: 0, porcentage: 0 });
    const [signori, setSignori] = useState<Aumento>({ id: 0, porcentage: 0 });

    function loadData() {
        setLoading(true);
        feathersClient
            .service("aumentos")
            .find({
                query: {
                    $limit: 100,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((response: Aumentos) => {
                setLoading(false);
                response.data[0] && setData(response);
            })
            .catch((error: FeathersErrorJSON) => {
                setLoading(false);
                console.error(error);
            });
    }

    const getAumento = (aumentoId: number) => {
        try {
            return aumentos.find(({ id }) => id === aumentoId)!.porcentage;
        } catch {
            return 0;
        }
    };

    useEffect(() => {
        loadData();
        feathersClient.service("aumentos").on("created", () => loadData());
        feathersClient.service("aumentos").on("patched", () => loadData());
        feathersClient.service("aumentos").on("removed", () => loadData());
    }, []);

    useEffect(() => {
        !loading &&
            !data.data.find((aumento) => aumento.nombre === "fabrica") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "fabrica", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            !data.data.find((aumento) => aumento.nombre === "vendedor") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "vendedor", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            !data.data.find((aumento) => aumento.nombre === "venta") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "venta", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            !data.data.find((aumento) => aumento.nombre === "signori") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "signori", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
        setAumentos(data.data.filter((item) => item.nombre === null));
    }, [loading, data, setAumentos]);

    useEffect(() => {
        const fabricaId =
            data.data.find((aumento) => aumento.nombre === "fabrica")?.id || 0;
        const fabricaPorcentage =
            data.data.find((aumento) => aumento.nombre === "fabrica")
                ?.porcentage || 0;
        setFabrica({
            id: fabricaId,
            porcentage: fabricaPorcentage,
        });

        const vendedorId =
            data.data.find((aumento) => aumento.nombre === "vendedor")?.id || 0;
        const vendedorPorcentage =
            data.data.find((aumento) => aumento.nombre === "vendedor")
                ?.porcentage || 0;
        setVendedor({
            id: vendedorId,
            porcentage: vendedorPorcentage,
        });

        const ventaId =
            data.data.find((aumento) => aumento.nombre === "venta")?.id || 0;
        const ventaPorcentage =
            data.data.find((aumento) => aumento.nombre === "venta")
                ?.porcentage || 0;
        setVenta({
            id: ventaId,
            porcentage: ventaPorcentage,
        });

        const signoriId =
            data.data.find((aumento) => aumento.nombre === "signori")?.id || 0;
        const signoriPorcentage =
            data.data.find((aumento) => aumento.nombre === "signori")
                ?.porcentage || 0;
        setSignori({
            id: signoriId,
            porcentage: signoriPorcentage,
        });
    }, [data, setFabrica, setVendedor, setVenta, setSignori]);

    return (
        <PreciosContext.Provider
            value={{
                fabrica: fabrica,
                vendedor: vendedor,
                venta: venta,
                signori: signori,
                aumentos: aumentos,
                getAumento: getAumento,
            }}
        >
            {children}
        </PreciosContext.Provider>
    );
}

function usePrecios() {
    const context = useContext(PreciosContext);
    if (context === undefined) {
        throw new Error("usePrecios must be used within a PreciosProvider");
    }
    return context;
}

export { PreciosProvider, usePrecios };
