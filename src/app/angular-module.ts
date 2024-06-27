// 部分常用的angular套件引用
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AngularSharedModule { }
