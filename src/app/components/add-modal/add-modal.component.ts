import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDialogParams } from "@nativescript/angular";
import { Album } from "~/app/model/album";

/**
 * Modal view to provide add album form.
 */
@Component({
    selector: "ns-add-modal",
    templateUrl: "./add-modal.component.html",
    styleUrls: ["./add-modal.component.css"]
})
export class AddModalComponent {

    /** the reactive form */
    form: FormGroup = this.fb.group({
        name: [''],
        description: ['']
    });

    constructor(
        private params: ModalDialogParams,
        private fb: FormBuilder
    ) { }

    /**
     * on submit button handler
     */
    onSubmit(): void {
        this.params.closeCallback(this.form.value as Album);
    }

    /**
     * on cancel button handler
     */
    onCancel(): void {
        this.params.closeCallback();
    }
}