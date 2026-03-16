(() => {
    const threshold = 8;
    const root = document.body;
    const mobileQuery = window.matchMedia("(max-width: 640.98px)");
    let lastY = window.scrollY;
    let currentState = null;

    const setState = (state) => {
        if (state === currentState) return;
        root.classList.remove("nav-top", "nav-hidden", "nav-solid");
        root.classList.add(state);
        currentState = state;
    };

    const update = () => {
        if (mobileQuery.matches) {
            setState("nav-top");
            return;
        }

        const currentY = window.scrollY;
        if (currentY <= threshold) {
            setState("nav-top");
        } else if (currentY > lastY) {
            setState("nav-hidden");
        } else if (currentY < lastY) {
            setState("nav-solid");
        }
        lastY = currentY;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("load", update, { passive: true });
    mobileQuery.addEventListener("change", update);
    update();
})();
