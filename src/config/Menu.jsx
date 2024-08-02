import { RiHomeHeartLine, RiGroup2Line } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCloudUploadAlt, FaFileDownload } from "react-icons/fa";

const MenuConfig = [
  {
    id: 1001,
    name: "Office Bearer",
    path: "",
    icon: <RiHomeHeartLine color="rgb(255, 255, 0)" size={22} />,
  },
  {
    id: 1002,
    name: "ECC Members",
    path: "/ecc-members",
    icon: <RiGroup2Line color="rgb(255, 255, 0)" size={22} />,
  },
  {
    id: 1003,
    name: "Upload Users",
    path: "/upload-users",
    icon: <FaCloudUploadAlt color="rgb(255, 255, 0)" size={22} />,
  },
  {
    id: 1004,
    name: "Voter Records",
    path: "/OBC-vote-data",
    icon: <FaFileDownload color="rgb(255, 255, 0)" size={22} />,
  },
];

export default MenuConfig;
