import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";
import styled from "styled-components";

import Section from "components/Section";
import PagarForm from "forms/PagarForm";
import Pago from "cards/Pago";

const Header = styled.div`
    position: relative;
    height: 3rem;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;

    > select {
        padding: 0.5rem 1.5rem;
        text-transform: uppercase;
        font: var(--body2);
        color: var(--primary);
    }

    > button {
        color: var(--secondary);
    }
`;

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
    const [create, setCreate] = useState(false);
    const [active, setActive] = useState(0);
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
        <>
            <Header>
                <select>
                    <option value="A pagar">A pagar</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Recuperado">Recuperado</option>
                    <option value="Vencido">Vencido</option>
                </select>
                <button onClick={() => setCreate(true)}>Nuevo Pago</button>
                <PagarForm isActive={create} close={() => setCreate(false)} />
            </Header>
            <Section overlay={create} cancel={() => setCreate(false)}>
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
                        onClick={() =>
                            pago.id === active
                                ? setActive(0)
                                : setActive(pago.id)
                        }
                    />
                ))}
            </Section>
        </>
    );
}

export default Pagos;
