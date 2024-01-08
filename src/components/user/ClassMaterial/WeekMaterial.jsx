import './WeekMaterial.scss'
import { Divider, message } from 'antd';
import FileHolder from './FileHolder';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSchoolClassContext } from '../../../data-store';

function WeekMaterial(props) {

    const { id } = useParams();
    const [sections, setSections] = useState(props.Sections);
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    useEffect(() => {
        if (schoolClassState !== null && schoolClassState !== undefined && schoolClassState?.schoolClasses !== null && schoolClassState?.schoolClasses !== undefined && schoolClassState?.schoolClasses.length > 0) {
            let currentSchoolClass = schoolClassState?.schoolClasses.find(x => x.id === id);
            const sortedSchoolClasses = currentSchoolClass?.schoolClasses?.sort((a, b) => b.position - a.position);
            setSections(sortedSchoolClasses);
        }
    }, [])


    function renderDownloadFiles(documentUrls) {
        let displayFiles = [];
        if (documentUrls !== undefined && documentUrls !== null) {
            for (const [key, value] of Object.entries(documentUrls)) {
                displayFiles.push(<><a href={value} >{key}</a> <br /></>)
            }
        }
        return displayFiles;
    }

    return (
        <>
            <div className='WeekMaterial'>
                {sections && sections.map((item =>
                    <div>
                        <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                            {item?.title}
                        </Divider>
                        <div>
                            {parse(item?.content)}
                        </div>
                        <span>
                            {
                                renderDownloadFiles(item?.documentUrls)
                            }
                        </span>
                    </div>
                ))}

            </div>
        </>)
}
export default WeekMaterial;