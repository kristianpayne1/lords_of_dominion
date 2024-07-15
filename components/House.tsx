import FirstAge_1_Level1 from "./houses/Houses_FirstAge_1_Level1";
import FirstAge_2_Level1 from "./houses/Houses_FirstAge_2_Level1";
import FirstAge_3_Level1 from "./houses/Houses_FirstAge_3_Level1";

const housesMap = {
    FirstAge_1_Level1,
    FirstAge_2_Level1,
    FirstAge_3_Level1,
};

function isValidHouseKey(key: string): key is keyof typeof housesMap {
    return key in housesMap;
}

function House({ age = "FirstAge", level = 1, variant = 1, ...props }) {
    const key = `${age}_${variant}_Level${level}`;
    if (isValidHouseKey(key)) {
        const Model = housesMap[key];
        return <Model {...props} />;
    } else {
        return null;
    }
}

export default House;
