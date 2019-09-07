let gameBoard = {
    cells : document.querySelectorAll('.cell'),
    startButton : document.querySelector('.Go>button'),
    navField : document.querySelector('.playSym'),
    choosedSym : '',
    botSym : '',
    gameTime : undefined,
    botTurn : false,
    
    listener: function(els,event,func) {
        els.forEach(element => {
            element.addEventListener(event, func);
        })
    },
    
    start: function() {
        this.listener(this.cells,'click',(e)=>{
           
            if(((e.target.innerHTML != this.choosedSym) && (e.target.innerHTML != this.botSym)) && (!this.botTurn)) {
                e.target.innerHTML = this.choosedSym;
                this.check(e);
                bot.botMakeTurn();
                this.botTurn = true;
                  
            }

        
        
        });



        this.startButton.className = 'hide';
        // self = this;
        render.draw(this.navField,
            `<h3>Выберите фигуру для игры:</h3>
             <div id="zero">0</div>
             <div id="cross">X</div>`,'playSymEffect');
        render.animate(this.navField,'playSymEffect');
        this.choosing();
        
    },

    choosing: function() {
        let crossEl = document.getElementById('cross');
        let zeroEl = document.getElementById('zero');
        
        
        this.listener([crossEl,zeroEl],'click', (e) => {
            if(!this.choosedSym) {
                this.choosedSym = e.target.innerHTML;
                this.botSym = (this.choosedSym == 'X') ? '0' : 'X';
                while(this.navField.firstChild) {
                    this.navField.firstChild.remove();
                };
                 

            }
            let alertNode = `
                <h3>Вы выбрали:</h3>
                <div> ${this.choosedSym} </div>
                
                `;
            this.navField.innerHTML = alertNode;
            setTimeout(()=>{
                while(this.navField.firstChild) {
                    this.navField.firstChild.remove();
                };
                this.timer();
                
            },500);
        });

    },

    timer: function() {
        let second = 1;
        gameTime = setInterval(() => {
            this.navField.innerHTML = `
                <h3>Прошло: ${second} сек</h3>
                `;
            second++;
        },1000)
        
    },

    check: function (e) {
           
        for(let i =0, j=0, z=4; i < 9, j<3, z>=0; i+=3, j++,z=z-2) {
            
            //DIAGONAL CHECKING
            
                if((this.cells[4].innerHTML == this.cells[4+z].innerHTML) && 
                (this.cells[4].innerHTML == this.cells[4-z].innerHTML) && (this.cells[4].innerHTML != '') && 
                (z!=0) ) {
                    this.cells[4].className = 'cellWin';
                    this.cells[4+z].className = 'cellWin';
                    this.cells[4-z].className = 'cellWin';
                    this.finish();
                     
                }
                        
            //HORIZONTAL CHECKING

                if((this.cells[i].innerHTML == this.cells[i+1].innerHTML) && 
                (this.cells[i].innerHTML == this.cells[i+2].innerHTML) && 
                (this.cells[i].innerHTML !='')) {
                    
                    this.cells[i].className = 'cellWin';
                    this.cells[i+1].className = 'cellWin';
                    this.cells[i+2].className = 'cellWin';
                    this.finish();
                     
                }
            
            //VERTICAL CHECKING

                if((this.cells[j].innerHTML == this.cells[j+3].innerHTML) && 
                (this.cells[j].innerHTML == this.cells[j+6].innerHTML) && 
                (this.cells[j].innerHTML !='')) {
                    this.cells[j].className = 'cellWin';
                    this.cells[j+3].className = 'cellWin';
                    this.cells[j+6].className = 'cellWin';
                    this.finish();
                }
        } 
    },

    finish: function(){
        let winAlert = document.querySelector('.win');
        render.animate(winAlert,'y');
        setTimeout(()=>{
            winAlert.innerHTML = '<h2>Победа!!!</h2>';
        },3000);
        clearInterval(gameTime);
        
    },

    //BOT Section

   


      
};


let bot = {
    checkBest: function(){
        
        if (gameBoard.cells[4].innerHTML == '') {
            return 4;
        }
        if (gameBoard.cells[4].innerHTML == gameBoard.botSym) {
            for (let i = 0; i<7; i+=3) {
                if(((gameBoard.cells[i].innerHTML == gameBoard.choosedSym) && 
                    (gameBoard.cells[i+1].innerHTML == gameBoard.choosedSym)) && 
                    (gameBoard.cells[i+2].innerHTML=='')) 
                {
                    return i+2;
                }
                else if(((gameBoard.cells[i+1].innerHTML == gameBoard.choosedSym) && 
                        (gameBoard.cells[i+2].innerHTML == gameBoard.choosedSym)) && 
                        (gameBoard.cells[i].innerHTML=='')) 
                {
                    return i;
                }
                else if(((gameBoard.cells[i].innerHTML == gameBoard.choosedSym) && 
                        (gameBoard.cells[i+2].innerHTML == gameBoard.choosedSym)) && 
                        (gameBoard.cells[i+1].innerHTML=='')) 
                {
                    return i+1;
                }
                

                
                
            }

            for (let j=0; j<3; j++) {
                if ((gameBoard.cells[j].innerHTML == gameBoard.choosedSym) && 
                    (gameBoard.cells[j+3].innerHTML == gameBoard.choosedSym)) 
                {
                    return j+6;
                }
                else if ((gameBoard.cells[j].innerHTML == gameBoard.choosedSym) && 
                    (gameBoard.cells[j+6].innerHTML == gameBoard.choosedSym)) 
                {
                    return j+3;
                }
                else if ((gameBoard.cells[j+3].innerHTML == gameBoard.choosedSym) && 
                    (gameBoard.cells[j+6].innerHTML == gameBoard.choosedSym)) 
                {
                    return j;
                }
            }

        }

        
        },

    
    
    canTurn: function() {
         
    },
    botMakeTurn: function(){
        let turn = this.checkBest();
        if(turn || turn == 0) {
            setTimeout(() => {
                gameBoard.cells[turn].innerHTML = gameBoard.botSym;
                gameBoard.botTurn = false;
            },2000);
            
        }



    }


}

