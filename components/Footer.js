import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer(props) {
  return (
    <>
      <div>
        <footer className=" flex justify-center w-full py-5">
          <ul className=" flex items-center">
            <li className="items-center px-3">
              <a href="https://github.com/mitchellsolomon">
                <BsGithub />
              </a>
            </li>
            <li className="px-3">
              <a href="https://www.linkedin.com/in/mitchell-solomon-2894b4a4/">
                <BsLinkedin />
              </a>
            </li>
            <li className="px-3">
              <a href="https://twitter.com/rmsolomon_">
                <BsTwitter />
              </a>
            </li>
          </ul>
          <div className="font-code">
            <p>© 2021 Mitchell Solomon. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
