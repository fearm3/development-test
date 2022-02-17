import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getViews } from "../redux/actions";

const LastView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastUserViews = useSelector((state) => state.rootReducer);
  //   console.log("lastUserViews", lastUserViews);
  useEffect(() => {
    dispatch(getViews());
  }, [dispatch]);

  return (
    <div>
      <Typography
        sx={{ display: "grid", placeItems: "center", marginTop: "2rem" }}
        component="span"
        variant="h4"
        color="text.primary"
      >
        Viewed Last 5 Employees
      </Typography>
      {lastUserViews?.length === 0 ? (
        <h3 style={{ marginTop: "5rem", color: "#000" }}>No added users</h3>
      ) : (
        lastUserViews?.map((item) => {
          //   console.log("item from lastView", item);

          return (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={item.id}
            >
              <ListItem
                alignItems="flex-start"
                onClick={() => navigate(`detail/${item.id}`)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.name.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        })
      )}
    </div>
  );
};
export default LastView;
