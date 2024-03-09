import React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { getSpecificPattern } from '../../services/expertServices';
import { replyPost, stringAvatar } from "../../services/expertServices"
import { Reply, Comment } from '../../types';
import { useExpertContext } from '../../context/ExpertContext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments: React.FC<{ review: Comment, expertId : string, isVerified : boolean, z_index:string }> = ({ review, expertId, isVerified, z_index }) => {
    const [replyClicked , setReplyClicked] = useState(false) 
    const { patternData, setPatternData } = useExpertContext();
    const [replyText,  setReplyText] = useState("")
    const expertName = localStorage.getItem("userName")
      const handleReplySubmit = async() => {
        setReplyClicked(false)
        try {
          const replyObj = await replyPost(review.id, review.websiteId, review.patternId, expertId, replyText)
          if(replyObj === 201){
            toast.success("Reply added successfully", {
              position: toast.POSITION.TOP_CENTER
            });
            const response = await getSpecificPattern(patternData.id , patternData.websiteId);
            setReplyText("");
            if(response){
              setPatternData(response)
            }
          } 
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error("An unknown error occurred.");
          }
        }  
      }
  return (
    <div>
        <div key={review.id} className='bg-gray-100 p-2 my-3 rounded-lg z-50'>
            <div className="items-center mt-3">
                <div className='flex items-center'>
                  <Avatar {...stringAvatar(review.expertName)} className={`${z_index}`}/>
                  <div className='mx-2 bg-blue-100 border-2 rounded-2xl p-1 border-blue-300 w-full'>{review.content}</div>
                </div>
                    {review.replies.map((comment: Reply)=>(
                      <div className='flex items-center mt-2 ml-12'>
                        <Avatar {...stringAvatar(comment.expertName)} className={`${z_index}`}/>
                        <div className='mx-2 bg-blue-100 border-2 rounded-2xl p-1 border-blue-300 w-full'>{comment.content}</div>
                      </div>
                    ))}
                    {(replyClicked) ?
                      <div className='w-100 mt-3 ml-12' key={review.id}>
                        <div className="flex items-center">
                          <Avatar {...stringAvatar(expertName ? expertName : "")} className={`${z_index}`}/>
                          <textarea 
                              name="description" 
                              id="patterndescription"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className='mx-2 w-full block h-10 rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-blue-300' 
                              placeholder='Reply to the comment'>
                          </textarea>
                        </div>
                        <button className='px-2 py-1 bg-blue-300 rounded-md my-2 ml-12' onClick={handleReplySubmit}>Submit</button>
                        <button className='px-2 py-1 bg-blue-300 rounded-md my-2 mx-2' onClick={() => setReplyClicked(false)}>Cancel</button>
                      </div>    
                    : isVerified ? <div className='flex justify-end mr-5 cursor-pointer italic text-blue-400' onClick={()=> setReplyClicked(true)}><p>Add Reply</p></div> : null}
                </div>
            </div>
    </div>
  )
}

export default Comments