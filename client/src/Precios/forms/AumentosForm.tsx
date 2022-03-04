import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { Form } from "components/Form";
import { Label } from "components/Label";

type ComponentProps = {
    precio?: Precio;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const AumentosForm = function ({ precio, isActive, close }: ComponentProps) {
    const { register, handleSubmit, reset } = useForm<Inputs>({
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            fecha: inputs.fecha,
            debe: inputs.debe.replace(/\./g, "").replace(/,/g, "."),
            haber: inputs.haber.replace(/\./g, "").replace(/,/g, "."),
            comprobante: inputs.comprobante,
            proveedoreId: inputs.proveedoreId,
        };
        precio
            ? feathersClient
                  .service("precios")
                  .patch(precio.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("precios")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [isActive, precio, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={8}
        >
            <Label title="fabrica" length={2}>
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="vendedor" length={2}>
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="venta" length={2}>
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="signori" length={2}>
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="aumentos" length={8}>
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
                %
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
        </Form>
    );
};

export default AumentosForm;
