import './WeekMaterial.scss'
import { Divider } from 'antd';
import FileHolder from './FileHolder';
function WeekMaterial() {
    const WFiles = ['Helloworld.pdf', 'Hi.pdf']
    const Weeks =
        [
            {
                Wnumber: 1,
                WFile: WFiles,
            },
            {
                Wnumber: 2,
                WFile: WFiles,
            },
            {
                Wnumber: 3,
                WFile: WFiles,
            },
        ];
    return (
        <>
            <div className='WeekMaterial'>
                {Weeks.map((item =>
                    <div>
                        <Divider orientation="left" orientationMargin="0" style={{ color: "#2f88ff" }} >
                            Week {item.Wnumber}
                        </Divider>
                        <FileHolder WFiles={item.WFile} />
                    </div>
                ))}

            </div>
        </>)
}
export default WeekMaterial;