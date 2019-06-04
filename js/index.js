"use strict"


	var score = 0; 
	var numOfUnPairs = 9;
	var numOfOpenPairs = 0;

	var ArrOfCards = createArrOfAllCards();
	var randCards = generateRandomCards();
	var randCards = randCards.concat(randCards);
	var cards = createArrOfCards(shuffle(randCards), ArrOfCards);

	this.generalFunc(cards);




	function createArrOfAllCards(){
			var createArray = [];

			for(var i = 0; i < 52; i++){
				createArray[i] = new Image();
				createArray[i].id = i+1;
				createArray[i].img = "Cards/(" + (i+1) + ").png";
		    }

		    return createArray;
		}


	function randomInteger(min, max) {
		    var rand = min + Math.random() * (max + 1 - min);
		    rand = Math.floor(rand);

		    return rand;
		}


	function generateRandomCards(){
			var randArr = [];
			var index;
			var flag;

			for(var i = 0; i < 9; i++){
				flag = true;

			  	while(flag){
			    	index = randomInteger(0,51);

			    	if($.inArray(index, randArr) === -1){
			    		break;
			    	}
		 	 	}

				randArr[i] = index;
			}

			return randArr;
		}


	function shuffle(a) {
	    	for (var i = a.length - 1; i > 0; i--) {
	        	const j = Math.floor(Math.random() * (i + 1));
	        	[a[i], a[j]] = [a[j], a[i]];
	   		}

	    	return a;
		}


	function createArrOfCards(randIndex, arrCards){
			var createArr = [];

			for(var i = 0; i < randIndex.length; i++){
				createArr[i] = new Image();
				createArr[i].id = randIndex[i]+1;
				createArr[i].img = arrCards[randIndex[i]].img;
			}

			return createArr;
		}



	function generalFunc(cardA){
			this.$game = $(".game");
			this.$restartButton = $(".restartButton");
			this.cardsArray = cardA;
			this.$cards = $(this.cardsArray);
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$scored = $("#score");
			this.$scored.text(score);
			this.$memoryCards = $(".card");
			this.$memoryCards.find(".inside").addClass("picked");
			setTimeout(function(){
						this.$memoryCards.find(".inside").removeClass("picked");
					}, 5000);
			this.paused = false;
     		this.guess = null;
     		this.binding();
		}


	function binding(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", function(){
				location.reload();
			});
		}


	function cardClicked(){
			var $card = $(this);

			if(!paused &&  !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");

				if(!guess){
					guess = $(this).attr("data-id");
				} else if(guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					$(this).removeClass('picked');
					
					setTimeout(function(){
								   	$(".matched").find('img').fadeToggle("slow");
									$(".matched").find('img').fadeToggle("slow");
									$(".matched").find('img').attr('src','Cards/matched.png');

								}, 1000);

					guess = null;
					score+=numOfUnPairs*42;
					numOfUnPairs--;
					numOfOpenPairs++;
					$('#score').text(score);
				} else {
					guess = null;
					paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						paused = false;
					}, 600);
					score-=numOfOpenPairs*42;
					$('#score').text(score);
				}

				if($(".matched").length == $(".card").length){
					setTimeout(function(){
						location.href='page-1-end-page.html?score='+score;
					}, 2000);

				}
			}
		}


	function buildHTML(){
			var frag = '';

			this.$cards.each(function(k, v){
				frag += '<div class="card" data-tid="Card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front" data-tid="Card-flipped"><img src="'+ v.img +'"\ /></div>\
				<div class="back"><img src="Cards/CardsBack.jpg"\
				 /></div></div>\
				</div>'
			});

			return frag;
		}