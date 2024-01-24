import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameController } from "../../controllers/GameController";
import { BulletController } from "../../controllers/BulletController";

@Component({
    selector: 'app-bullet',
    standalone: true,
    templateUrl: './bullet.component.html',
    styleUrls: ['./bullet.component.css'],
    imports: [CommonModule]
})
export class BulletComponent implements OnInit {
    IGameController = GameController;
    IBulletController = BulletController;

    position = BulletController.bullet.position;

    constructor() { }

    ngOnInit() {
    }

    setStyles() {
        return {
            "position": 'absolute',
            "zIndex": 60,
            "width": 30,
            "height": 20,
            "top": BulletController.bullet.position.y,
            "left": BulletController.bullet.position.x,
            "rotate": `${BulletController.bullet.rotation}rad`
        }
    }

}
