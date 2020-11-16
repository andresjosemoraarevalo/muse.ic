import React, { Component } from "react";
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//MUI stuff
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

//redux
import { connect } from "react-redux";


const styles = {
    root: {
        marginTop: "100px",
        
        
      },
  card1: {
    marginBottom: 10,
    background: "#f4f4f8",
    borderRadius: "100px",
    maxWidth: "75%",
    margin: "0px", 
    borderTopLeftRadius: "2px",
    borderBottomLeftRadius: "2px",
    borderTopRightRadius: "100px",
    borderBottomRightRadius: "100px",
   
  },
  card2: {
    marginBottom: 10,
    background: "#990099",
    borderRadius: "100px",
    maxWidth: "75%",
    margin: "0px 0px 0px auto",
    borderTopLeftRadius: "100px",
    borderBottomLeftRadius: "100px",
    borderTopRightRadius: "2px",
    borderBottomRightRadius: "2px",
   
  },
  content: {
    padding: 15,
    objectFit: "cover",
    
   
  },
  section1: {
    
    
  },
  section2: {
    color:"white",
    
  },
  fotolink:{
    margin: "0px 0px 0px auto",
    float:"right",
  }
};

class Mensaje extends Component {
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      mensaje:{
        postBody,
        postedBy,
        postedFor,
        Fotolink,
        postDate,
      },
      user:{
          credentials:{
              username,
          }
      }
    } = this.props;
    return ( 
       
        postedBy === username ?(
            <div>
            <Card className={classes.card2}>
            <CardHeader
                avatar={<Avatar src={Fotolink} className={classes.fotolink}></Avatar>}
                title={
                <Typography variant="body2" color="textSecondary">
                {dayjs(postDate).fromNow()}
                </Typography>
                }
                subheader={
                <Typography variant="body1" component="p" className={classes.section2}>
                {postBody}
            </Typography>
        
        
                }
        
            />
        </Card>
        </div>

        ):(
            <div>
            <Card className={classes.card1}>
            <CardHeader
                avatar={<Avatar src={Fotolink}></Avatar>}
                title={
                <Typography variant="body2" color="textSecondary">
                {dayjs(postDate).fromNow()}
                </Typography>
                }
                subheader={
                <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
                {postBody}
            </Typography>
        
        
                }
        
            />
        </Card>
        </div>

        )  );
    }
}

Mensaje.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});



export default connect(
  mapStateToProps
)(withStyles(styles)(Mensaje));
