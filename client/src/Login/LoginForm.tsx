import { FormEvent, ChangeEvent, useState } from "react";
import feathersClient from "feathersClient";
import styled from "styled-components";

import { Form } from "components/Form";
import { Label } from "components/Label";
import { Buttons } from "components/Buttons";

export const Spinner = styled.div`
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    background-color: var(--on-background-variant);
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;

    @keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
`;

const ButtonsMod = styled(Buttons)`
    background: var(--surface);
`;

const Error = styled.div`
    position: absolute;
    bottom: -3rem;
    height: 3rem;
    width: 100%;
    border-radius: 4px;
    box-shadow: var(--shadow-variant);
    background: var(--surface-variant);
`;

type ComponentProps = {
    setUser: (user: any) => void;
};

const LoginForm = function ({ setUser }: ComponentProps) {
    const [inputs, setInputs] = useState({
        user: "",
        password: "",
        loading: false,
        error: "",
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setInputs({ ...inputs, loading: true });
        feathersClient
            .authenticate({
                strategy: "local",
                email: inputs.user,
                password: inputs.password,
            })
            .then(({ user }) => setUser(user))
            .catch((error) => {
                console.error(error.message);
                setInputs({
                    ...inputs,
                    password: "",
                    loading: false,
                    error: error.message,
                });
            });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <Form isActive={true} onSubmit={handleSubmit} noButtons>
            <Label title="Usuario" length={1}>
                <input
                    type="text"
                    name="user"
                    value={inputs.user}
                    onChange={handleInputChange}
                    autoComplete="username"
                />
            </Label>
            <Label title="Contraseña" length={1}>
                <input
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                />
            </Label>
            <ButtonsMod>
                {inputs.loading ? (
                    <Spinner />
                ) : (
                    <button
                        type="submit"
                        disabled={inputs.loading ? true : false}
                    >
                        Ingresar
                    </button>
                )}
            </ButtonsMod>
            {inputs.error && <Error>{inputs.error}</Error>}
        </Form>
    );
};

export default LoginForm;
