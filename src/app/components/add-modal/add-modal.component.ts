import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDialogParams } from "@nativescript/angular";
import { Album } from "~/app/model/album";

@Component({
    selector: "ns-add-modal",
    templateUrl: "./add-modal.component.html",
    styleUrls: ["./add-modal.component.css"]
})
export class AddModalComponent {

    form: FormGroup = this.fb.group({
        name: [''],
        description: ['']
    });

    constructor(
        private params: ModalDialogParams,
        private fb: FormBuilder
    ) { }

    onSubmit(): void {
        this.params.closeCallback(this.form.value as Album);
    }

    onCancel(): void {
        this.params.closeCallback();
    }
}