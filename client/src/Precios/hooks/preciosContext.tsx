import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import feathersClient from "feathersClient";

type ContextType = {
    getAumento: (aumentoId: number) => number;
    fabrica: Aumento;
    vendedor: Aumento;
    venta: Aumento;
    signori: Aumento;
};

const PreciosContext = createContext<ContextType>({
    getAumento: () => 0,
    fabrica: { porcentage: 0 },
    vendedor: { porcentage: 0 },
    venta: { porcentage: 0 },
    signori: { porcentage: 0 },
});

type ComponentProps = {
    children: ReactNode;
};

function PreciosProvider({ children }: ComponentProps) {
    const [loading, setLoading] = useState(true);
    const [aumentos, setAumentos] = useState<Aumentos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [fabrica, setFabrica] = useState<Aumento>({ porcentage: 0 });
    const [vendedor, setVendedor] = useState<Aumento>({ porcentage: 0 });
    const [venta, setVenta] = useState<Aumento>({ porcentage: 0 });
    const [signori, setSignori] = useState<Aumento>({ porcentage: 0 });

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
                response.data[0] && setAumentos(response);
            })
            .catch((error: FeathersErrorJSON) => {
                setLoading(false);
                console.error(error);
            });
    }

    const getAumento = (aumentoId: number) => {
        try {
            return aumentos.data.find(({ id }) => id === aumentoId)!.porcentage;
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
            aumentos.data[0] &&
            !aumentos.data.find((aumento) => aumento.nombre === "fabrica") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "fabrica", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            aumentos.data[0] &&
            !aumentos.data.find((aumento) => aumento.nombre === "vendedor") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "vendedor", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            aumentos.data[0] &&
            !aumentos.data.find((aumento) => aumento.nombre === "venta") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "venta", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });

        !loading &&
            aumentos.data[0] &&
            !aumentos.data.find((aumento) => aumento.nombre === "signori") &&
            feathersClient
                .service("aumentos")
                .create({ nombre: "signori", porcentage: 0 })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
    }, [loading, aumentos]);

    useEffect(() => {
        const fabricaId =
            aumentos.data.find((aumento) => aumento.nombre === "fabrica")?.id ||
            0;
        const fabricaPorcentage =
            aumentos.data.find((aumento) => aumento.nombre === "fabrica")
                ?.porcentage || 0;
        setFabrica({
            id: fabricaId,
            porcentage: fabricaPorcentage,
        });

        const vendedorId =
            aumentos.data.find((aumento) => aumento.nombre === "vendedor")
                ?.id || 0;
        const vendedorPorcentage =
            aumentos.data.find((aumento) => aumento.nombre === "vendedor")
                ?.porcentage || 0;
        setVendedor({
            id: vendedorId,
            porcentage: vendedorPorcentage,
        });

        const ventaId =
            aumentos.data.find((aumento) => aumento.nombre === "venta")?.id ||
            0;
        const ventaPorcentage =
            aumentos.data.find((aumento) => aumento.nombre === "venta")
                ?.porcentage || 0;
        setVenta({
            id: ventaId,
            porcentage: ventaPorcentage,
        });

        const signoriId =
            aumentos.data.find((aumento) => aumento.nombre === "signori")?.id ||
            0;
        const signoriPorcentage =
            aumentos.data.find((aumento) => aumento.nombre === "signori")
                ?.porcentage || 0;
        setSignori({
            id: signoriId,
            porcentage: signoriPorcentage,
        });
    }, [aumentos, setFabrica, setVendedor, setVenta, setSignori]);

    return (
        <PreciosContext.Provider
            value={{
                getAumento: getAumento,
                fabrica: fabrica,
                vendedor: vendedor,
                venta: venta,
                signori: signori,
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
