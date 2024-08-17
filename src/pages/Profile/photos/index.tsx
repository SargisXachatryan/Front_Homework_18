import { useEffect, useRef, useState } from "react";
import { getAllPosts, handlePostUpload } from "../../../helpers/api";
import { IPost } from "../../../helpers/types";
import { Gallery } from "../../../components/Gallery";

export const Photos = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const photo = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState<string>("");

  const handlePost = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("photo", file);
      form.append("content", text);
      handlePostUpload(form)
      .then(res=>{
        setPosts([...posts,res.payload as IPost])
      })
    }
  };

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.payload as IPost[])
    });
  }, []);

  return (
    <>
      <h2>Posts</h2>
      <input
        className="form-control"
        placeholder="Whats on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="file" ref={photo} />
      <br />
      <button onClick={handlePost} className="btn btn-outline-dark my-3">
        Upload
      </button>

        <Gallery posts={posts}/>
    </>
  );
};
