export const setObcVote =(obcState)=>{
    localStorage.setItem("Obc",JSON.stringify(obcState))
}

export const getObcVote =()=>{
    const obc = JSON.parse(localStorage.getItem("Obc"));
    return obc ;
}

export const setEccVote = (EccState) => {
  localStorage.setItem("Ecc", JSON.stringify(EccState));
};

export const getEccVote = () => {
  const ecc = JSON.parse(localStorage.getItem("Ecc"));
  return ecc;
};

