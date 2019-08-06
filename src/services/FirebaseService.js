import { firebaseDatabase, firebaseImpl } from "../util/firebaseUtils";

export default class FirebaseService {
  static getDataList = (nodePath, callback, size = 10) => {
    let query = firebaseDatabase.ref(nodePath).limitToLast(size);

    query.on("value", dataSnapshot => {
      let items = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item["key"] = childSnapshot.key;
        items.push(item);
      });

      callback(items);
    });

    return query;
  };

  static pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push();
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);

    return id;
  };

  static remove = (id, node) => {
    return firebaseDatabase.ref(`${node}/${id}`).remove();
  };

  static getUniqueDataBy = (node, id, callback) => {
    const ref = firebaseDatabase.ref(`${node}/${id}`);
    let newData = {};
    ref
      .once("value", dataSnapshot => {
        if (
          !dataSnapshot ||
          dataSnapshot === undefined ||
          !dataSnapshot.val() ||
          dataSnapshot.val() === null
        ) {
          callback(null);
          return;
        }

        const snap = dataSnapshot.val();
        const keys = Object.keys(snap);
        keys.forEach(key => {
          newData[key] = snap[key];
        });
      })
      .then(() => {
        callback(newData);
      });
  };

  static updateData = (id, node, obj) => {
    return firebaseDatabase.ref(`${node}/${id}`).set({ ...obj });
  };

  static auth_check = () => {
    firebaseImpl.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("logado");
      } else {
        console.log("não logado");
      }
    });
  };

  static create_user = (email, password) => {
    firebaseImpl
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Sucess");

        console.log("user logado");
      })
      .catch(error => {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error Message: ${error.message}`);
      });
  };
}
