import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-a1-co-lubie-robic',
  templateUrl: './a1-co-lubie-robic.component.html',
  styleUrls: ['./a1-co-lubie-robic.component.scss']
})





export class A1CoLubieRobicComponent implements OnInit{



points = 0;
answered = 0;
Fourpoints = 0;
resetex4: string | any;
resetex4two: string | any;
resetex4three: string | any;
resetex4four: string | any;
resetex4five: string | any;
resetex4six: string | any;
resetex4seven: string | any;
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

@ViewChild('ex4message') ex4Message: ElementRef | undefined;
@ViewChild('plusseven') plusSevn: ElementRef | undefined;

@ViewChild('ex5word') ex5word: ElementRef | undefined;



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

/////////////////////////////////////////////





ngOnInit(): void {
  this.shuffleArray(this.matchArray);
  this.ex5()
  this.ex6()
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

   //////////// Exercise 4 ///////////////////////



   takeFunction(event: any) {
    const input = event.target.value
    const answer = event.target.dataset.answer
    const box = event.target
    console.log(box)
    const plusSeven = this.plusSevn?.nativeElement
    if (input.toLowerCase() === answer) {
      box.classList.add('correct')
      box.disabled = true;
      this.Fourpoints += 7;
      plusSeven.classList.add('active')
      const messageex4 = this.ex4Message?.nativeElement
      setTimeout(() => {
        plusSeven.classList.remove('active')
      }, 1000)
      if (this.Fourpoints == 49) {
        console.log('49')
        messageex4.classList.add('active')
      }

    }
   }

   getLetter(event: any) {
    const input = event.target.value
    const one = input.charAt(0)
    const two = input.charAt(1)
    const three = input.charAt(2)
    const four = input.charAt(3)
    const five = input.charAt(4)
    let parent = event.target.parentElement
    let parentChild = parent.firstChild
    const plusSeven = this.plusSevn?.nativeElement
    console.log(parentChild)
    let currentInput = parentChild.value
    let firstLetterCurrentInput = currentInput.charAt(0)
    let secondLetterCurrentInput = currentInput.charAt(1)
    let thirdLetterCurrentInput = currentInput.charAt(2)
    let fourthLetterCurrentInput = currentInput.charAt(3)
    let fifthLetterCurrentInput = currentInput.charAt(4)
    if (firstLetterCurrentInput !== one) {
      console.log('add')
      console.log(parentChild.value)
      let arr = parentChild.value.split('')
      arr[0] = one
      parentChild.value = arr.join('')
      this.Fourpoints--
      if (parentChild.dataset.answer.toLowerCase() === parentChild.value.toLowerCase()) {
        parentChild.classList.add('correct')
        parentChild.disabled = true;
        this.Fourpoints += 7;
        plusSeven.classList.add('active')
        setTimeout(() => {
          plusSeven.classList.remove('active')
        }, 1000)

      }

    } else if (firstLetterCurrentInput === one && secondLetterCurrentInput !== two){
      console.log('add second')
      let arr = parentChild.value.split('')
      arr[1] = two
      parentChild.value = arr.join('')
      this.Fourpoints--
      if (parentChild.dataset.answer.toLowerCase() === parentChild.value.toLowerCase()) {
        parentChild.classList.add('correct')
        parentChild.disabled = true;
        this.Fourpoints += 7;
        plusSeven.classList.add('active')
        setTimeout(() => {
          plusSeven.classList.remove('active')
        }, 1000)
      }

    } else if (firstLetterCurrentInput === one && secondLetterCurrentInput === two && thirdLetterCurrentInput !== three) {
      console.log('add third')
      let arr = parentChild.value.split('')
      arr[2] = three
      parentChild.value = arr.join('')
      this.Fourpoints--
      if (parentChild.dataset.answer.toLowerCase() === parentChild.value.toLowerCase()) {
        parentChild.classList.add('correct')
        parentChild.disabled = true;
        this.Fourpoints += 7;
        plusSeven.classList.add('active')
        setTimeout(() => {
          plusSeven.classList.remove('active')
        }, 1000)
      }
    } else if (firstLetterCurrentInput === one && secondLetterCurrentInput === two && thirdLetterCurrentInput === three && fourthLetterCurrentInput !== four) {
      console.log('add fourth')
      let arr = parentChild.value.split('')
      arr[3] = four
      parentChild.value = arr.join('')
      this.Fourpoints--
      if (parentChild.dataset.answer.toLowerCase() === parentChild.value.toLowerCase()) {
        parentChild.classList.add('correct')
        parentChild.disabled = true;
        this.Fourpoints += 7;
        plusSeven.classList.add('active')
        setTimeout(() => {
          plusSeven.classList.remove('active')
        }, 1000)
      }
    } else if (firstLetterCurrentInput === one && secondLetterCurrentInput === two && thirdLetterCurrentInput === three && fourthLetterCurrentInput === four && fifthLetterCurrentInput !== five) {
      console.log('add fourth')
      let arr = parentChild.value.split('')
      arr[4] = five
      parentChild.value = arr.join('')
      this.Fourpoints--
      if (parentChild.dataset.answer.toLowerCase() === parentChild.value.toLowerCase()) {
        parentChild.classList.add('correct')
        parentChild.disabled = true;
        this.Fourpoints += 7;
        plusSeven.classList.add('active')
        setTimeout(() => {
          plusSeven.classList.remove('active')
        }, 1000)
      }
     } else {
      console.log('its there')
      console.log(parentChild)
      parentChild.classList.add('nohints')
      setTimeout(() => {
        parentChild.classList.remove('nohints')
      }, 500)
    }



}



restartEx4() {
  let inputsHTML = document.getElementsByClassName("input");
  let arr = Array.from(inputsHTML)
  arr.forEach(el => {
    (el as HTMLInputElement).disabled = false;
    el.classList.remove('correct')
      this.Fourpoints = 0;
      this.resetex4 = '';
      this.resetex4two = '';
      this.resetex4three = '';
      this.resetex4four = '';
      this.resetex4five = '';
      this.resetex4six = '';
      this.resetex4seven = '';
  })

}
///////////////EXERCISE 5/////////////////////////////////////

currentIndex = 0;

ex5wordQ = [
  {
    word: ['d', '_', 'u', 'g', 'o'],
    letter: 'ł'
  },
  {
    word: ['w', 'o', 'k', '_', 'ł'],
    letter: 'ó'
  },
  {
    word: ['p', 'i', '_', 't', 'e', 'k'],
    letter: 'ą'
  },
  {
    word: ['j', 'e', '_', 'd', 'z', 'i', 'ć'],
    letter: 'ź'
  },
  {
    word: ['g', 'r', 'a', '_'],
    letter: 'ć'
  },
]

ex5words = [
  'długo', 'wokół', 'piątek', 'jeździć', 'grać'
]



ex5() {
  const ex5body = document.getElementById("ex5word")

  while (ex5body?.lastElementChild) {
    ex5body.removeChild(ex5body.lastElementChild)
  }


  this.ex5wordQ[this.currentIndex].word.forEach(l => {
   const button = document.createElement('button')
    button.innerText = l;
    button.classList.add('ex5btn')
    button.setAttribute("style", 'background-color:#A32724; padding:5px 15px; font-size:32px; color:white; font-weight:bold; border:none; margin-right:3px')
    ex5body?.appendChild(button)



  })

}

ex5function(event: any) {

  let value = event.target.innerText
  let wholevalue = event.target

  let found = this.ex5wordQ[this.currentIndex].word.findIndex(el => el === '_')


  let wordHtml = this.ex5word?.nativeElement.children
  let word = [...wordHtml]
  word.forEach(el => {
    if (el.innerText === '_' && value == this.ex5wordQ[this.currentIndex].letter) {
      const keysHtml = document.getElementsByClassName('key')
      const keys = Array.from(keysHtml)
      keys.forEach(key => {
        key.classList.remove('incorrect')
      })
      el.innerText = value
      if (el.innerText === this.ex5wordQ[this.currentIndex].letter) {
        console.log('correct')
        this.currentIndex++
        if (this.currentIndex < 5) {
          setTimeout(() => {
            this.ex5()
          }, 1000)

        } else {
          console.log('end game')
          const keysHtml = document.getElementsByClassName('key')
          const keys = Array.from(keysHtml)
          keys.forEach(key => {
          key.classList.add('endgame')
          const enddisplay = document.getElementById('endgame-display-container')
          enddisplay?.classList.add('active')
      })
        }

      }
    }

    if (el.innerText === '_' && value !== this.ex5wordQ[this.currentIndex].letter) {
      console.log('red')
      wholevalue.classList.add('incorrect')
    }

  })



}
////////////////EXERCISE 6//////////////////////////////////////////////
ex6textcorrect = ['Mam', 'na', 'imię', 'Rafał', 'i', 'bardzo', 'lubię', 'malować', ',', 'składać', 'origami', 'i', 'pływać', '.', 'Lubię', 'także', 'jeździć', 'na', 'rowerze', '.']

ex6text = ['Mam', 'na', '_', 'Rafał', 'i', 'bardzo', '_', 'malować', ',', 'składać', 'origami', 'i', '_', '.', 'Lubię', 'także', 'jeździć', 'na', '_', '.']


ex6count = 0;
correctOnes = 0;

isCollapsed = true;

ex6() {
  this.ex6text.forEach(el => {
    console.log(el)
    if (el !== '_') {
      const text = document.createElement('div')
      text.innerText = el
      const parent = document.getElementById('ex6text')
      parent?.appendChild(text)
    } else {
      const input = document.createElement('input')
      input.setAttribute("style", 'width:100px; padding:0px 5px')
      input.classList.add('ex6input')
      input.tabIndex = this.ex6count++;
      input.addEventListener('input', (event) => {
        console.log(this.ex6text)
        const inpT = (event.target as HTMLInputElement)
        const inp = (event.target as HTMLInputElement).value
        const inpTab = (event.target as HTMLInputElement).tabIndex
        console.log(inpT)
        console.log(inp)
        console.log(inpTab)
        if (inp === 'imię' && inpTab === 0 || inp === 'lubię' && inpTab === 1 || inp === 'pływać' && inpTab === 2 || inp === 'rowerze' && inpTab === 3) {
          console.log('first match')
          inpT.setAttribute("style", 'width:100px; padding:0px 5px; background-color:green; color:white;')
          inpT.disabled = true;
          this.correctOnes++
          console.log(this.correctOnes)
          if (this.correctOnes === 4) {
            console.log('wiining action')
          }
        }

      })
      const parent = document.getElementById('ex6text')
      parent?.appendChild(input)
      console.log(this.ex6text)
    }
  })
}

ex6checkword(event: any) {
console.log('wwwwwww')
}

}


