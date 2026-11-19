    (function () {
        var BOOKING_ORIGIN = "https://johnsaenz.au";
        var BOOKING_PATH = "/booking";
        var iframe = document.getElementById("cliniciq-booking");
        var fallback = document.getElementById("booking-fallback");

        // Deep link passthrough: booking.html?service=<uuid> starts the flow on
        // that service's time picker (unknown ids degrade to the service list).
        var serviceId = new URLSearchParams(window.location.search).get("service");
        var src = BOOKING_ORIGIN + BOOKING_PATH + (serviceId ? "?service=" + encodeURIComponent(serviceId) : "");

        // Only load the iframe once the booking service answers its health
        // check; if it doesn't (or the check stalls), show the fallback
        // instead of a blank frame.
        var healthController = new AbortController();
        var healthTimeout = setTimeout(function () { healthController.abort(); }, 7000);
        fetch(BOOKING_ORIGIN + BOOKING_PATH + "/api/health", { mode: "cors", signal: healthController.signal })
            .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
            .then(function (data) {
                if (!data || data.ok !== true) throw new Error("unhealthy");
                iframe.src = src;
            })
            .catch(function () {
                iframe.style.display = "none";
                fallback.classList.add("visible");
            })
            .finally(function () { clearTimeout(healthTimeout); });

        // Auto-height + booking-completed events from the embedded flow.
        window.addEventListener("message", function (e) {
            if (e.origin !== BOOKING_ORIGIN) return;
            var msg = e.data;
            if (!msg || msg.source !== "cliniciq-booking") return;
            if (msg.type === "cliniciq:height") {
                iframe.style.height = Math.max(420, msg.height) + "px";
            }
            if (msg.type === "cliniciq:booking:completed") {
                // No PII in the payload: reference, service_name, starts_at, ends_at, status.
                window.dispatchEvent(new CustomEvent("cliniciq:booking:completed", { detail: msg.booking }));
            }
        });
    })();
