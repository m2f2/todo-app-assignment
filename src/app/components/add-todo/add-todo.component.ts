import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  imports: [FormsModule]
})
export class AddTodoComponent {
  title: string = '';
  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.title.trim()) {
      this.todoService.addTodo(this.title).subscribe({
        next: (newTodo) => {
          this.todoAdded.emit(newTodo);
          this.title = '';
        },
        error: (error) => console.error('Error adding todo:', error)
      });
    }
  }
}
