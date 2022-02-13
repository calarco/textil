import styled from "styled-components";

import LoginForm from "./LoginForm";

const Container = styled.div`
    grid-row-end: span 2;
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    opacity: 1;
    transition: 0.2s ease-out;
`;

const Card = styled.div`
    position: relative;
    width: 100%;
    max-width: 15rem;
    min-height: 13rem;
`;

type ComponentProps = {
    setUser: (user: any) => void;
};

const Login = function ({ setUser }: ComponentProps) {
    return (
        <Container>
            <Card>
                <LoginForm setUser={setUser} />
            </Card>
        </Container>
    );
};

export default Login;
