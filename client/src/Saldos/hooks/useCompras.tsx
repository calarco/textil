import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type ComponentProps = {
    proveedoreId: number;
    sort: string;
};

const useCompras = ({ proveedoreId, sort }: ComponentProps) => {
    const [compras, setCompras] = useState<Compras>({
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
            .service("compras")
            .find({
                query: {
                    $limit: 50,
                    proveedoreId: proveedoreId,
                    $sort: {
                        [sort]: 1,
                    },
                },
            })
            .then((response: Compras) => {
                response.data[0]
                    ? setCompras(response)
                    : setError("No se encontraron compras");
                setLoading(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setLoading(false);
                setError(error.message);
            });
    }, [proveedoreId, sort]);

    useEffect(() => {
        loadData();
        feathersClient.service("compras").on("created", () => loadData());
        feathersClient.service("compras").on("patched", () => loadData());
        feathersClient.service("compras").on("removed", () => loadData());
    }, [loadData]);

    return { compras, loading, error };
};

export default useCompras;
