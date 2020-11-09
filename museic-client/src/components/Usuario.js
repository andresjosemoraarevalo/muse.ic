import React, { Component } from "react";
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";

//redux
import { connect } from "react-redux";


const styles = {
  card: {
    marginBottom: 15,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  section1: {
    margin: "24px 16px",
  },
  section2: {
    margin: "16px",
  },
};

class Usuario extends Component {
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      usuario:{
          username,
          Fotolink,
          artista
      }
    } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={username} src={Fotolink}></Avatar>}
          title={
                <Typography
                variant="h6"
                color="primary"
                component={Link}
                to={`/usuarios/${username}`}
              >
                {username}
              </Typography>
              
          }
          subheader={
            artista
          }
        />
        <Divider variant="middle" />
       <CardContent>



       </CardContent>
      </Card>
    );
  }
}

Usuario.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});



export default connect(
  mapStateToProps
)(withStyles(styles)(Usuario));
