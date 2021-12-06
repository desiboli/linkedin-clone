import React, { useEffect, useState } from "react";
import "./Feed.css";
import FlipMove from "react-flip-move";
import Post from "../Post/Post";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import InputOption from "../InputOption/InputOption";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  doc,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Firebase V8
    /*     db.collection('posts').onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    ) */

    // Firebase V9
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const sendPost = async (e) => {
    e.preventDefault(); // Stopping the default behaviour which is reloading the page.

    // Firebase V8
    /*     db.collection('posts').add({
      name: 'Mustafa Alshammaa',
      description: 'This is a test',
      message: 'asdasdasd',
      message: input,
      photoUrl: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp
    }) */

    // Firebase V9
    const docData = {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    };

    const newData = doc(collection(db, "posts"));
    await setDoc(newData, docData);

    // Empty input
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
      {/*<Post name="Adam Alshammaa" description="This is a test" message="WOW this worked" />*/}
    </div>
  );
}

export default Feed;
