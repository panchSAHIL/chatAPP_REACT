import React from 'react'
import styled from "styled-components"




export default function Messages({messages,ref,key}) {

//   useEffect(()=>{
//     async function getAllMsg(){
//         const response = await axios.post(getAllMessageRoute,{
//             from:currentUser._id,
//             to:currentChat._id,
//         });
//         setMessages(response.data);
//     }
//     getAllMsg();

// },[messages]);
  return (
    <Container>
  {
    messages.map((message)=>{
      return (
        <div ref={ref} key ={key} >
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
    
    </Container>
  )
}

const Container = styled.div`
height:80%;
padding:1rem 2rem;
display:flex;
flex-direction:column;
gap:1rem;
overflow:auto;
.message{
  display:flex;
  align-item:center;

  .content{
    max-width:40%;
    overflow-wrap:break-word;
    padding:1rem;
    font-size:1.1rem;
    border-radius:1rem;
    color:#d1d1d1
  }
}
.sended{
  justify-content:flex-end;
  .content{
  background-color:#4f04ff21;
  }
}
.received{
  justify-content:flex-start;
  .content{
  background-color:#9900ff20;
  }
}


`;