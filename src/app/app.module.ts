import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AlbumDetailComponent } from "./components/album/album-detail.component";
import { AddModalComponent } from "./components/add-modal/add-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from './components/search/search.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlbumDetailComponent,
        AddModalComponent,
        SearchComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
