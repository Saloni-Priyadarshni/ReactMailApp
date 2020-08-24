import React from 'react';
import Parser from 'html-react-parser';
import classes from './EmailBody.module.css';
import img from '../../assets/images/download.png';

function EmailBody(props) {
    return (
        <div className={classes.EmailBody}>
            {
                props.subject !=null ? 
                <>
                    <p><b>Sender: {props.sender}</b></p>
                    <p><b>Subject: {props.subject}</b></p>
                    <p>{Parser(props.content)}</p>
                </>
                :<><img style={{height: '93px'}} src={img} alt="outlook"/><p>Select an item to read<br/>Nothing is selected</p></>
            }              
    </div>
    )
}

export default EmailBody;
