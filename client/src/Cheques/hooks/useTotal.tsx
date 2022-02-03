import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type HookProps = {
    gte: string;
    lte: string;
};

const useTotal = ({ gte, lte }: HookProps) => {
    const [pagos, setPagos] = useState(0);
    const [cobros, setCobros] = useState(0);
    const [loadingPagos, setLoadingPagos] = useState(true);
    const [loadingCobros, setLoadingCobros] = useState(true);
    const [error, setError] = useState("");

    const loadPagos = useCallback(() => {
        setLoadingPagos(true);
        setError("");
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
                response.data[0]
                    ? setPagos(response.data[0].total)
                    : setPagos(0);
                setLoadingPagos(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setPagos(0);
                setLoadingPagos(false);
                setError(error.message);
            });
    }, [gte, lte]);

    const loadCobros = useCallback(() => {
        setLoadingCobros(true);
        setError("");
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
                response.data[0]
                    ? setCobros(response.data[0].total)
                    : setCobros(0);
                setLoadingCobros(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setCobros(0);
                setLoadingCobros(false);
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

    return { pagos, cobros, loadingPagos, loadingCobros, error };
};

export default useTotal;
