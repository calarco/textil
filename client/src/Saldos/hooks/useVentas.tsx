import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type ComponentProps = {
    clienteId: number;
    sort: string;
};

const useVentas = ({ clienteId, sort }: ComponentProps) => {
    const [ventas, setVentas] = useState<Ventas>({
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
            .service("ventas")
            .find({
                query: {
                    $limit: 50,
                    clienteId: clienteId,
                    $sort: {
                        [sort]: 1,
                    },
                },
            })
            .then((response: Ventas) => {
                response.data[0]
                    ? setVentas(response)
                    : setError("No se encontraron ventas");
                setLoading(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setLoading(false);
                setError(error.message);
            });
    }, [clienteId, sort]);

    useEffect(() => {
        loadData();
        feathersClient.service("ventas").on("created", () => loadData());
        feathersClient.service("ventas").on("patched", () => loadData());
        feathersClient.service("ventas").on("removed", () => loadData());
    }, [loadData]);

    return { ventas, loading, error };
};

export default useVentas;
