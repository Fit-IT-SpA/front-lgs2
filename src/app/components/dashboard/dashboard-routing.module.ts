import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnlineCourseComponent } from "./online-course/online-course.component";
import { AdminGuard } from 'src/app/shared/guard/admin.guard';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "online-course",
        component: OnlineCourseComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
