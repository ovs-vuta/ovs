import React, { useState } from 'react'

export const useVoteState = ()=>{
    const [voteState, setVoteState] = useState("pending");
    const [voteCount, setVoteCount] = useState({ OBC: false, ECC: false });
    
    return { voteState, setVoteState, voteCount, setVoteCount}
}
