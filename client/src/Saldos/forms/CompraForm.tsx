import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { Form } from "components/Form";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";

type ComponentProps = {
    proveedoreId: number;
    compra?: Compra;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const VentaForm = function ({
    proveedoreId,
    compra,
    isActive,
    close,
}: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            fecha: compra?.fecha || new Date().toISOString().substring(0, 10),
            debe: compra?.debe
                ? compra.debe.toString().replace(/\./g, ",")
                : "",
            haber: compra?.haber
                ? compra.haber.toString().replace(/\./g, ",")
                : "",
            comprobante: compra?.comprobante || "",
            proveedoreId: compra?.proveedoreId || proveedoreId,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            fecha: inputs.fecha,
            debe: inputs.debe.replace(/\./g, "").replace(/,/g, ".") || 0,
            haber: inputs.haber.replace(/\./g, "").replace(/,/g, ".") || 0,
            comprobante: inputs.comprobante,
            proveedoreId: inputs.proveedoreId,
        };
        compra
            ? feathersClient
                  .service("compras")
                  .patch(compra.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("compras")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [isActive, compra, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={2}
        >
            <Label title="Fecha" error={errors.fecha?.message} length={1}>
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("fecha", {
                        required: "Ingrese la fecha",
                    })}
                />
            </Label>
            <Label title="Comprobante" length={1}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="Debe" error={errors.debe?.message} length={1}>
                $<CurrencyInput name="debe" control={control} />
            </Label>
            <Label title="Haber" error={errors.haber?.message} length={1}>
                $<CurrencyInput name="haber" control={control} />
            </Label>
        </Form>
    );
};

export default VentaForm;
