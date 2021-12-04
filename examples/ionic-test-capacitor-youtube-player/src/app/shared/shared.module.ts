import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NtkmeButtonModule
    ],
    exports: [CommonModule, FormsModule, IonicModule, NtkmeButtonModule]
})
export class SharedModule { }
