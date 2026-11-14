import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {

  students: any[] = [];
  name = '';
  department = '';
  loading = false;
  message = '';
  error = '';

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = '';

    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load students';
        this.loading = false;
      }
    });
  }

  addStudent() {
    this.message = '';
    this.error = '';

    if (!this.name.trim() || !this.department.trim()) {
      this.error = 'Please fill all fields';
      return;
    }

    this.studentService.addStudent({
      name: this.name,
      department: this.department
    }).subscribe({
      next: (response) => {
        this.message = response.message;
        this.name = '';
        this.department = '';
        this.loadStudents();
      },
      error: () => {
        this.error = 'Unable to add student';
      }
    });
  }
}