import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import portada from "../pictures/portada.png";
import MenuComp from "../components/menu";

function HomePage() {
  const {
    isLoggedIn,
    user, // <== UPDATE
    logOutUser, // <== UPDATE
  } = useContext(AuthContext);

  const navigate = useNavigate();

  function NeedWater() {
    const MySwal = withReactContent(Swal);
    const { value: city } = MySwal.fire({
      title: "Where do you want to flow?",
      width: 500,
      padding: "4em",
      input: "select",
      inputOptions: {
        Barcelona: "Barcelona",
        Newyork: "New York",
        London: "London",
      },
      showCancelButton: true,
      confirmButtonColor: "#1F4690",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "Barcelona") {
            resolve();
            navigate("/map");
          } else {
            resolve("We are implementing this city, try Barcelona");
          }
        });
      },
      color: "#1F4690",
      background: "#EDEDED",
      backdrop: `
      ligthblue
    `,
    });
  }

  return (
    <>
      <div className="backgroundimg">
        <div className="primaryNav">
          <text></text>
          <div className="footergran left">
            <a
              href="https://github.com/Pardo24"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon
                style={{ padding: "15px 10px 0 15px", color: "white" }}
              />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/daniel-pardo-celaya/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon
                style={{ padding: "15px 30px 0 15px", color: "white" }}
              />
            </a>
          </div>{" "}
          <MenuComp
            props="dark"
            fontSize="large"
            style={{ marginRight: "20px" }}
          />
        </div>
        <h1 className="titol">
          <img className='img' src={portada} style={{ marginRight: "1px", width: "30%" }} alt="portada" />
        </h1>
        <p className="parag">
          <text style={{ fontWeight: 500 }} className="textsubrallat">
            Find your flow everywhere
          </text>
        </p>
        <Button
          onClick={() => NeedWater()}
          style={{
            marginBottom: "185px",
            backgroundColor: "white",
            padding: "10px",
            fontWeight: "550",
            color: "#343E3D",
            borderRadius: "50px",
          }}
        >
          Choose your city
        </Button>
      </div>
    </>
  );
}

export default HomePage;
