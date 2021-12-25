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

    const loadData = useCallback(() => {
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
        loadData();
        feathersClient.service("cobros").on("created", () => loadData());
        feathersClient.service("cobros").on("patched", () => loadData());
        feathersClient.service("cobros").on("removed", () => loadData());
    }, [loadData]);

    return { cobros, error };
};

export default useCobros;
