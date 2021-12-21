import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useCobros = (estado: string) => {
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
                    estado: estado,
                    $sort: {
                        depositoDate: 1,
                    },
                },
            })
            .then((data: Cobros) => {
                setCobros(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, [estado]);

    useEffect(() => {
        loadCobros();
        feathersClient.service("cobros").on("created", () => loadCobros());
        feathersClient.service("cobros").on("patched", () => loadCobros());
        feathersClient.service("cobros").on("removed", () => loadCobros());
    }, [loadCobros]);

    return { cobros, error };
};

export default useCobros;
