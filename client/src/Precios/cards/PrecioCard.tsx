import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import { usePrecios } from "../hooks/preciosContext";
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

    > li:nth-child(3) {
        pre {
            color: var(--on-background-variant);
        }
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
        padding: 0 0.5rem;
        border-radius: 4px;
        outline: var(--border-variant);
        display: grid;
        grid-template-rows: auto auto;
        gap: 0 1rem;
        justify-content: center;
    }
`;

const Label = styled.div`
    position: relative;
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-rows: auto auto;
    gap: 1px;
    text-align: center;

    &:not(:first-child)::after {
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
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function PrecioCard({
    precio,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const {
        fabrica: fabricaPorcentage,
        vendedor: vendedorPorcentage,
        venta: ventaPorcentage,
        signori: signoriPorcentage,
    } = usePrecios();
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
    }, [precio, setTotal]);

    useEffect(() => {
        setCosto((total * 181) / 100);
    }, [total, setCosto]);

    useEffect(() => {
        setFabrica((costo * fabricaPorcentage.porcentage) / 100);
    }, [costo, fabricaPorcentage, setFabrica]);

    useEffect(() => {
        setVendedor((fabrica * vendedorPorcentage.porcentage) / 100);
    }, [fabrica, vendedorPorcentage, setVendedor]);

    useEffect(() => {
        setVenta((vendedor * ventaPorcentage.porcentage) / 100);
    }, [vendedor, ventaPorcentage, setVenta]);

    useEffect(() => {
        setSignori((costo * signoriPorcentage.porcentage) / 100);
    }, [costo, signoriPorcentage, setSignori]);

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
                    <pre>%181</pre>
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
