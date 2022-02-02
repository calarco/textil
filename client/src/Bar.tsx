import styled, { css } from "styled-components";

const Container = styled.nav`
    width: 100%;
    position: relative;
    height: 100%;
    padding: 0 0.5rem;
    border-radius: 0 4px 4px 0;
`;

const Views = styled.div`
    height: 100%;
    padding: 0.25rem;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    gap: 1px;
`;

type Props = {
    readonly isActive?: boolean;
};

const View = styled.button<Props>`
    width: 100%;
    border: none;

    ${(props) =>
        props.isActive &&
        css`
            background: var(--primary-variant);
            box-shadow: var(--shadow-variant);
            transition: 0.3s ease-out;

            &:hover {
                pointer-events: none;
            }
        `};

    &:focus {
        background: var(--primary-variant);
    }

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        top: calc(50% - 0.5rem);
        left: -1px;
        height: 1rem;
        border-left: var(--border);
    }
`;

const Buttons = styled.div`
    width: 16rem;
    height: 100%;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    gap: 1px;

    > button {
        width: 100%;
        padding: 0.25rem 0.55rem;
        border: none;
        font: var(--label);
        font: 500 0.75rem/1.25rem var(--font-family);

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 0.5rem);
            left: -1px;
            height: 1rem;
            border-left: var(--border);
        }
    }
`;

type ComponentProps = {
    setUser: (user: any) => void;
    darkTheme: string;
    setDarkTheme: (darkTheme: string) => void;
    route: string;
    setRoute: (route: string) => void;
};

const Bar = function ({
    setUser,
    darkTheme,
    setDarkTheme,
    route,
    setRoute,
}: ComponentProps) {
    return (
        <Container>
            <Views>
                <View
                    isActive={route === "cheques"}
                    onClick={() => setRoute("cheques")}
                >
                    Cheques
                </View>
                <View
                    isActive={route === "saldos"}
                    onClick={() => setRoute("saldos")}
                >
                    Saldos
                </View>
                <View
                    isActive={route === "precios"}
                    onClick={() => setRoute("precios")}
                >
                    Precios
                </View>
            </Views>
            <Buttons>
                {darkTheme ? (
                    <button
                        type="button"
                        onClick={() => {
                            setDarkTheme("");
                        }}
                    >
                        Tema Claro
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setDarkTheme("true");
                        }}
                    >
                        Tema Oscuro
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => {
                        window.localStorage.removeItem("feathers-jwt");
                        setUser(null);
                    }}
                >
                    Cerrar sesión
                </button>
            </Buttons>
        </Container>
    );
};

export default Bar;
