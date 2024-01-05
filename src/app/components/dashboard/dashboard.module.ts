import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartistModule } from "ng-chartist";
import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { OnlineCourseComponent } from './online-course/online-course.component';
import { HelloNameComponent } from './online-course/hello-name/hello-name.component';
import { TodayProgressComponent } from './online-course/today-progress/today-progress.component';
import { MoreDetailsComponent } from './online-course/more-details/more-details.component';
import { CalendarComponent } from './online-course/calendar/calendar.component';
import { LearningOverviewComponent } from './online-course/learning-overview/learning-overview.component';
import { ActivityHoursComponent } from './online-course/activity-hours/activity-hours.component';
import { UpcomingEventsComponent } from './online-course/upcoming-events/upcoming-events.component';
import { UpcomingScheduleComponent } from './online-course/upcoming-schedule/upcoming-schedule.component';
import { MyCourseComponent } from './online-course/my-course/my-course.component';
import { ActiveLessonsComponent } from './online-course/active-lessons/active-lessons.component';
import { CoursesComponent } from './online-course/hello-name/courses/courses.component';
@NgModule({
  declarations: [
    OnlineCourseComponent,
    HelloNameComponent,
    TodayProgressComponent,
    MoreDetailsComponent,
    CalendarComponent,
    LearningOverviewComponent,
    ActivityHoursComponent,
    UpcomingEventsComponent,
    UpcomingScheduleComponent,
    MyCourseComponent,
    ActiveLessonsComponent,
    CoursesComponent,
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, DashboardRoutingModule],
  exports: [
    CoursesComponent,
    CalendarComponent,
  ]
})
export class DashboardModule {}
