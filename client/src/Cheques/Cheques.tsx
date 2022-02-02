import View from "components/View";
import Calendar from "./CalendarPanel";
import Gestion from "./GestionPanel";

function Cheques() {
    return (
        <View>
            <Gestion />
            <Calendar />
        </View>
    );
}

export default Cheques;
