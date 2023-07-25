import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmd2CKhnhXwMHjZkLWEzLp15eb__7ZaiM",
  authDomain: "todo-app-9eb31.firebaseapp.com",
  databaseURL: "https://todo-app-9eb31-default-rtdb.firebaseio.com",
  projectId: "todo-app-9eb31",
  storageBucket: "todo-app-9eb31.appspot.com",
  messagingSenderId: "952203444083",
  appId: "1:952203444083:web:eb65bbacc5cf8fe5cdcf06",
  measurementId: "G-1RCD7C67LM"
  };
// curly bracket means aik file sai multiple chez import horahi hai.
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// add Doc:  yai unique id bana raha hai aur usmai apka sara data addd kar raha hai 
// set Doc:  mujhai id ap khud batao.
// get Doc:  sara data mujhai la kai dai raha hai.
document.getElementById('reg_btn').addEventListener('click',function(){
   document.getElementById('container_of_register').style.display="inline";
   document.getElementById('login_container').style.display="none";
})

document.getElementById('log_btn').addEventListener('click',function(){
   document.getElementById('container_of_register').style.display="none";
   document.getElementById('login_container').style.display="inline";
})

const registerbtn = document.getElementById('register_btn')
const loginbtn = document.getElementById('login_btn')
registerbtn.addEventListener('click',register) //FOR BHAI CONCEPT
loginbtn.addEventListener('click',login)

function register(){ // for bahi concept
  const registerEmail = document.getElementById('register_email').value;
    const registerPassword = document.getElementById('register_password').value;

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    location.href="item.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}


// if use firestore use this code
// --------------------------------------------------------------------------
// let registerbtn = document.getElementById('register_btn');
// registerbtn.addEventListener('click',()=>{
//   let registername = document.getElementById('register_name');
//   let registeremail = document.getElementById('register_email');
//   let registerpassword = document.getElementById('register_password');

//   const myobj = {
//     name: registername.value,
//     email: registeremail.value,
//     password: registerpassword.value
//   }
//   // console.log(user);
//   createUserWithEmailAndPassword(auth, myobj.email, myobj.password)
//     .then(async  (userCredential) => {
//       // Signed in 
//       // async function kai shru mai lagta hai jo handle karta hai await ko
//       const user = userCredential.user;
//       try {
//         const docRef = await addDoc(collection(db, "users"), {
//           ...myobj,// yai myobj ki value lai kai ayega
//           uid: user.uid
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//       // console.log("user",user);
//       // location.href="item.html";
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//     })
// })

// const loginbtn = document.getElementById('login_btn');

// loginbtn.addEventListener('click',e =>{
//   e.preventDefault();
//   const loginEmail = document.getElementById('login_email').value;
//   const loginPassword = document.getElementById('login_password').value;

//   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
//  .then((userCredential) => {
//    // Signed in 
//    const myuser = userCredential.user;
//    console.log("user", myuser);
//     location.href="item.html";
//  })
//  .catch((error) => {
//    const errorCode = error.code;
//    const errorMessage = error.message;
//    alert(errorMessage);
//  });
// })
//------------------------------------------------------------------------------------
// for bhai concept
function login(){
  const loginEmail = document.getElementById('login_email').value;
const loginPassword = document.getElementById('login_password').value;

signInWithEmailAndPassword(auth, loginEmail, loginPassword)
.then((userCredential) => {
 // Signed in 
 const myuser = userCredential.user;
 console.log("user", myuser);
 const myobj = {
 
   email:myuser.email,
   uid: myuser.uid 
 }
 console.log("obj",myobj);
 localStorage.setItem("user", JSON.stringify(myobj));
  location.href="item.html";
})
.catch((error) => {
 const errorCode = error.code;
 const errorMessage = error.message;
 alert(errorMessage);
});
}


let clientsArr = JSON.parse(localStorage.getItem('user'));
if(clientsArr){
  location.href="item.html";
}
//  onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log(user.uid);
//       location.href="item.html";
//     } else {
//       // User is signed out
//       alert("user is signout");
//     }
//   });


    

