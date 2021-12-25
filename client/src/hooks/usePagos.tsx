import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const usePagos = (estado: string) => {
    const [pagos, setPagos] = useState<Pagos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service("pagos")
            .find({
                query: {
                    $limit: 50,
                    estado: estado,
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
    }, [estado]);

    useEffect(() => {
        loadData();
        feathersClient.service("pagos").on("created", () => loadData());
        feathersClient.service("pagos").on("patched", () => loadData());
        feathersClient.service("pagos").on("removed", () => loadData());
    }, [loadData]);

    return { pagos, error };
};

export default usePagos;
