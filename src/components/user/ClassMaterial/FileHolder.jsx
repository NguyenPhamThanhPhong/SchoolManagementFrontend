
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