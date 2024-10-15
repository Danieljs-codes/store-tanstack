/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import nProgress from "nprogress";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter();

nProgress.configure({ showSpinner: false });

router.subscribe(
	"onBeforeLoad",
	({ pathChanged }) => pathChanged && nProgress.start(),
);
router.subscribe("onLoad", () => nProgress.done());

hydrateRoot(
	document.getElementById("root") as HTMLElement,
	<StartClient router={router} />,
);
