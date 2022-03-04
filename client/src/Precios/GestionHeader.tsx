import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { Overlay } from "components/Overlay";
import PrecioForm from "./forms/PrecioForm";
import AumentosForm from "./forms/AumentosForm";

const Container = styled.div`
    position: relative;
    height: 6.25rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
`;

const Columns1 = styled.div`
    height: 100%;
    padding: 0 0.75rem;
    display: grid;
    grid-template-columns: 6fr 3fr 8fr;
    gap: 1px;
    align-items: center;
`;

const New = styled.div`
    padding: 0 0.75rem 0 0;
    position: relative;
    display: grid;
    align-items: center;

    button {
        color: var(--secondary);
        background: var(--secondary-variant);
        box-shadow: var(--shadow-variant);

        &:hover {
            background: var(--primary-variant);
        }
    }
`;

const Columns2 = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 4fr 4fr 4fr 4fr;
    gap: 1px;
`;

const Sort1 = styled.div`
    position: relative;
    padding: 0 1rem;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-auto-flow: column;
    gap: 0.5rem;
    transition: 0.15s ease-in;

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }
`;

const Costo = styled.div`
    position: relative;
    padding: 0 1rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    transition: 0.15s ease-in;

    select {
        width: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }
`;

const Columns = styled.div`
    padding: 0 0.75rem;
    display: grid;
    grid-template-columns: 1fr 5fr 3fr 2fr 2fr 2fr 2fr [end];
    gap: 1px;
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

type ComponentProps = {
    columns: Column[];
    setColumns: (columns: Column[]) => void;
    sort: string;
    setSort: (sort: string) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function GestionHeader({
    columns,
    sort,
    setSort,
    overlay,
    setOverlay,
}: ComponentProps) {
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        !overlay && setCreate(false);
        !overlay && setEdit(false);
    }, [overlay, setCreate, setEdit]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        edit && setOverlay(true);
    }, [edit, setOverlay]);

    return (
        <Container>
            <Columns1>
                <New>
                    <button onClick={() => setCreate(true)}>Nuevo</button>
                </New>
                <Costo>
                    <button onClick={() => setEdit(true)}>Editar</button>
                    <select>
                        <option>Filtrar</option>
                        <option>%{columns[0].porcentage}</option>
                        <option>%104</option>
                    </select>
                </Costo>
                <Columns2>
                    <Sort1>
                        <pre>% {columns[1].porcentage}</pre>
                        <label>x costo</label>
                    </Sort1>
                    <Sort1>
                        <pre>% {columns[2].porcentage}</pre>
                        <label>x fabrica</label>
                    </Sort1>
                    <Sort1>
                        <pre>% {columns[3].porcentage}</pre>
                        <label>x vendedor</label>
                    </Sort1>
                    <Sort1>
                        <pre>% {columns[4].porcentage}</pre>
                        <label>x costo</label>
                    </Sort1>
                    <AumentosForm
                        isActive={edit}
                        close={() => setOverlay(false)}
                    />
                </Columns2>
            </Columns1>
            <Columns>
                <Sort
                    isActive={sort === "articulo"}
                    onClick={() => setSort("articulo")}
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
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    {columns[0].nombre}
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    {columns[1].nombre}
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    {columns[2].nombre}
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    {columns[3].nombre}
                </Sort>
                <Sort
                    isActive={sort === "monto"}
                    onClick={() => setSort("monto")}
                >
                    {columns[4].nombre}
                </Sort>
            </Columns>
            <PrecioForm isActive={create} close={() => setOverlay(false)} />
            <Overlay overlay={overlay} cancel={() => setOverlay(false)} />
        </Container>
    );
}

export default GestionHeader;
