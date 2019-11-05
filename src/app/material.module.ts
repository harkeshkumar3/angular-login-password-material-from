import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,MatInputModule,MatProgressSpinnerModule,MatSnackBarModule,
  MatFormFieldModule
  
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,MatFormFieldModule,MatInputModule,MatProgressSpinnerModule,MatSnackBarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,MatFormFieldModule,MatInputModule,MatProgressSpinnerModule,MatSnackBarModule,
    MatCardModule
  ]
})
export class MaterialModule {}