import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicTableComponent } from '@components/shared/table/dynamic-table/dynamic-table.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, IconFieldModule, DynamicTableComponent],
  exports: [DynamicTableComponent], // Make it available for other modules
})
export class DynamicTableModule {}
