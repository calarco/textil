import { useState } from "react";
import styled, { css } from "styled-components";

import PrecioForm from "./forms/PrecioForm";

const Container = styled.div`
    position: relative;
    height: 6.25rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
`;

const Columns = styled.div`
    border-top: var(--border-variant);
    display: grid;
    grid-template-columns: 5rem 1fr 10rem 10rem 10rem 10rem 10rem;
    gap: 1px;
`;

const Columns1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 10rem 10rem 10rem 10rem 10rem;
    gap: 1px;
`;

const New = styled.div`
    position: relative;
    border-radius: 0 4px 0 0;
    overflow: clip;
    padding: 0 0.5rem;
    display: grid;
    align-items: center;

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: 0;
        height: 2rem;
        //border-left: var(--border-variant);
    }

    button {
        color: var(--secondary);
        background: var(--secondary-variant);
        box-shadow: var(--shadow-variant);

        &:hover {
            background: var(--primary-variant);
        }
    }
`;

type Props = {
    readonly isActive?: boolean;
};

const Sort = styled.div<Props>`
    position: relative;
    padding: 0.75rem 1rem;
    font: var(--label);
    color: var(--on-background-variant);
    text-align: center;
    transition: 0.15s ease-in;

    &:hover {
        cursor: pointer;
        background-color: var(--primary-variant);
    }

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            color: var(--secondary);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

const Sort1 = styled.div`
    position: relative;
    padding: 0 1rem;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 4.5rem;
    gap: 0.5rem;
    transition: 0.15s ease-in;

    input {
        text-align: right;
        font-family: var(--font-family-alt);
    }
`;

type ComponentProps = {
    sort: string;
    setSort: (sort: string) => void;
};

function GestionHeader({ sort, setSort }: ComponentProps) {
    const [create, setCreate] = useState(false);

    return (
        <Container>
            <Columns1>
                <New>
                    <button onClick={() => setCreate(true)}>Nuevo</button>
                </New>
                <Sort1>
                    <label>%</label>
                    <input type="number" value={188} />
                </Sort1>
                <Sort1>
                    <label>%</label>
                    <input type="number" value={151} />
                </Sort1>
                <Sort1>
                    <label>%</label>
                    <input type="number" value={104} />
                </Sort1>
                <Sort1>
                    <label>%</label>
                    <input type="number" value={85} />
                </Sort1>
                <Sort1>
                    <label>%</label>
                    <input type="number" value={168} />
                </Sort1>
            </Columns1>
            <Columns>
                <Sort
                    isActive={sort === "depositoDate"}
                    onClick={() => setSort("depositoDate")}
                >
                    Articulo
                </Sort>
                <Sort
                    isActive={sort === "libradoreId"}
                    onClick={() => setSort("libradoreId")}
                >
                    Descripcion
                </Sort>
                <Sort
                    isActive={sort === "monto"}
                    onClick={() => setSort("monto")}
                >
                    Costo
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    Fabrica
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    Vendedor
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    Venta
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    Signori
                </Sort>
            </Columns>
            <PrecioForm isActive={create} close={() => setCreate(false)} />
        </Container>
    );
}

export default GestionHeader;
