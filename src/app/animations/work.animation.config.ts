
function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}

const easingFunction= "power4.inOut"

const hideDuration=1
const worksTitlesRevealDuration=1.2


 

export const pageLayoutAnimationConfig={
    fadeout:{
        opacity:0,
        duration:hideDuration,
        ease:easingFunction,
    }
}



export const navbarDelaysMap={
    "works": 0.8,
    "other": 0,
}

export const navBarAnimationsIntialStates={
    links:{
        transform: "translate(0px, -200%)",
        opacity: 0,
    }
}

export const navbarAnimationCofig={
    revealLinks:{
        transform: "translate(0px, 0%)",
        opacity: 1,
        duration: 0.8,
        stagger: 0.02, // 0.1 seconds between when each ".box" element starts animating,
        ease: easingFunction
    }
}


export const worksPageAnimationsIntialStates={
    title:{
        transform: "translate(0px, 110%)",
    },
}

export const worksAnimationsConfig = {
    hideDuration: hideDuration,
    titleRevealAnimation:{
        transform: "translate(0px, 0%)",
        duration: worksTitlesRevealDuration,
        ease: easingFunction,
    },
    titleClickedHideAnimation:{
        transform: "translate(0px, 110%)",
        duration: hideDuration,
        ease: easingFunction,
    }

    
};

export const workPageAnimationsIntialStates={
    title:{
        transform: "translate(0px, 110%)",
    },
    subTitle:{
        opacity:0,
    },
    heroInfos:{
        opacity:0,
    },
    heroImageRevealAnimation:{
        scale:1.1,
        opacity: 0,
    },
}

 
export const workPageAnimationsConfig = {
    hideDuration: hideDuration,
    titleRevealAnimation:{
        transform: "translate(0px, 0%)",
        duration: 1.2,
        ease: easingFunction,
    },
    subTitleRevealAnimation:{
        opacity:1,
        duration: 1,
        delay:0.2,
        ease: easingFunction,
    },
    heroInfosRevealAnimation:{
        opacity:1,
        duration: 1,
        delay:0.2,
        ease: easingFunction,
    },
    heroImageRevealAnimation:{
        scale:1,
        opacity: 1,
        duration: 1.5,
        ease: easingFunction,
    },
};
