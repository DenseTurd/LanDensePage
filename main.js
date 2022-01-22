// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    usersName = document.getElementById('name'),
    usersFocus = document.getElementById('focus');

let greetingMessage = '',
    today = new Date(),
    //today = new Date(2003, 06, 10, 12, 33, 30),
    hour = 0,
    min = 0,
    sec = 0;

// Show time
function showTime() {
    today = new Date();
    hour = today.getHours();
    min = addZero(today.getMinutes());
    sec = addZero(today.getSeconds());
    // Output time
    time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec}`;

    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgAndGreeting() {
    hour = today.getHours();

    if (hour < 12) {
        document.body.style.backgroundImage = "url('/img/Morning.jpg')";
        greetingMessage = "Good Morning";
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('/img/Afternoon.jpg')";
        greetingMessage = "Good Afternoon";
    } else {
        document.body.style.backgroundImage = "url('/img/Evening.jpg')";
        greetingMessage = "Good Evening";
        document.body.style.color = 'white';
    }
    greeting.textContent = greetingMessage;
}

function getName() {
    if (localStorage.getItem('name') === null) {
     usersName.textContent = 'You';
    } else {
     usersName.textContent = localStorage.getItem('name');
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
     usersFocus.textContent = 'Exist I guess';
    } else {
     usersFocus.textContent = localStorage.getItem('focus');
    }
}

usersName.addEventListener('keypress', setName);
usersName.addEventListener('blur', setName);

usersFocus.addEventListener('keypress', setFocus);
usersFocus.addEventListener('blur', setFocus);

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('name', usersName.textContent);
            usersName.blur()
        }
    } else {
        localStorage.setItem('name', usersName.textContent);
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('focus', usersFocus.textContent);
            usersFocus.blur()
        }
    } else {
        localStorage.setItem('focus', usersFocus.textContent);
    }

}

//Run
showTime();
setBgAndGreeting();
getName();
getFocus();


window.addEventListener('click', () => {
    speak();
    console.log('Window click');
});
window.addEventListener('keypress', () => {
    speak();
    console.log('Window keypress');
});
    

let spoken = false;
window.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded');
    spoken = false;
})

function speak() {
    if (spoken) return;
    if ('speechSynthesis' in window) {
        console.log('Will speak');
    } else {
        console.log(`Won't speak`);
        return;
    }

    window.speechSynthesis.cancel()

    let msg = new SpeechSynthesisUtterance();
    msg.text = `${greetingMessage} ${usersName.textContent}.
    It is ${hour} ${min} on ${getDayName(today.getDay())} the ${addSuffixToDate(today.getDate())} of ${getMonthName(today.getMonth())}.
    Today you will ${usersFocus.textContent}`;
    window.speechSynthesis.speak(msg);
    spoken = true;
}

function addSuffixToDate(i) {
    if (i === 1) {
        return i.toString() + 'st';
    }
    if (i === 2) {
        return i.toString() + 'nd';
    }
    if (i === 3) {
        return i.toString() + 'rd';
    }    
    if (i === 21) {
        return i.toString() + 'st';
    }
    if (i === 22) {
        return i.toString() + 'nd';
    }
    if (i === 23) {
        return i.toString() + 'rd';
    }
    if (i === 31) {
        return i.toString() + 'st';
    }
    if (i === 32) { // Just in case months last this long ever
        return i.toString() + 'nd';
    }
    if (i === 33) {
        return i.toString() + 'rd';
    }
    return i.toString() + 'th';
}

function getDayName(i) {
    let day = 'Saturday';
    switch (i) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
    }
    return day;
}

function getMonthName(i) {
    let month = 'December';
    switch (i) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
    }
    return month;
}