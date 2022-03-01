import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-confirmpage',
  templateUrl: './confirmpage.component.html',
  styleUrls: ['./confirmpage.component.css'],
})
export class ConfirmpageComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}
  // gotoHome() {
  //   this._router.navigate(['/centerprofile']);
  // }
}
