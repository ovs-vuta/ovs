import { useSelector } from "react-redux";

export default function getObcData() {
  const { data, status } = useSelector((state) => state.obc);
  console.log()
  return {
    data,
    status,
  };
}

export function groupedCndData(candidates) {
  const groupedData = candidates.reduce((acc, candidate) => {
    const { candidateType } = candidate;
    if (!acc[candidateType]) {
      acc[candidateType] = [];
    }
    acc[candidateType].push(candidate);
    return acc;
  }, {});

  return {
    groupedData,
  };
}
