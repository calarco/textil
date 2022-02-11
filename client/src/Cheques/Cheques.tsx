import styled from "styled-components";

import ViewComponent from "components/View";
import CalendarPanel from "./CalendarPanel";
import GestionPanel from "./GestionPanel";

const View = styled(ViewComponent)`
    grid-template-columns: 2fr 1fr;
`;

function Cheques() {
    return (
        <View>
            <GestionPanel />
            <CalendarPanel />
        </View>
    );
}

export default Cheques;
