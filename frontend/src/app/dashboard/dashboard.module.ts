import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'primeng/components/common/shared';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PanelModule,
    ChartModule,
    
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
