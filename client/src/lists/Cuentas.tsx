import { useState, useEffect } from "react";
import styled from "styled-components";

import useCuentas from "hooks/useCuentas";
import List from "components/List";
import Create from "components/Create";
import Cuenta from "cards/Cuenta";
import CuentaForm from "forms/CuentaForm";

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    service: "proveedores" | "clientes";
    cuentaId: number;
    setCuentaId: (cuentaId: number) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function Cuentas({
    service,
    cuentaId,
    setCuentaId,
    overlay,
    setOverlay,
}: ComponentProps) {
    const [create, setCreate] = useState(false);
    const { cuentas } = useCuentas(service);

    useEffect(() => {
        !overlay && setCreate(false);
    }, [overlay, setCreate]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        setOverlay(false);
        cuentas.data[0] && setCuentaId(cuentas.data[0].id);
    }, [cuentas, setOverlay, setCuentaId]);

    return (
        <List switchOn={service}>
            <Create isActive={create} onClick={() => setCreate(true)}>
                <CuentaForm
                    service={service}
                    isActive={create}
                    close={() => setOverlay(false)}
                />
            </Create>
            {cuentas.data[0] ? (
                cuentas.data[0].id !== 0 &&
                cuentas.data.map((cuenta) => (
                    <Cuenta
                        key={cuenta.id}
                        service={service}
                        cuenta={cuenta}
                        isActive={cuentaId === cuenta.id}
                        overlay={overlay}
                        setOverlay={setOverlay}
                        onClick={() => setCuentaId(cuenta.id)}
                    />
                ))
            ) : (
                <Empty>No se encontraron {service}</Empty>
            )}
        </List>
    );
}

export default Cuentas;
