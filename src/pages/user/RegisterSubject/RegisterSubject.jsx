import RegisterSubjectBoard from "../../../components/user/RegisterSubjectBoard/RegisterSubjectBoard";
import RegisteredSubjectBoard from "../../../components/user/RegisteredSubjectBoard/RegisteredSubjectBoard";
import Header from "../../../components/user/Header/Header";
import './RegisterSubject.scss'


import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Register new subject',
    children: <RegisterSubjectBoard></RegisterSubjectBoard>,
  },
  {
    key: '2',
    label: 'Registered subject',
    children: <RegisteredSubjectBoard></RegisteredSubjectBoard>,
  },
];
function RegisterSubject() {
  return (
    <>
      <div className="MainRegisterContainer">
        <Header></Header>
        <div className="BoardRegisterContainer">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>

      </div>


    </>
  );
}

export default RegisterSubject;