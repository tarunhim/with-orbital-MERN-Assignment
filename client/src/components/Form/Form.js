import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: "", website: "", email : "" });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const[flag, setFlag] = useState(false);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: "", website: "", email : "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let d = await fetch(`https://api.mailcheck.ai/domain/${postData.website}`);
    d = await d.json();
    console.log(d); 
    if(d.mx){
      setFlag(false);
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  } else setFlag(true);
  };

  

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.name}"` : 'Add a Company'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="website" variant="outlined" label="Website" fullWidth value={postData.website} onChange={(e) => setPostData({ ...postData, website: e.target.value })} />
        {flag && <p style={{color: "red", margin: "0", padding: "0", fontWeight: "bold"}}>please enter a valid link</p>}
        <TextField name="email" variant="outlined" label="Email" fullWidth rows={4} value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
        {/* <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
