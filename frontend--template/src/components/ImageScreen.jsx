// bg-[url('./assets/1-initial-state.png')]

export default function ImageScreen(urlID) {
    const urls = ['./assets/1-initial-state.png', './assets/2-cracked-eggs.png', './assets/3-mixed-eggs.png', 
        './assets/3a-whisking-eggs-in-bowl-left.png',
        '3b-whisking-eggs-in-bowl-right.png',
        '3c-whisking-eggs-in-bowl-top.png',
        './assets/4-cooked-eggs.png',
        './assets/5-finished-omelette.png'];
        console.log(urlID.urlID);
    if(urlID.urlID == 0) {
    return(
        <div className="rounded-lg bg-cover bg-[url('./assets/1-initial-state.png')] w-8/10 h-8/10"></div>
    )}
    else if(urlID.urlID == 1) {
    return(
        <div className="rounded-lg bg-cover bg-[url('./assets/2-cracked-eggs-in-bowl.png')] w-8/10 h-8/10"></div>
    )
    }
    else if(urlID.urlID == 2) {
        return(
            <div className="rounded-lg bg-cover bg-[url('./assets/3-whisked-eggs-in-bowl.png')] w-8/10 h-8/10"></div>)
    }
    else if (urlID.urlID == 3) {
        return(
            <div className="rounded-lg bg-cover bg-[url('./assets/4-eggs-cooking-in-pan.png')] w-8/10 h-8/10"></div>)
    }
    else {
        return(
            <div className="rounded-lg bg-cover bg-[url('./assets/5-omelet-in-pan.png')] w-8/10 h-8/10"></div>)
    }

}