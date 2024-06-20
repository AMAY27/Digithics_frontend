import React, { useState } from "react";
import Comments from "./Comments";
import { IoMdClose } from "react-icons/io";
import { PatternDetailsProps } from "../../types";
import ConfirmVerifyModal from "./ConfirmVerifyModal";
import {
  getSpecificPattern,
  stringAvatar,
  CommentPost,
} from "../../services/expertServices";
import { useExpertContext } from "../../context/ExpertContext";
import PatternUpdateForm from "./PatternUpdateForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withExpertAuth from "../../hoc/withExpertAuth";
import Avatar from "@mui/material/Avatar";
import {
  ErrorOutline as ErrorOutlineIcon,
  Verified as VerifiedIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import ImageSlides from "./ImageSlides";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PatternDetailsComponent: React.FC<PatternDetailsProps> = ({
  isOpen,
  onClose,
  expertId,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [commentTextClicked, setCommentTextClicked] = useState<boolean>(false);
  const [isPatternExist, setIsPatternExist] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [imgToDisplay, setImgToDisplay] = useState<string>();
  const [zindex, setZindex ] = useState(false)
  const z_index = zindex ? "z-[-10]" : "z-[30]";
  const [imgOpen, setImageOpen] = useState<boolean>(false);
  const { patternData, setPatternData } = useExpertContext();
  const getBgColorClass =
    patternData.phaseColor === "#F9C32F"
      ? "bg-[#F9C32F]"
      : patternData.phaseColor === "#E6321D"
      ? "bg-[#E6321D]"
      : "bg-[#538D3F]";
  const expertVerificationPhase = patternData.expertVerifications.map(
    (verification) => verification.expertVerificationPhase
  );
  const expertName = localStorage.getItem("userName");
  const [verifyClicked, setVerifyClicked] = useState<boolean>(false);
  const handleCommentSubmit = async () => {
    setCommentTextClicked(false);
    try {
      const commentObj = await CommentPost(
        patternData.id,
        patternData.websiteId,
        expertId,
        commentText
      );
      if (commentObj === 201) {
        toast.success("Comment added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        const response = await getSpecificPattern(
          patternData.id,
          patternData.websiteId
        );
        setCommentText("");
        if (response) {
          setPatternData(response);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };
  const handleClose = () => {
    setEditing(false);
    setCommentTextClicked(false);
    onClose();
  };
  const verifyOpen = (patternExist: boolean) => {
    setIsPatternExist(patternExist);
    setVerifyClicked(true);
    setZindex(true)
  };
  const verifyClose = () => {
    setVerifyClicked(false);
    setZindex(false);
  };
  const onCloseEdit = () => {
    setEditing(false);
  };

  const handleImageClick = (img:string) => {
    setImgToDisplay(img);
    setImageOpen(true);
    setZindex(true);
  }

  const handleImageClose = () => {
    setImageOpen(false);
    setZindex(false);
  }


  const handleUrlClick = (texttoCheck:string) => {
    var url = document.getElementById("detectedUrl")?.getAttribute("href");
    var suffix = "#:~:text=";
    var tempUrl = url?.split("#")[0];
    var text = encodeURIComponent(texttoCheck);
    var newurl = tempUrl + suffix + text;
    newurl.toString();
    document.getElementById("detectedUrl")?.setAttribute("href", newurl);
  }
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white sm:px-4 py-2 rounded-lg z-30 w-full h-full sm:w-4/5 sm:h-4/5 overflow-y-auto">
      <ImageSlides 
        image={imgToDisplay ? imgToDisplay : ""} 
        isOpen={imgOpen} 
        onClose={handleImageClose}
      />
        <>
          <ConfirmVerifyModal
            isOpen={verifyClicked}
            onClose={verifyClose}
            expertId={expertId}
            patternExists={isPatternExist}
          />
          <div className="flex justify-end">
            <IoMdClose
              onClick={handleClose}
              className="hover:bg-blue-200 rounded-lg p-2 text-4xl"
            />
          </div>
          {editing ? (
            <>
              <PatternUpdateForm isOpen={editing} onClose={onCloseEdit} />
            </>
          ) : (
            <div className="sm:space-y-4 px-4 pt-2 pb-2">
              <div className="sm:flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <h2 className="font-bold text-2xl text-blue-500 mr-5">
                    {patternData.patternType}
                  </h2>
                </div>
                {patternData.createdByExpertId === expertId ? (
                  <div className="flex items-center text-md ">
                    <h2 className="italic font-serif text-gray-500 mr-2">
                      Added By - you
                    </h2>
                  </div>
                ) : (
                  <div className="flex items-center text-md">
                    {patternData.isAutoGenerated===true ? 
                    <h2 className="text-gray-500 italic font-serif text-gray-400 mr-2">
                      Added By - AI Model
                    </h2> :
                    <h2 className="text-gray-500 italic font-serif text-gray-400 mr-2">
                    Added By - {patternData.expertName}
                  </h2>}
                  </div>
                )}
              </div>
              <div className="w-60">
                <a href={patternData.detectedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500" id="detectedUrl" onClick={()=>handleUrlClick(patternData.description)}>
                  <p className="truncate ...">{patternData.detectedUrl}...<OpenInNewIcon sx={{ width: "20px", height: "20px" }} /></p>
                </a>
              </div>
            </div>
          )}
          <div className="md:grid grid-cols-3">
            <div className="col-span-1 md:col-span-2 sm:h-[25rem] sm:pr-4">
              <div className="border-b-2 p-4 bg-gray-100 rounded-lg mx-4 mt-4 text-sm sm:text-base">
                <h2 className="font-bold">Feedback</h2>
                <p>{patternData.description}</p>
              </div>
              <div className='sm:hidden mt-4'>
                <Carousel showIndicators={false} showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={false} interval={3000} className={`sm:py-4 relative ${z_index}`}>
                  {patternData.patternImageUrls.map((img)=>(
                    <div className={`w-full lg:py-8 lg:px-8 bg-gray-200`} onClick={()=>handleImageClick(img)}>
                      <img 
                        src={img} 
                        alt='pattern snapshots' 
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div>
                {expertVerificationPhase.includes("NotVerified") ? (
                  <div className={`col-span-full mt-2 px-4 pt-4 pb-2 flex items-center`}>
                    <Avatar
                      {...stringAvatar(expertName ? expertName : "")}
                      className={`mr-2 -z-50`}
                    />
                    <textarea
                      name="description"
                      id="patterndescription"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onClick={() => setCommentTextClicked(true)}
                      className="block w-full rounded-md border-0 h-10 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      placeholder="Add a comment"
                    ></textarea>
                  </div>
                ) : null}
                {commentTextClicked ? (
                  <div className="px-4">
                    <button
                      className="col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-400 mt-2"
                      onClick={handleCommentSubmit}
                    >
                      Add Comment
                    </button>
                    <button
                      className="col-span-1 p-2 rounded-lg hover:bg-gray-200 mt-2 mx-2"
                      onClick={() => setCommentTextClicked(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="px-4 py-2">
                <h2 className="font-bold text-xl text-blue-500">Comments</h2>
                <div>
                  {patternData.comments.length === 0 ? (
                    <div className="bg-gray-100 p-4 my-3 rounded-lg">
                      <p className="text-gray-400">No feedbacks added yet</p>
                    </div>
                    ) : (
                    patternData.comments.map((comment) => (
                      <Comments
                        review={comment}
                        expertId={expertId}
                        isVerified={
                          expertVerificationPhase.includes("NotVerified")
                            ? true
                            : false
                          }
                        z_index={z_index}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          <div className="md:col-span-1 sm:hover:border-l-4 sm:ml-4 px-4">
          <div><h2 className="sm:block hidden text-xl font-bold text-blue-500">Screenshots</h2></div>
          {patternData.patternImageUrls.length > 0 ? (
            <div className="hidden my-2 sm:grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {patternData.patternImageUrls.map((image, index) => {
                //const file = formData.get('files') as File
                return(
                  <div key={index} className={`relative ${z_index}`}>
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md border-2 border-gray-200 opacity-75 cursor-pointer"
                      onClick={()=>handleImageClick(image)}
                    />
                  </div>)
                })}
            </div>
          ): (
            <div className="flex justify-center items-center h-20 bg-gray-100 shadow-md rounded-md my-2"><h2>No screenshots added for this pattern</h2></div>
          )}
          </div>
        </div>
        </>
      </div>
    </div>
  );
};

export default withExpertAuth(PatternDetailsComponent);
