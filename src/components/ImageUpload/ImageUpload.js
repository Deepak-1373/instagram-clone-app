import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ImageUpload({ username }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
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
            setOpen(false);
          });
      }
    );
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
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
      </Modal>

      <div className="imageupload__upload" onClick={() => setOpen(true)}>
        <Avatar className="imageupload__avatar" alt={username} src={username} />
        <textarea placeholder="What's on your mind?"></textarea>
      </div>
    </>
  );
}

export default ImageUpload;
