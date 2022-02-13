import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { Form } from "components/Form";
import { Label } from "components/Label";

type ComponentProps = {
    service: string;
    cuenta?: Cuenta;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CuentaForm = function ({
    service,
    cuenta,
    isActive,
    close,
}: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            nombre: cuenta?.nombre || "",
            descripcion: cuenta?.descripcion || "",
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            nombre: inputs.nombre,
            descripcion: inputs.descripcion,
        };
        cuenta
            ? feathersClient
                  .service(service)
                  .patch(cuenta.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service(service)
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [isActive, cuenta, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Label title="Nombre" error={errors.nombre?.message}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("nombre", {
                        required: "Ingrese el nombre",
                    })}
                />
            </Label>
            <Label title="Descripcion">
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("descripcion")}
                />
            </Label>
        </Form>
    );
};

export default CuentaForm;
