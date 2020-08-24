import React, { Component } from 'react';
import classes from './Folder.module.css';
import Emails from '../Emails/Emails';
import inboxData from '../../assets/inbox .json';
import spamData from '../../assets/spam.json';
import deletedData from '../../assets/deleted.json';
import EmailBody from '../EmailBody/EmailBody';


export class Folders extends Component {
   
    state = {
        inbox:[],
        spam:[],
        deleted:[],
        trash:[],
        inCurrentDisplay:'',
        dataToDisplay:[],
        displayEmailBody:{}
    }
    
    componentDidMount(){
        this.setState({
            ...this.state,
            inbox:inboxData.map((d,i) => this.state.inbox[i]=d),
            spam: spamData.map((d,i) => this.state.spam[i]=d),
            deleted:deletedData.map((d,i) => this.state.spam[i]=d),
            dataToDisplay: this.state.inbox,
            inCurrentDisplay:'inbox'
        })
    }
    selectedFolderContentDisplay = (folderType) =>{
        switch (folderType) {
            case 'inbox': 
                this.setState ({
                    ...this.state,
                    dataToDisplay: this.state.inbox,
                    displayEmailBody:{},
                    inCurrentDisplay:folderType
                })
                break;
            case 'spam': 
                this.setState ({
                    ...this.state,
                    dataToDisplay: this.state.spam,
                    displayEmailBody:{},
                    inCurrentDisplay:folderType
                })
                break;
            case 'deleted': 
                this.setState ({
                    ...this.state,
                    dataToDisplay: this.state.deleted,
                    displayEmailBody:{},
                    inCurrentDisplay:folderType
                })
                break;
            case 'trash': 
                this.setState ({
                    ...this.state,
                    dataToDisplay: this.state.trash,
                    displayEmailBody:{},
                    inCurrentDisplay:folderType
                })
                break;         
            default: return this.state.dataToDisplay;
        }
    }
    displayEmailBody=(id)=>{
        let folderType = this.state.inCurrentDisplay
        let obj
        switch (folderType) {
            case 'inbox':
                 obj=this.state.inbox.find(d=>d.mId===id)
                obj.unread=false
                this.setState ({
                ...this.state,
                displayEmailBody: this.state.dataToDisplay.filter(d => d.mId===id )[0]
                })    
                break;
            case 'spam':
                obj=this.state.spam.find(d=>d.mId===id)
                obj.unread=false
                this.setState ({
                ...this.state,
                displayEmailBody: this.state.dataToDisplay.filter(d => d.mId===id )[0]
                })    
                break;
            case 'deleted':
                obj=this.state.deleted.find(d=>d.mId===id)
                obj.unread=false
                this.setState ({
                ...this.state,
                displayEmailBody: this.state.dataToDisplay.filter(d => d.mId===id )[0]
                })    
                break;
            case 'trash':
                obj=this.state.spam.find(d=>d.mId===id)
                obj.unread=false
                this.setState ({
                ...this.state,
                displayEmailBody: this.state.dataToDisplay.filter(d => d.mId===id )[0]
                })    
                break;
            default:
                break;
        }
            
    }
    deleteMailHandler=(id)=>{
        let folderType = this.state.inCurrentDisplay
        switch(folderType){
            case 'inbox': 
            this.setState({
                ...this.state,
                deleted: this.state.deleted.concat(this.state.dataToDisplay.find(d=>d.mId===id)),
                inbox: this.state.inbox.filter(d => d.mId !==id ),
                dataToDisplay:this.state.inbox.filter(d => d.mId !==id ),
                displayEmailBody:this.state.inbox.filter(d => d.mId !==id )
            })
            break;
            case 'spam': 
            this.setState({
                ...this.state,
                deleted: this.state.deleted.concat(this.state.dataToDisplay.find(d=>d.mId===id)),
                spam: this.state.spam.filter(d => d.mId !==id ),
                dataToDisplay:this.state.spam.filter(d => d.mId !==id ),
                displayEmailBody:this.state.spam.filter(d => d.mId !==id )
            })
            break; 
            case 'deleted': 
            this.setState({
                ...this.state,
                trash: this.state.trash.concat(this.state.dataToDisplay.find(d=>d.mId===id)),
                deleted: this.state.deleted.filter(d => d.mId !==id ),
                dataToDisplay:this.state.deleted.filter(d => d.mId !==id ),
                displayEmailBody:this.state.deleted.filter(d => d.mId !==id )
            })
            break;
            case 'trash': 
             if(window.confirm("Are you sure you want to permanently delete it?")){
                this.setState({
                    ...this.state,
                    trash: this.state.trash.filter(d => d.mId !==id ),
                    dataToDisplay:this.state.trash.filter(d => d.mId !==id ),
                    displayEmailBody:this.state.trash.filter(d => d.mId !==id )
                })
             }           
            break;       
            default: return this.state.dataToDisplay;
        }
    }
    flagHandler=(id)=>{
        let obj=this.state.inbox.find(d=>d.mId===id)
        obj.flag = obj.flag===false ? true : false
        
    }
    filterHandler=()=>{
        this.setState({
            ...this.state,
            dataToDisplay:this.state.inbox.filter(d => d.flag === true ),
            displayEmailBody:this.state.inbox.filter(d => d.flag === true )
        })
    }
    componentDidUpdate(){

    }
    render() {
        let unreadInbox = this.state.inbox.length > 0 
                    && this.state.inbox.find(d => d.unread === true) ? this.state.inbox.filter(d => d.unread === true).length : '';
        let unreadSpam = this.state.spam.length > 0 
                    && this.state.spam.find(d => d.unread === true) ? this.state.spam.filter(d => d.unread === true).length : '';
        let unreadDeleted = this.state.deleted.length > 0 
                    && this.state.deleted.find(d => d.unread === true) ? this.state.deleted.filter(d => d.unread === true).length : '';
        
        return (
            <React.Fragment>
            <div className = {classes.Folder}>
                <button onClick={this.filterHandler}>
                    Filter on flagged inbox
                </button>
                <br/>
                <label onClick={()=>this.selectedFolderContentDisplay('inbox')} >
                    Input {unreadInbox}
                </label>
                <br/>
                <label onClick={()=>this.selectedFolderContentDisplay('spam')}>
                    Spam {unreadSpam}
                </label>
                <br/>
                <label onClick={()=>this.selectedFolderContentDisplay('deleted')}>
                    Deleted {unreadDeleted}
                </label>
                <br/>
                <label onClick={()=>this.selectedFolderContentDisplay('trash')}>
                    Trash
                </label>
                <br/>
            </div>
            <div style={{width:'570px'}}>
            {this.state.dataToDisplay.map(data => (
                     <div style={{borderStyle:'groove'}} 
                        className={classes.itemhover} 
                        key={data.mId}><Emails  
                        subject = {data.subject} 
                        folderType={this.state.inCurrentDisplay} 
                        flagType = {data.flag === false?"flag" : "flagged"} 
                        content = {data.content} 
                        sender = {data.sender}  
                        flagMail={()=>this.flagHandler(data.mId)} 
                        deleteMail={()=>this.deleteMailHandler(data.mId)} 
                        onClick={()=>this.displayEmailBody(data.mId)}/>
                     </div> 
                    )
            )}                    
                <EmailBody 
                    subject={this.state.displayEmailBody.subject} 
                    content={this.state.displayEmailBody.content} 
                    sender = {this.state.displayEmailBody.sender}/>  
            
            </div>
            </React.Fragment>
        )
    }
}

export default Folders
