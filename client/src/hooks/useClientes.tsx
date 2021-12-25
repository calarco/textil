import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useClientes = () => {
    const [clientes, setClientes] = useState<Clientes>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service("clientes")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((data: Clientes) => {
                setClientes(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadData();
        feathersClient.service("clientes").on("created", () => loadData());
        feathersClient.service("clientes").on("patched", () => loadData());
        feathersClient.service("clientes").on("removed", () => loadData());
    }, [loadData]);

    return { clientes, error };
};

export default useClientes;
