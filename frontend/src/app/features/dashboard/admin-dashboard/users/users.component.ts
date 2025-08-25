import { Component } from '@angular/core';
import { User } from '../../../../core/models/account.model';
import { PublicService } from '../../../../core/services/public.service';
import { CommonModule, DatePipe } from '@angular/common';

interface PaginatedTable<T> {
  fullList: T[];
  paginatedList: T[];
  currentPage: number;
  pageSize: number;
  showAll: boolean;
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: PaginatedTable<User> = {
    fullList: [],
    paginatedList: [],
    currentPage: 0,
    pageSize: 10,
    showAll: false
  };

  staff: PaginatedTable<User> = {
    fullList: [],
    paginatedList: [],
    currentPage: 0,
    pageSize: 10,
    showAll: false
  };

  isLoading = true;
  error: string | null = null;

  constructor(
    public userService: PublicService,
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users.fullList = data.filter(u => u.role === 'user');
        this.staff.fullList = data.filter(u => u.role === 'admin' || u.role === 'employee');

        this.updatePaginated(this.users);
        this.updatePaginated(this.staff);

        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  updatePaginated(table: PaginatedTable<User>): void {
    if (table.showAll) {
      table.paginatedList = table.fullList;
    } else {
      const start = table.currentPage * table.pageSize;
      table.paginatedList = table.fullList.slice(start, start + table.pageSize);
    }
  }

  toggleView(table: PaginatedTable<User>): void {
    table.showAll = !table.showAll;
    table.currentPage = 0;
    this.updatePaginated(table);
  }

  nextPage(table: PaginatedTable<User>): void {
    const maxPage = Math.ceil(table.fullList.length / table.pageSize);
    if (table.currentPage < maxPage - 1) {
      table.currentPage++;
      this.updatePaginated(table);
    }
  }

  prevPage(table: PaginatedTable<User>): void {
    if (table.currentPage > 0) {
      table.currentPage--;
      this.updatePaginated(table);
    }
  }
}
