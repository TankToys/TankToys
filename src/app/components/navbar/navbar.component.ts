import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  currentPage: string;
  @ViewChild('links') linksParent: ElementRef;

  constructor(){    
  }

  ngAfterViewInit(): void {
    this.currentPage = window.location.href.split("/").slice(-1)[0];
    let linksChildren = (<HTMLDivElement>this.linksParent.nativeElement).children;
    
    for (const child of linksChildren) {
      let currentAnchor = <HTMLAnchorElement>child.children[0];    
      if (currentAnchor.href.split('/').slice(-1)[0] == this.currentPage) {
        currentAnchor.classList.add("nav-active");
      } else {
        currentAnchor.classList.remove("nav-active");
      }

      if (currentAnchor.href.split('/').slice(-1)[0] == 'home' && this.currentPage.length <= 1) {
        currentAnchor.classList.add("nav-active");
      }
      
    }
  }

}
