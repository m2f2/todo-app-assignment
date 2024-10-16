import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    return this.http.post<Todo>(this.apiUrl, newTodo)
  }

  deleteTodo(todoId: string): Observable<unknown> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete(url)
  }

  toggleTodoCompletion(todo: Todo): Observable<Todo> {
    todo.completed = !todo.completed;
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo)
  }
}
