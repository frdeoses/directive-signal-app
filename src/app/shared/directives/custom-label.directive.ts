import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private elementRef?: ElementRef<HTMLElement>;

  private _color = 'red';

  private _errors?: ValidationErrors | null | undefined;

  @Input()
  set color(value: string) {
    // console.log({ color: value });
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    console.log({ errors: value });
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('Constructor directiva');
    // console.log(el);
    this.elementRef = el;
  }

  ngOnInit(): void {
    console.log('Directiva: ngOnInit.');
  }

  setStyle(): void {
    if (!this.elementRef) return;

    this.elementRef!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.elementRef) return;
    if (!this._errors) {
      this.elementRef.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);

    if (errors.includes('required')) {
      this.elementRef.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.elementRef.nativeElement.innerText = `No supera el numero mínimo de caracteres (min: ${min}), actual: ${current} `;
      return;
    }
    if (errors.includes('email')) {
      this.elementRef.nativeElement.innerText =
        'Este campo no cumple las condiciones correctas para ser email';
      return;
    }
  }
}
