import { Component } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
    selector: "ns-add-modal",
    templateUrl: "./add-modal.component.html",
    styles: []
})
export class AddModalComponent {

    constructor(private params: ModalDialogParams) {}

    onClose(): void {
        this.params.closeCallback("return value");
    }
}