import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth,signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore,collection, addDoc, onSnapshot,deleteDoc, updateDoc,doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const ids = [];
// jab apko all delete karana ho to ap jab ap data fetch karao to ids ki aik array banado.


var list = document.getElementById('list');
const signoutbtn=document.getElementById('signout');
signoutbtn.addEventListener('click',logout)
const gettodos = () =>{
    onSnapshot(collection(db, "todos"),(data)=>{
        console.log("data",data);
        // data.docChanges().forEach((todo) => {
          // ids.push(todo.doc.id);
          // console.log("todo",todo);
          // console.log("todo",todo.doc.data());
          data.docChanges().forEach((todo)=>{
            ids.push(todo.doc.id);
            if(todo.type === 'removed'){
              let dtodo = document.getElementById(todo.doc.id);
              if(dtodo){
                dtodo.remove();
              }
            }
            // jab jab listner ka type removed hai to document mai jakai us element ko dhondo aur remove kardo.
            else if(todo.type === 'added'){
              var list = document.getElementById('list');
              list.innerHTML +=`
              <li id='${todo.doc.id}'>
              <input class='todo_input' type='text' value='${todo.doc.data().value}' disabled/>
              <button class="todo_delete" onclick = 'deltodo("${todo.doc.id}")'>Delete</button>
              <button class="todo_edit" onclick = 'editTodo(this,"${todo.doc.id}")'>Edit</button>
              </li>`
              // isko else mai islyai dala kyu kai jab hum delete kar rahai thai to yai barbar add kar raha tha
            }
          });
          // abhi mai jab  jab reload karonga data ayega merai pas 
  // }) 
});
}
gettodos();
// jab ap onsnapshot mai collection lagadai gai to firbase us per addevenrlistner laga deta hai jab ap data add karai gai tai apko get karkai dega
// change ko console karnai sai yai pata chala listner ki type added hai
const addbtn=document.getElementById('addTodo');
addbtn.addEventListener('click',Add)
async function Add(){
   var todo = document.getElementById('todo_item');
   console.log("dan")
   try {
    const docRef = await addDoc(collection(db, "todos"), {
      value: todo.value
    });
    // console.log(todo)
    // console.log("Document written with ID: ", docRef.id);
    todo.value = ""
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function deltodo(id){
   console.log('id:',id);
   await deleteDoc(doc(db, "todos", id));
   console.log("delete");
}

var edit = false;
async function editTodo(e,id){
  if(edit){
    await updateDoc(doc(db, "todos",id),{
      value: e.parentNode.childNodes[1].value
    });
    e.parentNode.childNodes[1].disabled = true;
    e.parentNode.childNodes[1].blur();
    e.parentNode.childNodes[5].innerHTML = 'Edit'
    edit = false;
  }else{
    e.parentNode.childNodes[1].disabled = false;
    e.parentNode.childNodes[1].focus();
    e.parentNode.childNodes[5].innerHTML = 'update'
    edit = true;
  }
}

async function Recycle(){
   console.log(ids);
   var list = document.getElementById('list');
   list.innerHTML = ""
   let arr=[]
   for(var i=0;i<ids.length;i++){
    arr.push(deleteDoc(doc(db, "todos", ids[i])));
   }
   Promise.all(arr)
   .then((res)=>{
    console.log("All data are deleted");
   })
   .catch(err=>{
    console.log("err");
   })
}

function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signout");
        localStorage.removeItem("user")
        setTimeout(()=>{
            location.href="index.html";
        },100
        )

      }).catch((error) => {
        // An error happened.
        console.log(error.code);
      });
      
}
// if use firestore use these code
//--------------------------------------------------------------------------
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log(user.uid);
//     location.href="item.html";
//   } else {
//     // User is signed out
//     alert("user is signout");
//   }
// });

// function logout(){
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         console.log("signout");
//         setTimeout(()=>{
//             location.href="index.html";
//         },100
//         )

//       }).catch((error) => {
//         // An error happened.
//         console.log(error.code);
//       });
      
// }

window.deltodo = deltodo;
window.editTodo = editTodo;
window.Recycle = Recycle;

