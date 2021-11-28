import React, { useState, useEffect } from "react";
import LoginSignUp from "../../components/SigninSignup/LoginSignUp";
import { API } from "../../backend";
import { Redirect } from "react-router";

function Login() {
  const [isVerify, setIsVerify] = useState(false);
  const variable = {
    vf: null,
    id: null,
  };
  const accountVerification = () => {
    // const { search } = useLocation();
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const vf = urlParams.get("vf");
    const id = urlParams.get("id");
    if (vf !== null && id !== null) {
      variable.vf = vf;
      variable.id = id;
      fetch(`${API}/verify-email`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variable),
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else return Promise.reject("Incorrect verification code");
        })
        .then((data) => {
          //   console.log(data);
          setIsVerify(true);
        })
        .catch((error) => {
          //   console.log(error);
          setIsVerify(false);
        });
    } else {
      setIsVerify(true);
    }
  };
  useEffect(() => {
    accountVerification();
  });
  return (
    { isVerify } ? (<>
      <Redirect to = {{pathname:"/signin"}} />
      <LoginSignUp isLogin={true} />
    </>) : (<>
      <LoginSignUp isLogin={true} />

    </>)


  );
}

export default Login;