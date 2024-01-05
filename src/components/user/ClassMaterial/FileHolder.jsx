import 'boxicons/css/boxicons.min.css';
import { Button } from 'antd';
import './FileHolder.scss'

const FileHolder = ({ WFiles }) => {
    let Files = WFiles;

    return (
        <>
            {Files.map((item =>
                <div className="FileHodlerScss"><Button type="link"><i class='bx bx-trash' style={{ color: '#fd0005' }}  ></i></Button>{item}</div>
            ))}
        </>

    );

}
export default FileHolder;