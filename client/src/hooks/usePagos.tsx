import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useReparaciones = () => {
    const [pagos, setPagos] = useState<Pagos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadPagos = useCallback(() => {
        feathersClient
            .service("pagos")
            .find({
                query: {
                    $limit: 50,
                    estado: "A pagar",
                    $sort: {
                        pagoDate: 1,
                    },
                },
            })
            .then((data: Pagos) => {
                setPagos(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadPagos();
        feathersClient.service("pagos").on("created", () => loadPagos());
        feathersClient.service("pagos").on("patched", () => loadPagos());
        feathersClient.service("pagos").on("removed", () => loadPagos());
    }, [loadPagos]);

    return { pagos, error };
};

export default useReparaciones;
