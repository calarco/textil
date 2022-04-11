import { MouseEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { usePrecios } from "../hooks/preciosContext";
import { Form } from "components/Form";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";
import { ItemsInput } from "components/ItemsInput";

type ComponentProps = {
    precio?: Precio;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const PrecioForm = function ({ precio, isActive, close }: ComponentProps) {
    const { aumentos } = usePrecios();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<PrecioInputs>({
        defaultValues: {
            articulo: precio?.articulo,
            descripcion: precio?.descripcion,
            peso: precio?.peso,
            costo: precio?.costo?.toString().replace(/\./g, ","),
            aumentoId: precio?.aumentoId,
        },
    });
    const [items, setItems] = useState<Items>([]);

    const onSubmit: SubmitHandler<PrecioInputs> = (inputs) => {
        const payload = {
            articulo: inputs.articulo,
            descripcion: inputs.descripcion,
            peso: inputs.peso || null,
            costo: inputs.costo?.replace(/\./g, "").replace(/,/g, "."),
            costos: items,
            aumentoId: inputs.aumentoId || null,
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
        precio?.costos ? setItems(precio.costos) : setItems([]);
        reset();
    }, [isActive, precio, reset]);

    useEffect(() => {
        items[0]
            ? setValue(
                  "costo",
                  items
                      .reduce(function (a, b) {
                          return a + b.monto;
                      }, 0)
                      .toFixed(2)
                      .replace(/\./g, ",")
              )
            : setValue("costo", "");
    }, [items, setValue]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={6}
        >
            <Label title="articulo" error={errors.articulo?.message} length={1}>
                <input
                    type="number"
                    placeholder="-"
                    autoComplete="off"
                    {...register("articulo", {
                        required: "Ingrese el articulo",
                    })}
                />
            </Label>
            <Label
                title="descripcion"
                error={errors.descripcion?.message}
                length={3}
            >
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("descripcion", {
                        required: "Ingrese la descripcion",
                    })}
                />
            </Label>
            <Label title="peso" length={1}>
                kg
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("peso")}
                />
            </Label>
            <Label title="aumento" length={1}>
                <select {...register("aumentoId")}>
                    <option value={""}>-</option>
                    {aumentos[0] &&
                        aumentos.map((aumento) => (
                            <option key={aumento.id} value={aumento.id}>
                                {aumento.porcentage}
                            </option>
                        ))}
                </select>
            </Label>
            <Label
                title="costo"
                error={items[0] ? undefined : errors.costo?.message}
                length={1}
            >
                <CurrencyInput
                    name="costo"
                    control={control}
                    required={items[0] ? false : true}
                    disabled={items[0] ? true : false}
                />
            </Label>
            <ItemsInput items={items} setItems={setItems} length={5} />
        </Form>
    );
};

export default PrecioForm;
