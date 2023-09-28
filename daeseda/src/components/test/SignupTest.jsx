import axios from "axios";

function SignupTest() {
  const postData = {
    userEmail: "use234234r@example.com",
    userName: "Johne",
    userNickname: "johndoe123",
    userPhone: "123-456-7890",
    userPassword: "securepassword123",
  };

  axios
    .post(`http://localhost:8088/users/signup`, postData)
    .then(function (response) {
      console.log("response:", response);
    })
    .catch(function (error) {
      console.log("error:", error);
    });

  return <div></div>;
}

export default SignupTest;
