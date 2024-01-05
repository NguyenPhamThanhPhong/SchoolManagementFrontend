import './WeekMaterial.scss'
import { Divider } from 'antd';
import FileHolder from './FileHolder';
import parse from 'html-react-parser';
function WeekMaterial(props, { Sections }) {

    return (
        <>
            <div className='WeekMaterial'>
                {props.Sections.map((item =>
                    <div>
                        <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                            {item.SectionTitle}
                        </Divider>
                        <FileHolder WFiles={item.WFile} />
                    </div>
                ))}

            </div>
        </>)
}
export default WeekMaterial;