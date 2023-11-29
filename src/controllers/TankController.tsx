import { KeyboardEvent } from "react";
import { Position, Tank } from "../models/Tank";


class MovementKeys {
    static readonly Forward = ["w", "W", "ArrowUp"];
    static readonly Right = ["d", "D", "ArrowRight"]
    static readonly Left = ["a", "A", "ArrowLeft"]
    static readonly Backward = ["s", "S", "ArrowDown"]
}


export class TankController {
    
    public static directions:string[] = [];

    private static _tank: Tank = new Tank();
    public static get tank(): Tank {
        return this._tank;
    }
    public static set tank(v: Tank) {
        this._tank = v;
    }
    public static scopePos:Position = {
        x: 0,
        y: 0
    };

    public static cannonRotation:number = 50;


    static triggerComponentRender: () => void = () => { };


    public static addKey(key:string){
        if (!TankController.directions.includes(key)) {
            TankController.directions.push(key)
        }
    }

    public static removeKey(key:string){
        TankController.directions.splice(TankController.directions.indexOf(key)-1, 1)
        console.log(TankController.directions);
        
    }

    
    public static Move() {

        if (MovementKeys.Forward.filter(x => TankController.directions.includes(x)).length > 0) {
            console.log("Forward");
            TankController.tank.moveX(TankController.tank.speed * -1)
        }
        if (MovementKeys.Backward.filter(x => TankController.directions.includes(x)).length > 0) {
            console.log("Backward");
            TankController.tank.moveX(TankController.tank.speed)
        }
        if (MovementKeys.Left.filter(x => TankController.directions.includes(x)).length > 0) {
            console.log("Left");
            TankController.tank.moveY(TankController.tank.speed * -1)
        }
        if (MovementKeys.Right.filter(x => TankController.directions.includes(x)).length > 0) {
            console.log("Right");
            TankController.tank.moveY(TankController.tank.speed)
        }

        

        TankController.triggerComponentRender();
    }


    public static scopePlacement(e:MouseEvent){
        this.scopePos = {x: e.pageX, y: e.pageY}
        let dx = e.pageX - this._tank.position.x;
        let dy = e.pageY - this._tank.position.y;
        let theta = Math.atan2(dy, dx);
        this.cannonRotation = (theta*180/Math.PI) + 90;
    }


}