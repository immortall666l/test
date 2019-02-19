window.addEventListener('DOMContentLoaded', () => {

    const  cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function(btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true), 
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');
            
            trigger.remove();

            showConfirm();
            calcGoods(1);
            
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);    

            cartWrapper.appendChild(item);
            if (empty) {
                empty.style.display = 'none';
            }

            calcTotal();
            removeFromCart();

        });
    });


    function sliceTitle() {
        titles.forEach(function(item) {
            if (item.textContent.length < 70) {
                return;
            } else {
                const str = item.textContent.slice(0, 71) + '...';
                //const str = `${item.textContent.slice(0, 71)} ...`; ES6
                item.textContent = str;
            }
        });
    }
    sliceTitle();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval (frame, 10);
        function frame() {
            if (counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;  //counter = counter -1; 
                confirm.style.transform = `translateY(-${counter}px)`; //блок confirm будет сдвгаться по оси вверх (-)
                confirm.style.opacity = '.' + counter; //анимация будет плавно становиться прозрачной (opacity)
            }
        }
    }
    //setInterval(sliceTitle, 30) - запускает скрипт каждый отрезок времени (каждые 30 сек, напримерs)
    //setTimeout(sliceTitle, 30) - запускает скрип через определенное время (30 сек, например)

    function calcGoods(i) {
        const items = cartWrapper.querySelectorAll('.goods__item');
        let empty = cartWrapper.querySelector('.empty');
        badge.textContent = i + items.length; //считает к-во элементов в корзине
        if (badge.textContent < 1) {
            empty.style.display = 'block'; //Домашнее задание 2!!!
        }
        
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0; 
        prices.forEach(function(item) {
            total += +item.textContent; //+= сокращенная форма записи чтобы добавлять значения, +item.textContent (+)  - делает из строчного элемента числовой
        });
        totalCost.textContent = total;
        
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                calcGoods(0); 
                calcTotal();
               
            });
        });
    }
});












//переменные - var, let, const;

//var - переменную можно использовать только когда она объявлена
    //(hosting) -  
//    console.log(a); //переменная еще пустая (undefined), но переменная будет существовать до того как она объявлена. т.к. интерпретатор объявляет все переменные изначально
//    var a = 5; // в переменную помещено число 5
//    console.log(a); //выводит значение переменной - 5

//let - переменную можно использовать только когда она объявлена
//    console.log(a); //переменная не существует, тип данных (is not defined)
//    let a = 5; // в переменную помещено число 5
 //   console.log(a); //выводит значение переменной - 5

//const - желательно использовать, но переменная которая 100% будет меняться указывать через let
//    const a = 5; // в переменную помещено число 5
//    console.log(a); //выводит значение переменной - 5
//    a = 10; //невозможно перезаписать константу. (let и var можно перезаписать)
//    console.log(a); //


 //   const a = {
 //       name: 'Alex' 
 //   };
//    a.name = 'Ivan'; //const можно поменять. Мутирует объект (посмотреть иммутабельность)
//    console.log(a); 