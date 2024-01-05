import TextArea from "antd/es/input/TextArea";
import AddMaterial from "../../../components/user/ClassMaterial/Lecturer/AddMaterial";
import AddSection from "../../../components/user/ClassMaterial/Lecturer/AddSection";
import './AddMaterialPage.scss'
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
function AddMaterialPage() {
    return (
        <div>
            <div className="SectionTitleText">Section title</div>
            <TextArea className="titleSection" onChange={onChange} placeholder="Section title" />
            <div className="SectionContentText">Section content</div>
            <AddSection></AddSection>
            <div className="SectionFileText">File</div>
            <AddMaterial></AddMaterial>
        </div>
    )
}
export default AddMaterialPage;