import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const usePrecios = () => {
    const [precios, setPrecios] = useState<Precios>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        setLoading(true);
        setError("");
        feathersClient
            .service("precios")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        articulo: 1,
                    },
                },
            })
            .then((response: Precios) => {
                response.data[0]
                    ? setPrecios(response)
                    : setError("No se encontraron precios");
                setLoading(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setLoading(false);
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadData();
        feathersClient.service("precios").on("created", () => loadData());
        feathersClient.service("precios").on("patched", () => loadData());
        feathersClient.service("precios").on("removed", () => loadData());
    }, [loadData]);

    return { precios, loading, error };
};

export default usePrecios;
