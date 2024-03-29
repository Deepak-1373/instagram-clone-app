import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import Post from "./components/Post/Post";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./context/themeContext";
import InstagramDark from "./assets/instagram-dark.png";
import InstagramLight from "./assets/instagram-light.png";
import "./styles/App.css";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const { theme, changeTheme } = useTheme();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in ...
        setUser(authUser);
      } else {
        //user has logged out ...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // useEffect runs a piece of code based on a speicific conditions
  useEffect(() => {
    db.collection("Posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user
          .updateProfile({
            displayName: username,
          })
          .then((authUser) => setUser(authUser));
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className={`app ${theme}`}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app_headerImage"
                alt=""
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app_headerImage"
                alt="Instagram Logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        {theme === "light" ? (
          <img
            className="app__headerImage"
            alt="Instagram Logo"
            src={InstagramLight}
          />
        ) : (
          <img
            className="app__headerImage"
            alt="Instagram Logo"
            src={InstagramDark}
          />
        )}
        <div className="app__theme">
          {user ? (
            <Button className="btn" onClick={() => auth.signOut()}>
              Logout
            </Button>
          ) : (
            <div>
              <Button className="btn" onClick={() => setOpenSignIn(true)}>
                Sign In
              </Button>
              <Button className="btn" onClick={() => setOpen(true)}>
                Sign Up
              </Button>
            </div>
          )}
          <button className="theme-btn" onClick={changeTheme}>
            {theme === "light" ? (
              <span class="material-symbols-outlined">dark_mode</span>
            ) : (
              <span class="material-symbols-outlined">brightness_7</span>
            )}
          </button>
        </div>
      </div>
      <div className="app__posts">
        <div className="app_postsLeft">
          {user?.displayName && <ImageUpload username={user.displayName} />}
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
