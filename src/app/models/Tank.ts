import { CPUController } from "../controllers/CPUController";
import { angleToCoords, delay } from "../utils/utils";
import { Collider, GameMap } from "./Map";

export interface Position{
    x: number;
    y: number;
}

export class Cannon{
    public position: Position = {
        x: 0,
        y: 0
    }
    public rotation: number = 0;

    constructor() {
        
    }
    

    public static mouseTrack(e: globalThis.MouseEvent) {
    
        console.log("x: " + e.clientX);
        console.log("y: " + e.clientY);
        
        
    }


}

export class Tank {

    public position: Position = {
        x: 0,
        y: 0
    };

    public rotation: number = 0;

    public speed = 10;

    public _parentName:string;

    //0 - Nomral; 1 - Sniper; 2 - Subfusil; 3 - Shotgun
    public bulletType: number = 2;

    constructor(defaultPos: Position, parentName:string) {
        this.position = defaultPos!;
        this._parentName = parentName;
    }


    /**
     * moveX
     */
    public moveX(steps:number) {
        // let chiv = GameMap.checkIfBlock(0,steps, this.position);
        // console.log(chiv);
        // console.log(this.position);
        
        this.position.x += steps;

    }

    /**
     * moveY
     */
    public moveY(steps:number) {
        this.position.y += steps;
    }

    public async moveXBot(controller: CPUController, steps:number) {
        let nextBlock: Boolean = false;
        let tankCPUQ = controller.getQuadrant(this._parentName);
        //debugger;
        while (!nextBlock) {
            this.position.x += steps;
            let checkQ = controller.getQuadrant(this._parentName);
            if (tankCPUQ != checkQ) {
                nextBlock = true
                tankCPUQ = checkQ;
            }
            await delay(24);
        }
        //debugger;
        let cpu = GameMap.colliders[this._parentName];
        if (steps > 0) {
            this.position.x += (((cpu.bottom - cpu.top)/3)); 
        } else {
            this.position.x += (((cpu.bottom - cpu.top)/3))*-1; 
        }
        
    }

    
    public async moveYBot(controller:CPUController, steps:number) {
        let nextBlock: Boolean = false;
        let tankCPUQ = controller.getQuadrant(this._parentName);
        //debugger;
        while (!nextBlock) {
            this.position.y += steps;
            let checkQ = controller.getQuadrant(this._parentName);
            
            if (tankCPUQ != checkQ) {
                nextBlock = true
            }
            await delay(24);
        }
        //debugger;
        let cpu = GameMap.colliders[this._parentName];
        if (steps > 0) {
            this.position.y += (((cpu.right - cpu.left)/3)); 
        } else {
            this.position.y += (((cpu.right - cpu.left)/3))*-1; 
        }
    }

    public move(pos:Position){
        let coords = angleToCoords(pos.x, pos.y, this.rotation, this.speed);
        this.position.x += coords.x;
        this.position.y += coords.y;
    }

    public rotate(degrees:number){
        while (degrees > 360){
            degrees -= 360
        }
        this.rotation = degrees + this.rotation;
    }
}