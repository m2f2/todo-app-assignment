import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../service/todo.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule, AddTodoComponent, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (error) => console.error('Error fetching todos:', error)
    });
  }

  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  toggleCompletion(todo: Todo) {
    this.todoService.toggleTodoCompletion(todo).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => console.error('Error updating todo:', error)
    });
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      error: (error) => console.error('Error deleting todo:', error)
    });
  }
}
