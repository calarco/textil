import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import useSaldo from "hooks/useSaldo";
import Card from "components/Card";
import Expand from "components/Expand";
import ButtonsComponent from "components/Buttons";
import Currency from "components/Currency";
import Remove from "components/Remove";
import CuentaForm from "forms/CuentaForm";

const Box = styled.ul`
    height: 4.5rem;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto [end];
    gap: 1.5rem;
    align-items: center;
    text-align: left;

    > li:first-child {
        display: grid;
        gap: 0.5rem;

        p {
            color: var(--on-background-variant);
        }
    }

    > li:nth-child(2) {
        text-align: right;
    }
`;

const Buttons = styled(ButtonsComponent)`
    grid-row-start: 2;
`;

type ComponentProps = {
    service: "proveedores" | "clientes";
    cuenta: Cuenta;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function Cuenta({
    service,
    cuenta,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);
    const { saldo } = useSaldo({
        service: service === "clientes" ? "ventas" : "compras",
        id: cuenta.id,
    });

    useEffect(() => {
        !overlay && setForm(false);
    }, [overlay, setForm]);

    useEffect(() => {
        form && setOverlay(true);
    }, [form, setOverlay]);

    return (
        <Card
            isActive={isActive}
            isRemove={remove}
            isForm={form}
            className={className}
        >
            <Box onClick={onClick}>
                <li>
                    {cuenta.nombre}
                    <p>{cuenta.descripcion}</p>
                </li>
                <li>
                    <Currency number={saldo} />
                </li>
            </Box>
            <Expand isActive={isActive} height={3}>
                <Buttons>
                    <button type="button" onClick={() => setRemove(true)}>
                        Borrar
                    </button>
                    <button type="button" onClick={() => setForm(true)}>
                        Editar
                    </button>
                </Buttons>
            </Expand>
            {isActive && (
                <>
                    <Remove
                        id={cuenta.id}
                        service={service}
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <CuentaForm
                        service={service}
                        cuenta={cuenta}
                        isActive={form}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default Cuenta;
