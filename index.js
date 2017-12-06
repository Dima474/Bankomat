var users = [
  {
    name: "Вася",
    balans: 10000,
    pin: 2222,
    sum: {
      sum1: "$2500",
      sum2: "$-2500"
    },
    date: {
      d1: Time(),
      d2: Time()
    }
  },
  {
    name: "Петя",
    balans: 9000,
    pin: 2323,
    sum: {
      sum1: "$200",
      sum2: "$-2700"
    },
    date: {
      d1: Time(),
      d2: Time()
    }
  },
  {
    name: "Ваня",
    balans: 8000,
    pin: 8596,
    sum: {
      sum1: "$-3000",
      sum2: "$-2500"
    },
    date: {
      d1: Time(),
      d2: Time()
    }
  }
];

// date, time
function Time() {
  var ld = new Date();
  var d = ld.toLocaleDateString();
  var t = ld.toLocaleTimeString();
  var out = t + ", " + d;
  return out;
}
// Кнопка Restart
function BtnRestart() {
  var BtnRestart = document.getElementById("res");
  BtnRestart.addEventListener("click", function(e) {
    var pin = document.querySelector("#password");
    pin.value = "";
    document.getElementById("err").style.display = "none";
    event.preventDefault();
  });
}

var d = new Date().toLocaleTimeString();
console.log(typeof d);

// Ввод с цыфровой панели пароля

var buttons = document.querySelectorAll("#but");
var str = "";
for (var i = 0; i < buttons.length; i++) {
  addEvLis(buttons[i]);
}
function addEvLis(button) {
  button.addEventListener("click", event);
  function event() {
    var type = button.getAttribute("value");
    var pin = document.querySelector("#password");
    str += type;
    pin.value = str;
    console.log(pin.value);
  }
}

// Ввод с цыфровой панели суммы для снятия

var but = document.querySelectorAll("#button");
console.log(but);
var str_1 = "";
for (var i = 0; i < but.length; i++) {
  addEL(but[i]);
}
function addEL(but) {
  but.addEventListener("click", event);
  function event() {
    var val = but.getAttribute("value");
    var sum = document.querySelector("#sum");
    str_1 += val;
    sum.value = str_1;
    console.log(sum.value);
  }
}

// Обработчик на кнопку Del при вводе пин-кода
var pin = document.querySelector("#password");
var del = document.getElementById("del");
console.log(del);
del.addEventListener("click", function(event) {
  str = pin.value.substring(0, pin.value.length - 1);
  pin.value = str;
  console.log(pin.value);
  if (pin == "") {
    var err = document.querySelector("#err");
    err.style.display = "none";
  }
  event.preventDefault();
});

// Обработчик на кнопку Del при вводе суммы для снятия
var sum = document.querySelector("#sum");
var del_1 = document.getElementById("delete");

del_1.addEventListener("click", function(event) {
  str_1 = sum.value.substring(0, sum.value.length - 1);
  sum.value = str_1;
  event.preventDefault();
});

// функция  кнопки ОК при входе пароля

var enter = document.querySelector(".enter");
var acount = document.querySelector(".acount");
var err = document.querySelector("#err");
function user() {
  for (var x = 0; x < users.length; x++)
    if (+pin.value === users[x].pin) {
      acount.style.display = "flex";
      enter.style.display = "none";
      pin.value = "";
      str = "";
      document.querySelector("#sum").focus();
      document.querySelector("h1").innerHTML = users[x].name;
      document.querySelector(".money>p").innerHTML = users[x].balans;
      var td = document.querySelectorAll("td");
      td[0].innerHTML = users[x].sum.sum1;
      td[2].innerHTML = users[x].sum.sum2;
      td[1].innerHTML = users[x].date.d1;
      td[3].innerHTML = users[x].date.d2;
    } else {
      document.querySelector("#err").style.display = "block";
    }
}
var ok = document.getElementById("ok");
ok.addEventListener("click", user);

// функция  кнопки ОК при входе суммы для снятия
function transaction() {
  var s = parseInt(sum.value);
  var b = document.querySelector(".money>p");
  if (isNaN(s) || s === "") {
    alert("Вы не ввели сумму для снятия");
  } else {
    var arr = [];
    var td = document.querySelectorAll("td");
    var time = Time();
    for (var i = 0; i < users.length; i++) {
      var balns = parseInt(users[i].balans);
      arr.push(balns);
      if (document.querySelector("h1").innerHTML === users[i].name) {
        arr[i] -= Math.abs(s);
        b.innerHTML = "$" + arr[i];
        users[i].balans = b.innerHTML;

        users[i].sum.sum2 = users[i].sum.sum1;
        users[i].date.d2 = users[i].date.d1;

        td[2].innerHTML = users[i].sum.sum2;
        td[3].innerHTML = users[i].date.d2;
        users[i].date.d1 = time;
        users[i].sum.sum1 = s;
        td[0].innerHTML = users[i].sum.sum1;
        td[1].innerHTML = users[i].date.d1;
      }
    }
  }
}
var okey = document.getElementById("okey");
okey.addEventListener("click", transaction);

// Кнопка Close

var cls = document.querySelector("#bClose");
cls.addEventListener("click", function(e) {
  acount.style.display = "none";
  enter.style.display = "flex";
  err.style.display = "none";
  sum.value = "";
});
