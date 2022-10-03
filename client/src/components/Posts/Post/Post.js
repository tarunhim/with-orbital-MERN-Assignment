import React,{useState} from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [flag, setFlag] = useState(null);
  console.log(flag);
  return (
    <Card className={classes.card}>
      {/* <CardMedia className={classes.media} image={`https://logo.clearbit.com/${post.website}` || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} /> */}
      <div className={classes.overlay}>
        {/* <Typography variant="h6">"Company Name : {post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'black' }} title="edit" size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div> */}
      <img style={{width:"150px",height:"80px", margin:"20px", border:"5px solid black",borderRadius:"15px"}} src={`https://logo.clearbit.com/${post.website}` || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Company Name : {post.name}</Typography>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Website : {post.website}</Typography>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Email : {post.email}</Typography>
        {/* <Typography variant="body2" color="textSecondary" component="p"></Typography> */}
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button> */}
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        <Button onClick={async() => {
          // fetch(`https://api.domainsdb.info/v1/domains/search?domain=facebook`)
          // .then(item => item.json())
          // .then(item => setFlag(item.domains))
          // .catch(item => console.log(item));
          // let d = await axios(`https://api.domainsdb.info/v1/domains/search?domain=facebook`);
          //  console.log(d);
          //  setFlag(d);
        }}>Similar Platform</Button>
      </CardActions>
      {flag &&
      <div>
        <h3 onClick={() => setFlag(null)}>X</h3>
        {flag.map(item => <h4>item.domain</h4>)}
      </div>
}
    </Card>
  );
};

export default Post;
