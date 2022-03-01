import { AbstractControl, FormControl } from '@angular/forms';

// function imageSizeValidator(control: AbstractControl): {[key: string]: any} | null{
//     const forbidden=
// }
export function fileSizeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  console.log(control.value);
  const file: File = control.value;
  var size = file.size;
  //   console.log(size);
  let forbidden = true;
  if (file) {
    const fileSizeInMB = Math.round(size / 1024);
    if (fileSizeInMB < 1024) {
      //console.log('less than 1024', fileSizeInMB);
      forbidden = false;
    }
  }
  return forbidden ? { inValidSize: true } : null;
}
