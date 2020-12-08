import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User()
  senha: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
  }

  conferirSenha(event: any){
    this.senha = event.target.value
  }

  cadastrar(){
    this.user.nome= "participante"
    this.user.usuario= "participante@email.com"
    this.user.senha= "12345678"
    this.senha= "12345678"
    console.log("nome "+ this.user.nome)
    console.log("usuario "+ this.user.usuario)
    console.log("senha "+ this.user.senha)
    console.log("senha variavel "+ this.user.senha)
    if ( this.senha === this.user.senha ) {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!')
      }, err => {
        console.log(`Erro cod: ${err.status}`)
        if (err.status==400) {
          alert("usuario ja cadastrado")
        }
      })
    } else {
      alert('Suas senhas não conferem')
    }
  }
}
