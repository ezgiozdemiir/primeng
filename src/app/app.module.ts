import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FilterService } from 'primeng/api';
import { BrowserAnimationsModule } 
    from "@angular/platform-browser/animations";
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextModule } from "primeng/inputtext";
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import { CountryTableComponent } from './country-table/country-table.component'
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    CountryTableComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    InputTextModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    ProgressBarModule,
    TooltipModule,
    CheckboxModule
  ],
  
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
