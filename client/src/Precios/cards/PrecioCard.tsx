import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import { Card } from "components/Card";
import { Expand } from "components/Expand";
import { Details } from "components/Details";
import { Buttons } from "components/Buttons";
import { Remove } from "components/Remove";
import { Currency } from "components/Currency";
import PrecioForm from "../forms/PrecioForm";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 2fr 2fr 2fr 2fr 2fr [end];
    gap: 1px;
    align-items: center;
    text-align: center;

    > li {
        position: relative;
    }

    > li:nth-child(3),
    > li:nth-child(4),
    > li:nth-child(5),
    > li:nth-child(6),
    > li:nth-child(7),
    > li:nth-child(8) {
        text-align: right;
        padding: 0 1rem;
    }

    > li:nth-child(3)::after,
    > li:nth-child(5)::after,
    > li:nth-child(6)::after,
    > li:nth-child(7)::after,
    > li:nth-child(8)::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: -1px;
        border-left: var(--border-variant);
    }
`;

const DetailsMod = styled(Details)`
    grid-template-columns: 9fr 2fr 2fr 2fr 2fr [end];
    grid-auto-flow: row;
    align-items: start;
    border-top: none;
`;

const Items = styled.div`
    position: relative;
    padding: 0.5rem 1rem;
    border-top: var(--border-variant);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    gap: 0.5rem;

    > label {
        position: relative;
        padding: 0.5rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        justify-content: center;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: 0.25rem;
            bottom: 0.25rem;
            left: -0.75rem;
            border-left: var(--border-variant);
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 0.75rem;
        bottom: 0.75rem;
        right: -1px;
        border-left: var(--border-variant);
    }
`;

const Label = styled.div`
    position: relative;
    padding: 0 1rem;
    display: grid;
    grid-template-rows: auto auto;
    gap: 1px;
    text-align: center;

    &:not(:nth-child(2))::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        border-left: var(--border-variant);
    }
`;

const ButtonsMod = styled(Buttons)`
    grid-row-start: 2;
`;

type ComponentProps = {
    precio: Precio;
    columns: Column[];
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function PrecioCard({
    precio,
    columns,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [total, setTotal] = useState(0);
    const [costo, setCosto] = useState(0);
    const [fabrica, setFabrica] = useState(0);
    const [vendedor, setVendedor] = useState(0);
    const [venta, setVenta] = useState(0);
    const [signori, setSignori] = useState(0);
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);

    useEffect(() => {
        precio.costos &&
            setTotal(
                precio.costos.reduce(function (a, b) {
                    return a + b.monto;
                }, 0)
            );
    }, [precio, columns, setTotal]);

    useEffect(() => {
        setCosto((total * columns[0].porcentage) / 100);
    }, [total, columns, setCosto]);

    useEffect(() => {
        setFabrica((costo * columns[1].porcentage) / 100);
    }, [costo, columns, setFabrica]);

    useEffect(() => {
        setVendedor((fabrica * columns[2].porcentage) / 100);
    }, [fabrica, columns, setVendedor]);

    useEffect(() => {
        setVenta((vendedor * columns[3].porcentage) / 100);
    }, [vendedor, columns, setVenta]);

    useEffect(() => {
        setSignori((costo * columns[4].porcentage) / 100);
    }, [costo, columns, setSignori]);

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
                    <pre>{precio.articulo}</pre>
                </li>
                <li>
                    <p>
                        {precio.descripcion}
                        <small>{precio.peso} kg</small>
                    </p>
                </li>
                <li>
                    <pre>%{columns[0].porcentage}</pre>
                </li>
                <li>
                    <Currency number={total} />
                </li>
                <li>
                    <Currency number={fabrica} />
                </li>
                <li>
                    <Currency number={vendedor} />
                </li>
                <li>
                    <Currency number={venta} />
                </li>
                <li>
                    <Currency number={signori} integer />
                </li>
            </Box>
            <Expand isActive={isActive} height={8.5}>
                <DetailsMod>
                    <Items>
                        {precio.costos &&
                            precio.costos.map((costo) => (
                                <label key={0}>
                                    {costo.detalle}
                                    <Currency number={costo.monto} />
                                </label>
                            ))}
                    </Items>
                    <Label>
                        <label>Ganancia</label>
                        <Currency number={fabrica - costo} />
                    </Label>
                    <Label>
                        <label>Ganancia</label>
                        <Currency number={venta - costo} />
                    </Label>
                    <Label>
                        <label>Inversion</label>
                        <Currency number={fabrica - venta} />
                    </Label>
                    <Label>
                        <label>Sin comision</label>
                        <Currency number={signori * 0.8} integer />
                    </Label>
                </DetailsMod>
                <ButtonsMod>
                    <button type="button" onClick={() => setRemove(true)}>
                        Borrar
                    </button>
                    <button type="button" onClick={() => setForm(true)}>
                        Editar
                    </button>
                </ButtonsMod>
            </Expand>
            {isActive && (
                <>
                    <Remove
                        id={precio.id}
                        service="precios"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <PrecioForm
                        precio={precio}
                        isActive={form}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default PrecioCard;
