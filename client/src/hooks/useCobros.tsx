import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useReparaciones = () => {
    const [cobros, setCobros] = useState<Cobros>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadCobros = useCallback(() => {
        feathersClient
            .service("cobros")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        pagoDate: 1,
                    },
                },
            })
            .then((data: Cobros) => {
                setCobros(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadCobros();
        feathersClient.service("cobros").on("created", () => loadCobros());
        feathersClient.service("cobros").on("patched", () => loadCobros());
        feathersClient.service("cobros").on("removed", () => loadCobros());
    }, [loadCobros]);

    return { cobros, error };
};

export default useReparaciones;
