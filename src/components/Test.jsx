import React, { useState, useEffect } from "react";
import "./test.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Test = () => {
  const [state, setState] = useState({});

  console.log(state);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const filehandleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const usercollectionRef = collection(db, "users");

  //   useEffect(() => {
  //     const getUsers = async ()=>{
  //       const data = await getDocs(usercollectionRef)
  //       setState(data.docs.map((doc)=>({...doc.data(), is:doc.id})))
  //     //   /console.log(data)
  //     }

  //     getUsers();

  //   }, [])

  //  const uploadTask = uploadBytesResumable(storageRef, file);

  const handlesubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "users"), state);

    //     uploadTask.on('state_changed',
    //    (snapshot) => {

    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');

    //   },
    //   (error) => {

    //   },
    //   () => {

    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    //   }
    // );
    const storageRef = ref(storage, "resume");
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) =>
        setUrl(url)).catch((err) => console.log(err.message));
        console.log(url);
      
    }).catch((err)=>console.log(err.message));

  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="basictetails">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            className="fname"
            placeholder="write fname.."
            name="fname1"
            onChange={(e) =>
              setState({
                basicdetail: [{ fname1: e.target.value }],
              })
            }
          />
          <br />
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            className="lname"
            placeholder="write lname.."
            name="lname1"
            onChange={(e) =>
              setState({
                basicdetail: [
                  { ...state.basicdetail[0], lname1: e.target.value },
                ],
              })
            }
          />
          <br />
          <label htmlFor="">Age</label>
          <input
            type="number"
            className="age"
            name="age1"
            onChange={(e) =>
              setState({
                basicdetail: [
                  { ...state.basicdetail[0], age1: e.target.value },
                ],
              })
            }
          />
          <br />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            className="gender"
            name="gender"
            id="male"
            value="male"
            onChange={(e) =>
              setState({
                basicdetail: [
                  { ...state.basicdetail[0], gender1: e.target.value },
                ],
              })
            }
          />
          <br />
          <label htmlFor="female" required>
            Female
          </label>
          <input
            type="radio"
            className="gender"
            name="gender"
            id="female"
            value="female"
            onChange={(e) =>
              setState({
                basicdetail: [
                  { ...state.basicdetail[0], gender1: e.target.value },
                ],
              })
            }
          />
          <br />
        </div>
        <br />

        <div className="skills">
          <label htmlFor="">skills</label>
          <select
            name="skill"
            onChange={(e) =>
              setState({
                ...state,
                skills: [{ ...state.skills, skill: e.target.value }],
              })
            }
          >
            <option value="" disabled selected>
              select option
            </option>
            <option value="html">Html</option>
            <option value="css">Css</option>
            <option value="js">Js</option>
            <option value="nodejs">Nodejs</option>
          </select>
          <br />

          <img src={url} alt="" />
          <label htmlFor="">upload Resume</label>
          <input
            type="file"
            name="files"
            onChange={(e) => filehandleChange(e)}
          />
        </div>
        <br />
        <div className="workExperience">
          <label htmlFor="">experience</label>
          <input
            type="text"
            name="experience"
            onChange={(e) =>
              setState({
                ...state,
                workexperience: [
                  { ...state.workexperience, experience: e.target.value },
                ],
              })
            }
          />
          <br />
          <label htmlFor="">Salary </label>
          <input
            type="number"
            name="salary"
            onChange={(e) =>
              setState({
                ...state,
                workexperience: [
                  { ...state.workexperience[0], salary: e.target.value },
                ],
              })
            }
          />
        </div>
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Test;
