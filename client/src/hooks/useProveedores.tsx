import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

const useProveedores = () => {
    const [proveedores, setProveedores] = useState<Proveedores>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });
    const [error, setError] = useState("");

    const loadData = useCallback(() => {
        feathersClient
            .service("proveedores")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        nombre: 1,
                    },
                },
            })
            .then((data: Proveedores) => {
                setProveedores(data);
            })
            .catch((error: FeathersErrorJSON) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        loadData();
        feathersClient.service("proveedores").on("created", () => loadData());
        feathersClient.service("proveedores").on("patched", () => loadData());
        feathersClient.service("proveedores").on("removed", () => loadData());
    }, [loadData]);

    return { proveedores, error };
};

export default useProveedores;
