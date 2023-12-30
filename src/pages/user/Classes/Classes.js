import './Classes.scss'
import ClassList from '../../../components/user/ClassList/ClassList';

function Classes() {
  const userState = {
    user: {},
    role: 'lecturer',
    isLoggedin: true,
  }
  return (
    <>
      <div>
        <ClassList role={userState.role}></ClassList>
      </div>
    </>
  );
}

export default Classes;