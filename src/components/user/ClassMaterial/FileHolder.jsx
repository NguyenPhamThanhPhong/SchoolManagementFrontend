import 'boxicons/css/boxicons.min.css';
import { Button } from 'antd';
import './FileHolder.scss'

const FileHolder = ({ WFiles }) => {
    let Files = WFiles;

    return (
        <>
            {Files.map((item =>
                <div className="FileHodlerScss">{item}</div>
            ))}
        </>

    );

}
export default FileHolder;