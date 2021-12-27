import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import {
    UseFormRegister,
    UseFormWatch,
    UseFormSetValue,
} from "react-hook-form";
import feathersClient from "feathersClient";

import Label from "components/Label";

type Props = {
    isSelected?: boolean;
};

const Input = styled.input<Props>`
    ${(props) =>
        props.isSelected &&
        css`
            &::placeholder {
                color: var(--on-background);
            }
        `};
`;

const Button = transition.button.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    position: absolute;
    bottom: calc(0.75rem + 1px);
    right: 1rem;
    padding: 0.25rem 0.5rem;
    border: none;

    &:enter {
        opacity: 0;
        transform: translateX(1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.2s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transform: translateX(1rem);
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    nameId: "proveedoreId" | "clienteId" | "bancoId";
    name: "proveedor" | "cliente" | "banco";
    nameService: "proveedores" | "clientes" | "bancos";
    list: Proveedores | Clientes | Bancos;
    register: UseFormRegister<Inputs>;
    watch: UseFormWatch<Inputs>;
    setValue: UseFormSetValue<Inputs>;
    length?: number;
    error?: string;
    className?: string;
};

const Select = function ({
    nameId,
    name,
    nameService,
    list,
    register,
    watch,
    setValue,
    length,
    error,
    className,
}: ComponentProps) {
    const nodeRef = useRef(null);
    const watchId = watch(nameId);
    const watchName = watch(name);
    const [selected, setSelected] = useState("");

    const create = () => {
        feathersClient
            .service(nameService)
            .create({
                nombre: watchName,
            })
            .then(() => {})
            .catch((error: FeathersErrorJSON) => {
                console.error(error.message);
            });
    };

    useEffect(() => {
        try {
            setSelected(list.data.find(({ id }) => id === watchId)!.nombre);
        } catch {
            setSelected("");
        }
    }, [watchId, list.data]);

    useEffect(() => {
        try {
            setValue(
                nameId,
                list.data.find(({ nombre }) => nombre === watchName)!.id
            );
        } catch {}
    }, [nameId, watchName, list.data, setValue]);

    return (
        <Label
            title={name}
            length={length}
            error={error}
            onBlur={() => watchName === selected && setValue(name, "")}
            className={className}
        >
            <input
                type="hidden"
                {...register(nameId, {
                    validate: (id) => id !== 0 || `Seleccione un ${name}`,
                })}
            />
            <Input
                list={name}
                isSelected={selected !== "" ? true : false}
                placeholder={selected || "-"}
                autoComplete="off"
                {...register(name)}
            />
            <datalist id={name}>
                {list.data.map((item) => (
                    <option key={item.id} value={item.nombre}>
                        {item.nombre}
                    </option>
                ))}
            </datalist>
            <Button
                nodeRef={nodeRef}
                ref={nodeRef}
                in={watchName !== "" && watchName !== selected}
                type="button"
                onClick={() => create()}
            >
                Crear
            </Button>
        </Label>
    );
};

export default Select;
