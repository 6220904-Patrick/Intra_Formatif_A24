import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, Form, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  form: FormGroup<any>;
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      roadnumber: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      rue: [''],
      postalcode: ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      comments: ['', [this.validerNombreMots]]
    },
      { validators: this.validerCommentaire }
    );
  }

  validerNombreMots(control: AbstractControl): ValidationErrors | null {
    if (control.value.split(' ').length < 10) {
      return { nombreMots: true };
    }
    return null;
  }

  validerCommentaire(form: AbstractControl): ValidationErrors | null {
    const nom: string = form.get('name')?.value;
    const commentaire: string = form.get('comments')?.value;
    if (nom != "" && commentaire.indexOf(nom) >= 0) {
      return { commentaireInterdit: true };
    }
    return null;
  }
}


