//전역변수 사용 회피 위한 즉시실행 익명 함수(지역변수)
(() =>{

    // 7.birdFlies 만들기
    const actions = {
        birdFlies(key) {
            if (key) {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
			} else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
			if (key) {
				document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
			} else {
				document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
			}
		}
    }

    // 1. 객체로 step 가져오기
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //4. 현재 활성화된(visible클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    // 6. intersectionObserver(콜백함수); => 어떤 요소가 눈에 보이는지 안보이는지 체크 

    const io = new IntersectionObserver((entries, observe) => { //매개변수 2개
        //console.log(entries[0].target.dataset.index); // 나올때 사라질때 체크
        ioIndex = entries[0].target.dataset.index * 1; //숫자로된 문자열을 숫자로 바꿀때 *1
        // 숫자열 = 파란색
        //console.log(ioIndex); //문자열 = 검정색
    });

    for (let i = 0; i < stepElems.length; i++){ //stepElems.length보다 작을 때까지 증가시킨다
        io.observe(stepElems[i]);//관찰 메서드, 모든스텝들이 관찰 대상으로 등록 후 실행될때 callback 함수도 실행
        //stepElems[i].setAttribute('data-index', i); //아이템 넣기
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 5. 함수 쪼개기
    function activate(action){ //visible
        currentItem.classList.add('visible');

        if (action) {
			actions[action](true); //객체 호출할 때, 해당하는 메서드 이름으로 적용하기위해 이렇게 적용
        }
    };

    function inactivate(action){ //remove
        currentItem.classList.remove('visible');

        if (action) {
			actions[action](false); //객체 호출할 때, 해당하는 메서드 이름으로 적용하기위해 이렇게 적용
        }
    }

    // 2. 스크롤 이벤트 시작할 때 동작하는 함수
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let temp = 0;

        //말풍선 위치 체크
        //for( let i = 0; i < stepElems.length; i++){
        for( let i = ioIndex - 1; i < ioIndex + 2; i++){ // ioIndex 까지만 루프 돌림
            step = stepElems[i]; // -1부터 시작하니까 undifined 

            if(!step) continue; // 만약에 step에 값이 없으면 패스 하고 다음턴 for 돌림
            boundingRect = step.getBoundingClientRect();
            //console.log(boundingRect.top);

            //루프 돌 때마다 1씩 플러스 temp++;

            //3. 범위설정
            if((boundingRect.top > window.innerHeight * 0.1) && (boundingRect.top < window.innerHeight * 0.8)) { //and 
                //console.log(step.dataset.index);

                /* 처음에 함수 체크로 빼줬고, index[0]에 담아놨으니 굳이 있는지 체크 안해도 처음게 visible들어가 있음 
               if(currentItem){ // 4-1. currentItem 있으면 지워줌
                    inactivate();
                }
                */
                inactivate(currentItem.dataset.action);

                currentItem = graphicElems[step.dataset.index]; // graphicElems[인덱스]
                activate(currentItem.dataset.action);
            } 
        }

        console.log(temp);
    });

    // 8. 새로고침하면 맨 위로 가게
    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100 ); //시간 늦춰서 0.1초뒤에 실행
    }, false);

    activate();
    
})(); // 실행(호출)

// console.log(a);