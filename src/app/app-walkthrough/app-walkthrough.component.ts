import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-walkthrough',
  templateUrl: './app-walkthrough.component.html',
  styleUrls: ['./app-walkthrough.component.css']
})
export class AppWalkthroughComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showModal = false;
  zoomedImage = '';

  openImageModal(imageName: string): void {
    // Set the zoomed image based on the clicked image
    this.zoomedImage = `../../assets/${imageName}.png`;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeImageModal(): void {
    this.showModal = false;
    document.body.classList.remove('modal-open');
  }

}
