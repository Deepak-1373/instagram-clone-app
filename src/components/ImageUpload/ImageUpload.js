import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error Function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside the database
            db.collection("Posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload__div">
      <form className="imageupload" onSubmit={(e) => handleUpload(e)}>
        <progress
          value={progress}
          max="100"
          className="imageupload__progress"
        />
        <input
          type="text"
          placeholder="Enter a caption here..."
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
          required="required"
        ></input>
        <input type="file" onChange={handleChange}></input>
        <Button type="submit" className="imageupload__button">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default ImageUpload;
