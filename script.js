'use strict';

class ListAddresses {
   constructor({ wrapper, option, adress, select, }) {
      this.wrapper = document.querySelector(wrapper);
      this.option = this.wrapper.querySelector(option);
      this.adress = this.wrapper.querySelector(adress);
      this.select = this.wrapper.querySelector(select);
      this.areas = ["Кировоградская", "Запорожская", "Львовская", "Донецкая", "Волынская", "Житомирська", "Ровенская", "Киевская", "Черкасская", "Николаевская", "Днепропетровская", "Сумская"];
      this.data = {};
   }

   clearSelect() {
      this.select.innerHTML = '';
      this.wrapper.querySelector('.block').innerHTML = '';
   }



   fillingData() {

      this.select.addEventListener('change', (even) => {

         let target = even.target;

         let adresses = [];

         this.data.forEach((item) => {
            if (item.state == target.value) {
               adresses.push(item);
            }
         });

         // this.clearSelect();

         adresses.forEach(() => this.wrapper.querySelector('.block').append(this.adress.cloneNode()));

         adresses.forEach((item, index) => {
            this.wrapper.querySelectorAll('.adress')[index].innerHTML = JSON.stringify(item).replace(/[^a-zа-яё0-9,.@]/gi, ' ');
         });


      });

   }

   getData() {

      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {

         if (request.readyState === 4 && request.status === 200) {
            this.data = JSON.parse(request.responseText);
            this.fillingData();

         }
      });

      request.open('GET', './privat.json');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send();

   }

   areasData() {
      this.areas.forEach(() => this.select.append(this.option.cloneNode()));

      for (let i = 0; i < this.areas.length; i++) {
         this.select.querySelectorAll('option')[i].innerHTML = this.areas[i];
         this.select.querySelectorAll('option')[i].value = this.areas[i];
      }
   }

   init() {
      console.dir(this);
      this.clearSelect();
      this.areasData();
      this.getData();

   }
}

let obj = {
   wrapper: '.wrapper',
   option: 'option',
   adress: '.adress',
   select: 'select',
}

let list = new ListAddresses(obj);
list.init();