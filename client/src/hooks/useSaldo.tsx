import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";

type HookProps = {
    service: "compras" | "ventas";
    id?: number;
    gte?: string;
    lte?: string;
};

const useSaldo = ({ service, id, gte, lte }: HookProps) => {
    const [saldo, setSaldo] = useState(0);
    const [error, setError] = useState("");

    const loadSaldo = useCallback(() => {
        feathersClient
            .service(service)
            .find({
                query: {
                    $limit: 50,
                    [service === "compras" ? "proveedoreId" : "clienteId"]: id,
                    fecha: {
                        $gte: gte,
                        $lte: lte,
                    },
                    $saldo: true,
                },
            })
            .then((response: Saldo) => {
                setSaldo(response.data[0].debe - response.data[0].haber);
            })
            .catch((error: FeathersErrorJSON) => {
                setSaldo(0);
                setError(error.message);
            });
    }, [service, id, gte, lte]);

    useEffect(() => {
        loadSaldo();
        feathersClient.service(service).on("created", () => loadSaldo());
        feathersClient.service(service).on("patched", () => loadSaldo());
        feathersClient.service(service).on("removed", () => loadSaldo());
    }, [service, loadSaldo]);

    return { saldo, error };
};

export default useSaldo;
