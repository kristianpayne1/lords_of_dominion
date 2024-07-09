import React from "react";
import { addBuilding } from "./reducers/buildingsSlice";
import { useDispatch } from "react-redux";

function HUD() {
    const dispatch = useDispatch();

    return (
        <div id="hud">
            <button id="add-button" onClick={() => dispatch(addBuilding())}>
                Add house
            </button>
        </div>
    );
}

export default HUD;
