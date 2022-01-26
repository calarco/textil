import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type HookProps = {
    gte: string;
    lte: string;
};

const useTotal = ({ gte, lte }: HookProps) => {
    const [pagos, setPagos] = useState(0);
    const [cobros, setCobros] = useState(0);
    const [error, setError] = useState("");

    const loadPagos = useCallback(() => {
        feathersClient
            .service("pagos")
            .find({
                query: {
                    $limit: 50,
                    estado: "A pagar" || "Pagado",
                    pagoDate: {
                        $gte: gte,
                        $lte: lte,
                    },
                    $total: true,
                },
            })
            .then((response: Total) => {
                setPagos(response.data[0].total);
            })
            .catch((error: FeathersErrorJSON) => {
                setPagos(0);
                setError(error.message);
            });
    }, [gte, lte]);

    const loadCobros = useCallback(() => {
        feathersClient
            .service("cobros")
            .find({
                query: {
                    $limit: 50,
                    estado: "A depositar" || "depositado",
                    depositoDate: {
                        $gte: gte,
                        $lte: lte,
                    },
                    $total: true,
                },
            })
            .then((response: Total) => {
                setCobros(response.data[0].total);
            })
            .catch((error: FeathersErrorJSON) => {
                setCobros(0);
                setError(error.message);
            });
    }, [gte, lte]);

    useEffect(() => {
        loadPagos();
        feathersClient.service("pagos").on("created", () => loadPagos());
        feathersClient.service("pagos").on("patched", () => loadPagos());
        feathersClient.service("pagos").on("removed", () => loadPagos());
    }, [loadPagos]);

    useEffect(() => {
        loadCobros();
        feathersClient.service("cobros").on("created", () => loadCobros());
        feathersClient.service("cobros").on("patched", () => loadCobros());
        feathersClient.service("cobros").on("removed", () => loadCobros());
    }, [loadCobros]);

    return { pagos, cobros, error };
};

export default useTotal;
