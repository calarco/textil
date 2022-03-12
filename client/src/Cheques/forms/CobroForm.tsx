import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import feathersClient from "feathersClient";
import styled from "styled-components";

import { useCheques } from "../hooks/chequesContext";
import { Form } from "components/Form";
import { Expand } from "components/Expand";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";
import { Select } from "components/Select";

const ExpandMod = styled(Expand)`
    grid-column-end: span 7;
    gap: inherit;
    grid-template-columns: inherit;
`;

type ComponentProps = {
    cobro?: Cobro;
    isActive: boolean;
    close: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CobroForm = function ({ cobro, isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<CobroInputs>({
        defaultValues: {
            librador: "",
            banco: "",
            destinatario: "",
            depositoDate: cobro?.depositoDate,
            monto: cobro?.monto
                ? cobro.monto.toString().replace(/\./g, ",")
                : "",
            libradoreId: cobro?.libradoreId || 0,
            emisionDate:
                cobro?.emisionDate || new Date().toISOString().substring(0, 10),
            bancoId: cobro?.bancoId || 0,
            numero: cobro?.numero || "",
            titular: cobro?.titular || "",
            cuit: cobro?.cuit || "",
            observaciones: cobro?.observaciones || "",
            estado: cobro?.estado || "A depositar",
            salidaDate: cobro?.salidaDate,
            destinatarioId: cobro?.destinatarioId,
        },
    });
    const { libradores, destinatarios, bancos } = useCheques();

    const onSubmit: SubmitHandler<CobroInputs> = (inputs) => {
        const payload = {
            depositoDate: inputs.depositoDate,
            monto: inputs.monto?.replace(/\./g, "").replace(/,/g, "."),
            libradoreId: inputs.libradoreId,
            emisionDate: inputs.emisionDate,
            bancoId: inputs.bancoId,
            numero: inputs.numero,
            titular: inputs.titular,
            cuit: inputs.cuit,
            observaciones: inputs.observaciones,
            estado: inputs.estado,
            salidaDate: inputs.salidaDate,
            destinatarioId: inputs.destinatarioId,
        };
        cobro
            ? feathersClient
                  .service("cobros")
                  .patch(cobro.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("cobros")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [cobro, isActive, reset]);

    return (
        <Form
            isActive={isActive}
            onSubmit={handleSubmit(onSubmit)}
            close={close}
            length={7}
        >
            <Label title="Estado" length={2}>
                <select {...register("estado")}>
                    <option value="A depositar">A depositar</option>
                    <option value="Depositado">Depositado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Posdatado">Posdatado</option>
                    <option value="Endosado">Endosado</option>
                    <option value="Devuelto">Devuelto</option>
                    <option value="Falla tecnica">Falla tecnica</option>
                    <option value="Rechazado">Rechazado</option>
                </select>
            </Label>
            <Select
                nameId="libradoreId"
                name="librador"
                nameService="libradores"
                list={libradores}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.libradoreId?.message}
                length={3}
            />
            <Label title="Monto" error={errors.monto?.message} length={2}>
                <CurrencyInput name="monto" control={control} required />
            </Label>
            <ExpandMod
                isActive={
                    watch("estado") === "Endosado" ||
                    watch("estado") === "Posdatado"
                }
                height={5}
            >
                <Label
                    title="Fecha de salida"
                    error={errors.salidaDate?.message}
                    length={2}
                >
                    <input
                        type="date"
                        autoComplete="off"
                        {...register("salidaDate", {
                            required:
                                watch("estado") === "Endosado" ||
                                watch("estado") === "Posdatado"
                                    ? "Ingrese la fecha de salida"
                                    : undefined,
                        })}
                    />
                </Label>
                <Select
                    nameId="destinatarioId"
                    name="destinatario"
                    nameService="destinatarios"
                    list={destinatarios}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    length={5}
                    error={errors.destinatarioId?.message}
                    disabled={watch("estado") === "Posdatado"}
                />
            </ExpandMod>
            <Label
                title="Fecha de deposito"
                error={errors.depositoDate?.message}
                length={2}
            >
                <input
                    type="date"
                    autoComplete="off"
                    {...register("depositoDate", {
                        required: "Ingrese la fecha de deposito",
                    })}
                />
            </Label>
            <Label
                title="Numero de cheque"
                error={errors.numero?.message}
                length={3}
            >
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("numero", {
                        required: "Ingrese el numero de cheque",
                    })}
                />
            </Label>
            <Label
                title="Fecha de emision"
                error={errors.emisionDate?.message}
                length={2}
            >
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("emisionDate", {
                        required: "Ingrese la fecha de emision",
                    })}
                />
            </Label>
            <Select
                nameId="bancoId"
                name="banco"
                nameService="bancos"
                list={bancos}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.bancoId?.message}
                length={2}
            />
            <Label
                title="Titular del cheque"
                error={errors.titular?.message}
                length={3}
            >
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("titular", { required: "Ingrese el titular" })}
                />
            </Label>
            <Label title="CUIT" error={errors.cuit?.message} length={2}>
                <Controller
                    name={"cuit"}
                    control={control}
                    rules={{ required: "Ingrese el CUIT" }}
                    render={({ field }) => (
                        <MaskedInput
                            mask={[
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                            ]}
                            guide={false}
                            type="text"
                            inputMode="numeric"
                            placeholder="-"
                            autoComplete="off"
                            {...field}
                        />
                    )}
                />
            </Label>
            <Label title="Observaciones" length={7}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("observaciones")}
                />
            </Label>
        </Form>
    );
};

export default CobroForm;
