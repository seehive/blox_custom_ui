(function () {
    const hiddenMenuItems = [
        "Website",
        "Workspaces",
        "Display",
        "Help",
        "About",
        "Keyboard Shortcuts",
        "System Health",
        "Frappe Support",
	"Edit Profile",
	"Toggle Theme",
	"Search",
	"Reset Desktop Layout"
    ];

    function normalize(text) {
        return (text || "").replace(/\s+/g, " ").trim();
    }

    function hideMenuItems() {
        document.querySelectorAll("a, button, div.dropdown-item, li").forEach(function (el) {
            const text = normalize(el.innerText || el.textContent);

            if (hiddenMenuItems.includes(text)) {
                el.style.display = "none";

                const parent = el.closest("li, a, button, .dropdown-item, .dropdown-item-container");
                if (parent) {
                    parent.style.display = "none";
                }
            }
        });

        // Hide by URL also
        document.querySelectorAll('a[href*="/app/website"], a[href*="/app/workspace"]').forEach(function (el) {
            el.style.display = "none";
            const parent = el.closest("li, .dropdown-item, a");
            if (parent) parent.style.display = "none";
        });
    }

    function start() {
        console.log("BLOX custom menu hider loaded");

        hideMenuItems();

        document.addEventListener("click", function () {
            setTimeout(hideMenuItems, 100);
            setTimeout(hideMenuItems, 300);
            setTimeout(hideMenuItems, 700);
        });

        const observer = new MutationObserver(hideMenuItems);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
