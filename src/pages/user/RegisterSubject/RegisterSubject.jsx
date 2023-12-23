import RegisterSubjectBoard from "../../../components/user/RegisterSubjectBoard/RegisterSubjectBoard";
import Header from "../../../components/user/Header/Header";
import './RegisterSubject.scss'
function RegisterSubject() {
    return (
      <>
        <div className="MainRegisterContainer">
            <Header></Header>
            <div className="BoardRegisterContainer">
                <RegisterSubjectBoard></RegisterSubjectBoard>
            </div>
           
        </div>
      </>
    );
  }
  
  export default RegisterSubject;