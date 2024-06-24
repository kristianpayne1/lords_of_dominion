import FirstAge_1_Level1 from "./houses/Houses_FirstAge_1_Level1";
import FirstAge_2_Level1 from "./houses/Houses_FirstAge_2_Level1";
import FirstAge_3_Level1 from "./houses/Houses_FirstAge_3_Level1";

const housesMap = {
    FirstAge_1_Level1,
    FirstAge_2_Level1,
    FirstAge_3_Level1,
};

function House({ age = "FirstAge", level = 1, type = 1, ...props }) {
    const Model = housesMap[`${age}_${type}_Level${level}`];
    return <Model {...props} />;
}

export default House;
