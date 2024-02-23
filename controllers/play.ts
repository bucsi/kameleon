import { RouterContext } from "https://deno.land/x/oak@v13.2.5/router.ts";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

import { Eta } from "../util/eta.ts";
import { Game } from "../game/game.ts";
import { log } from "../util/log.ts";

export function registerPlayer(ctx: RouterContext<"/play">) {
    const game = Game.getInstance();
    const partialUUID = nanoid(10);
    game.addPlayer(partialUUID);
    log.debug("player to be created", { id: ctx.params.id });

    ctx.response.redirect(`/play/${partialUUID}`);
}

export function playerView(ctx: RouterContext<"/play/:id">) {
    const game = Game.getInstance();
    if (!game.players.has(ctx.params?.id)) {
        ctx.response.body = { success: false, error: "Player not found!" };
        log.warn("no such player", { id: ctx.params?.id });
        return;
    }
    ctx.response.body = `player ${ctx.params.id}`;
}
