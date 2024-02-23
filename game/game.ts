import { sample } from "https://deno.land/std@0.216.0/collections/sample.ts";
import { log } from "../util/log.ts";
import { Board } from "./board.ts";
import { Player } from "./player.ts";
import { Status } from "./status.ts";
import { boards } from "./boards.ts";

export class Game {
    private static instance: Game;

    public readonly players: Map<string, Player>;
    private _board: Board;
    private _status = Status.PREPARING;

    private constructor() {
        this.players = new Map<string, Player>();
        this._board = new Board([[]]);
        this._status = Status.PREPARING;

        log.debug("selected field", { field: this._board.field });
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
            log.warn("new game was built!");
        }

        log.debug("game instance returning...");
        return Game.instance;
    }

    public startNewGame() {
        this._board = new Board(sample(boards) || [[]]);
        this.players.forEach(p => p.clearChameleon());
        const chameleon = sample(this.playerIds) ?? "err: no such player";
        log.debug("chameleon will be", { chameleon });
        this.players.get(chameleon)?.makeChameleon();
        this._status = Status.PLAYING;
    }

    get board(): Board {
        return this._board;
    }

    get playerIds(): string[] {
        return Array.from(this.players.entries()).map(el => el[0]);
    }

    get isPlaying() {
        return this._status === Status.PLAYING;
    }

    public addPlayer(name: string) {
        this.players.set(name, new Player(name));
    }
}
