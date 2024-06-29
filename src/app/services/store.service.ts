import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { List } from '../models/lists';
import { Project } from '../models/project';
import { Comments } from '../models/comment';

interface GlobalState {
  projectId: number | null;
  listId: number | null;
  taskArray: Task[];
  commentArray: Comments[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _projectId = new BehaviorSubject<number | null>(null);
  private readonly _listId = new BehaviorSubject<number | null>(null);
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  private readonly _comments = new BehaviorSubject<Comments[]>([]);

  readonly projectId$: Observable<number | null> = this._projectId.asObservable();
  readonly listId$: Observable<number | null> = this._listId.asObservable();
  readonly tasks$: Observable<Task[]> = this._tasks.asObservable();
  readonly comments$: Observable<Comments[]> = this._comments.asObservable();

  constructor() {}

  get projectId(): number | null {
    return this._projectId.getValue();
  }

  set projectId(val: number | null) {
    this._projectId.next(val);
  }

  get listId(): number | null {
    return this._listId.getValue();
  }

  set listId(val: number | null) {
    this._listId.next(val);
  }

  get tasks(): Task[] {
    return this._tasks.getValue();
  }

  set tasks(val: Task[]) {
    this._tasks.next(val);
  }

  get comments(): Comments[] {
    return this._comments.getValue();
  }

  set comments(val: Comments[]) {
    this._comments.next(val);
  }

  // Additional methods to manipulate the state (addTask, deleteList, etc.) can be added here
}