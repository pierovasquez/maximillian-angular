import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  id: number;

  editMode = false;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((params: Params) => {
      console.log('params', params);
      this.id = +params.id;
      this.editMode = params.id != null;
      console.log(this.editMode);
    });
  }

}
