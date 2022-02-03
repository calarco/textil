import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type ComponentProps = {
    estado: string;
    sort: string;
};

const useCobros = ({ estado, sort }: ComponentProps) => {
    const [cobros, setCobros] = useState<Cobros>({
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
            .service("cobros")
            .find({
                query: {
                    $limit: 50,
                    estado: estado,
                    $sort: {
                        [sort]: 1,
                    },
                },
            })
            .then((response: Cobros) => {
                response.data[0]
                    ? setCobros(response)
                    : setError("No se encontraron cobros");
                setLoading(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, [estado, sort]);

    useEffect(() => {
        loadData();
        feathersClient.service("cobros").on("created", () => loadData());
        feathersClient.service("cobros").on("patched", () => loadData());
        feathersClient.service("cobros").on("removed", () => loadData());
    }, [loadData]);

    return { cobros, loading, error };
};

export default useCobros;
