import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private $ngUnsubscribe = new Subject<void>();
  public isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.select('auth').pipe(takeUntil(this.$ngUnsubscribe),map(authU => authU.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  onLogOut() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
