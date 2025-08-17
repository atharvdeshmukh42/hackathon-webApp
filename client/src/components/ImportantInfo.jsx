import DisplayInfo from "../UI/DisplayInfo";
import { ImportantInfoJson } from "../data/ImportantInfo";

function ImportantInfo() {
    return(
        <>
        {ImportantInfoJson.map((item) => (
            <DisplayInfo key={item.heading} {...item}/>
        ))}
        </>
    )
}

export default ImportantInfo;