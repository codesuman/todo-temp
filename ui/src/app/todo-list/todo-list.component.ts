import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true
})
export class TodoListComponent implements OnInit{
  public todos: any = [];
  public newTodo: string='';

  constructor(private todoService: TodoService) {}

  ngOnInit():void{
    this.newTodo = '';
    this.loadTodos();
  }
  
  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      data => this.todos = data['todos']
    )
  }
  deleteTodo(id: string): void {
    console.log("delete")
    if (confirm('Are you sure you want to delete this todo?')) {
        this.todoService.deleteTodo(id).subscribe(() => {
            this.todos = this.todos.filter((todo: { _id: string; }) => todo._id !== id);
            alert('Todo deleted successfully!');
        });
    }
  }

  addTodo(): void {
    if (!this.newTodo.trim()) {
      alert('Please enter a valid todo!');
      return;
    }

    const newTodo = { title: this.newTodo, description: 'New Task Description' };
    this.todoService.addTodo(newTodo).subscribe(
      () => {
        this.loadTodos();
        alert('Todo added successfully!');
      },
      error => {
        console.error('Error adding todo:', error);
        alert('Failed to add todo. Please try again.');
      }
    );
  }
}
