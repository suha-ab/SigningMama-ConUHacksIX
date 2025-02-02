import React, {  useState } from "react";


export default function InstructionBar(prediction) {

    const firstword = ["crack", "mix", "pour", "cook", "congrats"];
    const instructions = [" the eggs", " the eggs in a bowl", " the eggs into the pan", " the eggs", "!"];

    if(prediction.prediction == 0){
    return(
        <div className="p-5 rounded-lg bg-white text-4xl">
            <span className="text-green-500">{firstword[prediction.prediction]}</span>{instructions[prediction.prediction]}
        </div>
    )}
    else if (prediction.prediction == 1) {
        return(
            <div className="p-5 rounded-lg bg-white text-4xl">
                <span className="text-green-500">{firstword[prediction.prediction]}</span>{instructions[prediction.prediction]}
            </div>
        )
    }
    else if (prediction.prediction == 2) {
        return(
            <div className="p-5 rounded-lg bg-white text-4xl">
                <span className="text-green-500">{firstword[prediction.prediction]}</span>{instructions[prediction.prediction]}
            </div>
        )
    }
    else {
        return(
            <div className="p-5 rounded-lg bg-white text-4xl">
                <span className="text-green-500">{firstword[prediction.prediction]}</span>{instructions[prediction.prediction]}
            </div>
        )
    }
}