import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useBancos = () => {
    const [bancos, setBancos] = useState<Clientes>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service("bancos")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((data: Bancos) => {
                setBancos(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadData();
        feathersClient.service("bancos").on("created", () => loadData());
        feathersClient.service("bancos").on("patched", () => loadData());
        feathersClient.service("bancos").on("removed", () => loadData());
    }, [loadData]);

    return { bancos, error };
};

export default useBancos;
