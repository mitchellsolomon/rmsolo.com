import Layout from "../components/Layout";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaReact,
  FaSass,
  FaPhp,
} from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMysql } from "react-icons/si";
import { DiGit } from "react-icons/di";

export default function skills() {
  return (
    <Layout>
      <div className="">
        <h1 className="text-3xl text-center font-extrabold pb-10">skills</h1>
        <ul className="flex justify-center items-center flex-wrap">
          <li className="p-10 hover:text-dark100">
            <FaHtml5 size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <FaCss3Alt size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <SiJavascript size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <SiTailwindcss size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <FaBootstrap size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <FaReact size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <FaSass size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <FaPhp size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <SiMysql size={100} />
          </li>
          <li className="p-10 hover:text-dark100">
            <DiGit size={100} />
          </li>
        </ul>
      </div>
    </Layout>
  );
}
