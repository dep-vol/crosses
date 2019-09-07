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
            this.check();
        },1000)
        
    },

    check: function () {
           
        for(let i =0, j=0, z=4; i < 9, j<3, z>=0; i+=3, j++,z=z-2) {
            
            //DIAGONAL CHECKING
            
                if((this.cells[4].innerHTML == this.cells[4+z].innerHTML) && 
                (this.cells[4].innerHTML == this.cells[4-z].innerHTML) && (this.cells[4].innerHTML != '') && 
                (z!=0) ) {
                    this.cells[4].className = 'cellWin';
                    this.cells[4+z].className = 'cellWin';
                    this.cells[4-z].className = 'cellWin';
                    if (this.cells[4].innerHTML == this.choosedSym) {
                        this.finish('player');
                    }
                    else {
                        this.finish('bot');
                    }
                     
                }
                        
            //HORIZONTAL CHECKING

                if((this.cells[i].innerHTML == this.cells[i+1].innerHTML) && 
                (this.cells[i].innerHTML == this.cells[i+2].innerHTML) && 
                (this.cells[i].innerHTML !='')) {
                    
                    this.cells[i].className = 'cellWin';
                    this.cells[i+1].className = 'cellWin';
                    this.cells[i+2].className = 'cellWin';
                    if (this.cells[i].innerHTML == this.choosedSym) {
                        this.finish('player');
                    }
                    else {
                        this.finish('bot');
                    }
                                         
                }
            
            //VERTICAL CHECKING

                if((this.cells[j].innerHTML == this.cells[j+3].innerHTML) && 
                (this.cells[j].innerHTML == this.cells[j+6].innerHTML) && 
                (this.cells[j].innerHTML !='')) {
                    this.cells[j].className = 'cellWin';
                    this.cells[j+3].className = 'cellWin';
                    this.cells[j+6].className = 'cellWin';
                    if (this.cells[j].innerHTML == this.choosedSym) {
                        this.finish('player');
                    }
                    else {
                        this.finish('bot');
                    }
                    
                }
            
                
        } 
        //STANDOFF CHECKING
        if ((this.cells[0].innerHTML != '') &&
            (this.cells[1].innerHTML != '') &&
            (this.cells[2].innerHTML != '') &&
            (this.cells[3].innerHTML != '') &&
            (this.cells[4].innerHTML != '') &&
            (this.cells[5].innerHTML != '') &&
            (this.cells[6].innerHTML != '') &&
            (this.cells[7].innerHTML != '') &&
            (this.cells[8].innerHTML != '')
            ) 
        {
            this.finish('standoff');  
        }
       
     
       
        
        
    },

    finish: function (who) {
        let winAlert = document.querySelector('.win');
        render.animate(winAlert, 'y');
        if (who == 'player') {
            setTimeout(() => {
                winAlert.innerHTML = '<h2>Победа!!!</h2>';
            }, 3000);
            clearInterval(gameTime);
        }
        else if (who == 'standoff') {
            setTimeout(() => {
                winAlert.innerHTML = '<h2>Ничья!</h2>';
            }, 3000);
            clearInterval(gameTime);
        }
        else {
            setTimeout(() => {
                winAlert.innerHTML = '<h2>Увы!!! Попробуй в другой раз :)</h2>';
            }, 3000);
            clearInterval(gameTime);
        }
        
    },

    //BOT Section

   


      
};


let bot = {
    win: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    chooseWin: function () {
        let i = 0;
        let result;
        let reFunc = function (i) {
            if(i==8) {
                for(let k=0; k<9; k++){
                    if(gameBoard.cells[k].innerHTML =='') {
                        return result = k;
                    }
                    
                }
                return result = undefined;    
            };
            if (((gameBoard.cells[this.win[i][0]].innerHTML == gameBoard.choosedSym) &&
                (gameBoard.cells[this.win[i][1]].innerHTML == gameBoard.choosedSym) &&
                (gameBoard.cells[this.win[i][2]].innerHTML =='')) ||
                ((gameBoard.cells[this.win[i][0]].innerHTML == gameBoard.botSym) &&
                (gameBoard.cells[this.win[i][1]].innerHTML == gameBoard.botSym) &&
                (gameBoard.cells[this.win[i][2]].innerHTML =='')))
            {
                return result = this.win[i][2];
            }
            else if (((gameBoard.cells[this.win[i][1]].innerHTML == gameBoard.choosedSym) &&
            (gameBoard.cells[this.win[i][2]].innerHTML == gameBoard.choosedSym)&&
            (gameBoard.cells[this.win[i][0]].innerHTML =='')) ||
            ((gameBoard.cells[this.win[i][1]].innerHTML == gameBoard.botSym) &&
            (gameBoard.cells[this.win[i][2]].innerHTML == gameBoard.botSym) &&
            (gameBoard.cells[this.win[i][0]].innerHTML =='')))
            {
                return result= this.win[i][0];
            }
            else if (((gameBoard.cells[this.win[i][0]].innerHTML == gameBoard.choosedSym) &&
            (gameBoard.cells[this.win[i][2]].innerHTML == gameBoard.choosedSym)&&
            (gameBoard.cells[this.win[i][1]].innerHTML =='')) || 
            ((gameBoard.cells[this.win[i][0]].innerHTML == gameBoard.botSym) &&
            (gameBoard.cells[this.win[i][2]].innerHTML == gameBoard.botSym) &&
            (gameBoard.cells[this.win[i][1]].innerHTML =='')))
            {
                return result=this.win[i][1];
            }
            i++;
            reFunc.call(bot,i);
            
        }
        reFunc.call(bot,i);
        return result;

    },

    checkBest: function () {

        if (gameBoard.cells[4].innerHTML == '') {
            return 4;
        }
        else return this.chooseWin();


    },



    canTurn: function () {

    },
    botMakeTurn: function () {
        let turn = this.checkBest();
        if (turn || turn == 0) {
            setTimeout(() => {
                gameBoard.cells[turn].innerHTML = gameBoard.botSym;
                gameBoard.botTurn = false;
            }, 2000);

        }



    }


}

