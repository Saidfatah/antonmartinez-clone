
function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}
function easeInOutSine(x: number): number {
return -(Math.cos(Math.PI * x) - 1) / 2;
}
function easeOutCirc(x: number): number {
return Math.sqrt(1 - Math.pow(x - 1, 2));
}

const hideDuration=1
const worksTitlesRevealDuration=1.2

export const navbarAnimationCofig={
    revealLinks:{
        transform: "translate(0px, 0%)",
        opacity: 1,
        duration: 0.8,
        delay:0.8, 
        stagger: 0.02, // 0.1 seconds between when each ".box" element starts animating,
        ease: easeOutCirc
    }
}

export const worksAnimationsConfig = {
    hideDuration: hideDuration,
    titleRevealAnimation:{
        transform: "translate(0px, 0%)",
        duration: worksTitlesRevealDuration,
        ease: "power4.inOut",
    },
    titleClickedHideAnimation:{
        transform: "translate(0px, 110%)",
        duration: hideDuration,
        ease: easeOutQuint,
    }
    
};

export const workPageAnimationsConfig = {
    hideDuration: hideDuration,
    titleRevealAnimation:{
        transform: "translate(0px, 0%)",
        duration: 1.2,
        ease: "power4.inOut",
    },
    subTitleRevealAnimation:{
        opacity:1,
        duration: 1,
        delay: .2,
        ease: "power4.inOut",
    },
 
    
};
