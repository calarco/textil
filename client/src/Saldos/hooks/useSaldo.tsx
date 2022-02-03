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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSaldo = useCallback(() => {
        setLoading(true);
        setError("");
        feathersClient
            .service(service)
            .find({
                query:
                    gte && lte
                        ? {
                              $limit: 50,
                              fecha: {
                                  $gte: gte,
                                  $lte: lte,
                              },
                              $saldo: true,
                          }
                        : {
                              $limit: 50,
                              [service === "compras"
                                  ? "proveedoreId"
                                  : "clienteId"]: id,
                              $saldo: true,
                          },
            })
            .then((response: Saldo) => {
                response.data[0]
                    ? setSaldo(response.data[0].debe - response.data[0].haber)
                    : setSaldo(0);
                setLoading(false);
            })
            .catch((error: FeathersErrorJSON) => {
                setSaldo(0);
                setLoading(false);
                setError(error.message);
            });
    }, [service, id, gte, lte]);

    useEffect(() => {
        loadSaldo();
        feathersClient.service(service).on("created", () => loadSaldo());
        feathersClient.service(service).on("patched", () => loadSaldo());
        feathersClient.service(service).on("removed", () => loadSaldo());
    }, [service, loadSaldo]);

    return { saldo, loading, error };
};

export default useSaldo;
