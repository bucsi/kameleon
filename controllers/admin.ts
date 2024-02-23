import { RouterContext } from "https://deno.land/x/oak@v13.2.5/mod.ts";

import { Game } from "../game/game.ts";
import { Eta } from "../util/eta.ts";
import { sample } from "https://deno.land/std@0.216.0/collections/sample.ts";
import { log } from "../util/log.ts";

const game = Game.getInstance();

export function admin(ctx: RouterContext<"/admin">) {
    const game = Game.getInstance();
    const { words } = game.board;
    const players = Array.from(game.players.entries());
    const isPlaying = game.isPlaying;

    ctx.response.body = Eta.render("admin.eta", { state: { words, players } });
}

export function adminStart(ctx: RouterContext<"/admin/start">) {
    game.players.forEach(p => p.clearChameleon());
    const chameleon = sample(game.playerIds) ?? "err: no such player";
    log.debug("chameleon will be", { chameleon });
    game.players.get(chameleon)?.makeChameleon();

    ctx.response.redirect("/admin");
}
