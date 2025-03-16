import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo: any;
  @Input() index: any;
  @Output() deleteRequested = new EventEmitter<string>();

  constructor(private router: Router) {}
  
  onDelete(): void {
    this.deleteRequested.emit(this.todo._id);
  }

  onEdit(): void {
    this.router.navigate(['/todo', this.todo._id]);
  }
}
