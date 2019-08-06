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

  static auth_check = callback => {
    firebaseImpl.auth().onAuthStateChanged(user => {
      if (user) {
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  static create_user = (email, password) => {
    firebaseImpl
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error Message: ${error.message}`);
      });
  };

  static logout_user = () => {
    firebaseImpl
      .auth()
      .signOut()
      .then(() => {
        console.log("Logout Sucess");
      })
      .catch(error => {
        console.log("Erros Logout");
        console.log(error);
      });
  };

  static login_user = (email, password) => {
    firebaseImpl
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error Message: ${error.message}`);
      });
  };
}
