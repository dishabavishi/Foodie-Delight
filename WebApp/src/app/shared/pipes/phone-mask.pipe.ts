import { Pipe, PipeTransform } from "@angular/core";
import { NgxMaskPipe } from "ngx-mask";

@Pipe({ name: 'phoneMaskPipe' })

export class PhoneMaskPipe implements PipeTransform {
    constructor(private maskPipe: NgxMaskPipe) {}

    transform(phoneNumber: string) {
        const phoneMask = '+00 000 000 0000';
        return this.maskPipe.transform(phoneNumber, phoneMask);
    }
}
