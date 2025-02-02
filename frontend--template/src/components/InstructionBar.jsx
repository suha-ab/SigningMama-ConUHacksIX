export default function InstructionBar() {
    const firstword = ["crack", "mix", "pour", "cook"];
    const instructions = [" the eggs", " the eggs in a bowl", " the eggs into the pan", " the eggs"];

    return(
        <div className="rounded-lg bg-white text-4xl">
            <span className="text-red-500">{firstword[0]}</span>{instructions[0]}
        </div>
    )
}