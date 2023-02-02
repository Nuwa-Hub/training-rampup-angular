import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[popupAnchor]",
  exportAs: "popupAnchor",
})
export class PopupAnchorDirective {
  constructor(public element: ElementRef) {}
}
