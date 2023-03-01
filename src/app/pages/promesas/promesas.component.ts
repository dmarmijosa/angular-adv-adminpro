import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getusuarios().then(resp=>{
      console.log(resp);
    });


    // const promesa = new Promise((res,rej)=>{
    //   if(false){
    //     res('Hola mundo');
    //   }else{
    //     rej('Algo salio mal')
    //   }
    // });
    // promesa.then((mensaje)=>{
    //   console.log(mensaje);
    // }).catch((err)=>{
    //   console.log(err);
    // })
    // console.log('Fin Init');
  }
  getusuarios() {
    return  new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then(resp=> resp.json())
      .then(body=> resolve(body.data));
    });

    
  }
}
