import 'boxicons/css/boxicons.min.css';
import { Button } from 'antd';
import './FileHolderLecturer.scss'

const FileHolderLecturer = ({ WFiles }) => {
    let Files = WFiles;

    return (
        <>
            {Files.map((item =>
                <div className="FileHodlerScss"><Button type="link"><i class='bx bx-trash' style={{ color: '#fd0005' }}  ></i></Button>{item}</div>
            ))}
        </>

    );

}
export default FileHolderLecturer;