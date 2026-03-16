(() => {
    const root = document.body;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const observed = new WeakSet();

    const revealAll = () => {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    };

    if (reduceMotion) {
        revealAll();
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealAll();
        return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    const observeNew = () => {
        document.querySelectorAll(".reveal").forEach((el) => {
            if (observed.has(el)) return;
            observed.add(el);
            observer.observe(el);
        });
    };

    observeNew();

    const appRoot = document.getElementById("app") || document.body;
    const mo = new MutationObserver(() => observeNew());
    mo.observe(appRoot, { childList: true, subtree: true });
})();
