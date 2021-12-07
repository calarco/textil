import { useState, useEffect, useCallback } from "react";
import feathersClient from "feathersClient";
import styled from "styled-components";

import Section from "components/Section";
import Cobro from "cards/Cobro";

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

function Cobros() {
    const [active, setActive] = useState(0);
    const [cobros, setCobros] = useState<Cobros>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [
            {
                id: 1,
                ingresoDate: "2021-10-5",
                cliente: "Otranto",
                numero: "89033577",
                monto: "53.000,00",
                depositoDate: "2021-12-31",
                banco: "Nacion",
                titular: "Seuoaeu Eueoaeu",
                cuit: "5432452345",
                observaciones: "",
                estado: "A Cobrar",
                createdAt: "",
                updatedAt: "",
            },
        ],
    });

    const loadPagos = useCallback(() => {
        feathersClient
            .service("cobros")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        pagoDate: 1,
                    },
                },
            })
            .then((data: Cobros) => {
                setCobros(data);
            })
            .catch((error: FeathersErrorJSON) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        loadPagos();
        feathersClient.service("cobros").on("created", () => loadPagos());
        feathersClient.service("cobros").on("removed", () => loadPagos());
    }, [loadPagos]);

    return (
        <Section overlay={false} cancel={() => {}}>
            <Columns>
                <label>Fecha de deposito</label>
                <label>Cliente</label>
                <label>Monto</label>
                <label>Fecha de ingreso</label>
            </Columns>
            {cobros.data.map((cobro) => (
                <Cobro
                    key={cobro.id}
                    cobro={cobro}
                    isActive={cobro.id === active}
                    onClick={() =>
                        cobro.id === active ? setActive(0) : setActive(cobro.id)
                    }
                />
            ))}
        </Section>
    );
}

export default Cobros;
