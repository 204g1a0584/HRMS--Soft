const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginButton = document.querySelector('input[type="submit"]');
        const errorMessage = document.querySelector('.error-message');

        emailInput.addEventListener('input', checkInputs);
        passwordInput.addEventListener('input', checkInputs);

        function checkInputs() {
            if (emailInput.value && passwordInput.value) {
                loginButton.disabled = false;
            } else {
                loginButton.disabled = true;
            }
        }

        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();

            if (!emailInput.value || !passwordInput.value) {
                errorMessage.textContent = 'Please fill in all fields.';
            } else {
                errorMessage.textContent = '';
                // Here you can add logic to authenticate the user
                console.log('User authenticated');
            }
        });

        // <script type="module">
  
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
        
            const firebaseConfig = {
        apiKey: "AIzaSyAQAJzgluB3sun7KXpjf71M3gCGYEucwNI",
        authDomain: "fir-tutorial-7a93c.firebaseapp.com",
        databaseURL: "https://fir-tutorial-7a93c-default-rtdb.firebaseio.com",
        projectId: "fir-tutorial-7a93c",
        storageBucket: "fir-tutorial-7a93c.appspot.com",
        messagingSenderId: "311927778551",
        appId: "1:311927778551:web:511665bd57fb0cba0937f2"
      };
        
              // Initialize Firebase
            const app = initializeApp(firebaseConfig);
        
        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";     
        
            //listen for submit event//(1)
            document
              .getElementById('registrationform')
              .addEventListener('submit', formSubmit);
        
            //Submit form(2)
            function formSubmit(e) {
              e.preventDefault();
              // Get Values from the DOM
              let email = document.querySelector('#email').value;
              let password = document.querySelector('#password').value;
              let rememberMe = document.querySelector('#rememberMe').value;
        
              //send message values(3)
              sendMessage(email, password,rememberMe);
            }
        
            //Send Message to Firebase(4)
            function sendMessage(email, password,rememberMe) {
              const database = getDatabase();
        
              set(ref(database, 'users/' + Math.floor(Math.random() * 10000000)), {
                
                email: email,
                password: password,
                rememberMe:rememberMe
              }).then(() => {
                  //Show Alert Message(5)
               document.querySelector('.alert').style.display = 'block';
                //Hide Alert Message After Seven Seconds(6)
               setTimeout(function () {
               document.querySelector('.alert').style.display = 'none';
               }, 7000);
               document.getElementById('registrationform').reset();
              }).catch((error) => {
                alert(error)
              })
            }
 {/* </script> */}
    