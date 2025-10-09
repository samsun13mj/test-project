import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { ToolbarComponent } from '../../../shared-container/toolbar/toolbar';
import { SidebarComponent } from '../../../shared-container/sidebar/sidebar';
import { SidenavService } from '../../../../service/sidenav-service';
import { UserDetailsSidenavComponent } from '../../../user-details-container/user-details/user-details';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ToolbarComponent,          
    SidebarComponent,          
    UserDetailsSidenavComponent,
    NgIf                       
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('userDetailsSidenav') userDetailsSidenav!: MatSidenav;

  private subs = new Subscription();
  _sidenavUser: any = null;

  loading = false;

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit(): void {
    const s = this.sidenavService.payload$.subscribe(payload => {
      this._sidenavUser = payload.user || null;
      setTimeout(() => {
        if (payload.open) {
          this.userDetailsSidenav?.open();
        } else {
          this.userDetailsSidenav?.close();
        }
      });
    });
    this.subs.add(s);
  }

  closeUserSidenav() {
    this.sidenavService.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
