import React,{useEffect,useState,useRef} from 'react'
import styled from "styled-components";
import Logout from "./Logout" ;
import ChatInput from "./ChatInput";
import Messages from "./Messages"
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIROUTES';
import {v4 as uuidv4} from "uuid";

export default function ChatContainer({currentChat , currentUser,socket }) {

    const [messages,setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const scrollRef=useRef();
    useEffect(()=>{
        async function getAllMsg(){
            const response = await axios.post(getAllMessageRoute,{
                from:currentUser._id,
                to:currentChat._id,
            });
            setMessages(response.data);
        }
        if(currentChat){
        getAllMsg();
        }

    },[currentChat]);

    const handleSendMessage= async(msg) =>{
        await axios.post(sendMessageRoute , {
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })

        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        });

        const msgs=[...messages];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);

    };


    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])


  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                </div>
                <div className="username">
                    <h3> {currentChat.username} </h3>
                </div>

            </div>
            <Logout />
        </div>

        <Messages messages={messages} ref={scrollRef} key={uuidv4}/>
        {/* <div className="chat-messages">
        {
            messages.map((message)=>{
            return (
                <div>
                <div className={`message ${message.fromSelf?"sended" :"received"  }`}> 
                    <div className="content">
                    <p>
                        {message.message}
                    </p>
                    </div>
                </div>
                </div>
            )
            })
        }

        </div> */}

        <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )
}

const Container = styled.div`
padding-top:1rem
display:grid;//
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;
@media screen and  =(min-width:720px) and (max-width:1080px){
    grid-auto-rows:15% 70% 15%;
  }
justify-content:center;//
align-items:center;//
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.2rem;
    
    .user-details{
        padding-left:1rem;
        display:flex;
        gap:1rem;
        align-items:center;
        .avatar{
            img{
                height:3rem;
                
            }
        }
        .username{
            h3{
                color:white;
                
            }
        }
    }
}
`;
