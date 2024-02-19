import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {

  password: string = "password";
  error: null | string = null;
  copied: boolean = false;
  passwordForm: FormGroup;
  formValues: any;
  defaultValues = { chars: true, numbers: true, lowercase: true, uppercase: true, excludeChar: false };
  lowercaseAlp = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  uppercaseAlp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  chars = ['!', "#", "$", "%", "&", "(", ")", "*", "+", "-", ":", ";", "{", "}"];

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      'chars': [true],
      'numbers': [true],
      'lowercase': [true],
      'uppercase': [true]
    })

    this.formValues = this.passwordForm.getRawValue();
    this.createPassword();
    //this.error = "No puedes generar una contraseña sin valores.";
  }

  copyText() {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.password;
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand("copy")
    document.body.removeChild(selBox);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000)
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  createPassword() {
    if(this.error) { this.error = null };
    let password = "";

            // Password length
    while(password.length < 12) {
      let nextChar = this.getRandomInt(0, 3);
      
      switch(nextChar) {
        case 0: {
          if(!this.formValues.lowercase) break;
          password += this.lowercaseAlp[Math.floor(Math.random() * this.lowercaseAlp.length)];
        } break;
        case 1: {
          if(!this.formValues.uppercase) break;
          password += this.uppercaseAlp[Math.floor(Math.random() * this.uppercaseAlp.length)];
        } break;
        case 2: {
          if(!this.formValues.chars) break;
          password += this.chars[Math.floor(Math.random() * this.chars.length)];
        } break;
        case 3: {
          if(!this.formValues.numbers) break;
          password += String(this.getRandomInt(0, 9));
        } break;
      }
    }

    this.password = password;
  }

  submitForm() {
    this.formValues = this.passwordForm.getRawValue();
    if(!this.formValues.chars && !this.formValues.numbers && !this.formValues.lowercase && !this.formValues.uppercase && !this.formValues.excludeChar) 
    {
      this.error = "You need to select a minimum of 1 checkbox";
      setTimeout(() => {
        this.error = null
      }, 4000)
      return;
    }
    this.createPassword();
  }

}
