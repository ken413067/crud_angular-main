import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [AddComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {}
