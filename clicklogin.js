
var storage = chrome.storage.local;
var account = 'email';

storage.get(account,function(result){
  if (result == undefined) {
    var container = document.createElement('div');

    container.innerHTML = "<p><font size='6'>Wordist!</font></p><form action='demo_form.asp'>Email: <br><input type='text' id='demail'><br>" +
    "<br>Password: <br><input type='password' id='dpassword'><br><br>" +
    "<input id='submit' type='button' value='Submit'/>  <small><a href='http://wordist.herokuapp.com/#/signUp'>" +
    "Click here to register</a></small></form>";

    container.className = 'clicklogin';
    //$('.hackdediccionario').remove();
    document.body.appendChild(container);

    document.getElementById("submit").addEventListener("click", function(){
        var obj= {};
        obj[account] = document.getElementById('demail').value;
        storage.set(obj);
        console.log(document.getElementById('demail').value.toString());
        var elem = document.getElementsByClassName('clicklogin');
        elem[0].style.display = 'none';
    });

  }
  else {
      debugger
      //window.location.replace('http://wordist.herokuapp.com/app/controllers');
      var re = new XMLHttpRequest();
      re.open('POST', 'http://wordist.herokuapp.com/api/user/login', true);
      re.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      re.onload = function (e) {
          if (re.readyState === 4) {
              if (re.status === 200) {
                  /*
                  var newURL = "http://wordist.herokuapp.com/#/home";
                  chrome.tabs.create({ url: newURL });*/
                  window.open("http://wordist.herokuapp.com/#/home");
              } else {
                  console.error(re.statusText);
              }
           }

       };
       re.send(JSON.stringify({"email": result.email, "password": "lichis"}));
  }
});

/*
var obj= {};
obj[account] = 'florrts@gmail.com';
storage.set(obj);

storage.get(account,function(result){
  console.log(account,result);
});
*/

//console.log("login hello");
