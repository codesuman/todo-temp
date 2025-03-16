import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  todoId: any;
  public todo: any = {};

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    tags: new FormControl(''),
    priority: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {}

  ngOnInit():void {
    this.todoId = this.route.snapshot.paramMap.get('id');
    
    this.loadTodo();
  }

  loadTodo(): void {
    this.todoService.getTodos().subscribe(
      data => {
        this.todo = data['todos'].find((todo: { _id: any; }) => todo._id == this.todoId);

        console.log(`this.todo`);
        console.log(this.todo);

        this.todoForm.get('title')?.setValue(this.todo.title);
        this.todoForm.get('description')?.setValue(this.todo.description);
      }
    );
  }

  onSubmit() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
      
      this.todoService.updateTodo(this.todoId, this.todoForm.value).subscribe(
        () => this.router.navigate(['/todos']),
        err => this.router.navigate(['/todos'])
        // error => alert('Failed to update todo. Please try again.')
      );
    }
  }
}
