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
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
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
                setCompras(response);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, [proveedoreId, sort]);

    useEffect(() => {
        loadData();
        feathersClient.service("compras").on("created", () => loadData());
        feathersClient.service("compras").on("patched", () => loadData());
        feathersClient.service("compras").on("removed", () => loadData());
    }, [loadData]);

    return { compras, error };
};

export default useCompras;
