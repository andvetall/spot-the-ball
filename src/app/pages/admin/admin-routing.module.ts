//Vendors
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//Components
import { AdminGuard } from "src/app/core/guards/admin.guard";
import { MainDashboardComponent } from './components/dashboard/main.dashboard.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "admin/main-dashboard",
    pathMatch: "full",
    canActivate: [AdminGuard],
  },
  {
    path: "admin/main-dashboard",
    component: MainDashboardComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
