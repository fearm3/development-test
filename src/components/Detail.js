import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const [userPost, setUserPost] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchUsersData = async (id) => {
    setLoading(true);
    const user = await axios.get(`https://gorest.co.in/public/v2/users/${id}`);
    //https://gorest.co.in/public/v2/users/3904
    setUserData(user.data);
    // console.log("data", user.data);
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}/posts`
    );
    //https://gorest.co.in/public/v2/users/3904/posts
    setUserPost(response.data);
    // console.log("post", response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsersData(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <div
          style={{ display: "grid", placeItems: "center", marginTop: "20rem" }}
        >
          <CircularProgress size={150} color="warning" />
        </div>
      ) : (
        <Card
          sx={{ maxWidth: 750 }}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Name : {userData?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email : {userData?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Status : {userData?.status}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gender : {userData?.gender}
            </Typography>

            <hr />
            {userPost?.length !== 0 ? (
              userPost?.map((post, index) => (
                <Fragment key={index}>
                  <Typography gutterBottom variant="h5" component="div">
                    {post?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post?.body}
                  </Typography>
                </Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                {userData?.name} has not a post
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Detail;
