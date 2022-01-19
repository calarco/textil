import {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import feathersClient from "feathersClient";

type ContextType = {
    getDestinatario: (destinatarioId: number) => string;
    getLibrador: (libradoreId: number) => string;
    getBanco: (bancoId: number) => string;
    destinatarios: Genericos;
    libradores: Genericos;
    bancos: Genericos;
};

const ChequesContext = createContext<ContextType>({
    getDestinatario: () => "",
    getLibrador: () => "",
    getBanco: () => "",
    destinatarios: {
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    },
    libradores: {
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
    const [destinatarios, setDestinatarios] = useState<Genericos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [libradores, setLibradores] = useState<Genericos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [bancos, setBancos] = useState<Genericos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });

    function loadData() {
        feathersClient
            .service("destinatarios")
            .find({
                query: {
                    $limit: 100,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((response: Genericos) => {
                response.data[0] && setDestinatarios(response);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error);
            });
        feathersClient
            .service("libradores")
            .find({
                query: {
                    $limit: 200,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((response: Genericos) => {
                response.data[0] && setLibradores(response);
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
            .then((response: Genericos) => {
                response.data[0] && setBancos(response);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error);
            });
    }

    const getDestinatario = (destinatarioId: number) => {
        try {
            return destinatarios.data.find(({ id }) => id === destinatarioId)!
                .nombre;
        } catch {
            return "error";
        }
    };

    const getLibrador = (libradoreId: number) => {
        try {
            return libradores.data.find(({ id }) => id === libradoreId)!.nombre;
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
        feathersClient.service("destinatarios").on("created", () => loadData());
        feathersClient.service("libradores").on("created", () => loadData());
        feathersClient.service("bancos").on("created", () => loadData());
    }, []);

    return (
        <ChequesContext.Provider
            value={{
                getDestinatario: getDestinatario,
                getLibrador: getLibrador,
                getBanco: getBanco,
                destinatarios: destinatarios,
                libradores: libradores,
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
