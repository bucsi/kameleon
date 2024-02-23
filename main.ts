import { Application, Router } from "https://deno.land/x/oak@v13.2.5/mod.ts";

import { Game } from "./game/game.ts";
import { log } from "./util/log.ts";
import { admin, adminStart } from "./controllers/admin.ts";
import { index } from "./controllers/index.ts";
import { playerView, registerPlayer } from "./controllers/play.ts";

const router = new Router();
router
    .get("/", index)
    .get("/admin", admin)
    .get("/admin/start", adminStart)
    .get("/play", registerPlayer)
    .get("/play/:id", playerView);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
