import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useVentas = (clienteId: number) => {
    const [ventas, setVentas] = useState<Ventas>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service("ventas")
            .find({
                query: {
                    $limit: 50,
                    clienteId: clienteId,
                    $sort: {
                        updatedAt: 1,
                    },
                },
            })
            .then((response: Ventas) => {
                setVentas(response);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, [clienteId]);

    useEffect(() => {
        loadData();
        feathersClient.service("ventas").on("created", () => loadData());
        feathersClient.service("ventas").on("patched", () => loadData());
        feathersClient.service("ventas").on("removed", () => loadData());
    }, [loadData]);

    return { ventas, error };
};

export default useVentas;
