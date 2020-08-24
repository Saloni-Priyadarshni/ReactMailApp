import React from 'react';
import Parser from 'html-react-parser';
import classes from './Emails.module.css';

function Emails(props) {
    
    var content = props.content.substring(0,40) + "..."
    //console.log(props)
    //subject.substring()
    return (
        <React.Fragment>
        
           <div className={classes.Emails} onClick = {props.onClick}>         
                <label>
                    {props.sender}
                </label>
                <br/>
                <label>
                    <b>{props.subject}</b>
                </label>
                <br/>
                <p>{Parser(content)}</p>
            </div>
            <button className={classes.Emails} onClick={props.deleteMail}>
                Delete
            </button>
           {props.folderType === "inbox" ? 
            <button className={classes.Emails} onClick={props.flagMail}> 
                {props.flagType}
            </button>
            :""
            }           
        </React.Fragment>
    )
}

export default Emails
