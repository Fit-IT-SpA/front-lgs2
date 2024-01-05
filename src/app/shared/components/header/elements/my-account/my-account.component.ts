import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Session } from "src/app/shared/model/session";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public profile: Session;
  public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(public router: Router) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {}

  logoutFunc() {
    localStorage.removeItem("profile");
    this.router.navigateByUrl('auth/login');
  }
}
