// Add this part to initialize Firebase and Firestore


const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Existing code - window.onload and your functions
  window.onload = function() {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const loginButton = document.getElementById('login');
      const form = document.getElementById('loginForm');
      const errorMessage = document.querySelector('.error-message');
  
      // Function to check if email and password fields are filled
      // Function to check if email and password fields are filled
function checkFields() {
    if (emailInput.value.trim() && passwordInput.value.trim()) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

  
      // Add event listeners for input fields
      emailInput.addEventListener('input', checkFields);
      passwordInput.addEventListener('input', checkFields);
  
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form from submitting for demonstration
  
          if (!emailInput.value || !passwordInput.value) {
              errorMessage.textContent = "Please enter both email and password.";
          } else {
              errorMessage.textContent = ""; // Clear error message
              // Here you can add the code to handle form submission, like making an API call or redirecting the user.
          }
      });
  }
  
  function register() {
      alert('Registration function called.'); // Placeholder functionality for registration
  }
  
  // Your new code to send data to Firebase Firestore without disrupting the old functions
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting for demonstration
  
      if (!emailInput.value || !passwordInput.value) {
          errorMessage.textContent = "Please enter both email and password.";
      } else {
          // Define the data you want to send to Firestore
          const data = {
              email: emailInput.value,
              password: passwordInput.value
          };
  
          // Add the data to Firestore
          db.collection('your-collection-name').add(data)
              .then(function(docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  errorMessage.textContent = ""; // Clear error message
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
                  errorMessage.textContent = "Error adding data to Firebase";
              });
      }
  });
  