import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-a1-co-lubie-robic',
  templateUrl: './a1-co-lubie-robic.component.html',
  styleUrls: ['./a1-co-lubie-robic.component.scss']
})



export class A1CoLubieRobicComponent implements OnInit{
points = 0;
answered = 0;
@ViewChildren('reset, reset2, reset3, reset4, reset5', {read: ElementRef}) childComp:QueryList<ElementRef> | undefined


@ViewChild('appearBack') appearBack: ElementRef | undefined;
@ViewChild('appearBack2') appearBack2: ElementRef | undefined;
@ViewChild('appearBack3') appearBack3: ElementRef | undefined;
@ViewChild('appearBack4') appearBack4: ElementRef | undefined;
@ViewChild('appearBack5') appearBack5: ElementRef | undefined;

@ViewChild('animate') animate: ElementRef | undefined;
@ViewChild('animate2') animate2: ElementRef | undefined;
@ViewChild('animate3') animate3: ElementRef | undefined;
@ViewChild('animate4') animate4: ElementRef | undefined;
@ViewChild('animate5') animate5: ElementRef | undefined;

@ViewChild('correcttext') correctText: ElementRef | undefined;
@ViewChild('correcttext2') correctText2: ElementRef | undefined;
@ViewChild('correcttext3') correctText3: ElementRef | undefined;
@ViewChild('correcttext4') correctText4: ElementRef | undefined;
@ViewChild('correcttext5') correctText5: ElementRef | undefined;

@ViewChild('matchgame') matchGame: ElementRef | undefined;


sentence = [
  'Moim'
];

sentence2 = [
  'Bardzo'
];

sentence3 = [
  'Nie'
];

sentence4 = [
  'Lubię'
];

sentence5 = [
  'Bardzo'
];

//matchArray = ['go', 'try', 'próbować', 'iść', 'pływać', 'swim', 'uzdolniony', 'talented', 'piątek', 'friday', 'szybko', 'fast', 'muzyka', 'music', 'taniec', 'dance', 'teatr', 'theater']

matchArray = [
  {
    label: 'go',
    value: 'go'
  },
  {
    label: 'iść',
    value: 'go'
  },
  {
    label: 'try',
    value: 'try'
  },
  {
    label: 'próbować',
    value: 'try'
  },
  {
    label: 'pływać',
    value: 'swim'
  },
  {
    label: 'swim',
    value: 'swim'
  },
  {
    label: 'uzdolniony',
    value: 'talented'
  },
  {
    label: 'talented',
    value: 'talented'
  },
  {
    label: 'piątek',
    value: 'friday'
  },
  {
    label: 'friday',
    value: 'friday'
  },
  {
    label: 'szybko',
    value: 'fast'
  },
  {
    label: 'fast',
    value: 'fast'
  },
  {
    label: 'muzyka',
    value: 'music'
  },
  {
    label: 'music',
    value: 'music'
  },
  {
    label: 'taniec',
    value: 'dance'
  },
  {
    label: 'dance',
    value: 'dance'
  },
  {
    label: 'teatr',
    value: 'theatre'
  },
  {
    label: 'theatre',
    value: 'theatre'
  },

]

checkArray = ['']
checkArrayByLabel = ['']

matchedWords = 0;


ngOnInit(): void {
  this.shuffleArray(this.matchArray);
}

shuffleArray(matchArray: any) {
  let currentIndex = matchArray.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [matchArray[currentIndex], matchArray[randomIndex]] = [matchArray[randomIndex], matchArray[currentIndex]];
  }
  return matchArray
}

/////// Exercise 1 Below ///////////////////////////////

  checkAnswer(event: any) {
    const answer = event.target.dataset.answer;
    const element = event.target
    const parent = event.target.parentElement;
    if (answer === 'correct') {
      element.classList.add('correct')
     parent.classList.add('disable')
     this.points++;
     this.answered++;
    } else if (answer === 'false') {
      element.classList.add('false')
      parent.classList.add('disable')
      this.answered++;
    } else {
      console.log('error')
    }
  }

  restartTest() {
    this.childComp?.forEach(x => {
      x.nativeElement.classList.remove('disable')
      const children = x.nativeElement.children
      const getEachChild = [...children]
      getEachChild.forEach(btn => {
        btn.classList.remove('correct')
        btn.classList.remove('false')
      })
    })
    this.points = 0;
    this.answered = 0;
  }
  /////// Exercise 2 Below Sentence 1 ///////////////////////////////

  removeWord(event: any) {
    const value = event.target.innerText
    this.sentence.forEach((element, index) => {
      if (element === value && index != 0) this.sentence.splice(index, 1)
    })
    const children = this.appearBack?.nativeElement.children
    const getEachChild = [...children]
    getEachChild.forEach(x => {
      if (x.value === value) {
        x.classList.remove('disappear')
      }
    })

  }


  addWord(event: any) {
    const word = event.target.value
    this.sentence.push(word)
    const wordClicked = event.target
    wordClicked.classList.add('disappear')
    this.checkOrder()
  }


  checkOrder() {
    if (this.sentence[1] === 'największym' && this.sentence[2] === 'hobby' && this.sentence[3] === 'jest' && this.sentence[4] === 'malarstwo') {
      this.animate?.nativeElement.classList.add('animate')
      this.correctText?.nativeElement.classList.add('active')
    } else if (this.sentence.length === 5) {
      console.log('wrong order')
    }
  }

  /////// Exercise 2 Below Sentence 2 ///////////////////////////////

  removeWord2(event: any) {
    const value = event.target.innerText
    this.sentence2.forEach((element, index) => {
      if (element === value && index != 0) this.sentence2.splice(index, 1)
    })
    const children = this.appearBack2?.nativeElement.children
    const getEachChild = [...children]
    getEachChild.forEach(x => {
      if (x.value === value) {
        x.classList.remove('disappear')
      }
    })

  }


  addWord2(event: any) {
    const word = event.target.value
    this.sentence2.push(word)
    const wordClicked = event.target
    wordClicked.classList.add('disappear')
    this.checkOrder2()
  }


  checkOrder2() {
    if (this.sentence2[1] === 'lubię' && this.sentence2[2] === 'jeździć' && this.sentence2[3] === 'na' && this.sentence2[4] === 'rowerze') {
      this.animate2?.nativeElement.classList.add('animate')
      this.correctText2?.nativeElement.classList.add('active')
    } else if (this.sentence2.length === 5) {
      console.log('wrong order2')
    }
  }

  /////// Exercise 2 Below Sentence 3 ///////////////////////////////

  removeWord3(event: any) {
    const value = event.target.innerText
    this.sentence3.forEach((element, index) => {
      if (element === value && index != 0) this.sentence3.splice(index, 1)
    })
    const children = this.appearBack3?.nativeElement.children
    const getEachChild = [...children]
    getEachChild.forEach(x => {
      if (x.value === value) {
        x.classList.remove('disappear')
      }
    })

  }


  addWord3(event: any) {
    const word = event.target.value
    this.sentence3.push(word)
    const wordClicked = event.target
    wordClicked.classList.add('disappear')
    this.checkOrder3()
  }


  checkOrder3() {
    if (this.sentence3[1] === 'jestem' && this.sentence3[2] === 'uzdolniony' && this.sentence3[3] === 'sportowo') {
      this.animate3?.nativeElement.classList.add('animate')
      this.correctText3?.nativeElement.classList.add('active')
    } else if (this.sentence3.length === 5) {
      console.log('wrong order3')
    }
  }

  /////// Exercise 2 Below Sentence 4 ///////////////////////////////

  removeWord4(event: any) {
    const value = event.target.innerText
    this.sentence4.forEach((element, index) => {
      if (element === value && index != 0) this.sentence4.splice(index, 1)
    })
    const children = this.appearBack4?.nativeElement.children
    const getEachChild = [...children]
    getEachChild.forEach(x => {
      if (x.value === value) {
        x.classList.remove('disappear')
      }
    })

  }


  addWord4(event: any) {
    const word = event.target.value
    this.sentence4.push(word)
    const wordClicked = event.target
    wordClicked.classList.add('disappear')
    this.checkOrder4()
  }


  checkOrder4() {
    if (this.sentence4[1] === 'robić' && this.sentence4[2] === 'rzeczy' && this.sentence4[3] === 'z' && this.sentence4[4] === 'papieru') {
      this.animate4?.nativeElement.classList.add('animate')
      this.correctText4?.nativeElement.classList.add('active')
    } else if (this.sentence4.length === 5) {
      console.log('wrong order4')
    }
  }

  /////// Exercise 2 Below Sentence 5 ///////////////////////////////

  removeWord5(event: any) {
    const value = event.target.innerText
    this.sentence5.forEach((element, index) => {
      if (element === value && index != 0) this.sentence5.splice(index, 1)
    })
    const children = this.appearBack5?.nativeElement.children
    const getEachChild = [...children]
    getEachChild.forEach(x => {
      if (x.value === value) {
        x.classList.remove('disappear')
      }
    })

  }


  addWord5(event: any) {
    const word = event.target.value
    this.sentence5.push(word)
    const wordClicked = event.target
    wordClicked.classList.add('disappear')
    this.checkOrder5()
  }


  checkOrder5() {
    if (this.sentence5[1] === 'lubię' && this.sentence5[2] === 'muzykę' && this.sentence5[3] === 'i' && this.sentence5[4] === 'taniec' || this.sentence5[1] === 'lubię' && this.sentence5[2] === 'taniec' && this.sentence5[3] === 'i' && this.sentence5[4] === 'muzykę')  {
      this.animate5?.nativeElement.classList.add('animate')
      this.correctText5?.nativeElement.classList.add('active')
    } else if (this.sentence5.length === 5) {
      console.log('wrong order5')
    }
  }


   /////// Exercise 3 ////////////////////////////////////////////

   checkMatch(event: any) {
    const wordToCheck = event.target
    wordToCheck.classList.add('clicked')

    const findInArray = this.matchArray.find(x => x.label === event.target.innerText)
    this.checkArray.push(findInArray?.value!)
    this.checkArrayByLabel.push(findInArray?.label!)

   if (this.checkArray[1] === this.checkArray[2]) {
    const boardGameChildrenHTML = this.matchGame?.nativeElement.children
    const boardGameChildren = [...boardGameChildrenHTML]


    const findClicked = boardGameChildren.find(x => x.innerText === this.checkArrayByLabel[1])
    const findClicked2 = boardGameChildren.find(x => x.innerText === this.checkArrayByLabel[2])

    findClicked.classList.remove('clicked')
    findClicked2.classList.remove('clicked')
    findClicked.classList.add('matched')
    findClicked2.classList.add('matched')

    this.matchedWords++

  this.checkArray = ['']
  this.checkArrayByLabel = ['']

} else if (this.checkArray[1] !== this.checkArray[2] && this.checkArray.length === 3) {
  const boardGameChildrenHTML = this.matchGame?.nativeElement.children
    const boardGameChildren = [...boardGameChildrenHTML]

    const findClicked = boardGameChildren.find(x => x.innerText === this.checkArrayByLabel[1])
    const findClicked2 = boardGameChildren.find(x => x.innerText === this.checkArrayByLabel[2])
    findClicked.classList.add('notmatched')
    findClicked2.classList.add('notmatched')
    boardGameChildren.forEach(x => x.classList.add('turnoff'))

  setTimeout(() => {



    findClicked.classList.remove('clicked')
    findClicked2.classList.remove('clicked')
    findClicked.classList.remove('notmatched')
    findClicked2.classList.remove('notmatched')
    boardGameChildren.forEach(x => x.classList.remove('turnoff'))

    this.checkArray = ['']
    this.checkArrayByLabel = ['']
  }, 1000);

}


   }

   resetBoardGame() {
    const boardGameChildrenHTML = this.matchGame?.nativeElement.children
    const boardGameChildren = [...boardGameChildrenHTML]
    console.log(boardGameChildren)
    boardGameChildren.forEach(x => x.classList.remove('matched'))
    this.shuffleArray(this.matchArray);
    this.matchedWords = 0;
   }

}


