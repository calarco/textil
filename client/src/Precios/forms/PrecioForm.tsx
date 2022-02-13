import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { Form } from "components/Form";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";

type ComponentProps = {
    precio?: Precio;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const PrecioForm = function ({ precio, isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            fecha: inputs.fecha,
            debe: inputs.debe.slice(1).replace(/\./g, "").replace(/,/g, "."),
            haber: inputs.haber.slice(1).replace(/\./g, "").replace(/,/g, "."),
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
            length={6}
        >
            <Label title="articulo" length={1}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="descripcion" length={4}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="kg" length={1}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="costo" error={errors.debe?.message} length={1}>
                <CurrencyInput name="debe" control={control} />
            </Label>
            <Label title="hilado" error={errors.debe?.message} length={1}>
                <CurrencyInput name="debe" control={control} />
            </Label>
            <Label title="tejido" error={errors.haber?.message} length={1}>
                <CurrencyInput name="haber" control={control} />
            </Label>
            <Label title="confeccion" error={errors.debe?.message} length={1}>
                <CurrencyInput name="debe" control={control} />
            </Label>
            <Label title="cierre" error={errors.haber?.message} length={1}>
                <CurrencyInput name="haber" control={control} />
            </Label>
            <Label title="fin" error={errors.haber?.message} length={1}>
                <CurrencyInput name="haber" control={control} />
            </Label>
        </Form>
    );
};

export default PrecioForm;
