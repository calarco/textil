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
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
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
            .then((data: Cobros) => {
                setCobros(data);
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

    return { cobros, error };
};

export default useCobros;
