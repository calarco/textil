import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useCuentas = (service: string) => {
    const [cuentas, setCuentas] = useState<Cuentas>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service(service)
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        updatedAt: 1,
                    },
                },
            })
            .then((response: Cuentas) => {
                setLoading(false);
                response.data[0]
                    ? setCuentas(response)
                    : setError(`No se encontraron ${service}`);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, [service]);

    useEffect(() => {
        loadData();
        feathersClient.service(service).on("created", () => loadData());
        feathersClient.service(service).on("patched", () => loadData());
        feathersClient.service(service).on("removed", () => loadData());
    }, [service, loadData]);

    return { cuentas, loading, error };
};

export default useCuentas;
