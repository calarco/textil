import styled from "styled-components";

import { Device } from "globalStyle";

const View = styled.div`
    width: 100%;
    height: 100%;
    padding: 1px 0.5rem;
    display: grid;
    justify-items: center;
    gap: 0.5rem;

    @media ${Device.desktop} {
        padding: 1px 1.5rem;
        gap: 1.5rem;
    }
`;

export default View;
