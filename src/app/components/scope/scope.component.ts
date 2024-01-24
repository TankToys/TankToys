import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankController } from "../../controllers/TankController";
import { GameController } from "../../controllers/GameController";

@Component({
    selector: 'app-scope',
    standalone: true,
    templateUrl: './scope.component.html',
    styleUrls: ['./scope.component.css'],
    imports: [CommonModule]
})
export class ScopeComponent implements OnInit {

    ITankController = TankController;
    IGameController = GameController;

    constructor() {

    }

    setStyles() {
        return {
            "position": 'absolute',
            "pointerEvents": "none",
            "zIndex": 100,
            "width": 50,
            "height": 50,
            "top": TankController.scopePos.y - (50 / 2),
            "left": TankController.scopePos.x - (50 / 2)
        }
    }


    ngOnInit() {
    }

}
