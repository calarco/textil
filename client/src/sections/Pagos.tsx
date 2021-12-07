import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";
import styled from "styled-components";

import Section from "components/Section";
import Pago from "cards/Pago";

const Columns = styled.div`
    padding: 0.25rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.5rem;

    label {
        position: relative;
        text-align: center;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -0.75rem;
            height: 2rem;
            border-left: 1px solid var(--primary-variant);
        }
    }
`;

function Pagos() {
    const [active, setActive] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [pagos, setPagos] = useState<Pagos>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [
            {
                id: 0,
                pagoDate: "",
                proveedor: "",
                numero: "",
                monto: "",
                emisionDate: "",
                observaciones: "",
                estado: "",
                createdAt: "",
                updatedAt: "",
            },
        ],
    });

    const loadPagos = useCallback(() => {
        feathersClient
            .service("pagos")
            .find({
                query: {
                    $limit: 50,
                    estado: "A pagar",
                    $sort: {
                        pagoDate: 1,
                    },
                },
            })
            .then((data: Pagos) => {
                setPagos(data);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        loadPagos();
        feathersClient.service("pagos").on("created", () => loadPagos());
        feathersClient.service("pagos").on("removed", () => loadPagos());
    }, [loadPagos]);

    return (
        <Section
            overlay={overlay}
            cancel={() => {
                setOverlay(false);
            }}
        >
            <Columns>
                <label>Fecha de pago</label>
                <label>Proveedor</label>
                <label>Monto</label>
                <label>Fecha de emision</label>
            </Columns>
            {pagos.data.map((pago) => (
                <Pago
                    key={pago.id}
                    pago={pago}
                    isActive={pago.id === active}
                    setOverlay={setOverlay}
                    onClick={() =>
                        pago.id === active ? setActive(0) : setActive(pago.id)
                    }
                />
            ))}
        </Section>
    );
}

export default Pagos;
