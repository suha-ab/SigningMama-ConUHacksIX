import crackTut from '../assets/crackTutorial.gif'
import cookTut from '../assets/cookTutorial.gif'
import mixTut from '../assets/mixTutorial.gif'
import pourTut from '../assets/pourTutorial.gif'
import congraats from '../assets/congrats.gif'
export default function TutorialVid(option) {

    if (option.option == 0) {
    return(
        <img src={crackTut} alt="crack..." />
    )}
    else if (option.option == 1) {
        return(
            <img src={mixTut} alt="mix..." />
        )
    }
    else if (option.option == 2) {
        return(
            <img src={pourTut} alt="pour..." />
        )
    }
    else if(option.option == 3) {
        return(
            <img src={cookTut} alt="cook..." />
        )   
    }
    else {
        return(
            <img src={congraats} alt="congrats!" />
        )
    }
}